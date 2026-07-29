import { SidenavItem } from '@poli/components';

/**
 * Identidad del portal y de la aplicación, y lista de aplicativos de la portada.
 *
 * Una sola declaración alimenta la barra superior (en la portada y dentro de la
 * app), el menú móvil de la portada y las tarjetas de acceso.
 *
 * Para personalizar en tu proyecto:
 * 1. Ajusta `PORTAL` con el nombre, la descripción, el ícono y el branding.
 * 2. Ajusta `APP` con el nombre del aplicativo que vive en este repositorio.
 * 3. Reemplaza `PORTAL_APPS` con los aplicativos reales del portal.
 *
 * Íconos: nombres de Material Symbols Rounded.
 * Catálogo: https://fonts.google.com/icons?icontype=rounded
 */

/** Aplicativo al que da acceso el portal. */
export interface PortalApp {
  id: string;
  label: string;
  description: string;
  icon: string;
  routerLink: string;
}

/** Nivel portal del breadcrumb. Se refleja en la barra y en el encabezado. */
export const PORTAL = {
  label: 'Gestión académica',
  description:
    'Facilita y organiza la operación académica de programas y ciclos formativos.',
  icon: 'hive',
  /** Debe ser el mismo valor en pds-portal-nav y pds-portal-header. */
  color: 'blue',
  /** Ruta de la portada del portal: el inicio del proyecto. */
  routerLink: '/',
} as const;

/** Nivel app del breadcrumb: el aplicativo que vive en este repositorio. */
export const APP = {
  label: 'Mi Aplicación',
  description:
    'Proyecto base para aplicativos del ecosistema. Estas son sus pantallas de referencia.',
  icon: 'hive',
  /** Inicio del aplicativo. Destino de las tarjetas y de la marca del sidenav. */
  routerLink: '/home',
} as const;

/**
 * Secciones del aplicativo. Alimentan la rejilla de la portada.
 *
 * Son las mismas rutas que el sidenav (`NAV_ITEMS` en `nav-config.ts`), pero
 * con descripción: la rejilla de la portada tiene sitio para explicar cada
 * sección, el menú lateral no.
 */
export const APP_SECTIONS: PortalApp[] = [
  {
    id: 'componentes',
    label: 'Componentes',
    description:
      'Catálogo del DS v2 aplicado sobre una pantalla real: tipografía, botones, tarjetas y estados.',
    icon: 'widgets',
    routerLink: '/showcase/componentes',
  },
  {
    id: 'formularios',
    label: 'Formularios',
    description:
      'Campos, validación y mensajes de error siguiendo las pautas de accesibilidad.',
    icon: 'edit_note',
    routerLink: '/showcase/formularios',
  },
  {
    id: 'navegacion',
    label: 'Navegación',
    description:
      'Patrones de navegación: breadcrumb, tabs, paginador y menú lateral.',
    icon: 'explore',
    routerLink: '/showcase/navegacion',
  },
];

/**
 * Aplicativos de la portada.
 *
 * En un portal real cada tarjeta lleva a un aplicativo distinto. La semilla
 * implementa uno solo, así que todas apuntan a `APP.routerLink`: sirven para
 * ver la rejilla completa y el paso portada → aplicativo.
 */
export const PORTAL_APPS: PortalApp[] = [
  {
    id: 'programas',
    label: 'Programas',
    description:
      'Creación y mantenimiento de programas académicos y sus planes de estudio.',
    icon: 'school',
    routerLink: APP.routerLink,
  },
  {
    id: 'matriculas',
    label: 'Matrículas',
    description:
      'Inscripción de estudiantes, validación de requisitos y control de cupos.',
    icon: 'how_to_reg',
    routerLink: APP.routerLink,
  },
  {
    id: 'certificados',
    label: 'Certificados',
    description:
      'Emisión y consulta de certificados académicos y constancias de estudio.',
    icon: 'workspace_premium',
    routerLink: APP.routerLink,
  },
  {
    id: 'reportes',
    label: 'Reportes',
    description:
      'Indicadores de cobertura, deserción y avance de los ciclos formativos.',
    icon: 'monitoring',
    routerLink: APP.routerLink,
  },
];

/**
 * Los mismos aplicativos como ítems de navegación. En escritorio la barra de la
 * portada no los muestra; en móvil son el contenido de su botón de menú.
 *
 * Dentro de un aplicativo la barra usa otra lista: la del sidenav
 * (`NAV_ITEMS` en `nav-config.ts`).
 */
export const PORTAL_NAV_ITEMS: SidenavItem[] = PORTAL_APPS.map((app) => ({
  id: app.id,
  label: app.label,
  icon: app.icon,
  routerLink: app.routerLink,
}));
