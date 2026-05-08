import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { NgClass } from '@angular/common';

/** Contador estático para generar IDs únicos por instancia. */
let tooltipCounter = 0;

/**
 * **PdsTooltip**
 *
 * Envuelve un elemento activador y muestra un tooltip al hacer hover o foco.
 *
 * ### Uso
 * ```html
 * <pds-tooltip text="Información adicional" position="top">
 *   <button>Ayuda</button>
 * </pds-tooltip>
 * ```
 *
 * ### Accesibilidad
 * El activador interno debe tener `[attr.aria-describedby]="tooltipId"` para
 * que los lectores de pantalla anuncien el tooltip. El componente expone
 * `tooltipId` como propiedad pública para facilitar este binding.
 */
@Component({
  selector: 'pds-tooltip',
  standalone: true,
  imports: [NgClass],
  templateUrl: './pds-tooltip.component.html',
  styleUrl: './pds-tooltip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdsTooltipComponent {
  /** Texto del tooltip. Requerido. */
  readonly text = input.required<string>();

  /** Posición del tooltip respecto al activador. */
  readonly position = input<'top' | 'top-end' | 'bottom' | 'left' | 'right'>('top');

  /** Deshabilita la aparición del tooltip. */
  readonly disabled = input<boolean>(false);

  /** ID único del bubble — expuesto para que el activador lo use en aria-describedby. */
  readonly tooltipId = `pds-tooltip-${++tooltipCounter}`;

  protected readonly bubbleClasses = computed(() => ({
    'pds-tooltip__bubble': true,
    [`pds-tooltip__bubble--${this.position()}`]: true,
  }));
}
