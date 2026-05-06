import { Meta, StoryObj } from '@storybook/angular';
import { PdsTextareaFieldComponent } from './pds-textarea-field.component';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

const meta: Meta<PdsTextareaFieldComponent> = {
  title: 'Poli Design System / 05. Forms / Form (Textarea Field)',
  component: PdsTextareaFieldComponent,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Etiqueta del campo. Requerida.' },
    status: {
      control: 'select',
      options: ['default', 'error', 'warning', 'success'],
      description: 'Estado semántico del campo',
    },
    placeholder: { control: 'text', description: 'Placeholder del textarea' },
    helpText: { control: 'text', description: 'Texto de ayuda permanente debajo del campo' },
    feedbackText: { control: 'text', description: 'Texto de feedback según status' },
    rows: { control: { type: 'number', min: 2, max: 20 }, description: 'Número de filas visibles inicialmente' },
    required: { control: 'boolean', description: 'Campo obligatorio' },
    disabled: { control: 'boolean', description: 'Deshabilitado' },
    readonly: { control: 'boolean', description: 'Solo lectura' },
    showCounter: { control: 'boolean', description: 'Muestra contador de caracteres' },
    maxLength: { control: 'number', description: 'Longitud máxima' },
  },
  parameters: {
    docs: {
      description: {
        component: `
Campo de texto multilínea del DS v2. Variante de \`pds-input-field\` para texto extenso.
Redimensionable verticalmente, con label persistente, contador de caracteres y texto de ayuda.
Compatible con Angular Reactive Forms (CVA — emite \`string\`).

### Cuándo usarlo
- Para comentarios, descripciones, observaciones o cualquier texto que pueda ocupar más de una línea.
- Cuando el usuario puede necesitar escribir varios párrafos.
- Para campos de justificación o motivación en formularios académicos.

### Cuándo NO usarlo
- No usar para texto de una sola línea — usar \`pds-input-field\`.
- No usar para entrada de código fuente — considerar un componente especializado.

### API
\`\`\`html
<pds-textarea-field
  label="Descripción del proyecto"
  [rows]="4"
  [maxLength]="500"
  [showCounter]="true"
  helpText="Describe los objetivos principales del proyecto"
  [formControl]="descriptionCtrl"
/>
\`\`\`

| Input          | Tipo                | Default      | Descripción |
|----------------|---------------------|--------------|-------------|
| \`label\`        | \`string\` (requerido) | — | Etiqueta del campo |
| \`status\`       | \`TextareaStatus\`  | \`'default'\` | Estado semántico |
| \`placeholder\`  | \`string\`         | \`''\`       | Placeholder |
| \`helpText\`     | \`string \\| null\` | \`null\`    | Texto de ayuda permanente |
| \`feedbackText\` | \`string \\| null\` | \`null\`    | Texto de feedback |
| \`rows\`         | \`number\`         | \`3\`        | Filas visibles iniciales |
| \`required\`     | \`boolean\`        | \`false\`    | Campo obligatorio |
| \`disabled\`     | \`boolean\`        | \`false\`    | Deshabilitado |
| \`readonly\`     | \`boolean\`        | \`false\`    | Solo lectura |
| \`maxLength\`    | \`number \\| null\` | \`null\`    | Longitud máxima |
| \`showCounter\`  | \`boolean\`        | \`false\`    | Muestra contador |

---

### Accesibilidad — WCAG 2.2

#### Criterios aplicables
| Criterio | Nivel | Aplicación |
|----------|-------|------------|
| **1.3.1 Info y relaciones** | A | \`<label>\` vinculado por \`for\`/\`id\`; \`aria-describedby\` para helper/feedback |
| **1.4.3 Contraste mínimo** | AA | Texto del valor y label ≥ 4.5:1 |
| **1.4.11 Contraste no textual** | AA | Borde ≥ 3:1 sobre fondo de página en todos los estados |
| **2.1.1 Teclado** | A | \`<textarea>\` nativo — operable con Tab; Enter inserta saltos de línea |
| **2.4.7 Foco visible** | AA | Focus ring en el wrapper vía \`:focus-within\` con color por estado |
| **3.3.1 Identificación de errores** | A | \`feedbackText\` con \`status="error"\` describe el problema |
| **3.3.2 Etiquetas o instrucciones** | A | Label persistente — nunca usa placeholder como etiqueta |
| **4.1.2 Nombre, rol, valor** | A | \`<textarea>\` nativo con \`aria-required\`, \`aria-invalid\`, \`aria-describedby\` |

#### Atributos ARIA en el textarea nativo
| Atributo | Valor | Cuándo |
|----------|-------|--------|
| \`aria-required="true"\` | automático | Cuando \`required=true\` |
| \`aria-invalid="true"\` | automático | Cuando \`status="error"\` |
| \`aria-describedby="[helperId]"\` | automático | Con \`helpText\` o \`feedbackText\` |

#### Anuncio en lectores de pantalla
Al enfocar: *"[label]: [valor], área de texto — [helpText o feedbackText]"*.
El usuario puede navegar dentro del texto con flechas; Enter inserta un salto de línea.

#### Auditoría v1 → v2
| Hallazgo v1 (Cortés, feb 2026) | Criterio WCAG | Resolución en v2 |
|--------------------------------|---------------|------------------|
| Placeholder como única etiqueta | 3.3.2 | Label persistente sobre el campo |
| Borde base con contraste 1.23:1 | 1.4.11 | Token semántico ≥ 3:1 |
| Contador de caracteres con contraste < 3:1 | 1.4.3 | Token de texto del contador con contraste garantizado |

### Buenas prácticas
✅ Usa \`helpText\` para describir qué se espera en el campo: *"Máximo 500 caracteres"*.
✅ Usa \`showCounter=true\` cuando hay un \`maxLength\` — el usuario necesita saber cuánto espacio le queda.
✅ Ajusta \`rows\` al contenido esperado — 3 para comentarios cortos, 6-8 para descripciones largas.
❌ No uses el textarea para código fuente o texto con formato — considera un editor especializado.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<PdsTextareaFieldComponent>;

// ── Sandbox ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default — Sandbox',
  args: {
    label: 'Descripción del proyecto',
    status: 'default',
    placeholder: 'Describe los objetivos del proyecto...',
    rows: 4,
    required: false,
    disabled: false,
    readonly: false,
  },
};

// ── Todos los estados ─────────────────────────────────────────────────────────

export const AllStatuses: Story = {
  name: 'Todos los estados',
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;max-width:480px">
        <pds-textarea-field label="Estado default" [rows]="3" placeholder="Escribe aquí..." />
        <pds-textarea-field label="Estado error" status="error" feedbackText="El campo es obligatorio — escribe al menos 20 caracteres" value="texto" [rows]="3" />
        <pds-textarea-field label="Estado warning" status="warning" feedbackText="El texto es muy corto — considera ampliarlo" value="Texto breve." [rows]="3" />
        <pds-textarea-field label="Estado success" status="success" feedbackText="Descripción válida y completa" value="Esta es una descripción detallada del proyecto académico." [rows]="3" />
        <pds-textarea-field label="Deshabilitado" [disabled]="true" value="Texto no editable" [rows]="3" />
        <pds-textarea-field label="Solo lectura" [readonly]="true" value="Texto de solo lectura." [rows]="3" />
      </div>
    `,
  }),
};

