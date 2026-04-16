import { Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface BreadcrumbItem {
  /** Texto que se mostrará en el breadcrumb */
  label: string;
  /** Ruta a la que navega el ítem (opcional para el último elemento) */
  route?: string;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent {
  /** Lista de niveles del breadcrumb */
  @Input({ required: true }) items: BreadcrumbItem[] = [];

  /** Trunca el texto a 30 caracteres máximo y añade “…” si es necesario */
  truncate(label: string): string {
    return label.length > 30 ? `${label.slice(0, 27)}…` : label;
  }
}
