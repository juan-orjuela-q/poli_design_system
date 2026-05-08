import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';

/**
 * AuthGuard — protege rutas que requieren sesión activa de Entra ID.
 *
 * Uso en rutas:
 *   { path: 'dashboard', canActivate: [authGuard], loadComponent: ... }
 *
 * Si no hay cuenta activa, redirige a /login.
 * MSAL también puede gestionar esto automáticamente con MsalGuard si se prefiere.
 */
export const authGuard: CanActivateFn = () => {
  const msal = inject(MsalService);
  const router = inject(Router);

  const accounts = msal.instance.getAllAccounts();
  if (accounts.length > 0) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
