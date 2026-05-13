# Restaurar autenticación MSAL

La autenticación fue deshabilitada temporalmente para desarrollo local porque
el tenant de Entra ID aún no está configurado. Este documento describe cómo
reactivarla cuando los datos del tenant estén disponibles.

---

## Prerrequisitos

Antes de restaurar, completar los valores reales en `src/environments/environment.ts`:

```typescript
msalClientId: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',  // Application (client) ID
msalTenantId: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',  // Directory (tenant) ID
msalRedirectUri: 'http://localhost:4200',
msalPostLogoutRedirectUri: 'http://localhost:4200/login',
msalLoginScopes: ['openid', 'profile', 'User.Read'],
msalApiScope: 'api://<app-id>/.default',
```

En `src/environments/environment.prod.ts` usar las URIs de producción.

Estos valores se obtienen en **Azure Portal → Entra ID → App registrations →
tu aplicación → Overview**.

---

## Archivos a restaurar

### 1. `src/app/core/auth/auth.guard.ts`

Reemplazar el contenido actual (siempre `true`) por la guarda real:

```typescript
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn) {
    return true;
  }

  // Redirigir al login si no hay sesión activa
  return router.createUrlTree(['/login']);
};
```

---

### 2. `src/app/core/auth/startup.service.ts`

Reemplazar el no-op por la inicialización MSAL real. Este servicio se ejecuta
como `APP_INITIALIZER` fase 2 (después de que `msalInitializerFactory` ya
inicializó la instancia MSAL en fase 1):

```typescript
import { inject, Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StartupService {
  private readonly msal = inject(MsalService);

  async init(): Promise<void> {
    // Completa el flujo de redirect (si el usuario viene de login/logout)
    await firstValueFrom(this.msal.handleRedirectObservable());

    // Establece la cuenta activa para que account() funcione en toda la app
    const accounts = this.msal.instance.getAllAccounts();
    if (accounts.length > 0 && !this.msal.instance.getActiveAccount()) {
      this.msal.instance.setActiveAccount(accounts[0]);
    }
  }
}
```

---

### 3. `src/app/core/services/user-profile.service.ts`

Reemplazar los datos mock por señales computadas desde la cuenta MSAL activa:

```typescript
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AccountInfo } from '@azure/msal-browser';

export interface UserProfile {
  name: string;
  email: string;
  initials: string;
}

@Injectable({ providedIn: 'root' })
export class UserProfileService {
  private readonly msal = inject(MsalService);

  /** Cuenta activa sincronizada como signal */
  private readonly account = signal<AccountInfo | null>(
    this.msal.instance.getActiveAccount(),
  );

  constructor() {
    // Actualiza el signal cuando MSAL cambia la cuenta activa
    // (login en otra pestaña, refresh de token, etc.)
    effect(() => {
      this.account.set(this.msal.instance.getActiveAccount());
    });
  }

  readonly name = computed(() => this.account()?.name ?? '');
  readonly email = computed(() => this.account()?.username ?? '');
  readonly initials = computed(() => {
    const n = this.name();
    if (!n) return '?';
    const parts = n.trim().split(/\s+/);
    return parts.length >= 2
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : n.slice(0, 2).toUpperCase();
  });

  readonly profile = computed<UserProfile>(() => ({
    name: this.name(),
    email: this.email(),
    initials: this.initials(),
  }));
}
```

---

## Qué NO necesita cambios

Estos archivos ya tienen la implementación MSAL completa y no fueron modificados:

| Archivo | Estado |
|---|---|
| `src/app/app.config.ts` | ✅ Proveedores MSAL completos |
| `src/app/core/auth/msal.config.ts` | ✅ Configuración completa |
| `src/app/core/auth/auth.service.ts` | ✅ Login/logout/token helpers |
| `src/app/app.component.ts` | ✅ Escucha LOGIN_SUCCESS broadcast |
| `src/app/core/interceptor/msal.interceptor.ts` | ✅ Adjunta Bearer token |

---

## Verificación

Después de restaurar los 3 archivos y completar el `environment.ts`:

```bash
# Desde apps/semilla-front/
npx ng build --no-progress
```

La build debe completar sin errores. Al ejecutar `ng serve`, el navegador
redirigirá a la página de login de Microsoft en lugar de cargar la app directamente.
