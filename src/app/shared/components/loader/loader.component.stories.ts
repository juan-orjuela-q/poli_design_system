import type { Meta, StoryObj } from '@storybook/angular';
import { LoaderComponent } from './loader.component';

/**
 * El `LoaderComponent` proporciona un indicador visual consistente para operaciones de carga.
 * 
 * ## Características
 * - Spinner animado con colores del sistema de diseño
 * - Mensaje personalizable
 * - 3 tamaños: small, medium, large
 * - Modo minimal (solo spinner)
 * - Modo fullscreen con overlay
 */
const meta: Meta<LoaderComponent> = {
  title: 'DS v1 (Legacy)/Loader',
  component: LoaderComponent,
  tags: ['autodocs'],
  argTypes: {
    message: {
      control: 'text',
      description: 'Mensaje que se muestra debajo del spinner',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Cargando...' }
      }
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Tamaño del loader',
      table: {
        type: { summary: "'small' | 'medium' | 'large'" },
        defaultValue: { summary: 'medium' }
      }
    },
    fullScreen: {
      control: 'boolean',
      description: 'Si es true, el loader ocupa toda la pantalla con overlay',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    minimal: {
      control: 'boolean',
      description: 'Cuando es true, muestra solo el spinner sin mensaje',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    }
  },
  parameters: {
    docs: {
      description: {
        component: 'Componente de carga unificado que proporciona feedback visual durante operaciones asíncronas. Ideal para usar cuando una operación tome más de 1 segundo.'
      }
    }
  }
};

export default meta;
type Story = StoryObj<LoaderComponent>;

/**
 * Configuración por defecto del loader con tamaño medium y mensaje predeterminado.
 */
export const Default: Story = {
  args: {
    message: 'Cargando...',
    size: 'medium',
    fullScreen: false,
    minimal: false
  }
};

/**
 * Loader con mensaje personalizado para dar contexto específico al usuario.
 */
export const CustomMessage: Story = {
  args: {
    message: 'Cargando empleados...',
    size: 'medium',
    fullScreen: false,
    minimal: false
  }
};

/**
 * Tamaño pequeño ideal para loaders inline o en elementos pequeños.
 * - Spinner: 24px
 * - Border: 3px
 * - Font size: 14px
 */
export const Small: Story = {
  args: {
    message: 'Cargando...',
    size: 'small',
    fullScreen: false,
    minimal: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Usa este tamaño para elementos inline, tarjetas pequeñas o cuando el espacio es limitado.'
      }
    }
  }
};

/**
 * Tamaño medium (predeterminado) para secciones de página y tarjetas.
 * - Spinner: 40px
 * - Border: 4px
 * - Font size: 16px
 */
export const Medium: Story = {
  args: {
    message: 'Procesando datos...',
    size: 'medium',
    fullScreen: false,
    minimal: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Tamaño ideal para la mayoría de casos de uso, secciones de página o contenedores medianos.'
      }
    }
  }
};

/**
 * Tamaño grande para páginas completas o procesos importantes.
 * - Spinner: 56px
 * - Border: 5px
 * - Font size: 18px
 */
export const Large: Story = {
  args: {
    message: 'Cargando datos del servidor...',
    size: 'large',
    fullScreen: false,
    minimal: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Usa este tamaño para cargas de página completa, operaciones largas o cuando necesites mayor visibilidad.'
      }
    }
  }
};

/**
 * Modo minimal que muestra únicamente el spinner sin mensaje.
 * Útil cuando el contexto ya está claro o en espacios muy reducidos.
 */
export const Minimal: Story = {
  args: {
    size: 'medium',
    fullScreen: false,
    minimal: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Variante sin mensaje, ideal cuando el contexto de carga es evidente o el espacio es muy limitado.'
      }
    }
  }
};

/**
 * Modo minimal con tamaño pequeño para elementos muy compactos.
 */
export const MinimalSmall: Story = {
  args: {
    size: 'small',
    fullScreen: false,
    minimal: true
  }
};

/**
 * Loader en modo fullscreen con overlay semi-transparente.
 * Bloquea la interacción con la UI durante operaciones críticas.
 */
export const FullScreen: Story = {
  args: {
    message: 'Guardando cambios...',
    size: 'large',
    fullScreen: true,
    minimal: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Usa este modo solo para operaciones críticas que requieren bloquear toda la UI, como guardado de formularios importantes o procesamiento de datos críticos.'
      }
    }
  }
};

/**
 * Fullscreen con tamaño medium para operaciones menos críticas.
 */
export const FullScreenMedium: Story = {
  args: {
    message: 'Procesando...',
    size: 'medium',
    fullScreen: true,
    minimal: false
  }
};

/**
 * Ejemplo con mensaje largo para verificar el comportamiento del texto.
 */
export const LongMessage: Story = {
  args: {
    message: 'Estamos procesando tu solicitud. Este proceso puede tomar algunos segundos...',
    size: 'medium',
    fullScreen: false,
    minimal: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Los mensajes largos se ajustan automáticamente y mantienen el centrado.'
      }
    }
  }
};

/**
 * Loader cargando empleados (uso real).
 */
export const LoadingEmployees: Story = {
  args: {
    message: 'Cargando empleados...',
    size: 'large',
    fullScreen: false,
    minimal: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Ejemplo de uso en la página de empleados.'
      }
    }
  }
};

/**
 * Loader cargando beneficios (uso real).
 */
export const LoadingBenefits: Story = {
  args: {
    message: 'Cargando beneficios...',
    size: 'large',
    fullScreen: false,
    minimal: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Ejemplo de uso en la página de beneficios.'
      }
    }
  }
};

/**
 * Loader en diálogo (uso real).
 */
export const LoadingInDialog: Story = {
  args: {
    message: 'Cargando...',
    size: 'medium',
    fullScreen: false,
    minimal: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Ejemplo de uso dentro de un diálogo o modal.'
      }
    }
  }
};

/**
 * Guardando datos con fullscreen (uso real).
 */
export const SavingData: Story = {
  args: {
    message: 'Guardando cambios...',
    size: 'large',
    fullScreen: true,
    minimal: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Ejemplo de operación de guardado que bloquea la UI temporalmente.'
      }
    }
  }
};

/**
 * Todas las variantes de tamaño para comparación visual.
 */
export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 40px; align-items: flex-start; flex-wrap: wrap;">
        <div style="text-align: center;">
          <h4 style="margin-bottom: 20px;">Small</h4>
          <app-loader [size]="'small'" [message]="'Tamaño pequeño'"></app-loader>
        </div>
        <div style="text-align: center;">
          <h4 style="margin-bottom: 20px;">Medium</h4>
          <app-loader [size]="'medium'" [message]="'Tamaño mediano'"></app-loader>
        </div>
        <div style="text-align: center;">
          <h4 style="margin-bottom: 20px;">Large</h4>
          <app-loader [size]="'large'" [message]="'Tamaño grande'"></app-loader>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Comparación visual de los tres tamaños disponibles.'
      }
    }
  }
};

/**
 * Comparación entre modo normal y minimal.
 */
export const NormalVsMinimal: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 60px; align-items: flex-start;">
        <div style="text-align: center;">
          <h4 style="margin-bottom: 20px;">Con Mensaje</h4>
          <app-loader [size]="'medium'" [message]="'Cargando datos...'" [minimal]="false"></app-loader>
        </div>
        <div style="text-align: center;">
          <h4 style="margin-bottom: 20px;">Minimal (sin mensaje)</h4>
          <app-loader [size]="'medium'" [minimal]="true"></app-loader>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Comparación entre el loader con mensaje y el modo minimal.'
      }
    }
  }
};
