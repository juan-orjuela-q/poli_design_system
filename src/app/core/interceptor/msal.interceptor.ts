import { HttpHandler, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MsalInterceptor } from '@azure/msal-angular';

export const msalInterceptorFn: HttpInterceptorFn = (req, next) => {
  const interceptor = inject(MsalInterceptor);
  const handler: HttpHandler = { handle: next };
  return interceptor.intercept(req, handler);
};
