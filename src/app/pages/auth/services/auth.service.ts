import { Injectable, Optional } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { PERMISSIONS, SECTIONS, USER } from '@core/constants/global.constants';
import { CryptoService } from '@core/services/crypto.service';
// import { Section } from '@pages/dashboard/interfaces/section.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(@Optional() private msalService: MsalService | null, private _hasService: CryptoService) { }


  /**
   * Valida el inicio de sesion de los usuarios
   * @return {*}  {Promise<boolean>}
   * @memberof AuthService
   */

  async handleRedirectAndFetchUser(): Promise<any | null> {
    if (!this.msalService) {
      console.warn('⚠️ [AuthService] MSAL no disponible - modo sin autenticación');
      return null;
    }

    const msal = this.msalService; // Variable local para type safety
    const result = await msal.instance.handleRedirectPromise();

    if (result) {
      msal.instance.setActiveAccount(result.account);
    }

    const account = msal.instance.getActiveAccount();
    if (!account) {
      msal.loginRedirect();
      return null;
    }

    // Retorna los datos básicos del usuario
    return account;
  }


  /**
   *  Setea los datos del usuario
   * @param user
   * @param permisos
   */
  public setUserSessionData(user: any, sections: any[]): void {
    localStorage.setItem(USER, this._hasService.encrypt(JSON.stringify(user)));
    localStorage.setItem(SECTIONS, this._hasService.encrypt(JSON.stringify(sections)));
  }

  /**
   * Obtiene los datos del usuario
   * @returns
   */
  public getUser(): any {
    const user = localStorage.getItem(USER);
    return user ? this._hasService.decrypt(user) : null;
  }

  /**
   * Obtiene los permsiso del usuario
   * @returns
   */
  public getPermisos(): any {
    const permisos = localStorage.getItem(PERMISSIONS);
    return permisos ? this._hasService.decrypt(permisos) : [];
  }

  /**
   * Obtiene las secciones del usuario
   * @returns
   */
  public getSections(): any[] {
    const sections = localStorage.getItem(SECTIONS);
    return sections ? this._hasService.decrypt(sections) : [];
  }

  /**
   * Cerrar sesion
   * @memberof AuthService
   */
  public signOut(): void {
    // Borrar manualmente el localStorage
    localStorage.removeItem(USER);
    localStorage.removeItem(PERMISSIONS);
    localStorage.removeItem(SECTIONS);
    
    if (!this.msalService) {
      console.warn('⚠️ [AuthService] MSAL no disponible - redirigiendo a raíz');
      window.location.href = '/';
      return;
    }
    
    // Logout redirige a la raíz según postLogoutRedirectUri configurado en app.config.ts
    const msal = this.msalService;
    msal.logoutRedirect({
      postLogoutRedirectUri: window.location.origin + '/'
    });
  }
}

