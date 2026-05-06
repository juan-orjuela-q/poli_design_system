import { Meta, StoryObj } from '@storybook/angular';
import { PdsIconComponent } from './pds-icon.component';

const meta: Meta<PdsIconComponent> = {
  title: 'Poli Design System / 03. Base / Icon Component',
  component: PdsIconComponent,
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text', description: 'Nombre del símbolo (Material Symbols Rounded)' },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Tamaño del ícono',
    },
    mode: {
      control: 'select',
      options: ['neutral', 'brand', 'brand-ghost', 'brand-secondary', 'brand-subtle', 'error', 'success', 'warning'],
      description: 'Modo de color semántico',
    },
    shape: {
      control: 'select',
      options: ['none', 'circle', 'rectangle'],
      description: 'Forma del contenedor (none = inline sin contenedor)',
    },
    ariaHidden: { control: 'boolean', description: 'true = decorativo (aria-hidden). false = informativo (requiere ariaLabel)' },
    ariaLabel: { control: 'text', description: 'Descripción para AT cuando ariaHidden=false' },
    filled: { control: 'boolean', description: 'Activa variante FILL=1 de Material Symbols' },
  },
  parameters: {
    docs: {
      description: {
        component: `
Envoltorio estándar para iconografía **Material Symbols Rounded** en el DS v2.
Normaliza 5 tamaños, 8 modos de color semántico y dos formas de uso: **inline** (sin contenedor) y **standalone** (con fondo y padding).

### Cuándo usarlo
- Para cualquier ícono del DS v2 — siempre a través de este componente, nunca con \`<mat-icon>\` directo.
- **Inline** (\`shape="none"\`): dentro de botones, badges, labels, inputs.
- **Standalone** (\`shape="circle"\` o \`"rectangle"\`): como elemento visual independiente (tarjetas, encabezados, notificaciones).

### Cuándo NO usarlo
- No usar \`<mat-icon>\` directamente — rompe la normalización de tokens y tamaños.
- No asignar \`ariaHidden="false"\` sin proveer \`ariaLabel\` — genera un elemento de interfaz sin nombre accesible (viola WCAG 1.1.1).

### API
\`\`\`html
<!-- Inline decorativo (default) -->
<pds-icon name="home" size="md" mode="brand" />

<!-- Standalone informativo -->
<pds-icon
  name="warning"
  size="lg"
  mode="error"
  shape="circle"
  [ariaHidden]="false"
  ariaLabel="Error en el formulario"
/>
\`\`\`

| Input        | Tipo                                                      | Default       | Descripción |
|--------------|-----------------------------------------------------------|---------------|-------------|
| \`name\`     | \`string\` (requerido)                                    | —             | Nombre del símbolo Material Symbols Rounded |
| \`size\`     | \`'xs'\\|'sm'\\|'md'\\|'lg'\\|'xl'\`                     | \`'md'\`      | xs=16px · sm=20px · md=24px · lg=32px · xl=40px |
| \`mode\`     | \`'neutral'\\|'brand'\\|'brand-ghost'\\|...\`             | \`'neutral'\` | Color semántico del ícono y fondo (standalone) |
| \`shape\`    | \`'none'\\|'circle'\\|'rectangle'\`                       | \`'none'\`    | none = inline sin contenedor |
| \`ariaHidden\` | \`boolean\`                                             | \`true\`      | true = decorativo. false = informativo |
| \`ariaLabel\`  | \`string \\| null\`                                     | \`null\`      | Texto para AT cuando \`ariaHidden=false\` |
| \`filled\`   | \`boolean\`                                               | \`false\`     | Activa variante FILL=1 |

---

### Accesibilidad — WCAG 2.2

#### Criterios aplicables
| Criterio | Nivel | Aplicación |
|----------|-------|------------|
| **1.1.1 Contenido no textual** | A | Íconos informativos necesitan alternativa textual vía \`ariaLabel\` |
| **1.4.3 Contraste mínimo** | AA | Ícono informativo sobre su fondo debe cumplir ≥ 4.5:1 |
| **1.4.11 Contraste no textual** | AA | Ícono como elemento UI debe contrastar ≥ 3:1 con el fondo |
| **4.1.2 Nombre, rol, valor** | A | Ícono informativo expone nombre accesible; decorativo queda oculto para AT |

#### Navegación por teclado
Los íconos no son interactivos por sí solos y no reciben foco.
La navegación se gestiona en el elemento padre (botón, enlace, etc.).

#### Atributos ARIA generados
| Atributo | Valor | Cuándo |
|----------|-------|--------|
| \`aria-hidden="true"\` | automático | Cuando \`ariaHidden=true\` (default) |
| \`aria-label="[texto]"\` | valor de \`ariaLabel\` | Cuando \`ariaHidden=false\` |
| \`role="img"\` | automático | Cuando \`ariaHidden=false\` |

#### Anuncio en lectores de pantalla
- **Decorativo** (\`ariaHidden=true\`): el ícono no se anuncia. Solo se lee el contenido del elemento padre.
- **Informativo** (\`ariaHidden=false\` + \`ariaLabel\`): NVDA/VoiceOver anuncian *"[ariaLabel], imagen"*.

#### Auditoría v1 → v2
Este componente es nuevo en v2 y fue diseñado desde el inicio conforme a WCAG 2.2 AA.
Los controles de \`ariaHidden\` / \`ariaLabel\` reemplazan el uso directo de \`<mat-icon>\` de v1, que no exponía semántica alguna a las tecnologías de asistencia.

### Buenas prácticas
✅ Usa \`ariaHidden="true"\` (default) para íconos dentro de botones o badges — el texto del padre describe la acción.
✅ Usa \`ariaHidden="false"\` + \`ariaLabel\` solo cuando el ícono es el único portador de información.
✅ Hereda el color del padre con \`--pds-icon-color: currentColor\` cuando el ícono está dentro de un control.
❌ No uses \`ariaHidden="false"\` sin \`ariaLabel\` — viola WCAG 1.1.1.
❌ No uses \`<mat-icon>\` directamente — saltarse este componente rompe tokens y accesibilidad.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<PdsIconComponent>;

// ── Sandbox ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default — Sandbox',
  args: { name: 'home', size: 'md', mode: 'neutral', shape: 'none', ariaHidden: true },
};

// ── Inline — tamaños ──────────────────────────────────────────────────────────

export const InlineSizes: Story = {
  name: 'Inline — Todos los tamaños',
  render: () => ({
    template: `
      <div style="display:flex;align-items:flex-end;gap:16px;flex-wrap:wrap">
        <div style="text-align:center">
          <pds-icon name="home" size="xs" mode="brand" />
          <p style="font-size:11px;margin:4px 0 0;color:#687C8E;font-family:Poppins">xs · 16px</p>
        </div>
        <div style="text-align:center">
          <pds-icon name="home" size="sm" mode="brand" />
          <p style="font-size:11px;margin:4px 0 0;color:#687C8E;font-family:Poppins">sm · 20px</p>
        </div>
        <div style="text-align:center">
          <pds-icon name="home" size="md" mode="brand" />
          <p style="font-size:11px;margin:4px 0 0;color:#687C8E;font-family:Poppins">md · 24px</p>
        </div>
        <div style="text-align:center">
          <pds-icon name="home" size="lg" mode="brand" />
          <p style="font-size:11px;margin:4px 0 0;color:#687C8E;font-family:Poppins">lg · 32px</p>
        </div>
        <div style="text-align:center">
          <pds-icon name="home" size="xl" mode="brand" />
          <p style="font-size:11px;margin:4px 0 0;color:#687C8E;font-family:Poppins">xl · 40px</p>
        </div>
      </div>
    `,
  }),
};

// ── Inline — modos de color ───────────────────────────────────────────────────

export const InlineModes: Story = {
  name: 'Inline — Modos de color',
  render: () => ({
    template: `
      <div style="display:flex;gap:16px;flex-wrap:wrap;align-items:center">
        <div style="text-align:center"><pds-icon name="school" size="lg" mode="neutral" /><p style="font-size:11px;margin:4px 0 0;color:#687C8E;font-family:Poppins">neutral</p></div>
        <div style="text-align:center"><pds-icon name="school" size="lg" mode="brand" /><p style="font-size:11px;margin:4px 0 0;color:#687C8E;font-family:Poppins">brand</p></div>
        <div style="text-align:center"><pds-icon name="school" size="lg" mode="brand-subtle" /><p style="font-size:11px;margin:4px 0 0;color:#687C8E;font-family:Poppins">brand-subtle</p></div>
        <div style="text-align:center"><pds-icon name="school" size="lg" mode="brand-secondary" /><p style="font-size:11px;margin:4px 0 0;color:#687C8E;font-family:Poppins">brand-secondary</p></div>
        <div style="text-align:center"><pds-icon name="check_circle" size="lg" mode="success" /><p style="font-size:11px;margin:4px 0 0;color:#687C8E;font-family:Poppins">success</p></div>
        <div style="text-align:center"><pds-icon name="warning" size="lg" mode="warning" /><p style="font-size:11px;margin:4px 0 0;color:#687C8E;font-family:Poppins">warning</p></div>
        <div style="text-align:center"><pds-icon name="error" size="lg" mode="error" /><p style="font-size:11px;margin:4px 0 0;color:#687C8E;font-family:Poppins">error</p></div>
      </div>
    `,
  }),
};

// ── Standalone circle — modos ─────────────────────────────────────────────────

export const CircleModes: Story = {
  name: 'Standalone circle — Todos los modos',
  render: () => ({
    template: `
      <div style="display:flex;gap:16px;flex-wrap:wrap;align-items:center">
        <div style="text-align:center"><pds-icon name="school" size="lg" mode="brand" shape="circle" /><p style="font-size:11px;margin:4px 0 0;color:#687C8E;font-family:Poppins">brand</p></div>
        <div style="text-align:center"><pds-icon name="school" size="lg" mode="brand-subtle" shape="circle" /><p style="font-size:11px;margin:4px 0 0;color:#687C8E;font-family:Poppins">brand-subtle</p></div>
        <div style="text-align:center"><pds-icon name="school" size="lg" mode="brand-ghost" shape="circle" /><p style="font-size:11px;margin:4px 0 0;color:#687C8E;font-family:Poppins">brand-ghost</p></div>
        <div style="text-align:center"><pds-icon name="school" size="lg" mode="brand-secondary" shape="circle" /><p style="font-size:11px;margin:4px 0 0;color:#687C8E;font-family:Poppins">brand-secondary</p></div>
        <div style="text-align:center"><pds-icon name="person" size="lg" mode="neutral" shape="circle" /><p style="font-size:11px;margin:4px 0 0;color:#687C8E;font-family:Poppins">neutral</p></div>
        <div style="text-align:center"><pds-icon name="check_circle" size="lg" mode="success" shape="circle" /><p style="font-size:11px;margin:4px 0 0;color:#687C8E;font-family:Poppins">success</p></div>
        <div style="text-align:center"><pds-icon name="warning" size="lg" mode="warning" shape="circle" /><p style="font-size:11px;margin:4px 0 0;color:#687C8E;font-family:Poppins">warning</p></div>
        <div style="text-align:center"><pds-icon name="error" size="lg" mode="error" shape="circle" /><p style="font-size:11px;margin:4px 0 0;color:#687C8E;font-family:Poppins">error</p></div>
      </div>
    `,
  }),
};

// ── Standalone rectangle ──────────────────────────────────────────────────────

export const RectangleModes: Story = {
  name: 'Standalone rectangle — Modos',
  render: () => ({
    template: `
      <div style="display:flex;gap:16px;flex-wrap:wrap;align-items:center">
        <pds-icon name="school" size="lg" mode="brand" shape="rectangle" />
        <pds-icon name="check_circle" size="lg" mode="success" shape="rectangle" />
        <pds-icon name="warning" size="lg" mode="warning" shape="rectangle" />
        <pds-icon name="error" size="lg" mode="error" shape="rectangle" />
      </div>
    `,
  }),
};

// ── Standalone — tamaños ──────────────────────────────────────────────────────

export const CircleSizes: Story = {
  name: 'Standalone circle — Todos los tamaños',
  render: () => ({
    template: `
      <div style="display:flex;align-items:flex-end;gap:16px">
        <pds-icon name="school" size="xs" mode="brand" shape="circle" />
        <pds-icon name="school" size="sm" mode="brand" shape="circle" />
        <pds-icon name="school" size="md" mode="brand" shape="circle" />
        <pds-icon name="school" size="lg" mode="brand" shape="circle" />
        <pds-icon name="school" size="xl" mode="brand" shape="circle" />
      </div>
    `,
  }),
};

// ── Accesibilidad ─────────────────────────────────────────────────────────────

export const A11yDecorativo: Story = {
  name: 'A11y — Decorativo (ariaHidden=true)',
  parameters: {
    docs: {
      description: {
        story: `
**Caso más común.** El ícono acompaña texto visible — el lector de pantalla ignora el ícono y lee solo el texto del elemento padre.
\`ariaHidden=true\` (default) es correcto para íconos dentro de botones, badges, labels.
        `,
      },
    },
  },
  args: { name: 'home', size: 'lg', mode: 'brand', shape: 'circle', ariaHidden: true },
};

export const A11yInformativo: Story = {
  name: 'A11y — Informativo (ariaHidden=false)',
  parameters: {
    docs: {
      description: {
        story: `
**Caso informativo.** El ícono es el único portador de información (sin texto visible acompañante).
Requiere \`ariaLabel\`. NVDA/VoiceOver anuncian *"Error en el formulario, imagen"*.
        `,
      },
    },
  },
  args: {
    name: 'error',
    size: 'lg',
    mode: 'error',
    shape: 'circle',
    ariaHidden: false,
    ariaLabel: 'Error en el formulario',
  },
};
