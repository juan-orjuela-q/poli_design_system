import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, forwardRef, OnInit } from '@angular/core';
import {
  MatDatepickerModule
} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  DateAdapter,
  MAT_DATE_LOCALE,
  provideNativeDateAdapter
} from '@angular/material/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IconComponent } from '../icon/icon.component';
import { NgIf, NgClass, DatePipe } from '@angular/common';

export type DatePickerStatus = 'default' | 'success' | 'warning' | 'error';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, IconComponent, NgIf, NgClass, DatePipe],
  templateUrl: './date-picker.component.html',
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-CO' },
    provideNativeDateAdapter(),
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true
    }
  ],
  styleUrl: './date-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatePickerComponent implements OnInit, ControlValueAccessor {
  /** Texto del label. */
  @Input() label: string = '';

  /** ID del campo; se genera uno si no se especifica y hay label. */
  @Input() fieldID: string = '';

  /** Marca el campo como requerido. */
  @Input() required: boolean = false;

  /** Deshabilita el campo. */
  @Input() disabled: boolean = false;

  /** Tooltip de ayuda contextual. */
  @Input() tooltip?: string;

  /** Mensaje de ayuda o validación mostrado debajo del campo. */
  @Input() message?: string;

  /** Estado visual: default, success, warning o error. */
  @Input() status: DatePickerStatus = 'default';

  /** Fecha mínima permitida. */
  @Input() minDate: Date | null = null;

  /** Fecha máxima permitida. */
  @Input() maxDate: Date | null = null;

  /** Emite cuando el valor cambia. */
  @Output() dateChange = new EventEmitter<Date | null>();

  /** Emite cuando se pierde el foco. */
  @Output() blurEvent = new EventEmitter<void>();

  // ControlValueAccessor properties
  value: Date | null = null;
  onChange: (value: Date | null) => void = () => { };
  onTouched: () => void = () => { };

  ngOnInit() {
    if (this.label && !this.fieldID) {
      this.fieldID = this.generateId();
    }
  }

  // ControlValueAccessor methods
  writeValue(value: Date | null): void {
    this.value = value;
  }

  registerOnChange(fn: (value: Date | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // Event handlers
  onDateChange(date: Date | null): void {
    this.value = date;
    this.onChange(date);
    this.dateChange.emit(date);
  }

  onDateBlur(): void {
    this.onTouched();
    this.blurEvent.emit();
  }

  // Filtro de fechas para el datepicker
  dateFilter = (date: Date | null): boolean => {
    if (!date) return true;
    
    // Si hay minDate, verificar que la fecha sea mayor o igual
    if (this.minDate) {
      const minTime = new Date(this.minDate).setHours(0, 0, 0, 0);
      const dateTime = new Date(date).setHours(0, 0, 0, 0);
      if (dateTime < minTime) return false;
    }
    
    // Si hay maxDate, verificar que la fecha sea menor o igual
    if (this.maxDate) {
      const maxTime = new Date(this.maxDate).setHours(0, 0, 0, 0);
      const dateTime = new Date(date).setHours(0, 0, 0, 0);
      if (dateTime > maxTime) return false;
    }
    
    return true;
  };

  private generateId(): string {
    return 'datepicker-' + Math.random().toString(36).substring(2, 10);
  }
}
