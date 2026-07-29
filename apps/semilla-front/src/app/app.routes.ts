import { Route } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';

export const APP_ROUTES: Route[] = [
  // ── Pública ───────────────────────────────────────────────────────────────
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },

  // ── Shell de portal ───────────────────────────────────────────────────────
  // La portada del portal es el inicio del proyecto: barra superior y tarjetas
  // hacia los aplicativos, sin sidenav.
  //
  // Ojo con el orden: esta ruta y la siguiente comparten `path: ''`. Es el
  // patrón de Angular para dos layouts en la raíz — para `/home` el router
  // intenta primero esta, sus hijos no casan con `home`, y pasa a la siguiente.
  // Si se invierte el orden, la portada deja de ser alcanzable.
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./layout/portal-layout/portal-layout.component').then(
        (m) => m.PortalLayoutComponent,
      ),
    children: [
      {
        path: '',
        pathMatch: 'full',
        title: 'Portal',
        loadComponent: () =>
          import('./pages/portal-home/portal-home.component').then(
            (m) => m.PortalHomeComponent,
          ),
      },
    ],
  },

  // ── Shell de aplicativo ───────────────────────────────────────────────────
  // El LayoutComponent envuelve las rutas del aplicativo con barra superior +
  // sidenav + header. Para añadir nuevas rutas, agregar aquí como hijas.
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./layout/layout.component').then((m) => m.LayoutComponent),
    children: [
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
