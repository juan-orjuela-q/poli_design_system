import {
  BrowserCacheLocation,
  InteractionType,
  IPublicClientApplication,
  LogLevel,
  PublicClientApplication,
} from '@azure/msal-browser';
import {
  MsalGuardConfiguration,
  MsalInterceptorConfiguration,
} from '@azure/msal-angular';
import { environment } from '../../environments/environment';

// ── Instancia MSAL ────────────────────────────────────────────────────────────
export function msalInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.msalClientId,
      authority: `https://login.microsoftonline.com/${environment.msalTenantId}`,
      redirectUri: environment.msalRedirectUri,
      postLogoutRedirectUri: environment.msalPostLogoutRedirectUri,
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
      storeAuthStateInCookie: false,
    },
    system: {
      loggerOptions: {
        logLevel: environment.production ? LogLevel.Error : LogLevel.Warning,
        piiLoggingEnabled: false,
      },
    },
  });
}

// ── Configuración del Guard (rutas protegidas) ────────────────────────────────
export const msalGuardConfig: MsalGuardConfiguration = {
  interactionType: InteractionType.Redirect,
  authRequest: {
    scopes: environment.msalLoginScopes,
  },
  // Ruta a la que redirigir si el usuario cancela el login
  loginFailedRoute: '/login',
};

// ── Configuración del Interceptor (agrega Bearer token a peticiones API) ─────
export const msalInterceptorConfig: MsalInterceptorConfiguration = {
  interactionType: InteractionType.Redirect,
  // Mapa de URL → scopes a solicitar para esa URL
  protectedResourceMap: new Map([
    [environment.apiUrl, [environment.msalApiScope]],
    ['https://graph.microsoft.com/v1.0/me', ['User.Read']],
  ]),
};
