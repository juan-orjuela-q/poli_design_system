import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { PdsIconComponent } from '../pds-icon/pds-icon.component';

@Component({
  selector: 'pds-link',
  standalone: true,
  imports: [NgClass, PdsIconComponent],
  templateUrl: './pds-link.component.html',
  styleUrl: './pds-link.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdsLinkComponent {
  /** URL de destino. */
  readonly href = input<string>('#');

  /** Target del enlace. */
  readonly target = input<'_self' | '_blank' | '_parent' | '_top'>('_self');

  /** Si es true, añade rel="noopener noreferrer" e ícono de enlace externo. */
  readonly external = input<boolean>(false);

  protected readonly rel = computed(() =>
    this.external() ? 'noopener noreferrer' : null
  );
}
