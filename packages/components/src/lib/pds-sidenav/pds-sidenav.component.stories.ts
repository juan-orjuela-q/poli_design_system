import type { Meta, StoryObj } from '@storybook/angular';
import { componentWrapperDecorator } from '@storybook/angular';
import { PdsSidenavComponent, type SidenavItem } from './pds-sidenav.component';

const NAV_ITEMS_SIMPLE: SidenavItem[] = [
  { id: 'home', label: 'Inicio', icon: 'home', routerLink: '/home' },
  { id: 'profile', label: 'Mi perfil', icon: 'person', routerLink: '/profile' },
  { id: 'courses', label: 'Mis cursos', icon: 'school', routerLink: '/courses' },
  { id: 'grades', label: 'Calificaciones', icon: 'grade', routerLink: '/grades' },
  { id: 'schedule', label: 'Horario', icon: 'calendar_month', routerLink: '/schedule' },
];

const NAV_ITEMS_WITH_CHILDREN: SidenavItem[] = [
  { id: 'home', label: 'Inicio', icon: 'home', routerLink: '/home' },
  {
    id: 'academic',
    label: 'Académico',
    icon: 'school',
    children: [
      { id: 'courses', label: 'Mis cursos', routerLink: '/academic/courses' },
      { id: 'grades', label: 'Calificaciones', routerLink: '/academic/grades' },
      { id: 'schedule', label: 'Horario', routerLink: '/academic/schedule' },
    ],
  },
  {
    id: 'finances',
    label: 'Financiero',
    icon: 'payments',
    children: [
      { id: 'invoices', label: 'Facturas', routerLink: '/finances/invoices' },
      { id: 'payments', label: 'Pagos', routerLink: '/finances/payments' },
    ],
  },
  { id: 'library', label: 'Biblioteca', icon: 'menu_book', routerLink: '/library' },
  { id: 'support', label: 'Soporte', icon: 'support_agent', routerLink: '/support' },
];

