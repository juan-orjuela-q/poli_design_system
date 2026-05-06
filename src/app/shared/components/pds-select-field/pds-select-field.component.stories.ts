import { Meta, StoryObj } from '@storybook/angular';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { PdsSelectFieldComponent, SelectOption } from './pds-select-field.component';

const FACULTIES: SelectOption[] = [
  { value: 'engineering', label: 'Ingeniería' },
  { value: 'admin', label: 'Administración de Empresas' },
  { value: 'law', label: 'Derecho' },
  { value: 'psych', label: 'Psicología' },
  { value: 'comm', label: 'Comunicación Social' },
  { value: 'education', label: 'Educación (no disponible)', disabled: true },
];

const COUNTRIES: SelectOption[] = [
  { value: 'co', label: 'Colombia' },
  { value: 'mx', label: 'México' },
  { value: 'ar', label: 'Argentina' },
  { value: 'pe', label: 'Perú' },
  { value: 'cl', label: 'Chile' },
];

const meta: Meta<PdsSelectFieldComponent> = {
  title: 'Poli Design System / 05. Forms / Form (Select Field)',
  component: PdsSelectFieldComponent,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Etiqueta del campo. Requerida.' },
    placeholder: { control: 'text', description: 'Texto cuando no hay opción seleccionada' },
    status: {
      control: 'select',
      options: ['default', 'error', 'warning', 'success'],
      description: 'Estado semántico del campo',
    },
    helpText: { control: 'text', description: 'Texto de ayuda permanente' },
    feedbackText: { control: 'text', description: 'Texto de feedback según status' },
    required: { control: 'boolean', description: 'Campo obligatorio' },
    disabled: { control: 'boolean', description: 'Deshabilitado' },
    iconStart: { control: 'text', description: 'Ícono decorativo al inicio (Material Symbols)' },
  },
  parameters: {
    docs: {
      description: {
        component: `
Campo de selección del DS v2. Implementado como custom dropdown con \`role="combobox"\` y \`role="listbox"\`
siguiendo el patrón ARIA APG. Label persistente, soporte de opciones deshabilitadas y estados semánticos.
Compatible con Angular Reactive Forms (CVA — emite \`string | null\`).

### Cuándo usarlo
- Para elegir una opción de un listado de 5 o más ítems.
- Cuando el espacio en pantalla no permite mostrar todos los radios simultáneamente.
- Para filtros, preferencias o campos de categorización.

### Cuándo NO usarlo
- Para menos de 5 opciones — usar \`pds-radio-group\` (más rápido de escanear visualmente).
- Para selección múltiple — usar \`pds-checkbox-group\`.
- Para navegación a otra URL — usar un \`<a>\` o \`pds-link\`.

### API
\`\`\`html
<pds-select-field
  label="Facultad"
  [options]="faculties"
  [required]="true"
  [status]="facultyStatus"
  feedbackText="Selecciona tu facultad"
  [formControl]="facultyCtrl"
/>
\`\`\`

| Input          | Tipo                | Default                    | Descripción |
|----------------|---------------------|----------------------------|-------------|
| \`label\`        | \`string\` (requerido) | — | Etiqueta del campo |
| \`options\`      | \`SelectOption[]\` (requerido) | — | Lista de opciones |
| \`placeholder\`  | \`string\`         | \`'Selecciona una opción'\` | Texto sin selección |
| \`status\`       | \`'default'\\|'error'\\|'warning'\\|'success'\` | \`'default'\` | Estado semántico |
| \`helpText\`     | \`string \\| null\` | \`null\` | Texto de ayuda permanente |
| \`feedbackText\` | \`string \\| null\` | \`null\` | Texto de feedback |
| \`disabled\`     | \`boolean\`        | \`false\` | Deshabilitado |
| \`required\`     | \`boolean\`        | \`false\` | Campo obligatorio |
| \`iconStart\`    | \`string \\| null\` | \`null\` | Ícono decorativo al inicio |

**SelectOption:**
\`\`\`ts
interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}
\`\`\`

---

### Accesibilidad — WCAG 2.2

#### Criterios aplicables
| Criterio | Nivel | Aplicación |
|----------|-------|------------|
| **1.3.1 Info y relaciones** | A | \`role="combobox"\` + \`aria-labelledby\` + \`aria-controls\` conectan trigger y listbox |
| **1.4.3 Contraste mínimo** | AA | Texto de la opción seleccionada y del label ≥ 4.5:1 |
| **1.4.11 Contraste no textual** | AA | Borde del trigger ≥ 3:1 sobre el fondo de la página |
| **2.1.1 Teclado** | A | Patrón APG combobox: Enter/Space abre; flechas navegan; Enter selecciona; Escape cierra |
| **2.4.7 Foco visible** | AA | Focus ring en el trigger; indicador visual de foco en la opción activa dentro del listbox |
| **3.3.1 Identificación de errores** | A | \`feedbackText\` con \`status="error"\` describe el problema |
| **3.3.2 Etiquetas o instrucciones** | A | Label persistente visible sobre el trigger |
| **4.1.2 Nombre, rol, valor** | A | \`role="combobox"\` + \`aria-expanded\` + \`aria-haspopup="listbox"\` + \`aria-activedescendant\` |

#### Patrón ARIA combobox/listbox
\`\`\`html
<!-- Trigger -->
<div
  role="combobox"
  [attr.aria-expanded]="isOpen"
  aria-haspopup="listbox"
  [attr.aria-controls]="listboxId"
  [attr.aria-activedescendant]="activedescendant"
>
  Ingeniería
</div>

<!-- Listbox -->
<ul [id]="listboxId" role="listbox">
  <li role="option" aria-selected="true" id="option-0">Ingeniería</li>
  <li role="option" aria-selected="false" id="option-1">Administración</li>
  <li role="option" aria-disabled="true" id="option-5">Educación (no disponible)</li>
</ul>
\`\`\`

#### Navegación por teclado
| Tecla | Acción |
|-------|--------|
| **Tab** | Enfoca el trigger del select |
| **Enter / Space** | Abre el listbox (o selecciona la opción activa si está abierto) |
| **ArrowDown** | Mueve el foco a la opción siguiente (abre el listbox si está cerrado) |
| **ArrowUp** | Mueve el foco a la opción anterior |
| **Home** | Mueve el foco a la primera opción |
| **End** | Mueve el foco a la última opción |
| **Escape** | Cierra el listbox sin cambiar la selección |
| **Tab** (abierto) | Cierra el listbox y mueve el foco al siguiente elemento |

#### Anuncio en lectores de pantalla
- Trigger cerrado: *"Facultad: Ingeniería, combobox, colapsado"*
- Trigger abierto: *"Facultad: Ingeniería, combobox, expandido — 6 opciones"*
- Navegando opciones: *"Administración de Empresas, opción 2 de 6"*

#### Auditoría v1 → v2
| Hallazgo v1 (Cortés, feb 2026) | Criterio WCAG | Resolución en v2 |
|--------------------------------|---------------|------------------|
| Borde base con contraste 1.23:1 | 1.4.11 | Token semántico de borde ≥ 3:1 |
| Placeholder como etiqueta — desaparece al seleccionar | 3.3.2 | Label persistente sobre el trigger |
| Sin ARIA combobox/listbox — parecía un botón | 4.1.2 | \`role="combobox"\` + \`role="listbox"\` + \`aria-expanded\` + \`aria-activedescendant\` |
| Foco no definido en trigger ni opciones | 2.4.7 | Focus ring en trigger + indicador de opción activa en listbox |
| Estados success/warning bordes < 3:1 | 1.4.11 | Tokens \`--border-status-*\` con contraste garantizado |

### Buenas prácticas
✅ Ordena las opciones de forma lógica (alfabética, por frecuencia de uso, o por jerarquía).
✅ Usa un \`placeholder\` claro: *"Selecciona tu facultad"* — no *"-- Seleccionar --"*.
✅ Para opciones deshabilitadas, indica el motivo en el label: *"Biología (no disponible)"*.
❌ No uses el select para navegación — el usuario espera seleccionar un valor, no navegar.
❌ No deshabilites opciones sin dar contexto de por qué no están disponibles.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<PdsSelectFieldComponent>;

// ── Sandbox ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default — Sandbox',
  args: {
    label: 'Facultad',
    options: FACULTIES,
    placeholder: 'Selecciona tu facultad',
    status: 'default',
    required: false,
    disabled: false,
  },
};

// ── Todos los estados ─────────────────────────────────────────────────────────

export const AllStatuses: Story = {
  name: 'Todos los estados',
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;max-width:400px">
        <pds-select-field
          label="Estado default"
          [options]="[{value:'a',label:'Opción A'},{value:'b',label:'Opción B'}]"
          placeholder="Selecciona una opción"
        />
        <pds-select-field
          label="Estado error"
          [options]="[{value:'a',label:'Opción A'}]"
          status="error"
          feedbackText="Este campo es obligatorio"
        />
        <pds-select-field
          label="Estado warning"
          [options]="[{value:'a',label:'Opción A'},{value:'b',label:'Opción B'}]"
          status="warning"
          feedbackText="La opción seleccionada puede cambiar en el próximo período"
          value="a"
        />
        <pds-select-field
          label="Estado success"
          [options]="[{value:'a',label:'Opción A'}]"
          status="success"
          feedbackText="Facultad seleccionada correctamente"
          value="a"
        />
        <pds-select-field
          label="Deshabilitado"
          [options]="[{value:'a',label:'Opción A'}]"
          [disabled]="true"
        />
      </div>
    `,
  }),
};

