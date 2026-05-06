import { Meta, StoryObj } from '@storybook/angular';
import { PdsCodeBlockComponent } from './pds-code-block.component';

const SAMPLE_TS = `import { Component, input, computed } from '@angular/core';
import { PdsButtonComponent } from '@pds/button';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [PdsButtonComponent],
  template: \`
    <pds-button
      [label]="label()"
      variant="primary"
      (clicked)="onClick()"
    />
  \`,
})
export class ExampleComponent {
  readonly label = input<string>('Click me');
  readonly count = input<number>(0);

  protected readonly displayCount = computed(
    () => \`Clicked \${this.count()} times\`
  );

  onClick(): void {
    console.log('Button clicked!');
  }
}`;

const SAMPLE_SCSS = `.pds-button {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-component-sm);
  padding-block: var(--button-padding-y, 12px);
  padding-inline: var(--button-padding-x, 24px);
  border-radius: var(--radius-button, 10px);
  background-color: var(--action-primary-solid-bg);
  color: var(--action-primary-solid-fg);
  font-family: var(--text-component, Poppins);
  font-size: var(--font-size-component-button);
  font-weight: var(--font-weight-w-semibold);
  cursor: pointer;
  border: none;

  &:focus-visible {
    outline: none;
    box-shadow:
      0 0 0 2px var(--action-focus-inner),
      0 0 0 6px var(--action-primary-focus-ring);
  }
}`;

const SAMPLE_HTML = `<pds-date-picker
  label="Fecha de nacimiento"
  mode="single"
  [required]="true"
  [maxDate]="today"
  helpText="Formato DD/MM/YYYY"
  [formControl]="birthDateCtrl"
/>

<pds-date-picker
  label="Período de inscripción"
  mode="range"
  [minDate]="semesterStart"
  [maxDate]="semesterEnd"
  (valueChange)="onDateRangeChange($event)"
/>`;

