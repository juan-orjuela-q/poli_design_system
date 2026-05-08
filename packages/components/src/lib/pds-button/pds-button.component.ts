import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { PdsIconComponent } from '../pds-icon/pds-icon.component';

@Component({
  selector: 'pds-button',
  standalone: true,
  imports: [NgClass, PdsIconComponent],
  templateUrl: './pds-button.component.html',
  styleUrl: './pds-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdsButtonComponent {
  /** Variante visual del botón. */
  readonly variant = input<
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'ghost'
    | 'destructive'
    | 'destructive-outline'
  >('primary');

  /** Tamaño del botón. */
  readonly size = input<'sm' | 'md' | 'lg'>('md');

  /** Forma del borde — siempre pill, definido por diseño. */
  // readonly rounded = input<'pill' | 'rectangle'>('pill'); // eliminado: DS v2 solo usa pill

  /** Estado deshabilitado. */
  readonly disabled = input<boolean>(false);

  /** Nombre del ícono al inicio (Material Symbols). */
  readonly iconStart = input<string | null>(null);

  /** Nombre del ícono al final (Material Symbols). */
  readonly iconEnd = input<string | null>(null);

  /** Tipo HTML del botón. */
  readonly type = input<'button' | 'submit' | 'reset'>('button');

  protected readonly buttonClasses = computed(() => ({
    'pds-button': true,
    [`pds-button--${this.variant()}`]: true,
    'pds-button--sm': this.size() === 'sm',
    'pds-button--lg': this.size() === 'lg',
    'pds-button--disabled': this.disabled(),
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
