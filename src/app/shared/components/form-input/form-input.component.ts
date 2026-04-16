import { Component, Input, booleanAttribute, forwardRef, OnInit } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IconComponent } from '../icon/icon.component';

export type InputStatus = 'default' | 'success' | 'warning' | 'error';
export type LabelPosition = 'top' | 'left';

/**
 * **Form Input**
 *
 * Campo de entrada de texto reutilizable para formularios.
 * Permite configurar tipo (`text`, `email`, `password`, etc.), placeholder,
 * estado visual (success, warning, error), posición del label y mensajes de
 * ayuda/validación.  Incluye soporte para `required`, tooltip y deshabilitado.
 *
 * ### Buenas prácticas
 * - Relacionar siempre el **label** con el campo mediante `fieldID`.
 * - Usar `status` para comunicar la retro-alimentación del sistema
 *   (éxito, advertencia o error).
 * - No sustituir el label con `placeholder`; este último es solo orientación.
 * - Marcar con `required` los campos obligatorios y mostrar mensaje de error
 *   claro cuando falte completar.
 */
@Component({
  selector: 'app-form-input',
  standalone: true,
  imports: [NgClass, NgIf, IconComponent],
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormInputComponent),
      multi: true
    }
  ]
})
export class FormInputComponent implements OnInit, ControlValueAccessor {
  /** ID del campo; si no se define y hay label, se genera automáticamente. */
  @Input() fieldID?: string;

  /** Texto del label que describe el propósito del campo. */
  @Input() label?: string;

  /** Posición del label: 'top' (por defecto) o 'left'. */
  @Input() labelPosition: LabelPosition = 'top';

  /** Placeholder que sugiere el dato a ingresar. */
  @Input() placeholder = '';

  /** Tipo de input HTML: text, email, password, number, etc. */
  @Input() type: string = 'text';

  /** Estado visual: default, success, warning o error. */
  @Input() status: InputStatus = 'default';

  /** Marca el campo como requerido (atributo booleano). */
  @Input({ transform: booleanAttribute }) required = false;

  /** Texto del tooltip (ícono de ayuda). */
  @Input() tooltip?: string;

  /** Deshabilita la interacción con el campo. */
  @Input({ transform: booleanAttribute }) disabled = false;

  /** Mensaje de ayuda o validación mostrado debajo del campo. */
  @Input() message?: string;
  
  /** Muestra botón para toggle de visibilidad (solo para type="password"). */
  @Input({ transform: booleanAttribute }) showPasswordToggle = false;

  // ControlValueAccessor properties
  value: string = '';
  onChange: (value: string) => void = () => { };
  onTouched: () => void = () => { };
  
  // Estado interno para el toggle de password
  isPasswordVisible = false;

  ngOnInit() {
    // Genera un id único si hay label y no se definió uno externo
    if (this.label && !this.fieldID) {
      this.fieldID = this.generateId();
    }
  }

  // ControlValueAccessor methods
  writeValue(value: string): void {
    this.value = value || '';
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

  // Input event handlers
  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
  }

  onBlur(): void {
    this.onTouched();
  }

  private generateId(): string {
    return 'input-' + Math.random().toString(36).substring(2, 10);
  }
  
  // Getter para el tipo de input (cambia dinámicamente para password)
  get inputType(): string {
    if (this.type === 'password' && this.isPasswordVisible) {
      return 'text';
    }
    return this.type;
  }
  
  // Toggle de visibilidad de contraseña
  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