// ── Con contador ──────────────────────────────────────────────────────────────

export const WithCounter: Story = {
  name: 'Con contador de caracteres',
  render: () => ({
    template: `
      <div style="max-width:480px">
        <pds-textarea-field
          label="Justificación de solicitud"
          [rows]="5"
          [maxLength]="300"
          [showCounter]="true"
          helpText="Describe el motivo de tu solicitud (máximo 300 caracteres)"
          placeholder="Escribe la justificación..."
        />
      </div>
    `,
  }),
};

// ── Con Reactive Forms ────────────────────────────────────────────────────────

export const WithFormControl: Story = {
  name: 'Con FormControl (Reactive Forms)',
  render: () => ({
    moduleMetadata: { imports: [ReactiveFormsModule] },
    props: {
      ctrl: new FormControl('', [Validators.required, Validators.minLength(20)]),
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;max-width:480px;font-family:Poppins">
        <pds-textarea-field
          label="Observaciones"
          [rows]="4"
          [maxLength]="500"
          [showCounter]="true"
          [required]="true"
          [status]="ctrl.invalid && ctrl.touched ? 'error' : 'default'"
          [feedbackText]="ctrl.invalid && ctrl.touched ? 'Mínimo 20 caracteres' : null"
          [formControl]="ctrl"
          placeholder="Escribe tus observaciones..."
        />
        <p style="font-size:13px;color:#50606E;margin:0">
          Caracteres: <strong>{{ ctrl.value?.length || 0 }}</strong> |
          Válido: <strong>{{ ctrl.valid }}</strong>
        </p>
      </div>
    `,
  }),
};

// ── Accesibilidad ─────────────────────────────────────────────────────────────

export const A11yFocusVisible: Story = {
  name: 'A11y — Focus visible (Tab para probar)',
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;max-width:480px">
        <pds-textarea-field label="Default" [rows]="3" />
        <pds-textarea-field label="Error" status="error" feedbackText="Campo obligatorio" [rows]="3" />
        <pds-textarea-field label="Success" status="success" feedbackText="Descripción válida" [rows]="3" />
      </div>
    `,
  }),
};
