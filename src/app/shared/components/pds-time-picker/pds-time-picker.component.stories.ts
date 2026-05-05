import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { PdsTimePickerComponent } from './pds-time-picker.component';

const meta: Meta<PdsTimePickerComponent> = {
  title: 'Poli Design System / 05. Forms / Time Picker',
  component: PdsTimePickerComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({ imports: [ReactiveFormsModule] }),
  ],
  argTypes: {
    status: {
      control: 'select',
      options: ['default', 'error', 'warning', 'success'],
    },
    step: {
      control: 'select',
      options: [60, 900, 1800, 3600, 1],
      description: 'Incremento en segundos. 60 = sin segundos, 1 = con segundos.',
    },
  },
};

export default meta;
type Story = StoryObj<PdsTimePickerComponent>;

export const Default: Story = {
  args: {
    label: 'Hora de inicio',
    required: false,
    disabled: false,
    status: 'default',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Hora de reunión',
    value: '09:30',
    required: true,
  },
};

export const WithMinMax: Story = {
  args: {
    label: 'Horario de atención',
    value: '10:00',
    min: '08:00',
    max: '18:00',
    helpText: 'Solo se pueden agendar citas entre 8:00 AM y 6:00 PM',
  },
};

export const WithSeconds: Story = {
  args: {
    label: 'Duración exacta',
    value: '01:30:00',
    step: 1,
    helpText: 'El campo incluye segundos',
  },
};

export const QuarterHourIntervals: Story = {
  args: {
    label: 'Hora de llegada',
    step: 900,
    helpText: 'Los intervalos son cada 15 minutos',
  },
};

export const WithError: Story = {
  args: {
    label: 'Hora de salida',
    value: '07:00',
    status: 'error',
    feedbackText: 'La hora debe ser posterior a las 8:00 AM',
  },
};

export const WithSuccess: Story = {
  args: {
    label: 'Hora confirmada',
    value: '14:00',
    status: 'success',
    feedbackText: 'Hora disponible',
  },
};

export const WithWarning: Story = {
  args: {
    label: 'Hora de entrega',
    value: '17:45',
    status: 'warning',
    feedbackText: 'Queda poco tiempo antes del cierre (18:00)',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Hora bloqueada',
    value: '10:00',
    disabled: true,
    helpText: 'Este campo no es editable en este momento',
  },
};
