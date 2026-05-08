import type { Meta, StoryObj } from '@storybook/angular';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { moduleMetadata } from '@storybook/angular';
import {
  PdsTableComponent,
  PdsTableCellDirective,
  PDS_TABLE_ACTIONS,
  type PdsTableColumn,
  type PdsTableFilter,
} from './pds-table.component';

// ── Datos de ejemplo ──────────────────────────────────────────────────────────

interface Student {
  id: string;
  name: string;
  program: string;
  semester: number;
  status: string;
  enrollmentDate: string;
  average: string;
  [key: string]: unknown;
}

const STUDENTS: Student[] = [
  { id: 'S001', name: 'Ana García López', program: 'Ingeniería de Sistemas', semester: 4, status: 'Activo', enrollmentDate: '2023-02-01', average: '4.2' },
  { id: 'S002', name: 'Carlos Martínez', program: 'Administración', semester: 2, status: 'Activo', enrollmentDate: '2024-02-01', average: '3.8' },
  { id: 'S003', name: 'María Rodríguez', program: 'Psicología', semester: 6, status: 'Graduado', enrollmentDate: '2021-08-01', average: '4.7' },
  { id: 'S004', name: 'Juan Pérez Gómez', program: 'Derecho', semester: 1, status: 'Inactivo', enrollmentDate: '2024-08-01', average: '3.5' },
  { id: 'S005', name: 'Laura Sánchez', program: 'Comunicación Social', semester: 3, status: 'Activo', enrollmentDate: '2023-08-01', average: '4.0' },
  { id: 'S006', name: 'Pedro Morales', program: 'Ingeniería de Sistemas', semester: 5, status: 'Activo', enrollmentDate: '2022-02-01', average: '3.9' },
  { id: 'S007', name: 'Diana Torres', program: 'Psicología', semester: 2, status: 'Activo', enrollmentDate: '2024-02-01', average: '4.1' },
];

const COLUMNS_BASIC: PdsTableColumn[] = [
  { key: 'name', label: 'Nombre', sortable: true },
  { key: 'program', label: 'Programa', sortable: true },
  { key: 'semester', label: 'Semestre', align: 'center' },
  { key: 'enrollmentDate', label: 'Fecha de ingreso', type: 'date' },
  {
    key: 'status',
    label: 'Estado',
    type: 'badge',
    badgeVariantMap: {
      Activo: 'success',
      Inactivo: 'neutral',
      Graduado: 'brand',
    },
  },
];

const FILTERS: PdsTableFilter[] = [
  { key: 'search', label: 'Buscar estudiante', placeholder: 'Nombre o programa...', type: 'search', searchKeys: ['name', 'program'] },
  {
    key: 'status',
    label: 'Estado',
    type: 'select',
    options: [
      { value: 'Activo', label: 'Activo' },
      { value: 'Inactivo', label: 'Inactivo' },
      { value: 'Graduado', label: 'Graduado' },
    ],
  },
];

