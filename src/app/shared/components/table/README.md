# 📊 TableComponent

Componente de tabla con características avanzadas incluyendo filtrado, acciones, paginación y ordenamiento.

## 📚 Storybook

Este componente cuenta con documentación interactiva en Storybook con múltiples ejemplos de uso:

- **Basic** - Tabla simple con datos básicos
- **WithSelection** - Tabla con checkboxes de selección
- **WithActions** - Tabla con botones de acción (ver, editar, eliminar)
- **WithAdditionalFilters** - Tabla con filtros adicionales por columna
- **CompleteExample** - Ejemplo completo basado en el módulo de solicitudes (incluye templates personalizados, badges, filtros y acciones)
- **WithCustomPagination** - Tabla con paginación personalizada
- **WithoutPaginator** - Tabla sin paginación (todos los registros visibles)
- **WithCustomColumnWidths** - Tabla con anchos de columna personalizados

Para ver los ejemplos en Storybook:

```bash
npm run storybook
```

Luego navega a **Componentes > Table** en el menú lateral.

## 🎯 Características Principales

- ✅ **Filtrado avanzado** - Filtro principal + filtros adicionales configurables
- ✅ **Columna de acciones predefinida** - Ver, editar, eliminar y acciones personalizadas
- ✅ **Templates personalizados** - Personaliza cualquier columna con ng-template
- ✅ **Selección múltiple** - Checkboxes con selección individual y global
- ✅ **Paginación flexible** - Automática (cliente) o manual (servidor)
- ✅ **Ordenamiento** - Por cualquier columna
- ✅ **Anchos configurables** - Define anchos específicos por columna
- ✅ **Responsive** - Grid de filtros adaptable a diferentes pantallas
- ✅ **Accesibilidad completa** - ARIA labels, navegación por teclado
- ✅ **Retrocompatible** - Diseño modular y flexible

## 📦 Instalación

```typescript
import { TableComponent } from '@shared/components/table/table.component';

@Component({
  selector: 'app-mi-componente',
  standalone: true,
  imports: [TableComponent],
  // ...
})
```

## 🚀 Uso Básico

### Ejemplo Simple

```html
<app-table
  [data]="usuarios"
  [displayedColumns]="['nombre', 'correo', 'estado']"
  [showActions]="true"
  [actions]="{
    view: { enabled: true },
    edit: { enabled: true },
    delete: { enabled: true }
  }"
  (actionView)="onView($event)"
  (actionEdit)="onEdit($event)"
  (actionDelete)="onDelete($event)">
</app-table>
```

```typescript
export class MiComponente {
  usuarios = [
    { id: 1, nombre: 'Juan Pérez', correo: 'juan@example.com', estado: 'activo' },
    { id: 2, nombre: 'María García', correo: 'maria@example.com', estado: 'inactivo' }
  ];

  onView(usuario: any) {
    console.log('Ver:', usuario);
  }

  onEdit(usuario: any) {
    console.log('Editar:', usuario);
  }

  onDelete(usuario: any) {
    console.log('Eliminar:', usuario);
  }
}
```

## 📖 Ejemplos Avanzados

### Con Filtros Adicionales

```html
<app-table
  [data]="usuarios"
  [displayedColumns]="['nombre', 'correo', 'departamento', 'estado']"
  [additionalFilters]="filtrosAdicionales"
  [showActions]="true"
  [actions]="{ view: { enabled: true }, edit: { enabled: true } }"
  (actionView)="onView($event)"
  (actionEdit)="onEdit($event)">
</app-table>
```

```typescript
filtrosAdicionales: AdditionalFilters[] = [
  {
    key: 'departamento',
    label: 'Departamento',
    type: 'select',
    placeholder: 'Filtrar por departamento',
    options: [
      { value: 'ti', label: 'TI' },
      { value: 'rrhh', label: 'RRHH' },
      { value: 'ventas', label: 'Ventas' }
    ]
  },
  {
    key: 'estado',
    label: 'Estado',
    type: 'select',
    placeholder: 'Filtrar por estado',
    options: [
      { value: 'activo', label: 'Activo' },
      { value: 'inactivo', label: 'Inactivo' }
    ]
  }
];
```

