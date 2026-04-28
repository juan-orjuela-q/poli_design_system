import { Meta, StoryObj, applicationConfig } from '@storybook/angular';
import {
  PdsNotificationComponent,
  NotificationStatus,
  NotificationType,
  NotificationAction,
} from './pds-notification.component';

const meta: Meta<PdsNotificationComponent> = {
  title: 'DS v2/Notification',
  component: PdsNotificationComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**pds-notification** muestra retroalimentación del sistema.

- **inline** — integrado en el flujo del contenido.
- **snackbar** — flotante inferior centrado, auto-dismiss por defecto.
- **toast** — flotante superior derecha, auto-dismiss por defecto.

El componente usa \`role="alert"\` para errores y advertencias urgentes,
y \`role="status"\` para el resto.

**Nuevas características:**
- **actions** — Array de botones modales (ej: Cancelar, Confirmar).
- **timerDuration** — Timer visual en ms que se agota en la parte inferior.
- **timerProgress** — Barra con colores de contraste según el status.
        `,
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['inline', 'snackbar', 'toast'] satisfies NotificationType[],
      description: 'Tipo de presentación',
    },
    status: {
      control: 'select',
      options: [
        'default',
        'success',
        'warning',
        'error',
        'info',
      ] satisfies NotificationStatus[],
      description: 'Estado semántico',
    },
    title: {
      control: 'text',
      description: 'Título de la notificación (opcional)',
    },
    dismissible: {
      control: 'boolean',
      description: 'Muestra el botón de cerrar',
    },
    autoDismiss: {
      control: 'number',
      description: 'ms para auto-cerrar (null = desactivado)',
    },
    actions: {
      control: 'object',
      description: 'Array de acciones/botones modales',
    },
    timerDuration: {
      control: 'number',
      description: 'Duración del timer visual en ms (null = desactivado)',
    },
  },
};

export default meta;
type Story = StoryObj<PdsNotificationComponent>;

// ── Default ────────────────────────────────────────────────
export const Default: Story = {
  args: {
    type: 'inline',
    status: 'default',
    title: 'Información del sistema',
    dismissible: true,
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
        [autoDismiss]="autoDismiss"
      >
        Tu solicitud ha sido recibida y está siendo procesada.
      </pds-notification>
    `,
  }),
};

// ── Success ─────────────────────────────────────────────────
export const Success: Story = {
  args: {
    type: 'inline',
    status: 'success',
    title: 'Operación exitosa',
    dismissible: true,
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
        [autoDismiss]="autoDismiss"
      >
        Los cambios han sido guardados correctamente.
      </pds-notification>
    `,
  }),
};

// ── Warning ─────────────────────────────────────────────────
export const Warning: Story = {
  args: {
    type: 'inline',
    status: 'warning',
    title: 'Atención requerida',
    dismissible: true,
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
        [autoDismiss]="autoDismiss"
      >
        Tu sesión expirará en 5 minutos. Guarda tu progreso.
      </pds-notification>
    `,
  }),
};

// ── Error ───────────────────────────────────────────────────
export const Error: Story = {
  args: {
    type: 'inline',
    status: 'error',
    title: 'Error en la operación',
    dismissible: true,
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
        [autoDismiss]="autoDismiss"
      >
        No fue posible completar la solicitud. Inténtalo de nuevo más tarde.
      </pds-notification>
    `,
  }),
};

// ── Info ────────────────────────────────────────────────────
export const Info: Story = {
  args: {
    type: 'inline',
    status: 'info',
    title: 'Nuevo aviso',
    dismissible: true,
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
        [autoDismiss]="autoDismiss"
      >
        El sistema estará en mantenimiento el próximo domingo de 2:00 a 4:00 a.m.
      </pds-notification>
    `,
  }),
};

// ── Sin título ──────────────────────────────────────────────
export const SinTitulo: Story = {
  name: 'Sin título',
  args: {
    type: 'inline',
    status: 'info',
    title: null,
    dismissible: true,
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
        [autoDismiss]="autoDismiss"
      >
        Recuerda completar tu perfil para acceder a todos los servicios.
      </pds-notification>
    `,
  }),
};

