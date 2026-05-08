import { Meta, StoryObj } from '@storybook/angular';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PdsCheckboxGroupComponent, CheckboxOption } from './pds-checkbox-group.component';

const OPTIONS: CheckboxOption[] = [
  { value: 'math', label: 'Matemáticas' },
  { value: 'physics', label: 'Física' },
  { value: 'chemistry', label: 'Química' },
  { value: 'biology', label: 'Biología' },
];

const OPTIONS_WITH_DISABLED: CheckboxOption[] = [
  { value: 'math', label: 'Matemáticas' },
  { value: 'physics', label: 'Física' },
  { value: 'chemistry', label: 'Química (no disponible)', disabled: true },
  { value: 'biology', label: 'Biología' },
];

const meta: Meta<PdsCheckboxGroupComponent> = {
  title: 'Poli Design System / 05. Forms / Form (Checkbox Group)',
  component: PdsCheckboxGroupComponent,
  tags: ['autodocs'],
  argTypes: {
    groupLabel: { control: 'text', description: 'Etiqueta del grupo (leyenda del fieldset). Requerida.' },
    disabled: { control: 'boolean', description: 'Deshabilita todos los checkboxes del grupo' },
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Orientación de la lista de checkboxes',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
Grupo de checkboxes del DS v2. Implementado con \`<fieldset>\` + \`<legend>\` para que los lectores
de pantalla anuncien el contexto del grupo al enfocar cualquier checkbox hijo.
Compatible con Angular Reactive Forms (CVA — emite \`string[]\`).

### Cuándo usarlo
- Cuando hay múltiples checkboxes relacionados semánticamente entre sí.
- Para filtros de búsqueda, preferencias de notificación, selección de materias.
- Siempre que los checkboxes deban anunciarse con un contexto común.

### Cuándo NO usarlo
- No usar para una sola opción — usar \`pds-checkbox\` directamente.
- No usar para selección exclusiva (una sola opción posible) — usar \`pds-radio-group\`.

### API
\`\`\`html
<pds-checkbox-group
  groupLabel="Materias de interés"
  [options]="options"
  [formControl]="materiasCtrl"
  (valuesChange)="onMateriaChange($event)"
/>
\`\`\`

| Input         | Tipo               | Default       | Descripción |
|---------------|--------------------|---------------|-------------|
| \`groupLabel\`  | \`string\` (requerido) | — | Leyenda del fieldset |
| \`options\`     | \`CheckboxOption[]\` (requerido) | — | Opciones disponibles |
| \`disabled\`    | \`boolean\`        | \`false\`     | Deshabilita todas las opciones |
| \`orientation\` | \`'vertical'\\|'horizontal'\` | \`'vertical'\` | Disposición de la lista |

**CheckboxOption:**
\`\`\`ts
interface CheckboxOption {
  value: string;
  label: string;
  disabled?: boolean;  // deshabilita solo esta opción
}
\`\`\`

| Output        | Tipo       | Descripción |
|---------------|------------|-------------|
| \`valuesChange\` | \`string[]\` | Emite el array de valores seleccionados al cambiar |

---

### Accesibilidad — WCAG 2.2

#### Criterios aplicables
| Criterio | Nivel | Aplicación |
|----------|-------|------------|
| **1.3.1 Info y relaciones** | A | \`<fieldset>\` + \`<legend>\` comunican la relación de grupo |
| **1.4.3 Contraste mínimo** | AA | Texto de labels y leyenda ≥ 4.5:1 |
| **1.4.11 Contraste no textual** | AA | Recuadros de checkbox ≥ 3:1 en todos los estados |
| **2.1.1 Teclado** | A | Tab navega entre checkboxes; Space marca/desmarca cada uno |
| **2.4.7 Foco visible** | AA | Focus ring CSS en cada checkbox hijo |
| **2.5.8 Tamaño del objetivo** | AA | Área táctil 48×48px vía \`::before\` en cada checkbox |
| **3.3.2 Etiquetas o instrucciones** | A | La leyenda del fieldset describe el propósito del grupo |
| **4.1.2 Nombre, rol, valor** | A | Cada input nativo tiene su label asociado |

#### Estructura HTML generada
\`\`\`html
<fieldset>
  <legend>Materias de interés</legend>
  <ul role="list">
    <li>
      <input type="checkbox" id="pds-checkbox-1" ...>
      <div class="__control">...</div>
      <label for="pds-checkbox-1">Matemáticas</label>
    </li>
    ...
  </ul>
</fieldset>
\`\`\`

#### Navegación por teclado
| Tecla | Acción |
|-------|--------|
| **Tab** | Mueve el foco entre cada checkbox del grupo |
| **Space** | Marca / desmarca el checkbox enfocado |

#### Anuncio en lectores de pantalla
Al enfocar cada checkbox: *"Matemáticas, casilla de verificación, no marcada — Materias de interés, grupo"*.
La leyenda del fieldset se anuncia automáticamente como contexto del grupo.

#### Auditoría v1 → v2
| Hallazgo v1 (Cortés, feb 2026) | Criterio WCAG | Resolución en v2 |
|--------------------------------|---------------|------------------|
| Checkboxes sin agrupación semántica — labels aislados | 1.3.1 | \`<fieldset>\` + \`<legend>\` en el grupo |
| Falta de contexto de grupo en lectores de pantalla | 1.3.1 | La leyenda se anuncia automáticamente con cada checkbox |
| Área táctil < 44px | 2.5.8 | Área 48×48px vía \`::before\` en cada \`pds-checkbox\` |

### Buenas prácticas
✅ La \`groupLabel\` debe describir el propósito del grupo: *"Materias de interés"*, no *"Selección"*.
✅ Usa \`orientation="horizontal"\` solo si hay pocas opciones (< 4) y el layout lo permite.
✅ Opciones individuales deshabilitadas: usa \`disabled\` en el CheckboxOption, no en el grupo.
❌ No uses el grupo sin \`groupLabel\` — la leyenda es obligatoria para que el \`<fieldset>\` sea accesible.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<PdsCheckboxGroupComponent>;

// ── Sandbox ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default — Sandbox',
  args: {
    groupLabel: 'Materias de interés',
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
        <pds-checkbox-group
          groupLabel="Vertical (default)"
          [options]="[{value:'a',label:'Opción A'},{value:'b',label:'Opción B'},{value:'c',label:'Opción C'}]"
          orientation="vertical"
        />
        <pds-checkbox-group
          groupLabel="Horizontal"
          [options]="[{value:'a',label:'Opción A'},{value:'b',label:'Opción B'},{value:'c',label:'Opción C'}]"
          orientation="horizontal"
        />
      </div>
    `,
  }),
};