const meta: Meta<PdsSidenavComponent> = {
  title: 'Poli Design System / 06. Navigation / Sidenav',
  component: PdsSidenavComponent,
  decorators: [
    componentWrapperDecorator(
      (story) =>
        `<div style="display:flex;height:500px;position:relative;overflow:hidden">${story}</div>`,
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    appTitle: { control: 'text', description: 'Título de la aplicación en el encabezado' },
    appSubtitle: { control: 'text', description: 'Subtítulo / portal visible al expandir' },
    appIconName: { control: 'text', description: 'Ícono del portal (Material Symbols)' },
    expanded: { control: 'boolean', description: 'Estado expandido/colapsado' },
    activeItemId: { control: 'text', description: 'ID del ítem activo (aria-current)' },
    activeSubItemId: { control: 'text', description: 'ID del sub-ítem activo' },
    showFooter: { control: 'boolean', description: 'Muestra la sección de pie de página' },
  },
  parameters: {
    docs: {
      description: {
        component: `
Barra de navegación lateral del DS v2. Soporta estado **expandido** (304px) y **colapsado** (80px) con transición suave.
Los ítems pueden ser hojas (con \`routerLink\`) o padres con sub-ítems en acordeón de un nivel.
En estado colapsado, los tooltips revelan la etiqueta de cada ítem al pasar el cursor.
El botón de toggle cuelga sobre el borde derecho del sidenav.

### Cuándo usarlo
- Como navegación principal en aplicativos del portal Poli con múltiples secciones.
- Cuando el usuario necesita acceder rápidamente a secciones sin perder el contexto de la página actual.
- En pantallas de escritorio con suficiente espacio lateral.

### Cuándo NO usarlo
- En móviles — en pantallas pequeñas considerar un drawer o menú hamburguesa.
- Para flujos de 2-3 páginas — un \`pds-tabs\` o \`pds-breadcrumb\` puede ser más apropiado.

### API
\`\`\`html
<pds-sidenav
  [items]="navItems"
  appTitle="Portal Estudiantil"
  appSubtitle="Politécnico Grancolombiano"
  [expanded]="isOpen"
  activeItemId="courses"
  (expandedChange)="isOpen = $event"
  (itemClick)="onNavigate($event)"
/>
\`\`\`

| Input             | Tipo              | Default          | Descripción |
|-------------------|-------------------|------------------|-------------|
| \`items\`           | \`SidenavItem[]\` (requerido) | — | Lista de ítems de navegación |
| \`appTitle\`        | \`string\`        | \`'Mi Aplicación'\` | Título en el encabezado |
| \`appSubtitle\`     | \`string\`        | \`''\`           | Subtítulo del portal |
| \`appIconName\`     | \`string\`        | \`'hive'\`       | Ícono del portal (Material Symbols) |
| \`expanded\`        | \`boolean\`       | \`true\`         | Estado expandido/colapsado |
| \`activeItemId\`    | \`string\`        | \`''\`           | ID del ítem activo |
| \`activeSubItemId\` | \`string\`        | \`''\`           | ID del sub-ítem activo |
| \`showFooter\`      | \`boolean\`       | \`false\`        | Muestra slot de pie de página |

| Output            | Tipo                                  | Descripción |
|-------------------|---------------------------------------|-------------|
| \`expandedChange\` | \`boolean\`                           | Emite al cambiar estado expandido/colapsado |
| \`itemClick\`      | \`{ itemId: string; subItemId?: string }\` | Emite al hacer clic en un ítem o sub-ítem |

**SidenavItem:**
\`\`\`ts
interface SidenavItem {
  id: string;
  label: string;
  icon: string;
  routerLink?: string | string[];
  children?: SidenavSubItem[];  // acordeón de un nivel
}
\`\`\`

---

### Accesibilidad — WCAG 2.2

#### Criterios aplicables
| Criterio | Nivel | Aplicación |
|----------|-------|------------|
| **1.3.1 Info y relaciones** | A | Ítems en \`<nav>\` + \`<ul>\`/\`<li>\`; sub-ítems en \`<ul>\` anidado semántico |
| **1.3.2 Secuencia significativa** | A | Orden del DOM corresponde al orden visual de la navegación |
| **1.4.1 Uso del color** | A | El ítem activo se indica con \`aria-current\` + indicador visual, no solo color |
| **1.4.3 Contraste mínimo** | AA | Etiquetas ≥ 4.5:1; ícono del portal ≥ 3:1 |
| **2.1.1 Teclado** | A | Todos los ítems y el botón toggle son \`<button>\` nativos — focusables con Tab |
| **2.4.3 Orden del foco** | A | El foco sigue el orden visual de los ítems; sub-ítems solo se enfocan cuando el acordeón está abierto |
| **2.4.7 Foco visible** | AA | Focus ring con token \`--action-primary-focus-ring\` en cada ítem |
| **4.1.2 Nombre, rol, valor** | A | \`aria-current="page"\` en el ítem activo; \`aria-expanded\` en ítems padre; \`aria-label\` en el botón toggle |

#### Navegación por teclado
| Tecla | Acción |
|-------|--------|
| **Tab** | Navega entre ítems de la lista (y botón toggle) |
| **Enter / Space** | Activa el ítem (navega o abre/cierra acordeón) |
| **Tab** (dentro de padre abierto) | Navega a los sub-ítems |
| **Shift+Tab** | Navega hacia atrás |

#### Atributos ARIA
| Atributo | Dónde | Función |
|----------|-------|---------|
| \`aria-current="page"\` | en el ítem activo | Indica la página actual al lector de pantalla |
| \`aria-expanded="true/false"\` | en ítems padre | Indica si el sub-menú está abierto |
| \`aria-label\` | en el botón toggle | *"Contraer/Expandir menú de navegación"* |
| \`aria-label\` | en el \`<nav>\` | Nombre de la región de navegación |

#### Comportamiento en estado colapsado
Cuando el sidenav está colapsado, los tooltips (\`pds-tooltip\`) revelan la etiqueta de cada ítem al enfocar con teclado o pasar el cursor, cumpliendo WCAG **1.3.3** (no solo posición visual).

#### Anuncio en lectores de pantalla
- Al enfocar un ítem activo: *"Mis cursos, actual"*
- Al enfocar un ítem padre cerrado: *"Académico, expandido: No"*
- Al expandir un padre: *"Académico, expandido: Sí"*
- Al enfocar el toggle: *"Contraer menú de navegación, botón"*

#### Auditoría v1 → v2
| Hallazgo v1 (Cortés, feb 2026) | Criterio WCAG | Resolución en v2 |
|--------------------------------|---------------|------------------|
| Foco no representado — ítems sin focus ring visible | 2.4.7 | Focus ring con token \`--action-primary-focus-ring\` en cada \`<button>\` |
| Jerarquía plana — sub-ítems en divs sin semántica | 1.3.1 | Sub-ítems en \`<ul>\` anidado con \`role="list"\` implícito; semántica de lista |
| Estado colapsado sin texto — labels ocultas sin alternativa | 1.3.3 | Tooltips automáticos con \`aria-label\` del ítem en modo colapsado |
| Solo color indica ítem activo | 1.4.1 | \`aria-current="page"\` + indicador visual con \`--border-status-error-solid\` |

### Buenas prácticas
✅ Define siempre \`activeItemId\` para que \`aria-current\` se aplique correctamente.
✅ Mantén el sidenav en \`<nav aria-label="Navegación principal">\` para que sea una región de referencia.
✅ Los ítems con hijos no deben tener \`routerLink\` — solo actúan como acordeón.
❌ No anides sub-ítems en más de un nivel — la complejidad excede el patrón soportado.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<PdsSidenavComponent>;

// ── Sandbox ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default — Sandbox',
  args: {
    items: NAV_ITEMS_SIMPLE,
    appTitle: 'Portal Estudiantil',
    appSubtitle: 'Politécnico Grancolombiano',
    appIconName: 'hive',
    expanded: true,
    activeItemId: 'courses',
    showFooter: false,
  },
};

// ── Expandido ─────────────────────────────────────────────────────────────────

export const Expanded: Story = {
  name: 'Estado expandido (304px)',
  args: {
    items: NAV_ITEMS_WITH_CHILDREN,
    appTitle: 'Portal Estudiantil',
    appSubtitle: 'Politécnico Grancolombiano',
    expanded: true,
    activeItemId: 'courses',
  },
};

// ── Colapsado ─────────────────────────────────────────────────────────────────

export const Collapsed: Story = {
  name: 'Estado colapsado (80px) — tooltips activos',
  parameters: {
    docs: {
      description: {
        story: 'En modo colapsado las etiquetas se ocultan pero los tooltips revelan el nombre de cada ítem al enfocar con Tab o pasar el cursor, cumpliendo WCAG 1.3.3.',
      },
    },
  },
  args: {
    items: NAV_ITEMS_SIMPLE,
    appTitle: 'Portal Estudiantil',
    expanded: false,
    activeItemId: 'home',
  },
};

// ── Con acordeón ──────────────────────────────────────────────────────────────

export const WithAccordion: Story = {
  name: 'Con sub-ítems en acordeón',
  parameters: {
    docs: {
      description: {
        story: 'Los ítems con \`children\` actúan como acordeón. Solo un nivel de anidación. \`aria-expanded\` indica el estado abierto/cerrado a los lectores de pantalla.',
      },
    },
  },
  args: {
    items: NAV_ITEMS_WITH_CHILDREN,
    appTitle: 'Portal Estudiantil',
    appSubtitle: 'Politécnico Grancolombiano',
    expanded: true,
    activeItemId: 'courses',
    activeSubItemId: 'courses',
  },
};

// ── Accesibilidad ─────────────────────────────────────────────────────────────

export const A11yKeyboardNav: Story = {
  name: 'A11y — Navegación por teclado (Tab para probar)',
  parameters: {
    docs: {
      description: {
        story: `
Usa **Tab** para navegar entre ítems. El ítem activo tiene \`aria-current="page"\`.

En modo colapsado (activa el toggle con Enter):
- **Tab** enfoca cada ítem
- El **tooltip** se activa al enfocar y revela la etiqueta completa
- NVDA/VoiceOver leen: *"[etiqueta], botón"* y el tooltip se anuncia como \`aria-describedby\`

Los ítems padre con sub-menú tienen \`aria-expanded="true/false"\`.
        `,
      },
    },
  },
  args: {
    items: NAV_ITEMS_WITH_CHILDREN,
    appTitle: 'Portal Estudiantil',
    expanded: true,
    activeItemId: 'home',
  },
};
