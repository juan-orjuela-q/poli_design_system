import { Meta, StoryObj } from '@storybook/angular';
import { AlertComponent } from './alert.component';

const meta: Meta<AlertComponent> = {
  title: 'Componentes/Alert',
  component: AlertComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Componente de alerta del sistema de diseño del Politécnico Grancolombiano. Muestra mensajes contextuales de información, éxito, advertencia o error. Integra icono, título, descripción, botones de acción opcionales y control para cerrar la alerta.  El color y el símbolo se ajustan automáticamente según el tipo configurado.

#### Buenas prácticas

- Utilizar \`type\` para comunicar el estado semántico del mensaje.   
- Emplear el evento \`closed\` para reaccionar en la lógica de la vista.  
        `.trim(),
      },
    },
  },
};
export default meta;
type Story = StoryObj<AlertComponent>;

export const Info: Story = {
  args: {
    type: 'info',
    size: 'medium',
    title: 'Información',
    description: 'Mensaje informativo para el usuario.',
    primaryLabel: 'Aceptar',
    secondaryLabel: 'Cancelar',
  },
};

export const Success: Story = {
  args: {
    type: 'success',
    size: 'medium',
    title: '¡Éxito!',
    description: 'La operación fue completada correctamente.',
  },
};

export const WarningSmall: Story = {
  args: {
    type: 'warning',
    size: 'small',
    description: 'Advertencia breve sin acciones.',
  },
};

export const ErrorLarge: Story = {
  args: {
    type: 'danger',
    size: 'large',
    title: 'Error',
    description: 'Ocurrió un problema inesperado.',
    primaryLabel: 'Reintentar',
  },
};
