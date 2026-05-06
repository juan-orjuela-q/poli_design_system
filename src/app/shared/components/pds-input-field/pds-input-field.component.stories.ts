import { Meta, StoryObj } from '@storybook/angular';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { PdsInputFieldComponent } from './pds-input-field.component';

const meta: Meta<PdsInputFieldComponent> = {
  title: 'Poli Design System / 05. Forms / Form (Input Field)',
  component: PdsInputFieldComponent,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Etiqueta del campo. Requerida.' },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
      description: 'Tipo HTML del input',
    },
    status: {
      control: 'select',
      options: ['default', 'error', 'warning', 'success', 'loading'],
      description: 'Estado semántico del campo',
    },
    placeholder: { control: 'text', description: 'Placeholder del input' },
    helpText: { control: 'text', description: 'Texto de ayuda permanente debajo del campo' },
    feedbackText: { control: 'text', description: 'Texto de feedback (error, aviso, éxito)' },
    required: { control: 'boolean', description: 'Marca el campo como obligatorio' },
    disabled: { control: 'boolean', description: 'Deshabilita el campo' },
    readonly: { control: 'boolean', description: 'Campo de solo lectura' },
    showCounter: { control: 'boolean', description: 'Muestra el contador de caracteres' },
    maxLength: { control: 'number', description: 'Longitud máxima del texto' },
    iconStart: { control: 'text', description: 'Ícono al inicio (Material Symbols)' },
    iconEnd: { control: 'text', description: 'Ícono al final (Material Symbols)' },
  },
  parameters: {
    docs: {
      description: {
        component: `
Campo de texto del DS v2. Disponible en 9 estados semánticos, con soporte de íconos decorativos,
toggle de contraseña, contador de caracteres y texto de ayuda.
Label persistente sobre el campo — nunca como placeholder flotante.
Compatible con Angular Reactive Forms (CVA — emite \`string\`).

### Cuándo usarlo
- Para capturar texto libre: nombres, correos, URLs, números de teléfono, búsqueda.
- Cuando el input puede ocupar una línea (usar \`pds-textarea-field\` para texto multi-línea).

### Cuándo NO usarlo
- No usar para seleccionar entre opciones fijas — usar \`pds-select-field\`.
- No usar para texto largo (> 2-3 líneas esperadas) — usar \`pds-textarea-field\`.

### API
\`\`\`html
<pds-input-field
  label="Correo electrónico"
  type="email"
  [required]="true"
  [status]="emailStatus"
  feedbackText="El correo no es válido"
  [formControl]="emailCtrl"
/>
\`\`\`

| Input          | Tipo                | Default      | Descripción |
|----------------|---------------------|--------------|-------------|
| \`label\`        | \`string\` (requerido) | — | Etiqueta del campo |
| \`type\`         | \`InputFieldType\`  | \`'text'\`   | Tipo HTML |
| \`status\`       | \`InputFieldStatus\` | \`'default'\` | Estado semántico |
| \`placeholder\`  | \`string\`         | \`''\`       | Placeholder |
| \`helpText\`     | \`string \\| null\` | \`null\`    | Texto de ayuda permanente |
| \`feedbackText\` | \`string \\| null\` | \`null\`    | Texto de feedback según status |
| \`required\`     | \`boolean\`        | \`false\`    | Campo obligatorio (muestra *) |
| \`disabled\`     | \`boolean\`        | \`false\`    | Deshabilitado |
| \`readonly\`     | \`boolean\`        | \`false\`    | Solo lectura |
| \`maxLength\`    | \`number \\| null\` | \`null\`    | Longitud máxima |
| \`showCounter\`  | \`boolean\`        | \`false\`    | Muestra contador de caracteres |
| \`iconStart\`    | \`string \\| null\` | \`null\`    | Ícono decorativo al inicio |
| \`iconEnd\`      | \`string \\| null\` | \`null\`    | Ícono decorativo al final |
| \`autocomplete\` | \`string\`         | \`''\`       | Atributo autocomplete HTML |
| \`name\`         | \`string \\| null\` | \`null\`    | Nombre del campo |

---

### Accesibilidad — WCAG 2.2

#### Criterios aplicables
| Criterio | Nivel | Aplicación |
|----------|-------|------------|
| **1.3.1 Info y relaciones** | A | \`<label>\` vinculado por \`for\`/\`id\`; \`aria-describedby\` para helper/feedback |
| **1.4.3 Contraste mínimo** | AA | Texto del valor y label ≥ 4.5:1 sobre el fondo del campo |
| **1.4.11 Contraste no textual** | AA | Borde del campo ≥ 3:1 sobre el fondo de la página en todos los estados |
| **2.1.1 Teclado** | A | El campo nativo es operable con Tab; el toggle de contraseña con Tab+Enter/Space |
| **2.4.7 Foco visible** | AA | Focus ring en el wrapper vía \`:focus-within\` — diferente color según status |
| **2.5.8 Tamaño del objetivo** | AA | Área táctil mínima 48px de alto |
| **3.3.1 Identificación de errores** | A | El \`feedbackText\` con \`status="error"\` describe el problema |
| **3.3.2 Etiquetas o instrucciones** | A | Label persistente visible (nunca usa placeholder como etiqueta) |
| **4.1.2 Nombre, rol, valor** | A | Input nativo con \`aria-required\`, \`aria-invalid\`, \`aria-describedby\` |

#### Atributos ARIA en el input nativo
| Atributo | Valor | Cuándo |
|----------|-------|--------|
| \`aria-required="true"\` | automático | Cuando \`required=true\` |
| \`aria-invalid="true"\` | automático | Cuando \`status="error"\` |
| \`aria-describedby="[helperId]"\` | automático | Cuando hay \`helpText\` o \`feedbackText\` |
| \`aria-disabled="true"\` | automático | Cuando \`disabled=true\` |
| \`readonly\` | nativo | Cuando \`readonly=true\` |

#### Focus ring por estado
Cada estado tiene su propio color de focus ring:
- Default: azul DS (\`--action-primary-focus-ring\`)
- Error: magenta (\`--action-status-error-focus-ring\`)
- Warning: naranja (\`--action-status-warning-focus-ring\`)
- Success: verde (\`--action-status-success-focus-ring\`)

#### Anuncio en lectores de pantalla
Al enfocar: *"[label]: [valor], campo de texto — [helpText o feedbackText]"*.
Si el campo tiene \`aria-invalid\`, el estado de error se anuncia automáticamente.

#### Auditoría v1 → v2
| Hallazgo v1 (Cortés, feb 2026) | Criterio WCAG | Resolución en v2 |
|--------------------------------|---------------|------------------|
| Placeholder como única etiqueta — desaparece al escribir | 3.3.2 | Label persistente sobre el campo + placeholder como ejemplo de formato |
| Borde base con contraste 1.23:1 | 1.4.11 | Token semántico de borde con contraste ≥ 3:1 |
| Bordes de success/warning < 3:1 | 1.4.11 | Tokens \`--border-status-*\` con contraste garantizado |
| Área táctil de 40px | 2.5.8 | \`min-height: 48px\` en el wrapper |

### Buenas prácticas
✅ Usa el \`label\` para describir qué dato se espera: *"Número de matrícula"*, no *"Campo 1"*.
✅ Usa \`helpText\` para instrucciones permanentes (formato esperado); \`feedbackText\` para feedback de validación.
✅ Para campos de contraseña, el toggle mostrar/ocultar se incluye automáticamente con \`type="password"\`.
❌ No uses \`placeholder\` como sustituto del \`label\` — el placeholder desaparece al escribir.
❌ No uses \`readonly\` para campos que el usuario nunca debería ver — considera si el campo debería estar presente.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<PdsInputFieldComponent>;

// ── Sandbox ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default — Sandbox',
  args: {
    label: 'Nombre completo',
    type: 'text',
    status: 'default',
    placeholder: 'ej. Juan Rodríguez García',
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
      <div style="display:flex;flex-direction:column;gap:16px;max-width:400px">
        <pds-input-field label="Estado default" placeholder="Texto de ejemplo" />
        <pds-input-field label="Estado error" status="error" feedbackText="El correo no es válido — ejemplo: nombre@dominio.com" value="usuario@" />
        <pds-input-field label="Estado warning" status="warning" feedbackText="Este nombre de usuario ya existe — prueba con otro" value="juanpoli" />
        <pds-input-field label="Estado success" status="success" feedbackText="¡Nombre de usuario disponible!" value="juanpoli2024" />
        <pds-input-field label="Estado loading" status="loading" value="Verificando..." />
        <pds-input-field label="Deshabilitado" [disabled]="true" value="No editable" />
        <pds-input-field label="Solo lectura" [readonly]="true" value="valor de solo lectura" />
      </div>
    `,
  }),
};

