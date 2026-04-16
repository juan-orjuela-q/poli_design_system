# Tag — Especificación

**Figma node:** `742:8857` · **Variantes:** 12

## Descripción
Componente compacto para representar categorías, estados, filtros o elementos de navegación relacionados. Permite agrupar información breve y escaneable. A diferencia del Badge, el Tag es interactivo.

## Variantes → Props

### `Type` → `variant`
| Figma | Angular | Fondo base | Fondo hover |
|---|---|---|---|
| `Primary` | `'primary'` | `--action-primary-solid-bg` | `--action-primary-solid-bgHover` |
| `Secondary` | `'secondary'` | `--action-secondary-solid-bg` | `--action-secondary-solid-bgHover` |
| `Tertiary` | `'tertiary'` | transparent | `--action-primary-ghost-bgHover` |

### `State` → CSS + `disabled`

## Variables CSS

```scss
.pds-tag {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-component-xs);
  padding: 0 var(--spacing-component-sm);
  min-height: var(--badge-dimensions-min-height-sm);
  border-radius: var(--badge-radius-pill);
  font-family: var(--text-component);
  font-size: var(--font-size-component-tag);
  font-weight: var(--font-weight-w-medium);
  cursor: pointer;
  transition: background 150ms ease;

  &--primary {
    background: var(--action-primary-solid-bg);
    color: var(--action-primary-solid-fg);
    &:hover  { background: var(--action-primary-solid-bgHover); }
    &:active { background: var(--action-primary-solid-bgPressed); }
  }

  &--secondary {
    background: var(--action-secondary-solid-bg);
    color: var(--action-secondary-solid-fg);
    border: var(--border-thin) solid var(--border-brand-secondary-dark);
    &:hover  { background: var(--action-secondary-solid-bgHover); }
    &:active { background: var(--action-secondary-solid-bgPressed); }
  }

  &--tertiary {
    background: transparent;
    color: var(--action-primary-ghost-fg);
    border: var(--border-thin) solid var(--border-brand-primary-solid);
    &:hover  { background: var(--action-primary-ghost-bgHover); }
    &:active { background: var(--action-primary-ghost-bgPressed); }
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
@Component({ selector: 'pds-tag', standalone: true })
export class PdsTagComponent {
  readonly variant = input<'primary' | 'secondary' | 'tertiary'>('primary');
  readonly disabled = input<boolean>(false);
  readonly removable = input<boolean>(false);
  readonly selected = input<boolean>(false);
  readonly removed = output<void>();
}
```

## Accesibilidad
- `role="button"` si es interactivo, `role="listitem"` si es solo informativo
- Si tiene botón de eliminar, ese botón necesita `aria-label="Eliminar [nombre del tag]"`
