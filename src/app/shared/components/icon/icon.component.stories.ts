import { Meta, StoryObj } from '@storybook/angular';
import { IconComponent } from './icon.component';

const meta: Meta<IconComponent> = {
  title: 'Componentes/Icon',
  component: IconComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Componente para mostrar iconos de **Material Symbols Rounded**.

#### Buenas prácticas

- Usar nombres válidos de Material Symbols Rounded.  
- Añadir \`aria-label\` o texto visible si el icono transmite información.  
- Controlar tamaño y color con clases o tokens de diseño, no inline.  
        `.trim(),
      },
    },
  },
};
export default meta;
type Story = StoryObj<IconComponent>;

/* --------------------------- Historias -------------------------------- */

/** Icono “home” por defecto */
export const Home: Story = {
  args: { icon: 'home' },
};

/** Icono “search” */
export const Search: Story = {
  args: { icon: 'search' },
};

/** Icono “check_circle” */
export const Success: Story = {
  args: { icon: 'check_circle' },
};