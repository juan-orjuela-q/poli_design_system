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

let checkboxCounter = 0;

@Component({
  selector: 'pds-checkbox',
  standalone: true,
  imports: [NgClass, PdsIconComponent],
  templateUrl: './pds-checkbox.component.html',
  styleUrl: './pds-checkbox.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PdsCheckboxComponent),
      multi: true,
    },
  ],
})
export class PdsCheckboxComponent implements ControlValueAccessor {
  @ViewChild('inputRef') inputRef!: ElementRef<HTMLInputElement>;

  readonly label = input.required<string>();
  readonly checked = input<boolean>(false);
  readonly indeterminate = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly name = input<string | null>(null);
  readonly value = input<string | null>(null);

  readonly checkedChange = output<boolean>();

  readonly checkboxId = `pds-checkbox-${++checkboxCounter}`;

  protected readonly internalChecked = signal(false);
  protected readonly internalDisabled = signal(false);

  private onChange: (val: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    // Sync input prop → internal state (non-CVA usage)
    effect(() => {
      this.internalChecked.set(this.checked());
    });
    effect(() => {
      this.internalDisabled.set(this.disabled());
    });
    // Sync indeterminate to native input
    effect(() => {
      if (this.inputRef?.nativeElement) {
        this.inputRef.nativeElement.indeterminate = this.indeterminate();
      }
    });
  }

  protected readonly hostClasses = computed(() => ({
    'pds-checkbox': true,
    'pds-checkbox--checked': this.internalChecked(),
    'pds-checkbox--indeterminate': this.indeterminate(),
    'pds-checkbox--disabled': this.internalDisabled(),
  }));

  protected handleChange(event: Event): void {
    if (this.internalDisabled()) {
      event.preventDefault();
      return;
    }
    const newVal = (event.target as HTMLInputElement).checked;
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
