# FlexibleModalComponent

Un componente modal altamente personalizable que proporciona máxima flexibilidad para el contenido mientras mantiene un diseño consistente.

## Características

- **5 tamaños predefinidos**: `small`, `medium`, `large`, `extra-large`, `full-width`
- **Contenido completamente proyectado**: Todo el contenido se define vía `<ng-content>`
- **Solo acción de cerrar**: Incluye únicamente la funcionalidad de cerrar
- **Highly configurable**: Control total sobre el comportamiento del modal
- **Responsive**: Se adapta automáticamente a pantallas pequeñas

## Propiedades de entrada

| Propiedad | Tipo | Por defecto | Descripción |
|-----------|------|-------------|-------------|
| `visible` | `boolean` | `false` | Controla la visibilidad del modal |
| `size` | `ModalSize` | `'medium'` | Tamaño del modal |
| `closeOnBackdrop` | `boolean` | `true` | Permite cerrar clickeando el backdrop |
| `showCloseButton` | `boolean` | `true` | Muestra el botón de cerrar |
| `closeButtonText` | `string` | `'Cerrar'` | Texto del botón cerrar |

## Eventos

| Evento | Tipo | Descripción |
|--------|------|-------------|
| `closed` | `void` | Se emite al cerrar el modal |

## Tamaños disponibles

- **`small`**: Máx. 400px - Para confirmaciones y alertas simples
- **`medium`**: Máx. 640px - Para formularios y contenido moderado
- **`large`**: Máx. 768px - Para formularios complejos y tablas
- **`extra-large`**: Máx. 1024px - Para contenido extenso
- **`full-width`**: Máx. 1280px - Para dashboards y contenido complejo

## Ejemplos de uso

### Modal básico
```html
<app-flexible-modal
  [visible]="showModal"
  size="medium"
  (closed)="onModalClose()">

  <h2>Título del Modal</h2>
  <p>Contenido personalizado aquí...</p>

</app-flexible-modal>
```

### Modal sin botón cerrar
```html
<app-flexible-modal
  [visible]="showModal"
  size="large"
  [showCloseButton]="false"
  [closeOnBackdrop]="false"
  (closed)="onModalClose()">

  <div class="custom-header">
    <h2>Modal Personalizado</h2>
    <button (click)="customClose()">X</button>
  </div>

  <div class="custom-content">
    <!-- Tu contenido aquí -->
  </div>

</app-flexible-modal>
```

### Modal con formulario complejo
```html
<app-flexible-modal
  [visible]="showFormModal"
  size="extra-large"
  closeButtonText="Cancelar"
  (closed)="onFormCancel()">

  <div class="form-header">
    <h2>Gestionar Solicitud</h2>
    <p class="subtitle">Complete la información requerida</p>
  </div>

  <form [formGroup]="requestForm" class="form-content">
    <!-- Campos del formulario -->
    <div class="form-grid">
      <app-material-input label="Nombre" formControlName="name"></app-material-input>
      <app-material-select label="Estado" formControlName="status"></app-material-select>
    </div>

    <div class="form-actions">
      <app-button type="outline" (click)="onFormCancel()">Cancelar</app-button>
      <app-button type="primary" (click)="onFormSave()">Guardar</app-button>
    </div>
  </form>

</app-flexible-modal>
```

### Modal de ancho completo para tablas
```html
<app-flexible-modal
  [visible]="showTableModal"
  size="full-width"
  (closed)="onTableModalClose()">

  <div class="table-header">
    <h2>Historial de Solicitudes</h2>
    <div class="table-actions">
      <app-button type="outline" iconStart="download">Exportar</app-button>
    </div>
  </div>

  <app-table
    [data]="historicalData"
    [displayedColumns]="historyColumns"
    [showSelection]="true">
  </app-table>

</app-flexible-modal>
```

## Uso en el componente TypeScript

```typescript
export class MyComponent {
  showModal = false;

  openModal(): void {
    this.showModal = true;
  }

  onModalClose(): void {
    this.showModal = false;
  }
}
```

## Estilos personalizados

Puedes agregar clases CSS personalizadas al contenido proyectado:

```scss
.custom-modal-content {
  .form-header {
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--color-border-border-tertiary);
    margin-bottom: 1.5rem;
  }

  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }
}
```
