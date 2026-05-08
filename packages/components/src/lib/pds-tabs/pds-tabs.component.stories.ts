import { Meta, StoryObj } from '@storybook/angular';
import { PdsTabsComponent, TabItem } from './pds-tabs.component';

const BASIC_TABS: TabItem[] = [
  { id: 'general', label: 'General' },
  { id: 'academic', label: 'Académico' },
  { id: 'financial', label: 'Financiero' },
  { id: 'support', label: 'Soporte' },
];

const TABS_WITH_ICONS: TabItem[] = [
  { id: 'home', label: 'Inicio', icon: 'home' },
  { id: 'courses', label: 'Mis cursos', icon: 'school' },
  { id: 'grades', label: 'Calificaciones', icon: 'grade' },
  { id: 'profile', label: 'Perfil', icon: 'person' },
];

const TABS_WITH_DISABLED: TabItem[] = [
  { id: 'tab1', label: 'Activa' },
  { id: 'tab2', label: 'Activa 2' },
  { id: 'tab3', label: 'Deshabilitada', disabled: true },
  { id: 'tab4', label: 'Activa 3' },
];

const meta: Meta<PdsTabsComponent> = {
  title: 'Poli Design System / 05. Navigation / Tabs',
  component: PdsTabsComponent,
  tags: ['autodocs'],
  argTypes: {
    ariaLabel: { control: 'text', description: 'aria-label del elemento tablist. Requerido para accesibilidad.' },
    activeTab: { control: 'text', description: 'ID de la pestaña activa (controlado externamente)' },
  },
  parameters: {
    docs: {
      description: {
        component: `
Componente de navegación por pestañas del DS v2.
Implementa el patrón APG **Manual Activation** con roving tabindex:
las flechas mueven el foco pero no activan la pestaña hasta que el usuario presiona Enter/Space.

### Cuándo usarlo
- Para organizar contenido relacionado en vistas paralelas dentro de una misma pantalla.
- Cuando el usuario necesita cambiar entre secciones sin navegar a otra URL.
- Máximo 6-7 tabs — más pestañas sugieren que el contenido debería estructurarse diferente.

### Cuándo NO usarlo
- No usar tabs para navegación entre páginas — usar \`pds-breadcrumb\` y \`<a>\`.
- No usar tabs para pasos secuenciales — usar \`pds-stepper\`.
- No usar tabs si el usuario necesita ver el contenido de varias pestañas simultáneamente.

### API
\`\`\`html
<pds-tabs
  [tabs]="tabItems"
  [activeTab]="activeId"
  ariaLabel="Secciones del perfil"
  (tabChange)="onTabChange($event)"
/>

<!-- El panel es responsabilidad del componente padre -->
<div [id]="tabs.getPanelId(activeId)" role="tabpanel" [attr.aria-labelledby]="tabs.getTabId(activeId)">
  <!-- contenido según activeId -->
</div>
\`\`\`

| Input       | Tipo          | Default                      | Descripción |
|-------------|---------------|------------------------------|-------------|
| \`tabs\`     | \`TabItem[]\` (requerido) | — | Definición de las pestañas |
| \`activeTab\` | \`string\`   | \`''\` (primera no deshabilitada) | ID de la pestaña activa |
| \`ariaLabel\` | \`string\`   | \`'Navegación por pestañas'\` | aria-label del tablist |

**TabItem:**
\`\`\`ts
interface TabItem {
  id: string;
  label: string;
  icon?: string;      // nombre de ícono Material Symbols — aparece sobre el label
  disabled?: boolean; // la pestaña es visible pero no seleccionable
}
\`\`\`

| Output      | Tipo     | Descripción |
|-------------|----------|-------------|
| \`tabChange\` | \`string\` | ID de la pestaña recién seleccionada |

**Métodos públicos:**
| Método | Descripción |
|--------|-------------|
| \`getTabId(tabId)\` | Devuelve el \`id\` HTML del botón de la pestaña |
| \`getPanelId(tabId)\` | Devuelve el \`id\` esperado del panel — aplícalo al \`[role="tabpanel"]\` del padre |

---

### Accesibilidad — WCAG 2.2

#### Criterios aplicables
| Criterio | Nivel | Aplicación |
|----------|-------|------------|
| **1.3.1 Info y relaciones** | A | \`role="tablist"\`, \`role="tab"\`, \`role="tabpanel"\` comunican la estructura |
| **1.3.2 Secuencia significativa** | A | Las tabs siguen el orden DOM — el panel aparece después del tablist |
| **1.4.1 Uso del color** | A | El indicador activo usa borde + cambio de color — no solo un tono diferente |
| **1.4.3 Contraste mínimo** | AA | Texto de tabs ≥ 4.5:1 sobre fondo en todos los estados |
| **2.1.1 Teclado** | A | Patrón APG completo: Tab/flechas/Home/End/Enter/Space |
| **2.4.3 Orden del foco** | A | Tab mueve el foco al tablist; flechas navegan entre tabs |
| **2.4.7 Foco visible** | AA | Anillo de foco doble en la pestaña enfocada |
| **4.1.2 Nombre, rol, valor** | A | \`role="tab"\` + \`aria-selected\` + \`aria-disabled\` + \`aria-controls\` |

#### Navegación por teclado — APG Manual Activation
| Tecla | Acción |
|-------|--------|
| **Tab** | Mueve el foco al tablist (entra en el componente) |
| **ArrowLeft / ArrowRight** | Mueve el foco entre pestañas (sin activar) |
| **Home** | Mueve el foco a la primera pestaña habilitada |
| **End** | Mueve el foco a la última pestaña habilitada |
| **Enter / Space** | Activa la pestaña que tiene el foco — emite \`tabChange\` |
| **Tab** (dentro del tablist) | Sale del tablist al primer elemento del panel activo |

#### Atributos ARIA
| Atributo | Valor | Cuándo |
|----------|-------|--------|
| \`role="tablist"\` | en el contenedor | Siempre |
| \`aria-label\` | valor de \`ariaLabel\` | En el tablist |
| \`role="tab"\` | en cada pestaña | Siempre |
| \`aria-selected="true/false"\` | automático | Refleja la pestaña activa |
| \`aria-disabled="true"\` | automático | Cuando \`disabled=true\` |
| \`aria-controls="[panelId]"\` | automático | Vincula la pestaña con su panel |
| \`tabindex="0"\` | pestaña activa o enfocada | Roving tabindex |
| \`tabindex="-1"\` | resto de pestañas | Roving tabindex |

#### Responsabilidad del padre: el panel
\`\`\`html
<div
  [id]="tabs.getPanelId(activeId)"
  role="tabpanel"
  [attr.aria-labelledby]="tabs.getTabId(activeId)"
  tabindex="0"
>
  <!-- contenido del panel -->
</div>
\`\`\`

El \`tabindex="0"\` en el panel permite que los usuarios de teclado lleguen al contenido con Tab
después de seleccionar la pestaña.

#### Anuncio en lectores de pantalla
- Al enfocar una pestaña: *"General, pestaña 1 de 4, seleccionada"* / *"Académico, pestaña 2 de 4"*
- Al activar: el lector de pantalla anuncia el contenido del panel seleccionado

#### Auditoría v1 → v2
| Hallazgo v1 (Cortés, feb 2026) | Criterio WCAG | Resolución en v2 |
|--------------------------------|---------------|------------------|
| Sin navegación por flechas entre pestañas | 2.1.1 | APG tablist pattern: ArrowLeft/Right/Home/End |
| Sin roving tabindex — Tab recorría todas las pestañas | 2.4.3 | Solo la pestaña activa tiene tabindex=0; el resto -1 |
| Sin roles ARIA tablist/tab/tabpanel | 4.1.2 | \`role="tablist"\` + \`role="tab"\` + \`aria-selected\` + \`aria-controls\` |
| Indicador activo solo por color (magenta) | 1.4.1 | Borde inferior 3px + cambio de color de texto en estado activo |

### Buenas prácticas
✅ Usa \`ariaLabel\` descriptivo: *"Secciones del perfil"*, no *"Tabs"*.
✅ Aplica \`getPanelId()\` y \`getTabId()\` en el panel del padre para que \`aria-controls\` apunte correctamente.
✅ Añade \`tabindex="0"\` al panel para que los usuarios de teclado puedan llegar al contenido.
❌ No uses tabs para flujos lineales o secuenciales — usa \`pds-stepper\`.
❌ No omitas el \`[role="tabpanel"]\` del padre — las tabs pierden su semántica sin el panel asociado.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<PdsTabsComponent>;

// ── Sandbox ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default — Sandbox',
  args: {
    tabs: BASIC_TABS,
    ariaLabel: 'Secciones de mi cuenta',
    activeTab: 'general',
  },
};

// ── Con paneles ───────────────────────────────────────────────────────────────

export const WithPanels: Story = {
  name: 'Con paneles de contenido',
  parameters: {
    docs: {
      description: {
        story: `
Ejemplo completo con paneles de contenido. El padre gestiona cuál panel mostrar según \`tabChange\`.
Observa la estructura ARIA: el panel tiene \`role="tabpanel"\`, \`aria-labelledby\` apuntando al tab activo y \`tabindex="0"\`.
        `,
      },
    },
  },
  render: () => ({
    props: {
      tabs: BASIC_TABS,
      active: 'general',
      onTabChange(id: string) { this['active'] = id; },
    },
    template: `
      <pds-tabs
        [tabs]="tabs"
        [activeTab]="active"
        ariaLabel="Secciones de mi perfil"
        (tabChange)="onTabChange($event)"
        #tabsRef
      />
      <div
        role="tabpanel"
        [id]="'panel-' + active"
        style="padding:16px;font-family:'Open Sans';font-size:15px;color:#50606E;border:1px solid #E0E8EE;border-top:none;border-radius:0 0 8px 8px"
        tabindex="0"
      >
        <span *ngIf="active === 'general'">Contenido de la sección General</span>
        <span *ngIf="active === 'academic'">Contenido de la sección Académica</span>
        <span *ngIf="active === 'financial'">Contenido de la sección Financiera</span>
        <span *ngIf="active === 'support'">Contenido de la sección Soporte</span>
      </div>
    `,
  }),
};

