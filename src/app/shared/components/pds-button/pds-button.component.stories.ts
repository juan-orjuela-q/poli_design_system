import { Meta, StoryObj } from '@storybook/angular';
import { PdsButtonComponent } from './pds-button.component';

const meta: Meta<PdsButtonComponent & { label: string }> = {
  title: 'Poli Design System / 04. Actions / Button',
  component: PdsButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'outline',
        'ghost',
        'destructive',
        'destructive-outline',
      ],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    label: { control: 'text', description: 'Texto visible del botón' },
    iconStart: { control: 'text' },
    iconEnd: { control: 'text' },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
Componente de acción principal del DS v2. Disponible en 8 variantes, 3 tamaños y 2 formas de borde.

#### Variantes
- **primary** — Acción principal. Fondo azul sólido.
- **secondary** — Acción secundaria. Fondo azul secundario.
- **outline** — Sin fondo, con borde.
- **ghost** — Sin fondo ni borde visible.
- **destructive** — Acción destructiva. Fondo error sólido.
- **destructive-outline** — Acción destructiva sin fondo.

#### Accesibilidad
- Usa \`<button>\` nativo — nunca \`<div>\` ni \`<span>\`.
- Focus visible con doble anillo (\`box-shadow\`).
- Los íconos son siempre decorativos (\`aria-hidden\`).
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<PdsButtonComponent & { label: string }>;

// ── Sandbox ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: { variant: 'primary', size: 'md', disabled: false, label: 'Guardar', iconStart: '', iconEnd: '' },
  render: (args) => ({
    props: args,
    template: `<pds-button [variant]="variant" [size]="size" [disabled]="disabled" [iconStart]="iconStart || null" [iconEnd]="iconEnd || null">{{ label }}</pds-button>`,
  }),
};

// ── Variantes ─────────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'Todas las variantes',
  render: () => ({
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">
        <pds-button variant="primary">Primary</pds-button>
        <pds-button variant="secondary">Secondary</pds-button>
        <pds-button variant="outline">Outline</pds-button>
        <pds-button variant="ghost">Ghost</pds-button>
        <pds-button variant="destructive">Destructive</pds-button>
        <pds-button variant="destructive-outline">Destructive Outline</pds-button>
      </div>
    `,
  }),
};

// ── Tamaños ───────────────────────────────────────────────────────────────────

export const AllSizes: Story = {
  name: 'Todos los tamaños',
  render: () => ({
    template: `
      <div style="display:flex;gap:12px;align-items:center">
        <pds-button variant="primary" size="sm">Small</pds-button>
        <pds-button variant="primary" size="md">Medium</pds-button>
        <pds-button variant="primary" size="lg">Large</pds-button>
      </div>
    `,
  }),
};

// ── Formas ────────────────────────────────────────────────────────────────────
// Eliminado: DS v2 solo usa forma pill en Button

// ── Con íconos ────────────────────────────────────────────────────────────────

export const WithIconStart: Story = {
  name: 'Con ícono al inicio',
  render: () => ({
    template: `
      <div style="display:flex;gap:12px;align-items:center">
        <pds-button variant="primary" iconStart="save">Guardar</pds-button>
        <pds-button variant="outline" iconStart="edit">Editar</pds-button>
        <pds-button variant="destructive" iconStart="delete">Eliminar</pds-button>
      </div>
    `,
  }),
};

export const WithIconEnd: Story = {
  name: 'Con ícono al final',
  render: () => ({
    template: `
      <div style="display:flex;gap:12px;align-items:center">
        <pds-button variant="primary" iconEnd="arrow_forward">Continuar</pds-button>
        <pds-button variant="ghost" iconEnd="open_in_new">Abrir</pds-button>
      </div>
    `,
  }),
};

// ── Estado deshabilitado ──────────────────────────────────────────────────────

export const DisabledState: Story = {
  name: 'Estado deshabilitado',
  render: () => ({
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">
        <pds-button variant="primary" [disabled]="true">Primary</pds-button>
        <pds-button variant="secondary" [disabled]="true">Secondary</pds-button>
        <pds-button variant="outline" [disabled]="true">Outline</pds-button>
        <pds-button variant="ghost" [disabled]="true">Ghost</pds-button>
        <pds-button variant="destructive" [disabled]="true">Destructive</pds-button>
        <pds-button variant="destructive-outline" [disabled]="true">Destructive Outline</pds-button>
      </div>
    `,
  }),
};

// ── Accesibilidad ─────────────────────────────────────────────────────────────

export const AccessibilityFocus: Story = {
  name: 'A11y — Focus visible (Tab para probar)',
  render: () => ({
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">
        <pds-button variant="primary">Primary (Tab aquí)</pds-button>
        <pds-button variant="secondary">Secondary</pds-button>
        <pds-button variant="outline">Outline</pds-button>
        <pds-button variant="destructive">Destructive</pds-button>
      </div>
    `,
  }),
};

export const SmTouchTarget: Story = {
  name: 'A11y — Área táctil SM (48×48px)',
  render: () => ({
    template: `
      <div style="display:flex;gap:16px;align-items:center">
        <pds-button variant="primary" size="sm">SM (32px visual, 48px táctil)</pds-button>
        <pds-button variant="outline" size="sm">Outline SM</pds-button>
      </div>
    `,
  }),
};
