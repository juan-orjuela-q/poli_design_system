import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@pages/auth/services/auth.service';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '@shared/components/loader/loader.component';

@Component({
  selector: 'app-login',
  imports: [CommonModule, LoaderComponent],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  userWithoutSystemAccess: boolean = false;
  isAuthenticating: boolean = true;
  errorMessage: string = '';
  private readonly AUTH_TIMEOUT = 30000; // 30 segundos de timeout

  constructor(
    private readonly router: Router,
    private readonly _auth: AuthService,
  ) { }


  ngOnInit() {
    this.validate();
  }

  /**
   * Valida si el usuario ya tiene una sesión activa o redirige
   * al usuario a la pantalla de autenticación.
   *
   * Si el usuario ya tiene una sesión activa, lo redirigimos
   * a la pantalla principal. De lo contrario, cambiamos
   * el estado de `userWithoutSystemAccess` a `true`.
   *
   * @returns {Promise<void>}
   */
  async validate(): Promise<void> {
    // Timeout de seguridad para evitar pantalla en blanco infinita
    const timeoutId = setTimeout(() => {
      console.error('[LoginComponent] Timeout de autenticación alcanzado');
      this.isAuthenticating = false;
      this.errorMessage = 'El proceso de autenticación tardó demasiado. Por favor, recarga la página.';
    }, this.AUTH_TIMEOUT);

    try {
      const user = await this._auth.handleRedirectAndFetchUser();
      
      if (user) {
        clearTimeout(timeoutId);
        // Verificar que también tenga datos de sesión (sections)
        const sections = this._auth.getSections();
        
        if (sections && sections.length > 0) {
          // Usuario autenticado con datos completos
          // Verificar si hay una URL guardada para redirección
          const redirectUrl = sessionStorage.getItem('redirectUrl');
          
          if (redirectUrl && redirectUrl !== '/auth/login') {
            console.log('[LoginComponent] Usuario autenticado, redirigiendo a:', redirectUrl);
            sessionStorage.removeItem('redirectUrl');
            this.router.navigateByUrl(redirectUrl);
          } else {
            console.log('[LoginComponent] Usuario autenticado con datos, navegando a /main');
            this.router.navigate(['/main']);
          }
        } else {
          // Usuario autenticado pero sin datos - StartupService falló o no se ejecutó
          // Redirigir a /main de todas formas, el dashboard manejará el caso de no tener datos
          console.warn('[LoginComponent] Usuario autenticado pero sin secciones, navegando a /main');
          this.router.navigate(['/main']);
        }
        this.isAuthenticating = false;
      } else {
        // No hay usuario, se iniciará el proceso de login en handleRedirectAndFetchUser
        this.isAuthenticating = true;
      }
    } catch (error) {
      clearTimeout(timeoutId);
      console.error('[LoginComponent] Error en validación:', error);
      this.userWithoutSystemAccess = true;
      this.errorMessage = 'Ocurrió un error durante la autenticación. Por favor, intenta de nuevo.';
      this.isAuthenticating = false;
    }
  }

  /**
   * Reintentar autenticación
   */
  retryLogin(): void {
    this.isAuthenticating = true;
    this.userWithoutSystemAccess = false;
    this.errorMessage = '';
    // Limpiar localStorage y recargar para forzar nuevo login
    localStorage.clear();
    window.location.reload();
  }

}
