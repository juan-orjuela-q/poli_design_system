import type { Meta, StoryObj } from '@storybook/angular';
import { PdsAppHeaderComponent } from './pds-app-header.component';

const meta: Meta<PdsAppHeaderComponent> = {
  title: 'DS v2/App Header',
  component: PdsAppHeaderComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Banner de la portada de un aplicativo: ícono, nombre y descripción centrados ' +
          'sobre un degradado azul.\n\n' +
          'Es el equivalente de `pds-portal-header` un nivel más abajo. La diferencia no es ' +
          'sólo visual: el encabezado de portal presenta el portal y ofrece acciones; este ' +
          'presenta el aplicativo y no las lleva — debajo van las tarjetas de sus secciones.\n\n' +
          '**Sobre el degradado:** es siempre azul, independientemente del portal. `color` ' +
          'sólo afecta al ícono.',
      },
    },
  },
  argTypes: {
    color: {
      control: 'select',
      options: ['blue', 'yellow', 'green', 'magenta'],
      description: 'Variante de branding. Afecta al ícono, no al degradado.',
    },
    headingLevel: {
      control: 'inline-radio',
      options: [1, 2],
    },
  },
};

export default meta;
type Story = StoryObj<PdsAppHeaderComponent>;

/** El caso normal en la portada de un aplicativo. */
export const Default: Story = {
  args: {
    title: 'PoliAccess',
    description: 'Gestión de acceso y credenciales institucionales.',
    icon: 'hive',
    color: 'blue',
  },
};

/**
 * Los cuatro brandings sobre el mismo degradado: sólo cambia el ícono, que es
 * justamente lo que distingue a un aplicativo de otro portal.
 */
export const Colores: Story = {
  render: () => ({
    template: (['blue', 'yellow', 'green', 'magenta'] as const)
      .map(
        (c) => `
        <div style="margin-bottom:16px">
          <pds-app-header
            title="Portal ${c}"
            description="Gestión de acceso y credenciales institucionales."
            icon="hive"
            color="${c}" />
        </div>`,
      )
      .join(''),
  }),
};

/** Sin ícono ni descripción: el mínimo, sólo el nombre del aplicativo. */
export const SoloTitulo: Story = {
  args: { title: 'PoliAccess', description: null, icon: null, color: 'blue' },
};

/** Descripción larga: se limita a 60ch para que la línea siga siendo legible. */
export const TextosLargos: Story = {
  args: {
    title: 'Gestión de acceso y credenciales institucionales',
    description:
      'Centraliza la solicitud, aprobación y revocación de credenciales de acceso a los ' +
      'sistemas del Politécnico, con trazabilidad completa de cada cambio y control de ' +
      'vigencias por dependencia.',
    icon: 'hive',
    color: 'magenta',
  },
};

/** Por debajo de 768px la composición no cambia: ya es una columna centrada. */
export const Movil: Story = {
  args: {
    title: 'Cuponera',
    description: 'Beneficios y descuentos para la comunidad institucional.',
    icon: 'local_bar',
    color: 'yellow',
  },
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
    docs: { story: { inline: false, height: '380px' } },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width:100%;max-width:360px;outline:1px solid #ccc">
        <pds-app-header
          [title]="title" [description]="description" [icon]="icon" [color]="color" />
      </div>
    `,
  }),
};
