import { Meta, StoryObj } from '@storybook/angular';
import { PdsIconButtonComponent } from './pds-icon-button.component';

const meta: Meta<PdsIconButtonComponent> = {
  title: 'Poli Design System / 04. Actions / Icon Button',
  component: PdsIconButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'ghost-neutral', 'tertiary', 'destructive', 'destructive-outline'],
      description: 'Variante visual del botón',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tamaño del botón',
    },
    rounded: {
      control: 'select',
      options: ['pill', 'rectangle'],
      description: 'Forma del borde',
    },
    iconName: { control: 'text', description: 'Nombre del ícono (Material Symbols). Requerido.' },
    ariaLabel: { control: 'text', description: 'Etiqueta accesible. Requerida. También es el texto del tooltip.' },
    tooltipText: { control: 'text', description: 'Texto personalizado del tooltip. Si no se provee, usa ariaLabel.' },
    tooltipPosition: {
      control: 'select',
      options: ['top', 'top-end', 'bottom', 'left', 'right'],
      description: 'Posición del tooltip',
    },
    disabled: { control: 'boolean', description: 'Estado deshabilitado (usa aria-disabled)' },
    type: {
      control: 'select',
      options: ['button', 'submit'],
      description: 'Tipo HTML del botón',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
Botón de solo ícono del DS v2. Requiere siempre un \`ariaLabel\` obligatorio
que describe la acción al usuario — sin él, el botón no tiene nombre accesible.
Incluye \`pds-tooltip\` integrado que muestra el label al hacer hover o al enfocar.

### Cuándo usarlo
- Para acciones dentro de barras de herramientas, tablas o tarjetas donde el espacio es limitado.
- Como botón de cierre (×), edición (lápiz), eliminación (papelera), etc.
- Siempre que el contexto visual sea suficiente pero se necesite accesibilidad adicional vía tooltip.

### Cuándo NO usarlo
- No usar cuando el texto es necesario para la comprensión — usar \`pds-button\` con label.
- No omitir \`ariaLabel\` — es obligatorio tanto para AT como para el tooltip.

### API
\`\`\`html
<pds-icon-button
  iconName="close"
  ariaLabel="Cerrar diálogo"
  variant="ghost"
  size="md"
  tooltipPosition="bottom"
/>
\`\`\`

| Input            | Tipo                                                        | Default    | Descripción |
|------------------|-------------------------------------------------------------|------------|-------------|
| \`iconName\`     | \`string\` (requerido)                                      | —          | Nombre del ícono Material Symbols |
| \`ariaLabel\`    | \`string\` (requerido)                                      | —          | Nombre accesible del botón y texto del tooltip |
| \`variant\`      | \`'primary'\\|'secondary'\\|'outline'\\|'ghost'\\|'ghost-neutral'\\|'tertiary'\\|'destructive'\\|'destructive-outline'\` | \`'primary'\` | Variante visual |
| \`size\`         | \`'sm'\\|'md'\\|'lg'\`                                      | \`'md'\`   | sm=32px visual/48px touch · md=40px · lg=48px |
| \`rounded\`      | \`'pill'\\|'rectangle'\`                                    | \`'pill'\` | Forma del borde |
| \`disabled\`     | \`boolean\`                                                 | \`false\`  | Deshabilitado vía \`aria-disabled\` |
| \`tooltipText\`  | \`string \\| null\`                                         | \`null\`   | Texto personalizado del tooltip (fallback: ariaLabel) |
| \`tooltipPosition\` | \`'top'\\|'top-end'\\|'bottom'\\|'left'\\|'right'\`     | \`'top'\`  | Posición del tooltip |
| \`type\`         | \`'button'\\|'submit'\`                                     | \`'button'\` | Tipo HTML del botón |

---

### Accesibilidad — WCAG 2.2

#### Criterios aplicables
| Criterio | Nivel | Aplicación |
|----------|-------|------------|
| **1.1.1 Contenido no textual** | A | \`ariaLabel\` obligatorio provee el nombre accesible del ícono-botón |
| **1.4.3 Contraste mínimo** | AA | El ícono debe contrastar ≥ 4.5:1 sobre el fondo del botón |
| **1.4.11 Contraste no textual** | AA | El borde del botón (en variantes outline) ≥ 3:1 |
| **2.1.1 Teclado** | A | Activable con Tab y Enter/Space |
| **2.4.7 Foco visible** | AA | Anillo de foco doble (box-shadow) |
| **2.4.11 Foco no oscurecido** | AA | El tooltip no ocluye el indicador de foco |
| **2.5.8 Tamaño del objetivo** | AA | SM: 48×48px touch target vía \`::before\`; MD: 40×40px; LG: 48×48px |
| **4.1.2 Nombre, rol, valor** | A | \`<button>\` nativo + \`aria-label\` + \`aria-disabled\` |

#### Navegación por teclado
| Tecla | Acción |
|-------|--------|
| **Tab** | Mueve el foco al botón (muestra el tooltip) |
| **Enter / Space** | Activa el botón |
| **Shift + Tab** | Foco al botón anterior |

#### Atributos ARIA
| Atributo | Valor | Cuándo |
|----------|-------|--------|
| \`aria-label\` | valor de \`ariaLabel\` | Siempre — nombre accesible del botón |
| \`aria-disabled="true"\` | automático | Cuando \`disabled=true\` |
| \`aria-hidden="true"\` | en el ícono interno | El ícono es decorativo (el nombre lo da \`aria-label\`) |

#### Anuncio en lectores de pantalla
- Estado normal: *"Cerrar diálogo, botón"*
- Estado deshabilitado: *"Cerrar diálogo, botón, deshabilitado"*
- Al enfocar: el tooltip aparece visible para usuarios videntes; el \`aria-label\` es el equivalente para AT.

#### Auditoría v1 → v2
Este componente es nuevo en v2 y fue diseñado desde el inicio conforme a WCAG 2.2 AA.
El \`ariaLabel\` obligatorio resuelve el problema generalizado de botones de ícono sin nombre accesible identificado en la auditoría v1 (Cortés, feb 2026, §3.8 — *"4.1.2 Nombre, rol y estado"*).

### Buenas prácticas
✅ \`ariaLabel\` es obligatorio — describe la acción: *"Cerrar diálogo"*, no *"Cerrar"* o *"X"*.
✅ Usa el tooltip para reforzar la acción visualmente en contextos donde el ícono solo puede no ser suficiente.
✅ Usa \`size="sm"\` para toolbars y acciones en celdas de tabla — tiene touch target de 48px automático.
❌ No uses este componente para botones que necesitan texto visible — usa \`pds-button\`.
❌ No omitas \`ariaLabel\` aunque el ícono sea "obvio" — la descripción textual es obligatoria para WCAG 1.1.1.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<PdsIconButtonComponent>;

// ── Sandbox ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default — Sandbox',
  args: { iconName: 'close', ariaLabel: 'Cerrar', variant: 'ghost', size: 'md', rounded: 'pill', disabled: false, tooltipPosition: 'top' },
};

// ── Todas las variantes ───────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'Todas las variantes',
  render: () => ({
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">
        <pds-icon-button iconName="edit" ariaLabel="Editar" variant="primary" />
        <pds-icon-button iconName="edit" ariaLabel="Editar" variant="secondary" />
        <pds-icon-button iconName="edit" ariaLabel="Editar" variant="outline" />
        <pds-icon-button iconName="edit" ariaLabel="Editar" variant="ghost" />
        <pds-icon-button iconName="edit" ariaLabel="Editar" variant="ghost-neutral" />
        <pds-icon-button iconName="edit" ariaLabel="Editar" variant="tertiary" />
        <pds-icon-button iconName="delete" ariaLabel="Eliminar" variant="destructive" />
        <pds-icon-button iconName="delete" ariaLabel="Eliminar" variant="destructive-outline" />
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
        <pds-icon-button iconName="settings" ariaLabel="Configuración" variant="primary" size="sm" />
        <pds-icon-button iconName="settings" ariaLabel="Configuración" variant="primary" size="md" />
        <pds-icon-button iconName="settings" ariaLabel="Configuración" variant="primary" size="lg" />
      </div>
    `,
  }),
};