// ── Con opciones deshabilitadas ───────────────────────────────────────────────

export const WithDisabledOptions: Story = {
  name: 'Con opciones deshabilitadas individualmente',
  args: {
    groupLabel: 'Materias disponibles',
    options: OPTIONS_WITH_DISABLED,
  },
};

// ── Grupo completo deshabilitado ──────────────────────────────────────────────

export const GroupDisabled: Story = {
  name: 'Grupo completo deshabilitado',
  args: {
    groupLabel: 'Materias (no disponibles en este semestre)',
    options: OPTIONS,
    disabled: true,
  },
};

// ── Con Reactive Forms ────────────────────────────────────────────────────────

export const WithFormControl: Story = {
  name: 'Con FormControl (Reactive Forms)',
  render: () => ({
    moduleMetadata: { imports: [ReactiveFormsModule] },
    props: {
      ctrl: new FormControl<string[]>(['math']),
      options: OPTIONS,
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;font-family:Poppins">
        <pds-checkbox-group
          groupLabel="Materias de interés"
          [options]="options"
          [formControl]="ctrl"
        />
        <p style="font-size:13px;color:#50606E;margin:0">
          Seleccionadas: <strong>{{ ctrl.value | json }}</strong>
        </p>
      </div>
    `,
  }),
};

// ── Accesibilidad ─────────────────────────────────────────────────────────────

export const A11yFieldset: Story = {
  name: 'A11y — fieldset + legend (inspeccionar estructura)',
  parameters: {
    docs: {
      description: {
        story: `
Abre el inspector de accesibilidad y verifica:
- El componente raíz es un \`<fieldset>\`.
- La \`groupLabel\` se renderiza como \`<legend>\` dentro del fieldset.
- Cada checkbox hijo tiene su \`<label>\` asociado por \`for\`/\`id\`.
- Al enfocar con Tab, el lector de pantalla anuncia el checkbox seguido del grupo: *"[label], casilla — [groupLabel], grupo"*.
        `,
      },
    },
  },
  args: {
    groupLabel: 'Notificaciones que deseo recibir',
    options: [
      { value: 'email', label: 'Correo electrónico' },
      { value: 'sms', label: 'Mensaje de texto (SMS)' },
      { value: 'push', label: 'Notificaciones push' },
    ],
  },
};
