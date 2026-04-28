import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { MaterialSelectComponent } from './select.component';

const meta: Meta<MaterialSelectComponent> = {
  title: 'DS v1 (Legacy)/Select',
  component: MaterialSelectComponent,
    tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [FormsModule, MaterialSelectComponent]
    })
  ],
  argTypes: {
    status: {
      control: { type: 'select' },
      options: ['', 'success', 'warning', 'error']
    },
    labelPosition: {
      control: { type: 'select' },
      options: ['top', 'left']
    },
    multiple: { control: 'boolean' }
  },
  parameters: {
    docs: { description: { component: 'Componente Select basado en Angular Material que usa la misma apariencia que **Material Input**.' } }
  }
};
export default meta;

type Story = StoryObj<MaterialSelectComponent>;

export const Primary: Story = {
  args: {
    label: 'País',
    placeholder: 'Selecciona un país',
    options: [
      { label: 'Colombia', value: 'CO' },
      { label: 'México', value: 'MX' },
      { label: 'Argentina', value: 'AR' }
    ]
  }
};

export const WithStatusSuccess: Story = {
  args: {
    ...Primary.args,
    status: 'success',
    message: '¡Selección válida!'
  }
};

export const MultipleSelection: Story = {
  args: {
    label: 'Lenguajes',
    multiple: true,
    options: [
      { label: 'JavaScript', value: 'js' },
      { label: 'TypeScript', value: 'ts' },
      { label: 'Python', value: 'py' }
    ]
  }
};
