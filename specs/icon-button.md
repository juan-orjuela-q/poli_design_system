# Icon Button — Especificación

**Figma node:** `84:1092` · **Variantes:** 240

## Descripción
Acción que utiliza exclusivamente un ícono para representar su función. Se emplea para ahorrar espacio cuando el contexto visual es suficientemente claro. Comparte la estructura de Button con variantes adicionales: Tertiary y Ghost Neutral.

## Variantes → Props

### `Type` → `variant`
| Figma | Angular |
|---|---|
| `Primary` | `'primary'` |
| `Secondary` | `'secondary'` |
| `Outline` | `'outline'` |
| `Ghost` | `'ghost'` |
| `Ghost Neutral` | `'ghost-neutral'` |
| `Tertiary` | `'tertiary'` |
| `Destructive` | `'destructive'` |
| `Destructive Out` | `'destructive-outline'` |

### `Size` → `size`
| Figma | Token altura |
|---|---|
| `SM` | `--button-dimensions-height-sm` (32px) |
| `MD` | `--button-dimensions-height` (48px) |
| `LG` | `--button-dimensions-height-lg` (56px) |

### `Radius` → `rounded`
| Figma | Angular | Token |
|---|---|---|
| `Pill` | `'pill'` | `--radius-pill` |
| `Rectangle` | `'rectangle'` | `--radius-component-md` |

### `State` → CSS + `disabled` input

## Variables CSS

```scss
.pds-icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;

  // Tamaño — cuadrado
  width: var(--button-dimensions-height);
  height: var(--button-dimensions-height);
  border-radius: var(--radius-pill);

  &--sm { width: var(--button-dimensions-height-sm); height: var(--button-dimensions-height-sm); }
  &--lg { width: var(--button-dimensions-height-lg); height: var(--button-dimensions-height-lg); }
  &--rectangle { border-radius: var(--radius-component-md); }

  // Primary
  &--primary {
    background: var(--action-primary-solid-bg);
    color: var(--action-primary-solid-fg);
    &:hover  { background: var(--action-primary-solid-bgHover); }
    &:active { background: var(--action-primary-solid-bgPressed); }
  }

  // Secondary
  &--secondary {
    background: var(--action-secondary-solid-bg);
    color: var(--action-secondary-solid-fg);
    border: var(--border-thin) solid var(--action-secondary-solid-border);
    &:hover  { background: var(--action-secondary-solid-bgHover); }
    &:active { background: var(--action-secondary-solid-bgPressed); }
  }

  // Ghost
  &--ghost {
    background: transparent;
    color: var(--action-primary-ghost-fg);
    &:hover  { background: var(--action-primary-ghost-bgHover); }
    &:active { background: var(--action-primary-ghost-bgPressed); }
  }

  // Ghost Neutral
  &--ghost-neutral {
    background: transparent;
    color: var(--action-neutral-ghost-fgStrong);
    &:hover  { background: var(--action-neutral-ghost-bgHover); }
    &:active { background: var(--action-neutral-ghost-bgPressed); }
  }

  // Tertiary
  &--tertiary {
    background: var(--action-primary-subtle-bg);
    color: var(--action-primary-subtle-fgStrong);
    &:hover  { background: var(--action-primary-subtle-bgHover); }
    &:active { background: var(--action-primary-subtle-bgPressed); }
  }

  // Neutral solid
  &--neutral {
    background: var(--action-neutral-solid-bg);
    color: var(--action-neutral-solid-fg);
  }

  // Destructive
  &--destructive {
    background: var(--action-status-error-solid-bg);
    color: var(--action-status-error-solid-fg);
    &:hover  { background: var(--action-status-error-solid-bgHover); }
    &:active { background: var(--action-status-error-solid-bgPressed); }
  }

  &:disabled, &[aria-disabled="true"] {
    opacity: var(--button-opacity-disabled);
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 var(--border-thin) var(--action-focusInner),
                0 0 0 var(--border-thick) var(--action-primary-focusRing);
  }
}
```

## API Angular

```typescript
@Component({ selector: 'pds-icon-button', standalone: true })
export class PdsIconButtonComponent {
  readonly variant = input<'primary' | 'secondary' | 'outline' | 'ghost' | 'ghost-neutral' | 'tertiary' | 'destructive' | 'destructive-outline'>('primary');
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly rounded = input<'pill' | 'rectangle'>('pill');
  readonly disabled = input<boolean>(false);
  readonly iconName = input.required<string>();
  readonly ariaLabel = input.required<string>();
  readonly type = input<'button' | 'submit'>('button');
}
```

## Accesibilidad
- **`ariaLabel` es obligatorio** — el botón no tiene texto visible
- Usar `<button>` nativo
- El ícono interno debe ser `aria-hidden="true"`
- Focus visible con doble anillo

## Casos de uso
```html
<pds-icon-button iconName="close" ariaLabel="Cerrar modal" variant="ghost" />
<pds-icon-button iconName="edit" ariaLabel="Editar registro" variant="tertiary" size="sm" />
<pds-icon-button iconName="delete" ariaLabel="Eliminar" variant="destructive" />
```
