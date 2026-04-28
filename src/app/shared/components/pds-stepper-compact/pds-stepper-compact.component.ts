import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { NgClass } from '@angular/common';

import { PdsButtonComponent } from '../pds-button/pds-button.component';

// ── Contador para IDs únicos ────────────────────────────────────────────────
let counter = 0;

// ── Interfaces públicas ─────────────────────────────────────────────────────

/**
 * Define un paso dentro del flujo del Stepper Compact.
 */
export interface CompactStep {
  /** Identificador único del paso. */
  id: string;
  /** Etiqueta del paso (título que aparece cuando el paso está activo). */
  label: string;
}

// ── Componente ──────────────────────────────────────────────────────────────

/**
 * **PdsStepperCompact**
 *
 * Comunica el progreso dentro de un flujo secuencial cuando el espacio
 * disponible es reducido o cuando no es necesario mostrar todos los pasos
 * con detalle.
 *
 * El padre controla el índice activo (`currentIndex`) y responde a los
 * outputs `next` y `prev` para avanzar o retroceder.
 *
 * ### Uso básico
 * ```html
 * <pds-stepper-compact
 *   [steps]="steps"
 *   [currentIndex]="currentIndex"
 *   (next)="goNext()"
 *   (prev)="goPrev()"
 * >
 *   <!-- Contenido del paso activo -->
 * </pds-stepper-compact>
 * ```
 *
 * ### Recomendación de superficie
 * Usar sobre Canvas, Subtle o Sunken para garantizar contraste máximo (≥ 4.5:1).
 * Evitar sobre Primary Solid (contraste insuficiente — texto imperceptible).
 */
@Component({
  selector: 'pds-stepper-compact',
  standalone: true,
  imports: [NgClass, PdsButtonComponent],
  templateUrl: './pds-stepper-compact.component.html',
  styleUrl: './pds-stepper-compact.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdsStepperCompactComponent {
  // ── Inputs ─────────────────────────────────────────────────────────────────

  /** Lista de pasos del flujo. Requerido. */
  readonly steps = input.required<CompactStep[]>();

  /**
   * Índice del paso activo (0-based).
   * El padre es responsable de actualizar este valor al recibir los outputs.
   */
  readonly currentIndex = input<number>(0);

  /** Muestra el pie de página con botones de navegación. */
  readonly showFooter = input<boolean>(true);

  /** Etiqueta del botón "siguiente". */
  readonly nextLabel = input<string>('Siguiente');

  /** Etiqueta del botón "anterior". */
  readonly prevLabel = input<string>('Anterior');

  /** Etiqueta del botón "finalizar" (último paso). */
  readonly finishLabel = input<string>('Finalizar');

  // ── Outputs ────────────────────────────────────────────────────────────────

  /** Emite cuando el usuario hace clic en "Siguiente" o "Finalizar". */
  readonly next = output<void>();

  /** Emite cuando el usuario hace clic en "Anterior". */
  readonly prev = output<void>();

  // ── IDs únicos ─────────────────────────────────────────────────────────────

  protected readonly countId = `pds-stepper-compact-count-${++counter}`;

  // ── Computed ───────────────────────────────────────────────────────────────

  /** Paso actualmente activo. */
  protected readonly currentStep = computed(
    () => this.steps()[this.currentIndex()] ?? null
  );

  /** Siguiente paso en la lista (para la línea "Siguiente paso: …"). */
  protected readonly followingStep = computed(
    () => this.steps()[this.currentIndex() + 1] ?? null
  );

  /** Texto "Paso X de Y". */
  protected readonly countText = computed(
    () => `Paso ${this.currentIndex() + 1} de ${this.steps().length}`
  );

  /** Si es el primer paso. */
  protected readonly isFirst = computed(() => this.currentIndex() === 0);

  /** Si es el último paso. */
  protected readonly isLast = computed(
    () => this.currentIndex() === this.steps().length - 1
  );

  /** Etiqueta del botón primario según si es el último paso o no. */
  protected readonly primaryBtnLabel = computed(() =>
    this.isLast() ? this.finishLabel() : this.nextLabel()
  );

  /** Ícono del botón primario (arrow_forward solo en "Siguiente"). */
  protected readonly primaryBtnIcon = computed(() =>
    this.isLast() ? 'check' : 'arrow_forward'
  );

  // ── Métodos ────────────────────────────────────────────────────────────────

  /**
   * Devuelve el estado visual del marcador para el índice dado.
   * - `'current'` → barra teal gruesa (paso activo).
   * - `'default'` → barra gris delgada (cualquier otro paso).
   */
  protected markerState(index: number): 'current' | 'default' {
    return index === this.currentIndex() ? 'current' : 'default';
  }

  protected onNext(): void {
    this.next.emit();
  }

  protected onPrev(): void {
    this.prev.emit();
  }
}
