import { HttpHandler, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MsalInterceptor } from '@azure/msal-angular';

/**
 * Wrapper funcional sobre MsalInterceptor (clase) para ser usado con
 * `withInterceptors([])` en lugar de `withInterceptorsFromDi()`.
 *
 * Lee la configuración desde MSAL_INTERCEPTOR_CONFIG (definido en msal.config.ts):
 * - protectedResourceMap: qué URLs requieren token y con qué scopes
 *
 * Solo adjunta el Bearer token a URLs que coincidan con protectedResourceMap.
 * Las peticiones a assets, i18n u otras URLs externas pasan sin token.
 */
export const msalInterceptorFn: HttpInterceptorFn = (req, next) => {
  const interceptor = inject(MsalInterceptor);
  const handler: HttpHandler = { handle: next };
  return interceptor.intercept(req, handler);
};
