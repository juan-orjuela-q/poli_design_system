import type { Meta, StoryObj } from '@storybook/angular';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { PdsTimePickerComponent } from './pds-time-picker.component';

const meta: Meta<PdsTimePickerComponent> = {
  title: 'Poli Design System / 05. Forms / Form (Time Picker)',
  component: PdsTimePickerComponent,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Etiqueta del campo. Requerida.' },
    status: {
      control: 'select',
      options: ['default', 'error', 'warning', 'success'],
      description: 'Estado semántico del campo',
    },
    helpText: { control: 'text', description: 'Texto de ayuda contextual (aparece en tooltip)' },
    feedbackText: { control: 'text', description: 'Texto de feedback según estado' },
    value: { control: 'text', description: 'Valor inicial en formato HH:mm o HH:mm:ss' },
    min: { control: 'text', description: 'Hora mínima (HH:mm)' },
    max: { control: 'text', description: 'Hora máxima (HH:mm)' },
    step: { control: 'number', description: 'Incremento en segundos (60 = sin segundos, 1 = con segundos)' },
    required: { control: 'boolean', description: 'Campo obligatorio' },
    disabled: { control: 'boolean', description: 'Deshabilitado' },
    name: { control: 'text', description: 'Nombre del campo para formularios HTML' },
  },
  parameters: {
    docs: {
      description: {
        component: `
Campo de hora del DS v2. Implementado sobre \`<input type="time">\` nativo para máxima compatibilidad con AT y teclado.
Label persistente, soporte de rango mínimo/máximo, granularidad configurable con \`step\` y estados semánticos.
Compatible con Angular Reactive Forms (CVA — emite \`string\` en formato HH:mm o HH:mm:ss).

### Cuándo usarlo
- Para capturar horas de inicio/fin en formularios de reserva, horarios de clase o franjas de atención.
- Cuando el usuario necesita especificar una hora concreta sin teclearla manualmente.
- Para filtros de búsqueda por rango horario.

### Cuándo NO usarlo
- No usar para seleccionar solo un período del día (mañana/tarde/noche) — usar \`pds-select-field\`.
- No usar cuando la hora ya está determinada por el sistema — muestra el valor como texto estático.

### API
\`\`\`html
<pds-time-picker
  label="Hora de inicio"
  [required]="true"
  min="08:00"
  max="18:00"
  [step]="900"
  helpText="Franjas disponibles cada 15 minutos"
  [formControl]="startTimeCtrl"
/>
\`\`\`

| Input          | Tipo                | Default     | Descripción |
|----------------|---------------------|-------------|-------------|
| \`label\`        | \`string\` (requerido) | — | Etiqueta del campo |
| \`status\`       | \`TimePickerStatus\` | \`'default'\` | Estado semántico |
| \`value\`        | \`string\`         | \`''\`      | Valor inicial (HH:mm o HH:mm:ss) |
| \`helpText\`     | \`string \\| null\` | \`null\`    | Texto de ayuda (tooltip) |
| \`feedbackText\` | \`string \\| null\` | \`null\`    | Texto de feedback |
| \`min\`          | \`string \\| null\` | \`null\`    | Hora mínima (HH:mm) |
| \`max\`          | \`string \\| null\` | \`null\`    | Hora máxima (HH:mm) |
| \`step\`         | \`number\`         | \`60\`      | Incremento en segundos |
| \`required\`     | \`boolean\`        | \`false\`   | Campo obligatorio |
| \`disabled\`     | \`boolean\`        | \`false\`   | Deshabilitado |
| \`name\`         | \`string \\| null\` | \`null\`    | Nombre del campo |

| Output         | Tipo     | Descripción |
|----------------|----------|-------------|
| \`valueChange\`  | \`string\` | Emite el nuevo valor en cada cambio |
| \`blur\`         | \`void\`   | Emite al perder el foco |
| \`focus\`        | \`void\`   | Emite al recibir el foco |

---

### Accesibilidad — WCAG 2.2

#### Criterios aplicables
| Criterio | Nivel | Aplicación |
|----------|-------|------------|
| **1.3.1 Info y relaciones** | A | \`<label>\` vinculado por \`for\`/\`id\`; \`aria-describedby\` para helpText y feedbackText |
| **1.4.3 Contraste mínimo** | AA | Texto del valor y label ≥ 4.5:1 sobre el fondo del campo |
| **1.4.11 Contraste no textual** | AA | Borde del campo ≥ 3:1 sobre el fondo de la página en todos los estados |
| **2.1.1 Teclado** | A | \`<input type="time">\` nativo — campo de hora, minutos y (si step<60) segundos navegables con Tab+flechas |
| **2.4.7 Foco visible** | AA | Focus ring en el wrapper vía \`:focus-within\` con color según estado |
| **2.5.8 Tamaño del objetivo** | AA | Área táctil mínima 48px de alto |
| **3.3.1 Identificación de errores** | A | \`feedbackText\` con \`status="error"\` describe el problema |
| **3.3.2 Etiquetas o instrucciones** | A | Label persistente sobre el campo; \`helpText\` con el rango esperado |
| **4.1.2 Nombre, rol, valor** | A | Input nativo con \`aria-required\`, \`aria-invalid\`, \`aria-describedby\` |

#### Navegación por teclado en el campo de hora
| Tecla | Acción |
|-------|--------|
| **Tab** | Enfoca el campo de hora |
| **Tab** (dentro) | Navega entre segmentos (HH → mm → AM/PM si aplica) |
| **ArrowUp / ArrowDown** | Incrementa/decrementa el segmento activo según \`step\` |
| **0–9** | Ingresa dígito directo en el segmento activo |
| **Backspace** | Borra el valor del segmento activo |

#### Atributos ARIA en el input nativo
| Atributo | Valor | Cuándo |
|----------|-------|--------|
| \`aria-required="true"\` | automático | Cuando \`required=true\` |
| \`aria-invalid="true"\` | automático | Cuando \`status="error"\` |
| \`aria-describedby="[helperId]"\` | automático | Cuando hay \`helpText\` o \`feedbackText\` |

#### Anuncio en lectores de pantalla
Al enfocar: *"Hora de inicio, campo de hora — [helpText si existe]"*.
Al navegar segmentos: el navegador anuncia cada segmento (hora, minutos) de forma nativa.
Si el campo tiene \`aria-invalid\`, el estado de error se anuncia automáticamente.

#### Auditoría v1 → v2
| Hallazgo v1 (Cortés, feb 2026) | Criterio WCAG | Resolución en v2 |
|--------------------------------|---------------|------------------|
| Este componente es nuevo en v2 y fue diseñado desde el inicio conforme a WCAG 2.2 AA | — | — |

### Buenas prácticas
✅ Usa \`min\` y \`max\` para restringir el rango horario válido y prevenir entradas fuera del contexto.
✅ Usa \`step\` en segundos para controlar la granularidad: 900 = intervalos de 15 min, 3600 = solo horas.
✅ Usa \`helpText\` para indicar el rango disponible: *"Horarios de 8:00 a 18:00"*.
❌ No uses el time picker para seleccionar períodos del día (mañana/tarde) — usa \`pds-select-field\`.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<PdsTimePickerComponent>;

// ── Sandbox ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default — Sandbox',
  args: {
    label: 'Hora de inicio',
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
      <div style="display:flex;flex-direction:column;gap:16px;max-width:360px">
        <pds-time-picker label="Estado default" />
        <pds-time-picker label="Estado error" status="error" feedbackText="La hora seleccionada está fuera del rango permitido" value="07:00" />
        <pds-time-picker label="Estado warning" status="warning" feedbackText="La hora coincide con otra actividad programada" value="14:30" />
        <pds-time-picker label="Estado success" status="success" feedbackText="Hora disponible" value="10:00" />
        <pds-time-picker label="Deshabilitado" [disabled]="true" value="09:00" />
      </div>
    `,
  }),
};

