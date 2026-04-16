import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { PdsIconComponent } from '../pds-icon/pds-icon.component';

@Component({
  selector: 'pds-badge',
  standalone: true,
  imports: [NgClass, PdsIconComponent],
  templateUrl: './pds-badge.component.html',
  styleUrl: './pds-badge.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdsBadgeComponent {
  /** Estado semántico del badge. */
  readonly status = input<
    'brand' | 'brand-subtle' | 'brand-secondary' | 'neutral' | 'success' | 'warning' | 'error'
  >('neutral');

  /** Tamaño del badge. */
  readonly size = input<'sm' | 'md' | 'lg'>('md');

  /** Forma del borde. */
  readonly shape = input<'pill' | 'rectangle'>('pill');

  /** Nombre del ícono al inicio (Material Symbols). Decorativo. */
  readonly iconStart = input<string | null>(null);

  /** Nombre del ícono al final (Material Symbols). Decorativo. */
  readonly iconEnd = input<string | null>(null);

  protected readonly badgeClasses = computed(() => ({
    'pds-badge': true,
    [`pds-badge--${this.status()}`]: true,
    [`pds-badge--${this.size()}`]: true,
    'pds-badge--rectangle': this.shape() === 'rectangle',
  }));

  /** Tamaño del ícono: xs (16px) para sm/md, sm (20px) para lg. */
  protected readonly iconSize = computed(() =>
    this.size() === 'lg' ? 'sm' : 'xs'
  );
}
