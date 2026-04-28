import { Meta, StoryObj, applicationConfig, moduleMetadata } from '@storybook/angular';
import { TableComponent, TableColumnDefDirective, AdditionalFilters } from './table.component';
import { BadgeComponent } from '../badge/badge.component';
import { IconComponent } from '../icon/icon.component';
import { CommonModule } from '@angular/common';
import { provideAnimations } from '@angular/platform-browser/animations';

const meta: Meta<TableComponent> = {
  title: 'DS v1 (Legacy)/Table',
  component: TableComponent,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [provideAnimations()],
    }),
    moduleMetadata({
      imports: [
        CommonModule,
        TableComponent,
        TableColumnDefDirective,
        BadgeComponent,
        IconComponent
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
Componente de tabla altamente configurable con características avanzadas para la visualización y gestión de datos tabulares.

#### Características principales

- **Filtrado avanzado**: Filtro principal de búsqueda + filtros adicionales por columna (text/select)
- **Columna de acciones**: Predefinidas (ver, editar, eliminar) y personalizadas
- **Templates personalizados**: Usa la directiva \`tableColumnDef\` para renderizado custom
- **Selección múltiple**: Checkboxes con selección masiva
- **Paginación**: Automática (cliente) o manual (servidor)
- **Ordenamiento**: Por columnas con Material Sort
- **Anchos configurables**: Clases de ancho para columnas

#### Buenas prácticas

- Usar \`displayedColumns\` solo con las columnas de datos (sin 'select' ni 'acciones')
- Definir \`headerLabels\` para textos legibles en las cabeceras
- Activar \`showActions\` y configurar \`actions\` para habilitar acciones
- Usar \`additionalFilters\` para filtros específicos por columna
- Implementar templates personalizados con \`tableColumnDef\` para casos complejos
- Configurar \`manualPagination\` y \`totalRecords\` para datos de servidor
- Usar \`columnWidths\` para controlar el ancho de columnas específicas
        `.trim(),
      },
    },
  },
};
export default meta;
type Story = StoryObj<TableComponent>;

/**
 * Tabla básica con datos simples y sin acciones
 */
export const Basic: Story = {
  args: {
    data: [
      { id: 1, nombre: 'Juan Pérez', email: 'juan.perez@example.com', rol: 'Administrador' },
      { id: 2, nombre: 'María García', email: 'maria.garcia@example.com', rol: 'Usuario' },
      { id: 3, nombre: 'Carlos López', email: 'carlos.lopez@example.com', rol: 'Editor' },
      { id: 4, nombre: 'Ana Martínez', email: 'ana.martinez@example.com', rol: 'Usuario' },
      { id: 5, nombre: 'Pedro Rodríguez', email: 'pedro.rodriguez@example.com', rol: 'Administrador' },
    ],
    displayedColumns: ['id', 'nombre', 'email', 'rol'],
    headerLabels: {
      id: 'ID',
      nombre: 'Nombre',
      email: 'Correo Electrónico',
      rol: 'Rol'
    },
    showSelection: false,
    showActions: false,
    filterPlaceholder: 'Buscar usuario...',
  },
};

/**
 * Tabla con columna de selección habilitada
 */
export const WithSelection: Story = {
  args: {
    data: [
      { id: 1, producto: 'Laptop Dell XPS 15', precio: '$2,499', stock: 15 },
      { id: 2, producto: 'Mouse Logitech MX Master', precio: '$99', stock: 45 },
      { id: 3, producto: 'Teclado Mecánico Corsair', precio: '$159', stock: 23 },
      { id: 4, producto: 'Monitor LG 27"', precio: '$349', stock: 8 },
      { id: 5, producto: 'Webcam Logitech C920', precio: '$79', stock: 32 },
    ],
    displayedColumns: ['id', 'producto', 'precio', 'stock'],
    headerLabels: {
      id: 'ID',
      producto: 'Producto',
      precio: 'Precio',
      stock: 'Stock'
    },
    showSelection: true,
    showActions: false,
    filterPlaceholder: 'Buscar producto...',
  },
};

/**
 * Tabla con acciones predefinidas (ver, editar, eliminar)
 */