// ── Con íconos ────────────────────────────────────────────────────────────────

export const WithIcons: Story = {
  name: 'Con íconos sobre el label',
  parameters: {
    docs: {
      description: {
        story: 'El ícono opcional se renderiza sobre el texto del label. El ícono tiene \`aria-hidden="true"\` — es decorativo.',
      },
    },
  },
  render: () => ({
    props: {
      tabs: TABS_WITH_ICONS,
      active: 'home',
    },
    template: `
      <pds-tabs
        [tabs]="tabs"
        [activeTab]="active"
        ariaLabel="Navegación principal"
        (tabChange)="active = $event"
      />
    `,
  }),
};

// ── Con tab deshabilitada ─────────────────────────────────────────────────────

export const WithDisabledTab: Story = {
  name: 'Con pestaña deshabilitada',
  parameters: {
    docs: {
      description: {
        story: `
Las pestañas deshabilitadas tienen \`aria-disabled="true"\` y \`tabindex="-1"\`.
El roving tabindex las omite al navegar con flechas — el foco salta directamente a la siguiente habilitada.
        `,
      },
    },
  },
  render: () => ({
    props: {
      tabs: TABS_WITH_DISABLED,
      active: 'tab1',
    },
    template: `
      <pds-tabs
        [tabs]="tabs"
        [activeTab]="active"
        ariaLabel="Secciones con una deshabilitada"
        (tabChange)="active = $event"
      />
    `,
  }),
};

