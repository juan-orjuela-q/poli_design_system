import { Meta, StoryObj } from '@storybook/angular';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PdsDatePickerComponent } from './pds-date-picker.component';

const meta: Meta<PdsDatePickerComponent> = {
  title: 'DS v2/Date Picker',
  component: PdsDatePickerComponent,
  tags: ['autodocs'],
  argTypes: {
    mode:         { control: 'select', options: ['single', 'range'] },
    status:       { control: 'select', options: ['default', 'error', 'warning', 'success'] },
    disabled:     { control: 'boolean' },
    required:     { control: 'boolean' },
    label:        { control: 'text' },
    placeholder:  { control: 'text' },
    feedbackText: { control: 'text' },
    helpText:     { control: 'text' },
  },
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<PdsDatePickerComponent>;

export const Default: Story = {
  args: {
    label: 'Fecha de nacimiento',
    placeholder: 'dd/mm/aaaa',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Fecha de nacimiento',
    value: new Date(1995, 5, 15),
  },
};

export const Range: Story = {
  args: {
    label: 'Período académico',
    mode: 'range',
    placeholder: 'dd/mm/aaaa',
  },
};

export const WithFeedback: Story = {
  args: {
    label: 'Fecha de inicio',
    status: 'error',
    feedbackText: 'La fecha es obligatoria',
    required: true,
  },
};

export const WithHelp: Story = {
  args: {
    label: 'Fecha de matrícula',
    helpText: 'Selecciona la fecha límite de matrícula del semestre actual',
  },
};

export const WithMinMax: Story = {
  args: {
    label: 'Fecha de entrega',
    minDate: new Date(),
    maxDate: new Date(new Date().setMonth(new Date().getMonth() + 3)),
    feedbackText: 'Solo puedes seleccionar fechas de los próximos 3 meses',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Fecha de graduación',
    disabled: true,
    value: new Date(2025, 11, 10),
  },
};

export const WithReactiveForms: Story = {
  render: () => ({
    moduleMetadata: { imports: [PdsDatePickerComponent, ReactiveFormsModule] },
    props: { ctrl: new FormControl(new Date()) },
    template: `
      <div style="max-width:320px">
        <pds-date-picker label="Fecha" [formControl]="ctrl" />
        <p style="margin-top:8px;font-size:12px;color:#627380">Valor: {{ ctrl.value | date:'dd/MM/yyyy' }}</p>
      </div>
    `,
  }),
};
