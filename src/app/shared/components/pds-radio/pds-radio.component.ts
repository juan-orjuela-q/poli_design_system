import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  output,
  signal,
} from '@angular/core';
import { NgClass } from '@angular/common';

let radioCounter = 0;

@Component({
  selector: 'pds-radio',
  standalone: true,
  imports: [NgClass],
  templateUrl: './pds-radio.component.html',
  styleUrl: './pds-radio.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdsRadioComponent {
  readonly label = input.required<string>();
  readonly name = input.required<string>();
  readonly value = input.required<string>();
  readonly checked = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  /** Managed externally by pds-radio-group. -1 removes from tab order. */
  readonly tabIndex = input<number>(0);

  readonly radioId = `pds-radio-${++radioCounter}`;

  readonly checkedChange = output<string>();

  protected readonly internalChecked = signal(false);
  protected readonly internalDisabled = signal(false);

  constructor() {
    effect(() => { this.internalChecked.set(this.checked()); });
    effect(() => { this.internalDisabled.set(this.disabled()); });
  }

  protected readonly hostClasses = computed(() => ({
    'pds-radio': true,
    'pds-radio--checked': this.internalChecked(),
    'pds-radio--disabled': this.internalDisabled(),
  }));

  protected handleChange(): void {
    if (this.internalDisabled()) return;
    this.internalChecked.set(true);
    this.checkedChange.emit(this.value());
  }
}
