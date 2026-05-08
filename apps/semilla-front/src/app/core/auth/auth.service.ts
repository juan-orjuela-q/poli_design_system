import { inject, Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AccountInfo, SilentRequest } from '@azure/msal-browser';
import { from, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly msal = inject(MsalService);

  /** Cuenta activa del usuario o null si no hay sesión. */
  get account(): AccountInfo | null {
    return this.msal.instance.getActiveAccount() ?? this.msal.instance.getAllAccounts()[0] ?? null;
  }

  get isLoggedIn(): boolean {
    return this.msal.instance.getAllAccounts().length > 0;
  }

  /** Nombre para mostrar del usuario (nombre o email). */
  get displayName(): string {
    return this.account?.name ?? this.account?.username ?? '';
  }

  /** Inicia el flujo de login con redirección. */
  login(): void {
    this.msal.loginRedirect({ scopes: environment.msalLoginScopes });
  }

  /** Cierra la sesión con redirección. */
  logout(): void {
    this.msal.logoutRedirect();
  }

  /** Obtiene silenciosamente un token para el API backend. */
  getApiToken(): Observable<string> {
    const request: SilentRequest = {
      scopes: [environment.msalApiScope],
      account: this.account ?? undefined,
    };
    return from(
      this.msal.instance
        .acquireTokenSilent(request)
        .then((result) => result.accessToken),
    );
  }
}
