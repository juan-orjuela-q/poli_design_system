import { Meta, StoryObj } from '@storybook/angular';
import { PdsCtaComponent } from './pds-cta.component';

const meta: Meta<PdsCtaComponent & { label: string }> = {
  title: 'DS v2/CTA',
  component: PdsCtaComponent,
  tags: ['autodocs'],
  argTypes: {
    device: {
      control: 'select',
      options: ['desktop', 'mobile'],
    },
    disabled: { control: 'boolean' },
    iconName: { control: 'text', description: 'Nombre del ícono (Material Symbols Rounded)' },
    type: {
      control: 'select',
      options: ['button', 'submit'],
    },
    label: { control: 'text', description: 'Texto visible del CTA' },
  },
  parameters: {
    docs: {
      description: {
        component: `
Componente de acción de alto valor visual del DS v2.

Más llamativo que \`pds-button\`: usa un gradiente de marca en lugar de fondo sólido.
Diseñado para destacar la acción principal de una pantalla o sección.

#### Comportamiento
- **Default**: gradiente cyan → azul navy
- **Hover**: gradiente magenta → magenta oscuro, ícono cambia a color magenta
- **Pressed**: gradiente magenta más intenso
- **Focus**: doble anillo de accesibilidad (\`box-shadow\`)
- **Disabled**: fondo gris neutro, mantiene el elemento en el tab order (\`aria-disabled\`)

#### Accesibilidad
- Usa \`<button>\` nativo.
- El ícono es siempre decorativo (\`aria-hidden="true"\`).
- El texto descriptivo del CTA es obligatorio para lectores de pantalla.
- Estado deshabilitado usa \`aria-disabled\` en lugar de \`disabled\` nativo (WCAG 2.1.1).
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<PdsCtaComponent & { label: string }>;

// ── Sandbox ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    device: 'desktop',
    disabled: false,
    iconName: 'arrow_forward',
    label: 'Inscríbete ahora',
  },
  render: (args) => ({
    props: args,
    template: `
      <pds-cta [device]="device" [disabled]="disabled" [iconName]="iconName">
        {{ label }}
      </pds-cta>
    `,
  }),
};

// ── Dispositivos ──────────────────────────────────────────────────────────────

export const Devices: Story = {
  name: 'Desktop vs Mobile',
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;align-items:flex-start">
        <div>
          <p style="font-size:12px;color:#627380;margin:0 0 8px">Desktop (default)</p>
          <pds-cta device="desktop">Conoce tu programa</pds-cta>
        </div>
        <div>
          <p style="font-size:12px;color:#627380;margin:0 0 8px">Mobile</p>
          <pds-cta device="mobile">Conoce tu programa</pds-cta>
        </div>
      </div>
    `,
  }),
};

// ── Estados ───────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  name: 'Estado deshabilitado',
  args: {
    device: 'desktop',
    disabled: true,
    iconName: 'arrow_forward',
    label: 'No disponible',
  },
  render: (args) => ({
    props: args,
    template: `
      <pds-cta [device]="device" [disabled]="disabled" [iconName]="iconName">
        {{ label }}
      </pds-cta>
    `,
  }),
};

// ── Iconos ────────────────────────────────────────────────────────────────────

export const CustomIcon: Story = {
  name: 'Con ícono personalizado',
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;align-items:flex-start">
        <pds-cta iconName="arrow_forward">Siguiente paso</pds-cta>
        <pds-cta iconName="school">Explorar programas</pds-cta>
        <pds-cta iconName="play_circle">Ver video</pds-cta>
        <pds-cta iconName="download">Descargar brochure</pds-cta>
      </div>
    `,
  }),
};

// ── Accesibilidad ─────────────────────────────────────────────────────────────

export const Accessibility: Story = {
  name: 'Accesibilidad',
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;align-items:flex-start">
        <pds-cta>Texto descriptivo de la acción</pds-cta>
        <pds-cta [disabled]="true">Inscripción cerrada</pds-cta>
      </div>
      <p style="font-size:12px;color:#627380;margin-top:16px">
        El texto del CTA debe describir la acción (no solo "Haz clic aquí").<br>
        El estado disabled usa aria-disabled — el elemento permanece en el tab order.
      </p>
    `,
  }),
};
