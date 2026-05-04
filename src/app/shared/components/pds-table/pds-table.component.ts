import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Directive,
  Input,
  QueryList,
  TemplateRef,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { PdsCheckboxComponent } from '../pds-checkbox/pds-checkbox.component';
import { PdsIconComponent } from '../pds-icon/pds-icon.component';
import { PdsIconButtonComponent } from '../pds-icon-button/pds-icon-button.component';
import { PdsPaginatorComponent } from '../pds-paginator/pds-paginator.component';
import { PdsInputFieldComponent } from '../pds-input-field/pds-input-field.component';
import {
  PdsSelectFieldComponent,
  SelectOption,
} from '../pds-select-field/pds-select-field.component';
import { PdsTooltipComponent } from '../pds-tooltip/pds-tooltip.component';
import { PdsBadgeComponent } from '../pds-badge/pds-badge.component';
import {
  PdsHelperTextComponent,
  PdsHelperTextStatus,
} from '../pds-helper-text/pds-helper-text.component';

// ── Public types ───────────────────────────────────────────────────────────

/** Definición de una columna de la tabla. */
export interface PdsTableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';

  /**
   * Tipo de renderizado de la celda.
   * - `'text'` (por defecto): texto plano.
   * - `'badge'`: muestra un `pds-badge`. Usar `badgeVariantMap` para mapear valores a variantes.
   * - `'date'`: ícono `calendar_month` + fecha localizada.
   * - `'link'`: ícono `attach_file` + texto como enlace. La URL viene de `linkHrefKey` o del propio valor.
   * - `'with-helper'`: texto principal + helper text secundario. Usar `helperTextKey` y `helperStatusKey`.
   */
  type?: 'text' | 'badge' | 'date' | 'link' | 'with-helper';

  // ── badge ────────────────────────────────────────────────────────────
  /** Mapa valor de celda → variante del badge. */
  badgeVariantMap?: Record<
    string,
    | 'brand'
    | 'brand-subtle'
    | 'brand-secondary'
    | 'neutral'
    | 'success'
    | 'warning'
    | 'error'
  >;
  /** Variante del badge cuando el valor no está en el mapa. Por defecto `'neutral'`. */
  badgeDefaultVariant?:
    | 'brand'
    | 'brand-subtle'
    | 'brand-secondary'
    | 'neutral'
    | 'success'
    | 'warning'
    | 'error';

  // ── date ─────────────────────────────────────────────────────────────
  /** Locale para formatear la fecha (p. ej. `'es-CO'`, `'en-US'`). Por defecto `'es-CO'`. */
  dateLocale?: string;

  // ── link ─────────────────────────────────────────────────────────────
  /** Clave del objeto fila que contiene la URL del enlace. Si se omite, el propio valor de celda se usa como href. */
  linkHrefKey?: string;
  /** Nombre del ícono para el tipo link. Por defecto `'attach_file'`. */
  linkIcon?: string;

  // ── with-helper ───────────────────────────────────────────────────────
  /** Clave del objeto fila que contiene el texto secundario (helper text). */
  helperTextKey?: string;
  /** Clave del objeto fila que contiene el estado del helper (`'default'|'error'|'warning'|'success'|'info'`). */
  helperStatusKey?: string;
}

/** Configuración de un botón de acción por fila. */
export interface PdsTableAction {
  key: string;
  icon: string;
  label: string;
  variant?:
    | 'ghost-neutral'
    | 'ghost'
    | 'destructive'
    | 'outline'
    | 'destructive-outline';
}

/** Acciones predefinidas listas para usar */
export const PDS_TABLE_ACTIONS = {
  view: {
    key: 'view',
    icon: 'visibility',
    label: 'Ver detalle',
    variant: 'outline',
  } as PdsTableAction,
  edit: {
    key: 'edit',
    icon: 'edit',
    label: 'Editar',
    variant: 'outline',
  } as PdsTableAction,
  delete: {
    key: 'delete',
    icon: 'delete',
    label: 'Eliminar',
    variant: 'destructive-outline',
  } as PdsTableAction,
} satisfies Record<string, PdsTableAction>;

/** Estado de ordenamiento activo de la tabla. */
export interface PdsTableSortState {
  key: string;
  direction: 'asc' | 'desc';
}