### Con Templates Personalizados

```html
<app-table
  [data]="usuarios"
  [displayedColumns]="['nombre', 'correo', 'estado', 'perfil']"
  [showActions]="true"
  [actions]="{ edit: { enabled: true } }"
  (actionEdit)="onEdit($event)">
  
  <!-- Template para estado con badge -->
  <ng-template tableColumnDef="estado" let-row>
    <app-badge 
      [text]="row.estado" 
      [status]="row.estado === 'activo' ? 'success' : 'danger'">
    </app-badge>
  </ng-template>
  
  <!-- Template para perfil con select -->
  <ng-template tableColumnDef="perfil" let-row>
    <app-material-select 
      [(ngModel)]="row.perfil"
      [options]="perfilesOptions"
      (selectionChange)="onPerfilChange(row, $event)">
    </app-material-select>
  </ng-template>
</app-table>
```

### Con Acciones Personalizadas

```html
<app-table
  [data]="documentos"
  [displayedColumns]="['nombre', 'fecha', 'tipo', 'tamaño']"
  [showActions]="true"
  [actions]="{
    view: { enabled: true, icon: 'visibility', label: 'Ver documento' },
    custom: [
      { 
        key: 'download', 
        icon: 'download', 
        label: 'Descargar',
        class: 'action-download' 
      },
      { 
        key: 'share', 
        icon: 'share', 
        label: 'Compartir',
        class: 'action-share' 
      },
      { 
        key: 'print', 
        icon: 'print', 
        label: 'Imprimir',
        class: 'action-print' 
      }
    ]
  }"
  (actionView)="onView($event)"
  (actionCustom)="onCustomAction($event)">
</app-table>
```

```typescript
onCustomAction(event: CustomActionEvent) {
  const { action, row } = event;
  
  switch (action) {
    case 'download':
      this.descargarDocumento(row);
      break;
    case 'share':
      this.compartirDocumento(row);
      break;
    case 'print':
      this.imprimirDocumento(row);
      break;
  }
}
```

### Con Paginación Manual (Servidor)

```html
<app-table
  [data]="usuarios"
  [displayedColumns]="['nombre', 'correo', 'estado']"
  [manualPagination]="true"
  [totalRecords]="totalRegistros"
  [pageSize]="10"
  [pageSizeOptions]="[10, 25, 50, 100]"
  (page)="onPageChange($event)">
</app-table>
```

```typescript
totalRegistros = 250;

onPageChange(event: PageEvent) {
  const { pageIndex, pageSize } = event;
  
  // Llamar al servicio para obtener la página
  this.usuariosService.getUsuarios(pageIndex, pageSize)
    .subscribe(response => {
      this.usuarios = response.data;
      this.totalRegistros = response.total;
    });
}
```

### Con Anchos de Columnas

```html
<app-table
  [data]="usuarios"
  [displayedColumns]="['id', 'nombre', 'correo', 'departamento']"
  [columnWidths]="{
    'id': 'w-80',
    'nombre': 'w-200',
    'correo': 'w-250',
    'departamento': 'w-150'
  }"
  [showActions]="true"
  [actions]="{ edit: { enabled: true } }">
</app-table>
```

**Clases disponibles:**
- `w-50`, `w-80`, `w-100`, `w-120`, `w-150`
- `w-200`, `w-250`, `w-300`, `w-600`
- `w-actions` (120px), `w-actions-lg` (160px)
- `w-select` (60px)

## 📋 API Reference

### Inputs

#### Datos y Columnas
| Propiedad | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| `data` | `Record<string, any>[]` | `[]` | Array de objetos con los datos de la tabla |
| `displayedColumns` | `string[]` | `[]` | Nombres de las columnas a mostrar (sin 'select' ni 'acciones') |
| `columnWidths` | `Record<string, string>` | `{}` | Clases CSS para anchos de columnas |
| `headerLabels` | `Record<string, string>` | `{}` | Labels personalizados para encabezados |

#### Filtros
| Propiedad | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| `filterPlaceholder` | `string` | `'Escribe para filtrar'` | Placeholder del filtro principal |
| `additionalFilters` | `AdditionalFilters[]` | `[]` | Configuración de filtros adicionales |

