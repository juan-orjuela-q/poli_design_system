import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, from, switchMap, catchError, throwError } from 'rxjs';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult, InteractionRequiredAuthError, AccountInfo, SilentRequest } from '@azure/msal-browser';
import { environment } from 'environments/environment';
import { AuthService } from '@pages/auth/services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private readonly scopes = [`api://${environment.msalClientId}/acceso_empleado`];
  private isRefreshing = false;

  constructor(private msalService: MsalService, private _authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Verificar si la URL es de alguno de los backends protegidos
    const isApiUrl = req.url.startsWith(environment.apiUrl);
    const isPortalesUrl = req.url.startsWith(environment.apiPortalesUrl);
    
    console.log('🔍 JWT Interceptor:', { 
      url: req.url, 
      apiUrl: environment.apiUrl, 
      apiPortalesUrl: environment.apiPortalesUrl,
      matchApi: isApiUrl,
      matchPortales: isPortalesUrl
    });
    
    // Si la URL NO es de ningún backend protegido, deja pasar la petición sin token
    if (!isApiUrl && !isPortalesUrl) {
      console.log('⚠️ URL no coincide con ningún backend protegido, pasando sin token');
      return next.handle(req);
    }

    console.log('✅ URL coincide, obteniendo token...');
    return from(this.getValidToken()).pipe(
      switchMap((token: string | null) => {
        if (token) {
          console.log('🔐 Token obtenido, agregando header Authorization');
          const clonedReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            },
          });
          return next.handle(clonedReq);
        }

        console.warn('❌ No se pudo obtener token');
        // Si no hay token, se envía la petición tal cual
        return next.handle(req);
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  private async getValidToken(): Promise<string | null> {
    // Paso 1: Intentar obtener cuenta activa
    let account = this.msalService.instance.getActiveAccount();
    
    // Paso 2: Si no hay cuenta activa, intentar recuperar de la caché
    if (!account) {
      console.warn('[JwtInterceptor] No hay cuenta activa, buscando en caché...');
      const allAccounts = this.msalService.instance.getAllAccounts();
      if (allAccounts.length > 0) {
        account = allAccounts[0];
        this.msalService.instance.setActiveAccount(account);
        console.log('[JwtInterceptor] ✅ Cuenta recuperada de caché:', account.username);
      }
    }

    // Si no hay cuenta en ningún lado, redirigir al login
    if (!account) {
      console.warn('[JwtInterceptor] ❌ No hay cuenta disponible. Redirigiendo al login...');
      this._authService.signOut();
      return null;
    }

    // Paso 3: Intentar obtener token con fallback
    return this.acquireTokenWithFallback(account);
  }

  /**
   * Intenta obtener token con múltiples estrategias de fallback:
   * 1. acquireTokenSilent - Intenta renovar silenciosamente
   * 2. ssoSilent - Intenta SSO si hay sesión en el navegador
   * 3. Si todo falla, redirige al login
   */
  private async acquireTokenWithFallback(account: AccountInfo): Promise<string | null> {
    const silentRequest: SilentRequest = {
      account,
      scopes: this.scopes,
    };

    try {
      // Intento 1: Token silencioso normal
      const result = await this.msalService.instance.acquireTokenSilent(silentRequest);
      return result.idToken;
    } catch (silentError) {
      console.warn('[JwtInterceptor] ⚠️ acquireTokenSilent falló:', silentError);

      // Evitar múltiples intentos de refresh simultáneos
      if (this.isRefreshing) {
        console.log('[JwtInterceptor] Ya hay un refresh en progreso...');
        return null;
      }

      this.isRefreshing = true;

      try {
        // Intento 2: SSO Silent
        console.log('[JwtInterceptor] 🔄 Intentando ssoSilent...');
        const ssoResult = await this.msalService.instance.ssoSilent({
          scopes: this.scopes,
          loginHint: account.username,
        });

        if (ssoResult.account) {
          this.msalService.instance.setActiveAccount(ssoResult.account);
          console.log('[JwtInterceptor] ✅ ssoSilent exitoso');
          this.isRefreshing = false;
          return ssoResult.idToken;
        }
      } catch (ssoError) {
        console.warn('[JwtInterceptor] ⚠️ ssoSilent falló:', ssoError);
      }

      this.isRefreshing = false;

      // Si llegamos aquí, todo falló - redirigir al login
      if (silentError instanceof InteractionRequiredAuthError) {
        console.warn('[JwtInterceptor] 🔒 Interacción requerida. Redirigiendo al login...');
        this._authService.signOut();
      }

      return null;
    }
  }
}
