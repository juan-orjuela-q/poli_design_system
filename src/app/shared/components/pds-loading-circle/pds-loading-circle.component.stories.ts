import { Meta, StoryObj } from '@storybook/angular';
import { PdsLoadingCircleComponent } from './pds-loading-circle.component';

const meta: Meta<PdsLoadingCircleComponent> = {
  title: 'Poli Design System / 06. Feedback & Overlays / Loading Indicator',
  component: PdsLoadingCircleComponent,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    ariaLabel: { control: 'text' },
    label: { control: 'text' },
  },
  args: {
    size: 'md',
    ariaLabel: 'Cargando',
    label: '',
  },
  parameters: {
    docs: {
      description: {
        component: `
Comunica que el sistema está procesando cuando el progreso no puede medirse.

#### Props
- **size** — \`'sm' | 'md' | 'lg'\` (default \`'md'\`)
- **label** — texto visible junto al spinner (opcional)
- **ariaLabel** — texto para lectores de pantalla (default \`'Cargando'\`)

#### Accesibilidad
- \`role="status"\` + \`aria-live="polite"\` anuncia el estado.
- \`aria-label\` describe el proceso en curso.
- La \`label\` visual tiene \`aria-hidden\` para evitar duplicado con \`ariaLabel\`.
- Respeta \`prefers-reduced-motion\` (animación más lenta).
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<PdsLoadingCircleComponent>;

export const Default: Story = {
  name: 'Sin etiqueta',
  args: { size: 'md', ariaLabel: 'Cargando', label: '' },
};

export const WithLabel: Story = {
  name: 'Con etiqueta visible',
  args: { size: 'md', ariaLabel: 'Cargando', label: 'Cargando...' },
};

export const AllSizes: Story = {
  name: 'Todos los tamaños (con etiqueta)',
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:16px">
        <pds-loading-circle size="sm" ariaLabel="Cargando" label="Cargando (SM)"></pds-loading-circle>
        <pds-loading-circle size="md" ariaLabel="Cargando" label="Cargando (MD)"></pds-loading-circle>
        <pds-loading-circle size="lg" ariaLabel="Cargando" label="Cargando (LG)"></pds-loading-circle>
      </div>
    `,
  }),
};

export const AllSizesNoLabel: Story = {
  name: 'Todos los tamaños (sin etiqueta)',
  render: () => ({
    template: `
      <div style="display:flex;gap:16px;align-items:center">
        <pds-loading-circle size="sm" ariaLabel="Cargando"></pds-loading-circle>
        <pds-loading-circle size="md" ariaLabel="Cargando"></pds-loading-circle>
        <pds-loading-circle size="lg" ariaLabel="Cargando"></pds-loading-circle>
      </div>
    `,
  }),
};

export const CustomLabel: Story = {
  name: 'Etiqueta personalizada',
  args: { size: 'md', ariaLabel: 'Guardando documento', label: 'Guardando documento...' },
};