export const WithActions: Story = {
  args: {
    data: [
      { id: 1, nombre: 'Ana Torres', perfil: 'Docente', estado: 'Activo' },
      { id: 2, nombre: 'Luis Gómez', perfil: 'Colaborador', estado: 'Activo' },
      { id: 3, nombre: 'Sofía Ramírez', perfil: 'Administrativo', estado: 'Inactivo' },
      { id: 4, nombre: 'Diego Vargas', perfil: 'Docente', estado: 'Activo' },
      { id: 5, nombre: 'Laura Castro', perfil: 'Colaborador', estado: 'Pendiente' },
    ],
    displayedColumns: ['id', 'nombre', 'perfil', 'estado'],
    headerLabels: {
      id: 'ID',
      nombre: 'Nombre',
      perfil: 'Perfil',
      estado: 'Estado'
    },
    showSelection: false,
    showActions: true,
    actions: {
      view: { enabled: true, icon: 'visibility', label: 'Ver' },
      edit: { enabled: true, icon: 'edit', label: 'Editar' },
      delete: { enabled: true, icon: 'delete', label: 'Eliminar' },
    },
    filterPlaceholder: 'Buscar usuario...',
  },
};

/**
 * Tabla con filtros adicionales por columna
 */
export const WithAdditionalFilters: Story = {
  args: {
    data: [
      { id: 1, curso: 'Matemáticas I', profesor: 'Dr. Ramírez', nivel: 'Básico', cupos: 30 },
      { id: 2, curso: 'Física Avanzada', profesor: 'Dra. González', nivel: 'Avanzado', cupos: 20 },
      { id: 3, curso: 'Química Orgánica', profesor: 'Dr. Martínez', nivel: 'Intermedio', cupos: 25 },
      { id: 4, curso: 'Biología Molecular', profesor: 'Dra. López', nivel: 'Avanzado', cupos: 18 },
      { id: 5, curso: 'Álgebra Lineal', profesor: 'Dr. Ramírez', nivel: 'Intermedio', cupos: 28 },
      { id: 6, curso: 'Programación I', profesor: 'Dr. Torres', nivel: 'Básico', cupos: 35 },
    ],
    displayedColumns: ['id', 'curso', 'profesor', 'nivel', 'cupos'],
    headerLabels: {
      id: 'ID',
      curso: 'Curso',
      profesor: 'Profesor',
      nivel: 'Nivel',
      cupos: 'Cupos'
    },
    showSelection: false,
    showActions: false,
    filterPlaceholder: 'Buscar curso...',
    additionalFilters: [
      {
        key: 'nivel',
        label: 'Filtrar por Nivel',
        placeholder: 'Selecciona un nivel',
        type: 'select',
        options: [
          { value: '', label: 'Todos los niveles' },
          { value: 'Básico', label: 'Básico' },
          { value: 'Intermedio', label: 'Intermedio' },
          { value: 'Avanzado', label: 'Avanzado' },
        ]
      },
      {
        key: 'profesor',
        label: 'Filtrar por Profesor',
        placeholder: 'Escribe el nombre',
        type: 'text',
      }
    ] as AdditionalFilters[],
  },
};

/**
 * Tabla completa con todas las características (basada en requests de languages)
 * Incluye: datos complejos, filtros adicionales, templates personalizados, acciones
 */
