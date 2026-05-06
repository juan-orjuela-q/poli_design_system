import { Meta, StoryObj } from '@storybook/angular';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PdsDatePickerComponent } from './pds-date-picker.component';

const meta: Meta<PdsDatePickerComponent> = {
  title: 'Poli Design System / 05. Forms / Form (Date Picker)',
  component: PdsDatePickerComponent,
  decorators: [],
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Etiqueta del campo. Requerida.' },
    mode: {
      control: 'select',
      options: ['single', 'range'],
      description: 'Modo de selección: fecha única o rango de fechas',
    },
    status: {
      control: 'select',
      options: ['default', 'error', 'warning', 'success'],
      description: 'Estado semántico',
    },
    placeholder: { control: 'text', description: 'Placeholder del input de fecha' },
    required: { control: 'boolean', description: 'Campo obligatorio' },
    disabled: { control: 'boolean', description: 'Deshabilitado' },
  },
  parameters: {
    docs: {
      description: {
        component: `
Selector de fecha del DS v2. Disponible en modo **single** (fecha única) y **range** (rango de fechas).
Implementa un calendario accesible con navegación por teclado: flechas entre días,
teclas de página para cambiar de mes/año.
Compatible con Angular Reactive Forms (CVA). Usa \`date-fns\` con localización en español.

### Cuándo usarlo
- Para capturar fechas de nacimiento, fechas de inicio/fin, fechas de reserva.
- Cuando el usuario necesita seleccionar una fecha sin teclearla manualmente.
- Para rangos de fechas en filtros de búsqueda o reservas.

### Cuándo NO usarlo
- No usar para seleccionar solo el año o solo el mes — considera un \`pds-select-field\`.
- No usar cuando la fecha exacta es muy específica y el usuario la conoce — un \`pds-input-field type="date"\` puede ser más rápido.

### API
\`\`\`html
<!-- Fecha única -->
<pds-date-picker
  label="Fecha de nacimiento"
  mode="single"
  [required]="true"
  [formControl]="birthDateCtrl"
/>

<!-- Rango de fechas -->
<pds-date-picker
  label="Período de inscripción"
  mode="range"
  [formControl]="rangeCtrl"
/>
\`\`\`

| Input       | Tipo                | Default       | Descripción |
|-------------|---------------------|---------------|-------------|
| \`label\`    | \`string\` (requerido) | — | Etiqueta del campo |
| \`mode\`     | \`'single'\\|'range'\` | \`'single'\` | Modo de selección |
| \`status\`   | \`DatePickerStatus\` | \`'default'\` | Estado semántico |
| \`placeholder\` | \`string\`       | \`'dd/mm/yyyy'\` | Formato de fecha |
| \`minDate\`  | \`Date \\| null\`  | \`null\`      | Fecha mínima seleccionable |
| \`maxDate\`  | \`Date \\| null\`  | \`null\`      | Fecha máxima seleccionable |
| \`disabled\` | \`boolean\`        | \`false\`     | Deshabilitado |
| \`required\` | \`boolean\`        | \`false\`     | Campo obligatorio |

---

### Accesibilidad — WCAG 2.2

#### Criterios aplicables
| Criterio | Nivel | Aplicación |
|----------|-------|------------|
| **1.3.1 Info y relaciones** | A | \`role="grid"\` en el calendario; encabezados de día en \`<th>\` |
| **1.4.3 Contraste mínimo** | AA | Números de día ≥ 4.5:1 sobre fondo; día seleccionado ≥ 4.5:1 |
| **2.1.1 Teclado** | A | Calendario navegable con flechas; Enter selecciona; Escape cierra |
| **2.4.3 Orden del foco** | A | Al abrir el calendario, el foco va al día seleccionado o al día actual |
| **2.4.7 Foco visible** | AA | Indicador de foco visible en el día activo del calendario |
| **3.3.2 Etiquetas o instrucciones** | A | Label persistente + placeholder con el formato esperado |
| **4.1.2 Nombre, rol, valor** | A | Input de texto con \`aria-haspopup="grid"\`; días con \`aria-label\` de fecha completa |

#### Navegación por teclado en el calendario
| Tecla | Acción |
|-------|--------|
| **Tab** | Enfoca el input de fecha |
| **Enter / Space** | Abre el calendario |
| **ArrowLeft / ArrowRight** | Día anterior / siguiente |
| **ArrowUp / ArrowDown** | Semana anterior / siguiente |
| **PageUp** | Mes anterior |
| **PageDown** | Mes siguiente |
| **Ctrl+PageUp** | Año anterior |
| **Ctrl+PageDown** | Año siguiente |
| **Home** | Primer día del mes |
| **End** | Último día del mes |
| **Enter** | Selecciona el día enfocado |
| **Escape** | Cierra el calendario sin selección |

#### Atributos ARIA en el calendario
| Atributo | Dónde | Función |
|----------|-------|---------|
| \`role="grid"\` | en la tabla del calendario | Identifica la grilla de días |
| \`aria-label="[mes año]"\` | en la grilla | Nombre del mes visible |
| \`aria-label="[fecha completa]"\` | en cada celda de día | Fecha completa para lectores de pantalla |
| \`aria-selected="true"\` | en el día seleccionado | Indica la selección actual |
| \`aria-disabled="true"\` | en días fuera de rango | Días no seleccionables |
| \`aria-current="date"\` | en el día de hoy | Identifica la fecha actual |

#### Anuncio en lectores de pantalla
- Al enfocar el input: *"Fecha de nacimiento, campo de texto — formato dd/mm/yyyy"*
- Al abrir el calendario: *"Calendario — mayo 2026"*
- Navegando días: *"lunes, 4 de mayo de 2026"*
- Día seleccionado: *"miércoles, 15 de mayo de 2026, seleccionado"*

#### Auditoría v1 → v2
| Hallazgo v1 (Cortés, feb 2026) | Criterio WCAG | Resolución en v2 |
|--------------------------------|---------------|------------------|
| Sin foco visible en el calendario — las celdas de día no eran focusables | 2.4.7 | \`role="grid"\` con celdas focusables y anillo de foco |
| Navegación de grilla sin semántica — divs y spans sin roles | 4.1.2 | \`role="grid"\` + \`role="gridcell"\` + \`aria-label\` en cada día |
| Sin navegación por teclado dentro del calendario | 2.1.1 | Flechas navegan días; PageUp/Down cambia de mes; Escape cierra |

### Buenas prácticas
✅ Usa \`minDate\` y \`maxDate\` para limitar el rango seleccionable y evitar fechas inválidas.
✅ El \`placeholder\` debe mostrar el formato esperado: \`dd/mm/yyyy\`.
✅ Para fechas de nacimiento, establece \`maxDate=hoy\` para evitar fechas futuras.
❌ No uses el date picker para seleccionar solo el año — un \`pds-select-field\` es más accesible.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<PdsDatePickerComponent>;

// ── Sandbox ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default — Sandbox',
  args: {
    label: 'Fecha de nacimiento',
    mode: 'single',
    status: 'default',
    required: false,
    disabled: false,
  },
};

// ── Modo single ───────────────────────────────────────────────────────────────

export const SingleMode: Story = {
  name: 'Modo fecha única',
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;max-width:400px">
        <pds-date-picker label="Fecha de nacimiento" mode="single" />
        <pds-date-picker label="Fecha de inicio del curso" mode="single" [required]="true" />
      </div>
    `,
  }),
};

