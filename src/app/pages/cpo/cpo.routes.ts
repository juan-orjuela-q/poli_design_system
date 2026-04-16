import { Route } from "@angular/router";

/**
 * Rutas del módulo CPO (Centro de Gestión de Acceso)
 * 
 * Este módulo maneja:
 * - Recuperación de contraseña
 * - Actualización de contraseña
 * - Recuperación de usuario
 */
export const CPO_ROUTES: Route[] = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "home",
    loadComponent: () => 
      import('./screens/home/home.component').then(m => m.CpoHomeComponent)
  },
  {
    path: "forgot-password",
    loadComponent: () => 
      import('./screens/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
  },
  {
    path: "change-password",
    loadComponent: () => 
      import('./screens/change-password/change-password.component').then(m => m.ChangePasswordComponent)
  },
  {
    path: "forgot-username",
    loadComponent: () => 
      import('./screens/forgot-username/forgot-username.component').then(m => m.ForgotUsernameComponent)
  },
];
