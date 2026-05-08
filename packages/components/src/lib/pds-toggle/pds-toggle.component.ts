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
import { PdsIconComponent } from '../pds-icon/pds-icon.component';

let toggleCounter = 0;

@Component({
  selector: 'pds-toggle',
  standalone: true,
  imports: [NgClass, PdsIconComponent],
  templateUrl: './pds-toggle.component.html',
  styleUrl: './pds-toggle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PdsToggleComponent),
      multi: true,
    },
  ],
})
export class PdsToggleComponent implements ControlValueAccessor {
  readonly label = input.required<string>();
  readonly checked = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly labelPosition = input<'left' | 'right'>('right');

  readonly toggleId = `pds-toggle-${++toggleCounter}`;

  readonly checkedChange = output<boolean>();

  protected readonly internalChecked = signal(false);
  protected readonly internalDisabled = signal(false);

  private onChange: (val: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    effect(() => { this.internalChecked.set(this.checked()); });
    effect(() => { this.internalDisabled.set(this.disabled()); });
  }

  protected readonly hostClasses = computed(() => ({
    'pds-toggle': true,
    'pds-toggle--on': this.internalChecked(),
    'pds-toggle--disabled': this.internalDisabled(),
    'pds-toggle--label-left': this.labelPosition() === 'left',
  }));

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.toggle();
    }
  }

  protected handleClick(): void {
    this.toggle();
  }

  private toggle(): void {
    if (this.internalDisabled()) return;
    const newVal = !this.internalChecked();
    this.internalChecked.set(newVal);
    this.onChange(newVal);
    this.onTouched();
    this.checkedChange.emit(newVal);
  }

  // ControlValueAccessor
  writeValue(val: boolean): void {
    this.internalChecked.set(!!val);
  }

  registerOnChange(fn: (val: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.internalDisabled.set(isDisabled);
  }
}
