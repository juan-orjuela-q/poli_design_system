import { Meta, StoryObj } from '@storybook/angular';
import { PdsHelperTextComponent } from './pds-helper-text.component';

const meta: Meta<PdsHelperTextComponent & { text: string }> = {
  title: 'Poli Design System / 05. Forms / Form (Helper Text)',
  component: PdsHelperTextComponent,
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['default', 'error', 'warning', 'success', 'info'],
      description: 'Estado semántico que controla color e ícono',
    },
    text: { control: 'text', description: 'Texto de ayuda o feedback (proyectado vía ng-content)' },
  },
  parameters: {
    docs: {
      description: {
        component: `
Componente utilitario para **textos de ayuda y feedback** debajo de controles de formulario.
Combina un ícono de estado con texto descriptivo y se reutiliza en \`pds-input-field\`,
\`pds-textarea-field\`, \`pds-select-field\`, \`pds-progress-bar\` y \`pds-file-uploader\`.

### Cuándo usarlo
- Como texto de ayuda debajo de un campo de formulario (instrucciones, formato esperado).
- Como mensaje de feedback tras la validación (error, éxito, advertencia).
- Como información contextual adicional (\`status="info"\`).

### Cuándo NO usarlo
- No usar como etiqueta del campo — esa es la responsabilidad del \`<label>\`.
- No usar solo para decoración — siempre debe haber texto que el componente pueda proyectar.

### API
\`\`\`html
<!-- Texto de ayuda (default) -->
<pds-helper-text>Escribe al menos 8 caracteres</pds-helper-text>

<!-- Mensaje de error -->
<pds-helper-text status="error">El correo electrónico no es válido</pds-helper-text>

<!-- Mensaje de éxito -->
<pds-helper-text status="success">¡Contraseña segura!</pds-helper-text>
\`\`\`

| Input     | Tipo                                                    | Default       | Descripción |
|-----------|---------------------------------------------------------|---------------|-------------|
| \`status\` | \`'default'\\|'error'\\|'warning'\\|'success'\\|'info'\` | \`'default'\` | Estado semántico — controla color e ícono |

---

### Accesibilidad — WCAG 2.2

#### Criterios aplicables
| Criterio | Nivel | Aplicación |
|----------|-------|------------|
| **1.4.1 Uso del color** | A | El estado (error, éxito) no depende solo del color — el ícono y el texto lo refuerzan |
| **1.4.3 Contraste mínimo** | AA | Texto del helper ≥ 4.5:1 sobre fondo del formulario |
| **3.3.1 Identificación de errores** | A | Los mensajes de error deben describir el problema con texto, no solo con color |
| **3.3.3 Sugerencias para errores** | AA | El mensaje de error debe sugerir cómo corregir el problema |
| **4.1.3 Mensajes de estado** | AA | Cuando el estado cambia dinámicamente, el mensaje debe anunciarse a AT |

#### Navegación por teclado
El helper text no es interactivo — no recibe foco.
En combinación con \`pds-input-field\`, el campo de texto ya asocia el helper con \`aria-describedby\`.

#### Atributos ARIA
| Atributo | Cuándo | Función |
|----------|--------|---------|
| \`aria-describedby="[id-del-helper]"\` | Lo gestiona el campo padre | Asocia el helper text al control de formulario |
| \`aria-live="polite"\` | Cuando el estado cambia | Anuncia el cambio a AT sin interrumpir |

> **Para dev:** El \`id\` del elemento \`pds-helper-text\` debe estar referenciado en el \`aria-describedby\`
> del campo padre para que lectores de pantalla lean el mensaje al enfocar el campo.
> \`pds-input-field\` hace esto automáticamente — si usas \`pds-helper-text\` aislado, gestiona tú mismo el vínculo.

#### Anuncio en lectores de pantalla
Cuando el campo asociado recibe foco: NVDA/VoiceOver leen *"[label del campo]: [valor], [texto del helper]"*.
Si el estado cambia dinámicamente (p. ej. validación en tiempo real), usa \`aria-live\` en el wrapper.

#### Auditoría v1 → v2
Este componente es nuevo en v2 y no existía en v1.
Fue creado para encapsular el patrón de ícono + texto de feedback que se repetía en cada componente de formulario de v1,
eliminando la duplicación de SCSS de estados y garantizando consistencia semántica.

### Buenas prácticas
✅ Escribe mensajes de error descriptivos con sugerencia de corrección: *"El email no es válido — ejemplo: nombre@dominio.com"*.
✅ Combina siempre el estado de error con \`aria-invalid="true"\` en el campo padre.
✅ Para validación en tiempo real, agrega \`aria-live="polite"\` en el contenedor del helper para anunciar cambios.
❌ No uses solo el color para comunicar el estado — el ícono y el texto son obligatorios.
❌ No escribas mensajes genéricos como *"Campo inválido"* — describe el problema específico.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<PdsHelperTextComponent & { text: string }>;

// ── Sandbox ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default — Sandbox',
  args: { status: 'default', text: 'Texto de ayuda del campo' },
  render: (args) => ({
    props: args,
    template: `<pds-helper-text [status]="status">{{ text }}</pds-helper-text>`,
  }),
};

// ── Todos los estados ─────────────────────────────────────────────────────────

export const AllStatuses: Story = {
  name: 'Todos los estados',
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:8px">
        <pds-helper-text status="default">Escribe al menos 8 caracteres</pds-helper-text>
        <pds-helper-text status="info">El campo es opcional pero recomendado</pds-helper-text>
        <pds-helper-text status="error">El correo electrónico no es válido — ejemplo: nombre&#64;dominio.com</pds-helper-text>
        <pds-helper-text status="warning">Este valor ya existe — considera usar uno diferente</pds-helper-text>
        <pds-helper-text status="success">¡Contraseña segura! Cumple todos los requisitos</pds-helper-text>
      </div>
    `,
  }),
};

