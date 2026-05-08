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
import { PdsCheckboxComponent } from '../pds-checkbox/pds-checkbox.component';

export interface CheckboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

@Component({
  selector: 'pds-checkbox-group',
  standalone: true,
  imports: [NgClass, PdsCheckboxComponent],
  templateUrl: './pds-checkbox-group.component.html',
  styleUrl: './pds-checkbox-group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PdsCheckboxGroupComponent),
      multi: true,
    },
  ],
})
export class PdsCheckboxGroupComponent implements ControlValueAccessor {
  readonly groupLabel = input.required<string>();
  readonly options = input.required<CheckboxOption[]>();
  readonly disabled = input<boolean>(false);
  readonly orientation = input<'vertical' | 'horizontal'>('vertical');

  readonly valuesChange = output<string[]>();

  protected readonly internalValues = signal<string[]>([]);
  protected readonly internalDisabled = signal(false);

  private onChange: (val: string[]) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    effect(() => { this.internalDisabled.set(this.disabled()); });
  }

  protected readonly listClasses = computed(() => ({
    'pds-checkbox-group__list': true,
    'pds-checkbox-group__list--horizontal': this.orientation() === 'horizontal',
  }));

  protected isChecked(value: string): boolean {
    return this.internalValues().includes(value);
  }

  protected isDisabled(option: CheckboxOption): boolean {
    return this.internalDisabled() || !!option.disabled;
  }

  protected handleChange(value: string, checked: boolean): void {
    const current = this.internalValues();
    const next = checked
      ? [...current, value]
      : current.filter((v) => v !== value);
    this.internalValues.set(next);
    this.onChange(next);
    this.onTouched();
    this.valuesChange.emit(next);
  }

  // ControlValueAccessor
  writeValue(val: string[]): void {
    this.internalValues.set(Array.isArray(val) ? val : []);
  }

  registerOnChange(fn: (val: string[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.internalDisabled.set(isDisabled);
  }
}
