// button.stories.ts
import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from '@storybook/test';
import { ButtonComponent } from './button.component';

// Define el tipo para las props de Storybook (sin EventEmitter)
interface ButtonStoryArgs {
  type: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive' | 'destructiveOutline' | 'success' | 'flat';
  size: 'small' | 'medium' | 'large';
  disabled: boolean;
  iconStart: string;
  iconEnd: string;
  onclick: (event: Event) => void; // Función para Storybook, no EventEmitter
}

const meta: Meta<ButtonStoryArgs> = {
  title: 'DS v1 (Legacy)/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Componente: app-button

Este componente se utiliza para renderizar botones consistentes con el sistema de diseño del Poli.
Permite definir tipo, tamaño, estado de deshabilitado, y añadir iconos al inicio o al final del botón.

**Uso recomendado:**
- Usa el tipo adecuado ('primary', 'secondary', 'outline', etc.) según las guías del diseño.
- Define el tamaño según el contexto ('small', 'medium', 'large').
- Los iconos son opcionales y deben ser nombres válidos de Material Symbols.
        `
      }
    }
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline', 'ghost', 'link', 'destructive', 'destructiveOutline', 'success', 'flat'],
      description: 'Define el estilo visual del botón'
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Define el tamaño del botón'
    },
    disabled: {
      control: 'boolean',
      description: 'Deshabilita el botón si es true'
    },
    iconStart: {
      control: 'text',
      description: 'Icono opcional que aparece al inicio del botón'
    },
    iconEnd: {
      control: 'text',
      description: 'Icono opcional que aparece al final del botón'
    },
    onclick: {
      action: 'clicked',
      description: 'Evento que se dispara al hacer click en el botón'
    }
  },
  // Valores por defecto
  args: {
    type: 'secondary',
    size: 'medium',
    disabled: false,
    iconStart: '',
    iconEnd: '',
    onclick: fn() // Mock function de Storybook
  }
};

export default meta;
type Story = StoryObj<ButtonStoryArgs>;

// Template base reutilizable
const createTemplate = (content: string = 'Botón') => ({
  render: (args: ButtonStoryArgs) => ({
    props: {
      ...args,
      handleClick: (event: Event) => {
        args.onclick(event);
        console.log(`Button clicked: ${args.type} - ${args.size}`);
      }
    },
    template: `
      <app-button
        [type]="type"
        [size]="size"
        [disabled]="disabled"
        [iconStart]="iconStart"
        [iconEnd]="iconEnd"
        (click)="handleClick($event)"
      >
        ${content}
      </app-button>
    `
  })
});

/**
 * Variante por defecto del botón
 */
export const Default: Story = {
  ...createTemplate('Botón'),
};

/**
 * Variante con icono al inicio
 */
export const WithStartIcon: Story = {
  ...createTemplate('Regresar'),
  args: {
    iconStart: 'arrow_back'
  }
};

/**
 * Variante deshabilitada
 */
export const Disabled: Story = {
  ...createTemplate('Deshabilitado'),
  args: {
    disabled: true
  }
};

/**
 * Variante con icono al final
 */
export const WithEndIcon: Story = {
  ...createTemplate('Continuar'),
  args: {
    iconEnd: 'arrow_forward'
  }
};

/**
 * Variante Primary
 */
export const Primary: Story = {
  ...createTemplate('Botón Primary'),
  args: {
    type: 'primary'
  }
};

/**
 * Variante Outline
 */
export const Outline: Story = {
  ...createTemplate('Botón Outline'),
  args: {
    type: 'outline'
  }
};

/**
 * Variante Destructive
 */
export const Destructive: Story = {
  ...createTemplate('Eliminar'),
  args: {
    type: 'destructive',
    iconStart: 'delete'
  }
};

/**
 * Variante Success
 */
export const Success: Story = {
  ...createTemplate('Guardar'),
  args: {
    type: 'success',
    iconEnd: 'check'
  }
};

/**
 * Todas las variantes de tipo
 */
export const AllTypes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; padding: 1rem;">
        <h3>Todos los tipos de botón</h3>

        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <app-button type="primary">Primary</app-button>
          <app-button type="secondary">Secondary</app-button>
          <app-button type="outline">Outline</app-button>
          <app-button type="ghost">Ghost</app-button>
          <app-button type="link">Link</app-button>
        </div>

        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <app-button type="destructive">Destructive</app-button>
          <app-button type="destructiveOutline">Destructive Outline</app-button>
          <app-button type="success">Success</app-button>
          <app-button type="flat">Flat</app-button>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Muestra todos los tipos de botón disponibles para comparar estilos.'
      }
    }
  }
};

/**
 * Todos los tamaños
 */
export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; padding: 1rem;">
        <h3>Todos los tamaños</h3>

        <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
          <app-button size="small" type="primary">Small</app-button>
          <app-button size="medium" type="primary">Medium</app-button>
          <app-button size="large" type="primary">Large</app-button>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Muestra todos los tamaños de botón disponibles.'
      }
    }
  }
};

/**
 * Con iconos
 */
export const WithIcons: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; padding: 1rem;">
        <h3>Botones con iconos</h3>

        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <app-button iconStart="add" type="primary">Agregar</app-button>
          <app-button iconStart="edit" type="secondary">Editar</app-button>
          <app-button iconStart="delete" type="destructive">Eliminar</app-button>
        </div>

        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <app-button iconEnd="arrow_forward" type="outline">Siguiente</app-button>
          <app-button iconEnd="download" type="ghost">Descargar</app-button>
          <app-button iconEnd="share" type="link">Compartir</app-button>
        </div>

        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <app-button iconStart="save" iconEnd="check" type="success">Guardar y Continuar</app-button>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Ejemplos de botones con iconos al inicio, al final, o ambos.'
      }
    }
  }
};

/**
 * Estados interactivos
 */
export const InteractiveStates: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; padding: 1rem;">
        <h3>Estados del botón</h3>

        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <app-button type="primary">Normal</app-button>
          <app-button type="primary" [disabled]="true">Deshabilitado</app-button>
        </div>

        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <app-button type="secondary">Normal</app-button>
          <app-button type="secondary" [disabled]="true">Deshabilitado</app-button>
        </div>

        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <app-button type="outline">Normal</app-button>
          <app-button type="outline" [disabled]="true">Deshabilitado</app-button>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Muestra los diferentes estados (normal, hover, disabled) de los botones.'
      }
    }
  }
};

// Ejemplo de historia con playground interactivo
export const Playground: Story = {
  ...createTemplate(),
  parameters: {
    docs: {
      description: {
        story: 'Playground interactivo para probar todas las combinaciones de props del botón.'
      }
    }
  }
};
