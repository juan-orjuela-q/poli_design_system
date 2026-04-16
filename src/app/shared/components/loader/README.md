# LoaderComponent

Componente de carga unificado del sistema de diseño del Politécnico Grancolombiano.

## Descripción

El `LoaderComponent` proporciona un indicador visual consistente para operaciones de carga en toda la aplicación. Reemplaza los múltiples estilos de carga personalizados que existían anteriormente en diferentes páginas y diálogos.

## Características

- ✅ **Spinner animado** con colores del sistema de diseño
- ✅ **Mensaje personalizable** para contexto específico
- ✅ **3 tamaños**: small, medium, large
- ✅ **Modo minimal**: solo spinner sin mensaje
- ✅ **Modo fullscreen**: overlay con fondo semi-transparente
- ✅ **Design tokens**: usa variables CSS del sistema de diseño

## Uso Básico

### Importación

```typescript
import { LoaderComponent } from '@shared/components/loader/loader.component';

@Component({
  imports: [LoaderComponent]
})
```

### Template

```html
<!-- Uso básico -->
<app-loader *ngIf="isLoading"></app-loader>

<!-- Con mensaje personalizado -->
<app-loader 
  *ngIf="isLoading" 
  [message]="'Cargando empleados...'">
</app-loader>

<!-- Tamaño grande -->
<app-loader 
  *ngIf="isLoading" 
  [message]="'Procesando datos...'"
  [size]="'large'">
</app-loader>

<!-- Modo minimal (solo spinner) -->
<app-loader 
  *ngIf="isLoading" 
  [minimal]="true">
</app-loader>

<!-- Fullscreen overlay -->
<app-loader 
  [fullScreen]="true"
  [message]="'Guardando cambios...'"
  *ngIf="isSaving">
</app-loader>
```

## API

### Inputs

| Propiedad | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| `message` | `string` | `'Cargando...'` | Mensaje mostrado debajo del spinner |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Tamaño del spinner y del texto |
| `fullScreen` | `boolean` | `false` | Si es true, cubre toda la pantalla con overlay |
| `minimal` | `boolean` | `false` | Si es true, muestra solo el spinner sin mensaje |

## Tamaños

### Small
- **Spinner**: 24px
- **Borde**: 3px
- **Font size**: 14px
- **Uso**: Inline loaders, elementos pequeños

### Medium (default)
- **Spinner**: 40px
- **Borde**: 4px
- **Font size**: 16px
- **Uso**: Secciones de página, tarjetas

### Large
- **Spinner**: 56px
- **Borde**: 5px
- **Font size**: 18px
- **Uso**: Páginas completas, procesos importantes

## Ejemplos de Uso

### En una página con tabla

```typescript
export class EmployeesComponent {
  isLoading = false;
  employees: Employee[] = [];

  loadEmployees() {
    this.isLoading = true;
    this.employeeService.getAll().subscribe({
      next: (data) => {
        this.employees = data;
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
  }
}
```

```html
<app-loader 
  *ngIf="isLoading" 
  [message]="'Cargando empleados...'"
  [size]="'large'">
</app-loader>

<app-table 
  *ngIf="!isLoading"
  [data]="employees">
</app-table>
```

### En un diálogo

```html
<app-modal [visible]="visible">
  <app-loader 
    *ngIf="isLoading" 
    [size]="'medium'">
  </app-loader>

  <form *ngIf="!isLoading" [formGroup]="form">
    <!-- Contenido del formulario -->
  </form>
</app-modal>
```

### Durante una operación de guardado

```html
<app-loader 
  [fullScreen]="true"
  [message]="'Guardando cambios...'"
  *ngIf="isSaving">
</app-loader>
```

## Implementaciones Actuales

El componente ha sido implementado en:

### Páginas
- ✅ `employees.component` - Cargando empleados
- ✅ `job-positions.component` - Cargando cargos
- ✅ `benefits-list.component` - Cargando beneficios
- ✅ `requests.component` - Cargando solicitudes
- ✅ `error-logs-list.component` - Cargando logs de errores

### Diálogos
- ✅ `benefit-form-dialog.component` - Cargando datos del beneficio
- ✅ `request-detail-dialog.component` - Cargando detalle de solicitud

## Estilos Personalizados Reemplazados

Antes de este componente, cada página/diálogo tenía su propio estilo de loading:

```scss
// ❌ Antiguo (eliminado)
.loading-container {
  display: flex;
  justify-content: center;
  padding: 40px;
  
  p {
    color: #555;
    font-size: 14px;
  }
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  // ...
}
```

```html
<!-- ❌ Antiguo (eliminado) -->
<div *ngIf="isLoading" class="loading-container">
  <p>Cargando empleados...</p>
</div>
```

```html
<!-- ✅ Nuevo (unificado) -->
<app-loader 
  *ngIf="isLoading" 
  [message]="'Cargando empleados...'"
  [size]="'large'">
</app-loader>
```

## Beneficios

### Consistencia
- Mismo aspecto visual en toda la aplicación
- Mensajes con el mismo estilo tipográfico
- Animación uniforme del spinner

### Mantenibilidad
- Un solo lugar para actualizar estilos de loading
- Fácil de usar y entender
- Reduce código duplicado

### Accesibilidad
- Estructura semántica clara
- Mensajes descriptivos para lectores de pantalla
- Contraste adecuado de colores

### Performance
- CSS optimizado con variables
- Animación GPU-accelerated
- Sin dependencias externas

## Buenas Prácticas

### ✅ Hacer
- Proporcionar mensajes descriptivos y específicos
- Usar `size='large'` para cargas de página completa
- Usar `size='small'` para elementos inline
- Usar `fullScreen` solo para operaciones críticas que bloquean la UI
- Mostrar el loader inmediatamente al iniciar una operación asíncrona

### ❌ Evitar
- Usar mensajes genéricos como "Cargando..." cuando se puede ser más específico
- Dejar el loader visible si la operación falla (siempre limpiar el estado)
- Usar múltiples loaders simultáneos en la misma vista
- Mostrar loaders para operaciones muy rápidas (< 300ms)

## Mejoras Futuras

Posibles mejoras a considerar:

1. **Progress Bar**: Variante con barra de progreso para operaciones con porcentaje conocido
2. **Skeleton Screens**: Versión con placeholders que imitan el contenido real
3. **Timeout Handler**: Mostrar mensaje alternativo si la carga toma demasiado tiempo
4. **Retry Button**: Opción de reintentar operación fallida
5. **Animation Variants**: Diferentes animaciones según el contexto

## Soporte

Para preguntas o sugerencias sobre este componente, contacta al equipo de desarrollo del sistema de diseño.
