import { Meta, StoryObj, applicationConfig } from '@storybook/angular';
import {
  PdsNotificationComponent,
  NotificationStatus,
  NotificationType,
  NotificationAction,
} from './pds-notification.component';
import { provideAnimations } from '@angular/platform-browser/animations';

const meta: Meta<PdsNotificationComponent> = {
  title: 'Poli Design System / 06. Feedback & Overlays / Notification',
  component: PdsNotificationComponent,
  decorators: [applicationConfig({ providers: [provideAnimations()] })],
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['inline', 'snackbar', 'toast'],
      description: 'Tipo de presentación',
    },
    status: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info'],
      description: 'Estado semántico — controla colores e ícono',
    },
    title: { control: 'text', description: 'Título opcional de la notificación' },
    dismissible: { control: 'boolean', description: 'Muestra el botón de cierre manual' },
    timerDuration: { control: 'number', description: 'Duración del timer visual en ms (0 = sin timer)' },
    autoDismiss: { control: 'number', description: 'Auto-cierre en ms (null = desactivado)' },
  },
  parameters: {
    docs: {
      description: {
        component: `
Componente de notificación del DS v2. Disponible en tres tipos de presentación
(**inline**, **snackbar**, **toast**) y cinco estados semánticos.
Incluye auto-dismiss configurable, timer visual y botones de acción opcionales.

### Cuándo usarlo
- \`inline\`: mensajes de feedback integrados en el flujo del contenido (resultado de validación, estado de proceso).
- \`snackbar\`: confirmaciones temporales flotantes en la parte inferior (ej. "Cambios guardados").
- \`toast\`: alertas emergentes en la esquina superior derecha (ej. nueva notificación recibida).

### Cuándo NO usarlo
- No usar para solicitar confirmación antes de una acción irreversible — usar \`pds-dialog\`.
- No usar snackbar/toast para errores que requieren acción del usuario — usar inline con \`status="error"\`.

### API
\`\`\`html
<pds-notification
  type="inline"
  status="success"
  title="Cambios guardados"
  [dismissible]="true"
  [actions]="[{ id: 'undo', label: 'Deshacer', variant: 'outline' }]"
  (dismissed)="onDismissed()"
  (action)="onAction($event)"
>
  Tu perfil ha sido actualizado correctamente.
</pds-notification>
\`\`\`

| Input           | Tipo                                                        | Default          | Descripción |
|-----------------|-------------------------------------------------------------|------------------|-------------|
| \`type\`         | \`'inline'\\|'snackbar'\\|'toast'\`                        | \`'inline'\`     | Tipo de presentación |
| \`status\`       | \`'default'\\|'success'\\|'warning'\\|'error'\\|'info'\`   | \`'default'\`    | Estado semántico |
| \`title\`        | \`string \\| null\`                                        | \`null\`         | Título de la notificación |
| \`dismissible\`  | \`boolean\`                                                | \`true\`         | Muestra el botón de cierre |
| \`actions\`      | \`NotificationAction[]\`                                   | \`[]\`           | Botones de acción modales |
| \`position\`     | \`NotificationPosition \\| null\`                          | \`null\`         | Posición flotante (snackbar/toast) |
| \`timerDuration\` | \`number \\| null\`                                       | \`30000\`        | Duración del timer visual (ms) |
| \`autoDismiss\`  | \`number \\| null\`                                        | \`5000\`         | Auto-cierre (ms); \`null\` = desactivado |

| Output      | Tipo     | Descripción |
|-------------|----------|-------------|
| \`dismissed\` | \`void\` | Emitido al cerrar (manual o automático) |
| \`action\`    | \`string\` | ID de la acción pulsada |

---

### Accesibilidad — WCAG 2.2

#### Criterios aplicables
| Criterio | Nivel | Aplicación |
|----------|-------|------------|
| **1.3.3 Características sensoriales** | A | El estado no depende solo del color — el ícono y el título lo refuerzan |
| **1.4.1 Uso del color** | A | Cada status tiene ícono único (check_circle, warning, error, feedback) |
| **1.4.3 Contraste mínimo** | AA | Texto de la notificación ≥ 4.5:1 sobre el fondo del componente |
| **2.1.1 Teclado** | A | El botón de cierre y los botones de acción son operables con Tab/Enter/Space |
| **2.4.7 Foco visible** | AA | Anillo de foco doble en botón de cierre e íconos de acción |
| **4.1.2 Nombre, rol, valor** | A | El botón de cierre tiene \`aria-label="Cerrar notificación"\` |
| **4.1.3 Mensajes de estado** | AA | \`role="alert"\` para error/warning (assertive); \`role="status"\` para el resto (polite) |

#### ARIA dinámico según status
| Status | Role ARIA | Comportamiento en lectores de pantalla |
|--------|-----------|----------------------------------------|
| \`error\` | \`role="alert"\` | Anuncio inmediato (assertive) — interrumpe la lectura actual |
| \`warning\` | \`role="alert"\` | Anuncio inmediato (assertive) |
| \`default\`, \`success\`, \`info\` | \`role="status"\` | Anuncio educado (polite) — espera a que el usuario termine |

#### Navegación por teclado
| Tecla | Acción |
|-------|--------|
| **Tab** | Navega entre botón de cierre y botones de acción |
| **Enter / Space** | Activa el botón enfocado |
| **Escape** | No aplica directamente — el cierre es via el botón de cierre |

#### Atributos ARIA
| Atributo | Valor | Cuándo |
|----------|-------|--------|
| \`role="alert"\` | automático | Status \`error\` o \`warning\` |
| \`role="status"\` | automático | Status \`default\`, \`success\` o \`info\` |
| \`aria-label="Cerrar notificación"\` | en el botón ✕ | Siempre que \`dismissible=true\` |
| \`aria-hidden="true"\` | en el ícono de estado | El ícono es decorativo — el texto comunica el mensaje |

#### Anuncio en lectores de pantalla
- Error: *"Alerta: [título] — [mensaje]"* (inmediato)
- Success: *"[título] — [mensaje]"* (polite)
- Con acciones: los botones son anunciados al recibir foco: *"[label], botón"*

#### Auditoría v1 → v2
| Hallazgo v1 (Cortés, feb 2026) | Criterio WCAG | Resolución en v2 |
|--------------------------------|---------------|------------------|
| Alertas sin roles semánticos — no anunciadas por lectores de pantalla | 4.1.3 | \`role="alert"\` para error/warning; \`role="status"\` para el resto |
| Estado comunicado solo por color | 1.4.1 | Íconos únicos por estado + título texto |

### Buenas prácticas
✅ Usa \`status="error"\` con \`role="alert"\` (automático) solo para errores que requieren atención inmediata.
✅ Provee siempre un \`title\` descriptivo — es lo primero que leen los lectores de pantalla.
✅ Para \`autoDismiss\`, usa al menos 5000ms — da tiempo suficiente para leer el mensaje.
❌ No uses snackbar/toast para información crítica — el usuario puede no verlos si está usando un lector de pantalla.
❌ No dependas solo del color (rojo/verde) para comunicar el estado — el ícono y el título son obligatorios.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<PdsNotificationComponent>;

// ── Sandbox ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default — Sandbox',
  args: {
    type: 'inline',
    status: 'default',
    title: 'Título de la notificación',
    dismissible: true,
    timerDuration: null,
    autoDismiss: null,
  },
  render: (args) => ({
    props: args,
    template: `
      <pds-notification
        [type]="type"
        [status]="status"
        [title]="title"
        [dismissible]="dismissible"
        [timerDuration]="timerDuration"
        [autoDismiss]="autoDismiss"
      >
        Este es el mensaje de la notificación. Puede incluir instrucciones o información de estado.
      </pds-notification>
    `,
  }),
};

// ── Todos los estados ─────────────────────────────────────────────────────────

export const AllStatuses: Story = {
  name: 'Todos los estados',
  parameters: {
    docs: {
      description: {
        story: 'Los 5 estados semánticos disponibles. Cada uno tiene un ícono único — no dependen solo del color (WCAG 1.4.1).',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;max-width:600px">
        <pds-notification status="default" title="Información" [dismissible]="false" [autoDismiss]="null" [timerDuration]="null">
          Notificación de estado por defecto con información general.
        </pds-notification>
        <pds-notification status="success" title="Cambios guardados" [dismissible]="false" [autoDismiss]="null" [timerDuration]="null">
          Tu perfil ha sido actualizado correctamente.
        </pds-notification>
        <pds-notification status="warning" title="Atención" [dismissible]="false" [autoDismiss]="null" [timerDuration]="null">
          Este proceso puede tardar varios minutos en completarse.
        </pds-notification>
        <pds-notification status="error" title="Error al guardar" [dismissible]="false" [autoDismiss]="null" [timerDuration]="null">
          No se pudo guardar el documento. Revisa tu conexión e inténtalo de nuevo.
        </pds-notification>
        <pds-notification status="info" title="Nuevo mensaje" [dismissible]="false" [autoDismiss]="null" [timerDuration]="null">
          Tienes 3 mensajes sin leer en tu bandeja de entrada.
        </pds-notification>
      </div>
    `,
  }),
};

