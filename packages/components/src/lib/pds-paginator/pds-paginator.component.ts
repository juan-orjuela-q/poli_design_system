import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import { PdsIconComponent } from '../pds-icon/pds-icon.component';
import { PdsIconButtonComponent } from '../pds-icon-button/pds-icon-button.component';

@Component({
  selector: 'pds-paginator',
  standalone: true,
  imports: [PdsIconComponent, PdsIconButtonComponent],
  templateUrl: './pds-paginator.component.html',
  styleUrl: './pds-paginator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdsPaginatorComponent {
  /** Total de ítems en el conjunto de datos. */
  readonly totalItems = input.required<number>();

  /** Cantidad de ítems por página actualmente seleccionada. */
  readonly pageSize = input<number>(20);

  /** Página actual (1-indexada). */
  readonly currentPage = input<number>(1);

  /** Opciones disponibles para el selector de items por página. */
  readonly pageSizeOptions = input<number[]>([10, 20, 50, 100]);

  /** Muestra u oculta el selector de items por página. */
  readonly showPageSizeSelector = input<boolean>(true);

  /** Emite el número de página al que se navega. */
  readonly pageChange = output<number>();

  /** Emite el nuevo tamaño de página seleccionado. */
  readonly pageSizeChange = output<number>();

  /** Controla la apertura del dropdown de page size. */
  readonly _isPageSizeOpen = signal(false);

  @ViewChild('pageSizeContainer') pageSizeContainerRef?: ElementRef<HTMLElement>;

  // ── Computeds ────────────────────────────────────────────────────────────

  readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.totalItems() / this.pageSize()))
  );

  readonly rangeStart = computed(() =>
    this.totalItems() === 0 ? 0 : (this.currentPage() - 1) * this.pageSize() + 1
  );

  readonly rangeEnd = computed(() =>
    Math.min(this.currentPage() * this.pageSize(), this.totalItems())
  );

  readonly stateText = computed(
    () => `Mostrando ${this.rangeStart()}-${this.rangeEnd()} de ${this.totalItems()}`
  );

  readonly isFirst = computed(() => this.currentPage() <= 1);
  readonly isLast = computed(() => this.currentPage() >= this.totalPages());

  // ── Cierre fuera del dropdown ──────────────────────────────────────────

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (
      this._isPageSizeOpen() &&
      this.pageSizeContainerRef &&
      !this.pageSizeContainerRef.nativeElement.contains(event.target as Node)
    ) {
      this._isPageSizeOpen.set(false);
    }
  }

  // ── Handlers de navegación ─────────────────────────────────────────────

  goFirst(): void {
    if (this.isFirst()) return;
    this.pageChange.emit(1);
  }

  goPrev(): void {
    if (this.isFirst()) return;
    this.pageChange.emit(this.currentPage() - 1);
  }

  goNext(): void {
    if (this.isLast()) return;
    this.pageChange.emit(this.currentPage() + 1);
  }

  goLast(): void {
    if (this.isLast()) return;
    this.pageChange.emit(this.totalPages());
  }

  // ── Handlers del selector de page size ───────────────────────────────

  togglePageSizeDropdown(): void {
    this._isPageSizeOpen.update((v) => !v);
  }

  selectPageSize(size: number): void {
    if (size !== this.pageSize()) {
      this.pageSizeChange.emit(size);
    }
    this._isPageSizeOpen.set(false);
  }

  onOptionKeydown(event: KeyboardEvent, size: number): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.selectPageSize(size);
    }
    if (event.key === 'Escape') {
      this._isPageSizeOpen.set(false);
    }
  }
}
