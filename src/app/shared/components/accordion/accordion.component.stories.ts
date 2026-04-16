// accordion.stories.ts
import type { Meta, StoryObj } from '@storybook/angular';
import { AccordionComponent } from './accordion.component';

/**
 * Storybook – Historias del componente `Accordion` (Angular, CSF v3)
 */
interface AccordionStoryArgs {
  /** Título mostrado en la cabecera */
  title: string;
  /** Contenido HTML o texto dentro del panel */
  content: string;
  /** Estado inicial abierto/cerrado */
  expanded: boolean;
  /** Deshabilita las interacciones */
  disabled: boolean;
  /** Identificador de grupo para modo exclusivo */
  group: string;
}

const meta: Meta<AccordionStoryArgs> = {
  title: 'Componentes/Accordion',
  component: AccordionComponent,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text', description: 'Título mostrado en la cabecera' },
    content: { control: 'text', description: 'Contenido HTML interno' },
    expanded: { control: 'boolean', description: 'Estado abierto/cerrado inicial' },
    disabled: { control: 'boolean', description: 'Deshabilita interacciones' },
    group: { control: 'text', description: 'Identificador de grupo para modo exclusivo' },
  },
  args: {
    title: 'Título del acordeón',
    content: 'Contenido del acordeón…',
    expanded: false,
    disabled: false,
    group: '',
  },
  render: (args) => ({
    props: args,
    template: `
      <app-accordion
        [title]="title"
        [expanded]="expanded"
        [disabled]="disabled"
        [group]="group">
        <p>{{ content }}</p>
      </app-accordion>
    `,
  }),
};
export default meta;

type Story = StoryObj<AccordionStoryArgs>;

/** Acordeón cerrado (por defecto) */
export const Default: Story = {};

/** Acordeón abierto al cargar */
export const Expanded: Story = {
  args: {
    expanded: true,
  },
};

/** Acordeón deshabilitado */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

/**
 * Demostración del modo exclusivo utilizando la propiedad `group`.
 * Los tres acordeones comparten el mismo grupo y solo uno puede estar abierto.
 */
export const ExclusiveGroup: Story = {
  render: () => ({
    template: `
      <app-accordion title="Item 1" group="demo">Contenido 1</app-accordion>
      <app-accordion title="Item 2" group="demo">Contenido 2</app-accordion>
      <app-accordion title="Item 3" group="demo">Contenido 3</app-accordion>
    `,
  }),
};
