export const environment = {
  production: true,
  apiUrl: 'https://api-tu-servicio.azurewebsites.net/api/',
  apiVersion: 'v1',
  msalClientId: 'REEMPLAZAR-CON-CLIENT-ID',
  msalTenantId: 'REEMPLAZAR-CON-TENANT-ID',
  msalRedirectUri: 'https://tu-app.azurestaticapps.net',
  msalPostLogoutRedirectUri: 'https://tu-app.azurestaticapps.net/login',
  msalLoginScopes: ['openid', 'profile', 'User.Read'],
  msalApiScope: 'api://REEMPLAZAR-CON-API-SCOPE/.default',
};
