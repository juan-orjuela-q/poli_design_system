# Tooltip — Especificación

**Figma node:** `566:4222` · **Variantes:** 4

## Descripción
Muestra información breve y contextual asociada a un elemento. Se utiliza para aclarar el significado de un ícono, acción, estado o término sin ocupar espacio permanente. Aparece cerca del elemento activador en top, bottom, left o right.

## Variantes → Props

### `Position` → `position`
| Figma | Angular |
|---|---|
| `Top` | `'top'` |
| `Bottom` | `'bottom'` |
| `Left` | `'left'` |
| `Right` | `'right'` |

## Variables CSS

```scss
.pds-tooltip {
  position: absolute;
  z-index: 1000;
  padding: var(--spacing-component-xs) var(--spacing-component-sm);
  background: var(--surface-neutral-inverse);
  color: var(--fg-onColor-inverse);
  border-radius: var(--radius-component-sm);
  font-family: var(--text-body);
  font-size: var(--font-size-f-xs);
  font-weight: var(--font-weight-w-regular);
  line-height: var(--line-height-lh-base);
  max-width: 240px;
  pointer-events: none;
  white-space: normal;

  // Flecha
  &::before {
    content: '';
    position: absolute;
    border: 6px solid transparent;
  }

  &--top    { bottom: calc(100% + 8px); left: 50%; transform: translateX(-50%); }
  &--bottom { top: calc(100% + 8px); left: 50%; transform: translateX(-50%); }
  &--left   { right: calc(100% + 8px); top: 50%; transform: translateY(-50%); }
  &--right  { left: calc(100% + 8px); top: 50%; transform: translateY(-50%); }
}

// Contenedor del activador
.pds-tooltip-wrapper {
  position: relative;
  display: inline-flex;
}
```

## API Angular

```typescript
@Component({ selector: 'pds-tooltip', standalone: true })
export class PdsTooltipComponent {
  readonly text = input.required<string>();
  readonly position = input<'top' | 'bottom' | 'left' | 'right'>('top');
  readonly disabled = input<boolean>(false);
}
```

## Accesibilidad
- El elemento activador debe tener `aria-describedby` apuntando al id del tooltip
- El tooltip en sí tiene `role="tooltip"`
- Activar con hover Y con foco del teclado
- No poner información crítica solo en el tooltip — debe ser complementaria