// ── Tipos ─────────────────────────────────────────────────────────────────────

export const InputTypes: Story = {
  name: 'Tipos de input',
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;max-width:400px">
        <pds-input-field label="Texto" type="text" placeholder="Nombre completo" />
        <pds-input-field label="Correo electrónico" type="email" placeholder="nombre@dominio.com" />
        <pds-input-field label="Contraseña" type="password" placeholder="Mínimo 8 caracteres" helpText="La contraseña debe tener al menos 8 caracteres" />
        <pds-input-field label="Teléfono" type="tel" placeholder="+57 300 000 0000" />
        <pds-input-field label="Número" type="number" placeholder="ej. 12345" />
        <pds-input-field label="URL" type="url" placeholder="https://..." />
        <pds-input-field label="Búsqueda" type="search" placeholder="Buscar materias..." iconStart="search" />
      </div>
    `,
  }),
};

// ── Con íconos ────────────────────────────────────────────────────────────────

export const WithIcons: Story = {
  name: 'Con íconos decorativos',
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;max-width:400px">
        <pds-input-field label="Buscar" iconStart="search" placeholder="Buscar materias..." />
        <pds-input-field label="Correo" iconStart="mail" type="email" placeholder="nombre@dominio.com" />
        <pds-input-field label="Precio" iconStart="payments" iconEnd="monetization_on" placeholder="0.00" />
      </div>
    `,
  }),
};

