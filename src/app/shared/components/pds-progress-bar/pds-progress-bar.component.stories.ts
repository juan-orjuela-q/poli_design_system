import { Meta, StoryObj } from '@storybook/angular';
import { PdsProgressBarComponent } from './pds-progress-bar.component';

const meta: Meta<PdsProgressBarComponent> = {
  title: 'DS v2/Progress Bar',
  component: PdsProgressBarComponent,
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    status: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'error'],
    },
    label: { control: 'text' },
    showValue: { control: 'boolean' },
  },
  parameters: {
    docs: {
      description: {
        component: `
Comunica el avance de un proceso con duración perceptible.

#### Accesibilidad
- \`role="progressbar"\` con \`aria-valuenow/min/max\`.
- \`aria-label\` describe qué proceso se está midiendo.
- El color no es el único indicador del estado.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<PdsProgressBarComponent>;

export const Default: Story = {
  args: { value: 60, status: 'primary', label: 'Cargando...', showValue: true },
};

export const AllStatuses: Story = {
  name: 'Todos los estados',
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;max-width:400px">
        <pds-progress-bar [value]="75" status="primary" label="Subiendo archivo" [showValue]="true"></pds-progress-bar>
        <pds-progress-bar [value]="100" status="success" label="Completado" [showValue]="true"></pds-progress-bar>
        <pds-progress-bar [value]="45" status="warning" label="Procesando..." [showValue]="true"></pds-progress-bar>
        <pds-progress-bar [value]="20" status="error" label="Error en la carga" [showValue]="true"></pds-progress-bar>
      </div>
    `,
  }),
};

export const WithoutLabel: Story = {
  name: 'Sin etiqueta',
  args: { value: 40, status: 'primary' },
};

export const Indeterminate: Story = {
  name: 'Valor 0 y 100',
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;max-width:400px">
        <pds-progress-bar [value]="0" status="primary" label="Sin progreso" [showValue]="true"></pds-progress-bar>
        <pds-progress-bar [value]="100" status="success" label="Completo" [showValue]="true"></pds-progress-bar>
      </div>
    `,
  }),
};
