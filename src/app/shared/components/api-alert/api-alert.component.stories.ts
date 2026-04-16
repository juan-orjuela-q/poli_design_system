import { Meta, StoryObj } from '@storybook/angular';
import { ApiAlertComponent } from './api-alert.component';

export default {
  title: 'Componentes/Api Alert',
  component: ApiAlertComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
  component: `Componente para mostrar alertas de API con iconos, colores y opciones de autocierre.

**Funcionamiento técnico:**
  - Recibe una configuración (config) que define el tipo de alerta, mensaje, título, detalles, duración y opciones de autocierre.
  - Permite mostrar mensajes de éxito, error, advertencia e información, con iconos y estilos diferenciados.
  - Soporta detalles adicionales (por ejemplo, errores de validación) y traceId para depuración.
  - El botón de cierre permite al usuario descartar la alerta manualmente.

**Relación con otros componentes:**
  - ApiAlert se utiliza principalmente dentro de MessageContainer, que centraliza la gestión y visualización de notificaciones en la aplicación.
  - MessageContainer recibe una lista de mensajes desde el servicio MessageNotificationService y renderiza dinámicamente instancias de ApiAlert para cada mensaje activo.
  - Esta integración permite desacoplar la lógica de presentación de la lógica de negocio y facilita la gestión global de notificaciones.

**Opciones principales:**
  - type: Tipo de alerta ('success', 'error', 'warning', 'info').
  - message: Mensaje principal a mostrar.
  - title: Título opcional.
  - details: Lista de detalles adicionales.
  - autoClose: Si la alerta se cierra automáticamente.
  - duration: Tiempo en milisegundos antes de cerrar automáticamente.
  - traceId: Identificador de seguimiento para errores.

**Buenas prácticas:**
  - Usar para mostrar feedback inmediato y claro al usuario tras acciones o respuestas de API.
  - Personalizar el mensaje y el tipo según el contexto de la operación.
  - Integrar con servicios de notificación para centralizar la gestión de alertas.

Ejemplo: El story "Default" muestra una alerta de éxito con autocierre desactivado.`
      }
    }
  },
  argTypes: {
    type: { control: 'text', description: 'Tipo de alerta (success, error, info, etc.)' },
    message: { control: 'text', description: 'Mensaje a mostrar' },
    autoClose: { control: 'boolean', description: 'Cierra automáticamente la alerta' }
  }
} as Meta<ApiAlertComponent>;

export const Default: StoryObj<ApiAlertComponent> = {
  args: {
    config: {
      type: 'success',
      message: 'Operación exitosa',
      autoClose: false
    },
    isVisible: true
  }
};
