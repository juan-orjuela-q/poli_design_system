import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'pds-loading-circle',
  standalone: true,
  imports: [NgClass],
  templateUrl: './pds-loading-circle.component.html',
  styleUrl: './pds-loading-circle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdsLoadingCircleComponent {
  /** Tamaño del spinner. */
  readonly size = input<'sm' | 'md' | 'lg'>('md');

  /** Texto descriptivo para lectores de pantalla (y visible si no hay label). */
  readonly ariaLabel = input<string>('Cargando');

  /** Etiqueta visible junto al spinner. Si se omite, no se muestra texto. */
  readonly label = input<string>('');

  protected readonly spinnerClasses = computed(() => ({
    'pds-loading-circle': true,
    [`pds-loading-circle--${this.size()}`]: true,
  }));
}