// ── Con ícono ─────────────────────────────────────────────────────────────────

export const WithIcon: Story = {
  name: 'Con ícono decorativo',
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;max-width:400px">
        <pds-select-field
          label="País"
          [options]="countries"
          placeholder="Selecciona tu país"
          iconStart="flag"
        />
        <pds-select-field
          label="Facultad"
          [options]="faculties"
          placeholder="Selecciona tu facultad"
          iconStart="school"
        />
      </div>
    `,
    props: {
      countries: COUNTRIES,
      faculties: FACULTIES,
    },
  }),
};

// ── Con opciones deshabilitadas ───────────────────────────────────────────────

export const WithDisabledOptions: Story = {
  name: 'Con opciones deshabilitadas',
  args: {
    label: 'Facultad',
    options: FACULTIES,
    placeholder: 'Selecciona tu facultad',
    helpText: 'Educación no está disponible en el período actual',
  },
};

// ── Con Reactive Forms ────────────────────────────────────────────────────────

export const WithFormControl: Story = {
  name: 'Con FormControl (Reactive Forms)',
  render: () => ({
    moduleMetadata: { imports: [ReactiveFormsModule] },
    props: {
      ctrl: new FormControl<string | null>(null, Validators.required),
      faculties: FACULTIES,
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;max-width:400px;font-family:Poppins">
        <pds-select-field
          label="Facultad"
          [options]="faculties"
          placeholder="Selecciona tu facultad"
          [required]="true"
          [status]="ctrl.invalid && ctrl.touched ? 'error' : 'default'"
          [feedbackText]="ctrl.invalid && ctrl.touched ? 'Selecciona una facultad' : null"
          [formControl]="ctrl"
        />
        <p style="font-size:13px;color:#50606E;margin:0">
          Valor: <strong>{{ ctrl.value || '(sin selección)' }}</strong>
        </p>
      </div>
    `,
  }),
};

// ── Accesibilidad ─────────────────────────────────────────────────────────────

export const A11yKeyboardNav: Story = {
  name: 'A11y — Teclado combobox/listbox (Tab + flechas para probar)',
  parameters: {
    docs: {
      description: {
        story: `
**Patrón APG Combobox:**

1. Usa **Tab** para enfocar el trigger.
2. Presiona **Enter** o **Space** para abrir el listbox.
3. Usa **ArrowDown / ArrowUp** para navegar entre opciones.
4. Presiona **Enter** para seleccionar la opción activa.
5. Presiona **Escape** para cerrar sin cambiar la selección.

NVDA/VoiceOver anuncian: *"[label]: [opción], combobox, [expandido/colapsado]"*.
Las opciones deshabilitadas se anuncian como *"no disponible"*.
        `,
      },
    },
  },
  args: {
    label: 'Facultad (Tab + flechas para probar)',
    options: FACULTIES,
    placeholder: 'Selecciona tu facultad',
  },
};
