import { Component, Input, Output, EventEmitter, booleanAttribute } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

export type InputStatus = 'default' | 'success' | 'warning' | 'error';
export type LabelPosition = 'top' | 'left';

/**
 * **Form Textarea**
 *
 * Área de texto reutilizable para capturar mensajes largos o comentarios.
 * Ofrece label, placeholder, estados de validación (success / warning / error),
 * posición del label, tooltip explicativo, longitud variable (propiedad `rows`)
 * y estado deshabilitado.
 *
 * ### Buenas prácticas
 * - Relacionar el **label** con el campo para accesibilidad.  
 * - Ajustar `rows` según la longitud esperada (mínimo 2 filas).  
 * - Usar `status` para comunicar feedback visual de validación.  
 * - Mostrar mensajes de ayuda / error concisos debajo del campo.  
 * - Evitar usar `placeholder` como reemplazo de `label`.
 */
@Component({
  selector: 'app-form-textarea',
  standalone: true,
  imports: [NgClass, NgIf, IconComponent],
  templateUrl: './form-textarea.component.html',
  styleUrls: ['./form-textarea.component.scss'],
})
export class FormTextareaComponent {
  /** Texto del label (opcional). */
  @Input() label?: string;

  /** Placeholder con orientación al usuario. */
  @Input() placeholder?: string;

  /** Marca el campo como obligatorio. */
  @Input({ transform: booleanAttribute }) required: boolean = false;

  /** Texto mostrado como tooltip de ayuda. */
  @Input() tooltip?: string;

  /** Mensaje de ayuda o validación debajo del campo. */
  @Input() message?: string;

  /** Estado visual: default, success, warning, error. */
  @Input() status: InputStatus = 'default';

  /** Posición del label: arriba (top) o a la izquierda (left). */
  @Input() labelPosition: LabelPosition = 'top';

  /** Deshabilita la interacción con el campo. */
  @Input({ transform: booleanAttribute }) disabled: boolean = false;

  /** Número de filas visibles. */
  @Input() rows: number = 4;

  /** Valor inicial del textarea (two-way binding externo). */
  @Input() value: string = '';

  /** Emite cuando cambia el valor (two-way binding). */
  @Output() valueChange = new EventEmitter<string>();

  /**
   * Maneja el cambio de valor del textarea
   */
  onValueChange(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.value = target.value;
    this.valueChange.emit(this.value);
  }
}