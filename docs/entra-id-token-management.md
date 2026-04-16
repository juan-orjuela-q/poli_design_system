# 🔐 Manejo de Token con Microsoft Entra ID (Azure AD)

## 📋 Resumen Ejecutivo

Este documento explica la implementación del manejo de tokens con **Microsoft Entra ID** (anteriormente Azure AD) usando **MSAL (Microsoft Authentication Library)** en Angular. Esta implementación resuelve problemas comunes como:

- ✅ Token que se vence y deja la pantalla en blanco
- ✅ Pérdida de sesión después de inactividad prolongada
- ✅ Errores de inicialización de MSAL
- ✅ Renovación automática de tokens

---

## 🏗️ Arquitectura General

```
┌─────────────────────────────────────────────────────────────────┐
│                        FLUJO DE AUTENTICACIÓN                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. APP_INITIALIZER                                             │
│     └── msalAppInitializerFactory() ─── Inicializa MSAL        │
│                                                                  │
│  2. APP_INITIALIZER                                             │
│     └── startupInitializerFactory() ─── StartupService.init()  │
│         ├── handleRedirectPromise()                             │
│         ├── setActiveAccount()                                  │
│         └── acquireTokenSilent()                                │
│                                                                  │
│  3. INTERCEPTORES HTTP                                          │
│     ├── msalInterceptorFn ─── Inyecta token automáticamente     │
│     └── jwtInterceptorFn ─── Manejo personalizado de token      │
│                                                                  │
│  4. AuthService                                                 │
│     └── Gestiona sesión, permisos y logout                      │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📁 Archivos Clave

| Archivo | Propósito |
|---------|-----------|
| `app.config.ts` | Configuración de MSAL y APP_INITIALIZER |
| `startup.service.ts` | Inicialización de sesión y token |
| `auth.service.ts` | Gestión de autenticación y permisos |
| `msal.interceptor.ts` | Interceptor wrapper de MSAL |
| `jwt-interceptor.function.ts` | Renovación y manejo de tokens |
| `environment.ts` | Variables de configuración de MSAL |

---

## 🔧 Configuración Detallada

### 1. Variables de Entorno (`environment.ts`)

```typescript
export const environment = {
  production: false,
  apiUrl: 'https://api-poliaccess-dev.azurewebsites.net/api/v1',
  
  // ⚠️ CLAVES CRÍTICAS PARA ENTRA ID
  microsoftLoginUrl: 'https://login.microsoftonline.com',
  msalClientId: 'tu-client-id-aqui',           // ID de la aplicación registrada
  msalTenantId: 'tu-tenant-id-aqui',           // ID del tenant de Azure
  postLogoutRedirectUri: 'https://tu-sitio.com/' // URL después de logout
};
```

### 2. Configuración de MSAL (`app.config.ts`)

```typescript
// ⭐ PUNTO CLAVE 1: Inicialización de MSAL ANTES de todo
export function msalAppInitializerFactory(msalService: MsalService): () => Promise<void> {
  return () => firstValueFrom(msalService.initialize());
}

// ⭐ PUNTO CLAVE 2: StartupService después de MSAL
export function startupInitializerFactory(startupService: StartupService): () => Promise<void> {
  return () => startupService.init();
}

export const appConfig: ApplicationConfig = {
  providers: [
    // Rutas y HTTP con interceptores
    provideRouter(APP_ROUTE),
    provideHttpClient(withInterceptors([msalInterceptorFn, jwtInterceptorFn])),

    // ⭐ CRÍTICO: El orden de APP_INITIALIZER importa
    // Primero MSAL, luego StartupService
    {
      provide: APP_INITIALIZER,
      useFactory: msalAppInitializerFactory,
      deps: [MsalService],
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: startupInitializerFactory,
      deps: [StartupService],
      multi: true,
    },

    // Servicios MSAL
    MsalService,
    MsalBroadcastService,
    {
      provide: MsalInterceptor,
      useClass: MsalInterceptor,
    },

    // ⭐ CONFIGURACIÓN COMPLETA DE MSAL
    importProvidersFrom(
      MsalModule.forRoot(
        new PublicClientApplication({
          auth: {
            clientId: environment.msalClientId,
            authority: `${environment.microsoftLoginUrl}/${environment.msalTenantId}`,
            redirectUri: `${window.location.origin}/auth/login`,
          },
          cache: {
            // ⭐ CRÍTICO: Usar localStorage para persistencia
            cacheLocation: 'localStorage',
            // ⭐ CRÍTICO: Cookies para soporte de IE/Edge legacy
            storeAuthStateInCookie: true,
          },
        }),
        {
          interactionType: InteractionType.Redirect,
          authRequest: {
            scopes: ['acceso_empleado'],
          },
        },
        {
          interactionType: InteractionType.Redirect,
          // ⭐ MAPA DE RECURSOS PROTEGIDOS
          protectedResourceMap: new Map<string, string[]>([
            [environment.apiUrl, [`api://${environment.msalClientId}/acceso_empleado`]],
            [environment.apiPortals, [`api://${environment.msalClientId}/acceso_empleado`]],
          ]),
        }
      )
    ),
  ],
};
```

---

## 🚀 StartupService: Inicialización de Sesión

Este servicio es **crítico** para el manejo correcto del token:

```typescript
@Injectable({ providedIn: 'root' })
export class StartupService {
  private msal = inject(MsalService);
  private http = inject(HttpClient);
  private _auth = inject(AuthService);

