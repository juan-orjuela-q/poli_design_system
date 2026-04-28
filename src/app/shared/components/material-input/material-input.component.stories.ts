import { Meta, StoryObj } from '@storybook/angular';
import { MaterialInputComponent } from './material-input.component';

const meta: Meta<MaterialInputComponent> = {
  title: 'DS v1 (Legacy)/Material Input',
  component: MaterialInputComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Campo de entrada basado en **Angular Material** adaptado al sistema de diseño
del Politécnico Grancolombiano.

#### Buenas prácticas

- Emplear este componente solo cuando sea indispensable la API de Material.  
- Relacionar el label con el campo mediante \`fieldID\`.  
- Indicar feedback visual a través de \`status\`.  
- Mostrar mensajes de validación claros y concisos.
        `.trim(),
      },
    },
  },
};
export default meta;
type Story = StoryObj<MaterialInputComponent>;

/* ---------------------------- Historias ----------------------------- */

/** Texto estándar */
export const Default: Story = {
  args: {
    label: 'Nombre completo',
    placeholder: 'Ingresa tu nombre',
    type: 'text',
  },
};

/** Campo requerido con éxito */
export const Success: Story = {
  args: {
    label: 'Correo electrónico',
    placeholder: 'usuario@ejemplo.com',
    type: 'email',
    required: true,
    status: 'success',
    message: 'Formato válido',
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

/** Error con tooltip y label a la izquierda */
export const ErrorLeftLabel: Story = {
  args: {
    label: 'Contraseña',
    labelPosition: 'left',
    placeholder: '********',
    type: 'password',
    tooltip: 'Debe tener 8+ caracteres, una mayúscula y un número',
    status: 'error',
    message: 'La contraseña no cumple los requisitos',
    required: true,
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