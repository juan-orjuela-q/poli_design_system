import type { Meta, StoryObj } from '@storybook/angular';
import { RightModalComponent } from './right-modal.component';

const meta: Meta<RightModalComponent> = {
  title: 'Components/RightModal',
  component: RightModalComponent,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    visible: {
      control: 'boolean',
      description: 'Controla la visibilidad del modal'
    },
    title: {
      control: 'text',
      description: 'Título del modal'
    },
    text: {
      control: 'text',
      description: 'Texto del contenido del modal'
    },
    primaryButtonText: {
      control: 'text',
      description: 'Texto del botón primario'
    },
    secondaryButtonText: {
      control: 'text',
      description: 'Texto del botón secundario'
    },
    width: {
      control: 'text',
      description: 'Ancho del modal'
    },
    closeOnBackdrop: {
      control: 'boolean',
      description: 'Permite cerrar al hacer clic en el backdrop'
    }
  },
};

export default meta;
type Story = StoryObj<RightModalComponent>;

export const Default: Story = {
  args: {
    visible: true,
    title: 'Modal de ejemplo',
    text: 'Este es el contenido del modal deslizable desde la derecha.',
    primaryButtonText: 'Guardar',
    secondaryButtonText: 'Cancelar',
    width: '400px',
    closeOnBackdrop: true,
  },
};

export const Wide: Story = {
  args: {
    visible: true,
    title: 'Modal ancho',
    text: 'Este modal tiene un ancho mayor para mostrar más contenido.',
    primaryButtonText: 'Continuar',
    secondaryButtonText: 'Atrás',
    width: '600px',
    closeOnBackdrop: true,
  },
};

export const WithoutSecondaryButton: Story = {
  args: {
    visible: true,
    title: 'Solo botón primario',
    text: 'Este modal solo tiene un botón de acción.',
    primaryButtonText: 'Aceptar',
    width: '400px',
    closeOnBackdrop: true,
  },
};

export const WithoutButtons: Story = {
  args: {
    visible: true,
    title: 'Sin botones',
    text: 'Este modal no tiene botones de acción, solo el botón de cerrar.',
    width: '400px',
    closeOnBackdrop: true,
  },
};

export const NoBackdropClose: Story = {
  args: {
    visible: true,
    title: 'Sin cerrar con backdrop',
    text: 'Este modal no se puede cerrar haciendo clic en el backdrop.',
    primaryButtonText: 'Cerrar',
    width: '400px',
    closeOnBackdrop: false,
  },
};
