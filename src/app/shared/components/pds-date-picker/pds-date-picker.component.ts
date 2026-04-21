import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  forwardRef,
  HostListener,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getYear,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  isToday,
  isValid,
  parse,
  setMonth,
  setYear,
  startOfMonth,
  startOfWeek,
  subMonths,
} from 'date-fns';
import { es } from 'date-fns/locale';
import { PdsIconComponent } from '../pds-icon/pds-icon.component';
import { PdsIconButtonComponent } from '../pds-icon-button/pds-icon-button.component';
import { PdsHelperTextComponent } from '../pds-helper-text/pds-helper-text.component';
import { PdsTooltipComponent } from '../pds-tooltip/pds-tooltip.component';

let datepickerCounter = 0;

export type DatePickerMode = 'single' | 'range';
export type DatePickerStatus = 'default' | 'error' | 'warning' | 'success';

// View shown inside the calendar panel
type CalendarView = 'days' | 'months' | 'years';

const DATE_FORMAT = 'dd/MM/yyyy';
const WEEK_DAYS = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'];
const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

@Component({
  selector: 'pds-date-picker',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule, PdsIconComponent, PdsIconButtonComponent, PdsHelperTextComponent, PdsTooltipComponent],
  templateUrl: './pds-date-picker.component.html',
  styleUrl: './pds-date-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PdsDatePickerComponent),
      multi: true,
    },
  ],
})
export class PdsDatePickerComponent implements ControlValueAccessor {
  // ── Inputs ────────────────────────────────────────────────────────────────
  readonly label     = input.required<string>();
  readonly mode      = input<DatePickerMode>('single');
  readonly placeholder = input<string>(DATE_FORMAT.toLowerCase());
  readonly minDate   = input<Date | null>(null);
  readonly maxDate   = input<Date | null>(null);
  readonly disabled  = input<boolean>(false);
  readonly required  = input<boolean>(false);
  readonly status    = input<DatePickerStatus>('default');
  readonly feedbackText = input<string | null>(null);
  readonly helpText  = input<string | null>(null);
  readonly value     = input<Date | null>(null);

  // ── Outputs ───────────────────────────────────────────────────────────────
  readonly dateChange      = output<Date | null>();
  readonly dateRangeChange = output<{ start: Date | null; end: Date | null }>();

  // ── IDs ──────────────────────────────────────────────────────────────────
  protected readonly id = `pds-date-picker-${++datepickerCounter}`;
  protected readonly helperId = `${this.id}-helper`;

  // ── State ─────────────────────────────────────────────────────────────────
  protected isOpen    = signal(false);
  protected view      = signal<CalendarView>('days');

  // Single mode value
  protected selectedDate = signal<Date | null>(null);

  // Range mode values
  protected rangeStart    = signal<Date | null>(null);
  protected rangeEnd      = signal<Date | null>(null);
  protected hoverDate     = signal<Date | null>(null);

  // Calendar navigation
  protected viewDate  = signal<Date>(new Date());

  // Text input value (what the user typed)
  protected inputValue = signal<string>('');

  // Year range for year-picker view
  protected yearRangeStart = signal<number>(Math.floor(getYear(new Date()) / 12) * 12);

  // ── Computed ──────────────────────────────────────────────────────────────
  protected readonly weekDays = WEEK_DAYS;
  protected readonly months   = MONTHS;

  protected readonly calendarDays = computed(() => {
    const first = startOfMonth(this.viewDate());
    const last  = endOfMonth(this.viewDate());
    const start = startOfWeek(first, { weekStartsOn: 0 });
    const end   = endOfWeek(last,   { weekStartsOn: 0 });
    return eachDayOfInterval({ start, end });
  });

  protected readonly yearRange = computed(() => {
    const s = this.yearRangeStart();
    return Array.from({ length: 12 }, (_, i) => s + i);
  });

  protected readonly viewMonthLabel = computed(() =>
    format(this.viewDate(), 'MMMM yyyy', { locale: es })
  );

  protected readonly displayValue = computed(() => {
    if (this.mode() === 'range') {
      const s = this.rangeStart();
      const e = this.rangeEnd();
      if (s && e) return `${format(s, DATE_FORMAT)} - ${format(e, DATE_FORMAT)}`;
      if (s)     return format(s, DATE_FORMAT);
      return '';
    }
    const d = this.selectedDate();
    return d ? format(d, DATE_FORMAT) : '';
  });

  protected readonly hostClasses = computed(() => ({
    'pds-date-picker': true,
    'pds-date-picker--open': this.isOpen(),
    [`pds-date-picker--${this.status()}`]: this.status() !== 'default',
    'pds-date-picker--disabled': this.internalDisabled(),
  }));

  protected readonly triggerClasses = computed(() => ({
    'pds-date-picker__trigger': true,
    'pds-date-picker__trigger--open': this.isOpen(),
    [`pds-date-picker__trigger--${this.status()}`]: this.status() !== 'default',
    'pds-date-picker__trigger--disabled': this.internalDisabled(),
    'pds-date-picker__trigger--placeholder': !this.displayValue(),
  }));

  // CVA
  private onChange: (v: Date | null) => void = () => {};
  private onTouched: () => void = () => {};
  protected internalDisabled = signal(false);

  constructor() {
    // Sync value input → internal state (for use without formControl)
    effect(() => {
      const v = this.value();
      if (v && isValid(v)) {
        this.selectedDate.set(v);
        this.viewDate.set(v);
      }
    });
  }

