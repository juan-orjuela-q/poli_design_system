import type { Meta, StoryObj } from '@storybook/angular';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { moduleMetadata } from '@storybook/angular';
import {
  PdsTableComponent,
  PdsTableCellDirective,
  PDS_TABLE_ACTIONS,
  type PdsTableColumn,
  type PdsTableAction,
  type PdsTableFilter,
  type PdsTableSortState,
  type PdsTableActionEvent,
} from './pds-table.component';
import { PdsBadgeComponent } from '../pds-badge/pds-badge.component';

// ── Datos de muestra ────────────────────────────────────────────────────

interface Estudiante {
  id: number;
  nombre: string;
  programa: string;
  semestre: number;
  estado: 'activo' | 'inactivo' | 'suspendido';
  promedio: number;
  inscripcion: string;
  documento: string;
  documentoUrl: string;
  nota: string;
  notaEstado: 'default' | 'error' | 'warning' | 'success';
}

const ESTUDIANTES: Estudiante[] = [
  { id: 1, nombre: 'Ana García',          programa: 'Ingeniería de Sistemas',       semestre: 6,  estado: 'activo',    promedio: 4.2, inscripcion: '2022-03-15', documento: 'Acta grado.pdf',       documentoUrl: '#',   nota: 'Aprobado',   notaEstado: 'success' },
  { id: 2, nombre: 'Carlos Pérez',        programa: 'Administración de Empresas',   semestre: 4,  estado: 'activo',    promedio: 3.8, inscripcion: '2023-01-20', documento: 'Recibo pago.pdf',      documentoUrl: '#',   nota: 'Aprobado',   notaEstado: 'success' },
  { id: 3, nombre: 'Laura Martínez',      programa: 'Psicología',                   semestre: 8,  estado: 'inactivo',  promedio: 3.5, inscripcion: '2021-07-10', documento: 'Solicitud retiro.pdf', documentoUrl: '#',   nota: 'Pendiente',  notaEstado: 'warning' },
  { id: 4, nombre: 'Miguel Torres',       programa: 'Derecho',                      semestre: 2,  estado: 'activo',    promedio: 4.5, inscripcion: '2024-01-15', documento: 'Matrícula.pdf',        documentoUrl: '#',   nota: 'Aprobado',   notaEstado: 'success' },
  { id: 5, nombre: 'Sofía López',         programa: 'Medicina',                     semestre: 10, estado: 'suspendido', promedio: 2.9, inscripcion: '2020-07-05', documento: 'Carta sanción.pdf',   documentoUrl: '#',   nota: 'Bloqueado',  notaEstado: 'error'   },
  { id: 6, nombre: 'Andrés Rodríguez',    programa: 'Ingeniería Industrial',        semestre: 5,  estado: 'activo',    promedio: 4.0, inscripcion: '2022-07-18', documento: 'Recibo pago.pdf',      documentoUrl: '#',   nota: 'Aprobado',   notaEstado: 'success' },
  { id: 7, nombre: 'Valentina Jiménez',   programa: 'Contaduría Pública',           semestre: 7,  estado: 'activo',    promedio: 3.6, inscripcion: '2021-03-22', documento: 'Certificado.pdf',      documentoUrl: '#',   nota: 'Aprobado',   notaEstado: 'success' },
  { id: 8, nombre: 'Diego Morales',       programa: 'Arquitectura',                 semestre: 3,  estado: 'inactivo',  promedio: 3.1, inscripcion: '2023-07-12', documento: 'Solicitud.pdf',        documentoUrl: '#',   nota: 'En revisión', notaEstado: 'warning' },
];

const COLUMNAS: PdsTableColumn[] = [
  { key: 'id', label: 'ID', width: '60px', align: 'center' },
  { key: 'nombre', label: 'Nombre', sortable: true },
  { key: 'programa', label: 'Programa', sortable: true },
  { key: 'semestre', label: 'Semestre', width: '100px', align: 'center', sortable: true },
  { key: 'promedio', label: 'Promedio', width: '100px', align: 'center', sortable: true },
];

const COLUMNAS_CON_ESTADO: PdsTableColumn[] = [
  ...COLUMNAS,
  { key: 'estado', label: 'Estado', width: '120px', align: 'center' },
];

const ACCIONES: PdsTableAction[] = [
  PDS_TABLE_ACTIONS.view,
  PDS_TABLE_ACTIONS.edit,
  PDS_TABLE_ACTIONS.delete,
];

