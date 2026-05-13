import { Route } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';

export const APP_ROUTES: Route[] = [
  // ── Pública ───────────────────────────────────────────────────────────────
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },

  // ── Shell autenticado ─────────────────────────────────────────────────────
  // El LayoutComponent envuelve todas las rutas protegidas con sidenav + header.
  // Para añadir nuevas rutas, agregar aquí como hijas del layout.
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./layout/layout.component').then((m) => m.LayoutComponent),
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        title: 'Inicio',
        loadComponent: () =>
          import('./pages/home/home.component').then((m) => m.HomeComponent),
      },

      // ── Showcase DS v2 ────────────────────────────────────────────────────
      {
        path: 'showcase',
        children: [
          {
            path: 'componentes',
            title: 'Componentes — DS v2',
            loadComponent: () =>
              import('./pages/showcase/componentes/componentes.component').then(
                (m) => m.ComponentesComponent,
              ),
          },
          {
            path: 'formularios',
            title: 'Formularios — DS v2',
            loadComponent: () =>
              import('./pages/showcase/formularios/formularios.component').then(
                (m) => m.FormulariosComponent,
              ),
          },
          {
            path: 'navegacion',
            title: 'Navegación — DS v2',
            loadComponent: () =>
              import('./pages/showcase/navegacion/navegacion.component').then(
                (m) => m.NavegacionComponent,
              ),
          },
          {
            path: '',
            redirectTo: 'componentes',
            pathMatch: 'full',
          },
        ],
      },
    ],
  },

  // ── 404 ───────────────────────────────────────────────────────────────────
  {
    path: '**',
    title: 'Página no encontrada',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
];