// ── En contexto de formulario ─────────────────────────────────────────────────

export const InFormContext: Story = {
  name: 'En contexto de formulario',
  parameters: {
    docs: {
      description: {
        story: `
Ejemplo de cómo el helper text se usa en combinación con un campo de formulario.
El campo asocia el helper con \`aria-describedby\` para que los lectores de pantalla
lean el mensaje al enfocar el campo.
        `,
      },
    },
  },
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:4px;max-width:360px;font-family:Poppins">
        <label for="email-demo" style="font-size:14px;font-weight:600;color:#0F385A">
          Correo electrónico <span style="color:#E0006E">*</span>
        </label>
        <input
          id="email-demo"
          type="email"
          aria-describedby="email-helper"
          aria-invalid="true"
          style="border:2px solid #EC0677;border-radius:10px;padding:8px 12px;font-size:16px;font-family:'Open Sans';outline:none"
          value="usuario&#64;"
        />
        <div id="email-helper">
          <pds-helper-text status="error">
            El correo no es válido — ejemplo: nombre&#64;dominio.com
          </pds-helper-text>
        </div>
      </div>
    `,
  }),
};

// ── Accesibilidad ─────────────────────────────────────────────────────────────

export const A11yColorPlusIcon: Story = {
  name: 'A11y — Color + ícono + texto (WCAG 1.4.1)',
  parameters: {
    docs: {
      description: {
        story: `
**WCAG 1.4.1 — Uso del color**: el estado del helper text se comunica mediante
tres canales simultáneos: **color + ícono + texto**.
Un usuario con daltonismo o baja visión puede identificar el estado sin depender del color.
        `,
      },
    },
  },
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:8px">
        <pds-helper-text status="error">Error: el campo es obligatorio</pds-helper-text>
        <pds-helper-text status="warning">Advertencia: el valor está cerca del límite</pds-helper-text>
        <pds-helper-text status="success">Válido: el formato es correcto</pds-helper-text>
        <pds-helper-text status="info">Información: este campo es opcional</pds-helper-text>
      </div>
    `,
  }),
};