// ── Wrapper components para stories interactivas ───────────────────────
// Los signals en `props` no participan del grafo reactivo de Angular dentro del
// wrapper de Storybook. La solución es crear @Components reales con OnPush + computed().

@Component({
  selector: 'story-ordenamiento',
  standalone: true,
  imports: [PdsTableComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <pds-table
      [columns]="columns"
      [data]="$any(sortedData())"
      [sortKey]="sortKey()"
      [sortDirection]="sortDirection()"
      (sortChange)="onSortChange($event)"
    />
  `,
})
class OrdenamientoStoryComponent {
  readonly columns = COLUMNAS;
  private readonly sortState = signal<PdsTableSortState | null>(null);
  readonly sortedData = computed(() => {
    const state = this.sortState();
    if (!state) return ESTUDIANTES;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return [...ESTUDIANTES].sort((a, b) => {
      const av = (a as any)[state.key];
      const bv = (b as any)[state.key];
      const cmp = av < bv ? -1 : av > bv ? 1 : 0;
      return state.direction === 'asc' ? cmp : -cmp;
    });
  });
  readonly sortKey = computed(() => this.sortState()?.key ?? null);
  readonly sortDirection = computed(() => this.sortState()?.direction ?? null);
  onSortChange(state: PdsTableSortState | null): void { this.sortState.set(state); }
}

@Component({
  selector: 'story-paginacion',
  standalone: true,
  imports: [PdsTableComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <pds-table
      [columns]="columns"
      [data]="$any(pagedData())"
      [showPaginator]="true"
      [totalItems]="totalItems"
      [currentPage]="currentPage()"
      [pageSize]="pageSize"
      [pageSizeOptions]="[5, 10]"
      (pageChange)="onPageChange($event)"
    />
  `,
})
class PaginacionStoryComponent {
  readonly columns = COLUMNAS;
  readonly totalItems = ESTUDIANTES.length;
  readonly pageSize = 5;
  readonly currentPage = signal(1);
  readonly pagedData = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return ESTUDIANTES.slice(start, start + this.pageSize);
  });
  onPageChange(page: number): void { this.currentPage.set(page); }
}

@Component({
  selector: 'story-completo',
  standalone: true,
  imports: [PdsTableComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <pds-table
      [columns]="columns"
      [data]="$any(sortedData())"
      [actions]="actions"
      [showSelection]="true"
      [showPaginator]="true"
      [totalItems]="totalItems"
      [currentPage]="currentPage()"
      [pageSize]="pageSize"
      [sortKey]="sortKey()"
      [sortDirection]="sortDirection()"
      (sortChange)="onSortChange($event)"
      (pageChange)="onPageChange($event)"
    />
  `,
})
class CompletoStoryComponent {
  readonly columns = COLUMNAS;
  readonly actions = ACCIONES;
  readonly totalItems = ESTUDIANTES.length;
  readonly pageSize = 5;
  private readonly sortState = signal<PdsTableSortState | null>(null);
  readonly currentPage = signal(1);
  readonly sortedData = computed(() => {
    const state = this.sortState();
    const sorted = state
      ? [...ESTUDIANTES].sort((a, b) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const av = (a as any)[state.key];
          const bv = (b as any)[state.key];
          const cmp = av < bv ? -1 : av > bv ? 1 : 0;
          return state.direction === 'asc' ? cmp : -cmp;
        })
      : ESTUDIANTES;
    const start = (this.currentPage() - 1) * this.pageSize;
    return sorted.slice(start, start + this.pageSize);
  });
  readonly sortKey = computed(() => this.sortState()?.key ?? null);
  readonly sortDirection = computed(() => this.sortState()?.direction ?? null);
  onSortChange(state: PdsTableSortState | null): void {
    this.sortState.set(state);
    this.currentPage.set(1);
  }
  onPageChange(page: number): void { this.currentPage.set(page); }
}

@Component({
  selector: 'story-filtro-externo',
  standalone: true,
  imports: [PdsTableComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <pds-table
      [columns]="columns"
      [data]="$any(filteredData())"
      [filters]="filters"
      filterMode="external"
      [showPaginator]="true"
      [totalItems]="filteredData().length"
      [currentPage]="currentPage()"
      [pageSize]="5"
      [pageSizeOptions]="[5, 10]"
      (filterChange)="onFilterChange($event)"
      (pageChange)="onPageChange($event)"
    />
  `,
})
class FiltroExternoStoryComponent {
  readonly columns = COLUMNAS_CON_ESTADO;
  readonly filters: PdsTableFilter[] = [
    { key: '__search__', label: 'Buscar', placeholder: 'Nombre o programa…', type: 'search' },
    {
      key: 'estado', label: 'Estado', placeholder: 'Todos', type: 'select',
      options: [
        { value: 'activo', label: 'Activo' },
        { value: 'inactivo', label: 'Inactivo' },
        { value: 'suspendido', label: 'Suspendido' },
      ],
    },
  ];
  private readonly searchTerm = signal('');
  private readonly estadoFilter = signal('');
  readonly currentPage = signal(1);
  readonly filteredData = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const estado = this.estadoFilter().toLowerCase().trim();
    return ESTUDIANTES.filter(e => {
      const matchTerm = !term || e.nombre.toLowerCase().includes(term) || e.programa.toLowerCase().includes(term);
      const matchEstado = !estado || e.estado === estado;
      return matchTerm && matchEstado;
    });
  });
  onFilterChange(values: Record<string, string>): void {
    this.searchTerm.set(values['__search__'] ?? '');
    this.estadoFilter.set(values['estado'] ?? '');
    this.currentPage.set(1);
  }
  onPageChange(page: number): void { this.currentPage.set(page); }
}