// ── Sin botón cerrar ────────────────────────────────────────
export const NoDismissible: Story = {
  name: 'No dismissible',
  args: {
    type: 'inline',
    status: 'warning',
    title: 'Mantenimiento programado',
    dismissible: false,
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
        [autoDismiss]="autoDismiss"
      >
        El portal estará fuera de servicio el lunes de 1:00 a 3:00 a.m.
      </pds-notification>
    `,
  }),
};

// ── Todos los estados ────────────────────────────────────────
export const TodosLosEstados: Story = {
  name: 'Todos los estados',
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 600px;">
        <pds-notification status="default" title="Default" [autoDismiss]="null">
          Estado por defecto con color de marca primaria.
        </pds-notification>
        <pds-notification status="success" title="Éxito" [autoDismiss]="null">
          La operación se completó correctamente.
        </pds-notification>
        <pds-notification status="warning" title="Advertencia" [autoDismiss]="null">
          Revisa la información antes de continuar.
        </pds-notification>
        <pds-notification status="error" title="Error" [autoDismiss]="null">
          No fue posible completar la solicitud.
        </pds-notification>
        <pds-notification status="info" title="Información" [autoDismiss]="null">
          Hay actualizaciones disponibles para tu perfil.
        </pds-notification>
      </div>
    `,
  }),
};

// ── Tipos (inline / snackbar / toast) ───────────────────────
export const TipoSnackbar: Story = {
  name: 'Tipo: Snackbar',
  parameters: {
    docs: {
      description: {
        story: 'Posición fija en la parte inferior-central de la pantalla.',
      },
    },
  },
  args: {
    type: 'snackbar',
    status: 'success',
    title: 'Cambios guardados',
    dismissible: true,
    autoDismiss: null,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="position: relative; min-height: 160px; background: var(--surface-neutral-weak, #f1f3f5); border-radius: 8px; padding: 16px;">
        <p style="color: var(--fg-neutral-secondary)">Área de contenido de la página</p>
        <pds-notification
          [type]="type"
          [status]="status"
          [title]="title"
          [dismissible]="dismissible"
          [autoDismiss]="autoDismiss"
          style="position: absolute;"
        >
          Los cambios han sido guardados.
        </pds-notification>
      </div>
    `,
  }),
};

export const TipoToast: Story = {
  name: 'Tipo: Toast',
  parameters: {
    docs: {
      description: {
        story: 'Posición fija en la parte superior derecha de la pantalla.',
      },
    },
  },
  args: {
    type: 'toast',
    status: 'info',
    title: 'Nuevo mensaje',
    dismissible: true,
    autoDismiss: null,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="position: relative; min-height: 160px; background: var(--surface-neutral-weak, #f1f3f5); border-radius: 8px; padding: 16px;">
        <p style="color: var(--fg-neutral-secondary)">Área de contenido de la página</p>
        <pds-notification
          [type]="type"
          [status]="status"
          [title]="title"
          [dismissible]="dismissible"
          [autoDismiss]="autoDismiss"
          style="position: absolute;"
        >
          Tienes un nuevo mensaje en tu bandeja.
        </pds-notification>
      </div>
    `,
  }),
};

// ── Con Acciones (botones modales) ──────────────────────────
export const ConAcciones: Story = {
  name: 'Con Acciones',
  parameters: {
    docs: {
      description: {
        story:
          'Notificación con botones de acción (Cancel, Confirm). Emite evento `action` con el ID de la acción seleccionada.',
      },
    },
  },
  args: {
    type: 'inline',
    status: 'default',
    title: 'Snackbar title',
    dismissible: true,
    autoDismiss: null,
    actions: [
      { id: 'cancel', label: 'Cancelar', variant: 'outline' },
      { id: 'confirm', label: 'Confirmar', variant: 'primary' },
    ] satisfies NotificationAction[],
    timerDuration: 30000,
  },
  render: (args) => ({
    props: args,
    template: `
      <pds-notification
        [type]="type"
        [status]="status"
        [title]="title"
        [dismissible]="dismissible"
        [autoDismiss]="autoDismiss"
        [actions]="actions"
        [timerDuration]="timerDuration"
        (action)="alert('Acción seleccionada: ' + $event)"
      >
        We have left the world behind floating gently.
      </pds-notification>
    `,
  }),
};

