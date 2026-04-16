# Badge — Especificación

**Figma node:** `444:6112` · **Variantes:** 42

## Descripción
Indicador visual compacto que comunica estados, categorías o información cuantitativa. Ayuda a identificar rápidamente la condición de un elemento sin navegar a otra sección.

## Variantes → Props

### `Status` → `status`
| Figma | Angular | Fondo | Texto |
|---|---|---|---|
| `Brand` | `'brand'` | `--surface-brand-primary-base` | `--fg-onColor-brandPrimary` |
| `Brand 1` | `'brand-1'` | `--surface-brand-primary-soft` | `--fg-brand-primary` |
| `Brand 2` | `'brand-2'` | `--surface-brand-secondary-muted` | `--fg-brand-primary` |
| `Neutral` | `'neutral'` | `--surface-neutral-subtle` | `--fg-neutral-primary` |
| `Success` | `'success'` | `--surface-status-success-solid` | `--fg-onColor-brandPrimary` |
| `Warning` | `'warning'` | `--surface-status-warning-solid` | `--fg-onColor-brandPrimary` |
| `Error` | `'error'` | `--surface-status-error-solid` | `--fg-onColor-error` |

### `Type` → `shape`
| Figma | Angular | Token radio |
|---|---|---|
| `Pill` | `'pill'` | `--badge-radius-pill` |
| `Rectangle` | `'rectangle'` | `--badge-radius-rectangle` |

### `Size` → `size`
| Figma | Angular | Altura mínima |
|---|---|---|
| `SM` | `'sm'` | `--badge-dimensions-min-height-sm` (24px) |
| `MD` | `'md'` | `--badge-dimensions-min-height-md` (28px) |
| `LG` | `'lg'` | `--badge-dimensions-min-height-lg` (36px) |

## Variables CSS

```scss
.pds-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-component-xxs);
  padding: 0 var(--spacing-component-sm);
  font-family: var(--text-component);
  font-weight: var(--font-weight-w-semibold);
  white-space: nowrap;
  border-radius: var(--badge-radius-pill);

  // Tamaños
  &--sm { min-height: var(--badge-dimensions-min-height-sm); font-size: var(--font-size-f-xs); }
  &--md { min-height: var(--badge-dimensions-min-height-md); font-size: var(--font-size-f-xs); }
  &--lg { min-height: var(--badge-dimensions-min-height-lg); font-size: var(--font-size-f-sm); }

  // Forma
  &--rectangle { border-radius: var(--badge-radius-rectangle); }

  // Estados
  &--brand     { background: var(--surface-brand-primary-base); color: var(--fg-onColor-brandPrimary); }
  &--brand-1   { background: var(--surface-brand-primary-soft); color: var(--fg-brand-primary); }
  &--brand-2   { background: var(--surface-brand-secondary-muted); color: var(--fg-brand-primary); }
  &--neutral   { background: var(--surface-neutral-subtle); color: var(--fg-neutral-primary); }
  &--success   { background: var(--surface-status-success-solid); color: var(--fg-onColor-brandPrimary); }
  &--warning   { background: var(--surface-status-warning-solid); color: var(--fg-onColor-brandPrimary); }
  &--error     { background: var(--surface-status-error-solid); color: var(--fg-onColor-error); }
}
```

## API Angular

```typescript
@Component({ selector: 'pds-badge', standalone: true })
export class PdsBadgeComponent {
  readonly status = input<'brand' | 'brand-1' | 'brand-2' | 'neutral' | 'success' | 'warning' | 'error'>('neutral');
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly shape = input<'pill' | 'rectangle'>('pill');
  readonly iconStart = input<string | null>(null);
}
```

## Accesibilidad
- Usar `role="status"` cuando el badge comunica un estado dinámico
- Si el color es el único indicador del estado, agregar texto visible o `aria-label`
- Íconos internos: `aria-hidden="true"`

## Casos de uso
```html
<pds-badge status="success" size="sm">Activo</pds-badge>
<pds-badge status="error" shape="rectangle">Error</pds-badge>
<pds-badge status="brand" iconStart="star">Destacado</pds-badge>
```
