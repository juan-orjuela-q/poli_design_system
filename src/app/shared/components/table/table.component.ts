import {
  AfterViewInit,
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ContentChildren,
  QueryList,
  TemplateRef,
  Directive,
  OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import {
  MatPaginator,
  MatPaginatorModule, PageEvent
} from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatIconButton } from '@angular/material/button';
import { SelectionModel } from '@angular/cdk/collections';
import { PaginatorComponent } from '../paginator/paginator.component';
import { MaterialInputComponent } from '../material-input/material-input.component';
import { MaterialSelectComponent, SelectOption } from '../select/select.component';
import { IconComponent } from '../icon/icon.component';
import { Subscription } from 'rxjs';

/**
 * Directiva para definir templates personalizados de columnas
 */
@Directive({
  selector: '[tableColumnDef]',
  standalone: true
})
export class TableColumnDefDirective {
  @Input('tableColumnDef') columnName!: string;

  constructor(public template: TemplateRef<any>) { }
}

/**
 * Configuración de filtros adicionales
 */
export interface AdditionalFilters {
  key: string;
  label: string;
  placeholder: string;
  type: 'text' | 'select';
  options?: SelectOption[];
}

/**
 * Configuración de una acción personalizada
 */
export interface CustomAction {
  key: string;
  icon: string;
  label: string;
  class?: string;
}

/**
 * Configuración de acciones de la tabla
 */
export interface ActionConfig {
  view?: { enabled: boolean; icon?: string; label?: string };
  edit?: { enabled: boolean; icon?: string; label?: string };
  delete?: { enabled: boolean; icon?: string; label?: string };
  custom?: CustomAction[];
}

/**
 * Evento emitido para acciones personalizadas
 */
export interface CustomActionEvent {
  action: string;
  row: any;
}

