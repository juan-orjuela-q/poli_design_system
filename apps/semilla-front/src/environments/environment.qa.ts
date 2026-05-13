export const environment = {
  production: false,
  apiUrl: 'https://api-tu-servicio-qa.azurewebsites.net/api/',
  apiVersion: 'v1',
  // ── MSAL / Entra ID ──────────────────────────────────────────
  msalClientId: 'REEMPLAZAR-CON-CLIENT-ID',
  msalTenantId: 'REEMPLAZAR-CON-TENANT-ID',
  msalRedirectUri: 'https://tu-app-qa.azurestaticapps.net',
  msalPostLogoutRedirectUri: 'https://tu-app-qa.azurestaticapps.net/login',
  msalLoginScopes: ['openid', 'profile', 'User.Read'],
  msalApiScope: 'api://REEMPLAZAR-CON-API-SCOPE/.default',
};
