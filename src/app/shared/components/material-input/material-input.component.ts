import { NgClass, NgIf } from '@angular/common';
import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IconComponent } from '../icon/icon.component';


/**
 * **Material Input**
 *
 * Campo de entrada basado en *Angular Material* y adaptado a los lineamientos
 * visuales del Politécnico Grancolombiano.
 * > **Nota:** en la mayoría de los casos se recomienda utilizar
 * `Form Input`; este componente existe para escenarios puntuales que requieran
 * la librería de Material.
 *
 * ### Buenas prácticas
 * - Usar este componente solo cuando sea imprescindible la API de
 *   *Angular Material* (validación, máscaras, etc.).
 * - Relacionar siempre el **label** con el campo mediante `fieldID`.
 * - Comunicar la retroalimentación visual usando `status`
 *   (`success`, `warning`, `error`).
 * - Evitar sobrecargar la interfaz: combina `placeholder` y `label`
 *   adecuadamente y muestra mensajes claros de validación.
 */
@Component({
  selector: 'app-material-input',
  templateUrl: './material-input.component.html',
  styleUrls: ['./material-input.component.scss'],
  imports: [NgClass, FormsModule, MatFormFieldModule, MatInputModule, NgIf, IconComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MaterialInputComponent),
      multi: true
    }
  ],
  standalone: true
})
export class MaterialInputComponent implements ControlValueAccessor {
  /** Texto del label. */
  @Input() label: string = '';

  /** Placeholder que se muestra dentro del input. */
  @Input() placeholder: string = '';

  /** Tipo HTML del input (`text`, `email`, `password`, etc.). */
  @Input() type: string = 'text';

  /** Marca el campo como requerido. */
  @Input() required: boolean = false;

  /** Deshabilita la interacción con el campo. */
  @Input() disabled: boolean = false;

  /** Marca el campo como solo lectura. */
  @Input() readonly: boolean = false;

  /** Tooltip de ayuda contextual. */
  @Input() tooltip?: string;

  /** Mensaje de ayuda o validación. */
  @Input() message?: string;

  /** Estado visual: success / warning / error (string libre para CSS). */
  @Input() status: string = '';

  /** Posición del label (`top` | `left`). */
  @Input() labelPosition: string = 'top';

  /** ID del campo; se genera uno si no se especifica y hay label. */
  @Input() fieldID: string = '';

  /** Nombre del input (atributo *name*). */
  @Input() name: string = '';

  /** Valor de `autocomplete` HTML. */
  @Input() autocomplete: string = '';

  /** Longitud máxima permitida. */
  @Input() maxlength?: number;

  /** Emite el valor cada vez que cambia. */
  @Output() input = new EventEmitter<string>();

  /** Emite cuando se pierde el foco. */
  @Output() blur = new EventEmitter<void>();

  /** Valor interno (two-way binding para ControlValueAccessor). */
  value: string = '';

  /* ----------------- ControlValueAccessor ----------------- */
  onChange = (_: any) => { };
  onTouched = () => { };

  writeValue(val: any): void { this.value = val; }
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
  setDisabledState(disabled: boolean) { this.disabled = disabled; }

  /* ------------------- Eventos DOM ----------------------- */
  onInput(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.value = val;
    this.onChange(val);
    this.input.emit(val);
  }

  onBlur() {
    this.onTouched();
    this.blur.emit();
  }

  /* ----------------- Utilidades internas ----------------- */
  ngOnInit() {
    if (this.label && !this.fieldID) {
      this.fieldID = this.generateId();
    }
  }
  private generateId(): string {
    return 'input-' + Math.random().toString(36).substring(2, 10);
  }
}
