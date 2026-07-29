# Dialog — Especificación

**Figma node:** `77:1094` · **Variantes:** 4

## Descripción
Contenedor modal para interrumpir temporalmente la navegación y solicitar confirmación o decisión. Siempre aparece sobre `surface/brand/overlay` (azul al 90% opacidad). Bloquea la interacción con el resto de la interfaz hasta ser cerrado.

## Variantes → Props

### `Mode` → `mode`
| Figma | Angular | Ícono | Fondo header |
|---|---|---|---|
| `Default` | `'default'` | Info | `--surface-brand-primary-soft` |
| `Success` | `'success'` | Check | `--surface-status-success-subtle` |
| `Warning` | `'warning'` | Alert | `--surface-status-warning-subtle` |
| `Error` | `'error'` | Error | `--surface-status-error-subtle` |

## Variables CSS

```scss
.pds-dialog-overlay {
  position: fixed;
  inset: 0;
  background: var(--surface-brand-overlay);
  z-index: 1200;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pds-dialog {
  background: var(--surface-neutral-modal);
  border-radius: var(--radius-container-md);
  width: 100%;
  max-width: var(--container-width-sm);
  box-shadow: 0 8px 32px rgba(0,0,0,0.24);

  &__header {
    padding: var(--spacing-component-lg);
    border-bottom: var(--border-thin) solid var(--border-neutral-subtle);
    border-radius: var(--radius-container-md) var(--radius-container-md) 0 0;
  }
  &__body {
    padding: var(--spacing-component-lg);
    font-family: var(--text-body);
    font-size: var(--font-size-f-base);
    color: var(--fg-neutral-primary);
  }
  &__footer {
    padding: var(--spacing-component-md) var(--spacing-component-lg);
    display: flex;
    justify-content: flex-end;
    gap: var(--spacing-component-sm);
    border-top: var(--border-thin) solid var(--border-neutral-subtle);
  }

  &--default &__header { background: var(--surface-brand-primary-soft); }
  &--success &__header { background: var(--surface-status-success-subtle); }
  &--warning &__header { background: var(--surface-status-warning-subtle); }
  &--error   &__header { background: var(--surface-status-error-subtle); }
}
```

## API Angular

```typescript
@Component({ selector: 'pds-dialog', standalone: true })
export class PdsDialogComponent {
  readonly mode = input<'default' | 'success' | 'warning' | 'error'>('default');
  readonly title = input.required<string>();
  readonly open = input<boolean>(false);
  readonly closeOnOverlay = input<boolean>(false); // dialogs rara vez cierran con click overlay
  readonly closed = output<void>();
  readonly confirmed = output<void>();
}
```

## Accesibilidad
- `role="dialog"` con `aria-modal="true"`
- `aria-labelledby` apuntando al título del dialog
- Foco debe moverse al dialog al abrirse y volver al elemento activador al cerrarse
- Trampa de foco (focus trap) dentro del dialog mientras está abierto
- Cerrar con `Escape`

---

# Modal — Especificación

**Figma node:** `96:3281` · **Variantes:** 5

## Descripción
Contenedor superpuesto para mostrar información libre o acciones complementarias sin abandonar el contexto. A diferencia del Dialog, puede alojar contenido libre: texto, imágenes, formularios. Aparece sobre overlay oscuro.

## Variantes → Props

### `Size` → `size`
| Figma | Angular | Max-width |
|---|---|---|
| `SM` | `'sm'` | `--container-width-sm` (420px) |
| `MD` | `'md'` | `--container-width-md` (560px) |
| `LG` | `'lg'` | `--container-width-lg` (720px) |
| `XL` | `'xl'` | `--container-width-xl` (900px) |
| `2XL` | `'2xl'` | `--container-width-2xl` (1200px) |

## Variables CSS

```scss
.pds-modal {
  background: var(--surface-neutral-modal);
  border-radius: var(--radius-container-md);
  width: 100%;
  box-shadow: 0 8px 32px rgba(0,0,0,0.24);
  display: flex;
  flex-direction: column;
  max-height: 90vh;

  &--sm  { max-width: var(--container-width-sm); }
  &--md  { max-width: var(--container-width-md); }
  &--lg  { max-width: var(--container-width-lg); }
  &--xl  { max-width: var(--container-width-xl); }
  &--2xl { max-width: var(--container-width-2xl); }

  &__header {
    padding: var(--spacing-component-lg);
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: var(--border-thin) solid var(--border-neutral-subtle);
    flex-shrink: 0;
  }
  &__title {
    font-family: var(--text-component);
    font-size: var(--font-size-f-xl);
    font-weight: var(--font-weight-w-semibold);
    color: var(--fg-brand-primary);
  }
  &__body {
    padding: var(--spacing-component-lg);
    overflow-y: auto;
    flex: 1;
  }
  &__footer {
    padding: var(--spacing-component-md) var(--spacing-component-lg);
    display: flex;
    justify-content: flex-end;
    gap: var(--spacing-component-sm);
    border-top: var(--border-thin) solid var(--border-neutral-subtle);
    flex-shrink: 0;
  }
}
```

## API Angular

```typescript
@Component({ selector: 'pds-modal', standalone: true })
export class PdsModalComponent {
  readonly size = input<'sm' | 'md' | 'lg' | 'xl' | '2xl'>('md');
  readonly title = input.required<string>();
  readonly open = input<boolean>(false);
  readonly closeOnOverlay = input<boolean>(true);
  readonly closed = output<void>();
}
```

## Accesibilidad
- Mismos requisitos que Dialog: `role="dialog"`, `aria-modal`, focus trap, Escape para cerrar
- El scroll del body debe bloquearse mientras el modal está abierto
- ~~En móvil considerar bottom sheet en lugar de modal centrado~~ — **descartado**. Se implementó y se revirtió: el modal se mantiene centrado en todos los tamaños. `pds-modal` no tiene bloque responsive.
