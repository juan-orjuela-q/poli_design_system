import { Meta, StoryObj } from '@storybook/angular';
import { CtaButtonComponent } from './cta-button.component';

const meta: Meta<CtaButtonComponent> = {
  title: 'Componentes/CTA Button',
  component: CtaButtonComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Botón principal de llamada a la acción (CTA) que combina un texto breve y el icono “arrow_forward”.

#### Buenas prácticas

- Mostrar **un solo CTA principal** por pantalla.  
- Mantener el texto claro y breve (máx. 3 palabras).  
- Reservar el componente para acciones clave; usar botones secundarios para el resto.  
- Escuchar el evento \`accion\` para ejecutar la lógica asociada.
        `.trim(),
      },
    },
  },
};
export default meta;
type Story = StoryObj<CtaButtonComponent>;

/* ---------- Historias --------------------------------------------------- */

export const Primario: Story = {
  args: {
    texto: 'Comenzar',
  },
};

export const ConTextoLargo: Story = {
  args: {
    texto: 'Registrarse ahora',
  },
};