// ── Con rango horario ─────────────────────────────────────────────────────────

export const WithTimeRange: Story = {
  name: 'Con rango horario (min / max)',
  parameters: {
    docs: {
      description: {
        story: 'Los atributos \`min\` y \`max\` restringen las horas seleccionables en el picker nativo del navegador.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;max-width:360px">
        <pds-time-picker
          label="Hora de atención (8:00 – 17:00)"
          min="08:00"
          max="17:00"
          helpText="Solo disponible en horario laboral"
        />
        <pds-time-picker
          label="Franja de 15 min (8:00 – 12:00)"
          min="08:00"
          max="12:00"
          [step]="900"
          helpText="Intervalos de 15 minutos"
        />
      </div>
    `,
  }),
};

// ── Con segundos ──────────────────────────────────────────────────────────────

export const WithSeconds: Story = {
  name: 'Con campo de segundos',
  parameters: {
    docs: {
      description: {
        story: 'Al establecer \`step="1"\`, el campo nativo muestra el segmento de segundos además de horas y minutos.',
      },
    },
  },
  args: {
    label: 'Tiempo exacto de inicio',
    step: 1,
    helpText: 'Incluye segundos (HH:mm:ss)',
  },
};

// ── Con Reactive Forms ────────────────────────────────────────────────────────

export const WithFormControl: Story = {
  name: 'Con FormControl (Reactive Forms)',
  render: () => ({
    moduleMetadata: { imports: [ReactiveFormsModule] },
    props: {
      ctrl: new FormControl('', [Validators.required]),
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;max-width:360px;font-family:Poppins">
        <pds-time-picker
          label="Hora de cita"
          [required]="true"
          min="08:00"
          max="17:00"
          [step]="1800"
          helpText="Franjas de 30 minutos, de 8:00 a 17:00"
          [status]="ctrl.invalid && ctrl.touched ? 'error' : 'default'"
          [feedbackText]="ctrl.invalid && ctrl.touched ? 'Selecciona una hora válida' : null"
          [formControl]="ctrl"
        />
        <p style="font-size:13px;color:#50606E;margin:0">
          Valor: <strong>{{ ctrl.value || '(sin selección)' }}</strong> |
          Válido: <strong>{{ ctrl.valid }}</strong>
        </p>
      </div>
    `,
  }),
};

// ── Accesibilidad ─────────────────────────────────────────────────────────────

export const A11yFocusVisible: Story = {
  name: 'A11y — Focus visible por estado (Tab para probar)',
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;max-width:360px">
        <pds-time-picker label="Default (azul)" />
        <pds-time-picker label="Error (magenta)" status="error" feedbackText="Hora fuera de rango" />
        <pds-time-picker label="Warning (naranja)" status="warning" feedbackText="Hora con conflicto" />
        <pds-time-picker label="Success (verde)" status="success" feedbackText="Hora disponible" />
      </div>
    `,
  }),
};
