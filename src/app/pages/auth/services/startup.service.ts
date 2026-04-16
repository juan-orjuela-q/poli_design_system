import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { MsalService } from "@azure/msal-angular";
import { environment } from "environments/environment";
import { AuthService } from "./auth.service";
import { StandardResponse } from "@core/interfaces/standard-response";
import { firstValueFrom } from 'rxjs';
import {
  InteractionRequiredAuthError,
  BrowserAuthError,
  RedirectRequest,
  SilentRequest,
  AccountInfo
} from '@azure/msal-browser';
import { LanguageService } from "@core/services/language.service";
import { LIST_COUNTRIES } from "@core/constants/global.constants";
// import { PortalSection, Section, NonAcademicPortalResponse } from "@pages/dashboard/interfaces/section.interface";
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class StartupService {
  private msal = inject(MsalService);
  private http = inject(HttpClient);
  private _auth = inject(AuthService);
  private router = inject(Router);
  // private _language = inject(LanguageService);

  private readonly scopes = [`api://${environment.msalClientId}/acceso_empleado`];

  async init(): Promise<void> {
    try {
      //  1. Espera que MSAL termine su inicialización (con timeout)
      await this.withTimeout(
        firstValueFrom(this.msal.initialize()),
        10000,
        'MSAL initialization timeout'
      );

      //  2. Espera si está completando un loginRedirect (con timeout)
      const redirectResult = await this.withTimeout(
        this.msal.instance.handleRedirectPromise(),
        15000,
        'handleRedirectPromise timeout'
      );

      // 3. Si el redirect devuelve una cuenta, la usamos
      if (redirectResult?.account) {
        this.msal.instance.setActiveAccount(redirectResult.account);
      }

      //  4. Si no hay cuenta activa, intenta usar alguna de la caché
      let account = this.msal.instance.getActiveAccount();
      if (!account) {
        const allAccounts = this.msal.instance.getAllAccounts();
        if (allAccounts.length > 0) {
          account = allAccounts[0];
          this.msal.instance.setActiveAccount(account);
        }
      }

      //  Si no hay cuenta, aún no hay sesión, no forzamos login aquí
      if (!account) {
        console.warn('[StartupService] No hay cuenta activa. El usuario aún no ha iniciado sesión.');
        return;
      }

      //  5. Obtener token silencioso con fallback a ssoSilent
      const result = await this.acquireTokenWithFallback(account);

      const token = result.accessToken;

      // Llamar al nuevo servicio non-academic que no requiere información del usuario
      const apiUrl = `${environment.apiPortalesUrl}/${environment.apiPortalesVersion}/menus/non-academic/portal/${environment.portalCode}`;
      console.log('[StartupService] Llamando a API:', apiUrl);

      const response = await firstValueFrom(
        this.http.get<StandardResponse<any>>(apiUrl, {
          headers: { Authorization: `Bearer ${token}` }
        })
      );

      console.log('[StartupService] ✅ Respuesta exitosa de API:', response);
      
      // Validar que la respuesta sea exitosa
      if (!response.succeeded || !response.data) {
        console.error('[StartupService] ❌ API no devolvió datos exitosos:', response);
        return;
      }

      const portalData = response.data;
      console.log('[StartupService] Portal Code:', portalData.portalCode);
      console.log('[StartupService] Total Menus:', portalData.totalMenus);
      console.log('[StartupService] Secciones recibidas:', portalData.sections?.length || 0);

      // Validar que hay secciones
      if (!portalData.sections || portalData.sections.length === 0) {
        console.warn('[StartupService] ⚠️ No se recibieron secciones del API');
      }

      // Guardar datos del usuario de MSAL y secciones del nuevo servicio
      this._auth.setUserSessionData(
        { ...result, account: result.account },
        portalData.sections || []
      );

      console.log('[StartupService] ✅ Datos guardados en localStorage');
      // this._language.setLanguage(LIST_COUNTRIES[0].lang); // Seteamos el lenguale, es por defecto
    } catch (err: any) {
      console.error('[StartupService] Error en init:', err);

      // Manejar diferentes tipos de errores
      const shouldRedirectToLogin = 
        err instanceof InteractionRequiredAuthError ||
        (err instanceof BrowserAuthError && [
          'monitor_window_timeout',
          'interaction_in_progress',
          'no_account_error',
          'user_cancelled'
        ].includes(err.errorCode)) ||
        err?.message?.includes('timeout');

      if (shouldRedirectToLogin) {
        console.warn('[StartupService] Error recuperable. Redirigiendo al login...');
        this.clearSessionAndRedirect();
      } else {
        // Error no esperado, limpiar de todas formas
        console.error('[StartupService] Error no esperado:', err);
        this.clearSessionAndRedirect();
      }
    }
  }

  /**
   * Wrapper para agregar timeout a promesas
   */
  private withTimeout<T>(promise: Promise<T>, ms: number, errorMessage: string): Promise<T> {
    const timeout = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error(errorMessage)), ms);
    });
    return Promise.race([promise, timeout]);
  }

  /**
   * Intenta obtener token con múltiples estrategias de fallback:
   * 1. acquireTokenSilent - Intenta renovar silenciosamente
   * 2. ssoSilent - Intenta SSO si hay sesión en el navegador
   * 3. Si todo falla, lanza excepción para redirigir al login
   */
  private async acquireTokenWithFallback(account: AccountInfo) {
    const silentRequest: SilentRequest = {
      account,
      scopes: this.scopes,
    };

    try {
      // Intento 1: Token silencioso normal (con timeout de 10 segundos)
      console.log('[StartupService] 🔄 Intentando acquireTokenSilent...');
      return await this.withTimeout(
        this.msal.instance.acquireTokenSilent(silentRequest),
        10000,
        'acquireTokenSilent timeout'
      );
    } catch (silentError) {
      console.warn('[StartupService] ⚠️ acquireTokenSilent falló:', silentError);

      // Intento 2: SSO Silent (con timeout de 10 segundos)
      try {
        console.log('[StartupService] 🔄 Intentando ssoSilent...');
        const ssoResult = await this.withTimeout(
          this.msal.instance.ssoSilent({
            scopes: this.scopes,
            loginHint: account.username,
          }),
          10000,
          'ssoSilent timeout'
        );

        if (ssoResult.account) {
          this.msal.instance.setActiveAccount(ssoResult.account);
          console.log('[StartupService] ✅ ssoSilent exitoso');
          return ssoResult;
        }
      } catch (ssoError) {
        console.warn('[StartupService] ⚠️ ssoSilent falló:', ssoError);
      }

      // Si llegamos aquí, todo falló
      throw silentError;
    }
  }

  /**
   * Limpia la sesión local y redirige al login
   */
  private clearSessionAndRedirect(): void {
    console.log('[StartupService] 🧹 Limpiando sesión y redirigiendo al login...');
    localStorage.removeItem('user');
    localStorage.removeItem('sections');
    localStorage.removeItem('portal');
    localStorage.removeItem('process');
    
    // Redirigir al login
    this.router.navigate(['/auth/login']);
  }
}
