import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { PdsPortalHeaderComponent } from './pds-portal-header.component';
import { PdsButtonComponent } from '../pds-button/pds-button.component';

const meta: Meta<PdsPortalHeaderComponent> = {
  title: 'DS v2/Portal Header',
  component: PdsPortalHeaderComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [PdsButtonComponent] })],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Encabezado de la portada de un portal. Va inmediatamente debajo de `pds-portal-nav`, ' +
          'sobre el contenido.\n\n' +
          '**Sobre las acciones:** el componente no impone ninguna. Se proyectan por el slot ' +
          '`[portalHeaderActions]`, así que cada portal decide si muestra Novedades, Ayuda, ' +
          'ambas o ninguna. Sin acciones el contenedor desaparece y no deja espacio muerto.\n\n' +
          '**Sobre el `color`:** debe coincidir con el de `pds-portal-nav`. Ambos comparten el ' +
          'tipo `PortalNavColor` para que un desajuste sea un error de compilación.',
      },
    },
  },
  argTypes: {
    color: {
      control: 'select',
      options: ['blue', 'yellow', 'green', 'magenta'],
      description: 'Variante de branding del portal.',
    },
    headingLevel: {
      control: 'inline-radio',
      options: [1, 2],
      description: 'Nivel del encabezado. Bajar a 2 si la página ya tiene un `<h1>`.',
    },
  },
};

export default meta;
type Story = StoryObj<PdsPortalHeaderComponent>;

const base = {
  title: 'Gestión académica',
  description: 'Facilita y organiza la operación académica de programas y ciclos formativos.',
  icon: 'hive',
};

/** El caso completo: identidad del portal más las dos acciones transversales. */
export const Default: Story = {
  args: { ...base, color: 'blue' },
  render: (args) => ({
    props: args,
    template: `
      <pds-portal-header
        [title]="title" [description]="description" [icon]="icon" [color]="color">
        <pds-button portalHeaderActions variant="outline" size="sm" iconStart="campaign">
          Novedades
        </pds-button>
        <pds-button portalHeaderActions variant="outline" size="sm" iconStart="help">
          Ayuda
        </pds-button>
      </pds-portal-header>
    `,
  }),
};

/** Los cuatro brandings. El ícono toma el fondo, el borde y el color del portal. */
export const Colores: Story = {
  render: () => ({
    template: (['blue', 'yellow', 'green', 'magenta'] as const)
      .map(
        (c) => `
        <pds-portal-header
          title="Portal ${c}"
          description="Facilita y organiza la operación académica de programas y ciclos formativos."
          icon="hive"
          color="${c}">
          <pds-button portalHeaderActions variant="outline" size="sm" iconStart="help">
            Ayuda
          </pds-button>
        </pds-portal-header>`,
      )
      .join(''),
  }),
};

/** Sin acciones proyectadas: el título ocupa todo el ancho, sin espacio colgando. */
export const SinAcciones: Story = {
  args: { ...base, color: 'green' },
  render: (args) => ({
    props: args,
    template: `
      <pds-portal-header
        [title]="title" [description]="description" [icon]="icon" [color]="color" />
    `,
  }),
};

/** Sin ícono ni descripción: el mínimo viable, sólo el nombre del portal. */
export const SoloTitulo: Story = {
  args: { title: 'Gestión académica', description: null, icon: null, color: 'blue' },
  render: (args) => ({
    props: args,
    template: `
      <pds-portal-header
        [title]="title" [description]="description" [icon]="icon" [color]="color" />
    `,
  }),
};

/** Textos largos: el bloque encoge sin empujar las acciones fuera de la barra. */
export const TextosLargos: Story = {
  args: {
    title: 'Portal de Servicios Académicos y Administrativos',
    description:
      'Centraliza la gestión de programas, ciclos formativos, matrículas, certificaciones y ' +
      'trámites administrativos de toda la comunidad institucional.',
    icon: 'hive',
    color: 'magenta',
  },
  render: (args) => ({
    props: args,
    template: `
      <pds-portal-header
        [title]="title" [description]="description" [icon]="icon" [color]="color">
        <pds-button portalHeaderActions variant="outline" size="sm" iconStart="campaign">
          Novedades
        </pds-button>
        <pds-button portalHeaderActions variant="outline" size="sm" iconStart="help">
          Ayuda
        </pds-button>
      </pds-portal-header>
    `,
  }),
};

/**
 * Por debajo de 768px el encabezado se apila y se centra: ícono, título,
 * descripción y acciones, uno debajo del otro.
 *
 * El padding baja a 20px/24px y la separación ícono↔título a 12px; el título
 * conserva su tamaño (`--font-size-f-4xl`) y envuelve en dos líneas.
 */
export const Movil: Story = {
  args: { ...base, color: 'yellow' },
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
    docs: { story: { inline: false, height: '420px' } },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width:100%;max-width:360px;outline:1px solid #ccc">
        <pds-portal-header
          [title]="title" [description]="description" [icon]="icon" [color]="color">
          <pds-button portalHeaderActions variant="outline" size="sm" iconStart="campaign">
            Novedades
          </pds-button>
          <pds-button portalHeaderActions variant="outline" size="sm" iconStart="help">
            Ayuda
          </pds-button>
        </pds-portal-header>
      </div>
    `,
  }),
};
