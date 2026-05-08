import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  forwardRef,
  HostListener,
  input,
  output,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgClass } from '@angular/common';
import { PdsRadioComponent } from '../pds-radio/pds-radio.component';

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

let radioGroupCounter = 0;

@Component({
  selector: 'pds-radio-group',
  standalone: true,
  imports: [NgClass, PdsRadioComponent],
  templateUrl: './pds-radio-group.component.html',
  styleUrl: './pds-radio-group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PdsRadioGroupComponent),
      multi: true,
    },
  ],
})
export class PdsRadioGroupComponent implements ControlValueAccessor {
  readonly groupLabel = input.required<string>();
  readonly options = input.required<RadioOption[]>();
  readonly name = input<string>(`pds-radio-group-${++radioGroupCounter}`);
  readonly disabled = input<boolean>(false);
  readonly orientation = input<'vertical' | 'horizontal'>('vertical');

  readonly valueChange = output<string>();

  protected readonly internalValue = signal<string | null>(null);
  protected readonly internalDisabled = signal(false);
  protected readonly focusedIndex = signal<number>(-1);

  private onChange: (val: string | null) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    effect(() => { this.internalDisabled.set(this.disabled()); });
  }

  protected readonly listClasses = computed(() => ({
    'pds-radio-group__list': true,
    'pds-radio-group__list--horizontal': this.orientation() === 'horizontal',
  }));

  protected isChecked(value: string): boolean {
    return this.internalValue() === value;
  }

  protected isDisabled(option: RadioOption): boolean {
    return this.internalDisabled() || !!option.disabled;
  }

  /** Tabindex roving: only the selected (or first) option gets tabindex=0 */
  protected getTabIndex(value: string, index: number): number {
    const current = this.internalValue();
    if (current !== null) {
      return current === value ? 0 : -1;
    }
    // Nothing selected: first enabled option gets focus
    const firstEnabledIdx = this.options().findIndex((o) => !o.disabled);
    return index === firstEnabledIdx ? 0 : -1;
  }

  protected handleSelect(value: string): void {
    this.setSelected(value);
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (!['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;

    event.preventDefault();
    const enabled = this.options().filter((o) => !this.isDisabled(o));
    if (enabled.length === 0) return;

    const currentVal = this.internalValue();
    const currentIdx = enabled.findIndex((o) => o.value === currentVal);

    let nextIdx: number;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      nextIdx = (currentIdx + 1) % enabled.length;
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      nextIdx = (currentIdx - 1 + enabled.length) % enabled.length;
    } else if (event.key === 'Home') {
      nextIdx = 0;
    } else {
      nextIdx = enabled.length - 1;
    }

    this.setSelected(enabled[nextIdx].value);
  }

  private setSelected(value: string): void {
    if (this.internalDisabled()) return;
    this.internalValue.set(value);
    this.onChange(value);
    this.onTouched();
    this.valueChange.emit(value);
  }

  // ControlValueAccessor
  writeValue(val: string | null): void {
    this.internalValue.set(val);
  }

  registerOnChange(fn: (val: string | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.internalDisabled.set(isDisabled);
  }
}
