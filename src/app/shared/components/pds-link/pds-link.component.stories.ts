import { Meta, StoryObj } from '@storybook/angular';
import { PdsLinkComponent } from './pds-link.component';

const meta: Meta<PdsLinkComponent> = {
  title: 'Poli Design System / 04. Actions / Link',
  component: PdsLinkComponent,
  tags: ['autodocs'],
  argTypes: {
    href: { control: 'text' },
    target: {
      control: 'select',
      options: ['_self', '_blank', '_parent', '_top'],
    },
    external: { control: 'boolean' },
  },
  parameters: {
    docs: {
      description: {
        component: `
Enlace de navegación basado en \`<a>\` nativo. Se diferencia semánticamente de \`pds-button\` por su función de navegación.

#### Accesibilidad
- \`<a>\` nativo con \`href\` válido.
- Links externos: \`rel="noopener noreferrer"\` automático + ícono con \`aria-label\`.
- El texto del enlace debe describir el destino.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<PdsLinkComponent>;

export const Default: Story = {
  args: { href: '#', target: '_self', external: false },
  render: (args) => ({
    props: args,
    template: `<pds-link [href]="href" [target]="target" [external]="external">Ver más información</pds-link>`,
  }),
};

export const InternalLink: Story = {
  name: 'Enlace interno',
  render: () => ({
    template: `<pds-link href="/dashboard">Ir al dashboard</pds-link>`,
  }),
};

export const ExternalLink: Story = {
  name: 'Enlace externo (con ícono)',
  render: () => ({
    template: `<pds-link href="https://poligran.edu.co" target="_blank" [external]="true">Sitio oficial Poli</pds-link>`,
  }),
};

export const InlineWithText: Story = {
  name: 'Inline dentro de párrafo',
  render: () => ({
    template: `
      <p style="font-size:1rem;color:#333">
        Para más información, visita la
        <pds-link href="/docs">documentación del sistema</pds-link>
        o consulta el
        <pds-link href="https://design.poligran.edu.co" target="_blank" [external]="true">Design System</pds-link>.
      </p>
    `,
  }),
};

export const AccessibilityFocus: Story = {
  name: 'A11y — Focus visible (Tab para probar)',
  render: () => ({
    template: `
      <div style="display:flex;gap:16px">
        <pds-link href="#">Primer enlace</pds-link>
        <pds-link href="#">Segundo enlace</pds-link>
        <pds-link href="#" [external]="true" target="_blank">Externo</pds-link>
      </div>
    `,
  }),
};

export const Visited: Story = {
  name: 'A11y — Estado visited',
  parameters: {
    docs: {
      description: {
        story: 'El estado `:visited` solo es aplicable en un navegador real donde el historial de navegación exista. Para verificarlo, abre el enlace y vuelve a esta página.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:12px">
        <pds-link href="#">Enlace no visitado (estado normal)</pds-link>
        <pds-link href="https://www.google.com" target="_blank">Enlace a Google (probablemente visitado)</pds-link>
        <pds-link href="https://www.google.com" target="_blank" [external]="true">Google con ícono externo (visited)</pds-link>
      </div>
    `,
  }),
};
