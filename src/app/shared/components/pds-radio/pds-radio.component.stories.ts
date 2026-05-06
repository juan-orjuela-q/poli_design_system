import { Meta, StoryObj } from '@storybook/angular';
import { PdsRadioComponent } from './pds-radio.component';

const meta: Meta<PdsRadioComponent> = {
  title: 'Poli Design System / 05. Forms / Form (Radio)',
  component: PdsRadioComponent,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Texto visible del radio. Requerido.' },
    name: { control: 'text', description: 'Agrupa radios del mismo nombre. Requerido.' },
    value: { control: 'text', description: 'Valor único dentro del grupo. Requerido.' },
    checked: { control: 'boolean', description: 'Estado seleccionado' },
    disabled: { control: 'boolean', description: 'Deshabilitado (mantiene tab order)' },
    tabIndex: { control: 'number', description: 'Gestionado por pds-radio-group (roving tabindex). -1 = excluir del tab order.' },
  },
  parameters: {
    docs: {
      description: {
        component: `
Opción de radio individual del DS v2. Implementado con \`<input type="radio">\` nativo oculto y control visual custom.
Normalmente se usa dentro de \`pds-radio-group\`, que gestiona el roving tabindex y la navegación por flechas.

> **Nota para devs**: En uso standalone (sin \`pds-radio-group\`), el patrón APG de roving tabindex
> y la navegación por flechas debe implementarse manualmente. Para la mayoría de los casos, usa directamente \`pds-radio-group\`.

### Cuándo usarlo directamente
- Cuando necesitas un radio fuera de un grupo formal (p. ej. en una celda de tabla con su propio contexto).
- Cuando gestionas tú mismo el tab order y la selección exclusiva.

### Cuándo NO usarlo directamente
- Para la mayoría de los casos — usa \`pds-radio-group\`, que gestiona tab order, flechas y semántica de grupo.

### API
\`\`\`html
<pds-radio
  label="Opción A"
  name="myGroup"
  value="a"
  [checked]="selectedValue === 'a'"
  (checkedChange)="selectedValue = $event"
/>
\`\`\`

| Input      | Tipo      | Default | Descripción |
|------------|-----------|---------|-------------|
| \`label\`   | \`string\` (requerido) | — | Texto del radio |
| \`name\`    | \`string\` (requerido) | — | Agrupa radios del mismo formulario |
| \`value\`   | \`string\` (requerido) | — | Valor único del radio |
| \`checked\` | \`boolean\` | \`false\` | Estado seleccionado |
| \`disabled\` | \`boolean\` | \`false\` | Deshabilitado |
| \`tabIndex\` | \`number\` | \`0\` | Gestionado externamente por pds-radio-group |

| Output       | Tipo     | Descripción |
|--------------|----------|-------------|
| \`checkedChange\` | \`string\` | Emite el \`value\` al seleccionar |

---

### Accesibilidad — WCAG 2.2

#### Criterios aplicables
| Criterio | Nivel | Aplicación |
|----------|-------|------------|
| **1.3.1 Info y relaciones** | A | \`<input type="radio">\` nativo con \`<label>\` asociado |
| **1.4.11 Contraste no textual** | AA | El círculo del radio ≥ 3:1 sobre el fondo en todos los estados |
| **2.1.1 Teclado** | A | Operable con Tab/Space cuando está standalone; flechas cuando está en pds-radio-group |
| **2.4.7 Foco visible** | AA | Focus ring CSS vía \`.sr-only:focus-visible + .__control\` |
| **2.5.8 Tamaño del objetivo** | AA | Área táctil 48×48px vía \`::before\` |
| **4.1.2 Nombre, rol, valor** | A | Input nativo: \`role="radio"\` implícito; \`aria-checked\` automático |

#### Anuncio en lectores de pantalla
- Seleccionado: *"Opción A, botón de opción, seleccionado — [nombre del grupo]"*
- No seleccionado: *"Opción B, botón de opción, no seleccionado"*
- Deshabilitado: *"Opción C, botón de opción, no disponible"*

#### Auditoría v1 → v2
| Hallazgo v1 (Cortés, feb 2026) | Criterio WCAG | Resolución en v2 |
|--------------------------------|---------------|------------------|
| Hover y disabled con contraste 2.48:1 | 1.4.11 | Tokens semánticos con contraste ≥ 3:1 |
| Sin navegación por flechas entre radios | 2.1.1 | Implementado en \`pds-radio-group\` (roving tabindex + ArrowKey) |
| Área táctil < 44px | 2.5.8 | \`::before\` con área 48×48px |

### Buenas prácticas
✅ Usa siempre \`pds-radio-group\` para grupos de radios — proporciona fieldset, legend y navegación por flechas.
✅ El \`name\` agrupa los radios para el comportamiento nativo de exclusión mutua del browser.
✅ El \`value\` debe ser único dentro del grupo.
❌ No uses standalone \`pds-radio\` para grupos de opciones — usa \`pds-radio-group\`.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<PdsRadioComponent>;

// ── Sandbox ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default — Sandbox',
  args: {
    label: 'Opción A',
    name: 'demo-group',
    value: 'a',
    checked: false,
    disabled: false,
  },
};

// ── Estados ───────────────────────────────────────────────────────────────────

export const AllStates: Story = {
  name: 'Todos los estados',
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:12px">
        <pds-radio label="No seleccionado (default)" name="states" value="a" [checked]="false" />
        <pds-radio label="Seleccionado" name="states" value="b" [checked]="true" />
        <pds-radio label="Deshabilitado — no seleccionado" name="states" value="c" [checked]="false" [disabled]="true" />
        <pds-radio label="Deshabilitado — seleccionado" name="states" value="d" [checked]="true" [disabled]="true" />
      </div>
    `,
  }),
};

