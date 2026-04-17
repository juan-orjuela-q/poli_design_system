import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  forwardRef,
  input,
  output,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgClass } from '@angular/common';
import { PdsHelperTextComponent } from '../pds-helper-text/pds-helper-text.component';

let textareaCounter = 0;

export type TextareaStatus = 'default' | 'error' | 'warning' | 'success';

@Component({
  selector: 'pds-textarea-field',
  standalone: true,
  imports: [NgClass, PdsHelperTextComponent],
  templateUrl: './pds-textarea-field.component.html',
  styleUrl: './pds-textarea-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PdsTextareaFieldComponent),
      multi: true,
    },
  ],
})
export class PdsTextareaFieldComponent implements ControlValueAccessor {
  readonly label = input.required<string>();
  readonly placeholder = input<string>('');
  readonly value = input<string>('');
  readonly status = input<TextareaStatus>('default');
  readonly helperText = input<string | null>(null);
  readonly maxLength = input<number | null>(null);
  readonly showCounter = input<boolean>(false);
  readonly rows = input<number>(3);
  readonly required = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly readonly = input<boolean>(false);

  readonly valueChange = output<string>();
  readonly blur = output<void>();

  readonly textareaId = `pds-textarea-${++textareaCounter}`;
  readonly helperId = `pds-textarea-helper-${this.textareaId}`;

  protected readonly internalValue = signal('');
  protected readonly internalDisabled = signal(false);

  private onChange: (val: string) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    effect(() => { this.internalValue.set(this.value()); });
    effect(() => { this.internalDisabled.set(this.disabled()); });
  }

  protected readonly charCount = computed(() => this.internalValue().length);

  protected readonly wrapperClasses = computed(() => ({
    'pds-textarea-field__wrapper': true,
    [`pds-textarea-field__wrapper--${this.status()}`]: this.status() !== 'default',
    'pds-textarea-field__wrapper--disabled': this.internalDisabled(),
    'pds-textarea-field__wrapper--readonly': this.readonly(),
  }));

  protected readonly hostClasses = computed(() => ({
    'pds-textarea-field': true,
    [`pds-textarea-field--${this.status()}`]: this.status() !== 'default',
    'pds-textarea-field--disabled': this.internalDisabled(),
  }));

  protected handleInput(event: Event): void {
    const val = (event.target as HTMLTextAreaElement).value;
    this.internalValue.set(val);
    this.onChange(val);
    this.valueChange.emit(val);
  }

  protected handleBlur(): void {
    this.onTouched();
    this.blur.emit();
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
