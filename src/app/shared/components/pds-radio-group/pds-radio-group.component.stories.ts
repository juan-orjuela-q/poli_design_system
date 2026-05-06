import { Meta, StoryObj } from '@storybook/angular';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PdsRadioGroupComponent, RadioOption } from './pds-radio-group.component';

const OPTIONS: RadioOption[] = [
  { value: 'presencial', label: 'Presencial' },
  { value: 'virtual', label: 'Virtual' },
  { value: 'hibrido', label: 'Híbrido' },
];

const OPTIONS_WITH_DISABLED: RadioOption[] = [
  { value: 'presencial', label: 'Presencial' },
  { value: 'virtual', label: 'Virtual' },
  { value: 'hibrido', label: 'Híbrido (no disponible)', disabled: true },
  { value: 'intensivo', label: 'Intensivo' },
];

const meta: Meta<PdsRadioGroupComponent> = {
  title: 'Poli Design System / 05. Forms / Form (Radio Group)',
  component: PdsRadioGroupComponent,
  tags: ['autodocs'],
  argTypes: {
    groupLabel: { control: 'text', description: 'Etiqueta del grupo (leyenda del fieldset). Requerida.' },
    disabled: { control: 'boolean', description: 'Deshabilita todas las opciones del grupo' },
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Orientación de la lista de radios',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
Grupo de opciones mutuamente excluyentes del DS v2. Implementado con \`<fieldset>\` + \`<legend>\`
y navegación por teclado APG (flechas mueven la selección automáticamente).
Compatible con Angular Reactive Forms (CVA — emite \`string | null\`).

### Cuándo usarlo
- Cuando el usuario debe elegir exactamente una opción de un conjunto pequeño (2-7 opciones).
- Para preferencias, modalidades, tipos de documento, etc.
- Cuando las opciones necesitan verse todas simultáneamente (< 7 opciones).

### Cuándo NO usarlo
- Para más de 7 opciones — usar \`pds-select-field\`.
- Para selección múltiple — usar \`pds-checkbox-group\`.
- Para activar/desactivar una función — usar \`pds-toggle\`.

### API
\`\`\`html
<pds-radio-group
  groupLabel="Modalidad de estudio"
  [options]="options"
  [formControl]="modalityCtrl"
  (valueChange)="onModalityChange($event)"
/>
\`\`\`

| Input         | Tipo                              | Default       | Descripción |
|---------------|-----------------------------------|---------------|-------------|
| \`groupLabel\`  | \`string\` (requerido)           | —             | Leyenda del fieldset |
| \`options\`     | \`RadioOption[]\` (requerido)    | —             | Opciones del grupo |
| \`name\`        | \`string\`                       | auto          | Nombre del grupo (generado automáticamente) |
| \`disabled\`    | \`boolean\`                      | \`false\`     | Deshabilita todo el grupo |
| \`orientation\` | \`'vertical'\\|'horizontal'\`   | \`'vertical'\` | Disposición de la lista |

**RadioOption:**
\`\`\`ts
interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}
\`\`\`

| Output       | Tipo                 | Descripción |
|--------------|----------------------|-------------|
| \`valueChange\` | \`string\` | Emite el value de la opción seleccionada |

---

### Accesibilidad — WCAG 2.2

#### Criterios aplicables
| Criterio | Nivel | Aplicación |
|----------|-------|------------|
| **1.3.1 Info y relaciones** | A | \`<fieldset>\` + \`<legend>\` comunican la relación de grupo |
| **1.4.11 Contraste no textual** | AA | Círculos del radio ≥ 3:1 sobre el fondo |
| **2.1.1 Teclado** | A | Patrón APG radiogroup: flechas mueven la selección automáticamente |
| **2.4.7 Foco visible** | AA | Focus ring CSS en el radio seleccionado/enfocado |
| **2.5.8 Tamaño del objetivo** | AA | Área táctil 48×48px por opción |
| **3.3.2 Etiquetas o instrucciones** | A | La leyenda del fieldset describe el propósito del grupo |
| **4.1.2 Nombre, rol, valor** | A | \`role="radiogroup"\` implícito en fieldset; \`aria-checked\` por input nativo |

#### Navegación por teclado — APG Radiogroup Pattern
| Tecla | Acción |
|-------|--------|
| **Tab** | Entra al grupo — foco al radio seleccionado (o al primero si ninguno) |
| **ArrowDown / ArrowRight** | Selecciona y enfoca el radio siguiente (circular) |
| **ArrowUp / ArrowLeft** | Selecciona y enfoca el radio anterior (circular) |
| **Home** | Selecciona y enfoca la primera opción habilitada |
| **End** | Selecciona y enfoca la última opción habilitada |
| **Tab** (dentro) | Sale del grupo al siguiente elemento de la página |

Las opciones deshabilitadas se omiten al navegar con flechas.

> **Diferencia con Tabs**: en radiogroup, las flechas **seleccionan** inmediatamente (Automatic Activation).
> En tabs (APG Manual Activation), las flechas solo mueven el foco sin activar.

#### Roving tabindex
Solo la opción seleccionada (o la primera si ninguna lo está) tiene \`tabindex="0"\`.
El resto tiene \`tabindex="-1"\`. Esto permite que Tab entre al grupo en un único punto.

#### Atributos ARIA
| Atributo | Dónde | Función |
|----------|-------|---------|
| \`role="radiogroup"\` | en el fieldset | Identifica el grupo (implícito con fieldset) |
| \`role="radio"\` | en cada input nativo | Implícito en \`<input type="radio">\` |
| \`aria-checked\` | en cada radio | Automático — refleja el estado del input nativo |
| \`aria-disabled\` | en cada radio | Cuando la opción individual está deshabilitada |

#### Anuncio en lectores de pantalla
- Al entrar al grupo con Tab: *"Presencial, botón de opción, seleccionado, 1 de 3 — Modalidad de estudio, grupo"*
- Al navegar con flechas: *"Virtual, botón de opción, seleccionado, 2 de 3"*

#### Auditoría v1 → v2
| Hallazgo v1 (Cortés, feb 2026) | Criterio WCAG | Resolución en v2 |
|--------------------------------|---------------|------------------|
| Sin navegación por flechas entre radios | 2.1.1 | \`@HostListener('keydown')\` en el grupo: ArrowDown/Up/Left/Right/Home/End |
| Tab recorría todos los radios individualmente | 2.4.3 | Roving tabindex: solo el seleccionado tiene tabindex=0 |
| Sin agrupación semántica (legend/fieldset) | 1.3.1 | \`<fieldset>\` + \`<legend>\` con el groupLabel |

### Buenas prácticas
✅ Usa \`groupLabel\` descriptivo: *"Modalidad de estudio"*, no *"Opción"*.
✅ Pre-selecciona la opción más común — el usuario puede cambiarla con las flechas.
✅ Para más de 6-7 opciones, usa \`pds-select-field\` — los radio grupos con muchas opciones son difíciles de navegar.
❌ No uses el radio group para selección múltiple — usa \`pds-checkbox-group\`.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<PdsRadioGroupComponent>;

// ── Sandbox ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default — Sandbox',
  args: {
    groupLabel: 'Modalidad de estudio',
    options: OPTIONS,
    disabled: false,
    orientation: 'vertical',
  },
};

// ── Orientaciones ─────────────────────────────────────────────────────────────

export const Orientations: Story = {
  name: 'Vertical vs Horizontal',
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:32px">
        <pds-radio-group
          groupLabel="Vertical (default)"
          [options]="[{value:'a',label:'Opción A'},{value:'b',label:'Opción B'},{value:'c',label:'Opción C'}]"
          orientation="vertical"
        />
        <pds-radio-group
          groupLabel="Horizontal"
          [options]="[{value:'a',label:'Opción A'},{value:'b',label:'Opción B'},{value:'c',label:'Opción C'}]"
          orientation="horizontal"
        />
      </div>
    `,
  }),
};

