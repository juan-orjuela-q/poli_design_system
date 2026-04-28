import { Meta, StoryObj } from '@storybook/angular';
import { FormTextareaComponent } from './form-textarea.component';

const meta: Meta<FormTextareaComponent> = {
  title: 'DS v1 (Legacy)/Form Textarea',
  component: FormTextareaComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Área de texto reutilizable con label, placeholder, estados de validación y mensajes de ayuda.

#### Buenas prácticas

- Relacionar el label con el campo para accesibilidad.  
- Ajustar \`rows\` según la longitud esperada.  
- Usar \`status\` para comunicar feedback de validación.  
- Mostrar mensajes de ayuda o error concisos debajo del campo.  
- Evitar usar el placeholder como reemplazo de label.
        `.trim(),
      },
    },
  },
};
export default meta;
type Story = StoryObj<FormTextareaComponent>;

/* ---------------------- Historias ------------------------------------- */

/** Textarea por defecto */
export const Default: Story = {
  args: {
    label: 'Comentarios',
    placeholder: 'Escribe tu mensaje...',
    rows: 4,
    status: 'default',
  },
};

/** Estado éxito */
export const Success: Story = {
  args: {
    label: 'Observaciones',
    placeholder: 'Todo se ve bien',
    status: 'success',
    message: '¡Perfecto!',
  },
};

/** Advertencia */
export const Warning: Story = {
  args: {
    label: 'Descripción',
    placeholder: 'Entre 50 y 200 caracteres',
    status: 'warning',
    message: 'Aún faltan caracteres',
    rows: 3,
  },
};

/** Error con tooltip y label a la izquierda */
export const ErrorLeftLabel: Story = {
  args: {
    label: 'Justificación',
    labelPosition: 'left',
    placeholder: 'Explique la razón',
    required: true,
    tooltip: 'Campo obligatorio con mínimo 20 caracteres',
    status: 'error',
    message: 'La justificación es muy corta',
    rows: 5,
  },
};

/** Campo deshabilitado */
export const Disabled: Story = {
  args: {
    label: 'Notas internas',
    placeholder: 'No editable',
    disabled: true,
    rows: 4,
  },
};