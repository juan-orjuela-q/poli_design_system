import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { PdsIconComponent } from '../pds-icon/pds-icon.component';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

@Component({
  selector: 'pds-breadcrumb',
  standalone: true,
  imports: [NgClass, PdsIconComponent],
  templateUrl: './pds-breadcrumb.component.html',
  styleUrl: './pds-breadcrumb.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdsBreadcrumbComponent {
  /** Lista ordenada de ítems de la ruta. El último ítem es la página actual. */
  readonly items = input.required<BreadcrumbItem[]>();
}
