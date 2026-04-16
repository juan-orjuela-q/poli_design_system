import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { PdsIconComponent } from '../pds-icon/pds-icon.component';

export type PdsHelperTextStatus = 'default' | 'error' | 'warning' | 'success' | 'info';

const STATUS_ICONS: Record<PdsHelperTextStatus, string | null> = {
  default: null,
  info: 'info',
  error: 'error',
  warning: 'warning',
  success: 'check_circle',
};

@Component({
  selector: 'pds-helper-text',
  standalone: true,
  imports: [NgClass, PdsIconComponent],
  templateUrl: './pds-helper-text.component.html',
  styleUrl: './pds-helper-text.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdsHelperTextComponent {
  /** Estado semántico que determina color e ícono. */
  readonly status = input<PdsHelperTextStatus>('default');

  protected readonly icon = computed(() => STATUS_ICONS[this.status()]);

  protected readonly hostClasses = computed(() => ({
    'pds-helper-text': true,
    [`pds-helper-text--${this.status()}`]: true,
  }));
}