export const CompleteExample: Story = {
  render: (args) => ({
    props: {
      ...args,
      // Métodos para el template personalizado
      getStatusBadgeColor: (estado: string) => {
        const colorMap: Record<string, any> = {
          'en_revision': 'warning',
          'sin_asignar': 'light',
          'rechazada': 'danger',
          'aprobada': 'success',
          'devuelta': 'warning'
        };
        return colorMap[estado] || 'light';
      },
      getStatusText: (estado: string) => {
        const textMap: Record<string, string> = {
          'en_revision': 'En revisión',
          'sin_asignar': 'Sin asignar',
          'rechazada': 'Rechazada',
          'aprobada': 'Aprobada',
          'devuelta': 'Devuelta'
        };
        return textMap[estado] || estado;
      },
      getStatusIcon: (estado: string) => {
        const iconMap: Record<string, string> = {
          'en_revision': 'pending',
          'sin_asignar': 'person_off',
          'rechazada': 'cancel',
          'aprobada': 'check_circle',
          'devuelta': 'keyboard_return'
        };
        return iconMap[estado] || 'info';
      },
      onView: (row: any) => {
        console.log('Ver detalles:', row);
      },
      onEdit: (row: any) => {
        console.log('Editar:', row);
      },
      onDelete: (row: any) => {
        console.log('Eliminar:', row);
      },
    },
    template: `
      <app-table 
        [data]="data"
        [displayedColumns]="displayedColumns"
        [headerLabels]="headerLabels"
        [showSelection]="showSelection"
        [showActions]="showActions"
        [actions]="actions"
        [filterPlaceholder]="filterPlaceholder"
        [additionalFilters]="additionalFilters"
        (actionView)="onView($event)"
        (actionEdit)="onEdit($event)"
        (actionDelete)="onDelete($event)">
        
        <!-- Template personalizado para la columna de programa -->
        <ng-template tableColumnDef="programa" let-row let-value="value">
          <div class="program-column">
            <div class="poli-cuerpo-base-base-regular">{{ value }}</div>
            <div class="program-modality color-secundary poli-utility-info-adicional-2">{{ row.modalidad }}</div>
          </div>
        </ng-template>

        <!-- Template personalizado para la columna de estado -->
        <ng-template tableColumnDef="estado" let-row let-value="value">
          <div class="status-column">
            <app-badge 
              [iconStart]="getStatusIcon(value)" 
              [text]="getStatusText(value)" 
              size="small"
              [status]="getStatusBadgeColor(value)" 
              [type]="'rectangle'">
            </app-badge>
            <!-- Mostrar días de vencimiento solo cuando está en revisión -->
            <div *ngIf="value === 'en_revision' && row.diasVencimiento !== null" class="dias-vencimiento">
              <app-badge size="small" [status]="'danger'" [type]="'dot'"></app-badge>
              <span class="color-secundary poli-utility-info-adicional-2">
                {{ row.diasVencimiento }} días para vencer
              </span>
            </div>
          </div>
        </ng-template>
      </app-table>
    `,
  }),
  args: {
    data: [
      {
        id: '356781',
        usuario: 'mcarrillo@poligran.edu.co',
        revisor: 'lalvarez@poligran.edu.co',
        programa: 'Administración de empresas',
        modalidad: 'Pregrado | Virtual',
        estado: 'en_revision',
        creacion: '01/03/2024',
        diasVencimiento: 8,
      },
      {
        id: '459012',
        usuario: 'jhernandez@poligran.edu.co',
        revisor: '',
        programa: 'Ciencias de la Computación',
        modalidad: 'Pregrado | Presencial',
        estado: 'sin_asignar',
        creacion: '12/01/2023',
        diasVencimiento: null,
      },
      {
        id: '573824',
        usuario: 'srodriguez@poligran.edu.co',
        revisor: 'lalvarez@poligran.edu.co',
        programa: 'Diseño Gráfico',
        modalidad: 'Pregrado | Híbrido',
        estado: 'rechazada',
        creacion: '11/25/2023',
        diasVencimiento: null
      },
      {
        id: '689435',
        usuario: 'amartinez@poligran.edu.co',
        revisor: 'lalvarez@poligran.edu.co',
        programa: 'Psicología',
        modalidad: 'Pregrado | Virtual',
        estado: 'en_revision',
        creacion: '10/15/2023',
        diasVencimiento: 9
      },
      {
        id: '047879',
        usuario: 'lvasquez@poligran.edu.co',
        revisor: 'lalvarez@poligran.edu.co',
        programa: 'Arquitectura',
        modalidad: 'Pregrado | Presencial',
        estado: 'aprobada',
        creacion: '06/18/2023',
        diasVencimiento: null
      },
      {
        id: '823657',
        usuario: 'ltorres@poligran.edu',
        revisor: 'jcarrillo@poligran.edu',
        programa: 'Marketing Digital',
        modalidad: 'Pregrado | Híbrido',
        estado: 'devuelta',
        creacion: '08/05/2023',
        diasVencimiento: null
      },
    ],
    displayedColumns: ['id', 'usuario', 'revisor', 'programa', 'estado', 'creacion'],
    headerLabels: {
      id: 'ID',
      usuario: 'Usuario',
      revisor: 'Revisor',
      programa: 'Programa',
      estado: 'Estado',
      creacion: 'Creación'
    },
    showSelection: false,
    showActions: true,
    actions: {
      view: { enabled: true, icon: 'visibility', label: 'Ver detalles' },
      edit: { enabled: true, icon: 'edit', label: 'Editar' },
      delete: { enabled: true, icon: 'delete', label: 'Eliminar' },
    },
    filterPlaceholder: 'Ej: Usuario, ID de solicitud',
    additionalFilters: [
      {
        key: 'estado',
        label: 'Filtrar por Estado',
        placeholder: 'Selecciona una opción',
        type: 'select',
        options: [
          { value: '', label: 'Todos los estados' },
          { value: 'en_revision', label: 'En revisión' },
          { value: 'sin_asignar', label: 'Sin asignar' },
          { value: 'aprobada', label: 'Aprobada' },
          { value: 'rechazada', label: 'Rechazada' },
          { value: 'devuelta', label: 'Devuelta' }
        ]
      },
      {
        key: 'revisor',
        label: 'Filtrar por Revisor',
        placeholder: 'Selecciona una opción',
        type: 'select',
        options: [
          { value: '', label: 'Todos los revisores' },
          { value: 'lalvarez@poligran.edu.co', label: 'L. Álvarez' },
          { value: 'jcarrillo@poligran.edu', label: 'J. Carrillo' }
        ]
      },
    ] as AdditionalFilters[],
  },
};

