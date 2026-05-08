import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  forwardRef,
  input,
  output,
  signal,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgClass } from '@angular/common';
import { PdsIconComponent } from '../pds-icon/pds-icon.component';
import { PdsHelperTextComponent } from '../pds-helper-text/pds-helper-text.component';
import { PdsTooltipComponent } from '../pds-tooltip/pds-tooltip.component';

let timePickerCounter = 0;

export type TimePickerStatus = 'default' | 'error' | 'warning' | 'success';

@Component({
  selector: 'pds-time-picker',
  standalone: true,
  imports: [NgClass, PdsIconComponent, PdsHelperTextComponent, PdsTooltipComponent],
  templateUrl: './pds-time-picker.component.html',
  styleUrl: './pds-time-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PdsTimePickerComponent),
      multi: true,
    },
  ],
})
export class PdsTimePickerComponent implements ControlValueAccessor {
  @ViewChild('inputEl') inputEl!: ElementRef<HTMLInputElement>;

  // ── Inputs ────────────────────────────────────────────────────────────────
  /** Etiqueta visible del campo. Requerida. */
  readonly label = input.required<string>();

  /** Texto de ayuda contextual (aparece en tooltip). */
  readonly helpText = input<string | null>(null);

  /** Valor inicial en formato HH:mm o HH:mm:ss. */
  readonly value = input<string>('');

  /** Estado semántico del campo. */
  readonly status = input<TimePickerStatus>('default');

  /** Texto de feedback (error, aviso, éxito). */
  readonly feedbackText = input<string | null>(null);

  /** Hora mínima permitida (formato HH:mm). */
  readonly min = input<string | null>(null);

  /** Hora máxima permitida (formato HH:mm). */
  readonly max = input<string | null>(null);

  /**
   * Incremento en segundos. Por defecto 60 (sin campo de segundos).
   * Usar 1 para incluir segundos, 900 para intervalos de 15 min, etc.
   */
  readonly step = input<number>(60);

  /** Deshabilita el campo. */
  readonly disabled = input<boolean>(false);

  /** Marca el campo como requerido. */
  readonly required = input<boolean>(false);

  /** Nombre del campo para formularios HTML. */
  readonly name = input<string | null>(null);

  // ── Outputs ───────────────────────────────────────────────────────────────
  readonly valueChange = output<string>();
  readonly blur = output<void>();
  readonly focus = output<void>();

  // ── IDs ──────────────────────────────────────────────────────────────────
  protected readonly id = `pds-time-picker-${++timePickerCounter}`;
  protected readonly helperId = `${this.id}-helper`;

  // ── State ─────────────────────────────────────────────────────────────────
  protected readonly internalValue = signal('');
  protected readonly internalDisabled = signal(false);

  private onChange: (val: string) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    effect(() => { this.internalValue.set(this.value()); });
    effect(() => { this.internalDisabled.set(this.disabled()); });
  }

  // ── Computed ──────────────────────────────────────────────────────────────
  protected readonly isFilled = computed(() => !!this.internalValue());

  protected readonly wrapperClasses = computed(() => ({
    'pds-time-picker__wrapper': true,
    [`pds-time-picker__wrapper--${this.status()}`]: this.status() !== 'default',
    'pds-time-picker__wrapper--disabled': this.internalDisabled(),
  }));

  protected readonly hostClasses = computed(() => ({
    'pds-time-picker': true,
    [`pds-time-picker--${this.status()}`]: this.status() !== 'default',
    'pds-time-picker--disabled': this.internalDisabled(),
    'pds-time-picker--filled': this.isFilled(),
  }));

  // ── Handlers ─────────────────────────────────────────────────────────────
  protected handleChange(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.internalValue.set(val);
    this.onChange(val);
    this.valueChange.emit(val);
  }

  protected handleBlur(): void {
    this.onTouched();
    this.blur.emit();
  }

  // ── CVA ───────────────────────────────────────────────────────────────────
  writeValue(val: string | null): void {
    this.internalValue.set(val ?? '');
  }

  registerOnChange(fn: (val: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.internalDisabled.set(isDisabled);
  }
}
