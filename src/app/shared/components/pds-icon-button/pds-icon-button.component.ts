import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { PdsIconComponent } from '../pds-icon/pds-icon.component';
import { PdsTooltipComponent } from '../pds-tooltip/pds-tooltip.component';

@Component({
  selector: 'pds-icon-button',
  standalone: true,
  imports: [NgClass, PdsIconComponent, PdsTooltipComponent],
  templateUrl: './pds-icon-button.component.html',
  styleUrl: './pds-icon-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdsIconButtonComponent {
  /** Variante visual del botón. */
  readonly variant = input<
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'ghost'
    | 'ghost-neutral'
    | 'tertiary'
    | 'destructive'
    | 'destructive-outline'
  >('primary');

  /** Tamaño del botón. SM = 32px visual / 48px touch target. */
  readonly size = input<'sm' | 'md' | 'lg'>('md');

  /** Forma del borde. */
  readonly rounded = input<'pill' | 'rectangle'>('pill');

  /** Estado deshabilitado. Usa aria-disabled (mantiene el tab order). */
  readonly disabled = input<boolean>(false);

  /** Nombre del ícono (Material Symbols). Requerido. */
  readonly iconName = input.required<string>();

  /**
   * Etiqueta accesible del botón. Requerido.
   * Se usa como aria-label y como texto del tooltip por defecto.
   */
  readonly ariaLabel = input.required<string>();

  /**
   * Texto personalizado para el tooltip.
   * Si no se especifica, usa el mismo valor que ariaLabel.
   */
  readonly tooltipText = input<string | null>(null);

  /** Posición del tooltip respecto al botón. */
  readonly tooltipPosition = input<'top' | 'top-end' | 'bottom' | 'left' | 'right'>('top');

  /** Tipo HTML del botón. */
  readonly type = input<'button' | 'submit'>('button');

  /** Texto efectivo del tooltip — ariaLabel como fallback. */
  protected readonly resolvedTooltipText = computed(
    () => this.tooltipText() ?? this.ariaLabel()
  );

  /** Tamaño del ícono interno según el tamaño del botón. */
  protected readonly iconSize = computed(() => {
    if (this.size() === 'lg') return 'lg'; // 32px
    if (this.size() === 'sm') return 'sm'; // 20px
    return 'md';                           // 24px
  });

  protected readonly buttonClasses = computed(() => ({
    'pds-icon-button': true,
    [`pds-icon-button--${this.variant()}`]: true,
    'pds-icon-button--sm': this.size() === 'sm',
    'pds-icon-button--lg': this.size() === 'lg',
    'pds-icon-button--rectangle': this.rounded() === 'rectangle',
    'pds-icon-button--disabled': this.disabled(),
  }));

  /**
   * Bloquea la acción cuando el botón está deshabilitado vía aria-disabled.
   * Necesario porque no usamos el atributo nativo `disabled` (que sacaría al
   * elemento del tab order, violando WCAG 2.1.1 SC).
   */
  protected handleClick(event: MouseEvent): void {
    if (this.disabled()) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }
}
