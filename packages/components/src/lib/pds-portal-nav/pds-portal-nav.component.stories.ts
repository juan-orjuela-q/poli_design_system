import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { PdsPortalNavComponent } from './pds-portal-nav.component';
import { PdsAvatarButtonComponent } from '../pds-avatar-button/pds-avatar-button.component';

const meta: Meta<PdsPortalNavComponent> = {
  title: 'DS v2/Portal Nav',
  component: PdsPortalNavComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [PdsAvatarButtonComponent] })],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Barra superior del ecosistema digital del Politécnico. Breadcrumb interactivo de tres ' +
          'niveles: Portal Institucional → Portal → Proceso/App. Va por encima de todo el layout, ' +
          'incluido el sidenav.\n\n' +
          '**Sobre los estados:** `hover`, `focus` y `pressed` se resuelven con CSS y no son props. ' +
          'El único que controla el consumidor es `current`, que marca la ubicación del usuario y ' +
          'se traduce a `aria-current="page"`.',
      },
    },
  },
  argTypes: {
    color: {
      control: 'select',
      options: ['blue', 'yellow', 'green', 'magenta'],
      description: 'Variante de branding del portal.',
    },
    current: {
      control: 'select',
      options: ['institutional', 'portal', 'app', 'none'],
      description: 'Nivel donde se encuentra el usuario. Recibe `aria-current="page"`.',
    },
  },
};

export default meta;
type Story = StoryObj<PdsPortalNavComponent>;

const portal = { label: 'PoliAccess', icon: 'hive', href: '#portal' };
const app = { label: 'Gestión de acceso' };

/** Barra completa: los tres niveles más el avatar proyectado en el slot de acciones. */
export const Default: Story = {
  args: { portal, app, color: 'blue', current: 'app' },
  render: (args) => ({
    props: args,
    template: `
      <pds-portal-nav
        [portal]="portal" [app]="app" [color]="color" [current]="current"
        institutionalHref="#inicio">
        <pds-avatar-button
          portalNavActions
          name="Andrea Zamora"
          role="Administrador"
          letter="A"
          [showBadge]="true" />
      </pds-portal-nav>
    `,
  }),
};

/** Los cuatro brandings de portal. El nivel app toma el acento del branding activo. */
export const Colores: Story = {
  render: () => ({
    template: (['blue', 'yellow', 'green', 'magenta'] as const)
      .map(
        (c) => `
        <pds-portal-nav
          [portal]="{ label: 'Portal ${c}', icon: 'hive', href: '#' }"
          [app]="{ label: 'App Title' }"
          color="${c}" current="app" institutionalHref="#">
          <pds-avatar-button portalNavActions name="Andrea Zamora" role="Administrador" letter="A" />
        </pds-portal-nav>`,
      )
      .join(''),
  }),
};

/** El nivel actual cambia qué elemento lleva `aria-current` y el indicador inferior. */
export const NivelActual: Story = {
  render: () => ({
    template: (['portal', 'app', 'none'] as const)
      .map(
        (c) => `
        <pds-portal-nav
          [portal]="{ label: 'PoliAccess', icon: 'hive', href: '#' }"
          [app]="{ label: 'Gestión de acceso' }"
          color="blue" current="${c}" institutionalHref="#">
          <pds-avatar-button portalNavActions name="Andrea Zamora" role="Administrador" letter="A" />
        </pds-portal-nav>`,
      )
      .join(''),
  }),
};

/** Sin nivel de app: útil en la portada de un portal, antes de entrar a un aplicativo. */
export const SoloPortal: Story = {
  args: { portal, app: null, color: 'green', current: 'portal' },
  render: (args) => ({
    props: args,
    template: `
      <pds-portal-nav [portal]="portal" [app]="app" [color]="color" [current]="current" institutionalHref="#">
        <pds-avatar-button portalNavActions name="Andrea Zamora" role="Administrador" letter="A" />
      </pds-portal-nav>
    `,
  }),
};

/** Sólo la marca: el estado más simple, para pantallas previas a elegir portal. */
export const SoloInstitucional: Story = {
  args: { portal: null, app: null, current: 'none' },
  render: (args) => ({
    props: args,
    template: `<pds-portal-nav [portal]="portal" [app]="app" [current]="current" institutionalHref="#" />`,
  }),
};

/** Etiquetas largas: los labels truncan con elipsis sin romper la altura de la barra. */
export const EtiquetasLargas: Story = {
  args: {
    portal: { label: 'Portal de Servicios Académicos y Administrativos', icon: 'hive', href: '#' },
    app: { label: 'Gestión de acceso y control de credenciales institucionales' },
    color: 'yellow',
    current: 'app',
  },
  render: (args) => ({
    props: args,
    template: `
      <pds-portal-nav [portal]="portal" [app]="app" [color]="color" [current]="current" institutionalHref="#">
        <pds-avatar-button portalNavActions name="Andrea Zamora" role="Administrador" letter="A" />
      </pds-portal-nav>
    `,
  }),
};

const menuItems = [
  { id: 'home', label: 'Inicio', icon: 'home' },
  {
    id: 'tramites',
    label: 'Trámites',
    icon: 'home',
    children: [
      { id: 'solicitudes', label: 'Solicitudes' },
      { id: 'certificados', label: 'Certificados' },
      { id: 'historial', label: 'Historial' },
    ],
  },
  { id: 'reportes', label: 'Reportes', icon: 'home' },
  { id: 'usuarios', label: 'Usuarios', icon: 'home' },
  { id: 'ajustes', label: 'Ajustes', icon: 'home' },
];

/**
 * Por debajo de 768px la barra se parte en dos filas y aparece el botón de menú.
 *
 * El menú recibe el mismo `SidenavItem[]` que consume `pds-sidenav`: el aplicativo
 * declara su navegación una sola vez. Los ítems con `children` se comportan como
 * acordeón; los demás emiten `itemClick` y cierran el menú.
 *
 * Abrir el menú con el botón **MENÚ**. Cierra con el botón, con `Escape` o al
 * elegir un ítem.
 */
export const Movil: Story = {
  args: {
    portal: { label: 'P. Colaborador', icon: 'hive', href: '#' },
    app: { label: 'Cuponera' },
    color: 'yellow',
    current: 'app',
    menuItems,
    activeItemId: 'home',
  },
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
    docs: { story: { inline: false, height: '700px' } },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width:100%;max-width:360px;outline:1px solid #ccc">
        <pds-portal-nav
          [portal]="portal" [app]="app" [color]="color" [current]="current"
          [menuItems]="menuItems" [activeItemId]="activeItemId" institutionalHref="#">
          <pds-avatar-button
            portalNavActions
            name="Andrea Zamora"
            role="Administrador"
            letter="A"
            [showName]="false"
            [showRole]="false" />
        </pds-portal-nav>
      </div>
    `,
  }),
};

/**
 * Sin `href` los niveles se renderizan como `<button>` y sólo emiten `levelSelected`.
 * Útil cuando la navegación la maneja el router del aplicativo.
 */
export const SinEnlaces: Story = {
  args: {
    portal: { label: 'PoliAccess', icon: 'hive' },
    app: { label: 'Gestión de acceso' },
    current: 'app',
  },
  render: (args) => ({
    props: args,
    template: `
      <pds-portal-nav [portal]="portal" [app]="app" [current]="current"
        (levelSelected)="levelSelected($event)">
        <pds-avatar-button portalNavActions name="Andrea Zamora" role="Administrador" letter="A" />
      </pds-portal-nav>
    `,
  }),
};
