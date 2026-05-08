#!/usr/bin/env ts-node
/**
 * generate-docs.ts
 *
 * Lee los archivos .stories.ts de @poli/components, extrae metadata
 * (descripción, inputs, outputs, argTypes) y genera páginas MDX
 * para apps/docs/docs/components/ usando la API de Claude.
 *
 * Uso:
 *   npx ts-node scripts/generate-docs.ts
 *   npx ts-node scripts/generate-docs.ts --component pds-button
 *
 * Variables de entorno requeridas:
 *   ANTHROPIC_API_KEY — API key de Anthropic Claude
 */

import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

const COMPONENTS_LIB = path.join(__dirname, '../packages/components/src/lib');
const DOCS_OUTPUT = path.join(__dirname, '../apps/docs/docs/components');
const SPECS_DIR = path.join(__dirname, '../specs');

// Mapeo de nombre de directorio a nombre de doc slug
const COMPONENT_SLUG_MAP: Record<string, string> = {
  'pds-accordion': 'accordion',
  'pds-avatar-button': 'avatar-button',
  'pds-badge': 'badge',
  'pds-breadcrumb': 'breadcrumb',
  'pds-button': 'button',
  'pds-card': 'card',
  'pds-checkbox': 'checkbox',
  'pds-checkbox-group': 'checkbox-group',
  'pds-code-block': 'code-block',
  'pds-cta': 'cta',
  'pds-date-picker': 'date-picker',
  'pds-dialog': 'dialog',
  'pds-file-uploader': 'file-uploader',
  'pds-helper-text': 'helper-text',
  'pds-icon': 'icon',
  'pds-icon-button': 'icon-button',
  'pds-input-field': 'input-field',
  'pds-link': 'link',
  'pds-loading-circle': 'loading-circle',
  'pds-modal': 'modal',
  'pds-notification': 'notification',
  'pds-paginator': 'paginator',
  'pds-progress-bar': 'progress-bar',
  'pds-radio': 'radio',
  'pds-radio-group': 'radio-group',
  'pds-range': 'range',
  'pds-select-field': 'select-field',
  'pds-sidenav': 'sidenav',
  'pds-stat-card': 'stat-card',
  'pds-stepper': 'stepper',
  'pds-stepper-compact': 'stepper-compact',
  'pds-table': 'table',
  'pds-tabs': 'tabs',
  'pds-tag': 'tag',
  'pds-textarea-field': 'textarea-field',
  'pds-time-picker': 'time-picker',
  'pds-toggle': 'toggle',
  'pds-tooltip': 'tooltip',
};

interface ComponentSources {
  componentTs: string;
  storiesTs?: string;
  specMd?: string;
}

function readComponentSources(dirName: string): ComponentSources {
  const dirPath = path.join(COMPONENTS_LIB, dirName);
  const files = fs.readdirSync(dirPath, { recursive: true }) as string[];

  const mainComponent = files.find(
    (f) => f.endsWith('.component.ts') && !f.includes('.spec.') && !f.includes('.stories.')
  );
  const storiesFile = files.find((f) => f.endsWith('.stories.ts'));
  const slug = COMPONENT_SLUG_MAP[dirName];
  const specFile = slug ? path.join(SPECS_DIR, `${slug}.md`) : undefined;

  return {
    componentTs: mainComponent
      ? fs.readFileSync(path.join(dirPath, mainComponent), 'utf-8')
      : '',
    storiesTs: storiesFile
      ? fs.readFileSync(path.join(dirPath, storiesFile), 'utf-8')
      : undefined,
    specMd:
      specFile && fs.existsSync(specFile)
        ? fs.readFileSync(specFile, 'utf-8')
        : undefined,
  };
}

async function generateDocWithClaude(
  componentDir: string,
  sources: ComponentSources
): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY environment variable is required');
  }

  const slug = COMPONENT_SLUG_MAP[componentDir] ?? componentDir;
  const componentName = slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  const prompt = `Genera documentación MDX para Docusaurus del componente Angular "${componentName}" del Poli Design System v2.

## Fuentes disponibles:

### Componente TypeScript:
\`\`\`typescript
${sources.componentTs.slice(0, 4000)}
\`\`\`

${sources.storiesTs ? `### Stories de Storybook:\n\`\`\`typescript\n${sources.storiesTs.slice(0, 3000)}\n\`\`\`` : ''}

${sources.specMd ? `### Especificación de diseño:\n${sources.specMd.slice(0, 2000)}` : ''}

## Genera un documento MDX con:

1. **Frontmatter** con id, title, sidebar_position
2. **Descripción** del componente (2-3 oraciones)
3. **Instalación** (import desde @poli/components)
4. **API Reference** — tabla de inputs con nombre, tipo, default, descripción
5. **Ejemplos básicos** con código TypeScript + HTML
6. **Accesibilidad** — notas WCAG si aplica
7. **Variantes** listadas si el componente tiene múltiples variants

Usa español. No inventes props que no estén en el código fuente.`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-opus-4-5',
      max_tokens: 4096,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Claude API error ${response.status}: ${err}`);
  }

  const data = (await response.json()) as {
    content: Array<{ type: string; text: string }>;
  };
  return data.content[0]?.text ?? '';
}

async function main() {
  const targetComponent = process.argv
    .find((a) => a.startsWith('--component='))
    ?.split('=')[1];

  const components = targetComponent
    ? [targetComponent]
    : Object.keys(COMPONENT_SLUG_MAP);

  if (!fs.existsSync(DOCS_OUTPUT)) {
    fs.mkdirSync(DOCS_OUTPUT, { recursive: true });
  }

  console.log(`Generando docs para ${components.length} componentes...`);

  for (const comp of components) {
    const slug = COMPONENT_SLUG_MAP[comp];
    if (!slug) {
      console.warn(`⚠ Sin slug para ${comp}, omitiendo`);
      continue;
    }

    const outputFile = path.join(DOCS_OUTPUT, `${slug}.md`);
    if (fs.existsSync(outputFile)) {
      console.log(`  ↩ ${slug}.md ya existe, omitiendo`);
      continue;
    }

    try {
      const sources = readComponentSources(comp);
      console.log(`  → Generando ${slug}.md...`);
      const mdx = await generateDocWithClaude(comp, sources);
      fs.writeFileSync(outputFile, mdx, 'utf-8');
      console.log(`  ✓ ${slug}.md creado`);
    } catch (err) {
      console.error(`  ✗ Error en ${comp}:`, (err as Error).message);
    }
  }

  console.log('\nDone.');
}

main().catch(console.error);
