import type { Meta, StoryObj } from '@storybook/angular';
import { PdsSidenavHeaderComponent } from './pds-sidenav-header.component';

const meta: Meta<PdsSidenavHeaderComponent> = {
  title: 'DS v2/Sidenav Header',
  component: PdsSidenavHeaderComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Building block de `pds-sidenav`: ícono del portal, nombre del aplicativo y ' +
          'subtítulo. Rara vez se usa suelto — `pds-sidenav` ya lo monta.\n\n' +
          '**Sobre los estados:** `hover` y `focus` sólo existen cuando se define `homeLink`. ' +
          'Sin ruta la marca es texto, y un elemento que responde al puntero sin llevar a ' +
          'ninguna parte es una promesa falsa.\n\n' +
          '**Sobre el colapso:** `expanded = false` reduce el ancho del texto a cero con una ' +
          'transición, sin sacarlo del DOM, para que el colapso del sidenav se anime.',
      },
    },
  },
  argTypes: {
    color: {
      control: 'select',
      options: ['blue', 'yellow', 'green', 'magenta'],
      description: 'Variante de branding del portal.',
    },
    expanded: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<PdsSidenavHeaderComponent>;

const base = {
  title: 'App Title',
  subtitle: 'App Subtitle',
  iconName: 'hive',
  homeLink: '/home',
};

/** Marca navegable y expandida: el caso normal dentro del sidenav. */
export const Default: Story = {
  args: { ...base, expanded: true },
};

/** Colapsado: sólo el ícono. El texto sigue en el DOM, con ancho cero. */
export const Colapsado: Story = {
  args: { ...base, expanded: false },
};

/**
 * Los tres estados en las dos versiones. `hover` y `focus` no se pueden forzar
 * desde props —son pseudo-clases—, así que hay que pasar el puntero y tabular.
 */
export const Estados: Story = {
  render: () => ({
    template: `
      <div style="display:flex;gap:32px;align-items:flex-start;padding:16px">
        <div style="width:268px">
          <p style="font:600 12px Poppins;margin:0 0 8px">Expandido</p>
          <pds-sidenav-header title="App Title" subtitle="App Subtitle" homeLink="/home" />
        </div>
        <div>
          <p style="font:600 12px Poppins;margin:0 0 8px">Colapsado</p>
          <pds-sidenav-header
            title="App Title" subtitle="App Subtitle" homeLink="/home" [expanded]="false" />
        </div>
      </div>
    `,
  }),
};

/** Sin `homeLink`: texto inerte, sin hover ni foco. */
export const SinEnlace: Story = {
  args: { title: 'App Title', subtitle: 'App Subtitle', iconName: 'hive', expanded: true },
};

/** Los cuatro brandings del ecosistema. */
export const Colores: Story = {
  render: () => ({
    template: (['blue', 'yellow', 'green', 'magenta'] as const)
      .map(
        (c) => `
        <div style="width:268px;margin-bottom:8px">
          <pds-sidenav-header
            title="App Title" subtitle="App Subtitle" color="${c}" homeLink="/home" />
        </div>`,
      )
      .join(''),
  }),
};

/** Textos largos: truncan con elipsis sin empujar el ícono ni crecer de alto. */
export const TextosLargos: Story = {
  render: () => ({
    template: `
      <div style="width:268px">
        <pds-sidenav-header
          title="Gestión de acceso y credenciales"
          subtitle="Vicerrectoría de Tecnología e Innovación Digital"
          homeLink="/home" />
      </div>
    `,
  }),
};
