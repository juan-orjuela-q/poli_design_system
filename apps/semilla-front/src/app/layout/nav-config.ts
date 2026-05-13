import { SidenavItem } from '@poli/components';

/**
 * Configuración de navegación principal del sidenav.
 *
 * Para personalizar en tu proyecto:
 * 1. Reemplaza los ítems con las rutas de tu aplicación.
 * 2. Los `routerLink` son rutas relativas al shell (hijas de `/`).
 * 3. Usa `children` para sub-menús de un nivel.
 *
 * Íconos: nombres de Material Symbols Rounded.
 * Catálogo: https://fonts.google.com/icons?icontype=rounded
 */
export const NAV_ITEMS: SidenavItem[] = [
  {
    id: 'home',
    label: 'Inicio',
    icon: 'home',
    routerLink: '/home',
  },
  {
    id: 'showcase',
    label: 'DS v2 — Referencia',
    icon: 'palette',
    children: [
      {
        id: 'showcase-componentes',
        label: 'Componentes',
        routerLink: '/showcase/componentes',
      },
      {
        id: 'showcase-formularios',
        label: 'Formularios',
        routerLink: '/showcase/formularios',
      },
      {
        id: 'showcase-navegacion',
        label: 'Navegación',
        routerLink: '/showcase/navegacion',
      },
    ],
  },
];