// ── Formas ────────────────────────────────────────────────────────────────────

export const Shapes: Story = {
  name: 'Pill vs Rectangle',
  render: () => ({
    template: `
      <div style="display:flex;gap:12px;align-items:center">
        <pds-icon-button iconName="settings" ariaLabel="Configuración" variant="outline" rounded="pill" />
        <pds-icon-button iconName="settings" ariaLabel="Configuración" variant="outline" rounded="rectangle" />
      </div>
    `,
  }),
};

// ── Posiciones del tooltip ────────────────────────────────────────────────────

export const TooltipPositions: Story = {
  name: 'Posiciones del tooltip',
  parameters: {
    layout: 'padded',
  },
  render: () => ({
    template: `
      <div style="display:flex;gap:32px;align-items:center;justify-content:center;padding:40px">
        <pds-icon-button iconName="home" ariaLabel="Inicio (top)" tooltipPosition="top" variant="outline" />
        <pds-icon-button iconName="home" ariaLabel="Inicio (bottom)" tooltipPosition="bottom" variant="outline" />
        <pds-icon-button iconName="home" ariaLabel="Inicio (left)" tooltipPosition="left" variant="outline" />
        <pds-icon-button iconName="home" ariaLabel="Inicio (right)" tooltipPosition="right" variant="outline" />
      </div>
    `,
  }),
};

