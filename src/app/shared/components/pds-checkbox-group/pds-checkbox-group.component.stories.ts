import { Meta, StoryObj } from '@storybook/angular';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PdsCheckboxGroupComponent, CheckboxOption } from './pds-checkbox-group.component';

const OPTIONS: CheckboxOption[] = [
  { value: 'email', label: 'Notificaciones por email' },
  { value: 'sms', label: 'Notificaciones por SMS' },
  { value: 'push', label: 'Notificaciones push' },
  { value: 'postal', label: 'Correo postal', disabled: true },
];

const meta: Meta<PdsCheckboxGroupComponent> = {
  title: 'Poli Design System / 05. Forms / Form (Checkbox Group)',
  component: PdsCheckboxGroupComponent,
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'select', options: ['vertical', 'horizontal'] },
    disabled: { control: 'boolean' },
    groupLabel: { control: 'text' },
  },
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<PdsCheckboxGroupComponent>;

export const Default: Story = {
  args: { groupLabel: '¿Cómo deseas recibir notificaciones?', options: OPTIONS },
};

export const Horizontal: Story = {
  args: { groupLabel: 'Canales activos', options: OPTIONS, orientation: 'horizontal' },
};

export const Disabled: Story = {
  args: { groupLabel: 'Opciones deshabilitadas', options: OPTIONS, disabled: true },
};

export const WithReactiveForm: Story = {
  render: () => ({
    moduleMetadata: { imports: [PdsCheckboxGroupComponent, ReactiveFormsModule] },
    props: {
      ctrl: new FormControl<string[]>(['email']),
      options: OPTIONS,
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px">
        <pds-checkbox-group
          groupLabel="Canales de notificación"
          [options]="options"
          [formControl]="ctrl"
        />
        <p style="font-size:14px">Seleccionados: {{ ctrl.value | json }}</p>
      </div>
    `,
  }),
};
