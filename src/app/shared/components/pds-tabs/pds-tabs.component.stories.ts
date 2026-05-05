import { Meta, StoryObj } from '@storybook/angular';
import { PdsTabsComponent, TabItem } from './pds-tabs.component';

// ── Sample data ───────────────────────────────────────────────────────────────

const TABS_BASIC: TabItem[] = [
  { id: 'info', label: 'Información' },
  { id: 'cal', label: 'Calendario' },
  { id: 'notif', label: 'Notificaciones' },
];

const TABS_WITH_ICONS: TabItem[] = [
  { id: 'info', label: 'Información', icon: 'person' },
  { id: 'cal', label: 'Calendario', icon: 'calendar_month' },
  { id: 'notif', label: 'Notificaciones', icon: 'notifications' },
];

const TABS_WITH_DISABLED: TabItem[] = [
  { id: 'info', label: 'Información', icon: 'person' },
  { id: 'cal', label: 'Calendario', icon: 'calendar_month' },
  { id: 'reports', label: 'Reportes', icon: 'assessment', disabled: true },
  { id: 'notif', label: 'Notificaciones', icon: 'notifications' },
];

const TABS_ICON_ONLY_TEXT: TabItem[] = [
  { id: 'personal', label: 'Información personal', icon: 'person' },
];

const meta: Meta<PdsTabsComponent> = {
  title: 'Poli Design System / 08. Navigation / Tabs',
  component: PdsTabsComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**pds-tabs** organiza contenido relacionado en secciones paralelas y permite cambiar entre
vistas dentro del mismo contexto sin abandonar la página. Cada tab item activa un panel
asociado con contenido relevante.

### Cuándo usarlo
- Para alternar entre categorías, estados o bloques de información del mismo nivel jerárquico.
- Cuando el usuario necesita navegar entre vistas relacionadas sin perder el contexto.

### API
\`\`\`html
<pds-tabs
  [tabs]="tabs"
  [activeTab]="activeId"
  ariaLabel="Navegación principal"
  (tabChange)="onTabChange($event)"
/>

<!-- Panel asociado (renderizado por el padre) -->
<div
  role="tabpanel"
  [id]="tabsRef.getPanelId('tabId')"
  [attr.aria-labelledby]="tabsRef.getTabId('tabId')"
  [hidden]="activeId !== 'tabId'"
>
  Contenido de la pestaña…
</div>
\`\`\`

### Estados del Tab Item
| Estado   | Visual |
|----------|--------|
| Default  | Texto normal, sin indicador de color |
| Hover    | Fondo azul claro + indicador navy inferior |
| Active   | Texto semibold + indicador magenta inferior |
| Focus    | Anillo de foco teal (box-shadow) |
| Disabled | Fondo gris, texto gris, sin indicador |

### Accesibilidad (APG Tabs pattern)
- \`role="tablist"\` en el contenedor con \`aria-label\` descriptivo.
- Cada botón: \`role="tab"\`, \`aria-selected\`, \`aria-controls\` (apunta al panel).
- **Roving tabindex**: solo el tab activo tiene \`tabindex="0"\`; el resto \`tabindex="-1"\`.
- Teclas: **←/→** navegan entre tabs (auto-activación); **Home/End** van al primero/último.
- Los tabs deshabilitados usan \`aria-disabled="true"\` (no el atributo \`disabled\` nativo).
- El icono es decorativo (\`aria-hidden="true"\`); la etiqueta textual es la referencia de accesibilidad.

### Buenas prácticas (del Figma)
- ✅ Usa tabs para cambiar entre secciones relacionadas dentro del mismo contexto, sin cambiar de página.
- ✅ Usa íconos solo como apoyo visual; la etiqueta textual debe seguir siendo la referencia principal.
- ❌ No uses Tabs cuando hay muchas opciones o títulos extensos — dificulta el escaneo y la navegación.
- ❌ No uses Tabs con solo íconos o nombres poco descriptivos; cada opción debe anticipar claramente su contenido.
        `,
      },
    },
  },
  argTypes: {
    activeTab: {
      control: 'text',
      description: 'ID del tab activo (vacío = primer tab no-disabled)',
    },
    ariaLabel: {
      control: 'text',
      description: 'aria-label del rol tablist',
    },
  },
  render: (args) => ({
    props: {
      ...args,
      activeId: args.activeTab ?? 'cal',
      onTabChange: (id: string) => {
        console.log('[pds-tabs] tabChange:', id);
      },
    },
    template: `
      <pds-tabs
        [tabs]="tabs"
        [activeTab]="activeId"
        [ariaLabel]="ariaLabel"
        (tabChange)="activeId = $event; onTabChange($event)"
      />
    `,
  }),
};

