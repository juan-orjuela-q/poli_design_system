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
import { PdsIconButtonComponent } from '../pds-icon-button/pds-icon-button.component';
import { PdsLoadingCircleComponent } from '../pds-loading-circle/pds-loading-circle.component';
import { PdsHelperTextComponent } from '../pds-helper-text/pds-helper-text.component';
import { PdsTooltipComponent } from '../pds-tooltip/pds-tooltip.component';

let inputCounter = 0;

export type InputFieldStatus = 'default' | 'error' | 'warning' | 'success' | 'loading';
export type InputFieldType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';

@Component({
  selector: 'pds-input-field',
  standalone: true,
  imports: [NgClass, PdsIconComponent, PdsIconButtonComponent, PdsLoadingCircleComponent, PdsHelperTextComponent, PdsTooltipComponent],
  templateUrl: './pds-input-field.component.html',
  styleUrl: './pds-input-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PdsInputFieldComponent),
      multi: true,
    },
  ],
})
export class PdsInputFieldComponent implements ControlValueAccessor {
  @ViewChild('inputEl') inputEl!: ElementRef<HTMLInputElement>;

  readonly label = input.required<string>();
  readonly helpText = input<string | null>(null);
  readonly placeholder = input<string>('');
  readonly type = input<InputFieldType>('text');
  readonly value = input<string>('');
  readonly status = input<InputFieldStatus>('default');
  readonly feedbackText = input<string | null>(null);
  readonly maxLength = input<number | null>(null);
  readonly showCounter = input<boolean>(false);
  readonly required = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly readonly = input<boolean>(false);
  readonly iconStart = input<string | null>(null);
  readonly iconEnd = input<string | null>(null);
  readonly showPasswordToggle = input<boolean>(false);
  readonly autocomplete = input<string>('');
  readonly name = input<string | null>(null);

  readonly valueChange = output<string>();
  readonly blur = output<void>();
  readonly focus = output<void>();

  readonly inputId = `pds-input-${++inputCounter}`;
  readonly helperId = `pds-input-helper-${this.inputId}`;

  protected readonly internalValue = signal('');
  protected readonly internalDisabled = signal(false);
  protected readonly showPassword = signal(false);

  private onChange: (val: string) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    effect(() => { this.internalValue.set(this.value()); });
    effect(() => { this.internalDisabled.set(this.disabled()); });
  }

  protected readonly resolvedType = computed(() =>
    this.type() === 'password' && this.showPassword() ? 'text' : this.type()
  );

  protected readonly charCount = computed(() => this.internalValue().length);

  protected readonly showEndIcon = computed(() =>
    this.status() === 'loading' ? false : !!this.iconEnd()
  );

  protected readonly showPasswordBtn = computed(() =>
    this.type() === 'password' && this.showPasswordToggle()
  );

  protected readonly wrapperClasses = computed(() => ({
    'pds-input-field__wrapper': true,
    [`pds-input-field__wrapper--${this.status()}`]: this.status() !== 'default',
    'pds-input-field__wrapper--disabled': this.internalDisabled(),
    'pds-input-field__wrapper--readonly': this.readonly(),
  }));

  protected readonly hostClasses = computed(() => ({
    'pds-input-field': true,
    [`pds-input-field--${this.status()}`]: this.status() !== 'default',
    'pds-input-field--disabled': this.internalDisabled(),
  }));

  protected readonly helperStatus = computed(() => {
    const s = this.status();
    if (s === 'loading' || s === 'default') return 'default' as const;
    return s as 'error' | 'warning' | 'success';
  });

  protected handleInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.internalValue.set(val);
    this.onChange(val);
    this.valueChange.emit(val);
  }

  protected handleBlur(): void {
    this.onTouched();
    this.blur.emit();
  }

  protected togglePasswordVisibility(): void {
    this.showPassword.update((v) => !v);
  }

  // ControlValueAccessor
  writeValue(val: string): void {
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