#### Selección
| Propiedad | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| `showSelection` | `boolean` | `true` | Muestra columna de checkboxes |
| `showCheckbox` | `boolean` | - | Alias de `showSelection` (retrocompatibilidad) |

#### Paginación
| Propiedad | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| `hidePaginator` | `boolean` | `false` | Oculta el paginador |
| `totalRecords` | `number` | `0` | Total de registros (para paginación manual) |
| `pageSize` | `number` | `10` | Tamaño de página por defecto |
| `pageSizeOptions` | `number[]` | `[5, 10, 25]` | Opciones de tamaño de página |
| `manualPagination` | `boolean` | `false` | Habilita paginación manual (servidor) |

#### Acciones
| Propiedad | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| `showActions` | `boolean` | `false` | Muestra columna de acciones |
| `actions` | `ActionConfig` | `{}` | Configuración de acciones disponibles |
| `canView` | `boolean` | - | Alias para `actions.view.enabled` |
| `canEdit` | `boolean` | - | Alias para `actions.edit.enabled` |
| `canDelete` | `boolean` | - | Alias para `actions.delete.enabled` |

### Outputs

| Evento | Tipo | Descripción |
|--------|------|-------------|
| `actionView` | `EventEmitter<any>` | Emite cuando se hace clic en Ver |
| `actionEdit` | `EventEmitter<any>` | Emite cuando se hace clic en Editar |
| `actionDelete` | `EventEmitter<any>` | Emite cuando se hace clic en Eliminar |
| `actionCustom` | `EventEmitter<CustomActionEvent>` | Emite cuando se hace clic en una acción personalizada |
| `view` | `EventEmitter<any>` | Alias de `actionView` (retrocompatibilidad) |
| `edit` | `EventEmitter<any>` | Alias de `actionEdit` (retrocompatibilidad) |
| `delete` | `EventEmitter<any>` | Alias de `actionDelete` (retrocompatibilidad) |
| `page` | `EventEmitter<PageEvent>` | Emite cuando cambia la página (paginación manual) |

### Interfaces

#### ActionConfig
```typescript
interface ActionConfig {
  view?: { enabled: boolean; icon?: string; label?: string };
  edit?: { enabled: boolean; icon?: string; label?: string };
  delete?: { enabled: boolean; icon?: string; label?: string };
  custom?: CustomAction[];
}
```

#### CustomAction
```typescript
interface CustomAction {
  key: string;      // Identificador único
  icon: string;     // Icono de Material Icons
  label: string;    // Label para aria-label
  class?: string;   // Clase CSS adicional
}
```

#### CustomActionEvent
```typescript
interface CustomActionEvent {
  action: string;   // Key de la acción
  row: any;         // Fila seleccionada
}
```

#### AdditionalFilters
```typescript
interface AdditionalFilters {
  key: string;                  // Nombre de la propiedad a filtrar
  label: string;                // Label del filtro
  placeholder: string;          // Placeholder del input
  type: 'text' | 'select';     // Tipo de filtro
  options?: SelectOption[];     // Opciones si type='select'
}
```

## 🎨 Personalización de Estilos

### Colores de Acciones

El componente usa variables CSS que puedes sobrescribir:

```scss
// action-view (azul)
--color-accent-accent-main: #1fb2de;
--color-accent-accent-dark: #1a8cb8;

// action-edit (amarillo)
--colores-marca-poli-amarillo-base: #ffc107;
--colores-marca-poli-amarillo-dark: #e0a800;

// action-delete (rojo)
--colores-marca-poli-rojo-base: #dc3545;
--colores-marca-poli-rojo-dark: #bd2130;

// action-custom (gris)
--color-text-text-secondary: #6c757d;
--color-text-text-primary: #0f385a;
```

### Clases CSS Personalizadas

Puedes agregar clases personalizadas a las acciones custom:

```typescript
actions: {
  custom: [
    { 
      key: 'special', 
      icon: 'star', 
      label: 'Especial',
      class: 'my-custom-action'  // ← Tu clase personalizada
    }
  ]
}
```

