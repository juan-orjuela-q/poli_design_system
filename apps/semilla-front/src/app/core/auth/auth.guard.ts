import { CanActivateFn } from '@angular/router';

/**
 * AuthGuard — TEMPORALMENTE DESHABILITADO para desarrollo local.
 * Restaurar cuando MSAL esté configurado con el tenant real.
 */
export const authGuard: CanActivateFn = () => true;
