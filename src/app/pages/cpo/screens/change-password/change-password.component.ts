import { Component, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ButtonComponent } from '@shared/components/button/button.component';
import { BreadcrumbComponent, BreadcrumbItem } from '@shared/components/breadcrumb/breadcrumb.component';
import { IconComponent } from '@shared/components/icon/icon.component';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { SimpleStepperComponent } from '@shared/components/simple-stepper/simple-stepper.component';
import { FormInputComponent, InputStatus } from '@shared/components/form-input/form-input.component';
import { CodeInputComponent } from '@shared/components/code-input/code-input.component';
import { BadgeComponent } from '@shared/components/badge/badge.component';
import { AlertComponent } from '@shared/components/alert/alert.component';

/**
 * Validador personalizado que rechaza valores que contengan el símbolo @
 * Para evitar que usuarios incluyan el dominio completo
 */
function noEmailFormat(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (value && value.includes('@')) {
    return { noEmailFormat: true };
  }
  return null;
}

/**
 * Validador para verificar requisitos de contraseña
 */
function passwordRequirements(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value) return null;
  
  const errors: any = {};
  
  // Longitud entre 8 y 14 caracteres
  if (value.length < 8 || value.length > 14) {
    errors.length = true;
  }
  
  // Al menos una mayúscula
  if (!/[A-Z]/.test(value)) {
    errors.uppercase = true;
  }
  
  // Al menos una minúscula
  if (!/[a-z]/.test(value)) {
    errors.lowercase = true;
  }
  
  // Al menos un número
  if (!/[0-9]/.test(value)) {
    errors.number = true;
  }
  
  // Al menos un símbolo
  if (!/[/%&*+\-=?¡!¿]/.test(value)) {
    errors.symbol = true;
  }
  
  return Object.keys(errors).length > 0 ? errors : null;
}

/**
 * Validador para verificar restricciones de contraseña
 */
function passwordRestrictions(username: string) {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;
    
    const errors: any = {};
    
    // No debe contener nombre, usuario o identificación (simulado)
    if (username && value.toLowerCase().includes(username.toLowerCase())) {
      errors.containsUsername = true;
    }
    
    // No debe iniciar con "Poli"
    if (value.toLowerCase().startsWith('poli')) {
      errors.startsPoli = true;
    }
    
    return Object.keys(errors).length > 0 ? errors : null;
  };
}

/**
 * Validador para verificar que las contraseñas coincidan
 */
