import { Meta, StoryObj } from '@storybook/angular';
import { BadgeComponent } from './badge.component';

const meta: Meta<BadgeComponent> = {
  title: 'Componentes/Badge',
  component: BadgeComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Elemento pequeño y llamativo que muestra cantidades, estados o etiquetas asociadas a un elemento, útil para destacar notificaciones o información relevante. Tiene variantes de tamaño, tipo y diseño (pill, rectangle o dot).

#### Buenas prácticas

- Utilizar \`status\` para reflejar el estado semántico mediante color.  
- Emplear \`type="dot"\` para indicar presencia o estado sin texto.  
- Usar \`type="pill"\` o \`type="rectangle"\` para textos o contadores.  
- Mantener el \`size\` coherente con el componente asociado.  
- Con \`type="dot"\` y \`size="xl"\` se puede incluir un número (usando \`text\` ) o un icono (usando \`iconStart\`), pero no deben usarse ambos al tiempo. 
        `.trim(),
      },
    },
  },
};
export default meta;
type Story = StoryObj<BadgeComponent>;

export const PillDarkMedium: Story = {
  args: {
    type: 'pill',
    size: 'medium',
    status: 'dark',
    iconStart: 'person_check',
    iconEnd: '',
    text: 'Activo',    
  },
  
};

export const DotSuccessSmall: Story = {
  args: {
    type: 'dot',
    size: 'small',
    status: 'success',
    text: '9',
  },
};

export const RectangleInfoLarge: Story = {
  args: {
    type: 'rectangle',
    size: 'large',
    status: 'info',
    iconStart: 'published_with_changes',
    text: 'Actualizaciones disponibles',
    
  }
};

export const PillDangerWithIcons: Story = {
  args: {
    type: 'pill',
    size: 'medium',
    status: 'danger',
    iconEnd: 'warning',
    text: 'Error crítico',
    
  }
};
