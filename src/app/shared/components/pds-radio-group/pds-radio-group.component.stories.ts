import { Meta, StoryObj } from '@storybook/angular';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PdsRadioGroupComponent, RadioOption } from './pds-radio-group.component';

const OPTIONS: RadioOption[] = [
  { value: 'student', label: 'Estudiante' },
  { value: 'teacher', label: 'Docente' },
  { value: 'admin', label: 'Administrativo' },
  { value: 'other', label: 'Otro', disabled: true },
];

const meta: Meta<PdsRadioGroupComponent> = {
  title: 'Poli Design System / 05. Forms / Form (Radio Group)',
  component: PdsRadioGroupComponent,
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'select', options: ['vertical', 'horizontal'] },
    disabled: { control: 'boolean' },
    groupLabel: { control: 'text' },
  },
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<PdsRadioGroupComponent>;

export const Default: Story = {
  args: { groupLabel: '¿Cuál es tu rol?', options: OPTIONS, name: 'rol' },
};

export const Horizontal: Story = {
  args: { groupLabel: 'Tipo de usuario', options: OPTIONS, name: 'rol-h', orientation: 'horizontal' },
};

export const Disabled: Story = {
  args: { groupLabel: 'Opciones deshabilitadas', options: OPTIONS, name: 'rol-d', disabled: true },
};

export const WithReactiveForm: Story = {
  render: () => ({
    moduleMetadata: { imports: [PdsRadioGroupComponent, ReactiveFormsModule] },
    props: {
      ctrl: new FormControl<string | null>(null),
      options: OPTIONS,
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px">
        <pds-radio-group
          groupLabel="¿Cuál es tu rol?"
          name="rol-form"
          [options]="options"
          [formControl]="ctrl"
        />
        <p style="font-size:14px">Seleccionado: {{ ctrl.value }}</p>
      </div>
    `,
  }),
};
