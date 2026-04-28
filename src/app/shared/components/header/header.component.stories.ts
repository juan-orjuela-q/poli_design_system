import { Meta, StoryObj } from '@storybook/angular';
import { HeaderComponent } from './header.component';


const meta: Meta<HeaderComponent> = {
  title: 'DS v1 (Legacy)/Header',
  component: HeaderComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Encabezado principal que muestra el logo a la izquierda y proyecta contenido
a la derecha (por ejemplo, \`Header Nav Item\`, \`Avatar\`).

#### Buenas prácticas

- El contenido dentro de \`<app-header-nav>\` se renderiza en la zona derecha.  
- Importa en tu módulo los componentes que uses dentro del header.   
        `.trim(),
      },
    },
  },
};
export default meta;
type Story = StoryObj<HeaderComponent>;

/* ---------------- Historias con contenido proyectado ------------------- */

/** Header con 2 ítems de navegación y un avatar */
export const ConNavegacionYAvatar: Story = {
  render: () => ({
    template: `
      <app-header-nav>
        <app-header-nav-item icon="home" texto="Inicio" ruta="/"></app-header-nav-item>
        <app-header-nav-item icon="apps" texto="Dashboard" ruta="/dashboard"></app-header-nav-item>
        <app-avatar type="image" size="small" src="assets/images/avatar.png"></app-avatar>
      </app-header-nav>
    `,
  }),
};

/** Header solo con un botón de cerrar sesión */
export const ConBotonLogout: Story = {
  render: () => ({
    template: `
      <app-header-nav>
        <app-header-nav-item icon="logout" texto="Salir" ruta="/logout"></app-header-nav-item>
      </app-header-nav>
    `,
  }),
};

/** Header vacío (solo logo) */
export const SoloLogo: Story = {
  render: () => ({
    template: `<app-header-nav></app-header-nav>`,
  }),
};