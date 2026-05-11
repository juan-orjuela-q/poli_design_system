# Guía de consumo

Cómo usar los componentes del Design System v2 en una aplicación Angular del ecosistema Poli.

## Prerequisitos

1. La aplicación debe tener `@poli/components` instalado (ver [Instalación](instalacion)).
2. Los tokens CSS deben estar cargados en `angular.json`.

## Importar un componente

Todos los componentes son **standalone**. Se importan directamente en el array `imports` de tu componente o módulo:

```typescript
import { PdsButtonComponent } from '@poli/components';

@Component({
  standalone: true,
  imports: [PdsButtonComponent],
  template: `
    <pds-button variant="primary">Guardar</pds-button>
  `,
})
export class MyComponent {}
```

Para importar múltiples componentes a la vez:

```typescript
import {
  PdsButtonComponent,
  PdsInputFieldComponent,
  PdsSelectFieldComponent,
  PdsIconComponent,
} from '@poli/components';

@Component({
  standalone: true,
  imports: [PdsButtonComponent, PdsInputFieldComponent, PdsSelectFieldComponent, PdsIconComponent],
  // ...
})
export class MyFormComponent {}
```

## API con Angular Signals

Los componentes v2 usan la **Signal API** de Angular 19 (`input()`, `output()`). Los inputs se pasan como atributos HTML estándar o con `[]` para binding:

```html
<!-- Valor estático -->
<pds-badge status="success" size="md">Activo</pds-badge>

<!-- Binding de expresión -->
<pds-badge [status]="getStatus()" [size]="badgeSize">
  {{ label }}
</pds-badge>

<!-- Output con event binding -->
<pds-button (click)="handleSave()">Guardar</pds-button>
```

## Formularios con Control Value Accessor (CVA)

Los componentes de formulario implementan `ControlValueAccessor` y son compatibles con `FormControl` y `ngModel`:

### Con Reactive Forms

```typescript
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PdsInputFieldComponent, PdsSelectFieldComponent } from '@poli/components';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, PdsInputFieldComponent, PdsSelectFieldComponent],
  template: `
    <form [formGroup]="form">
      <pds-input-field
        label="Nombre"
        formControlName="nombre"
      />
      <pds-select-field
        label="País"
        formControlName="pais"
        [options]="paisOptions"
      />
    </form>
  `,
})
export class MyFormComponent {
  form = new FormGroup({
    nombre: new FormControl(''),
    pais: new FormControl(null),
  });

  paisOptions = [
    { value: 'co', label: 'Colombia' },
    { value: 'mx', label: 'México' },
  ];
}
```

### Con ngModel

```typescript
import { FormsModule } from '@angular/forms';
import { PdsToggleComponent } from '@poli/components';

@Component({
  standalone: true,
  imports: [FormsModule, PdsToggleComponent],
  template: `
    <pds-toggle label="Notificaciones" [(ngModel)]="notificationsEnabled" />
  `,
})
export class SettingsComponent {
  notificationsEnabled = false;
}
```

### Sin formulario (binding directo)

```typescript
import { PdsCheckboxComponent } from '@poli/components';

@Component({
  standalone: true,
  imports: [PdsCheckboxComponent],
  template: `
    <pds-checkbox
      label="Acepto los términos"
      [checked]="accepted"
      (checkedChange)="accepted = $event"
    />
  `,
})
export class TermsComponent {
  accepted = false;
}
```

## Componentes compuestos (ng-content)

Modal y Dialog admiten contenido proyectado:

```html
<pds-modal
  title="Editar perfil"
  [open]="isOpen"
  (closed)="isOpen = false"
  (confirmed)="save()"
>
  <!-- Contenido principal -->
  <pds-input-field label="Nombre" [value]="name" (valueChange)="name = $event" />

  <!-- Footer personalizado (opcional) -->
  <div slot="footer">
    <pds-button variant="ghost" (click)="isOpen = false">Cancelar</pds-button>
    <pds-button variant="primary" (click)="save()">Guardar cambios</pds-button>
  </div>
</pds-modal>
```

## Patterns frecuentes

### Loading state en botón

```html
<pds-button
  [disabled]="loading"
  [iconEnd]="loading ? 'progress_activity' : null"
  (click)="submit()"
>
  {{ loading ? 'Guardando...' : 'Guardar' }}
</pds-button>
```

### Campo con validación

```html
<pds-input-field
  label="Email"
  type="email"
  [status]="emailControl.invalid && emailControl.touched ? 'error' : 'default'"
  [feedbackText]="emailControl.invalid && emailControl.touched ? 'Email inválido' : null"
  formControlName="email"
/>
```

### Tabla paginada

```typescript
// En el componente:
columns: PdsTableColumn[] = [
  { key: 'nombre', label: 'Nombre', sortable: true },
  { key: 'estado', label: 'Estado' },
];

currentPage = signal(1);
pageSize = signal(20);

onPageChange(page: number) {
  this.currentPage.set(page);
  this.loadData(); // recarga desde API
}
```

```html
<pds-table
  [columns]="columns"
  [data]="data()"
  [showPaginator]="true"
  [totalItems]="totalItems()"
  [currentPage]="currentPage()"
  [pageSize]="pageSize()"
  (pageChange)="onPageChange($event)"
/>
```
