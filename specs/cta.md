# CTA — Especificación

**Figma node:** `562:4063` · **Variantes:** 10

## Descripción
Destaca una acción principal o relevante dentro de la interfaz y guía al usuario hacia el siguiente paso esperado. Se utiliza para impulsar tareas de alto valor. Visualmente más llamativo que un Button estándar.

## Variantes → Props

### `State` → CSS + `disabled` input
| Figma | Angular |
|---|---|
| `Default` | Base |
| `Hover` | `:hover` |
| `Pressed` | `:active` |
| `Focus` | `:focus-visible` |
| `Disabled` | `[disabled]="true"` |

### `Device` → `device`
| Figma | Angular | Diferencia |
|---|---|---|
| `Desktop` | `'desktop'` | Texto más grande, icono más grande |
| `Mobile` | `'mobile'` | Texto y layout adaptados |

## Variables CSS

```scss
.pds-cta {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-component-md);
  cursor: pointer;
  background: transparent;
  border: none;
  padding: 0;

  &__icon {
    color: var(--action-cta-ico);
    transition: color 150ms ease;
  }

  &__text {
    color: var(--action-primary-solid-fg);
    font-family: var(--text-component);
    font-size: var(--font-size-component-cta);
    font-weight: var(--font-weight-w-bold);
  }

  &:hover &__icon   { color: var(--action-cta-icoHover); }
  &:disabled,
  &[aria-disabled="true"] {
    opacity: var(--button-opacity-disabled);
    cursor: not-allowed;
    .pds-cta__icon { color: var(--action-neutral-solid-fg); }
    .pds-cta__text { color: var(--action-neutral-solid-fg); }
  }
  &:focus-visible {
    outline: none;
    border-radius: var(--radius-component-sm);
    box-shadow: 0 0 0 var(--border-thin) var(--action-focusInner),
                0 0 0 var(--border-thick) var(--action-primary-focusRing);
  }
}
```

## API Angular

```typescript
@Component({ selector: 'pds-cta', standalone: true })
export class PdsCtaComponent {
  readonly device = input<'desktop' | 'mobile'>('desktop');
  readonly disabled = input<boolean>(false);
  readonly iconName = input<string>('arrow-right');
  readonly type = input<'button' | 'submit'>('button');
}
```

## Accesibilidad
- Usar `<button>` nativo
- Texto descriptivo de la acción — nunca solo el ícono
- El ícono es decorativo (`aria-hidden="true"`)