// ── Tipos ─────────────────────────────────────────────────────────────────────

export const AllTypes: Story = {
  name: 'Inline vs Snackbar vs Toast',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: `
- **Inline**: integrado en el flujo del contenido — para feedback de formularios y procesos.
- **Snackbar**: flotante inferior centrado — para confirmaciones temporales de acciones.
- **Toast**: flotante esquina superior derecha — para notificaciones asíncronas entrantes.
        `,
      },
    },
  },
  render: () => ({
    template: `
      <div style="position:relative;height:300px;background:#f5f5f5;padding:16px;border-radius:8px">
        <p style="font-family:Poppins;font-size:12px;color:#687C8E;margin:0 0 8px">Inline (en flujo):</p>
        <pds-notification type="inline" status="success" title="Guardado" [dismissible]="true" [autoDismiss]="null" [timerDuration]="null">
          Los cambios se guardaron correctamente.
        </pds-notification>
        <pds-notification type="snackbar" status="default" [dismissible]="true" [autoDismiss]="null" [timerDuration]="null">
          Elemento eliminado — <strong>Deshacer</strong>
        </pds-notification>
        <pds-notification type="toast" status="info" title="Nuevo mensaje" [dismissible]="true" [autoDismiss]="null" [timerDuration]="null">
          María Rodríguez te ha enviado un mensaje.
        </pds-notification>
      </div>
    `,
  }),
};

