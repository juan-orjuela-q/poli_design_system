import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule } from '@angular/forms';
import { NgClass, NgIf, NgFor } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule, MatSelectChange } from '@angular/material/select';
import { IconComponent } from '../icon/icon.component';

/** Opción del select. */
export interface SelectOption<T = any> {
  label: string;
  value: T;
  disabled?: boolean;
}

/**
 * **Material Select**
 *
 * Componente de selección basado en *Angular Material* que
 * respeta los lineamientos visuales del Politécnico Grancolombiano.
 */
@Component({
  selector: 'app-material-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],

  imports: [
    NgClass, NgIf, NgFor, FormsModule,
    MatFormFieldModule, MatSelectModule, IconComponent
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MaterialSelectComponent),
      multi: true
    }
  ],
  standalone: true
})
export class MaterialSelectComponent implements ControlValueAccessor {

  /* -------------------- Inputs -------------------- */
  /** Texto del label mostrado sobre el control. */
  @Input() label = '';

  /** Placeholder interno cuando no hay selección. */
  @Input() placeholder = '';

  /** Marca el campo como requerido (añade a11y y visual). */
  @Input() required = false;

  /** Deshabilita la interacción con el componente. */
  @Input() disabled = false;

  /** Tooltip de ayuda contextual. */
  @Input() tooltip?: string;

  /** Mensaje de ayuda o de validación. */
  @Input() message?: string;

  /** Estado visual: success / warning / error. */
  @Input() status: 'success' | 'warning' | 'error' | '' = '';

  /** Posición del label: top | left. */
  @Input() labelPosition: 'top' | 'left' = 'top';

  /** ID del campo; si hay label y no se indica se genera automáticamente. */
  @Input() fieldID = '';

  /** Nombre del control (atributo name). */
  @Input() name = '';

  /** Permite selección múltiple. */
  @Input() multiple = false;

  /** Lista de opciones que se mostrarán. */
  @Input() options: SelectOption[] = [];

  /** Función de comparación personalizada (caso de objetos). */
  @Input() compareWith: (o1: any, o2: any) => boolean = (o1, o2) => o1 === o2;

  /* ------------------- Outputs -------------------- */
  /** Emite el nuevo valor cada vez que cambia la selección. */
  @Output() selectionChange = new EventEmitter<any>();

  /* ------------- ControlValueAccessor ------------- */
  value: any = null;
  onChange = (_: any) => { };
  onTouched = () => { };

  writeValue(val: any): void { this.value = val; }
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean) { this.disabled = isDisabled; }

  /* ------------------ Eventos --------------------- */
  handleSelectionChange(ev: MatSelectChange) {
    this.value = ev.value;
    this.onChange(ev.value);
    this.selectionChange.emit(ev.value);
  }

  ngOnInit() {
    if (this.label && !this.fieldID) {
      this.fieldID = 'select-' + Math.random().toString(36).substring(2, 10);
    }
  }
}