  writeValue(value: Date | null): void {
    if (value && isValid(value)) {
      this.selectedDate.set(value);
      this.viewDate.set(value);
    } else {
      this.selectedDate.set(null);
    }
  }
  registerOnChange(fn: (v: Date | null) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void { this.internalDisabled.set(isDisabled); }

  // ── Panel open/close ─────────────────────────────────────────────────────
  protected toggleOpen(): void {
    if (this.internalDisabled() || this.disabled()) return;
    this.isOpen.update(v => !v);
    if (this.isOpen()) this.view.set('days');
  }

  protected closePanel(): void {
    this.isOpen.set(false);
    this.onTouched();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void { if (this.isOpen()) this.closePanel(); }

  // ── Navigation ───────────────────────────────────────────────────────────
  protected prevMonth(): void { this.viewDate.update(d => subMonths(d, 1)); }
  protected nextMonth(): void { this.viewDate.update(d => addMonths(d, 1)); }

  protected prevYearRange(): void { this.yearRangeStart.update(y => y - 12); }
  protected nextYearRange(): void { this.yearRangeStart.update(y => y + 12); }

  protected setView(v: CalendarView): void { this.view.set(v); }

  protected selectMonth(monthIndex: number): void {
    this.viewDate.update(d => setMonth(d, monthIndex));
    this.view.set('days');
  }

  protected selectYear(year: number): void {
    this.viewDate.update(d => setYear(d, year));
    this.view.set('months');
  }

  // ── Day selection ─────────────────────────────────────────────────────────
  protected selectDay(day: Date): void {
    if (this.isDayDisabled(day)) return;

    if (this.mode() === 'range') {
      const start = this.rangeStart();
      if (!start || (start && this.rangeEnd())) {
        // Start new range
        this.rangeStart.set(day);
        this.rangeEnd.set(null);
      } else {
        // Complete range
        if (isBefore(day, start)) {
          this.rangeEnd.set(start);
          this.rangeStart.set(day);
        } else {
          this.rangeEnd.set(day);
        }
        this.dateRangeChange.emit({ start: this.rangeStart(), end: this.rangeEnd() });
        this.closePanel();
      }
    } else {
      this.selectedDate.set(day);
      this.viewDate.set(day);
      this.onChange(day);
      this.dateChange.emit(day);
      this.closePanel();
    }
  }

  protected onHoverDay(day: Date): void {
    if (this.mode() === 'range' && this.rangeStart() && !this.rangeEnd()) {
      this.hoverDate.set(day);
    }
  }

  // ── Day state helpers ────────────────────────────────────────────────────
  protected isSelected(day: Date): boolean {
    if (this.mode() === 'range') {
      const s = this.rangeStart(), e = this.rangeEnd();
      return (!!s && isSameDay(day, s)) || (!!e && isSameDay(day, e));
    }
    const sel = this.selectedDate();
    return !!sel && isSameDay(day, sel);
  }

  protected isInRange(day: Date): boolean {
    if (this.mode() !== 'range') return false;
    const start = this.rangeStart();
    const end   = this.rangeEnd() ?? this.hoverDate();
    if (!start || !end) return false;
    const from = isBefore(start, end) ? start : end;
    const to   = isBefore(start, end) ? end   : start;
    return isAfter(day, from) && isBefore(day, to);
  }

  protected isRangeStart(day: Date): boolean {
    const s = this.rangeStart();
    return this.mode() === 'range' && !!s && isSameDay(day, s);
  }

  protected isRangeEnd(day: Date): boolean {
    const e = this.rangeEnd();
    return this.mode() === 'range' && !!e && isSameDay(day, e);
  }

  protected isToday(day: Date): boolean { return isToday(day); }

  protected isOtherMonth(day: Date): boolean { return !isSameMonth(day, this.viewDate()); }

  protected isDayDisabled(day: Date): boolean {
    const min = this.minDate(), max = this.maxDate();
    if (min && isBefore(day, min) && !isSameDay(day, min)) return true;
    if (max && isAfter(day,  max) && !isSameDay(day, max)) return true;
    return false;
  }

  protected dayAriaLabel(day: Date): string {
    return format(day, "EEEE d 'de' MMMM 'de' yyyy", { locale: es });
  }

  protected dayClasses(day: Date): Record<string, boolean> {
    return {
      'pds-date-picker__day': true,
      'pds-date-picker__day--today':       this.isToday(day),
      'pds-date-picker__day--selected':    this.isSelected(day),
      'pds-date-picker__day--in-range':    this.isInRange(day),
      'pds-date-picker__day--range-start': this.isRangeStart(day),
      'pds-date-picker__day--range-end':   this.isRangeEnd(day),
      'pds-date-picker__day--disabled':    this.isDayDisabled(day),
      'pds-date-picker__day--other-month': this.isOtherMonth(day),
    };
  }

  protected isMonthSelected(monthIndex: number): boolean {
    return isSameMonth(this.viewDate(), setMonth(new Date(), monthIndex));
  }

  protected isYearSelected(year: number): boolean {
    return getYear(this.viewDate()) === year;
  }

  // ── Text input handling ──────────────────────────────────────────────────
  protected onInputChange(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.inputValue.set(val);
    if (val.length === 10) {
      const parsed = parse(val, DATE_FORMAT, new Date());
      if (isValid(parsed)) {
        this.selectedDate.set(parsed);
        this.viewDate.set(parsed);
        this.onChange(parsed);
        this.dateChange.emit(parsed);
      }
    }
    if (!val) {
      this.selectedDate.set(null);
      this.onChange(null);
      this.dateChange.emit(null);
    }
  }
}