// ── Con acciones ──────────────────────────────────────────────────────────────

export const WithActions: Story = {
  name: 'Con botones de acción',
  parameters: {
    docs: {
      description: {
        story: 'Los botones de acción (\`actions\`) son operables con Tab/Enter/Space y reciben foco visible.',
      },
    },
  },
  render: () => ({
    props: {
      confirmActions: [
        { id: 'cancel', label: 'Cancelar', variant: 'outline' },
        { id: 'delete', label: 'Eliminar', variant: 'destructive' },
      ] as NotificationAction[],
      undoActions: [
        { id: 'undo', label: 'Deshacer', variant: 'ghost' },
      ] as NotificationAction[],
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;max-width:600px">
        <pds-notification
          status="error"
          title="¿Eliminar este elemento?"
          [dismissible]="false"
          [actions]="confirmActions"
          [autoDismiss]="null"
          [timerDuration]="null"
        >
          Esta acción no puede deshacerse. El elemento se eliminará permanentemente.
        </pds-notification>
        <pds-notification
          status="success"
          title="Mensaje enviado"
          [dismissible]="true"
          [actions]="undoActions"
          [autoDismiss]="null"
          [timerDuration]="null"
        >
          Tu mensaje fue enviado a 12 destinatarios.
        </pds-notification>
      </div>
    `,
  }),
};

// ── Con timer ─────────────────────────────────────────────────────────────────

export const WithTimer: Story = {
  name: 'Con timer visual',
  parameters: {
    docs: {
      description: {
        story: 'El timer visual indica cuánto tiempo queda antes del auto-cierre. Usa colores con contraste suficiente para cada estado.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;max-width:600px">
        <pds-notification
          status="info"
          title="Sesión a punto de expirar"
          [dismissible]="true"
          [timerDuration]="10000"
          [autoDismiss]="null"
        >
          Tu sesión expirará en 10 segundos. Haz clic en continuar para seguir activo.
        </pds-notification>
      </div>
    `,
  }),
};

// ── Accesibilidad ─────────────────────────────────────────────────────────────

export const A11yRoleAlert: Story = {
  name: 'A11y — role="alert" vs role="status"',
  parameters: {
    docs: {
      description: {
        story: `
**WCAG 4.1.3 — Mensajes de estado**: el componente selecciona automáticamente el rol ARIA correcto:
- **\`role="alert"\`** (assertive): para \`error\` y \`warning\` — interrumpe al lector de pantalla inmediatamente.
- **\`role="status"\`** (polite): para \`default\`, \`success\`, \`info\` — espera a que el usuario termine de leer.

Abre el inspector de accesibilidad del navegador para verificar el rol de cada elemento.
        `,
      },
    },
  },
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;max-width:600px">
        <p style="font-family:Poppins;font-size:12px;color:#687C8E;margin:0">role="alert" (assertive):</p>
        <pds-notification status="error" title="Error crítico" [dismissible]="false" [autoDismiss]="null" [timerDuration]="null">
          No se pudo completar la operación.
        </pds-notification>
        <pds-notification status="warning" title="Advertencia" [dismissible]="false" [autoDismiss]="null" [timerDuration]="null">
          Esta acción puede tener consecuencias no deseadas.
        </pds-notification>
        <p style="font-family:Poppins;font-size:12px;color:#687C8E;margin:8px 0 0">role="status" (polite):</p>
        <pds-notification status="success" title="Completado" [dismissible]="false" [autoDismiss]="null" [timerDuration]="null">
          La operación finalizó correctamente.
        </pds-notification>
        <pds-notification status="info" title="Información" [dismissible]="false" [autoDismiss]="null" [timerDuration]="null">
          Hay actualizaciones disponibles para tu cuenta.
        </pds-notification>
      </div>
    `,
  }),
};
