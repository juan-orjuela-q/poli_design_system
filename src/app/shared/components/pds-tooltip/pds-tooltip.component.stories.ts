import { Meta, StoryObj } from '@storybook/angular';
import { PdsTooltipComponent } from './pds-tooltip.component';

const meta: Meta<PdsTooltipComponent> = {
  title: 'Poli Design System / 06. Feedback & Overlays / Tooltip',
  component: PdsTooltipComponent,
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    disabled: { control: 'boolean' },
  },
  parameters: {
    docs: {
      description: {
        component: `
Muestra información breve y contextual al hacer hover o foco sobre un activador.

#### Uso
Envuelve el elemento activador con \`<pds-tooltip>\`:
\`\`\`html
<pds-tooltip text="Más información" position="top">
  <button [attr.aria-describedby]="myTooltip.tooltipId" #myTooltip="pdsTooltip">
    Ayuda
  </button>
</pds-tooltip>
\`\`\`

#### Accesibilidad
- El bubble tiene \`role="tooltip"\` y un ID único (\`tooltipId\`).
- El activador debe referenciar ese ID con \`aria-describedby\` para que los lectores de pantalla anuncien el texto.
- Se activa con hover **y** con foco del teclado (\`:focus-within\`).
- No poner información crítica solo en el tooltip — debe ser complementaria.
        `.trim(),
      },
    },
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<PdsTooltipComponent>;

// ── Sandbox ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    text: 'Información adicional',
    position: 'top',
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 48px;">
        <pds-tooltip [text]="text" [position]="position" [disabled]="disabled">
          <button style="padding: 8px 16px; border-radius: 8px; border: 1px solid #627380; cursor: pointer; background: #fff;">
            Hover o foco aquí
          </button>
        </pds-tooltip>
      </div>
    `,
  }),
};

// ── Posiciones ────────────────────────────────────────────────────────────────

export const AllPositions: Story = {
  name: 'Todas las posiciones',
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 64px; padding: 80px;">

        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <span style="font-size: 12px; color: #627380;">Top</span>
          <pds-tooltip text="Tooltip arriba" position="top">
            <button style="padding: 8px 16px; border-radius: 8px; border: 1px solid #627380; cursor: pointer;">Activador</button>
          </pds-tooltip>
        </div>

        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <span style="font-size: 12px; color: #627380;">Bottom</span>
          <pds-tooltip text="Tooltip abajo" position="bottom">
            <button style="padding: 8px 16px; border-radius: 8px; border: 1px solid #627380; cursor: pointer;">Activador</button>
          </pds-tooltip>
        </div>

        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <span style="font-size: 12px; color: #627380;">Left</span>
          <pds-tooltip text="Tooltip izquierda" position="left">
            <button style="padding: 8px 16px; border-radius: 8px; border: 1px solid #627380; cursor: pointer;">Activador</button>
          </pds-tooltip>
        </div>

        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <span style="font-size: 12px; color: #627380;">Right</span>
          <pds-tooltip text="Tooltip derecha" position="right">
            <button style="padding: 8px 16px; border-radius: 8px; border: 1px solid #627380; cursor: pointer;">Activador</button>
          </pds-tooltip>
        </div>

      </div>
    `,
  }),
};

// ── Con ícono como activador ──────────────────────────────────────────────────

export const WithIconTrigger: Story = {
  name: 'Con ícono como activador',
  render: () => ({
    template: `
      <div style="display: flex; gap: 32px; padding: 64px; align-items: center;">
        <pds-tooltip text="Ver detalles del curso" position="top">
          <button style="background: none; border: none; cursor: pointer; display: flex; align-items: center; color: #0f385a;">
            <span class="material-symbols-rounded">info</span>
          </button>
        </pds-tooltip>

        <pds-tooltip text="Eliminar elemento" position="bottom">
          <button style="background: none; border: none; cursor: pointer; display: flex; align-items: center; color: #e0006e;">
            <span class="material-symbols-rounded">delete</span>
          </button>
        </pds-tooltip>

        <pds-tooltip text="Descargar certificado" position="right">
          <button style="background: none; border: none; cursor: pointer; display: flex; align-items: center; color: #0f385a;">
            <span class="material-symbols-rounded">download</span>
          </button>
        </pds-tooltip>
      </div>
    `,
  }),
};

// ── Disabled ──────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  name: 'Deshabilitado',
  render: () => ({
    template: `
      <div style="display: flex; gap: 32px; padding: 64px; align-items: center;">
        <div>
          <p style="font-size: 12px; color: #627380; margin: 0 0 8px">Activo</p>
          <pds-tooltip text="Este tooltip sí aparece" position="top">
            <button style="padding: 8px 16px; border-radius: 8px; border: 1px solid #627380; cursor: pointer;">Hover aquí</button>
          </pds-tooltip>
        </div>
        <div>
          <p style="font-size: 12px; color: #627380; margin: 0 0 8px">Disabled</p>
          <pds-tooltip text="Este tooltip no aparece" position="top" [disabled]="true">
            <button style="padding: 8px 16px; border-radius: 8px; border: 1px solid #627380; cursor: pointer;">Sin tooltip</button>
          </pds-tooltip>
        </div>
      </div>
    `,
  }),
};

// ── Texto largo ───────────────────────────────────────────────────────────────

export const LongText: Story = {
  name: 'Texto largo (max-width: 240px)',
  render: () => ({
    template: `
      <div style="padding: 80px;">
        <pds-tooltip text="Este es un tooltip con un texto más largo que demuestra el comportamiento de word-wrap y el max-width de 240px." position="bottom">
          <button style="padding: 8px 16px; border-radius: 8px; border: 1px solid #627380; cursor: pointer;">Hover para ver texto largo</button>
        </pds-tooltip>
      </div>
    `,
  }),
};
