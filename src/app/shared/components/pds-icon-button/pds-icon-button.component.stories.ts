import { Meta, StoryObj } from '@storybook/angular';
import { PdsIconButtonComponent } from './pds-icon-button.component';

const meta: Meta<PdsIconButtonComponent> = {
  title: 'Poli Design System / 04. Actions / Icon Button',
  component: PdsIconButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'outline',
        'ghost',
        'ghost-neutral',
        'tertiary',
        'destructive',
        'destructive-outline',
      ],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    rounded: {
      control: 'select',
      options: ['pill', 'rectangle'],
    },
    tooltipPosition: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    disabled: { control: 'boolean' },
    iconName: { control: 'text' },
    ariaLabel: { control: 'text' },
    tooltipText: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component: `
Botón de ícono. Acción representada exclusivamente por un ícono.

#### Accesibilidad
- \`ariaLabel\` es **obligatorio** — es el nombre accesible del botón (lectores de pantalla).
- El tooltip es la revelación visual del label para usuarios de ratón.
- El ícono interno lleva \`aria-hidden="true"\`.
- SM (32px visual) → área táctil 48×48px con \`::before\` (WCAG 2.5.5).
- \`aria-disabled\` en lugar de \`disabled\` nativo — mantiene el elemento en el tab order.

#### Variantes exclusivas (no existen en pds-button)
- **tertiary** — fondo azul suave, variante de menor jerarquía.
- **ghost-neutral** — sin color de marca, sobre fondos neutros.
        `.trim(),
      },
    },
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<PdsIconButtonComponent>;

// ── Sandbox ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    rounded: 'pill',
    iconName: 'add',
    ariaLabel: 'Agregar elemento',
    disabled: false,
    tooltipPosition: 'top',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 48px;">
        <pds-icon-button
          [variant]="variant"
          [size]="size"
          [rounded]="rounded"
          [iconName]="iconName"
          [ariaLabel]="ariaLabel"
          [disabled]="disabled"
          [tooltipPosition]="tooltipPosition"
        />
      </div>
    `,
  }),
};

// ── Todas las variantes ───────────────────────────────────────────────────────

export const Variants: Story = {
  name: 'Todas las variantes',
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 16px; padding: 48px; align-items: center; background: #f5f7f9;">
        <pds-icon-button iconName="edit"   ariaLabel="Editar"             variant="primary"             tooltipPosition="bottom" />
        <pds-icon-button iconName="share"  ariaLabel="Compartir"          variant="secondary"           tooltipPosition="bottom" />
        <pds-icon-button iconName="search" ariaLabel="Buscar"             variant="outline"             tooltipPosition="bottom" />
        <pds-icon-button iconName="more_vert" ariaLabel="Más opciones"    variant="ghost"               tooltipPosition="bottom" />
        <pds-icon-button iconName="close"  ariaLabel="Cerrar"             variant="ghost-neutral"       tooltipPosition="bottom" />
        <pds-icon-button iconName="bookmark" ariaLabel="Guardar"          variant="tertiary"            tooltipPosition="bottom" />
        <pds-icon-button iconName="delete" ariaLabel="Eliminar"           variant="destructive"         tooltipPosition="bottom" />
        <pds-icon-button iconName="block"  ariaLabel="Rechazar solicitud" variant="destructive-outline" tooltipPosition="bottom" />
      </div>
    `,
  }),
};

// ── Tamaños ───────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  name: 'Tamaños (SM / MD / LG)',
  render: () => ({
    template: `
      <div style="display: flex; gap: 24px; padding: 64px; align-items: center;">
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <pds-icon-button iconName="add" ariaLabel="Agregar" size="sm" variant="primary" tooltipPosition="bottom" />
          <span style="font-size: 11px; color: #627380;">SM · 32px</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <pds-icon-button iconName="add" ariaLabel="Agregar" size="md" variant="primary" tooltipPosition="bottom" />
          <span style="font-size: 11px; color: #627380;">MD · 48px</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <pds-icon-button iconName="add" ariaLabel="Agregar" size="lg" variant="primary" tooltipPosition="bottom" />
          <span style="font-size: 11px; color: #627380;">LG · 56px</span>
        </div>
      </div>
    `,
  }),
};

// ── Forma ─────────────────────────────────────────────────────────────────────

export const Rounded: Story = {
  name: 'Forma (Pill / Rectangle)',
  render: () => ({
    template: `
      <div style="display: flex; gap: 24px; padding: 48px; align-items: center;">
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <pds-icon-button iconName="settings" ariaLabel="Configuración" rounded="pill" variant="tertiary" tooltipPosition="bottom" />
          <span style="font-size: 11px; color: #627380;">Pill</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <pds-icon-button iconName="settings" ariaLabel="Configuración" rounded="rectangle" variant="tertiary" tooltipPosition="bottom" />
          <span style="font-size: 11px; color: #627380;">Rectangle</span>
        </div>
      </div>
    `,
  }),
};