// ── Meta ────────────────────────────────────────────────────────────────

const meta: Meta<PdsTableComponent> = {
  title: 'Poli Design System / 07. Content / Table',
  component: PdsTableComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [PdsTableComponent, PdsTableCellDirective, PdsBadgeComponent],
    }),
  ],
  argTypes: {
    showSelection: { control: 'boolean' },
    showPaginator: { control: 'boolean' },
    totalItems: { control: 'number' },
    currentPage: { control: 'number' },
    pageSize: { control: 'select', options: [5, 10, 20, 50] },
  },
};

export default meta;
type Story = StoryObj<PdsTableComponent>;

// ── Stories ─────────────────────────────────────────────────────────────

/** Tabla básica sin funcionalidades adicionales. */
export const Default: Story = {
  args: {
    columns: COLUMNAS as any,
    data: ESTUDIANTES as any,
  },
};

/** Columnas ordenables. Cada clic en el header alterna asc → desc → sin ordenamiento. */
export const ConOrdenamiento: Story = {
  decorators: [moduleMetadata({ imports: [OrdenamientoStoryComponent] })],
  render: () => ({ template: '<story-ordenamiento />' }),
};

/** Columna de selección con checkboxes. La fila seleccionada se resalta. */
export const ConSeleccion: Story = {
  args: {
    columns: COLUMNAS as any,
    data: ESTUDIANTES as any,
    showSelection: true,
  },
};

/** Botones de acción por fila: ver, editar y eliminar. */
export const ConAcciones: Story = {
  args: {
    columns: COLUMNAS as any,
    data: ESTUDIANTES as any,
    actions: ACCIONES as any,
  },
};

/** Combinación de selección + acciones + ordenamiento + paginación. */
export const Completo: Story = {
  decorators: [moduleMetadata({ imports: [CompletoStoryComponent] })],
  render: () => ({ template: '<story-completo />' }),
};

/** Template personalizado para celdas. La columna "estado" muestra un pds-badge. */
export const ConTemplatePersonalizado: Story = {
  render: () => ({
    template: `
      <pds-table
        [columns]="columns"
        [data]="data"
        [actions]="actions"
      >
        <ng-template pdsTableCell="estado" let-value>
          <pds-badge
            [label]="value"
            [status]="badgeStatus(value)"
            shape="pill"
            size="sm"
          />
        </ng-template>
      </pds-table>
    `,
    props: {
      columns: COLUMNAS_CON_ESTADO,
      data: ESTUDIANTES,
      actions: ACCIONES,
      badgeStatus: (estado: string) => {
        const map: Record<string, string> = {
          activo: 'success',
          inactivo: 'neutral',
          suspendido: 'error',
        };
        return map[estado] ?? 'neutral';
      },
    },
  }),
  decorators: [
    moduleMetadata({
      imports: [PdsTableComponent, PdsTableCellDirective, PdsBadgeComponent],
    }),
  ],
};

/** Tabla con paginación. */
export const ConPaginacion: Story = {
  decorators: [moduleMetadata({ imports: [PaginacionStoryComponent] })],
  render: () => ({ template: '<story-paginacion />' }),
};

