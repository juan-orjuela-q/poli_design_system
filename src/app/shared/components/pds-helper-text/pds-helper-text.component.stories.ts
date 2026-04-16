import { Meta, StoryObj } from '@storybook/angular';
import { PdsHelperTextComponent } from './pds-helper-text.component';

const meta: Meta<PdsHelperTextComponent & { text: string }> = {
  title: 'DS v2/Helper Text',
  component: PdsHelperTextComponent,
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['default', 'info', 'error', 'warning', 'success'],
    },
    text: { control: 'text' },
  },
  args: {
    status: 'default',
    text: 'Helper text',
  },
  render: ({ status, text }) => ({
    props: { status, text },
    template: `<pds-helper-text [status]="status">{{ text }}</pds-helper-text>`,
  }),
  parameters: {
    docs: {
      description: {
        component: `
Mensaje de apoyo bajo campos de formulario, barras de progreso y otros componentes.
Usa color e ícono combinados para no depender solo del color (WCAG 1.4.1).

#### Estados
| Status | Ícono | Color |
|--------|-------|-------|
| \`default\` | sin ícono | neutro secundario |
| \`info\` | \`info\` | info |
| \`error\` | \`error\` | error |
| \`warning\` | \`warning\` | advertencia |
| \`success\` | \`check_circle\` | éxito |
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<PdsHelperTextComponent & { text: string }>;

export const Default: Story = {
  args: { status: 'default', text: 'Helper text' },
};

export const AllStatuses: Story = {
  name: 'Todos los estados',
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:8px">
        <pds-helper-text status="default">Texto de ayuda por defecto</pds-helper-text>
        <pds-helper-text status="info">Información adicional</pds-helper-text>
        <pds-helper-text status="error">Este campo es obligatorio</pds-helper-text>
        <pds-helper-text status="warning">Verifica antes de continuar</pds-helper-text>
        <pds-helper-text status="success">Correcto, los datos son válidos</pds-helper-text>
      </div>
    `,
  }),
};
