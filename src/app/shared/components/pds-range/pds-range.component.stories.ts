import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { PdsRangeComponent } from './pds-range.component';

const meta: Meta<PdsRangeComponent> = {
  title: 'Poli Design System / 05. Forms / Range',
  component: PdsRangeComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({ imports: [ReactiveFormsModule] }),
  ],
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'double'],
    },
  },
};

export default meta;
type Story = StoryObj<PdsRangeComponent>;

export const Single: Story = {
  args: {
    type: 'single',
    label: 'Valor',
    min: 0,
    max: 100,
    step: 1,
    value: 25,
    showInputs: true,
  },
};

export const Double: Story = {
  args: {
    type: 'double',
    min: 0,
    max: 100,
    step: 1,
    valueMin: 25,
    valueMax: 75,
    labelMin: 'Min',
    labelMax: 'Max',
    showInputs: true,
  },
};

export const SingleNoInputs: Story = {
  args: {
    type: 'single',
    label: 'Porcentaje',
    min: 0,
    max: 100,
    value: 60,
    showInputs: false,
  },
};

export const DoubleNoInputs: Story = {
  args: {
    type: 'double',
    min: 0,
    max: 1000,
    step: 10,
    valueMin: 200,
    valueMax: 800,
    labelMin: 'Desde',
    labelMax: 'Hasta',
    showInputs: false,
  },
};

export const SingleWithStep: Story = {
  args: {
    type: 'single',
    label: 'Calificación',
    min: 0,
    max: 5,
    step: 0.5,
    value: 3.5,
    showInputs: true,
  },
};

export const DoublePriceRange: Story = {
  args: {
    type: 'double',
    min: 0,
    max: 5000000,
    step: 50000,
    valueMin: 500000,
    valueMax: 2500000,
    labelMin: 'Min',
    labelMax: 'Max',
    showInputs: true,
  },
};

export const Disabled: Story = {
  args: {
    type: 'double',
    min: 0,
    max: 100,
    valueMin: 20,
    valueMax: 70,
    disabled: true,
    labelMin: 'Min',
    labelMax: 'Max',
    showInputs: true,
  },
};
