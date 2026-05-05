import { Meta, StoryObj } from '@storybook/angular';
import { PdsTagComponent } from './pds-tag.component';

const meta: Meta<PdsTagComponent & { text: string }> = {
  title: 'Poli Design System / 07. Content / Tags',
  component: PdsTagComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
    },
    iconStart: { control: 'text' },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    removable: { control: 'boolean' },
    selected: { control: 'boolean' },
    text: { control: 'text' },
  },
  args: {
    variant: 'primary',
    iconStart: '',
    label: 'Categoria',
    disabled: false,
    removable: false,
    selected: false,
    text: 'Categoria',
  },
  render: ({ variant, iconStart, label, disabled, removable, selected, text }) => ({
    props: { variant, iconStart: iconStart || null, label, disabled, removable, selected, text },
    template: `
      <pds-tag
        [variant]="variant"
        [iconStart]="iconStart"
        [label]="label"
        [disabled]="disabled"
        [removable]="removable"
        [selected]="selected">{{ text }}</pds-tag>
    `,
  }),
  parameters: {
    docs: {
      description: {
        component: [
          'Elemento interactivo para filtros, categorias y estados.',
          '',
          '#### Accesibilidad',
          '- `<button>` nativo garantiza soporte de teclado y AT.',
          '- `aria-pressed` comunica el estado seleccionado.',
          '- El icono eliminar es un `<span role="button">` con `aria-label="Eliminar [label]"`.',
          '- `aria-disabled` mantiene el elemento en el tab order.',
          '- Touch target minimo 48x48px (WCAG 2.5.5).',
        ].join('\n'),
      },
    },
  },
};

export default meta;
type Story = StoryObj<PdsTagComponent & { text: string }>;

export const Default: Story = {
  args: { variant: 'primary', text: 'Categoria' },
};

export const WithIcon: Story = {
  name: 'Con icono al inicio',
  render: () => ({
    template: `
      <div style="display:flex;gap:8px;align-items:center">
        <pds-tag variant="primary" iconStart="label">Diseno</pds-tag>
        <pds-tag variant="secondary" iconStart="star">Destacado</pds-tag>
        <pds-tag variant="tertiary" iconStart="filter_list">Filtro</pds-tag>
      </div>
    `,
  }),
};

export const AllVariants: Story = {
  name: 'Todas las variantes',
  render: () => ({
    template: `
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
        <pds-tag variant="primary">Primary</pds-tag>
        <pds-tag variant="secondary">Secondary</pds-tag>
        <pds-tag variant="tertiary">Tertiary</pds-tag>
      </div>
    `,
  }),
};

export const Removable: Story = {
  name: 'Removible',
  render: () => ({
    template: `
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
        <pds-tag variant="primary" [removable]="true" label="Angular">Angular</pds-tag>
        <pds-tag variant="secondary" [removable]="true" label="TypeScript">TypeScript</pds-tag>
        <pds-tag variant="tertiary" [removable]="true" label="SCSS">SCSS</pds-tag>
      </div>
    `,
  }),
};

export const WithIconAndRemovable: Story = {
  name: 'Icono + removible',
  render: () => ({
    template: `
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
        <pds-tag variant="primary" iconStart="label" [removable]="true" label="Diseno">Diseno</pds-tag>
        <pds-tag variant="secondary" iconStart="star" [removable]="true" label="Destacado">Destacado</pds-tag>
        <pds-tag variant="tertiary" iconStart="filter_list" [removable]="true" label="Filtro">Filtro</pds-tag>
      </div>
    `,
  }),
};

export const Selected: Story = {
  name: 'Estado seleccionado',
  render: () => ({
    template: `
      <div style="display:flex;gap:8px;align-items:center">
        <pds-tag variant="tertiary" [selected]="true">Seleccionado</pds-tag>
        <pds-tag variant="tertiary" [selected]="false">No seleccionado</pds-tag>
      </div>
    `,
  }),
};

export const DisabledState: Story = {
  name: 'Estado deshabilitado',
  render: () => ({
    template: `
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
        <pds-tag variant="primary" [disabled]="true">Primary</pds-tag>
        <pds-tag variant="secondary" [disabled]="true">Secondary</pds-tag>
        <pds-tag variant="tertiary" [disabled]="true">Tertiary</pds-tag>
        <pds-tag variant="primary" [disabled]="true" [removable]="true" label="Eliminable">Eliminable</pds-tag>
      </div>
    `,
  }),
};
