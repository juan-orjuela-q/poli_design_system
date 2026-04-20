import { Meta, StoryObj } from '@storybook/angular';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { PdsInputFieldComponent } from './pds-input-field.component';

const meta: Meta<PdsInputFieldComponent> = {
  title: 'DS v2/Input Field',
  component: PdsInputFieldComponent,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'] },
    status: { control: 'select', options: ['default', 'error', 'warning', 'success', 'loading'] },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    required: { control: 'boolean' },
    showCounter: { control: 'boolean' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    feedbackText: { control: 'text' },
    maxLength: { control: 'number' },
    helpText: { control: 'text' },
  },
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<PdsInputFieldComponent>;

export const Default: Story = {
  args: { label: 'Nombre completo', placeholder: 'Ingresa tu nombre' },
};

export const WithHelpTooltip: Story = {
  args: {
    label: 'Correo electrónico',
    type: 'email',
    placeholder: 'nombre@poli.edu.co',
    helpText: 'Usa tu correo institucional @poligran.edu.co. No uses cuentas personales.',
  },
};

export const WithFeedbackText: Story = {
  args: { label: 'Correo electrónico', type: 'email', placeholder: 'nombre@poli.edu.co', feedbackText: 'Usa tu correo institucional' },
};

export const Error: Story = {
  args: { label: 'Email', type: 'email', status: 'error', feedbackText: 'El correo no tiene un formato válido', value: 'correo-invalido' },
};

export const Warning: Story = {
  args: { label: 'Usuario', status: 'warning', feedbackText: 'Este usuario ya existe, verifica', value: 'jgarcia' },
};

export const Success: Story = {
  args: { label: 'Email', type: 'email', status: 'success', feedbackText: 'Correo verificado', value: 'juan@poli.edu.co' },
};

export const Loading: Story = {
  args: { label: 'Buscar código', status: 'loading', placeholder: 'Ej: 101010', feedbackText: 'Verificando disponibilidad...' },
};

export const Password: Story = {
  args: { label: 'Contraseña', type: 'password', placeholder: 'Ingresa tu contraseña' },
};

export const WithCounter: Story = {
  args: { label: 'Nombre de usuario', maxLength: 30, showCounter: true, placeholder: 'Máximo 30 caracteres' },
};

export const WithIcons: Story = {
  args: { label: 'Buscar', type: 'search', iconStart: 'search', placeholder: 'Buscar en el sistema...' },
};

export const ReadOnly: Story = {
  args: { label: 'Código de programa', readonly: true, value: 'ICIVIL-2024' },
};

export const Disabled: Story = {
  args: { label: 'Campo bloqueado', disabled: true, value: 'No editable' },
};

export const Required: Story = {
  args: { label: 'Cédula', required: true, placeholder: '1234567890' },
};

export const WithReactiveForm: Story = {
  render: () => ({
    moduleMetadata: { imports: [PdsInputFieldComponent, ReactiveFormsModule] },
    props: {
      ctrl: new FormControl('', [Validators.required, Validators.email]),
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;max-width:400px">
        <pds-input-field
          label="Email (reactive)"
          type="email"
          placeholder="nombre@poli.edu.co"
          [status]="ctrl.invalid && ctrl.touched ? 'error' : 'default'"
          [helperText]="ctrl.invalid && ctrl.touched ? 'Ingresa un email válido' : null"
          [formControl]="ctrl"
          [required]="true"
        />
        <p style="font-size:12px">Valid: {{ ctrl.valid }} | Touched: {{ ctrl.touched }}</p>
        <button (click)="ctrl.markAsTouched()" style="font-size:12px;padding:4px 8px">Mark touched</button>
      </div>
    `,
  }),
};