```scss
::ng-deep .my-custom-action {
  color: purple !important;
  
  &:hover {
    background-color: lavender !important;
  }
}
```

## ♿ Accesibilidad

El componente está construido con accesibilidad en mente:

- ✅ **ARIA labels** en todos los botones interactivos
- ✅ **Navegación por teclado** completa (Tab, Enter, Space)
- ✅ **Roles ARIA** apropiados
- ✅ **Focus visible** en elementos interactivos
- ✅ **Checkboxes accesibles** con estados indeterminate
- ✅ **Ordenamiento accesible** con mat-sort

## 🔄 Migración desde table.component

### Antes
```html
<app-table 
  [displayedColumns]="['nombre', 'correo', 'acciones']">
  
  <ng-template tableColumnDef="acciones" let-row>
    <div class="actions">
      <button (click)="ver(row)">
        <app-icon icon="visibility"></app-icon>
      </button>
      <button (click)="editar(row)">
        <app-icon icon="edit"></app-icon>
      </button>
    </div>
  </ng-template>
</app-table>
```

### Después
```html
<app-table
  [displayedColumns]="['nombre', 'correo']"
  [showActions]="true"
  [actions]="{
    view: { enabled: true },
    edit: { enabled: true }
  }"
  (actionView)="ver($event)"
  (actionEdit)="editar($event)">
</app-table>
```

**Beneficios:**
- ❌ Eliminas 10-15 líneas de código
- ❌ No necesitas importar `IconComponent`
- ✅ Código más limpio y declarativo
- ✅ Menos propenso a errores
- ✅ Más fácil de mantener

## 🐛 Troubleshooting

### Error: "Object is possibly 'undefined'"
**Solución:** Usa el operador de encadenamiento opcional en el template

```html
<!-- ❌ Mal -->
<button [attr.aria-label]="actions.view.label">

<!-- ✅ Bien -->
<button [attr.aria-label]="actions.view?.label">
```

### La columna de acciones no aparece
**Solución:** Asegúrate de establecer `showActions="true"`

```html
<app-table
  [showActions]="true"  <!-- ← Requerido -->
  [actions]="{ view: { enabled: true } }">
</app-table>
```

### Los filtros adicionales no funcionan
**Solución:** Verifica que la propiedad `key` coincida con el nombre de la columna

```typescript
// ❌ Mal - key no coincide
additionalFilters = [
  { key: 'status', label: 'Estado', type: 'select', options: [...] }
];
data = [
  { nombre: 'Juan', estado: 'activo' }  // ← propiedad se llama 'estado'
];

// ✅ Bien
additionalFilters = [
  { key: 'estado', label: 'Estado', type: 'select', options: [...] }
];
```

## 📊 Performance

### Optimizaciones Incluidas
- ✅ **Tracking functions** para *ngFor (evita re-renders innecesarios)
- ✅ **OnPush compatible** (usa eventos y @Input changes)
- ✅ **Lazy loading** de templates personalizados
- ✅ **Paginación eficiente** (solo renderiza página actual)
- ✅ **Filtrado optimizado** (debounce interno de Material)

### Recomendaciones
- Usa paginación manual para datasets > 1000 registros
- Limita las columnas visibles (máx 10-12)
- Usa virtualización para tablas muy largas (pendiente)

## 📚 Más Recursos

- [Análisis Comparativo](./ANALISIS_TABLE_UNIFICADO.md)
- [Guía de Implementación](./IMPLEMENTACION_TABLE_UNIFIED.md)
- [Material Table Docs](https://material.angular.io/components/table)
- [Angular CDK Collections](https://material.angular.io/cdk/collections)

## 📝 Changelog

### v1.0.0 (2025-10-16)
- ✨ Primera versión unificada
- ✨ Sistema de acciones predefinidas
- ✨ Soporte para acciones personalizadas
- ✨ Paginación manual/automática
- ✨ Compatibilidad retroactiva completa
- 🐛 Fix: Operadores de encadenamiento opcional
- 📚 Documentación completa

---

**Autor:** GitHub Copilot  
**Fecha:** 16 de Octubre 2025  
**Versión:** 1.0.0  
**Estado:** ✅ Production Ready