/**
 * Tabla con paginación personalizada
 */
export const WithCustomPagination: Story = {
  args: {
    data: Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      orden: `ORD-${String(i + 1).padStart(5, '0')}`,
      cliente: `Cliente ${i + 1}`,
      total: `$${(Math.random() * 1000 + 100).toFixed(2)}`,
      estado: ['Pendiente', 'Procesando', 'Enviado', 'Entregado'][Math.floor(Math.random() * 4)]
    })),
    displayedColumns: ['id', 'orden', 'cliente', 'total', 'estado'],
    headerLabels: {
      id: 'ID',
      orden: 'Orden',
      cliente: 'Cliente',
      total: 'Total',
      estado: 'Estado'
    },
    showSelection: true,
    showActions: false,
    filterPlaceholder: 'Buscar orden...',
    pageSize: 10,
    pageSizeOptions: [5, 10, 25, 50],
  },
};

/**
 * Tabla sin paginador (todos los registros visibles)
 */
export const WithoutPaginator: Story = {
  args: {
    data: [
      { id: 1, nombre: 'Proyecto Alpha', estado: 'En progreso', prioridad: 'Alta' },
      { id: 2, nombre: 'Proyecto Beta', estado: 'Completado', prioridad: 'Media' },
      { id: 3, nombre: 'Proyecto Gamma', estado: 'Pendiente', prioridad: 'Baja' },
      { id: 4, nombre: 'Proyecto Delta', estado: 'En progreso', prioridad: 'Alta' },
    ],
    displayedColumns: ['id', 'nombre', 'estado', 'prioridad'],
    headerLabels: {
      id: 'ID',
      nombre: 'Nombre del Proyecto',
      estado: 'Estado',
      prioridad: 'Prioridad'
    },
    showSelection: false,
    showActions: true,
    actions: {
      view: { enabled: true },
      edit: { enabled: true },
    },
    hidePaginator: true,
    filterPlaceholder: 'Buscar proyecto...',
  },
};

/**
 * Tabla con anchos de columna personalizados
 */
export const WithCustomColumnWidths: Story = {
  args: {
    data: [
      { codigo: 'PRD001', descripcion: 'Laptop Dell XPS 15 con procesador Intel Core i7 de 11va generación, 16GB RAM, 512GB SSD', precio: '$2,499', categoria: 'Electrónica' },
      { codigo: 'PRD002', descripcion: 'Mouse inalámbrico Logitech MX Master 3 con sensor de alta precisión', precio: '$99', categoria: 'Accesorios' },
      { codigo: 'PRD003', descripcion: 'Teclado mecánico Corsair K95 RGB Platinum con switches Cherry MX', precio: '$199', categoria: 'Accesorios' },
    ],
    displayedColumns: ['codigo', 'descripcion', 'precio', 'categoria'],
    headerLabels: {
      codigo: 'Código',
      descripcion: 'Descripción',
      precio: 'Precio',
      categoria: 'Categoría'
    },
    columnWidths: {
      codigo: 'w-100',
      descripcion: 'w-500',
      precio: 'w-100',
      categoria: 'w-150'
    },
    showSelection: false,
    showActions: true,
    actions: {
      edit: { enabled: true },
      delete: { enabled: true },
    },
    filterPlaceholder: 'Buscar producto...',
  },
};
