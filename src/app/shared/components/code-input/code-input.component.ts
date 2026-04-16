import { Component, Input, Output, EventEmitter, ViewChildren, QueryList, ElementRef, AfterViewInit, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type CodeInputStatus = 'default' | 'success' | 'error';

/**
 * Componente CodeInput - Input de código de verificación
 * 
 * Implementa las mejores prácticas de UX y accesibilidad:
 * - Auto-navegación entre inputs al escribir
 * - Soporte de paste para distribuir código automáticamente
 * - Navegación con teclado (flechas, backspace, delete)
 * - ARIA labels para accesibilidad
 * - Integración con formularios reactivos (ControlValueAccessor)
 */
@Component({
  selector: 'app-code-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './code-input.component.html',
  styleUrls: ['./code-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CodeInputComponent),
      multi: true
    }
  ]
})
export class CodeInputComponent implements AfterViewInit, ControlValueAccessor {
  
  /** Cantidad de dígitos del código */
  @Input() length = 6;
  
  /** Estado deshabilitado */
  @Input() disabled = false;
  
  /** Auto-focus en el primer input */
  @Input() autoFocus = true;
  
  /** Estado visual del componente */
  @Input() status: CodeInputStatus = 'default';
  
  /** Label para accesibilidad */
  @Input() ariaLabel = 'Código de verificación';
  
  /** Emite cuando el código está completo */
  @Output() completed = new EventEmitter<string>();
  
  /** Referencias a los inputs */
  @ViewChildren('codeInput') inputs!: QueryList<ElementRef<HTMLInputElement>>;
  
  /** Array de valores de cada input */
  code: string[] = [];
  
  // ControlValueAccessor
  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};
  
  constructor() {
    this.initializeCode();
  }
  
  ngAfterViewInit(): void {
    if (this.autoFocus && !this.disabled) {
      setTimeout(() => this.focusInput(0), 100);
    }
  }
  
  /**
   * Inicializa el array de código con strings vacíos
   */
  private initializeCode(): void {
    this.code = Array(this.length).fill('');
  }
  
  /**
   * Obtiene el array de índices para el *ngFor
   */
  get indices(): number[] {
    return Array(this.length).fill(0).map((_, i) => i);
  }
  
  /**
   * Maneja el evento de input
   */
  onInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    
    // Solo permitir números
    if (!/^\d*$/.test(value)) {
      input.value = this.code[index];
      return;
    }
    
    // Tomar solo el último dígito ingresado
    const digit = value.slice(-1);
    this.code[index] = digit;
    input.value = digit;
    
    // Actualizar valor del formulario
    this.updateValue();
    
    // Auto-avanzar al siguiente input si hay un dígito
    if (digit && index < this.length - 1) {
      this.focusInput(index + 1);
    }
    
    // Emitir completed si el código está completo
    if (this.isCodeComplete()) {
      this.completed.emit(this.getCodeValue());
    }
  }
  
  /**
   * Maneja eventos de teclado
   */
  onKeyDown(event: KeyboardEvent, index: number): void {
    const input = event.target as HTMLInputElement;
    
    switch (event.key) {
      case 'Backspace':
        event.preventDefault();
        if (this.code[index]) {
          // Si hay valor, borrarlo
          this.code[index] = '';
          input.value = '';
          this.updateValue();
        } else if (index > 0) {
          // Si no hay valor, ir al anterior
          this.focusInput(index - 1);
        }
        break;
        
      case 'Delete':
        event.preventDefault();
        this.code[index] = '';
        input.value = '';
        this.updateValue();
        break;
        
      case 'ArrowLeft':
        event.preventDefault();
        if (index > 0) {
          this.focusInput(index - 1);
        }
        break;
        
      case 'ArrowRight':
        event.preventDefault();
        if (index < this.length - 1) {
          this.focusInput(index + 1);
        }
        break;
        
      case 'Home':
        event.preventDefault();
        this.focusInput(0);
        break;
        
      case 'End':
        event.preventDefault();
        this.focusInput(this.length - 1);
        break;
    }
  }
  
  /**
   * Maneja el evento de paste
   */
  onPaste(event: ClipboardEvent, index: number): void {
    event.preventDefault();
    
    const pastedData = event.clipboardData?.getData('text') || '';
    const digits = pastedData.replace(/\D/g, '').slice(0, this.length);
    
    // Distribuir los dígitos en los inputs disponibles
    for (let i = 0; i < digits.length && (index + i) < this.length; i++) {
      this.code[index + i] = digits[i];
      const input = this.inputs.toArray()[index + i]?.nativeElement;
      if (input) {
        input.value = digits[i];
      }
    }
    
    // Actualizar valor y enfocar el siguiente input vacío
    this.updateValue();
    const nextEmpty = this.code.findIndex((val, i) => i > index && !val);
    if (nextEmpty !== -1) {
      this.focusInput(nextEmpty);
    } else if (this.isCodeComplete()) {
      // Si se completó el código, enfocar el último
      this.focusInput(this.length - 1);
      this.completed.emit(this.getCodeValue());
    }
  }
  
  /**
   * Enfoca un input específico
   */
  private focusInput(index: number): void {
    const input = this.inputs.toArray()[index]?.nativeElement;
    if (input) {
      input.focus();
      input.select();
    }
  }
  
  /**
   * Verifica si el código está completo
   */
  private isCodeComplete(): boolean {
    return this.code.every(digit => digit.length > 0);
  }
  
  /**
   * Obtiene el valor completo del código
   */
  private getCodeValue(): string {
    return this.code.join('');
  }
  
  /**
   * Actualiza el valor en el formulario reactivo
   */
  private updateValue(): void {
    const value = this.getCodeValue();
    this.onChange(value);
    this.onTouched();
  }
  
  // ControlValueAccessor implementation
  writeValue(value: string): void {
    if (value) {
      const digits = value.replace(/\D/g, '').slice(0, this.length).split('');
      this.code = [...digits, ...Array(this.length - digits.length).fill('')];
      
      // Actualizar los inputs si ya están disponibles
      if (this.inputs) {
        this.inputs.forEach((input, index) => {
          input.nativeElement.value = this.code[index] || '';
        });
      }
    } else {
      this.initializeCode();
      if (this.inputs) {
        this.inputs.forEach(input => {
          input.nativeElement.value = '';
        });
      }
    }
  }
  
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }
  
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