/** Tabla sin datos: muestra el estado vacío. */
export const EstadoVacio: Story = {
  args: {
    columns: COLUMNAS as any,
    data: [] as any,
  },
};

/** Tabla con muchas columnas para verificar el scroll horizontal. */
export const ScrollHorizontal: Story = {
  args: {
    columns: [
      { key: 'id', label: 'ID', width: '60px', align: 'center' },
      { key: 'nombre', label: 'Nombre completo', width: '200px', sortable: true },
      { key: 'programa', label: 'Programa académico', width: '250px', sortable: true },
      { key: 'semestre', label: 'Semestre', width: '100px', align: 'center', sortable: true },
      { key: 'promedio', label: 'Promedio', width: '100px', align: 'center', sortable: true },
      { key: 'estado', label: 'Estado', width: '120px', align: 'center' },
      { key: 'extra1', label: 'Columna extra 1', width: '150px' },
      { key: 'extra2', label: 'Columna extra 2', width: '150px' },
    ] as any,
    data: ESTUDIANTES.map(e => ({
      ...e,
      extra1: 'Valor extra 1',
      extra2: 'Valor extra 2',
    })) as any,
    actions: ACCIONES as any,
    showSelection: true,
  },
};

// ── Stories de filtros ───────────────────────────────────────────────────

/**
 * Búsqueda global (modo interno).
 * Un único input que busca en todas las columnas de texto.
 */
export const FiltroBusquedaGlobal: Story = {
  args: {
    columns: COLUMNAS_CON_ESTADO as any,
    data: ESTUDIANTES as any,
    filters: [
      {
        key: '__search__',
        label: 'Buscar',
        placeholder: 'Buscar por nombre, programa…',
        type: 'search',
      },
    ] as PdsTableFilter[],
    filterMode: 'internal',
  },
};

/**
 * Búsqueda acotada a columnas específicas.
 * El campo `searchKeys` limita la búsqueda a nombre y programa.
 */
export const FiltroBusquedaAcotada: Story = {
  args: {
    columns: COLUMNAS_CON_ESTADO as any,
    data: ESTUDIANTES as any,
    filters: [
      {
        key: 'busqueda',
        label: 'Buscar por nombre o programa',
        placeholder: 'Ej: García, Ingeniería…',
        type: 'search',
        searchKeys: ['nombre', 'programa'],
      },
    ] as PdsTableFilter[],
    filterMode: 'internal',
  },
};

/**
 * Filtro por select.
 * Filtra la columna "estado" por coincidencia exacta.
 */
export const FiltroSelect: Story = {
  args: {
    columns: COLUMNAS_CON_ESTADO as any,
    data: ESTUDIANTES as any,
    filters: [
      {
        key: 'estado',
        label: 'Estado',
        placeholder: 'Todos los estados',
        type: 'select',
        options: [
          { value: 'activo', label: 'Activo' },
          { value: 'inactivo', label: 'Inactivo' },
          { value: 'suspendido', label: 'Suspendido' },
        ],
      },
    ] as PdsTableFilter[],
    filterMode: 'internal',
  },
};

/**
 * Múltiples filtros combinados.
 * Búsqueda global + filtro por estado. Ambos actúan como AND.
 */
export const FiltrosMultiples: Story = {
  args: {
    columns: COLUMNAS_CON_ESTADO as any,
    data: ESTUDIANTES as any,
    filters: [
      {
        key: '__search__',
        label: 'Buscar',
        placeholder: 'Nombre o programa…',
        type: 'search',
      },
      {
        key: 'estado',
        label: 'Estado',
        placeholder: 'Todos',
        type: 'select',
        options: [
          { value: 'activo', label: 'Activo' },
          { value: 'inactivo', label: 'Inactivo' },
          { value: 'suspendido', label: 'Suspendido' },
        ],
      },
    ] as PdsTableFilter[],
    filterMode: 'internal',
    actions: ACCIONES as any,
  },
};

/**
 * Filtros en modo externo (server-side).
 * El componente emite `(filterChange)` y el padre aplica el filtro.
 * Útil cuando los datos vienen paginados de una API.
 */
export const FiltroModoExterno: Story = {
  decorators: [moduleMetadata({ imports: [FiltroExternoStoryComponent] })],
  render: () => ({ template: '<story-filtro-externo />' }),
};

// ── Stories de tipos de celda ────────────────────────────────────────────

/**
 * Columna tipo badge: mapea el valor del campo a una variante del pds-badge.
 * Se define en la columna con `type: 'badge'` y `badgeVariantMap`.
 */
