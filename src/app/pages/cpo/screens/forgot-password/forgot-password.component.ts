import { Component, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';

// Components
import { BreadcrumbComponent, BreadcrumbItem } from '@shared/components/breadcrumb/breadcrumb.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { IconComponent } from '@shared/components/icon/icon.component';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { SimpleStepperComponent } from '@shared/components/simple-stepper/simple-stepper.component';
import { FormInputComponent, InputStatus } from '@shared/components/form-input/form-input.component';
import { CodeInputComponent } from '@shared/components/code-input/code-input.component';
import { BadgeComponent } from '@shared/components/badge/badge.component';
import { AlertComponent } from '@shared/components/alert/alert.component';
import { RadioGroupComponent, RadioOption } from '@shared/components/radio-group/radio-group.component';

@Component({
  selector: 'app-forgot-password',
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
    AlertComponent,
    RadioGroupComponent
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent implements OnDestroy {
  pageTitle = 'Recuperar clave';
  pageSubtitle = 'Sigue los pasos para recuperar tu clave de acceso.';

  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Inicio', route: '/' },
    { label: 'Recuperar clave', route: '/forgot-password' }
  ];

  // Stepper
  currentStep = signal(1);
  totalSteps = 3;

  // Modal de ayuda
  showHelpModal = signal(false);

  // Forms
  step1Form: FormGroup;
  step2Form: FormGroup;
  step3Form: FormGroup;

  // Step 1: Opciones de rol
  roleOptions: RadioOption[] = [
    { value: 'estudiante', label: 'Estudiante' },
    { value: 'docente_admin', label: 'Docente / Administrativo' }
  ];

  // Step 2: Countdown para reenviar código
  resendCountdown = signal(60);
  private countdownInterval: any;

  // Step submissions
  step1Submitted = signal(false);
  step2Submitted = signal(false);
  step3Submitted = signal(false);

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.step1Form = this.fb.group({
      documentNumber: ['', [Validators.required, Validators.minLength(3)]],
      role: ['', Validators.required]
    });

    this.step2Form = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });

    this.step3Form = this.fb.group({
      newPassword: ['', [Validators.required, this.passwordRequirements]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordsMatchValidator
    });

    // Listener para revalidar confirmPassword cuando cambie newPassword
    this.step3Form.get('newPassword')?.valueChanges.subscribe(() => {
      this.step3Form.get('confirmPassword')?.updateValueAndValidity();
    });
  }

  ngOnDestroy(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  // ========================================
  // Stepper Navigation
  // ========================================
  get stepTitle(): string {
    const titles = [
      'Ingresar documento y rol',
      'Ingresar código',
      'Definir nueva clave'
    ];
    return titles[this.currentStep() - 1] || '';
  }

  get nextStepLabel(): string {
    const labels = [
      'Ingresar código',
      'Definir nueva clave',
      ''
    ];
    return labels[this.currentStep() - 1] || '';
  }

  // ========================================
  // Step 1: Document & Role
  // ========================================
  get documentNumber() {
    return this.step1Form.get('documentNumber');
  }

  get role() {
    return this.step1Form.get('role');
  }

  get documentNumberStatus(): InputStatus {
    if (!this.step1Submitted()) return 'default';
    return this.documentNumber?.invalid ? 'error' : 'default';
  }

  get documentNumberMessage(): string {
    if (!this.step1Submitted() || this.documentNumber?.valid) return '';
    if (this.documentNumber?.errors?.['required']) return 'El número de documento es obligatorio';
    if (this.documentNumber?.errors?.['minlength']) return 'El número de documento debe tener al menos 3 caracteres';
    return '';
  }

  get roleStatus(): InputStatus {
    if (!this.step1Submitted()) return 'default';
    return this.role?.invalid ? 'error' : 'default';
  }

  get roleMessage(): string {
    if (!this.step1Submitted() || this.role?.valid) return '';
    if (this.role?.errors?.['required']) return 'Debes seleccionar tu rol';
    return '';
  }

  onStep1Continue(): void {
    this.step1Submitted.set(true);
    this.step1Form.markAllAsTouched();
    
    if (this.step1Form.valid) {
      // Simular envío de código
      console.log('Enviando código al correo registrado...', this.step1Form.value);
      this.currentStep.set(2);
      this.step1Submitted.set(false);
      this.startResendCountdown();
    }
  }

  // ========================================
  // Step 2: Code Verification
  // ========================================
  get code() {
    return this.step2Form.get('code');
  }

  get codeStatus(): 'default' | 'success' | 'error' {
    if (!this.step2Submitted()) return 'default';
    if (this.code?.invalid) return 'error';
    return 'default';
  }

  get codeMessage(): string {
    if (!this.step2Submitted() || this.code?.valid) return '';
    if (this.code?.errors?.['required']) return 'El código es obligatorio';
    if (this.code?.errors?.['minlength'] || this.code?.errors?.['maxlength']) {
      return 'El código debe tener 6 dígitos';
    }
    return 'Código inválido';
  }

  get maskedEmail(): string {
    // Simular email enmascarado - en producción vendría del backend
    return 'mg***z@gmail.com';
  }

  onCodeComplete(code: string): void {
    this.step2Form.patchValue({ code });
  }

  startResendCountdown(): void {
    this.resendCountdown.set(60);
    
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }

    this.countdownInterval = setInterval(() => {
      const currentValue = this.resendCountdown();
      if (currentValue > 0) {
        this.resendCountdown.set(currentValue - 1);
      } else {
        clearInterval(this.countdownInterval);
      }
    }, 1000);
  }

  resendCode(event: Event): void {
    event.preventDefault();
    if (this.resendCountdown() === 0) {
      console.log('Reenviando código...');
      this.startResendCountdown();
    }
  }

  onStep2Continue(): void {
    this.step2Submitted.set(true);
    
    if (this.step2Form.valid) {
      console.log('Código verificado:', this.step2Form.value);
      this.currentStep.set(3);
      this.step2Submitted.set(false);
      
      // Actualizar validador de restricciones con el número de documento
      const documentNumber = this.step1Form.get('documentNumber')?.value || '';
      this.step3Form.get('newPassword')?.setValidators([
        Validators.required,
        this.passwordRequirements.bind(this),
        this.passwordRestrictions(documentNumber)
      ]);
      this.step3Form.get('newPassword')?.updateValueAndValidity();
    }
  }

  onStep2Back(): void {
    this.currentStep.set(1);
    this.step2Submitted.set(false);
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  // ========================================
  // Step 3: Set New Password
  // ========================================
  get newPassword() {
    return this.step3Form.get('newPassword');
  }

  get confirmPassword() {
    return this.step3Form.get('confirmPassword');
  }

  // Validador de requisitos de contraseña
  private passwordRequirements(control: AbstractControl): ValidationErrors | null {
    const value = control.value || '';
    const errors: ValidationErrors = {};

    if (value.length < 8 || value.length > 14) {
      errors['length'] = true;
    }
    if (!/[A-Z]/.test(value)) {
      errors['uppercase'] = true;
    }
    if (!/[a-z]/.test(value)) {
      errors['lowercase'] = true;
    }
    if (!/[0-9]/.test(value)) {
      errors['number'] = true;
    }
    if (!/[/%&*+\-=?¡!¿]/.test(value)) {
      errors['symbol'] = true;
    }

    return Object.keys(errors).length > 0 ? errors : null;
  }

  // Validador de restricciones de contraseña
  private passwordRestrictions(documentNumber: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;
      
      const errors: any = {};
      
      // No debe contener el número de documento
      if (documentNumber && value.toLowerCase().includes(documentNumber.toLowerCase())) {
        errors.containsDocument = true;
      }
      
      // No debe iniciar con "Poli"
      if (value.toLowerCase().startsWith('poli')) {
        errors.startsPoli = true;
      }
      
      return Object.keys(errors).length > 0 ? errors : null;
    };
  }

  // Validador de coincidencia de contraseñas
  private passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    if (confirmPassword && newPassword !== confirmPassword) {
      return { passwordMismatch: true };
    }

    return null;
  }

  // Validación de requisitos individuales
  hasValidLength(): boolean {
    const value = this.newPassword?.value || '';
    return value.length >= 8 && value.length <= 14;
  }

  hasUppercase(): boolean {
    return /[A-Z]/.test(this.newPassword?.value || '');
  }

  hasLowercase(): boolean {
    return /[a-z]/.test(this.newPassword?.value || '');
  }

  hasNumber(): boolean {
    return /[0-9]/.test(this.newPassword?.value || '');
  }

  hasSymbol(): boolean {
    return /[/%&*+\-=?¡!¿]/.test(this.newPassword?.value || '');
  }

  // Verificadores de restricciones
  notContainsDocument(): boolean {
    const value = this.newPassword?.value || '';
    const documentNumber = this.step1Form.get('documentNumber')?.value || '';
    if (!value || !documentNumber) return true;
    return !value.toLowerCase().includes(documentNumber.toLowerCase());
  }

  notStartsPoli(): boolean {
    const value = this.newPassword?.value || '';
    if (!value) return true;
    return !value.toLowerCase().startsWith('poli');
  }

  notMatchesLastPasswords(): boolean {
    // Por ahora siempre retorna true, se implementaría con datos del backend
    return true;
  }

  get newPasswordStatus(): InputStatus {
    if (!this.step3Submitted()) return 'default';
    return this.newPassword?.invalid ? 'error' : 'default';
  }

  get newPasswordMessage(): string {
    if (!this.step3Submitted() || this.newPassword?.valid) return '';
    
    const errors = this.newPassword?.errors;
    if (errors?.['required']) return 'La contraseña es obligatoria';
    if (errors?.['length']) return 'La contraseña debe tener entre 8 y 14 caracteres';
    if (errors?.['uppercase']) return 'Debe incluir al menos una mayúscula';
    if (errors?.['lowercase']) return 'Debe incluir al menos una minúscula';
    if (errors?.['number']) return 'Debe incluir al menos un número';
    if (errors?.['symbol']) return 'Debe incluir al menos un símbolo (/%&*+-=?¡!¿)';
    
    return '';
  }

  get confirmPasswordStatus(): InputStatus {
    if (!this.step3Submitted()) return 'default';
    return this.confirmPassword?.invalid || this.step3Form.errors?.['passwordMismatch'] ? 'error' : 'default';
  }

  get confirmPasswordMessage(): string {
    if (!this.step3Submitted()) return '';
    
    if (this.confirmPassword?.errors?.['required']) return 'Debes repetir la contraseña';
    if (this.step3Form.errors?.['passwordMismatch']) return 'Las contraseñas no coinciden';
    
    return '';
  }

  onStep3Continue(): void {
    this.step3Submitted.set(true);
    
    if (this.step3Form.valid) {
      console.log('Contraseña actualizada:', {
        documentNumber: this.documentNumber?.value,
        role: this.role?.value,
        code: this.code?.value,
        newPassword: this.newPassword?.value
      });
      this.currentStep.set(4);
    }
  }

  onStep3Back(): void {
    this.currentStep.set(2);
    this.step3Submitted.set(false);
  }

  // ========================================
  // Success
  // ========================================
  onSuccessComplete(): void {
    this.router.navigate(['/']);
  }

  // ========================================
  // Help Modal
  // ========================================
  openHelpModal(): void {
    this.showHelpModal.set(true);
  }

  closeHelpModal(): void {
    this.showHelpModal.set(false);
  }
}
