import type { Meta, StoryObj } from '@storybook/angular';

import { MobileNavComponent, NavLink } from './mobile-nav.component';
import { RouteDefinition } from '@layout/interfaces/route-definition.interface';
//import { BrowserRouter } from '@angular/router';

const logo = 'assets/logo-dark.svg';
const logoLight = 'assets/logo-light.svg';

const headerItems: RouteDefinition[] = [
  { route: '/login', icon: 'person', label: 'Ingresar' },
];

const menuItems: any[] = [
  { ruta: '/acciones', icon: 'build', texto: 'Acciones' },
  { ruta: '/roles', icon: 'supervisor_account', texto: 'Roles' },
  { ruta: '/dashboard', icon: 'dashboard', texto: 'Dashboard' },
  { ruta: '/grupos', icon: 'groups', texto: 'Grupos' },
  { ruta: '/reportes', icon: 'bar_chart', texto: 'Reportes' },
];

const footerLinks: NavLink[] = [
  { ruta: '/legal/privacidad', texto: 'Política de privacidad' },
  { ruta: '/legal/terminos', texto: 'Términos y condiciones' },
];

const meta: Meta<MobileNavComponent> = {
  title: 'DS v1 (Legacy)/MobileNav',
  component: MobileNavComponent,
  tags: ['autodocs'],
  decorators: [
    /*moduleMetadata({
      providers: [BrowserRouter],
    }),*/
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Navegación móvil unificada para header y sidenav. Incluye overlay, panel deslizante y slots configurables.',
      },
    },
  },
  argTypes: {
    isOpen: { control: false }, // el estado se maneja interno
  },
};
export default meta;

type Story = StoryObj<MobileNavComponent>;

export const Closed: Story = {
  args: {
    logoSrc: logo,
    logoLightSrc: logoLight,
    headerItems,
    menuItems,
    footerLinks,
    appTitle: 'Rol de usuario',
    appSubtitle: 'App Seguridad',
  },
};

export const Opened: Story = {
  ...Closed,
  play: async ({ canvasElement }) => {
    // simula click para abrir
    const button = canvasElement.querySelector('button.burger') as HTMLElement;
    button?.click();
  },
};
