import { Meta, StoryObj, applicationConfig } from '@storybook/angular';
import { provideRouter } from '@angular/router';          // 👈
import { HeaderNavItemComponent } from './header-nav-item.component';

const meta: Meta<HeaderNavItemComponent> = {
  title: 'DS v1 (Legacy)/Header Nav Item',
  component: HeaderNavItemComponent,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [
        provideRouter([]),       // 👈 sin rutas reales; basta para inyectar Router/ActivatedRoute
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
Elemento de navegación que vive dentro del \`Header\`.  
Incluye un icono, un texto y un enlace a la ruta indicada.

#### Buenas prácticas

- Emplear iconos claros y significativos.  
- Mantener textos breves (1–2 palabras).  
- Resaltar el ítem activo con estilos adecuados.  
- Evitar sobrecargar el header con demasiados elementos.
        `.trim(),
      },
    },
  },
};
export default meta;
type Story = StoryObj<HeaderNavItemComponent>;

/* ---------------------------- Historias ----------------------------- */

/** Ítem “Inicio” con icono home */
export const Home: Story = {
  args: {
    icon: 'home',
    texto: 'Inicio',
    ruta: '/',
  },
};

/** Ítem “Dashboard” con icono apps */
export const Dashboard: Story = {
  args: {
    icon: 'apps',
    texto: 'Dashboard',
    ruta: '/dashboard',
  },
};

/** Ítem “Salir” con icono logout */
export const Logout: Story = {
  args: {
    icon: 'logout',
    texto: 'Salir',
    ruta: '/logout',
  },
};
