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
import { PdsIconComponent } from '../pds-icon/pds-icon.component';
import { PdsButtonComponent } from '../pds-button/pds-button.component';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface StepperStep {
  /** Unique identifier used for tracking and aria. */
  id: string;
  /** Short label shown under/beside the icon (keep it brief). */
  label: string;
  /** Optional secondary line (step subtitle / description). */
  description?: string;
  /** Material Symbols icon name shown inside the marker circle. */
  icon: string;
}

export type StepState = 'current' | 'completed' | 'disabled';
export type StepperOrientation = 'horizontal' | 'vertical';

@Component({
  selector: 'pds-stepper',
  standalone: true,
  imports: [NgClass, PdsIconComponent, PdsButtonComponent],
  templateUrl: './pds-stepper.component.html',
  styleUrl: './pds-stepper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdsStepperComponent {
  // ── Inputs ──────────────────────────────────────────────────────────────────
  /** Array of step definitions (required). */
  readonly steps = input.required<StepperStep[]>();

  /**
   * 0-based index of the current (active) step.
   * The parent is responsible for updating this value on `stepChange`.
   */
  readonly currentStepIndex = input<number>(0);

  /** Show the "Step X of N" counter label above the markers. */
  readonly showCount = input<boolean>(true);

  /** Layout orientation. */
  readonly orientation = input<StepperOrientation>('horizontal');

  /** Label for the "Previous" button. */
  readonly prevLabel = input<string>('Anterior');

  /** Label for the "Next" button (non-last steps). */
  readonly nextLabel = input<string>('Siguiente');

  /** Label for the "Finish" button (last step). */
  readonly finishLabel = input<string>('Finalizar');

  /**
   * aria-label for the outer stepper group.
   * Provide a meaningful description of the multi-step process.
   */
  readonly ariaLabel = input<string>('Pasos del proceso');

  // ── Outputs ─────────────────────────────────────────────────────────────────
  /**
   * Emits the NEW 0-based index when the user clicks Anterior / Siguiente.
   * The parent must update `currentStepIndex` accordingly.
   */
  readonly stepChange = output<number>();

  /** Emitted when the user clicks "Finalizar" on the last step. */
  readonly finished = output<void>();

  // ── Derived state (computed) ─────────────────────────────────────────────────
  protected readonly isFirst = computed(() => this.currentStepIndex() === 0);
  protected readonly isLast = computed(
    () => this.currentStepIndex() === this.steps().length - 1
  );

  protected readonly stepCountLabel = computed(
    () => `Step ${this.currentStepIndex() + 1} of ${this.steps().length}`
  );

  /**
   * Derived array of states for each step marker.
   * Re-evaluates automatically when `currentStepIndex` or `steps` change.
   */
  protected readonly stepStates = computed<StepState[]>(() => {
    const curr = this.currentStepIndex();
    return this.steps().map((_, i) => {
      if (i < curr) return 'completed';
      if (i === curr) return 'current';
      return 'disabled';
    });
  });

  protected readonly hostClasses = computed(() => ({
    'pds-stepper': true,
    'pds-stepper--horizontal': this.orientation() === 'horizontal',
    'pds-stepper--vertical': this.orientation() === 'vertical',
  }));

  // ── Helpers ─────────────────────────────────────────────────────────────────
  protected markerClasses(state: StepState): Record<string, boolean> {
    return {
      'pds-stepper__marker': true,
      [`pds-stepper__marker--${state}`]: true,
    };
  }

  /**
   * Completed steps show a checkmark; all others show the step's configured icon.
   */
  protected markerIcon(index: number, step: StepperStep): string {
    return this.stepStates()[index] === 'completed'
      ? 'check_circle'
      : step.icon;
  }

  protected footerClasses = computed(() => ({
    'pds-stepper__footer': true,
    'pds-stepper__footer--first': this.isFirst(),
  }));

  // ── Interaction ─────────────────────────────────────────────────────────────
  protected onPrev(): void {
    const curr = this.currentStepIndex();
    if (curr > 0) this.stepChange.emit(curr - 1);
  }

  protected onNext(): void {
    const curr = this.currentStepIndex();
    if (curr < this.steps().length - 1) this.stepChange.emit(curr + 1);
  }

  protected onFinish(): void {
    this.finished.emit();
  }
}
