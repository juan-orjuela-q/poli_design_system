# Migración v1 → v2

El Design System v2 coexiste con el v1. Esta guía describe la estrategia de migración y cómo hacerla de forma gradual.

## Estrategia: coexistencia sin romper nada

- Los componentes v1 (`app-*`) permanecen **intactos**. No se modifican.
- Los componentes v2 (`pds-*`) son nuevos, completamente independientes.
- Los tokens CSS v2 se cargan junto a los de v1 sin conflictos.
- Cada aplicativo migra **componente por componente**, a su propio ritmo.

## Qué cambia de v1 a v2

| Aspecto | DS v1 | DS v2 |
|---------|-------|-------|
| Selector | `app-*` | `pds-*` |
| Inputs | `@Input()` decorador | `input()` signal |
| Outputs | `@Output() EventEmitter` | `output()` |
| Tokens | Variables SCSS `$var` | CSS custom properties `--var` |
| Formularios | Varios patrones | CVA + signals uniforme |
| Detección de cambios | Default (mayoría) | `OnPush` siempre |
| Disabled | `disabled` nativo | `aria-disabled` + guard JS |
| Focus ring | Variable | `box-shadow` doble anillo consistente |

## Cómo migrar un componente

### 1. Identificar el componente v1

```html
<!-- v1 -->
<app-button type="primary" [disabled]="loading" (clicked)="save()">
  Guardar
</app-button>
```

### 2. Reemplazar por el equivalente v2

```html
<!-- v2 -->
<pds-button variant="primary" [disabled]="loading" (click)="save()">
  Guardar
</pds-button>
```

### 3. Actualizar el import en el componente TypeScript

```typescript
// Remover import v1
import { AppButtonComponent } from '@shared/components/app-button/app-button.component';

// Agregar import v2
import { PdsButtonComponent } from '@poli/components';

@Component({
  imports: [
    // AppButtonComponent,  ← remover
    PdsButtonComponent,   // ← agregar
  ],
})
```

## Mapeo de componentes v1 → v2

| Componente v1 | Componente v2 | Notas |
|---------------|---------------|-------|
| `app-button` | `pds-button` | Prop `type` → `variant` |
| `app-icon` | `pds-icon` | API similar, nuevas variantes |
| `app-badge` | `pds-badge` | Nuevos estados semánticos |
| `app-tag` | `pds-tag` | Remove pattern mejorado |
| `app-input` | `pds-input-field` | CVA completo, más estados |
| `app-select` | `pds-select-field` | Custom dropdown ARIA |
| `app-checkbox` | `pds-checkbox` / `pds-checkbox-group` | CVA, indeterminate nativo |
| `app-radio` | `pds-radio` / `pds-radio-group` | Roving tabindex APG |
| `app-toggle` | `pds-toggle` | `role="switch"`, CVA boolean |
| `app-modal` | `pds-modal` | Focus trap CDK |
| `app-dialog` | `pds-dialog` | 4 modos semánticos |
| `app-notification` | `pds-notification` | 3 tipos, auto-dismiss |
| `app-tabs` | `pds-tabs` | APG tablist pattern |
| `app-sidenav` | `pds-sidenav` | Accordion, collapse animado |
| `app-breadcrumb` | `pds-breadcrumb` | API simplificada |
| `app-paginator` | `pds-paginator` | Standalone, outputs claros |
| `app-stepper` | `pds-stepper` | Parent controla el índice |
| `app-accordion` | `pds-accordion` + `pds-accordion-group` | Modo grupo accordion |
| `app-table` | `pds-table` | Filtros, sorting, selección |
| `app-card` | `pds-card` | 3 behaviors: info/nav/selectable |

## Diferencias de API más comunes

### Output `click` vs output custom

```typescript
// v1: output custom
(clicked)="handler()"

// v2: output nativo del host o output específico
(click)="handler()"        // pds-button, pds-cta, pds-icon-button
(cardClick)="handler()"    // pds-card
(tabChange)="handler($event)"  // pds-tabs
```

### Prop `type` renombrada a `variant`

```html
<!-- v1 -->
<app-button type="primary">...</app-button>
<app-button type="secondary">...</app-button>

<!-- v2 -->
<pds-button variant="primary">...</pds-button>
<pds-button variant="secondary">...</pds-button>
```

### Tokens en SCSS

```scss
// v1: variables SCSS de variables_tokens.scss
.my-component {
  background: $action-primary-bg;
  color: $text-on-primary;
}

// v2: CSS custom properties de tokens.css
.my-component {
  background: var(--action-primary-bg);
  color: var(--fg-on-primary);
}
```

## Usar v1 y v2 en la misma vista

Es totalmente válido mezclar ambas versiones en la misma plantilla durante la migración:

```html
<!-- Vista durante migración gradual -->
<div class="header">
  <!-- Ya migrado -->
  <pds-avatar-button [name]="user.name" [type]="'letter'" />
</div>

<div class="content">
  <!-- Pendiente de migrar -->
  <app-data-table [data]="items" />
</div>

<div class="footer">
  <!-- Ya migrado -->
  <pds-button variant="primary" (click)="save()">Guardar</pds-button>
</div>
```

## Checklist de migración de un componente

- [ ] Reemplazar selector `app-*` → `pds-*` en la plantilla
- [ ] Actualizar imports en el componente Angular
- [ ] Mapear props renombradas (`type` → `variant`, etc.)
- [ ] Convertir `@Input()` bindings a signals si hay componentes hijos personalizados
- [ ] Verificar que el formulario (si aplica) funcione con CVA
- [ ] Revisar accesibilidad: `aria-disabled`, focus ring, teclado
- [ ] Probar en mobile que los touch targets son adecuados
- [ ] Actualizar Storybook si hay stories del componente