/**
 * Componente de tabla con características avanzadas
 * 
 * Características principales:
 * - Filtrado avanzado (principal + adicionales)
 * - Columna de acciones predefinida
 * - Templates personalizados para columnas
 * - Selección múltiple
 * - Paginación automática/manual
 * - Ordenamiento
 * - Anchos de columnas configurables
 */
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatOptionModule,
    MatIconButton,
    PaginatorComponent,
    MaterialInputComponent,
    MaterialSelectComponent,
    IconComponent
  ],
})
export class TableComponent
  implements AfterViewInit, OnChanges, OnDestroy {
  
  /* -------------------- Inputs: Datos y Columnas -------------------- */

  /** Arreglo de datos a mostrar */
  @Input() data: Record<string, any>[] = [];

  /** Columnas de datos (sin incluir 'select' ni 'acciones') */
  @Input() displayedColumns: string[] = [];

  /** Configuración de anchos para las columnas */
  @Input() columnWidths: Record<string, string> = {};

  /** Etiquetas personalizadas para las cabeceras */
  @Input() headerLabels: Record<string, string> = {};

  /* -------------------- Inputs: Filtros -------------------- */

  /** Oculta completamente la sección de filtros */
  @Input() hideFilter: boolean = false;

  /** Placeholder para el campo de filtro principal */
  @Input() filterPlaceholder: string = 'Escribe para filtrar';

  /** Configuración de filtros adicionales */
  @Input() additionalFilters: AdditionalFilters[] = [];

  /* -------------------- Inputs: Selección -------------------- */

  /** Controla si se muestra la columna de selección con checkboxes */
  @Input() showSelection: boolean = true;

  /** Alias de showSelection para compatibilidad con table-complex */
  @Input() set showCheckbox(value: boolean) {
    this.showSelection = value;
  }

  /* -------------------- Inputs: Paginación -------------------- */

  /** Si es true, oculta el paginador y muestra todos los registros sin paginación */
  @Input() hidePaginator: boolean = false;

  /** Total de registros para la paginación manual */
  @Input() totalRecords: number = 0;

  /** Tamaño de página por defecto */
  @Input() pageSize: number = 10;

  /** Opciones de tamaño de página */
  @Input() pageSizeOptions: number[] = [5, 10, 25];

  /** Habilitar paginación manual (servidor) */
  @Input() manualPagination: boolean = false;

  /* -------------------- Inputs: Acciones -------------------- */

  /** Controla si se muestra la columna de acciones */
  @Input() showActions: boolean = false;

  /** Configuración de las acciones disponibles */
  @Input() actions: ActionConfig = {};

  /** Compatibilidad con table-complex: habilita vista */
  @Input() set canView(value: boolean) {
    if (!this.actions.view) this.actions.view = { enabled: false };
    this.actions.view.enabled = value;
  }

  /** Compatibilidad con table-complex: habilita edición */
  @Input() set canEdit(value: boolean) {
    if (!this.actions.edit) this.actions.edit = { enabled: false };
    this.actions.edit.enabled = value;
  }

  /** Compatibilidad con table-complex: habilita eliminación */
  @Input() set canDelete(value: boolean) {
    if (!this.actions.delete) this.actions.delete = { enabled: false };
    this.actions.delete.enabled = value;
  }

  /* -------------------- Outputs: Eventos de Acciones -------------------- */

  /** Evento emitido al hacer clic en el botón de ver */
  @Output() actionView = new EventEmitter<any>();

  /** Evento emitido al hacer clic en el botón de editar */
  @Output() actionEdit = new EventEmitter<any>();

  /** Evento emitido al hacer clic en el botón de eliminar */
  @Output() actionDelete = new EventEmitter<any>();

  /** Evento emitido al hacer clic en un botón de acción personalizada */
  @Output() actionCustom = new EventEmitter<CustomActionEvent>();

  /** Alias para compatibilidad con table-complex */
  @Output() view = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  /** Evento de paginación para paginación manual */
  @Output() page = new EventEmitter<PageEvent>();

  /* -------------------- Templates Personalizados -------------------- */

  /** Templates personalizados para columnas usando directiva */
  @ContentChildren(TableColumnDefDirective) columnTemplates!: QueryList<TableColumnDefDirective>;

  /* -------------------- Estado de filtros -------------------- */

  /** Valores actuales de los filtros */
  filterValues: Record<string, string> = {};

  /** Filtro principal */
  mainFilterValue: string = '';

  /* -------------------- Material helpers -------------------- */

  dataSource = new MatTableDataSource<Record<string, any>>();
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(PaginatorComponent) paginator!: PaginatorComponent;

  /** Columnas que usa la fila de cabecera y de datos */
  get allColumns(): string[] {
    const columns = [...this.displayedColumns];
    
    if (this.showSelection) {
      columns.unshift('select');
    }
    
    if (this.showActions) {
      columns.push('acciones');
    }
    
    return columns;
  }

  private readonly paginatorSubscription?: Subscription;

  /* -------------------- Lifecycle -------------------- */

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;

    // Esperar a que el ViewChild esté inicializado
    setTimeout(() => {
      this.setupPagination();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    /* 1· datos */
    if (changes['data']) {
      this.dataSource.data = this.data ?? [];
      this.selection.clear();
    }

    /* 2· autogenerar columnas la primera vez */
    if (!this.displayedColumns?.length && this.data?.length) {
      this.displayedColumns = Object.keys(this.data[0]);
      changes['displayedColumns'] = true as any;
    }

    /* 3· limpia 'select' y 'acciones' si vinieron del padre */
    this.displayedColumns = this.displayedColumns.filter(c => c !== 'select' && c !== 'acciones');

    /* 4· VUELVE a enlazar el sort si cambió la lista de columnas */
    if (changes['displayedColumns']) {
      Promise.resolve().then(() => (this.dataSource.sort = this.sort));
    }
  }

  ngOnDestroy(): void {
    if (this.paginatorSubscription) {
      this.paginatorSubscription.unsubscribe();
    }
  }

  /* -------------------- Selección -------------------- */

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    return numSelected === this.dataSource.data.length;
  }

  toggleAllRows(): void {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row`;
  }

  /* -------------------- Filtro -------------------- */

  /**
   * Aplica el filtro principal de búsqueda
   * @param value - Valor del input principal
   */
  applyMainFilter(value: string): void {
    this.mainFilterValue = value.trim().toLowerCase();
    this.applyAllFilters();
  }

  /**
   * Aplica el filtro principal de búsqueda (método legacy para compatibilidad)
   * @param event - Evento del input
   */
  applyFilter(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.mainFilterValue = value.trim().toLowerCase();
    this.applyAllFilters();
  }

  /**
   * Aplica un filtro adicional específico para material-input
   * @param filterKey - Clave del filtro
   * @param value - Valor del input
   */
  applyAdditionalFilter(filterKey: string, value: string): void {
    this.filterValues[filterKey] = value.trim().toLowerCase();
    this.applyAllFilters();
  }

  /**
   * Maneja el cambio de selección en material-select
   * @param filterKey - Clave del filtro
   * @param event - Evento de selección de Material
   */
  onSelectFilterChange(filterKey: string, event: any): void {
    this.filterValues[filterKey] = event?.toString().toLowerCase() || '';
    this.applyAllFilters();
  }

  /**
   * Aplica todos los filtros combinados
   */
  private applyAllFilters(): void {
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      // Filtro principal - busca en todas las columnas
      const matchesMainFilter = this.mainFilterValue === '' ||
        this.displayedColumns.some(column => {
          const cellValue = data[column]?.toString().toLowerCase() || '';
          return cellValue.includes(this.mainFilterValue);
        });

      // Filtros adicionales - busca en columnas específicas
      const matchesAdditionalFilters = this.additionalFilters.every(filterConfig => {
        const filterValue = this.filterValues[filterConfig.key];
        if (!filterValue) return true; // Si no hay valor, no filtra

        const cellValue = data[filterConfig.key]?.toString().toLowerCase() || '';
        return cellValue.includes(filterValue);
      });

      return matchesMainFilter && matchesAdditionalFilters;
    };

    // Trigger del filtro (el valor exacto no importa, solo que cambie)
    this.dataSource.filter = Math.random().toString();
  }

  /* -------------------- Paginación -------------------- */

  onPage(event: PageEvent): void {
    if (this.manualPagination) {
      // Emitir evento para que el padre maneje la paginación
      this.page.emit(event);
    } else {
      // Actualizar el paginador interno de la tabla
      this.dataSource.paginator!.pageIndex = event.pageIndex;
      this.dataSource.paginator!.pageSize = event.pageSize;
    }
  }

  private setupPagination(): void {
    // Si el paginador está oculto por configuración, no lo conectamos
    if (this.hidePaginator) {
      this.dataSource.paginator = null as any;
      return;
    }

    if (this.paginator?.paginator) {
      // Limpiar suscripción previa si existe
      if (this.paginatorSubscription) {
        this.paginatorSubscription.unsubscribe();
      }

      // Configurar el paginador con los datos actuales
      const dataLength = this.dataSource.data.length;
      this.paginator.paginator.length = this.totalRecords || dataLength;
      this.paginator.paginator.pageSize = this.pageSize;
      this.paginator.paginator.pageIndex = 0;

      // Solo conectar el MatPaginator al dataSource si NO se está usando paginación manual
      if (!this.manualPagination) {
        this.dataSource.paginator = this.paginator.paginator;
      }

      // Forzar la re-renderización de la tabla
      const currentData = this.dataSource.data;
      this.dataSource.data = [...currentData];
    }
  }

  /* -------------------- Acciones -------------------- */

  /**
   * Maneja el evento de ver un registro
   * @param row - Fila seleccionada
   */
  onActionView(row: any): void {
    this.actionView.emit(row);
    this.view.emit(row); // Compatibilidad
  }

  /**
   * Maneja el evento de editar un registro
   * @param row - Fila seleccionada
   */
  onActionEdit(row: any): void {
    this.actionEdit.emit(row);
    this.edit.emit(row); // Compatibilidad
  }

  /**
   * Maneja el evento de eliminar un registro
   * @param row - Fila seleccionada
   */
  onActionDelete(row: any): void {
    this.actionDelete.emit(row);
    this.delete.emit(row); // Compatibilidad
  }

  /**
   * Maneja el evento de una acción personalizada
   * @param actionKey - Identificador de la acción
   * @param row - Fila seleccionada
   */
  onActionCustom(actionKey: string, row: any): void {
    this.actionCustom.emit({ action: actionKey, row });
  }

  /* -------------------- Utilidades -------------------- */

  /**
   * Función de tracking para los filtros adicionales
   * Mejora el rendimiento del *ngFor en el template
   * @param index - Índice del elemento
   * @param item - Elemento del filtro
   * @returns La clave única del filtro
   */
  trackByFilterKey(index: number, item: AdditionalFilters): string {
    return item.key;
  }

  /**
   * Obtiene el template personalizado para una columna específica
   * @param columnName - Nombre de la columna
   * @returns Template personalizado o null si no existe
   */
  getColumnTemplate(columnName: string): TemplateRef<any> | null {
    const columnDef = this.columnTemplates?.find(col => col.columnName === columnName);
    return columnDef ? columnDef.template : null;
  }

  /**
   * Verifica si una columna tiene un template personalizado
   * @param columnName - Nombre de la columna
   * @returns True si tiene template personalizado
   */
  hasCustomTemplate(columnName: string): boolean {
    return !!this.getColumnTemplate(columnName);
  }

  /**
   * Obtiene la clase CSS para el ancho de una columna
   * @param columnKey - Clave de la columna
   * @returns Clase CSS o string vacío
   */
  getColumnWidthClass(columnKey: string): string {
    return this.columnWidths[columnKey] || '';
  }
}