// ── Estado deshabilitado ──────────────────────────────────────────────────────

export const DisabledState: Story = {
  name: 'Estado deshabilitado',
  render: () => ({
    template: `
      <div style="display:flex;gap:12px;align-items:center">
        <pds-icon-button iconName="edit" ariaLabel="Editar (deshabilitado)" variant="primary" [disabled]="true" />
        <pds-icon-button iconName="delete" ariaLabel="Eliminar (deshabilitado)" variant="destructive" [disabled]="true" />
        <pds-icon-button iconName="share" ariaLabel="Compartir (deshabilitado)" variant="outline" [disabled]="true" />
      </div>
    `,
  }),
};

// ── Accesibilidad ─────────────────────────────────────────────────────────────

export const A11yFocusVisible: Story = {
  name: 'A11y — Focus visible y tooltip (Tab para probar)',
  parameters: {
    docs: {
      description: {
        story: `
Usa **Tab** para navegar entre los botones. Al enfocar:
- El anillo de foco doble es visible.
- El tooltip aparece mostrando el \`ariaLabel\`.
- Los lectores de pantalla anuncian el \`ariaLabel\` seguido de *"botón"*.
        `,
      },
    },
  },
  render: () => ({
    template: `
      <div style="display:flex;gap:16px;align-items:center;padding:40px">
        <pds-icon-button iconName="save" ariaLabel="Guardar cambios" variant="primary" tooltipPosition="bottom" />
        <pds-icon-button iconName="edit" ariaLabel="Editar elemento" variant="outline" tooltipPosition="bottom" />
        <pds-icon-button iconName="delete" ariaLabel="Eliminar elemento" variant="destructive" tooltipPosition="bottom" />
        <pds-icon-button iconName="close" ariaLabel="Cerrar (deshabilitado)" variant="ghost" [disabled]="true" tooltipPosition="bottom" />
      </div>
    `,
  }),
};

export const A11yTouchTargetSM: Story = {
  name: 'A11y — Touch target SM (48×48px)',
  parameters: {
    docs: {
      description: {
        story: `
El botón SM tiene **32px de altura visual** pero su área táctil es de **48×48px**
gracias al pseudoelemento \`::before\`, cumpliendo **WCAG 2.5.8 Target Size (Minimum)**.
Ideal para toolbars y celdas de tabla donde el espacio es limitado.
        `,
      },
    },
  },
  render: () => ({
    template: `
      <div style="display:flex;gap:8px;align-items:center">
        <pds-icon-button iconName="edit" ariaLabel="Editar" variant="ghost-neutral" size="sm" tooltipPosition="bottom" />
        <pds-icon-button iconName="delete" ariaLabel="Eliminar" variant="ghost-neutral" size="sm" tooltipPosition="bottom" />
        <pds-icon-button iconName="more_vert" ariaLabel="Más opciones" variant="ghost-neutral" size="sm" tooltipPosition="bottom" />
      </div>
    `,
  }),
};
