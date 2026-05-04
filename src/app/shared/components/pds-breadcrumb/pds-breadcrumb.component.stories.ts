import { Meta, StoryObj } from '@storybook/angular';
import {
  PdsBreadcrumbComponent,
  BreadcrumbItem,
} from './pds-breadcrumb.component';

const meta: Meta<PdsBreadcrumbComponent> = {
  title: 'DS v2/Breadcrumb',
  component: PdsBreadcrumbComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**pds-breadcrumb** muestra la ruta de navegación dentro de una jerarquía.

- Usa \`<nav aria-label="Ruta de navegación">\` como contenedor semántico.
- La lista es \`<ol>\` — el orden de la ruta tiene significado semántico.
- El último ítem es la ubicación actual (\`aria-current="page"\`) y no es un enlace.
- Los separadores son \`aria-hidden="true"\`.
- Estados soportados: **default**, **hover**, **focus** (teclado) y **current** (ítem activo).

\`\`\`html
<pds-breadcrumb
  [items]="[
    { label: 'Inicio', href: '/' },
    { label: 'Cursos', href: '/cursos' },
    { label: 'Ingeniería de Sistemas' }
  ]"
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    items: {
      control: 'object',
      description:
        'Array de ítems. El último ítem es la página actual (sin href).',
    },
  },
};

export default meta;
type Story = StoryObj<PdsBreadcrumbComponent>;

// ── Default (2 niveles) ─────────────────────────────────────
export const Default: Story = {
  name: 'Default — 2 niveles',
  args: {
    items: [
      { label: 'Inicio', href: '/' },
      { label: 'Mi perfil' },
    ] satisfies BreadcrumbItem[],
  },
};

// ── 3 niveles ───────────────────────────────────────────────
export const TresNiveles: Story = {
  name: '3 niveles',
  args: {
    items: [
      { label: 'Inicio', href: '/' },
      { label: 'Cursos', href: '/cursos' },
      { label: 'Ingeniería de Sistemas' },
    ] satisfies BreadcrumbItem[],
  },
};

// ── 4 niveles ───────────────────────────────────────────────
export const CuatroNiveles: Story = {
  name: '4 niveles',
  args: {
    items: [
      { label: 'Inicio', href: '/' },
      { label: 'Facultad', href: '/facultad' },
      { label: 'Programas', href: '/facultad/programas' },
      { label: 'Ingeniería de Sistemas' },
    ] satisfies BreadcrumbItem[],
  },
};

// ── Solo ítem actual (un nivel) ─────────────────────────────
export const SoloItemActual: Story = {
  name: 'Solo ítem actual (1 nivel)',
  parameters: {
    docs: {
      description: {
        story:
          'Cuando solo hay un ítem, se muestra directamente como la ubicación actual sin enlace.',
      },
    },
  },
  args: {
    items: [{ label: 'Inicio' }] satisfies BreadcrumbItem[],
  },
};

// ── Sin hrefs ────────────────────────────────────────────────
export const SinHrefs: Story = {
  name: 'Sin hrefs (SPA con router)',
  parameters: {
    docs: {
      description: {
        story:
          'Para aplicaciones SPA con Angular Router, los ítems pueden no tener `href`. El consumidor maneja la navegación con `(click)` externo.',
      },
    },
  },
  render: () => ({
    template: `
      <pds-breadcrumb
        [items]="[
          { label: 'Inicio' },
          { label: 'Cursos' },
          { label: 'Ingeniería de Sistemas' }
        ]"
      />
    `,
  }),
};

// ── Todos los estados visuales ───────────────────────────────
export const TodosLosEstados: Story = {
  name: 'Todos los estados',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: `
