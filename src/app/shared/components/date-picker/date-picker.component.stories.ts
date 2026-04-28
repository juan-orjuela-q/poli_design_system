import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePickerComponent } from './date-picker.component';

/**
 * Meta config
 */
const meta: Meta<DatePickerComponent> = {
  title: 'DS v1 (Legacy)/Date Picker',
  component: DatePickerComponent,
  tags: ['autodocs'],          // Habilita la generación automática de docs
  decorators: [
    moduleMetadata({
      imports: [FormsModule, ReactiveFormsModule],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
Basado en **MatDatepicker** y adaptado a los lineamientos visuales del Politécnico Grancolombiano.  
Incluye etiqueta opcional, indicador de requerido y *tooltip* contextual.  
Soporta localización **es-CO** y el formato de entrada _DD/MM/AAAA_.`,
      },
    },
  },
  argTypes: {
    label:     { control: 'text',   description: 'Texto del label' },
    fieldID:   { control: 'text',   description: 'ID del campo (se autogenera si hay label)' },
    required:  { control: 'boolean',description: 'Marca el campo como obligatorio' },
    tooltip:   { control: 'text',   description: 'Texto del tooltip de ayuda' },
  },
};
export default meta;

/**
 * Stories
 */
type Story = StoryObj<DatePickerComponent>;

export const Default: Story = {
  args: {
    label: 'Fecha de nacimiento',
    required: false,
    tooltip: '',
    fieldID: '',
  },
};

export const RequiredWithTooltip: Story = {
  name: 'Requerido + Tooltip',
  args: {
    label: 'Fecha de inicio',
    required: true,
    tooltip: 'Selecciona la fecha en la que inicia el periodo',
  },
};