const meta: Meta<PdsTableComponent> = {
  title: 'Poli Design System / 07. Content / Table',
  component: PdsTableComponent,
  decorators: [moduleMetadata({ imports: [PdsTableComponent, PdsTableCellDirective] })],
  tags: ['autodocs'],
  argTypes: {
    showSelection: { control: 'boolean', description: 'Habilita la selección de filas con checkboxes' },
    showPaginator: { control: 'boolean', description: 'Muestra el paginador debajo de la tabla' },
    showAddButton: { control: 'boolean', description: 'Muestra botón Agregar en la barra de herramientas' },
    filterMode: {
      control: 'select',
      options: ['internal', 'external'],
      description: 'Modo de filtrado: interno (el componente filtra) o externo (el padre filtra)',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
Tabla de datos del DS v2. Soporta ordenamiento, filtros (búsqueda y select), selección de filas, paginación, acciones por fila y tipos de celda especializados (badge, fecha, enlace, con-helper).
Compatible con modo de filtrado externo para datos del servidor y plantillas de celda personalizadas vía directiva \`pdsTableCell\`.

### Cuándo usarlo
- Para mostrar listados de registros con múltiples atributos (estudiantes, materias, pagos).
- Cuando el usuario necesita ordenar, filtrar o paginar los registros.
- Para tablas de administración con acciones por fila (ver, editar, eliminar).

### Cuándo NO usarlo
- No usar para comparar pocas opciones — una lista \`<ul>\` o cards pueden ser más claros.
- No usar para datos que cambian en tiempo real — considera un dashboard con widgets.

### API
\`\`\`html
<pds-table
  [columns]="columns"
  [data]="students"
  [filters]="filters"
  [showSelection]="true"
  [actions]="[PDS_TABLE_ACTIONS.view, PDS_TABLE_ACTIONS.edit]"
  [showPaginator]="true"
  [totalItems]="total"
  (sortChange)="onSort($event)"
  (actionClick)="onAction($event)"
  (pageChange)="onPageChange($event)"
/>
\`\`\`

| Input             | Tipo                    | Default        | Descripción |
|-------------------|-------------------------|----------------|-------------|
| \`columns\`         | \`PdsTableColumn[]\` (requerido) | — | Definición de columnas |
| \`data\`            | \`T[]\`                | \`[]\`         | Datos a mostrar |
| \`filters\`         | \`PdsTableFilter[]\`   | \`[]\`         | Configuración de filtros |
| \`filterMode\`      | \`'internal'\\|'external'\` | \`'internal'\` | Quién filtra los datos |
| \`showSelection\`   | \`boolean\`            | \`false\`      | Checkboxes de selección |
| \`actions\`         | \`PdsTableAction[]\`   | \`[]\`         | Botones por fila |
| \`sortKey\`         | \`string \\| null\`    | \`null\`       | Columna ordenada actualmente |
| \`sortDirection\`   | \`'asc'\\|'desc'\\|null\` | \`null\`    | Dirección del ordenamiento |
| \`showPaginator\`   | \`boolean\`            | \`false\`      | Muestra paginador |
| \`totalItems\`      | \`number\`             | \`0\`          | Total de registros (para paginador) |
| \`currentPage\`     | \`number\`             | \`1\`          | Página actual |
| \`pageSize\`        | \`number\`             | \`20\`         | Registros por página |
| \`showAddButton\`   | \`boolean\`            | \`false\`      | Botón Agregar en toolbar |
| \`addButtonLabel\`  | \`string\`             | \`'Agregar'\`  | Etiqueta del botón |

---

### Accesibilidad — WCAG 2.2

#### Criterios aplicables
| Criterio | Nivel | Aplicación |
|----------|-------|------------|
| **1.3.1 Info y relaciones** | A | \`<table>\` semántico con \`<th scope="col">\` para encabezados de columna |
| **1.3.2 Secuencia significativa** | A | El orden del DOM sigue el orden visual — filas de arriba a abajo |
| **1.4.3 Contraste mínimo** | AA | Texto de celdas ≥ 4.5:1; encabezados ≥ 4.5:1 |
| **2.1.1 Teclado** | A | Botones de ordenamiento y acciones son \`<button>\` nativos — Tab+Enter |
| **2.4.7 Foco visible** | AA | Focus ring visible en botones de encabezado y acciones |
| **4.1.2 Nombre, rol, valor** | A | Botones de ordenamiento con \`aria-label="Ordenar por [columna] ascendente/descendente"\`; checkboxes con \`aria-label\` por fila |

#### Navegación por teclado
| Tecla | Acción |
|-------|--------|
| **Tab** | Navega entre botones de ordenamiento, filtros y acciones de fila |
| **Enter / Space** | Activa el botón enfocado (ordenar, filtrar, acción de fila) |
| **Shift+Tab** | Navega hacia atrás |

#### Atributos ARIA
| Atributo | Dónde | Función |
|----------|-------|---------|
| \`scope="col"\` | en cada \`<th>\` | Asocia el encabezado a su columna |
| \`aria-label\` | en botones de acción | Identifica la acción y la fila: *"Ver detalle de Ana García"* |
| \`aria-sort="ascending/descending"\` | en \`<th>\` activo | Indica la columna y dirección del ordenamiento |
| \`aria-label\` | en el checkbox de selección | *"Seleccionar Ana García"* |

#### Anuncio en lectores de pantalla
- Al enfocar una celda con Tab: el lector anuncia el valor + encabezado de columna (comportamiento nativo de tabla semántica)
- Al enfocar botón de acción: *"Ver detalle de Ana García López, botón"*
- Al ordenar: \`aria-sort\` actualiza el anuncio del encabezado activo

#### Auditoría v1 → v2
| Hallazgo v1 (Cortés, feb 2026) | Criterio WCAG | Resolución en v2 |
|--------------------------------|---------------|------------------|
| Este componente es nuevo en v2 y fue diseñado desde el inicio conforme a WCAG 2.2 AA | — | — |

### Buenas prácticas
✅ Define siempre \`label\` descriptivos en las columnas — son los \`<th>\` que los lectores de pantalla asocian a las celdas.
✅ Para columnas de estado, usa \`type: 'badge'\` con \`badgeVariantMap\` — el lector lee el texto, no el color.
✅ Para acciones, usa \`PDS_TABLE_ACTIONS\` predefinidas para garantizar etiquetas accesibles consistentes.
❌ No uses tablas para layout — solo para datos tabulares con relación filas/columnas.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<PdsTableComponent>;

// ── Sandbox ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default — Sandbox',
  args: {
    columns: COLUMNS_BASIC,
    data: STUDENTS,
    showSelection: false,
    showPaginator: false,
  },
};

// ── Tabla básica ──────────────────────────────────────────────────────────────

export const BasicTable: Story = {
  name: 'Tabla con ordenamiento',
  render: () => ({
    props: {
      columns: COLUMNS_BASIC,
      data: STUDENTS,
      sortKey: signal<string | null>(null),
      sortDirection: signal<'asc' | 'desc' | null>(null),
      onSort(evt: { key: string; direction: 'asc' | 'desc' } | null) {
        if (evt) {
          this['sortKey'].set(evt.key);
          this['sortDirection'].set(evt.direction);
        } else {
          this['sortKey'].set(null);
          this['sortDirection'].set(null);
        }
      },
    },
    template: `
      <pds-table
        [columns]="columns"
        [data]="data"
        [sortKey]="sortKey()"
        [sortDirection]="sortDirection()"
        (sortChange)="onSort($event)"
      />
    `,
  }),
};

// ── Con filtros ───────────────────────────────────────────────────────────────

export const WithFilters: Story = {
  name: 'Con filtros (búsqueda y select)',
  render: () => ({
    props: {
      columns: COLUMNS_BASIC,
      data: STUDENTS,
      filters: FILTERS,
    },
    template: `
      <pds-table
        [columns]="columns"
        [data]="data"
        [filters]="filters"
        filterMode="internal"
      />
    `,
  }),
};

// ── Con selección y acciones ──────────────────────────────────────────────────

export const WithSelectionAndActions: Story = {
  name: 'Con selección y acciones por fila',
  render: () => ({
    props: {
      columns: COLUMNS_BASIC,
      data: STUDENTS,
      actions: [PDS_TABLE_ACTIONS.view, PDS_TABLE_ACTIONS.edit, PDS_TABLE_ACTIONS.delete],
      selected: signal<Student[]>([]),
      lastAction: signal<string>('—'),
      onSelection(rows: Student[]) { this['selected'].set(rows); },
      onAction(evt: { action: string; row: Student }) { this['lastAction'].set(`${evt.action}: ${(evt.row as Student).name}`); },
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px">
        <pds-table
          [columns]="columns"
          [data]="data"
          [showSelection]="true"
          [actions]="actions"
          (selectionChange)="onSelection($event)"
          (actionClick)="onAction($event)"
        />
        <p style="font-size:13px;color:#50606E;margin:0;font-family:Poppins">
          Seleccionados: <strong>{{ selected().length }}</strong> |
          Última acción: <strong>{{ lastAction() }}</strong>
        </p>
      </div>
    `,
  }),
};

