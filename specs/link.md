# Link — Especificación

**Figma node:** `710:18586` · **Variantes:** 5

## Descripción
Permite navegar a otra página, sección, recurso o destino dentro o fuera de la interfaz. Debe comunicar claramente que su función es llevar a otro lugar, diferenciándose visual y semánticamente de un botón.

## Variantes → Props

### `State` → manejado por CSS + `visited` input
| Figma | Angular |
|---|---|
| `Default` | Estado base |
| `Hover` | `:hover` |
| `Focus` | `:focus-visible` |
| `Active` | `:active` |
| `Visited` | `:visited` |

## Variables CSS

```scss
.pds-link {
  color: var(--fg-brand-link);
  text-decoration: underline;
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;

  &:hover  { color: var(--fg-brand-primaryStrong); }
  &:active { color: var(--fg-brand-primaryStrong); }
  &:visited { color: var(--fg-status-visited); }
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
@Component({ selector: 'pds-link', standalone: true })
export class PdsLinkComponent {
  readonly href = input<string>('#');
  readonly target = input<'_self' | '_blank' | '_parent' | '_top'>('_self');
  readonly external = input<boolean>(false);
}
```

```html
<a [href]="href()" [target]="target()"
   [attr.rel]="external() ? 'noopener noreferrer' : null"
   class="pds-link">
  <ng-content />
  @if (external()) {
    <pds-icon name="external-link" size="xs" ariaLabel="Abre en nueva pestaña" />
  }
</a>
```

## Accesibilidad
- Usar elemento `<a>` nativo con `href` válido
- Links externos: agregar `rel="noopener noreferrer"` y ícono visual + `aria-label`
- El texto del link debe describir el destino — evitar "haz clic aquí"
- `:focus-visible` con doble anillo visible
