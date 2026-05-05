import { Meta, StoryObj } from '@storybook/angular';
import { PdsIconComponent } from './pds-icon.component';

const meta: Meta<PdsIconComponent> = {
  title: 'Poli Design System / 03. Base / Icon Component',
  component: PdsIconComponent,
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text' },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    mode: {
      control: 'select',
      options: [
        'neutral',
        'brand',
        'brand-ghost',
        'brand-secondary',
        'brand-subtle',
        'error',
        'success',
        'warning',
      ],
    },
    shape: {
      control: 'select',
      options: ['none', 'circle', 'rectangle'],
    },
    ariaHidden: { control: 'boolean' },
    ariaLabel: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component: `
Estandariza el uso de iconografía (**Material Symbols Rounded**) en el DS v2.
Define 5 tamaños normalizados vía tokens y 8 modos de color semánticos.

#### Dos casos de uso

**Inline** (\`shape="none"\`, default) — sin fondo ni padding. Hereda el color del padre
o toma el del \`mode\`. Uso típico: dentro de botones, badges, inputs.

**Standalone** (\`shape="circle"\` | \`"rectangle"\`) — contenedor con fondo semántico,
padding escalado al tamaño y forma configurable. \`brand-ghost\` es siempre transparente.

#### Accesibilidad
- \`ariaHidden="true"\` (default) — ícono decorativo.
- \`ariaHidden="false"\` + \`ariaLabel="..."\` — ícono informativo.
        `.trim(),
      },
    },
  },
};
export default meta;
type Story = StoryObj<PdsIconComponent>;

// ── Sandbox ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: { name: 'home', size: 'md', mode: 'neutral', shape: 'none' },
};

// ── Inline — tamaños ──────────────────────────────────────────────────────────

export const InlineXS: Story = {
  name: 'Inline XS — 16px',
  args: { name: 'home', size: 'xs', mode: 'brand', shape: 'none' },
};

export const InlineSM: Story = {
  name: 'Inline SM — 20px',
  args: { name: 'home', size: 'sm', mode: 'brand', shape: 'none' },
};

export const InlineMD: Story = {
  name: 'Inline MD — 24px (default)',
  args: { name: 'home', size: 'md', mode: 'brand', shape: 'none' },
};

export const InlineLG: Story = {
  name: 'Inline LG — 32px',
  args: { name: 'home', size: 'lg', mode: 'brand', shape: 'none' },
};

export const InlineXL: Story = {
  name: 'Inline XL — 40px',
  args: { name: 'home', size: 'xl', mode: 'brand', shape: 'none' },
};

// ── Standalone circle — modos ─────────────────────────────────────────────────

export const CircleBrand: Story = {
  name: 'Circle — Brand (fondo azul oscuro)',
  args: { name: 'school', size: 'lg', mode: 'brand', shape: 'circle' },
};

export const CircleBrandSubtle: Story = {
  name: 'Circle — Brand Subtle (fondo azul claro)',
  args: { name: 'school', size: 'lg', mode: 'brand-subtle', shape: 'circle' },
};

export const CircleBrandGhost: Story = {
  name: 'Circle — Brand Ghost (transparente)',
  args: { name: 'school', size: 'lg', mode: 'brand-ghost', shape: 'circle' },
};

export const CircleBrandSecondary: Story = {
  name: 'Circle — Brand Secondary (fondo cian)',
  args: { name: 'school', size: 'lg', mode: 'brand-secondary', shape: 'circle' },
};

export const CircleNeutral: Story = {
  name: 'Circle — Neutral',
  args: { name: 'person', size: 'lg', mode: 'neutral', shape: 'circle' },
};

export const CircleSuccess: Story = {
  name: 'Circle — Success',
  args: { name: 'check_circle', size: 'lg', mode: 'success', shape: 'circle' },
};

export const CircleWarning: Story = {
  name: 'Circle — Warning',
  args: { name: 'warning', size: 'lg', mode: 'warning', shape: 'circle' },
};

export const CircleError: Story = {
  name: 'Circle — Error',
  args: { name: 'error', size: 'lg', mode: 'error', shape: 'circle' },
};

// ── Standalone rectangle ──────────────────────────────────────────────────────

export const RectangleBrand: Story = {
  name: 'Rectangle — Brand',
  args: { name: 'school', size: 'lg', mode: 'brand', shape: 'rectangle' },
};

export const RectangleError: Story = {
  name: 'Rectangle — Error',
  args: { name: 'error', size: 'lg', mode: 'error', shape: 'rectangle' },
};

// ── Standalone — tamaños con circle ──────────────────────────────────────────

export const CircleTamanios: Story = {
  name: 'Circle — todos los tamaños',
  render: () => ({
    props: {},
    template: `
      <div style="display:flex; align-items:center; gap:16px;">
        <pds-icon name="school" size="xs" mode="brand" shape="circle" />
        <pds-icon name="school" size="sm" mode="brand" shape="circle" />
        <pds-icon name="school" size="md" mode="brand" shape="circle" />
        <pds-icon name="school" size="lg" mode="brand" shape="circle" />
        <pds-icon name="school" size="xl" mode="brand" shape="circle" />
      </div>
    `,
  }),
};

// ── Accesibilidad ─────────────────────────────────────────────────────────────

export const Informativo: Story = {
  name: 'Informativo (ariaHidden false)',
  args: {
    name: 'warning',
    size: 'md',
    mode: 'error',
    shape: 'circle',
    ariaHidden: false,
    ariaLabel: 'Error en el formulario',
  },
};