// ── Con Timer ───────────────────────────────────────────────
export const ConTimer: Story = {
  name: 'Con Timer (30s)',
  parameters: {
    docs: {
      description: {
        story:
          'Notificación con timer visual en la parte inferior. La barra se agota en 30 segundos con colores de contraste según el status.',
      },
    },
  },
  args: {
    type: 'inline',
    status: 'success',
    title: 'Operación completada',
    dismissible: true,
    autoDismiss: null,
    timerDuration: 30000,
  },
  render: (args) => ({
    props: args,
    template: `
      <pds-notification
        [type]="type"
        [status]="status"
        [title]="title"
        [dismissible]="dismissible"
        [autoDismiss]="autoDismiss"
        [timerDuration]="timerDuration"
      >
        Los cambios han sido guardados correctamente. Esta notificación desaparecerá en 30 segundos.
      </pds-notification>
    `,
  }),
};

// ── Todos los estados con Timer ─────────────────────────────
export const TodosLosEstadosConTimer: Story = {
  name: 'Todos los estados con Timer',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Cada estado muestra su propio color de contraste en el timer.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 600px;">
        <pds-notification status="default" title="Default" [autoDismiss]="null" [timerDuration]="30000">
          Timer con color de contraste: marca primaria.
        </pds-notification>
        <pds-notification status="success" title="Éxito" [autoDismiss]="null" [timerDuration]="30000">
          Timer con color de contraste: verde éxito.
        </pds-notification>
        <pds-notification status="warning" title="Advertencia" [autoDismiss]="null" [timerDuration]="30000">
          Timer con color de contraste: naranja advertencia.
        </pds-notification>
        <pds-notification status="error" title="Error" [autoDismiss]="null" [timerDuration]="30000">
          Timer con color de contraste: rojo error.
        </pds-notification>
        <pds-notification status="info" title="Información" [autoDismiss]="null" [timerDuration]="30000">
          Timer con color de contraste: azul información.
        </pds-notification>
      </div>
    `,
  }),
};

// ── Todos los estados con acciones ─────────────────────────────
export const TodosLosEstadosConAcciones: Story = {
  name: 'Todos los estados con acciones',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Cada estado muestra sus propios botones de acción (ejemplo: Cancelar, Confirmar) y emite el evento `action`.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 600px;">
        <pds-notification status="default" title="Default" [autoDismiss]="null"
          [actions]="[
            { id: 'cancel', label: 'Cancelar', variant: 'outline' },
            { id: 'confirm', label: 'Confirmar', variant: 'primary' }
          ]"
          (action)="alert('Acción: ' + $event)">
          Estado por defecto con acciones.
        </pds-notification>
        <pds-notification status="success" title="Éxito" [autoDismiss]="null"
          [actions]="[
            { id: 'cancel', label: 'Cancelar', variant: 'outline' },
            { id: 'confirm', label: 'Confirmar', variant: 'primary' }
          ]"
          (action)="alert('Acción: ' + $event)">
          Operación exitosa con acciones.
        </pds-notification>
        <pds-notification status="warning" title="Advertencia" [autoDismiss]="null"
          [actions]="[
            { id: 'cancel', label: 'Cancelar', variant: 'outline' },
            { id: 'confirm', label: 'Confirmar', variant: 'primary' }
          ]"
          (action)="alert('Acción: ' + $event)">
          Advertencia con acciones.
        </pds-notification>
        <pds-notification status="error" title="Error" [autoDismiss]="null"
          [actions]="[
            { id: 'cancel', label: 'Cancelar', variant: 'outline' },
            { id: 'confirm', label: 'Confirmar', variant: 'primary' }
          ]"
          (action)="alert('Acción: ' + $event)">
          Error con acciones.
        </pds-notification>
        <pds-notification status="info" title="Información" [autoDismiss]="null"
          [actions]="[
            { id: 'cancel', label: 'Cancelar', variant: 'outline' },
            { id: 'confirm', label: 'Confirmar', variant: 'primary' }
          ]"
          (action)="alert('Acción: ' + $event)">
          Información con acciones.
        </pds-notification>
      </div>
    `,
  }),
};