// ── Disabled ──────────────────────────────────────────────────────────────────

export const DisabledState: Story = {
  name: 'Estado deshabilitado',
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 16px; padding: 48px; align-items: center; background: #f5f7f9;">
        <pds-icon-button iconName="edit"   ariaLabel="Editar (no disponible)"  variant="primary"             [disabled]="true" tooltipPosition="bottom" />
        <pds-icon-button iconName="share"  ariaLabel="Compartir (no disponible)" variant="secondary"         [disabled]="true" tooltipPosition="bottom" />
        <pds-icon-button iconName="search" ariaLabel="Buscar (no disponible)"  variant="outline"             [disabled]="true" tooltipPosition="bottom" />
        <pds-icon-button iconName="more_vert" ariaLabel="Opciones (no disponible)" variant="ghost"           [disabled]="true" tooltipPosition="bottom" />
        <pds-icon-button iconName="close"  ariaLabel="Cerrar (no disponible)"  variant="ghost-neutral"       [disabled]="true" tooltipPosition="bottom" />
        <pds-icon-button iconName="bookmark" ariaLabel="Guardar (no disponible)" variant="tertiary"          [disabled]="true" tooltipPosition="bottom" />
        <pds-icon-button iconName="delete" ariaLabel="Eliminar (no disponible)" variant="destructive"        [disabled]="true" tooltipPosition="bottom" />
        <pds-icon-button iconName="block"  ariaLabel="Rechazar (no disponible)" variant="destructive-outline" [disabled]="true" tooltipPosition="bottom" />
      </div>
    `,
  }),
};

// ── Tooltip personalizado ─────────────────────────────────────────────────────

export const CustomTooltip: Story = {
  name: 'Tooltip personalizado',
  render: () => ({
    template: `
      <div style="display: flex; gap: 32px; padding: 64px; align-items: center;">
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <pds-icon-button
            iconName="download"
            ariaLabel="Descargar"
            tooltipText="Descargar PDF del certificado"
            variant="tertiary"
            tooltipPosition="top"
          />
          <span style="font-size: 11px; color: #627380;">Tooltip personalizado</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <pds-icon-button
            iconName="download"
            ariaLabel="Descargar"
            variant="tertiary"
            tooltipPosition="top"
          />
          <span style="font-size: 11px; color: #627380;">Tooltip = ariaLabel (default)</span>
        </div>
      </div>
    `,
  }),
};

// ── Posiciones del tooltip ────────────────────────────────────────────────────

export const TooltipPositions: Story = {
  name: 'Posiciones del tooltip',
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 64px; padding: 80px;">
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <pds-icon-button iconName="info" ariaLabel="Información" variant="ghost" tooltipPosition="top" />
          <span style="font-size: 11px; color: #627380;">top</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <pds-icon-button iconName="info" ariaLabel="Información" variant="ghost" tooltipPosition="bottom" />
          <span style="font-size: 11px; color: #627380;">bottom</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <pds-icon-button iconName="info" ariaLabel="Información" variant="ghost" tooltipPosition="left" />
          <span style="font-size: 11px; color: #627380;">left</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <pds-icon-button iconName="info" ariaLabel="Información" variant="ghost" tooltipPosition="right" />
          <span style="font-size: 11px; color: #627380;">right</span>
        </div>
      </div>
    `,
  }),
};

// ── Accesibilidad ─────────────────────────────────────────────────────────────

export const A11y: Story = {
  name: 'Accesibilidad — aria-label y touch target SM',
  render: () => ({
    template: `
      <div style="padding: 48px; display: flex; flex-direction: column; gap: 32px;">

        <div>
          <p style="font-size: 12px; color: #627380; margin: 0 0 8px">
            SM (32px visual, 48px touch target). Usa Tab para navegar.
          </p>
          <div style="display: flex; gap: 16px; align-items: center;">
            <pds-icon-button iconName="close"    ariaLabel="Cerrar modal"      size="sm" variant="ghost-neutral" tooltipPosition="bottom" />
            <pds-icon-button iconName="edit"     ariaLabel="Editar registro"   size="sm" variant="tertiary"      tooltipPosition="bottom" />
            <pds-icon-button iconName="filter_alt" ariaLabel="Filtrar tabla"   size="sm" variant="ghost"         tooltipPosition="bottom" />
          </div>
        </div>

        <div>
          <p style="font-size: 12px; color: #627380; margin: 0 0 8px">
            El tooltip aparece también con foco de teclado (:focus-within).
          </p>
          <div style="display: flex; gap: 16px; align-items: center;">
            <pds-icon-button iconName="save"     ariaLabel="Guardar cambios"   variant="primary"    tooltipPosition="top" />
            <pds-icon-button iconName="undo"     ariaLabel="Deshacer acción"   variant="secondary"  tooltipPosition="top" />
            <pds-icon-button iconName="redo"     ariaLabel="Rehacer acción"    variant="secondary"  tooltipPosition="top" />
          </div>
        </div>

      </div>
    `,
  }),
};