// ── Accesibilidad ─────────────────────────────────────────────────────────────

export const A11yKeyboardNav: Story = {
  name: 'A11y — Teclado APG (Tab + flechas + Enter para probar)',
  parameters: {
    docs: {
      description: {
        story: `
**Patrón APG Manual Activation:**

1. Usa **Tab** para enfocar el tablist.
2. Usa **ArrowLeft / ArrowRight** para mover el foco entre pestañas (sin activar).
3. Presiona **Enter** o **Space** para activar la pestaña enfocada.
4. **Home** / **End** saltan a la primera/última pestaña habilitada.
5. Las pestañas deshabilitadas se omiten con las flechas.

NVDA/VoiceOver anuncian: *"[label], pestaña [n] de [total], [seleccionada/no seleccionada]"*.
        `,
      },
    },
  },
  render: () => ({
    props: {
      tabs: TABS_WITH_DISABLED,
      active: 'tab1',
    },
    template: `
      <pds-tabs
        [tabs]="tabs"
        [activeTab]="active"
        ariaLabel="Prueba de teclado — APG Manual Activation"
        (tabChange)="active = $event"
      />
      <div
        role="tabpanel"
        style="padding:16px;font-family:'Open Sans';color:#50606E;border:1px solid #E0E8EE;border-top:none"
        tabindex="0"
      >
        Pestaña activa: <strong>{{ active }}</strong>
      </div>
    `,
  }),
};