// ── Con opción deshabilitada ──────────────────────────────────────────────────

export const WithDisabledOption: Story = {
  name: 'Con opciones deshabilitadas individualmente',
  args: {
    groupLabel: 'Modalidad de estudio',
    options: OPTIONS_WITH_DISABLED,
  },
};

// ── Con Reactive Forms ────────────────────────────────────────────────────────

export const WithFormControl: Story = {
  name: 'Con FormControl (Reactive Forms)',
  render: () => ({
    moduleMetadata: { imports: [ReactiveFormsModule] },
    props: {
      ctrl: new FormControl<string | null>('virtual'),
      options: OPTIONS,
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;font-family:Poppins">
        <pds-radio-group
          groupLabel="Modalidad de estudio"
          [options]="options"
          [formControl]="ctrl"
        />
        <p style="font-size:13px;color:#50606E;margin:0">
          Valor del FormControl: <strong>{{ ctrl.value }}</strong>
        </p>
        <button
          (click)="ctrl.setValue('presencial')"
          style="padding:6px 12px;font-family:Poppins;font-size:13px;border-radius:6px;border:1px solid #0F385A;cursor:pointer;width:fit-content"
        >
          Seleccionar 'Presencial' externamente
        </button>
      </div>
    `,
  }),
};

// ── Accesibilidad ─────────────────────────────────────────────────────────────

export const A11yArrowKeyNavigation: Story = {
  name: 'A11y — Flechas para navegar (APG pattern)',
  parameters: {
    docs: {
      description: {
        story: `
**Patrón APG Radiogroup (Automatic Activation):**

1. Usa **Tab** para entrar al grupo — el foco va directamente al radio seleccionado.
2. Usa **ArrowDown** o **ArrowRight** para seleccionar el siguiente radio (circular).
3. Usa **ArrowUp** o **ArrowLeft** para el anterior.
4. **Home** y **End** van a la primera/última opción habilitada.
5. Las opciones deshabilitadas se omiten al navegar con flechas.
6. Usa **Tab** para salir del grupo al siguiente elemento de la página.

NVDA/VoiceOver anuncian: *"[label], botón de opción, seleccionado, [n] de [total]"*.
        `,
      },
    },
  },
  args: {
    groupLabel: 'Modalidad de estudio (Tab para entrar, flechas para navegar)',
    options: OPTIONS_WITH_DISABLED,
  },
};
