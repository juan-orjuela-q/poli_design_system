import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
  MatPaginatorIntl,
} from '@angular/material/paginator';

/*  ▸  Textos en español  */
export function getEsPaginatorIntl(): MatPaginatorIntl {
  const intl = new MatPaginatorIntl();

  intl.itemsPerPageLabel = 'Ítems por página';
  intl.nextPageLabel     = 'Página siguiente';
  intl.previousPageLabel = 'Página anterior';
  intl.firstPageLabel    = 'Primera página';
  intl.lastPageLabel     = 'Última página';
  intl.getRangeLabel = (page: number, size: number, length: number): string => {
    if (length === 0 || size === 0) { return `0 de ${length}`; }
    const start = page * size + 1;
    const end   = Math.min(length, (page + 1) * size);
    return `${start} – ${end} de ${length}`;
  };
  return intl;
}

@Component({
  selector   : 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrl   : './paginator.component.scss',
  standalone : true,
  imports    : [CommonModule, MatPaginatorModule],
  providers  : [{ provide: MatPaginatorIntl, useFactory: getEsPaginatorIntl }],
})
export class PaginatorComponent implements AfterViewInit {

  /* ▸ Parámetros configurables  */
  @Input() pageSizeOptions: number[] = [5, 10, 25];
  @Input() length          = 0;        // total de registros
  @Input() pageSize        = 10;       // tamaño inicial
  @Input() pageIndex       = 0;

  /* ▸ Eventos que expone el paginator  */
  @Output() page  = new EventEmitter<PageEvent>();

  /* ▸ Acceso al MatPaginator interno  */
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    /* Sincroniza los valores iniciales (útil si los inputs cambian) */
    this.paginator.length    = this.length;
    this.paginator.pageSize  = this.pageSize;
    this.paginator.pageIndex = this.pageIndex;
  }
}
