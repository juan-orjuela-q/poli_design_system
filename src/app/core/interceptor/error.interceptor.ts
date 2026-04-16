import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '@pages/auth/services/auth.service';

// Flag global para evitar múltiples redirects
let isHandling401 = false;

// Función para mostrar el toast de sesión expirada
function showSessionExpiredMessage(): void {
  const existingToast = document.querySelector('[data-session-toast]');
  if (existingToast) return;

  const toast = document.createElement('div');
  toast.setAttribute('data-session-toast', 'true');
  toast.innerHTML = `
    <div style="
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #0f385a 0%, #165386 100%);
      color: white;
      padding: 16px 24px;
      border-radius: 8px;
      box-shadow: 0 8px 32px rgba(15, 56, 90, 0.3);
      z-index: 10000;
      font-family: 'Poppins', sans-serif;
      display: flex;
      align-items: center;
      gap: 12px;
      animation: slideIn 0.3s ease-out;
    ">
      <span style="font-size: 24px;">🔒</span>
      <div>
        <div style="font-weight: 600; margin-bottom: 4px;">Sesión expirada</div>
        <div style="font-size: 14px; opacity: 0.9;">Redirigiendo al inicio de sesión...</div>
      </div>
    </div>
    <style>
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    </style>
  `;
  document.body.appendChild(toast);
}

// Interceptor funcional para usar con withInterceptors()
export const errorInterceptorFn: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !isHandling401) {
        isHandling401 = true;
        console.warn('🔒 [ErrorInterceptor] Error 401 - Sesión expirada o no autorizado');
        console.warn('🔒 [ErrorInterceptor] URL que falló:', req.url);
        
        showSessionExpiredMessage();
        
        setTimeout(() => {
          authService.signOut();
          isHandling401 = false;
        }, 1500);
      } else if (error.status === 403) {
        console.warn('🚫 [ErrorInterceptor] Error 403 - Acceso denegado');
      } else if (error.status === 0) {
        console.error('🌐 [ErrorInterceptor] Error de red - No se pudo conectar al servidor');
      }

      return throwError(() => error);
    })
  );
};
