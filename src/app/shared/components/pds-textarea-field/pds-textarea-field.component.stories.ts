import { Meta, StoryObj } from '@storybook/angular';
import { PdsTextareaFieldComponent } from './pds-textarea-field.component';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

const meta: Meta<PdsTextareaFieldComponent> = {
  title: 'DS v2/Textarea Field',
  component: PdsTextareaFieldComponent,
  tags: ['autodocs'],
  argTypes: {
    status: { control: 'select', options: ['default', 'error', 'warning', 'success'] },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    required: { control: 'boolean' },
    showCounter: { control: 'boolean' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    helperText: { control: 'text' },
    rows: { control: 'number' },
  },
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<PdsTextareaFieldComponent>;

export const Default: Story = {
  args: { label: 'Comentarios', placeholder: 'Escribe aquí tus comentarios...' },
};

export const WithHelperText: Story = {
  args: { label: 'Observaciones', helperText: 'Máximo 300 caracteres', maxLength: 300, showCounter: true },
};

export const Error: Story = {
  args: { label: 'Descripción', status: 'error', helperText: 'Este campo es requerido' },
};

export const Success: Story = {
  args: { label: 'Justificación', status: 'success', helperText: 'Texto validado', value: 'Justificación completa.' },
};

export const Disabled: Story = {
  args: { label: 'Campo bloqueado', disabled: true, value: 'No editable' },
};

export const ReadOnly: Story = {
  args: { label: 'Observaciones del sistema', readonly: true, value: 'Generado automáticamente por el sistema.' },
};
