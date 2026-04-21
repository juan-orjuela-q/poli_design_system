import { Meta, StoryObj } from '@storybook/angular';
import { PdsCodeBlockComponent } from './pds-code-block.component';

const SAMPLE_CODE = `import { createTheme } from '@mysystem/core';

const theme = createTheme({
  palette: {
    primary: {
      main: '$action-primary-bg',
      focus: '$action-primary-focus-ring'
    }
  },
  spacing: (factor) => \`\${0.25 * factor}rem\`
});

// Inicializar componente
theme.init();`;

const SHORT_CODE = `const greet = (name: string) =>
  \`Hola, \${name}!\`;

console.log(greet('Politécnico'));`;

const meta: Meta<PdsCodeBlockComponent> = {
  title: 'DS v2/Code Block',
  component: PdsCodeBlockComponent,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    showHeader: { control: 'boolean' },
    showCopyButton: { control: 'boolean' },
    showNumbers: { control: 'boolean' },
    maxHeight: { control: 'text', description: 'Altura máxima del cuerpo (ej. "200px", "12rem"). Sin valor, crece con el contenido.' },
    code: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component: `
Presenta fragmentos de código o texto técnico en un contenedor estructurado.

#### Características
- **Cabecera** con título H6 sobre fondo navy (\`--surface-brand-primary-base\`)
- **Botón de copia** (Icon Button tertiary) con tooltip: *"Copiar código"* en hover/focus y *"Código copiado"* tras copiar
- **Números de línea** opcionales, sincronizados automáticamente con el contenido
- **Monospace** con fuente \`IBM Plex Mono\` (token \`--text-code\`)
- Cuerpo sobre \`--surface-neutral-inverse\` (fondo negro)

#### Uso
\`\`\`html
<pds-code-block
  title="theme-config.ts"
  [code]="miCodigo"
/>
\`\`\`
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<PdsCodeBlockComponent>;

// ── Default ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    title: 'theme-config.ts',
    showHeader: true,
    showCopyButton: true,
    showNumbers: true,
    code: SAMPLE_CODE,
  },
};

// ── Sin título ────────────────────────────────────────────────────────────────

export const SinTitulo: Story = {
  args: {
    title: null,
    showHeader: true,
    showCopyButton: true,
    showNumbers: true,
    code: SHORT_CODE,
  },
};

// ── Sin números ───────────────────────────────────────────────────────────────

export const SinNumeros: Story = {
  args: {
    title: 'snippet.ts',
    showHeader: true,
    showCopyButton: true,
    showNumbers: false,
    code: SHORT_CODE,
  },
};

// ── Sin cabecera ──────────────────────────────────────────────────────────────

export const SinCabecera: Story = {
  args: {
    title: null,
    showHeader: false,
    showCopyButton: false,
    showNumbers: true,
    code: SHORT_CODE,
  },
};

// ── Solo código ───────────────────────────────────────────────────────────────

export const SoloCodigo: Story = {
  args: {
    title: null,
    showHeader: false,
    showCopyButton: false,
    showNumbers: false,
    code: SHORT_CODE,
  },
};

// ── Con maxHeight (scroll) ────────────────────────────────────────────────────

export const ConScroll: Story = {
  args: {
    title: 'theme-config.ts',
    showHeader: true,
    showCopyButton: true,
    showNumbers: true,
    maxHeight: '160px',
    code: SAMPLE_CODE,
  },
};

// ── Código largo ──────────────────────────────────────────────────────────────

export const CodigoLargo: Story = {
  args: {
    title: 'app.component.ts',
    showHeader: true,
    showCopyButton: true,
    showNumbers: true,
    code: SAMPLE_CODE,
  },
  render: (args) => ({
    props: args,
    template: `<div style="max-width: 600px;"><pds-code-block [title]="title" [showHeader]="showHeader" [showCopyButton]="showCopyButton" [showNumbers]="showNumbers" [code]="code" /></div>`,
  }),
};
