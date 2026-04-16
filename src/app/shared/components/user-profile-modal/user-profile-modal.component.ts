import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeComponent } from '@shared/components/badge/badge.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { IconComponent } from '@shared/components/icon/icon.component';
import { UserProfileService } from '@core/services/user-profile.service';

/**
 * Componente reutilizable para modal de información de usuario
 * 
 * Este componente elimina la duplicación de lógica de modal de usuario
 * que existía en PageHeaderCustomComponent y MobileNavPortalsComponent.
 * 
 * Responsabilidades:
 * - Mostrar información del usuario (nombre, email, rol, unidad organizacional)
 * - Botón de cerrar sesión
 * - Obtener datos del usuario desde UserProfileService
 * 
 * @example
 * ```html
 * <app-user-profile-modal
 *   [isOpen]="modalOpen()"
 *   (close)="modalOpen.set(false)"
 *   (logout)="handleLogout()">
 * </app-user-profile-modal>
 * ```
 */
@Component({
  selector: 'app-user-profile-modal',
  standalone: true,
  imports: [
    CommonModule,
    BadgeComponent,
    ButtonComponent,
    IconComponent
  ],
  templateUrl: './user-profile-modal.component.html',
  styleUrls: ['./user-profile-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileModalComponent {
  
  /**
   * Controla si el modal está abierto
   */
  isOpen = input<boolean>(false);

  /**
   * Texto del botón de cerrar sesión (personalizable)
   */
  logoutButtonText = input<string>('Cerrar sesión');

  /**
   * Mostrar u ocultar el botón de cerrar sesión
   */
  showLogoutButton = input<boolean>(true);

  /**
   * Evento emitido al cerrar el modal
   */
  close = output<void>();

  /**
   * Evento emitido al hacer click en cerrar sesión
   */
  logout = output<void>();

  // Acceso directo a los signals del UserProfileService
  readonly userName = this.userProfileService.userName;
  readonly userEmail = this.userProfileService.userEmail;
  readonly userRole = this.userProfileService.userRole;
  readonly userOU = this.userProfileService.userOrganizationalUnit;

  constructor(public userProfileService: UserProfileService) {}

  /**
   * Maneja el click en el botón de cerrar sesión
   */
  handleLogout(): void {
    this.logout.emit();
  }
}