export default meta;
type Story = StoryObj<PdsTabsComponent>;

// ── Default (Case 1 / Correct — icons + labels) ───────────────────────────────
export const Default: Story = {
  name: 'Default — Con íconos y etiquetas',
  parameters: {
    docs: {
      description: {
        story: `
✅ **Case 1 / Correcto**: Usa Tabs para alternar entre secciones relacionadas dentro del
mismo contexto, sin cambiar de página. Los íconos refuerzan el significado de cada tab.
        `,
      },
    },
  },
  render: () => ({
    props: {
      tabs: TABS_WITH_ICONS,
      activeId: 'cal',
    },
    template: `
      <pds-tabs
        [tabs]="tabs"
        [activeTab]="activeId"
        ariaLabel="Secciones de perfil"
        (tabChange)="activeId = $event"
      />

      <!-- Tab panels (responsibility of the parent) -->
      @for (tab of tabs; track tab.id) {
        <div
          role="tabpanel"
          [attr.aria-label]="tab.label"
          [hidden]="activeId !== tab.id"
          style="padding: 16px; font-family: 'Open Sans', sans-serif; color: var(--fg-brand-primary);"
        >
          <p>Contenido de la sección: <strong>{{ tab.label }}</strong></p>
        </div>
      }
    `,
  }),
};

// ── Sin íconos ────────────────────────────────────────────────────────────────
export const WithoutIcons: Story = {
  name: 'Sin íconos — Solo etiqueta',
  render: () => ({
    props: {
      tabs: TABS_BASIC,
      activeId: 'cal',
    },
    template: `
      <pds-tabs
        [tabs]="tabs"
        [activeTab]="activeId"
        ariaLabel="Secciones de perfil"
        (tabChange)="activeId = $event"
      />
    `,
  }),
};

// ── Tab deshabilitado ─────────────────────────────────────────────────────────
export const WithDisabledTab: Story = {
  name: 'Con tab deshabilitado',
  parameters: {
    docs: {
      description: {
        story: `
El tab deshabilitado recibe \`aria-disabled="true"\` (no el atributo nativo \`disabled\`),
manteniéndolo visible para lectores de pantalla. Se excluye de la navegación con flechas.
        `,
      },
    },
  },
  render: () => ({
    props: {
      tabs: TABS_WITH_DISABLED,
      activeId: 'info',
    },
    template: `
      <pds-tabs
        [tabs]="tabs"
        [activeTab]="activeId"
        ariaLabel="Secciones con reportes deshabilitados"
        (tabChange)="activeId = $event"
      />
    `,
  }),
};

