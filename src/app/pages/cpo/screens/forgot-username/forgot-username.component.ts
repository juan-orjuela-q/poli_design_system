import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonComponent } from '@shared/components/button/button.component';
import { BreadcrumbComponent, BreadcrumbItem } from '@shared/components/breadcrumb/breadcrumb.component';
import { IconComponent } from '@shared/components/icon/icon.component';
import { FormInputComponent, InputStatus } from '@shared/components/form-input/form-input.component';
import { RadioGroupComponent, RadioOption } from '@shared/components/radio-group/radio-group.component';
import { AlertComponent } from '@shared/components/alert/alert.component';
import { ModalComponent } from '@shared/components/modal/modal.component';

type ViewState = 'form' | 'success' | 'error';

@Component({
  selector: 'app-forgot-username',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    BreadcrumbComponent,
    IconComponent,
    FormInputComponent,
    RadioGroupComponent,
    AlertComponent,
    ModalComponent
  ],
  templateUrl: './forgot-username.component.html',
  styleUrls: ['./forgot-username.component.scss']
})
export class ForgotUsernameComponent {
  
  // Breadcrumb
  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Inicio', route: '/cpo/home' },
    { label: '¿Olvidaste tu usuario?' }
  ];

  // Título y descripción
  pageTitle = '¿Olvidaste tu usuario?';
  pageSubtitle = 'Recupera o consulta tu nombre de usuario para poder iniciar sesión en el sistema.';

  // Estado de la vista
  currentView = signal<ViewState>('form');

  // Modal de ayuda
  showHelpModal = signal(false);

  // Formulario
  formGroup: FormGroup;
  formSubmitted = signal(false);

  // Opciones de rol
  roleOptions: RadioOption[] = [
    { value: 'estudiante', label: 'Estudiante' },
    { value: 'docente_admin', label: 'Docente / Administrativo' }
  ];

  // Email enmascarado para mostrar en éxito
  maskedEmail = signal('');

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.formGroup = this.fb.group({
      documentNumber: ['', [Validators.required, Validators.minLength(3)]],
      role: ['', Validators.required]
    });
  }

  // ========================================
  // Getters de validación
  // ========================================
  get documentNumber() {
    return this.formGroup.get('documentNumber');
  }

  get role() {
    return this.formGroup.get('role');
  }

  get documentNumberStatus(): InputStatus {
    if (!this.formSubmitted()) return 'default';
    return this.documentNumber?.invalid ? 'error' : 'default';
  }

  get documentNumberMessage(): string {
    if (!this.formSubmitted() || this.documentNumber?.valid) return '';
    if (this.documentNumber?.errors?.['required']) return 'El número de documento es obligatorio';
    if (this.documentNumber?.errors?.['minlength']) return 'El número de documento debe tener al menos 3 caracteres';
    return '';
  }

  get roleStatus(): InputStatus {
    if (!this.formSubmitted()) return 'default';
    return this.role?.invalid ? 'error' : 'default';
  }

  get roleMessage(): string {
    if (!this.formSubmitted() || this.role?.valid) return '';
    if (this.role?.errors?.['required']) return 'Debes seleccionar tu rol';
    return '';
  }

  // ========================================
  // Acciones del formulario
  // ========================================
  onSubmit(): void {
    this.formSubmitted.set(true);
    this.formGroup.markAllAsTouched();

    if (this.formGroup.valid) {
      console.log('Buscando usuario con:', this.formGroup.value);
      
      // Simular búsqueda en el backend
      // Por ahora siempre mostramos éxito, pero podrías cambiar esta lógica
      const foundUser = this.simulateUserSearch();
      
      if (foundUser) {
        this.maskedEmail.set(foundUser.email);
        this.currentView.set('success');
      } else {
        this.currentView.set('error');
      }
      
      this.formSubmitted.set(false);
    }
  }

  // Simulación de búsqueda de usuario
  private simulateUserSearch(): { email: string } | null {
    // Aquí iría la llamada real al backend
    // Por ahora retornamos un email simulado
    const documentNumber = this.documentNumber?.value;
    
    // Simular que algunos documentos no existen
    if (documentNumber === '0013') {
      return null; // Usuario no encontrado
    }
    
    // Simular email enmascarado
    return {
      email: 'orj****@gmail.com'
    };
  }

  onBackToForm(): void {
    this.currentView.set('form');
    this.formGroup.reset();
  }

  onReturnToHome(): void {
    this.router.navigate(['/cpo/home']);
  }

  // ========================================
  // Modal de ayuda
  // ========================================
  openHelpModal(): void {
    this.showHelpModal.set(true);
  }

  closeHelpModal(): void {
    this.showHelpModal.set(false);
  }
}
