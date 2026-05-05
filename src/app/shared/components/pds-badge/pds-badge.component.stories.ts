import { Meta, StoryObj } from '@storybook/angular';
import { PdsBadgeComponent } from './pds-badge.component';

const meta: Meta<PdsBadgeComponent & { label: string }> = {
  title: 'Poli Design System / 07. Content / Badge',
  component: PdsBadgeComponent,
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['brand', 'brand-subtle', 'brand-secondary', 'neutral', 'success', 'warning', 'error'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    shape: {
      control: 'select',
      options: ['pill', 'rectangle'],
    },
    iconStart: { control: 'text' },
    iconEnd: { control: 'text' },
    label: { control: 'text', description: 'Texto visible del badge' },
  },
  parameters: {
    docs: {
      description: {
        component: `
Indicador visual compacto para comunicar estados, categorías o información cuantitativa.
No es interactivo — para elementos interactivos usar \`pds-tag\`.

#### Accesibilidad
- \`role="status"\` comunica cambios dinámicos a lectores de pantalla.
- El color no es el único indicador del estado.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<PdsBadgeComponent & { label: string }>;

export const Default: Story = {
  args: { status: 'brand', size: 'md', shape: 'pill', label: 'Nuevo', iconStart: '', iconEnd: '' },
  render: (args) => ({
    props: args,
    template: `<pds-badge [status]="status" [size]="size" [shape]="shape" [iconStart]="iconStart || null" [iconEnd]="iconEnd || null">{{ label }}</pds-badge>`,
  }),
};

export const AllStatuses: Story = {
  name: 'Todos los estados',
  render: () => ({
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center">
        <pds-badge status="brand">Brand</pds-badge>
        <pds-badge status="brand-subtle">Brand Subtle</pds-badge>
        <pds-badge status="brand-secondary">Brand Secondary</pds-badge>
        <pds-badge status="neutral">Neutral</pds-badge>
        <pds-badge status="success">Activo</pds-badge>
        <pds-badge status="warning">Pendiente</pds-badge>
        <pds-badge status="error">Error</pds-badge>
      </div>
    `,
  }),
};

export const AllSizes: Story = {
  name: 'Todos los tamaños',
  render: () => ({
    template: `
      <div style="display:flex;gap:8px;align-items:center">
        <pds-badge status="brand" size="sm">SM</pds-badge>
        <pds-badge status="brand" size="md">MD</pds-badge>
        <pds-badge status="brand" size="lg">LG</pds-badge>
      </div>
    `,
  }),
};

export const Shapes: Story = {
  name: 'Pill vs Rectangle',
  render: () => ({
    template: `
      <div style="display:flex;gap:8px;align-items:center">
        <pds-badge status="success" shape="pill">Pill</pds-badge>
        <pds-badge status="success" shape="rectangle">Rectangle</pds-badge>
      </div>
    `,
  }),
};

export const WithIcon: Story = {
  name: 'Con ícono',
  render: () => ({
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center">
        <pds-badge status="brand" iconStart="star">Destacado</pds-badge>
        <pds-badge status="success" iconStart="check_circle">Completado</pds-badge>
        <pds-badge status="error" iconStart="error">Error</pds-badge>
      </div>
    `,
  }),
};