// ── Con paginador ─────────────────────────────────────────────────────────────

export const WithPaginator: Story = {
  name: 'Con paginador',
  args: {
    columns: COLUMNS_BASIC,
    data: STUDENTS,
    showPaginator: true,
    totalItems: 7,
    currentPage: 1,
    pageSize: 5,
    pageSizeOptions: [5, 10, 20],
  },
};

// ── Con botón agregar ─────────────────────────────────────────────────────────

export const WithAddButton: Story = {
  name: 'Con botón Agregar en toolbar',
  args: {
    columns: COLUMNS_BASIC,
    data: STUDENTS,
    showAddButton: true,
    addButtonLabel: 'Inscribir estudiante',
    filters: FILTERS,
  },
};

// ── Accesibilidad ─────────────────────────────────────────────────────────────

export const A11ySemanticTable: Story = {
  name: 'A11y — Tabla semántica (Tab para probar)',
  parameters: {
    docs: {
      description: {
        story: `
La tabla usa \`<table>\`, \`<th scope="col">\`, \`<tbody>\` y \`<td>\` nativos.

Los lectores de pantalla asocian automáticamente cada celda con su encabezado de columna:
- Al enfocar con Tab, el lector anuncia: *"Ana García López — columna Nombre"*
- Los botones de ordenamiento anuncian: *"Ordenar por Nombre"*
- Los botones de acción anuncian: *"Ver detalle de Ana García López, botón"*

El atributo \`aria-sort\` en \`<th>\` activo indica la dirección del ordenamiento.
        `,
      },
    },
  },
  args: {
    columns: COLUMNS_BASIC,
    data: STUDENTS.slice(0, 4),
    actions: [PDS_TABLE_ACTIONS.view, PDS_TABLE_ACTIONS.edit],
  },
};
