export const environment = {
  production: false,
  apiUrl: 'https://api-tu-servicio-dev.azurewebsites.net/api/',
  apiVersion: 'v1',
  // ── MSAL / Entra ID ──────────────────────────────────────────
  // Reemplazar con los valores reales del registro de app en Azure Portal
  msalClientId: 'REEMPLAZAR-CON-CLIENT-ID',
  msalTenantId: 'REEMPLAZAR-CON-TENANT-ID',
  msalRedirectUri: 'http://localhost:4200',
  msalPostLogoutRedirectUri: 'http://localhost:4200/login',
  // Scopes que la app solicita al iniciar sesión
  msalLoginScopes: ['openid', 'profile', 'User.Read'],
  // Scope del API backend (ejemplo: 'api://<app-id>/.default')
  msalApiScope: 'api://REEMPLAZAR-CON-API-SCOPE/.default',
};
