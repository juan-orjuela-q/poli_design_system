import { CommonModule } from '@angular/common';
import { Component, signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { AvatarComponent } from '@shared/components/avatar/avatar.component';
import { HeaderComponent } from '@shared/components/header/header.component';
import { RightModalComponent } from '@shared/components/right-modal/right-modal.component';
import { UserProfileModalComponent } from '@shared/components/user-profile-modal/user-profile-modal.component';
import { NAVIGATION_CONFIG } from '@core/constants/navigation.config';

/**
 * Componente de header para CPO (sin dependencias MSAL)
 * 
 * Versión de PageHeaderCustomComponent sin dependencias de autenticación
 * - No usa UserProfileService ni AuthService
 * - Información de usuario estática
 * - Mantiene la misma estructura visual del original
 */
@Component({
  selector: 'app-page-header-cpo',
  templateUrl: './page-header-cpo.component.html',
  styleUrls: ['./page-header-cpo.component.scss'],
  imports: [
    HeaderComponent,
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    RightModalComponent,
    UserProfileModalComponent
  ]
})
export class PageHeaderCpoComponent {
  
  // Datos estáticos para CPO (sin autenticación)
  userName = signal('Usuario');
  userRole = signal('CPO');
  userInitials = signal('U');
  
  // Signal para controlar la apertura del modal derecho
  rightModalOpen: WritableSignal<boolean> = signal(false);
  
  // Configuración desde archivo centralizado
  readonly config = NAVIGATION_CONFIG;

  constructor(
    private readonly router: Router
  ) {}

  /**
   * Maneja el click en el avatar
   * Abre el modal de información
   */
  onAvatarClick(): void {
    this.toggleRightModal();
  }

  /**
   * Abre el modal derecho
   */
  openRightModal(): void {
    this.rightModalOpen.set(true);
  }

  /**
   * Cierra el modal derecho
   */
  closeRightModal(): void {
    this.rightModalOpen.set(false);
  }

  /**
   * Alterna el estado del modal derecho
   */
  toggleRightModal(): void {
    this.rightModalOpen.update(v => !v);
  }

  /**
   * Maneja el cierre de sesión
   * En CPO solo redirige al inicio
   */
  signOut(): void {
    this.router.navigate(['/']);
  }

  /**
   * Navega al dashboard de CPO
   */
  goToDashboard(): void {
    this.router.navigate(['/cpo']);
  }

}
