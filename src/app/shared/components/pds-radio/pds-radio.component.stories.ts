import { Meta, StoryObj } from '@storybook/angular';
import { PdsRadioComponent } from './pds-radio.component';

const meta: Meta<PdsRadioComponent> = {
  title: 'DS v2/Radio',
  component: PdsRadioComponent,
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    value: { control: 'text' },
  },
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<PdsRadioComponent>;

export const Default: Story = {
  args: { label: 'Opción A', name: 'grupo', value: 'a', checked: false },
};

export const Checked: Story = {
  args: { label: 'Opción seleccionada', name: 'grupo2', value: 'b', checked: true },
};

export const Disabled: Story = {
  args: { label: 'Opción deshabilitada', name: 'grupo3', value: 'c', disabled: true },
};

export const DisabledChecked: Story = {
  args: { label: 'Deshabilitado seleccionado', name: 'grupo4', value: 'd', checked: true, disabled: true },
};

export const GroupExample: Story = {
  render: () => ({
    moduleMetadata: { imports: [PdsRadioComponent] },
    props: { selected: 'a' },
    template: `
      <div role="radiogroup" aria-labelledby="group-label" style="display:flex;flex-direction:column;gap:8px">
        <p id="group-label" style="font-size:14px;font-weight:600;margin:0 0 8px">¿Cuál es tu preferencia?</p>
        <pds-radio name="example" value="a" label="Opción A" [checked]="selected==='a'" (checkedChange)="selected=$event" />
        <pds-radio name="example" value="b" label="Opción B" [checked]="selected==='b'" (checkedChange)="selected=$event" />
        <pds-radio name="example" value="c" label="Opción C" [checked]="selected==='c'" (checkedChange)="selected=$event" />
        <p style="font-size:12px;margin-top:8px">Seleccionado: {{ selected }}</p>
      </div>
    `,
  }),
};
