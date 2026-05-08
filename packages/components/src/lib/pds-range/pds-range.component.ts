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
import { NgClass, NgStyle } from '@angular/common';

let rangeCounter = 0;

export type RangeType = 'single' | 'double';
export type RangeValue = number | { min: number; max: number };

@Component({
  selector: 'pds-range',
  standalone: true,
  imports: [NgClass, NgStyle],
  templateUrl: './pds-range.component.html',
  styleUrl: './pds-range.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PdsRangeComponent),
      multi: true,
    },
  ],
})
export class PdsRangeComponent implements ControlValueAccessor {
  // ── Inputs ────────────────────────────────────────────────────────────────
  /** Modo simple (un thumb) o doble (dos thumbs: mín-máx). */
  readonly type = input<RangeType>('single');

  /** Valor mínimo del eje. */
  readonly min = input<number>(0);

  /** Valor máximo del eje. */
  readonly max = input<number>(100);

  /** Incremento de cada paso. */
  readonly step = input<number>(1);

  /** Valor inicial para modo single. */
  readonly value = input<number | null>(null);

  /** Valor mínimo inicial para modo double. */
  readonly valueMin = input<number | null>(null);

  /** Valor máximo inicial para modo double. */
  readonly valueMax = input<number | null>(null);

  /** Mostrar inputs numéricos en los laterales. */
  readonly showInputs = input<boolean>(true);

  /** Deshabilita el control. */
  readonly disabled = input<boolean>(false);

  /** Etiqueta del campo (modo single). */
  readonly label = input<string | null>(null);

  /** Etiqueta del input izquierdo (modo double). */
  readonly labelMin = input<string>('Min');

  /** Etiqueta del input derecho (modo double). */
  readonly labelMax = input<string>('Max');

  // ── Outputs ───────────────────────────────────────────────────────────────
  readonly rangeChange  = output<{ min: number; max: number }>();
  readonly singleChange = output<number>();

  // ── IDs ──────────────────────────────────────────────────────────────────
  protected readonly idMin = `pds-range-${++rangeCounter}-min`;
  protected readonly idMax = `pds-range-${rangeCounter}-max`;

  // ── Internal state ────────────────────────────────────────────────────────
  protected readonly internalValue    = signal<number>(0);
  protected readonly internalMin      = signal<number>(0);
  protected readonly internalMax      = signal<number>(100);
  protected readonly internalDisabled = signal(false);

  private onChange: (val: RangeValue) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    effect(() => {
      const v = this.value();
      this.internalValue.set(v !== null ? v : this.min());
    });
    effect(() => {
      const v = this.valueMin();
      this.internalMin.set(v !== null ? v : this.min());
    });
    effect(() => {
      const v = this.valueMax();
      this.internalMax.set(v !== null ? v : this.max());
    });
    effect(() => { this.internalDisabled.set(this.disabled()); });
  }

  // ── Percentages for visual positioning (0–100) ────────────────────────────
  protected readonly singlePct = computed(() => this.toPct(this.internalValue()));
  protected readonly minPct    = computed(() => this.toPct(this.internalMin()));
  protected readonly maxPct    = computed(() => this.toPct(this.internalMax()));

  /** Inline styles for the filled portion of the track. */
  protected readonly fillStyle = computed((): Record<string, string> => {
    if (this.type() === 'single') {
      return { left: '0%', width: `${this.singlePct()}%` };
    }
    return {
      left:  `${this.minPct()}%`,
      width: `${this.maxPct() - this.minPct()}%`,
    };
  });

  /**
   * When both thumbs are at the same position, the min thumb must be on top
   * so the user can still drag it to the left.
   */
  protected readonly minZIndex = computed(() => this.minPct() >= 50 ? 3 : 2);

  protected readonly hostClasses = computed(() => ({
    'pds-range':           true,
    'pds-range--double':   this.type() === 'double',
    'pds-range--disabled': this.internalDisabled(),
  }));

  // ── Slider event handlers ─────────────────────────────────────────────────
  protected onSingleSlider(e: Event): void {
    const val = Number((e.target as HTMLInputElement).value);
    this.internalValue.set(val);
    this.onChange(val);
    this.singleChange.emit(val);
  }

  protected onMinSlider(e: Event): void {
    const raw = Number((e.target as HTMLInputElement).value);
    const val = Math.min(raw, this.internalMax() - this.step());
    this.internalMin.set(val);
    this.emitRange();
  }

  protected onMaxSlider(e: Event): void {
    const raw = Number((e.target as HTMLInputElement).value);
    const val = Math.max(raw, this.internalMin() + this.step());
    this.internalMax.set(val);
    this.emitRange();
  }

  // ── Numeric input event handlers ──────────────────────────────────────────
  protected onSingleText(e: Event): void {
    const val = this.clamp(Number((e.target as HTMLInputElement).value));
    this.internalValue.set(val);
    this.onChange(val);
    this.singleChange.emit(val);
  }

  protected onMinText(e: Event): void {
    const val = this.clamp(
      Number((e.target as HTMLInputElement).value),
      this.min(),
      this.internalMax() - this.step(),
    );
    this.internalMin.set(val);
    this.emitRange();
  }

  protected onMaxText(e: Event): void {
    const val = this.clamp(
      Number((e.target as HTMLInputElement).value),
      this.internalMin() + this.step(),
      this.max(),
    );
    this.internalMax.set(val);
    this.emitRange();
  }

  // ── Helpers ───────────────────────────────────────────────────────────────
  private emitRange(): void {
    const r = { min: this.internalMin(), max: this.internalMax() };
    this.onChange(r);
    this.rangeChange.emit(r);
  }

  private toPct(val: number): number {
    const range = this.max() - this.min();
    if (range === 0) return 0;
    return ((val - this.min()) / range) * 100;
  }

  private clamp(val: number, lo = this.min(), hi = this.max()): number {
    const v = isNaN(val) ? lo : val;
    return Math.min(hi, Math.max(lo, v));
  }

  // ── CVA ───────────────────────────────────────────────────────────────────
  writeValue(val: RangeValue | null): void {
    if (val === null || val === undefined) return;
    if (typeof val === 'number') {
      this.internalValue.set(val);
    } else {
      this.internalMin.set(val.min);
      this.internalMax.set(val.max);
    }
  }

  registerOnChange(fn: (val: RangeValue) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void { this.internalDisabled.set(isDisabled); }
}