// ── Modo range ────────────────────────────────────────────────────────────────

export const RangeMode: Story = {
  name: 'Modo rango de fechas',
  render: () => ({
    template: `
      <div style="max-width:500px">
        <pds-date-picker
          label="Período de inscripción"
          mode="range"
          helpText="Selecciona la fecha de inicio y fin del período"
        />
      </div>
    `,
  }),
};

// ── Estados ───────────────────────────────────────────────────────────────────

export const AllStatuses: Story = {
  name: 'Todos los estados',
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;max-width:400px">
        <pds-date-picker label="Default" mode="single" />
        <pds-date-picker label="Error" mode="single" status="error" feedbackText="La fecha seleccionada no es válida" />
        <pds-date-picker label="Warning" mode="single" status="warning" feedbackText="El período está próximo a vencer" />
        <pds-date-picker label="Success" mode="single" status="success" feedbackText="Fecha registrada correctamente" />
        <pds-date-picker label="Deshabilitado" mode="single" [disabled]="true" />
      </div>
    `,
  }),
};

// ── Con rango de fechas válidas ───────────────────────────────────────────────

export const WithDateConstraints: Story = {
  name: 'Con rango de fechas válidas',
  parameters: {
    docs: {
      description: {
        story: 'Los días fuera del rango definido por \`minDate\` y \`maxDate\` tienen \`aria-disabled="true"\` y no son seleccionables.',
      },
    },
  },
  render: () => ({
    props: {
      minDate: new Date(2026, 0, 1),
      maxDate: new Date(2026, 11, 31),
    },
    template: `
      <div style="max-width:400px">
        <pds-date-picker
          label="Fecha de inscripción (solo 2026)"
          mode="single"
          [minDate]="minDate"
          [maxDate]="maxDate"
          helpText="Solo se permiten fechas del año 2026"
        />
      </div>
    `,
  }),
};

// ── Accesibilidad ─────────────────────────────────────────────────────────────

export const A11yKeyboardNav: Story = {
  name: 'A11y — Teclado en el calendario (Tab + flechas)',
  parameters: {
    docs: {
      description: {
        story: `
1. Usa **Tab** para enfocar el campo de fecha.
2. Presiona **Enter** para abrir el calendario.
3. Usa **ArrowLeft/Right** para navegar entre días.
4. Usa **ArrowUp/Down** para saltar semanas.
5. Usa **PageUp/PageDown** para cambiar de mes.
6. Presiona **Enter** para seleccionar el día enfocado.
7. Presiona **Escape** para cerrar sin selección.

NVDA/VoiceOver anuncian la fecha completa de cada celda: *"lunes, 4 de mayo de 2026"*.
        `,
      },
    },
  },
  args: {
    label: 'Fecha de matrícula (Tab + flechas para probar)',
    mode: 'single',
  },
};