const meta: Meta<PdsCodeBlockComponent> = {
  title: 'Poli Design System / 07. Data Display / Code Block',
  component: PdsCodeBlockComponent,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text', description: 'Nombre del archivo o título en la cabecera' },
    code: { control: 'text', description: 'El código a mostrar (requerido)' },
    showHeader: { control: 'boolean', description: 'Muestra la cabecera (título + botón de copia)' },
    showCopyButton: { control: 'boolean', description: 'Muestra el botón de copiar código' },
    showNumbers: { control: 'boolean', description: 'Muestra la columna de números de línea' },
    maxHeight: { control: 'text', description: 'Altura máxima del área de código (ej. "300px")' },
  },
  parameters: {
    docs: {
      description: {
        component: `
Bloque de código del DS v2. Presenta fragmentos de código o texto técnico con cabecera de título,
numeración de líneas y botón de copiado con feedback visual (\`Copiar código\` → \`Código copiado\`).
El cuerpo produce scroll vertical cuando el contenido supera \`maxHeight\`.

### Cuándo usarlo
- En documentación técnica, guías de API o especificaciones de componentes.
- Para mostrar ejemplos de código en formularios o asistentes de configuración.
- En interfaces de administración donde se requiere ver o copiar fragmentos de texto técnico.

### Cuándo NO usarlo
- No usar para texto de usuario editable — usar \`pds-textarea-field\`.
- No usar para una sola línea de texto técnico — el contexto inline puede ser suficiente.

### API
\`\`\`html
<pds-code-block
  title="pds-button.component.ts"
  [code]="myCode"
  [showNumbers]="true"
  maxHeight="400px"
/>
\`\`\`

| Input            | Tipo             | Default  | Descripción |
|------------------|------------------|----------|-------------|
| \`code\`           | \`string\` (requerido) | — | El código a mostrar |
| \`title\`          | \`string \\| null\` | \`null\` | Nombre del archivo en la cabecera |
| \`showHeader\`     | \`boolean\`      | \`true\`  | Muestra cabecera (título + botón copia) |
| \`showCopyButton\` | \`boolean\`      | \`true\`  | Muestra botón de copia |
| \`showNumbers\`    | \`boolean\`      | \`true\`  | Muestra números de línea |
| \`maxHeight\`      | \`string \\| null\` | \`null\` | Altura máxima con scroll |

---

### Accesibilidad — WCAG 2.2

#### Criterios aplicables
| Criterio | Nivel | Aplicación |
|----------|-------|------------|
| **1.3.1 Info y relaciones** | A | El bloque usa \`<pre>\`/\`<code>\` semánticos; el título es un \`<h6>\` |
| **1.4.3 Contraste mínimo** | AA | Texto del código ≥ 4.5:1 sobre el fondo del bloque |
| **1.4.4 Cambio de tamaño del texto** | AA | El texto escala con las preferencias del usuario |
| **2.1.1 Teclado** | A | El botón de copia es \`pds-icon-button\` nativo — activable con Tab+Enter |
| **2.4.7 Foco visible** | AA | Focus ring visible en el botón de copia |
| **4.1.2 Nombre, rol, valor** | A | El botón de copia tiene \`aria-label="Copiar código"\` |
| **4.1.3 Mensajes de estado** | A | El tooltip del botón cambia a \`"Código copiado"\` — feedback visible y accesible |

#### Navegación por teclado
| Tecla | Acción |
|-------|--------|
| **Tab** | Enfoca el botón de copia (si visible) |
| **Enter / Space** | Copia el código al portapapeles |
| **Tab** (scroll) | El cuerpo del bloque es navegable con Tab cuando tiene \`maxHeight\` y overflow |

#### Atributos ARIA
| Atributo | Dónde | Función |
|----------|-------|---------|
| \`aria-label="Copiar código"\` | en el botón de copia | Nombre accesible del botón |
| \`role="region"\` | (implícito en \`<pre>\`) | Identifica el bloque como región de contenido técnico |

#### Anuncio en lectores de pantalla
- Botón en estado idle: *"Copiar código, botón"*
- Botón tras copiar: el tooltip cambia a *"Código copiado"* — visible durante 2 segundos
- El contenido del \`<pre>\` se anuncia como texto monoespaciado en lectores de pantalla modernos

#### Auditoría v1 → v2
| Hallazgo v1 (Cortés, feb 2026) | Criterio WCAG | Resolución en v2 |
|--------------------------------|---------------|------------------|
| Este componente es nuevo en v2 y fue diseñado desde el inicio conforme a WCAG 2.2 AA | — | — |

### Buenas prácticas
✅ Usa \`title\` con el nombre del archivo para contextualizar el fragmento: \`"example.component.ts"\`.
✅ Define \`maxHeight\` para bloques largos — evita que el código empuje el contenido de la página.
✅ Mantén \`showCopyButton=true\` — copiar código es la acción más frecuente en documentación.
❌ No muestres código minificado — el usuario necesita leer y entender el fragmento.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<PdsCodeBlockComponent>;

// ── Sandbox ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default — Sandbox',
  args: {
    title: 'example.component.ts',
    code: SAMPLE_TS,
    showHeader: true,
    showCopyButton: true,
    showNumbers: true,
    maxHeight: null,
  },
};

// ── TypeScript ────────────────────────────────────────────────────────────────

export const TypeScriptBlock: Story = {
  name: 'TypeScript / Angular component',
  args: {
    title: 'example.component.ts',
    code: SAMPLE_TS,
    showNumbers: true,
  },
};

// ── SCSS ──────────────────────────────────────────────────────────────────────

export const ScssBlock: Story = {
  name: 'SCSS / estilos con tokens',
  args: {
    title: 'pds-button.component.scss',
    code: SAMPLE_SCSS,
    showNumbers: true,
  },
};

// ── HTML ──────────────────────────────────────────────────────────────────────

export const HtmlBlock: Story = {
  name: 'HTML / template de Angular',
  args: {
    title: 'date-picker-examples.html',
    code: SAMPLE_HTML,
    showNumbers: true,
  },
};

// ── Con altura máxima ─────────────────────────────────────────────────────────

export const WithMaxHeight: Story = {
  name: 'Con altura máxima y scroll',
  parameters: {
    docs: {
      description: {
        story: 'Al definir \`maxHeight\`, el cuerpo del bloque produce scroll vertical cuando el contenido supera ese límite. El scroll es accesible con teclado.',
      },
    },
  },
  args: {
    title: 'example.component.ts',
    code: SAMPLE_TS,
    showNumbers: true,
    maxHeight: '200px',
  },
};

// ── Sin cabecera ──────────────────────────────────────────────────────────────

export const WithoutHeader: Story = {
  name: 'Sin cabecera',
  args: {
    code: SAMPLE_HTML,
    showHeader: false,
    showNumbers: true,
  },
};

// ── Sin números de línea ──────────────────────────────────────────────────────

export const WithoutLineNumbers: Story = {
  name: 'Sin números de línea',
  args: {
    title: 'snippet.ts',
    code: `const greeting = 'Hola, mundo';
console.log(greeting);`,
    showNumbers: false,
  },
};

// ── Accesibilidad ─────────────────────────────────────────────────────────────

export const A11yCopyButton: Story = {
  name: 'A11y — Botón de copia (Tab + Enter)',
  parameters: {
    docs: {
      description: {
        story: `
Usa **Tab** para enfocar el botón de copia. Presiona **Enter** o **Space** para copiar.

NVDA/VoiceOver anuncian:
- En reposo: *"Copiar código, botón"*
- Tras copiar: el tooltip cambia visualmente a *"Código copiado"* durante 2 segundos

El feedback de éxito es visible para usuarios videntes y anunciable por AT.
        `,
      },
    },
  },
  args: {
    title: 'Prueba el botón de copia con Tab + Enter',
    code: SAMPLE_HTML,
    showNumbers: true,
  },
};
