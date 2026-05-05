import type { Meta, StoryObj } from '@storybook/angular';
import { componentWrapperDecorator } from '@storybook/angular';

import { PdsSidenavComponent, type SidenavItem } from './pds-sidenav.component';

// ── Datos de ejemplo ─────────────────────────────────────────────────────────

const ITEMS_BASICOS: SidenavItem[] = [
  { id: 'inicio', label: 'Inicio', icon: 'home' },
  { id: 'cursos', label: 'Mis cursos', icon: 'school' },
  { id: 'calendario', label: 'Calendario', icon: 'calendar_month' },
  { id: 'mensajes', label: 'Mensajes', icon: 'mail' },
  { id: 'soporte', label: 'Soporte', icon: 'help' },
];

const ITEMS_CON_SUBITEMS: SidenavItem[] = [
  { id: 'inicio', label: 'Inicio', icon: 'home' },
  {
    id: 'academico',
    label: 'Académico',
    icon: 'school',
    children: [
      { id: 'cursos', label: 'Mis cursos' },
      { id: 'notas', label: 'Calificaciones' },
      { id: 'horario', label: 'Horario de clases' },
    ],
  },
  {
    id: 'bienestar',
    label: 'Bienestar',
    icon: 'favorite',
    children: [
      { id: 'deportes', label: 'Deportes y recreación' },
      { id: 'psicologia', label: 'Orientación psicológica' },
    ],
  },
  { id: 'calendario', label: 'Calendario', icon: 'calendar_month' },
  { id: 'soporte', label: 'Soporte', icon: 'help' },
];

const ITEMS_CON_ACTIVO: SidenavItem[] = [
  { id: 'inicio', label: 'Inicio', icon: 'home' },
  { id: 'cursos', label: 'Mis cursos', icon: 'school' },
  { id: 'calendario', label: 'Calendario', icon: 'calendar_month' },
  { id: 'mensajes', label: 'Mensajes', icon: 'mail' },
];

// ── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<PdsSidenavComponent> = {
  title: 'Poli Design System / 08. Navigation / Side Nav',
  component: PdsSidenavComponent,
  tags: ['autodocs'],
  decorators: [
    componentWrapperDecorator(
      (story) =>
        `<div style="display:flex;height:600px;background:#f5f5f5;">${story}</div>`
    ),
  ],
  argTypes: {
    appTitle: { control: 'text' },
    appSubtitle: { control: 'text' },
    appIconName: { control: 'text' },
    expanded: { control: 'boolean' },
    activeItemId: { control: 'text' },
    activeSubItemId: { control: 'text' },
    showFooter: { control: 'boolean' },
  },
  args: {
    appTitle: 'Politécnico',
    appSubtitle: 'Portal Estudiantil',
    appIconName: 'hive',
    expanded: true,
    activeItemId: '',
    activeSubItemId: '',
    showFooter: false,
    items: ITEMS_BASICOS,
  },
};

export default meta;
type Story = StoryObj<PdsSidenavComponent>;

// ── Stories ──────────────────────────────────────────────────────────────────

/** Estado expandido (por defecto), con ítems básicos sin sub-menús. */
export const Expandido: Story = {
  args: {
    expanded: true,
    items: ITEMS_BASICOS,
  },
};

/** Estado colapsado (solo íconos). Los tooltips aparecen al hacer hover. */
export const Colapsado: Story = {
  args: {
    expanded: false,
    items: ITEMS_BASICOS,
  },
};

/** Ítem activo resaltado con fondo azul marino. */
export const ConItemActivo: Story = {
  args: {
    expanded: true,
    items: ITEMS_CON_ACTIVO,
    activeItemId: 'cursos',
  },
};

/** Ítems padre con sub-menús. El acordeón se controla internamente. */
export const ConSubItems: Story = {
  args: {
    expanded: true,
    items: ITEMS_CON_SUBITEMS,
  },
};

/** Sub-ítem activo dentro de un padre expandido. */
export const ConSubItemActivo: Story = {
  args: {
    expanded: true,
    items: ITEMS_CON_SUBITEMS,
    activeItemId: 'academico',
    activeSubItemId: 'notas',
  },
};

/**
 * Colapsado con ítems que tienen sub-menús.
 * Los sub-menús no son accesibles en estado colapsado (se muestran al expandir).
 */
export const ColapsadoConSubItems: Story = {
  args: {
    expanded: false,
    items: ITEMS_CON_SUBITEMS,
  },
};

/** Con pie de página personalizado mediante `ng-content[slot=footer]`. */
export const ConFooter: Story = {
  args: {
    expanded: true,
    items: ITEMS_BASICOS,
    showFooter: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <pds-sidenav
        [items]="items"
        [appTitle]="appTitle"
        [appSubtitle]="appSubtitle"
        [appIconName]="appIconName"
        [expanded]="expanded"
        [showFooter]="showFooter"
      >
        <div slot="footer" style="display:flex;flex-direction:column;gap:8px;">
          <a href="#" style="font-size:13px;color:var(--fg-brand-primary);text-decoration:none;">
            Términos y condiciones
          </a>
          <a href="#" style="font-size:13px;color:var(--fg-brand-primary);text-decoration:none;">
            Política de privacidad
          </a>
        </div>
      </pds-sidenav>
    `,
  }),
};

/** Sidenav con icono de portal personalizado y título de aplicación diferente. */
export const IconoPersonalizado: Story = {
  args: {
    expanded: true,
    items: ITEMS_BASICOS,
    appTitle: 'Bienestar',
    appSubtitle: 'Portal de servicios',
    appIconName: 'favorite',
  },
};

/** Demostración del toggle para expandir/colapsar (interactivo). */
export const InteractivoToggle: Story = {
  args: {
    expanded: true,
    items: ITEMS_CON_SUBITEMS,
  },
  render: (args) => ({
    props: { ...args, isExpanded: args['expanded'] ?? true },
    template: `
      <pds-sidenav
        [items]="items"
        [appTitle]="appTitle"
        [appSubtitle]="appSubtitle"
        [appIconName]="appIconName"
        [expanded]="isExpanded"
        (expandedChange)="isExpanded = $event"
      />
    `,
  }),
};
