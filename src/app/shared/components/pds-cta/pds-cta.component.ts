import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { PdsIconComponent } from '../pds-icon/pds-icon.component';

@Component({
  selector: 'pds-cta',
  standalone: true,
  imports: [NgClass, PdsIconComponent],
  templateUrl: './pds-cta.component.html',
  styleUrl: './pds-cta.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdsCtaComponent {
  /** Variante de dispositivo — controla tamaño de texto e ícono. */
  readonly device = input<'desktop' | 'mobile'>('desktop');

  /** Estado deshabilitado. Usa aria-disabled para mantener el elemento en el tab order. */
  readonly disabled = input<boolean>(false);

  /** Nombre del ícono (Material Symbols Rounded). */
  readonly iconName = input<string>('arrow_forward');

  /** Tipo HTML del botón. */
  readonly type = input<'button' | 'submit'>('button');

  protected readonly hostClasses = computed(() => ({
    'pds-cta': true,
    'pds-cta--mobile': this.device() === 'mobile',
    'pds-cta--disabled': this.disabled(),
  }));

  protected handleClick(event: MouseEvent): void {
    if (this.disabled()) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }
}
