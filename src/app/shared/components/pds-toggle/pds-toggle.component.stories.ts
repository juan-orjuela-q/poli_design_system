import { Meta, StoryObj } from '@storybook/angular';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PdsToggleComponent } from './pds-toggle.component';

const meta: Meta<PdsToggleComponent> = {
  title: 'Poli Design System / 05. Forms / Form (Toggle)',
  component: PdsToggleComponent,
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    labelPosition: { control: 'select', options: ['left', 'right'] },
  },
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<PdsToggleComponent>;

export const Default: Story = {
  args: { label: 'Notificaciones por email', checked: false },
};

export const On: Story = {
  args: { label: 'Modo oscuro', checked: true },
};

export const LabelLeft: Story = {
  args: { label: 'Modo avión', labelPosition: 'left', checked: false },
};

export const Disabled: Story = {
  args: { label: 'Opción bloqueada', disabled: true },
};

export const DisabledOn: Story = {
  args: { label: 'Siempre activo', checked: true, disabled: true },
};

export const WithReactiveForm: Story = {
  render: () => ({
    moduleMetadata: { imports: [PdsToggleComponent, ReactiveFormsModule] },
    props: { ctrl: new FormControl(false) },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px">
        <pds-toggle label="Con FormControl" [formControl]="ctrl" />
        <p style="font-size:14px">Valor: {{ ctrl.value }}</p>
        <button (click)="ctrl.disable()" style="font-size:12px;padding:4px 8px">Disable</button>
        <button (click)="ctrl.enable()" style="font-size:12px;padding:4px 8px">Enable</button>
      </div>
    `,
  }),
};
