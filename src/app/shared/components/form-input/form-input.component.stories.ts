import { Meta, StoryObj } from '@storybook/angular';
import { FormInputComponent } from './form-input.component';

const meta: Meta<FormInputComponent> = {
  title: 'Componentes/Form Input',
  component: FormInputComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Campo de entrada de texto reutilizable con soporte para label, placeholder,
estado de validación y mensajes de ayuda.

#### Buenas prácticas

- Relacionar siempre el label con el campo mediante \`fieldID\`.
- Usar \`status\` para comunicar feedback (success, warning, error).
- No sustituir el label con el placeholder.
- Marcar \`required\` cuando el campo sea obligatorio y mostrar un mensaje
  de validación claro.
        `.trim(),
      },
    },
  },
};
export default meta;
type Story = StoryObj<FormInputComponent>;

/* ----------------------- Historias ------------------------------------ */

/** Campo de texto estándar */
export const Default: Story = {
  args: {
    label: 'Nombre completo',
    placeholder: 'Ingresa tu nombre',
    type: 'text',
    status: 'default',
  },
};

/** Campo requerido con validación de éxito */
export const Success: Story = {
  args: {
    label: 'Correo electrónico',
    placeholder: 'juan@ejemplo.com',
    type: 'email',
    required: true,
    status: 'success',
    message: '¡Formato válido!',
  },
};

/** Advertencia (warning) */
export const Warning: Story = {
  args: {
    label: 'Usuario',
    placeholder: 'mínimo 6 caracteres',
    status: 'warning',
    message: 'Aún faltan caracteres',
  },
};

/** Error con mensaje, label a la izquierda y tooltip */
export const ErrorLeftLabel: Story = {
  args: {
    label: 'Contraseña',
    labelPosition: 'left',
    placeholder: '********',
    type: 'password',
    required: true,
    status: 'error',
    tooltip: 'Debe tener 8+ caracteres, una mayúscula y un número',
    message: 'La contraseña no cumple los requisitos',
  },
};

/** Campo deshabilitado */
export const Disabled: Story = {
  args: {
    label: 'Número de documento',
    placeholder: '0000000000',
    type: 'number',
    disabled: true,
  },
};