  async init(): Promise<void> {
    try {
      // ⭐ PASO 1: Esperar inicialización completa de MSAL
      await firstValueFrom(this.msal.initialize());

      // ⭐ PASO 2: Manejar el redirect después del login
      // (Esto captura el token cuando vuelve de Microsoft)
      const redirectResult = await this.msal.instance.handleRedirectPromise();

      // PASO 3: Si el redirect devuelve cuenta, usarla
      if (redirectResult?.account) {
        this.msal.instance.setActiveAccount(redirectResult.account);
      }

      // ⭐ PASO 4: Buscar cuenta activa o usar la primera de la caché
      let account = this.msal.instance.getActiveAccount();
      if (!account) {
        const allAccounts = this.msal.instance.getAllAccounts();
        if (allAccounts.length > 0) {
          account = allAccounts[0];
          this.msal.instance.setActiveAccount(account);
        }
      }

      // Sin cuenta = usuario no logueado
      if (!account) {
        console.warn('[StartupService] No hay cuenta activa.');
        return;
      }

      // ⭐ PASO 5: OBTENER TOKEN SILENCIOSAMENTE
      // Esto renueva el token automáticamente si está vencido
      const result = await this.msal.instance.acquireTokenSilent({
        account,
        scopes: [`api://${environment.msalClientId}/acceso_empleado`],
      });

      const token = result.accessToken;

      // PASO 6: Cargar datos del usuario
      const response = await firstValueFrom(
        this.http.get<StandardResponse<any>>(`${environment.apiUrl}/Users/me/permissions`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      );

      this._auth.setUserSessionData(response?.data?.user, response?.data?.permissions);

    } catch (err: any) {
      console.error('[StartupService] Error en init:', err);

      // ⭐ MANEJO DE ERRORES CRÍTICO
      if (
        err instanceof InteractionRequiredAuthError ||
        (err instanceof BrowserAuthError && err.errorCode === 'monitor_window_timeout')
      ) {
        // Token no renovable silenciosamente = redirigir a login
        console.warn('[StartupService] Redirigiendo a login interactivo...');
        this.msal.loginRedirect({
          scopes: [''],
        });
      }
    }
  }
}
```

---

## 🔄 JWT Interceptor: Renovación Automática de Token

El interceptor garantiza que **cada petición HTTP tenga un token válido**:

```typescript
export const jwtInterceptorFn: HttpInterceptorFn = (req, next) => {
  // Solo interceptar peticiones a nuestro API
  if (!req.url.startsWith(environment.apiUrl)) {
    return next(req);
  }

  const msalService = inject(MsalService);
  const authService = inject(AuthService);

  return from(getValidToken(req.url, msalService, authService)).pipe(
    switchMap((token: string | null) => {
      if (token) {
        // Clonar la petición con el token
        const clonedReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
        return next(clonedReq);
      }
      // Sin token, enviar sin autorización
      return next(req);
    }),
    catchError((error: HttpErrorResponse) => {
      console.error('❌ Error en petición HTTP:', error.status, error.message);
      return throwError(() => error);
    })
  );
};

async function getValidToken(
  requestUrl: string, 
  msalService: MsalService, 
  authService: AuthService
): Promise<string | null> {
  try {
    // ⭐ SIEMPRE inicializar MSAL antes de usarlo
    await msalService.instance.initialize();
    
    const account = msalService.instance.getActiveAccount();
    
    if (!account) {
      console.warn('⚠️ No hay cuenta activa. Cerrando sesión.');
      authService.signOut();
      return null;
    }

    try {
      // ⭐ RENOVACIÓN SILENCIOSA DEL TOKEN
      const result: AuthenticationResult = await msalService.instance.acquireTokenSilent({
        scopes: [`api://${environment.msalClientId}/acceso_empleado`],
        account,
      });

      return result.accessToken;
      
    } catch (err) {
      console.warn('❌ Error al renovar el token:', err);

      // ⭐ Si requiere interacción, cerrar sesión y forzar re-login
      if (err instanceof InteractionRequiredAuthError) {
        authService.signOut();
      }
      return null;
    }
  } catch (msalError) {
    console.error('❌ Error al inicializar MSAL:', msalError);
    return null;
  }
}
```

---

## 🛡️ AuthService: Inicialización Segura

El AuthService espera a que MSAL esté listo antes de usarlo:

```typescript
@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private msalService: MsalService, 
    private _hasService: CryptoService,
    private userPermissionsService: UserPermissionsService
  ) {
    // ⭐ NO usar MSAL inmediatamente - esperar inicialización
    this.waitForMsalInitialization();
  }

  private async waitForMsalInitialization(): Promise<void> {
    try {
      // ⭐ CRÍTICO: Esperar inicialización de MSAL
      await this.msalService.instance.initialize();
      console.log('✅ MSAL inicializado correctamente');
      
      // Ahora sí podemos usar MSAL
      this.initializeUserPermissions();
    } catch (error) {
      console.error('❌ Error al inicializar MSAL:', error);
      // Fallback: usar permisos de localStorage
      this.initializeUserPermissionsWithoutMsal();
    }
  }

  // ⭐ Fallback cuando MSAL no está disponible
  private initializeUserPermissionsWithoutMsal(): void {
    try {
      this.userPermissionsService.reloadPermissionsFromStorage();
    } catch (error) {
      console.error('❌ Error en fallback:', error);
    }
  }

  public signOut(): void {
    // Limpiar datos locales
    localStorage.removeItem(USER);
    localStorage.removeItem(PERMISSIONS);
    this.userPermissionsService.clearPermissions();
    
    // ⭐ Logout con MSAL
    this.msalService.logoutRedirect({
      postLogoutRedirectUri: environment.postLogoutRedirectUri
    });
  }
}
```

---

## ⚠️ Problemas Comunes y Soluciones

### 1. **Pantalla en Blanco Después de Inactividad**

**Causa:** El token expiró y no se renovó correctamente.

**Solución implementada:**
```typescript
// En jwt-interceptor.function.ts
const result = await msalService.instance.acquireTokenSilent({
  scopes: [...],
  account,
});
```
`acquireTokenSilent()` renueva el token automáticamente si está vencido.

### 2. **Error: "uninitialized_public_client_application"**

**Causa:** Se usa MSAL antes de inicializarlo.

**Solución implementada:**
```typescript
// Siempre inicializar antes de usar
await msalService.instance.initialize();
```

### 3. **Token Vacío o Null**

**Causa:** No hay cuenta activa o el token no se pudo renovar.

**Solución implementada:**
```typescript
// Buscar cuenta en caché si no hay activa
let account = this.msal.instance.getActiveAccount();
if (!account) {
  const allAccounts = this.msal.instance.getAllAccounts();
  if (allAccounts.length > 0) {
    account = allAccounts[0];
    this.msal.instance.setActiveAccount(account);
  }
}
```

### 4. **Pérdida de Sesión al Refrescar la Página**

**Solución:** Configurar `cacheLocation: 'localStorage'` y `storeAuthStateInCookie: true`:
```typescript
cache: {
  cacheLocation: 'localStorage',  // Persiste entre recargas
  storeAuthStateInCookie: true,   // Soporte adicional
},
```

### 5. **InteractionRequiredAuthError**

**Causa:** El token no se puede renovar silenciosamente (sesión expirada, cambio de contraseña, etc.)

**Solución implementada:**
```typescript
if (err instanceof InteractionRequiredAuthError) {
  // Redirigir a login interactivo
  this.msal.loginRedirect({ scopes: [] });
}
```

---

## 📊 Flujo Completo de Token

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         CICLO DE VIDA DEL TOKEN                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  INICIO DE APLICACIÓN                                                    │
│  ├── 1. APP_INITIALIZER ejecuta msalAppInitializerFactory()             │
│  ├── 2. MSAL se inicializa completamente                                │
│  ├── 3. APP_INITIALIZER ejecuta StartupService.init()                   │
│  │      ├── handleRedirectPromise() ← Captura token de redirect         │
│  │      ├── setActiveAccount()      ← Establece cuenta activa           │
│  │      └── acquireTokenSilent()    ← Obtiene/renueva token             │
│  └── 4. Aplicación lista con sesión activa                              │
│                                                                          │
│  PETICIÓN HTTP                                                           │
│  ├── 1. jwtInterceptorFn intercepta la petición                         │
│  ├── 2. getValidToken() obtiene token actual                            │
│  │      ├── initialize() ← Verifica MSAL listo                          │
│  │      ├── getActiveAccount() ← Obtiene cuenta                         │
│  │      └── acquireTokenSilent() ← Renueva si es necesario              │
│  ├── 3. Clona petición con header Authorization: Bearer {token}         │
│  └── 4. Envía petición al API                                           │
│                                                                          │
│  TOKEN EXPIRADO (durante uso)                                            │
│  ├── 1. acquireTokenSilent() detecta expiración                         │
│  ├── 2. Intenta renovar con refresh token                               │
│  ├── 3a. ✅ Éxito → Devuelve nuevo access token                         │
│  └── 3b. ❌ Error → InteractionRequiredAuthError → Redirect a login     │
│                                                                          │
│  LOGOUT                                                                  │
│  ├── 1. AuthService.signOut() llamado                                   │
│  ├── 2. Limpia localStorage (USER, PERMISSIONS)                         │
│  ├── 3. Limpia permisos del servicio                                    │
│  └── 4. msalService.logoutRedirect() → Cierra sesión en Microsoft       │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## ✅ Checklist para Otros Proyectos

Si otro proyecto tiene problemas con el token, verificar:

### Configuración Básica
- [ ] `cacheLocation: 'localStorage'` está configurado
- [ ] `storeAuthStateInCookie: true` está configurado
- [ ] `redirectUri` coincide con el registrado en Azure Portal
- [ ] `clientId` y `tenantId` son correctos
- [ ] Los scopes están correctamente configurados

### APP_INITIALIZER
- [ ] MSAL se inicializa **PRIMERO** en APP_INITIALIZER
- [ ] `await firstValueFrom(msalService.initialize())` se ejecuta antes de usar MSAL
- [ ] `handleRedirectPromise()` se llama al inicio

### Interceptores
- [ ] El interceptor llama `await msalService.instance.initialize()` antes de usarlo
- [ ] Se usa `acquireTokenSilent()` para renovar tokens automáticamente
- [ ] Se maneja `InteractionRequiredAuthError` correctamente

### Manejo de Errores
- [ ] Fallback a localStorage si MSAL falla
- [ ] Redirect a login si el token no se puede renovar
- [ ] Logs claros para debugging

---

## 🔗 Recursos Adicionales

- [Documentación oficial MSAL Angular](https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/lib/msal-angular)
- [Microsoft Entra ID Documentation](https://learn.microsoft.com/en-us/entra/identity/)
- [Token Caching in MSAL](https://learn.microsoft.com/en-us/entra/msal/dotnet/how-to/token-cache-serialization)
- [Common MSAL Errors](https://learn.microsoft.com/en-us/entra/msal/dotnet/advanced/exceptions/msal-error-handling)

---

## 📝 Notas de Implementación

1. **Orden de Inicialización:** MSAL debe inicializarse ANTES de cualquier servicio que lo use.

2. **Token Refresh:** MSAL maneja el refresh automáticamente con `acquireTokenSilent()`. No necesitas implementar lógica de refresh manual.

3. **Múltiples APIs:** Usa `protectedResourceMap` para configurar diferentes scopes para diferentes APIs.

4. **Debugging:** Habilita logs de MSAL para debugging:
   ```typescript
   system: {
     loggerOptions: {
       logLevel: LogLevel.Verbose,
       piiLoggingEnabled: true
     }
   }
   ```

5. **Tiempo de Expiración:** Los access tokens de Azure AD típicamente expiran en 1 hora. El refresh token puede durar hasta 90 días.

---

*Documento generado el: 29 de enero de 2026*
*Versión de MSAL Angular: ^4.0.11*