Demostración de los cuatro estados del breadcrumb item:
- **Default**: enlace sin interacción
- **Hover**: fondo azul suave al pasar el cursor
- **Focus**: anillo de foco doble (teclado — prueba con Tab)
- **Current (Selected)**: texto en negrita, sin enlace, es la página actual
        `,
      },
    },
  },
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px; padding: 16px;">
        <!-- Estado base -->
        <div>
          <p style="font-size: 12px; color: #546e7a; margin-bottom: 8px; font-family: Poppins; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Default</p>
          <pds-breadcrumb [items]="[{ label: 'Inicio', href: '/' }, { label: 'Cursos', href: '/cursos' }, { label: 'Ingeniería de Sistemas' }]" />
        </div>

        <!-- Ruta larga -->
        <div>
          <p style="font-size: 12px; color: #546e7a; margin-bottom: 8px; font-family: Poppins; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Ruta larga (4 niveles)</p>
          <pds-breadcrumb [items]="[
            { label: 'Inicio', href: '/' },
            { label: 'Bienestar Universitario', href: '/bienestar' },
            { label: 'Beneficios', href: '/bienestar/beneficios' },
            { label: 'Solicitar beneficio' }
          ]" />
        </div>

        <!-- Surfaces: canvas/card -->
        <div style="background: var(--surface-neutral-default, #ffffff); padding: 16px; border-radius: 8px; border: 1px solid var(--border-neutral-subtle, #e0e7ef);">
          <p style="font-size: 12px; color: #546e7a; margin-bottom: 8px; font-family: Poppins; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Surface: Canvas / Card</p>
          <pds-breadcrumb [items]="[{ label: 'Inicio', href: '/' }, { label: 'Cursos', href: '/cursos' }, { label: 'Ingeniería' }]" />
        </div>

        <!-- Surface: subtle -->
        <div style="background: var(--surface-neutral-subtle, #f1f3f5); padding: 16px; border-radius: 8px;">
          <p style="font-size: 12px; color: #546e7a; margin-bottom: 8px; font-family: Poppins; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Surface: Subtle</p>
          <pds-breadcrumb [items]="[{ label: 'Inicio', href: '/' }, { label: 'Cursos', href: '/cursos' }, { label: 'Ingeniería' }]" />
        </div>

        <!-- Surface: sunken -->
        <div style="background: var(--surface-neutral-sunken, #e8ecf0); padding: 16px; border-radius: 8px;">
          <p style="font-size: 12px; color: #546e7a; margin-bottom: 8px; font-family: Poppins; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Surface: Sunken</p>
          <pds-breadcrumb [items]="[{ label: 'Inicio', href: '/' }, { label: 'Cursos', href: '/cursos' }, { label: 'Ingeniería' }]" />
        </div>

        <div style="margin-top: 8px; padding: 12px; background: var(--surface-status-info-subtle, #e3f2fd); border-radius: 8px; font-size: 13px; color: var(--fg-neutral-primary);">
          <strong>Tip de accesibilidad:</strong> Navega con <kbd>Tab</kbd> para ver el estado focus, y con <kbd>Enter</kbd> para activar los enlaces.
        </div>
      </div>
    `,
  }),
};

// ── Ejemplo en contexto real ────────────────────────────────
export const EnContexto: Story = {
  name: 'En contexto (página real)',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Ejemplo de cómo se vería el breadcrumb en una página real del portal Poli.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="max-width: 720px; background: var(--surface-neutral-default, #fff); border-radius: 12px; padding: 24px; border: 1px solid var(--border-neutral-subtle, #e0e7ef);">
        <pds-breadcrumb [items]="[
          { label: 'Inicio', href: '/' },
          { label: 'Bienestar', href: '/bienestar' },
          { label: 'Solicitar beneficio' }
        ]" />
        <h1 style="margin-top: 16px; font-family: Poppins; font-size: 1.5rem; font-weight: 700; color: var(--fg-brand-primary, #0f385a);">
          Solicitar beneficio universitario
        </h1>
        <p style="margin-top: 8px; font-family: Open Sans; font-size: 0.875rem; color: var(--fg-neutral-secondary, #546e7a);">
          Completa el formulario para solicitar tu beneficio. El proceso tarda aproximadamente 5 minutos.
        </p>
      </div>
    `,
  }),
};
