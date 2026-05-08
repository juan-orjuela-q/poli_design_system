import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';
import { PdsHelperTextComponent } from '../pds-helper-text/pds-helper-text.component';
import { PdsHelperTextStatus } from '../pds-helper-text/pds-helper-text.component';

@Component({
  selector: 'pds-progress-bar',
  standalone: true,
  imports: [NgClass, NgStyle, PdsHelperTextComponent],
  templateUrl: './pds-progress-bar.component.html',
  styleUrl: './pds-progress-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdsProgressBarComponent {
  /** Valor actual del progreso (0–100). */
  readonly value = input.required<number>();

  /** Estado semántico que define el color. */
  readonly status = input<'primary' | 'success' | 'warning' | 'error'>('primary');

  /** Texto de ayuda que se muestra debajo con ícono de estado. */
  readonly label = input<string | null>(null);

  /** Muestra el porcentaje como texto. */
  readonly showValue = input<boolean>(false);

  protected readonly clampedValue = computed(() =>
    Math.min(100, Math.max(0, this.value()))
  );

  protected readonly containerClasses = computed(() => ({
    'pds-progress-bar': true,
    [`pds-progress-bar--${this.status()}`]: true,
  }));

  protected readonly fillStyle = computed(() => ({
    width: `${this.clampedValue()}%`,
  }));

  /** Mapea status de progress bar al status de helper-text. */
  protected readonly helperStatus = computed((): PdsHelperTextStatus => {
    const s = this.status();
    if (s === 'primary') return 'default';
    return s; // success | warning | error coinciden directamente
  });
}