// ── Todos los estados — showcase ──────────────────────────────────────────────
export const AllStates: Story = {
  name: 'Showcase — Todos los estados',
  parameters: {
    docs: {
      description: {
        story: `
Visualización de los 5 estados del Tab Item:
**DEFAULT · HOVER · ACTIVE · FOCUS · DISABLED**

> Usa Tab y ← → para ver el estado de focus en el navegador.
        `,
      },
    },
  },
  render: () => ({
    props: {
      // States mapped to meaningful tab ids
      tabs: [
        { id: 'default', label: 'Default', icon: 'widgets' },
        { id: 'active', label: 'Active', icon: 'widgets' },
        { id: 'focus', label: 'Focus', icon: 'widgets' },
        { id: 'hover', label: 'Hover', icon: 'widgets' },
        { id: 'disabled', label: 'Disabled', icon: 'widgets', disabled: true },
      ] as TabItem[],
      activeId: 'active',
    },
    template: `
      <pds-tabs
        [tabs]="tabs"
        [activeTab]="activeId"
        ariaLabel="Demostración de estados"
        (tabChange)="activeId = $event"
      />
    `,
  }),
};

// ── Case 2 / Correct — Ícono como apoyo visual ────────────────────────────────
export const Case2Correct: Story = {
  name: 'Case 2 / Correcto — Ícono como apoyo visual',
  parameters: {
    docs: {
      description: {
        story: `
✅ **Case 2 / Correcto**: Usa íconos solo como apoyo visual; la etiqueta textual debe
seguir siendo la referencia principal para la accesibilidad y la comprensión rápida.
        `,
      },
    },
  },
  render: () => ({
    props: {
      tabs: TABS_ICON_ONLY_TEXT,
      activeId: 'personal',
    },
    template: `
      <pds-tabs
        [tabs]="tabs"
        [activeTab]="activeId"
        ariaLabel="Secciones de información"
        (tabChange)="activeId = $event"
      />
    `,
  }),
};

// ── Múltiples tabs con panel ──────────────────────────────────────────────────
export const WithPanels: Story = {
  name: 'Integración completa con panels',
  parameters: {
    docs: {
      description: {
        story: `
Ejemplo completo mostrando la integración entre el componente **pds-tabs** (solo el tablist)
y los paneles renderizados por el padre.

El padre conecta los paneles usando \`getPanelId()\` y \`getTabId()\` del componente.
        `,
      },
    },
  },
  render: () => ({
    props: {
      tabs: TABS_WITH_ICONS,
      activeId: 'info',
    },
    template: `
      <div style="border: 1px solid var(--border-neutral-default, #b0bec5); border-radius: 10px; overflow: hidden;">
        <pds-tabs
          [tabs]="tabs"
          [activeTab]="activeId"
          ariaLabel="Secciones de perfil"
          (tabChange)="activeId = $event"
        />

        <!-- Panels -->
        <div
          role="tabpanel"
          id="pds-panel-1-info"
          aria-labelledby="pds-tab-1-info"
          [hidden]="activeId !== 'info'"
          style="padding: 24px; font-family: 'Open Sans', sans-serif;"
        >
          <h3 style="margin:0 0 8px; font-family: Poppins; color: var(--fg-brand-primary);">Información personal</h3>
          <p style="margin:0; color: var(--fg-neutral-primary);">Aquí se muestra el nombre, correo y datos del perfil del usuario.</p>
        </div>

        <div
          role="tabpanel"
          id="pds-panel-1-cal"
          aria-labelledby="pds-tab-1-cal"
          [hidden]="activeId !== 'cal'"
          style="padding: 24px; font-family: 'Open Sans', sans-serif;"
        >
          <h3 style="margin:0 0 8px; font-family: Poppins; color: var(--fg-brand-primary);">Calendario</h3>
          <p style="margin:0; color: var(--fg-neutral-primary);">Aquí se muestra el calendario con los eventos del usuario.</p>
        </div>

        <div
          role="tabpanel"
          id="pds-panel-1-notif"
          aria-labelledby="pds-tab-1-notif"
          [hidden]="activeId !== 'notif'"
          style="padding: 24px; font-family: 'Open Sans', sans-serif;"
        >
          <h3 style="margin:0 0 8px; font-family: Poppins; color: var(--fg-brand-primary);">Notificaciones</h3>
          <p style="margin:0; color: var(--fg-neutral-primary);">Sin notificaciones nuevas.</p>
        </div>
      </div>
    `,
  }),
};