// ── Con contador ──────────────────────────────────────────────────────────────

export const WithCounter: Story = {
  name: 'Con contador de caracteres',
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;max-width:400px">
        <pds-input-field
          label="Nombre de usuario"
          [maxLength]="20"
          [showCounter]="true"
          placeholder="máx. 20 caracteres"
          helpText="El nombre de usuario aparece en tu perfil público"
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
      emailCtrl: new FormControl('', [Validators.required, Validators.email]),
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;max-width:400px;font-family:Poppins">
        <pds-input-field
          label="Correo electrónico"
          type="email"
          [required]="true"
          [status]="emailCtrl.invalid && emailCtrl.touched ? 'error' : 'default'"
          [feedbackText]="emailCtrl.invalid && emailCtrl.touched ? 'El correo no es válido' : null"
          [formControl]="emailCtrl"
          placeholder="nombre@dominio.com"
        />
        <p style="font-size:13px;color:#50606E;margin:0">
          Válido: <strong>{{ emailCtrl.valid }}</strong> |
          Valor: <strong>{{ emailCtrl.value || '(vacío)' }}</strong>
        </p>
      </div>
    `,
  }),
};

// ── Accesibilidad ─────────────────────────────────────────────────────────────

export const A11yFocusVisible: Story = {
  name: 'A11y — Focus visible por estado (Tab para probar)',
  parameters: {
    docs: {
      description: {
        story: 'Cada estado tiene su propio color de focus ring para diferenciarse visualmente. Usa Tab para enfocar cada campo.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;max-width:400px">
        <pds-input-field label="Default (azul)" />
        <pds-input-field label="Error (magenta)" status="error" feedbackText="Campo obligatorio" />
        <pds-input-field label="Warning (naranja)" status="warning" feedbackText="El valor está cerca del límite" />
        <pds-input-field label="Success (verde)" status="success" feedbackText="Valor válido" />
      </div>
    `,
  }),
};

export const A11yAriaDescribedBy: Story = {
  name: 'A11y — aria-describedby (helpText + feedbackText)',
  parameters: {
    docs: {
      description: {
        story: `
Abre el inspector de accesibilidad y verifica que el input tiene \`aria-describedby\`
apuntando al elemento helper/feedback.
Al enfocar el campo, los lectores de pantalla leen: *"[label]: [valor], campo de texto — [helpText o feedbackText]"*.
El \`aria-invalid="true"\` se establece automáticamente cuando \`status="error"\`.
      `,
      },
    },
  },
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;max-width:400px">
        <pds-input-field
          label="Número de matrícula"
          helpText="El número de matrícula tiene 10 dígitos"
          placeholder="ej. 1234567890"
        />
        <pds-input-field
          label="Correo electrónico"
          type="email"
          status="error"
          feedbackText="El correo no es válido — ejemplo: nombre@dominio.com"
          value="usuario@"
          [required]="true"
        />
      </div>
    `,
  }),
};