/** Evento emitido al hacer clic en un botón de acción de fila. */
export interface PdsTableActionEvent<T = unknown> {
  action: string;
  row: T;
  index: number;
}

/**
 * Definición de un filtro en la barra de filtros de la tabla.
 * - type 'search': input de texto libre, busca en todas las columnas o en searchKeys.
 * - type 'select': selector desplegable, filtra por coincidencia exacta en la columna key.
 */
export interface PdsTableFilter {
  key: string;
  label: string;
  placeholder?: string;
  type: 'search' | 'select';
  options?: SelectOption[];
  searchKeys?: string[];
}

// ── Directive for custom cell templates ───────────────────────────────────

@Directive({
  selector: '[pdsTableCell]',
  standalone: true,
})
export class PdsTableCellDirective {
  @Input('pdsTableCell') columnKey!: string;

  readonly template =
    inject<TemplateRef<{ $implicit: unknown; row: unknown; index: number }>>(
      TemplateRef
    );
}

// ── Component ─────────────────────────────────────────────────────────────

@Component({
  selector: 'pds-table',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    PdsCheckboxComponent,
    PdsIconComponent,
    PdsIconButtonComponent,
    PdsPaginatorComponent,
    PdsInputFieldComponent,
    PdsSelectFieldComponent,
    PdsTooltipComponent,
    PdsBadgeComponent,
    PdsHelperTextComponent,
  ],
  templateUrl: './pds-table.component.html',
  styleUrl: './pds-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdsTableComponent<
  T extends Record<string, unknown> = Record<string, unknown>
> {
  @ContentChildren(PdsTableCellDirective)
  private readonly _cellTemplates!: QueryList<PdsTableCellDirective>;

  readonly columns = input.required<PdsTableColumn[]>();
  readonly data = input<T[]>([]);
  readonly filters = input<PdsTableFilter[]>([]);
  readonly filterMode = input<'internal' | 'external'>('internal');
  readonly showSelection = input<boolean>(false);
  readonly actions = input<PdsTableAction[]>([]);
  readonly sortKey = input<string | null>(null);
  readonly sortDirection = input<'asc' | 'desc' | null>(null);
  readonly sortChange = output<PdsTableSortState | null>();
  readonly showPaginator = input<boolean>(false);
  readonly totalItems = input<number>(0);
  readonly currentPage = input<number>(1);
  readonly pageSize = input<number>(20);
  readonly pageSizeOptions = input<number[]>([10, 20, 50, 100]);
  readonly pageChange = output<number>();
  readonly pageSizeChange = output<number>();
  readonly selectionChange = output<T[]>();
  readonly actionClick = output<PdsTableActionEvent<T>>();
  readonly filterChange = output<Record<string, string>>();

  // ── Toolbar ───────────────────────────────────────────────────────────

  /** Muestra un botón "Agregar" en la barra de herramientas de la tabla. */
  readonly showAddButton = input<boolean>(false);
  /** Texto del botón de agregar. Por defecto `'Agregar'`. */
  readonly addButtonLabel = input<string>('Agregar');
  /** Emite al hacer clic en el botón de agregar. */
  readonly addClick = output<void>();

  readonly _selectedRows = signal<Set<T>>(new Set());
  readonly _filterValues = signal<Record<string, string>>({});

  constructor() {
    effect(() => {
      this.data();
      this._selectedRows.set(new Set());
    });
  }

  readonly _displayData = computed((): T[] => {
    if (this.filterMode() === 'external') return this.data();

    const filterValues = this._filterValues();
    const filters = this.filters();
    if (!filters.length) return this.data();

    const activeFilters = filters.filter((f) => {
      const val = filterValues[f.key];
      return val !== undefined && val.trim() !== '';
    });
    if (!activeFilters.length) return this.data();

    return this.data().filter((row) =>
      activeFilters.every((f) => {
        const val = (filterValues[f.key] ?? '').trim().toLowerCase();
        if (!val) return true;

        if (f.type === 'search') {
          const keys = f.searchKeys?.length
            ? f.searchKeys
            : this.columns().map((c) => c.key);
          return keys.some((k) =>
            String(row[k] ?? '')
              .toLowerCase()
              .includes(val)
          );
        }

        if (f.type === 'select') {
          return String(row[f.key] ?? '').toLowerCase() === val;
        }

        return true;
      })
    );
  });

  readonly _allSelected = computed(() => {
    const data = this._displayData();
    const selected = this._selectedRows();
    return data.length > 0 && data.every((row) => selected.has(row));
  });

  readonly _someSelected = computed(() => {
    const data = this._displayData();
    const selected = this._selectedRows();
    return data.some((row) => selected.has(row)) && !this._allSelected();
  });

  readonly _colSpan = computed(() => {
    let span = this.columns().length;
    if (this.showSelection()) span++;
    if (this.actions().length > 0) span++;
    return span;
  });

  getFilterValue(key: string): string {
    return this._filterValues()[key] ?? '';
  }

  onFilterChange(key: string, value: string): void {
    this._filterValues.update((prev) => ({ ...prev, [key]: value }));
    this.filterChange.emit({ ...this._filterValues() });
  }

  toggleAllRows(): void {
    if (this._allSelected()) {
      this._selectedRows.set(new Set());
    } else {
      this._selectedRows.set(new Set(this._displayData()));
    }
    this.selectionChange.emit([...this._selectedRows()]);
  }

  toggleRow(row: T): void {
    const set = new Set(this._selectedRows());
    if (set.has(row)) {
      set.delete(row);
    } else {
      set.add(row);
    }
    this._selectedRows.set(set);
    this.selectionChange.emit([...set]);
  }

  isSelected(row: T): boolean {
    return this._selectedRows().has(row);
  }

  onSortClick(key: string): void {
    const currentKey = this.sortKey();
    const currentDir = this.sortDirection();
    if (currentKey !== key) {
      this.sortChange.emit({ key, direction: 'asc' });
    } else if (currentDir === 'asc') {
      this.sortChange.emit({ key, direction: 'desc' });
    } else {
      this.sortChange.emit(null);
    }
  }

  getSortIcon(key: string): string {
    if (this.sortKey() !== key) return 'unfold_more';
    return this.sortDirection() === 'asc' ? 'arrow_upward' : 'arrow_downward';
  }

  getCellTemplate(key: string): TemplateRef<unknown> | null {
    return (
      this._cellTemplates?.find((d) => d.columnKey === key)?.template ?? null
    );
  }

  getCellValue(row: T, key: string): unknown {
    return row[key] ?? '';
  }

  // ── Cell type helpers ─────────────────────────────────────────────────

  getBadgeVariant(
    row: T,
    col: PdsTableColumn
  ):
    | 'brand'
    | 'brand-subtle'
    | 'brand-secondary'
    | 'neutral'
    | 'success'
    | 'warning'
    | 'error' {
    const value = String(row[col.key] ?? '');
    type BadgeStatus =
      | 'brand'
      | 'brand-subtle'
      | 'brand-secondary'
      | 'neutral'
      | 'success'
      | 'warning'
      | 'error';
    return (col.badgeVariantMap?.[value] ??
      col.badgeDefaultVariant ??
      'neutral') as BadgeStatus;
  }

  formatDate(value: unknown, locale = 'es-CO'): string {
    if (value === null || value === undefined || value === '') return '';
    const d = value instanceof Date ? value : new Date(String(value));
    if (isNaN(d.getTime())) return String(value);
    return d.toLocaleDateString(locale, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }

  getLinkHref(row: T, col: PdsTableColumn): string {
    return col.linkHrefKey
      ? String(row[col.linkHrefKey] ?? '')
      : String(row[col.key] ?? '');
  }

  getHelperText(row: T, col: PdsTableColumn): string {
    return col.helperTextKey ? String(row[col.helperTextKey] ?? '') : '';
  }

  getHelperStatus(row: T, col: PdsTableColumn): PdsHelperTextStatus {
    const valid: PdsHelperTextStatus[] = [
      'default',
      'error',
      'warning',
      'success',
      'info',
    ];
    const v = col.helperStatusKey ? String(row[col.helperStatusKey] ?? '') : '';
    return valid.includes(v as PdsHelperTextStatus)
      ? (v as PdsHelperTextStatus)
      : 'default';
  }

  onActionClick(actionKey: string, row: T, index: number): void {
    this.actionClick.emit({ action: actionKey, row, index });
  }
}
