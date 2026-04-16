import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IconComponent } from '@shared/components/icon/icon.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { ModalComponent } from '@shared/components/modal/modal.component';

/**
 * Pantalla de inicio CPO
 * Punto de entrada al sistema de gestión de acceso
 */
@Component({
  selector: 'app-cpo-home',
  standalone: true,
  imports: [CommonModule, IconComponent, ButtonComponent, ModalComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class CpoHomeComponent {
  
  showAuthenticatorModal = signal(false);
  
  constructor(private router: Router) {}

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  openAuthenticatorGuide(): void {
    this.showAuthenticatorModal.set(true);
  }

  closeAuthenticatorGuide(): void {
    this.showAuthenticatorModal.set(false);
  }
}
