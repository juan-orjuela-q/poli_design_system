import { Meta, StoryObj } from '@storybook/angular';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PdsCheckboxComponent } from './pds-checkbox.component';

const meta: Meta<PdsCheckboxComponent> = {
  title: 'DS v2/Checkbox',
  component: PdsCheckboxComponent,
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<PdsCheckboxComponent>;

export const Default: Story = {
  args: { label: 'Acepto los términos y condiciones', checked: false },
};

export const Checked: Story = {
  args: { label: 'Opción seleccionada', checked: true },
};

export const Indeterminate: Story = {
  args: { label: 'Selección parcial', indeterminate: true },
};

export const Disabled: Story = {
  args: { label: 'Opción deshabilitada', disabled: true },
};

export const DisabledChecked: Story = {
  args: { label: 'Deshabilitado seleccionado', checked: true, disabled: true },
};

export const WithReactiveForm: Story = {
  render: () => ({
    moduleMetadata: { imports: [PdsCheckboxComponent, ReactiveFormsModule] },
    props: { ctrl: new FormControl(false) },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px">
        <pds-checkbox label="Con FormControl" [formControl]="ctrl" />
        <p style="font-size:14px">Valor: {{ ctrl.value }}</p>
        <button (click)="ctrl.setValue(!ctrl.value)" style="font-size:12px;padding:4px 8px">Toggle</button>
        <button (click)="ctrl.disable()" style="font-size:12px;padding:4px 8px">Disable</button>
        <button (click)="ctrl.enable()" style="font-size:12px;padding:4px 8px">Enable</button>
      </div>
    `,
  }),
};
