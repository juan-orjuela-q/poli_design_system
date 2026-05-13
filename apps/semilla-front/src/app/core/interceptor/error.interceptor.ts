import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';

/**
 * errorInterceptorFn — intercepta errores HTTP globales.
 *
 * | Código | Acción                                          |
 * |--------|-------------------------------------------------|
 * | 401    | Sesión expirada → logout y redirect a /login    |
 * | 403    | Sin permisos → redirect a /forbidden            |
 * | 0      | Sin conexión / CORS → log de advertencia        |
 * | resto  | Re-lanza el error para que el servicio lo maneje|
 *
 * Registrar en app.config.ts con `withInterceptors([errorInterceptorFn])`.
 */
export const errorInterceptorFn: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      switch (error.status) {
        case 401:
          // Token expirado o inválido — cerrar sesión y volver al login
          auth.logout();
          break;
        case 403:
          // Autenticado pero sin permisos — redirigir a página de acceso denegado
          router.navigate(['/forbidden']);
          break;
        case 0:
          // Sin conexión a internet o error de CORS
          console.warn('[ErrorInterceptor] Sin conexión o error de red.', error);
          break;
      }
      return throwError(() => error);
    }),
  );
};
