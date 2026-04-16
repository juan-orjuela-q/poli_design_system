# 📚 Ejemplos de Storybook - TableComponent

Este documento describe cada uno de los ejemplos disponibles en Storybook para el componente `TableComponent`.

## 🎯 Cómo ver los ejemplos

1. Ejecuta Storybook:
   ```bash
   npm run storybook
   ```

2. Navega a **Componentes > Table** en el menú lateral

3. Explora cada historia en el panel de navegación

## 📋 Lista de Ejemplos

### 1. Basic

**Descripción**: Tabla simple con datos básicos sin funcionalidades adicionales.

**Características**:
- Datos simples (usuarios)
- Sin selección
- Sin acciones
- Solo filtro principal

**Ideal para**: Mostrar información de solo lectura sin necesidad de interacción.

---

### 2. WithSelection

**Descripción**: Tabla con checkboxes para selección múltiple.

**Características**:
- Checkboxes en cada fila
- Checkbox maestro en header
- Datos de productos con stock
- Sin columna de acciones

**Ideal para**: Permitir al usuario seleccionar múltiples registros para operaciones en lote.

---

### 3. WithActions

**Descripción**: Tabla con columna de acciones predefinidas.

**Características**:
- Botones de ver, editar y eliminar
- Sin selección
- Configuración de acciones mediante objeto `actions`
- Eventos individuales para cada acción

**Ideal para**: CRUD básico con operaciones individuales por registro.

---

### 4. WithAdditionalFilters

**Descripción**: Tabla con filtros adicionales por columna específica.

**Características**:
- Filtro principal de búsqueda
- Filtro select por nivel (Básico, Intermedio, Avanzado)
- Filtro text por profesor
- Grid responsive de filtros

**Ideal para**: Tablas con muchos registros que requieren filtrado granular.

**Código clave**:
```typescript
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
  }
]
```

---

### 5. CompleteExample ⭐

**Descripción**: Ejemplo completo basado en el módulo de solicitudes de languages. Es el más completo y representa un caso de uso real.

**Características**:
- Templates personalizados para columnas (`programa` y `estado`)
- Badges con colores según estado
- Información adicional (días para vencer)
- Múltiples filtros adicionales (estado, revisor)
- Acciones completas (ver, editar, eliminar)
- Datos realistas con diferentes estados

**Templates personalizados**:

1. **Columna Programa**: Muestra nombre del programa y modalidad
   ```html
   <ng-template tableColumnDef="programa" let-row let-value="value">
     <div class="program-column">
       <div class="poli-cuerpo-base-base-regular">{{ value }}</div>
       <div class="program-modality color-secundary poli-utility-info-adicional-2">
         {{ row.modalidad }}
       </div>
     </div>
   </ng-template>
   ```

2. **Columna Estado**: Badge con color según estado + días de vencimiento
   ```html
   <ng-template tableColumnDef="estado" let-row let-value="value">
     <div class="status-column">
       <app-badge 
         [iconStart]="getStatusIcon(value)" 
         [text]="getStatusText(value)" 
         size="small"
         [status]="getStatusBadgeColor(value)" 
         [type]="'rectangle'">
       </app-badge>
       <div *ngIf="value === 'en_revision' && row.diasVencimiento !== null">
         <app-badge size="small" [status]="'danger'" [type]="'dot'"></app-badge>
         <span>{{ row.diasVencimiento }} días para vencer</span>
       </div>
     </div>
   </ng-template>
   ```

**Estados disponibles**:
- `en_revision` → Badge warning + días de vencimiento
- `sin_asignar` → Badge light
- `rechazada` → Badge danger
- `aprobada` → Badge success
- `devuelta` → Badge warning

**Ideal para**: Entender todas las capacidades del componente en un ejemplo real.

---

### 6. WithCustomPagination

**Descripción**: Tabla con 50 registros y opciones de paginación personalizadas.

**Características**:
- 50 registros de órdenes
- Selección múltiple habilitada
- Paginación configurada: 10 por página
- Opciones de tamaño: 5, 10, 25, 50
- Datos generados dinámicamente

**Ideal para**: Tablas con muchos registros que requieren paginación eficiente.

---

### 7. WithoutPaginator

**Descripción**: Tabla sin paginación, mostrando todos los registros a la vez.

**Características**:
- `hidePaginator: true`
- 4 registros de proyectos (sin paginación)
- Acciones de ver y editar
- Útil para listas cortas

**Ideal para**: Listas pequeñas donde no tiene sentido paginar.

---

### 8. WithCustomColumnWidths

**Descripción**: Tabla con anchos de columna personalizados usando clases CSS.

**Características**:
- Clases de ancho: `w-100`, `w-500`, `w-150`
- Columna de descripción más ancha
- Columnas de código y precio más estrechas
- Acciones de editar y eliminar

**Código clave**:
```typescript
columnWidths: {
  codigo: 'w-100',
  descripcion: 'w-500',
  precio: 'w-100',
  categoria: 'w-150'
}
```

**Clases disponibles**: `w-50`, `w-100`, `w-150`, `w-200`, `w-300`, `w-400`, `w-500`, `w-600`

**Ideal para**: Controlar el ancho visual de columnas para mejor legibilidad.

---

## 🎨 Interactividad en Storybook

Todos los ejemplos incluyen:

1. **Controls**: Panel para modificar props en tiempo real
2. **Actions**: Logger de eventos (ver, editar, eliminar)
3. **Docs**: Documentación automática con JSDoc
4. **Source**: Código fuente de cada ejemplo

## 💡 Consejos para usar Storybook

1. **Experimenta con los controles**: Modifica los valores en el panel de Controls para ver cómo afectan al componente

2. **Revisa los eventos**: El panel Actions muestra todos los eventos emitidos cuando interactúas con la tabla

3. **Copia el código**: Usa el botón "Show code" para copiar el código de cualquier ejemplo

4. **Compara ejemplos**: Navega entre ejemplos para entender las diferencias

5. **Usa CompleteExample como referencia**: Es el más completo y muestra todas las capacidades del componente

## 🔗 Referencias

- [README del componente](./README.md)
- [Código fuente del componente](./table.component.ts)
- [Archivo de stories](./table.component.stories.ts)
