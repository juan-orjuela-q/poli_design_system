import { Meta, StoryObj } from '@storybook/angular';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { PdsSelectFieldComponent, SelectOption } from './pds-select-field.component';

const FACULTIES: SelectOption[] = [
  { value: 'engineering', label: 'Ingeniería' },
  { value: 'business', label: 'Ciencias Empresariales' },
  { value: 'law', label: 'Derecho' },
  { value: 'education', label: 'Educación' },
  { value: 'health', label: 'Ciencias de la Salud', disabled: true },
];

const meta: Meta<PdsSelectFieldComponent> = {
  title: 'DS v2/Select Field',
  component: PdsSelectFieldComponent,
  tags: ['autodocs'],
  argTypes: {
    status: { control: 'select', options: ['default', 'error', 'warning', 'success'] },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    feedbackText: { control: 'text' },
  },
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<PdsSelectFieldComponent>;

export const Default: Story = {
  args: { label: 'Facultad', options: FACULTIES, placeholder: 'Selecciona tu facultad' },
};

export const WithValue: Story = {
  args: { label: 'Facultad', options: FACULTIES, value: 'engineering' },
};

export const Error: Story = {
  args: { label: 'Facultad', options: FACULTIES, status: 'error', feedbackText: 'Debes seleccionar una facultad', required: true },
};

export const Disabled: Story = {
  args: { label: 'Facultad', options: FACULTIES, disabled: true },
};

export const WithReactiveForm: Story = {
  render: () => ({
    moduleMetadata: { imports: [PdsSelectFieldComponent, ReactiveFormsModule] },
    props: {
      ctrl: new FormControl<string | null>(null, Validators.required),
      options: FACULTIES,
    },
    template: `
      <div style="max-width:320px;display:flex;flex-direction:column;gap:16px">
        <pds-select-field
          label="Facultad"
          placeholder="Selecciona una facultad"
          [options]="options"
          [status]="ctrl.invalid && ctrl.touched ? 'error' : 'default'"
          [feedbackText]="ctrl.invalid && ctrl.touched ? 'Selección requerida' : null"
          [formControl]="ctrl"
          [required]="true"
        />
        <p style="font-size:14px">Valor: {{ ctrl.value }}</p>
        <button (click)="ctrl.markAsTouched()" style="font-size:12px;padding:4px 8px">Mark touched</button>
      </div>
    `,
  }),
};
