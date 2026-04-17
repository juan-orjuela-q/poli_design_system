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
import { PdsHelperTextComponent } from '../pds-helper-text/pds-helper-text.component';
import { PdsTooltipComponent } from '../pds-tooltip/pds-tooltip.component';

let selectCounter = 0;

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

@Component({
  selector: 'pds-select-field',
  standalone: true,
  imports: [NgClass, PdsIconComponent, PdsHelperTextComponent, PdsTooltipComponent],
  templateUrl: './pds-select-field.component.html',
  styleUrl: './pds-select-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PdsSelectFieldComponent),
      multi: true,
    },
  ],
})
export class PdsSelectFieldComponent implements ControlValueAccessor {
  readonly label = input.required<string>();
  readonly helpText = input<string | null>(null);
  readonly options = input.required<SelectOption[]>();
  readonly value = input<string | null>(null);
  readonly placeholder = input<string>('Selecciona una opción');
  readonly status = input<'default' | 'error' | 'warning' | 'success'>('default');
  readonly feedbackText = input<string | null>(null);
  readonly disabled = input<boolean>(false);
  readonly required = input<boolean>(false);

  readonly valueChange = output<string>();

  readonly selectId = `pds-select-${++selectCounter}`;
  readonly listboxId = `pds-select-listbox-${this.selectId}`;
  readonly helperId = `pds-select-helper-${this.selectId}`;

  protected readonly internalValue = signal<string | null>(null);
  protected readonly internalDisabled = signal(false);
  protected readonly isOpen = signal(false);
  protected readonly focusedIndex = signal(-1);

  private onChange: (val: string | null) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    effect(() => { this.internalValue.set(this.value()); });
    effect(() => { this.internalDisabled.set(this.disabled()); });
  }

  protected readonly selectedLabel = computed(() => {
    const val = this.internalValue();
    return val ? (this.options().find((o) => o.value === val)?.label ?? null) : null;
  });

  protected readonly triggerClasses = computed(() => ({
    'pds-select-field__trigger': true,
    'pds-select-field__trigger--open': this.isOpen(),
    [`pds-select-field__trigger--${this.status()}`]: this.status() !== 'default',
    'pds-select-field__trigger--disabled': this.internalDisabled(),
  }));

  protected readonly hostClasses = computed(() => ({
    'pds-select-field': true,
    [`pds-select-field--${this.status()}`]: this.status() !== 'default',
    'pds-select-field--disabled': this.internalDisabled(),
  }));

  protected activeOptionId(index: number): string {
    return `${this.listboxId}-option-${index}`;
  }

  protected readonly activedescendant = computed(() => {
    const idx = this.focusedIndex();
    return idx >= 0 ? this.activeOptionId(idx) : null;
  });

  protected open(): void {
    if (this.internalDisabled()) return;
    this.isOpen.set(true);
    // Focus the selected option or first
    const currentVal = this.internalValue();
    const idx = currentVal ? this.options().findIndex((o) => o.value === currentVal) : 0;
    this.focusedIndex.set(idx >= 0 ? idx : 0);
  }

  protected close(): void {
    this.isOpen.set(false);
    this.focusedIndex.set(-1);
  }

  protected toggleOpen(): void {
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  protected selectOption(option: SelectOption): void {
    if (option.disabled) return;
    this.internalValue.set(option.value);
    this.onChange(option.value);
    this.onTouched();
    this.valueChange.emit(option.value);
    this.close();
  }

  protected isSelected(option: SelectOption): boolean {
    return this.internalValue() === option.value;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest(`#${this.selectId}-container`)) {
      this.close();
    }
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (this.internalDisabled()) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (!this.isOpen()) {
          this.open();
        } else {
          const idx = this.focusedIndex();
          if (idx >= 0) this.selectOption(this.options()[idx]);
        }
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!this.isOpen()) {
          this.open();
        } else {
          this.moveFocus(1);
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (this.isOpen()) this.moveFocus(-1);
        break;
      case 'Home':
        if (this.isOpen()) { event.preventDefault(); this.focusedIndex.set(0); }
        break;
      case 'End':
        if (this.isOpen()) { event.preventDefault(); this.focusedIndex.set(this.options().length - 1); }
        break;
      case 'Escape':
        if (this.isOpen()) { event.preventDefault(); this.close(); }
        break;
      case 'Tab':
        if (this.isOpen()) this.close();
        break;
    }
  }

  private moveFocus(delta: number): void {
    const opts = this.options();
    let idx = this.focusedIndex() + delta;
    idx = Math.max(0, Math.min(opts.length - 1, idx));
    // Skip disabled options
    while (idx >= 0 && idx < opts.length && opts[idx].disabled) {
      idx += delta;
    }
    if (idx >= 0 && idx < opts.length) {
      this.focusedIndex.set(idx);
    }
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
