import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { AutocompleteComponent } from './autocomplete.component';

const meta: Meta<AutocompleteComponent> = {
  title: 'Componentes/Autocomplete',
  component: AutocompleteComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [AutocompleteComponent], // al ser standalone basta importarlo
    }),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Campo de texto con sugerencias desplegables.  
Adaptado del **Angular Material Autocomplete** y alineado con el sistema
de diseño del Politécnico Grancolombiano.

**Buenas prácticas**
- Muestra máximo 10 resultados para evitar scroll excesivo.
- Utiliza textos descriptivos, no identificadores crípticos.
- Si el dataset es remoto, usa debounce y un indicador de carga.
        `,
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Etiqueta visible del campo' },
    placeholder: { control: 'text', description: 'Texto guía dentro del input' },
    options: {
      control: 'object',
      description: 'Array de valores que alimentan el autocompletado',
    },
    required: {
      control: 'boolean',
      description:
        'Muestra * (asterisco) indicando que el campo es obligatorio',
    },
    tooltip: {
      control: 'text',
      description:
        'Mensaje de ayuda que aparece en un ícono junto a la etiqueta',
    },
    optionSelected: { action: 'optionSelected', table: { disable: true } },
  },
  args: {
    /* valores por defecto para todas las historias */
    label: 'Ciudad',
    placeholder: 'Escribe para filtrar',
    options: ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena'],
    required: false,
    tooltip: '',
  },
};
export default meta;
type Story = StoryObj<AutocompleteComponent>;

export const Basico: Story = {};

export const ObligatorioConTooltip: Story = {
  name: 'Obligatorio + tooltip',
  args: {
    required: true,
    tooltip: 'Selecciona la ciudad donde resides',
  },
};

export const ValorInicialFiltrado: Story = {
  name: 'Con valor inicial',
  play: async ({ canvasElement }) => {
    const input = canvasElement.querySelector('input')!;
    input.value = 'Bo';
    input.dispatchEvent(new Event('input'));
  },
};