// ── Uso standalone ────────────────────────────────────────────────────────────

export const StandaloneGroup: Story = {
  name: 'Grupo manual (usa pds-radio-group para la mayoría de los casos)',
  parameters: {
    docs: {
      description: {
        story: `
Ejemplo de gestión manual de un grupo de radios standalone.
**Recomendación**: usa \`pds-radio-group\` — gestiona automáticamente el roving tabindex,
la navegación por flechas (APG) y la semántica \`<fieldset>\`+\`<legend>\`.
        `,
      },
    },
  },
  render: () => ({
    props: { selected: 'b' },
    template: `
      <fieldset style="border:none;padding:0;margin:0">
        <legend style="font-family:Poppins;font-size:14px;font-weight:600;color:#0F385A;margin-bottom:8px">
          Modalidad de estudio
        </legend>
        <div style="display:flex;flex-direction:column;gap:8px">
          <pds-radio label="Presencial" name="mode" value="a" [checked]="selected === 'a'" (checkedChange)="selected = $event" />
          <pds-radio label="Virtual" name="mode" value="b" [checked]="selected === 'b'" (checkedChange)="selected = $event" />
          <pds-radio label="Híbrido" name="mode" value="c" [checked]="selected === 'c'" (checkedChange)="selected = $event" />
        </div>
      </fieldset>
      <p style="font-family:Poppins;font-size:13px;color:#50606E;margin-top:12px">Seleccionado: {{ selected }}</p>
    `,
  }),
};

// ── Accesibilidad ─────────────────────────────────────────────────────────────

export const A11yFocusVisible: Story = {
  name: 'A11y — Focus visible (Tab para probar)',
  parameters: {
    docs: {
      description: {
        story: 'Usa **Tab** para enfocar cada radio. El focus ring CSS aparece sin JS — selector \`.sr-only:focus-visible + .__control\`.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:12px">
        <pds-radio label="Opción A" name="a11y" value="a" [checked]="false" />
        <pds-radio label="Opción B (seleccionada)" name="a11y" value="b" [checked]="true" />
        <pds-radio label="Opción C (deshabilitada)" name="a11y" value="c" [checked]="false" [disabled]="true" />
      </div>
    `,
  }),
};