export const CeldaBadge: Story = {
  args: {
    columns: [
      ...COLUMNAS,
      {
        key: 'estado',
        label: 'Estado',
        width: '130px',
        align: 'center',
        type: 'badge',
        badgeVariantMap: { activo: 'success', inactivo: 'neutral', suspendido: 'error' },
        badgeDefaultVariant: 'neutral',
      },
    ] as any,
    data: ESTUDIANTES as any,
  },
};

/**
 * Columna tipo date: muestra un ícono de calendario + fecha formateada.
 * Acepta string ISO o Date. Locale por defecto: 'es-CO'.
 */
export const CeldaFecha: Story = {
  args: {
    columns: [
      { key: 'nombre', label: 'Nombre', sortable: true },
      { key: 'programa', label: 'Programa' },
      {
        key: 'inscripcion',
        label: 'Fecha de inscripción',
        width: '180px',
        type: 'date',
        dateLocale: 'es-CO',
      },
    ] as any,
    data: ESTUDIANTES as any,
  },
};

/**
 * Columna tipo link: ícono de adjunto + texto como enlace.
 * La URL puede venir del propio valor de celda o de otra clave (`linkHrefKey`).
 * El ícono es configurable via `linkIcon` (por defecto `attach_file`).
 */
export const CeldaLink: Story = {
  args: {
    columns: [
      { key: 'nombre', label: 'Nombre' },
      { key: 'programa', label: 'Programa' },
      {
        key: 'documento',
        label: 'Documento adjunto',
        type: 'link',
        linkHrefKey: 'documentoUrl',
        linkIcon: 'attach_file',
      },
    ] as any,
    data: ESTUDIANTES as any,
  },
};

/**
 * Columna tipo with-helper: texto principal + helper text secundario con estado.
 * Ideal para comunicar información contextual o validaciones a nivel de celda.
 */
export const CeldaConHelperText: Story = {
  args: {
    columns: [
      { key: 'nombre', label: 'Nombre', sortable: true },
      { key: 'programa', label: 'Programa' },
      {
        key: 'promedio',
        label: 'Promedio',
        width: '140px',
        type: 'with-helper',
        helperTextKey: 'nota',
        helperStatusKey: 'notaEstado',
      },
    ] as any,
    data: ESTUDIANTES as any,
  },
};

/**
 * Barra de herramientas con botón "Agregar".
 * Se activa con `showAddButton: true`. El texto es configurable con `addButtonLabel`.
 * La acción emite el evento `(addClick)`.
 */
export const ConBotonAgregar: Story = {
  args: {
    columns: COLUMNAS_CON_ESTADO as any,
    data: ESTUDIANTES as any,
    actions: ACCIONES as any,
    showAddButton: true,
    addButtonLabel: 'Agregar estudiante',
  },
};

/**
 * Tabla completa con todos los tipos de celda y toolbar.
 */
export const TodasLasFuncionalidades: Story = {
  args: {
    columns: [
      { key: 'nombre', label: 'Nombre', sortable: true },
      { key: 'programa', label: 'Programa', sortable: true },
      { key: 'inscripcion', label: 'Inscripción', width: '160px', type: 'date', dateLocale: 'es-CO' },
      {
        key: 'estado',
        label: 'Estado',
        width: '130px',
        align: 'center',
        type: 'badge',
        badgeVariantMap: { activo: 'success', inactivo: 'neutral', suspendido: 'error' },
      },
      {
        key: 'promedio',
        label: 'Promedio',
        width: '140px',
        type: 'with-helper',
        helperTextKey: 'nota',
        helperStatusKey: 'notaEstado',
      },
      { key: 'documento', label: 'Documento', type: 'link', linkHrefKey: 'documentoUrl' },
    ] as any,
    data: ESTUDIANTES as any,
    actions: ACCIONES as any,
    showSelection: true,
    showAddButton: true,
    addButtonLabel: 'Agregar estudiante',
    filters: [
      { key: '__search__', label: 'Buscar', placeholder: 'Nombre o programa…', type: 'search' },
      {
        key: 'estado', label: 'Estado', placeholder: 'Todos', type: 'select',
        options: [
          { value: 'activo', label: 'Activo' },
          { value: 'inactivo', label: 'Inactivo' },
          { value: 'suspendido', label: 'Suspendido' },
        ],
      },
    ] as PdsTableFilter[],
    filterMode: 'internal',
  },
};

