import { Route } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { authGuard } from './core/auth/auth.guard';

export const APP_ROUTES: Route[] = [
  // Ruta raíz: redirige al home si hay sesión, sino el guard redirige a /login
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  // ── Pública ───────────────────────────────────────────────────────────────
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },

  // ── Protegida con AuthGuard ───────────────────────────────────────────────
  // Usar authGuard (funcional) para control manual, o MsalGuard para flujo MSAL completo.
  // Por defecto se usa authGuard; cambiar a canActivate: [MsalGuard] si se prefiere MSAL nativo.
  {
    path: 'home',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },

  // ── 404 ───────────────────────────────────────────────────────────────────
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
];