function passwordsMatch(passwordField: string) {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.parent) return null;
    
    const password = control.parent.get(passwordField)?.value;
    const confirmPassword = control.value;
    
    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    
    return null;
  };
}

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    ButtonComponent, 
    BreadcrumbComponent, 
    IconComponent,
    ModalComponent,
    SimpleStepperComponent,
    FormInputComponent,
    CodeInputComponent,
    BadgeComponent,
    AlertComponent
  ],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnDestroy {
  
  // Breadcrumb
  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Inicio', route: '/cpo/home' },
    { label: 'Cambio de clave' }
  ];
  
  // Título y descripción de la página
  pageTitle = 'Cambio de clave';
  pageSubtitle = 'Actualiza tu contraseña actual por una nueva para asegurar el acceso a tu cuenta.';
  
  // Modal de ayuda
  showHelpModal = signal(false);
  
  // Control del proceso de pasos
  currentStep = signal(1);
  totalSteps = 3;
  
  // Formulario paso 1
  step1Form: FormGroup;
  step1Submitted = signal(false);
  
  // Formulario paso 2
  step2Form: FormGroup;
  step2Submitted = signal(false);
  
  // Formulario paso 3
  step3Form: FormGroup;
  step3Submitted = signal(false);
  
  // Contador para reenvío de código
  resendCountdown = signal(60);
  private countdownInterval?: any;
  
  constructor(
    private router: Router,
    private fb: FormBuilder
  ) {
    // Inicializar formulario del paso 1
    this.step1Form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), noEmailFormat]]
    });
    
    // Inicializar formulario del paso 2
    this.step2Form = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });
    
    // Inicializar formulario del paso 3
    this.step3Form = this.fb.group({
      newPassword: ['', [Validators.required, passwordRequirements, passwordRestrictions('')]],
      confirmPassword: ['', [Validators.required, passwordsMatch('newPassword')]]
    });
    
    // Re-validar confirmPassword cuando newPassword cambie
    this.step3Form.get('newPassword')?.valueChanges.subscribe(() => {
      this.step3Form.get('confirmPassword')?.updateValueAndValidity();
    });
  }

  openHelpModal(): void {
    this.showHelpModal.set(true);
  }

  closeHelpModal(): void {
    this.showHelpModal.set(false);
  }
  
  goToPreviousStep(): void {
    if (this.currentStep() > 1) {
      this.currentStep.update(step => step - 1);
    }
  }
  
  goToNextStep(): void {
    // Validar según el paso actual
    if (this.currentStep() === 1) {
      this.step1Submitted.set(true);
      
      if (this.step1Form.invalid) {
        // Marcar todos los campos como tocados para mostrar errores
        Object.keys(this.step1Form.controls).forEach(key => {
          this.step1Form.get(key)?.markAsTouched();
        });
        return;
      }
      
      // Si es válido, avanzar al siguiente paso
      this.currentStep.update(step => step + 1);
      this.step1Submitted.set(false);
      
      // Iniciar contador de reenvío para el paso 2
      this.startResendCountdown();
    } else if (this.currentStep() === 2) {
      this.step2Submitted.set(true);
      
      if (this.step2Form.invalid) {
        Object.keys(this.step2Form.controls).forEach(key => {
          this.step2Form.get(key)?.markAsTouched();
        });
        return;
      }
      
      // Si es válido, avanzar al siguiente paso
      this.currentStep.update(step => step + 1);
      this.step2Submitted.set(false);
      
      // Actualizar validador de restricciones con el username
      const username = this.step1Form.get('username')?.value || '';
      this.step3Form.get('newPassword')?.setValidators([
        Validators.required,
        passwordRequirements,
        passwordRestrictions(username)
      ]);
      this.step3Form.get('newPassword')?.updateValueAndValidity();
    } else if (this.currentStep() === 3) {
      this.step3Submitted.set(true);
      
      if (this.step3Form.invalid) {
        Object.keys(this.step3Form.controls).forEach(key => {
          this.step3Form.get(key)?.markAsTouched();
        });
        return;
      }
      
      // Si es válido, mostrar estado de éxito
      this.currentStep.update(step => step + 1);
      this.step3Submitted.set(false);
    } else if (this.currentStep() < this.totalSteps) {
      this.currentStep.update(step => step + 1);
    }
  }
  
  onSuccessComplete(): void {
    this.router.navigate(['/cpo/home']);
  }
  
  get stepTitle(): string {
    const titles = [
      'Ingresar usuario',
      'Ingresar código',
      '¡Muy bien!'
    ];
    return titles[this.currentStep() - 1];
  }
  
  get nextStepLabel(): string | undefined {
    const labels = [
      'Ingresar código',
      'Definir nueva clave',
      undefined
    ];
    return labels[this.currentStep() - 1];
  }
  
  // Getters para el estado del campo de usuario
  get usernameControl() {
    return this.step1Form.get('username');
  }
  
  get usernameStatus() {
    if (!this.usernameControl) return 'default';
    
    if (this.usernameControl.invalid && (this.usernameControl.touched || this.step1Submitted())) {
      return 'error';
    }
    return 'default';
  }
  
  get usernameMessage() {
    if (!this.usernameControl) return '';
    
    if (this.usernameControl.invalid && (this.usernameControl.touched || this.step1Submitted())) {
      if (this.usernameControl.hasError('noEmailFormat')) {
        return 'Ingresa solo tu usuario, sin agregar @poligran.edu.co';
      }
      if (this.usernameControl.hasError('required')) {
        return 'El usuario institucional es requerido';
      }
      if (this.usernameControl.hasError('minLength')) {
        return 'El usuario debe tener al menos 3 caracteres';
      }
    }
    return '';
  }
  
  // Getter para el correo institucional
  get institutionalEmail(): string {
    const username = this.step1Form.get('username')?.value || 'usuario';
    return `${username}@poligran.edu.co`;
  }
  
  // Getters para el código de verificación
  get codeControl() {
    return this.step2Form.get('code');
  }
  
  get codeStatus(): 'default' | 'success' | 'error' {
    const control = this.codeControl;
    if (!control) return 'default';
    
    // Solo mostrar error si se hizo submit y el código es inválido
    if (control.invalid && this.step2Submitted()) {
      return 'error';
    }
    
    // Mostrar success solo si el código es válido y está completo
    if (control.valid && control.value && control.value.length === 6) {
      return 'success';
    }
    
    return 'default';
  }
  
  get codeMessage(): string {
    const control = this.codeControl;
    if (!control) return '';
    
    // Solo mostrar mensaje si se hizo submit y hay error
    if (control.invalid && this.step2Submitted()) {
      if (control.hasError('required')) {
        return 'El código de verificación es requerido';
      }
      if (control.hasError('minLength') || control.hasError('maxLength')) {
        return 'El código debe tener 6 dígitos';
      }
    }
    
    return '';
  }
  
  onCodeComplete(code: string): void {
    // Cuando el código está completo, marcarlo como tocado
    this.step2Form.get('code')?.markAsTouched();
    console.log('Código completo:', code);
  }
  
  // Getters para contraseña nueva
  get newPasswordControl() {
    return this.step3Form.get('newPassword');
  }
  
  get newPasswordStatus(): InputStatus {
    const control = this.newPasswordControl;
    if (!control) return 'default';
    
    if (control.invalid && (control.dirty || control.touched || this.step3Submitted())) {
      return 'error';
    }
    return 'default';
  }
  
  get newPasswordMessage(): string {
    const control = this.newPasswordControl;
    if (!control || !control.errors) return '';
    
    if (control.dirty || control.touched || this.step3Submitted()) {
      if (control.hasError('required')) {
        return 'La nueva contraseña es requerida';
      }
      
      // Errores de requisitos
      if (control.hasError('length')) {
        return 'La contraseña debe tener entre 8 y 14 caracteres';
      }
      if (control.hasError('uppercase')) {
        return 'La contraseña debe incluir al menos una letra mayúscula';
      }
      if (control.hasError('lowercase')) {
        return 'La contraseña debe incluir al menos una letra minúscula';
      }
      if (control.hasError('number')) {
        return 'La contraseña debe incluir al menos un número';
      }
      if (control.hasError('symbol')) {
        return 'La contraseña debe incluir al menos un símbolo (/%&*+-=?¡!¿)';
      }
      
      // Errores de restricciones
      if (control.hasError('containsUsername')) {
        return 'La contraseña no debe contener tu usuario';
      }
      if (control.hasError('startsPoli')) {
        return 'La contraseña no debe iniciar con "Poli"';
      }
    }
    
    return '';
  }
  
  // Getters para confirmar contraseña
  get confirmPasswordControl() {
    return this.step3Form.get('confirmPassword');
  }
  
  get confirmPasswordStatus(): InputStatus {
    const control = this.confirmPasswordControl;
    if (!control) return 'default';
    
    if (control.invalid && (control.dirty || control.touched || this.step3Submitted())) {
      return 'error';
    }
    return 'default';
  }
  
  get confirmPasswordMessage(): string {
    const control = this.confirmPasswordControl;
    if (!control || !control.errors) return '';
    
    if (control.dirty || control.touched || this.step3Submitted()) {
      if (control.hasError('required')) {
        return 'Debes confirmar la nueva contraseña';
      }
      if (control.hasError('passwordMismatch')) {
        return 'Las contraseñas no coinciden';
      }
    }
    
    return '';
  }
  
  // Verificadores de requisitos individuales
  hasValidLength(): boolean {
    const value = this.newPasswordControl?.value || '';
    return value.length >= 8 && value.length <= 14;
  }
  
  hasUppercase(): boolean {
    const value = this.newPasswordControl?.value || '';
    return /[A-Z]/.test(value);
  }
  
  hasLowercase(): boolean {
    const value = this.newPasswordControl?.value || '';
    return /[a-z]/.test(value);
  }
  
  hasNumber(): boolean {
    const value = this.newPasswordControl?.value || '';
    return /[0-9]/.test(value);
  }
  
  hasSymbol(): boolean {
    const value = this.newPasswordControl?.value || '';
    return /[/%&*+\-=?¡!¿]/.test(value);
  }
  
  // Verificadores de restricciones
  notContainsUsername(): boolean {
    const value = this.newPasswordControl?.value || '';
    const username = this.step1Form.get('username')?.value || '';
    if (!value || !username) return true;
    return !value.toLowerCase().includes(username.toLowerCase());
  }
  
  notStartsPoli(): boolean {
    const value = this.newPasswordControl?.value || '';
    if (!value) return true;
    return !value.toLowerCase().startsWith('poli');
  }
  
  notMatchesLastPasswords(): boolean {
    // Por ahora siempre retorna true, se implementaría con datos del backend
    return true;
  }
  
  startResendCountdown(): void {
    // Limpiar cualquier intervalo previo
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
    
    // Reiniciar el contador
    this.resendCountdown.set(60);
    
    // Iniciar el intervalo
    this.countdownInterval = setInterval(() => {
      const current = this.resendCountdown();
      if (current > 0) {
        this.resendCountdown.set(current - 1);
      } else {
        clearInterval(this.countdownInterval);
      }
    }, 1000);
  }
  
  resendCode(event: Event): void {
    event.preventDefault();
    
    // Solo permitir reenvío si el contador llegó a 0
    if (this.resendCountdown() === 0) {
      console.log('Reenviando código a:', this.institutionalEmail);
      // Aquí iría la lógica para reenviar el código
      
      // Reiniciar el contador
      this.startResendCountdown();
    }
  }
  
  ngOnDestroy(): void {
    // Limpiar el intervalo al destruir el componente
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }
}
