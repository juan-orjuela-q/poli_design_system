# Loading Circle — Especificación

**Figma node:** `376:2077` · **Variantes:** 3

## Descripción
Comunica que el sistema está procesando una tarea cuando el progreso no puede medirse con precisión. Implementado como animación CSS de rotación continua.

## Variantes → Props

### `Size` → `size`
| Figma | Angular | Dimensión |
|---|---|---|
| `SM` | `'sm'` | `--icon-sm` (20px) |
| `MD` | `'md'` | `--icon-md` (24px) |
| `LG` | `'lg'` | `--icon-lg` (32px) |

## Variables CSS

```scss
.pds-loading-circle {
  display: inline-block;
  border-radius: 50%;
  animation: pds-spin 800ms linear infinite;

  &--sm { width: var(--icon-sm); height: var(--icon-sm); }
  &--md { width: var(--icon-md); height: var(--icon-md); }
  &--lg { width: var(--icon-lg); height: var(--icon-lg); }

  // Arco de color + track
  border: 2px solid var(--surface-neutral-sunken);
  border-top-color: var(--surface-brand-primary-base);
}

@keyframes pds-spin {
  to { transform: rotate(360deg); }
}
```

## API Angular

```typescript
@Component({ selector: 'pds-loading-circle', standalone: true })
export class PdsLoadingCircleComponent {
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly ariaLabel = input<string>('Cargando');
}
```

## Accesibilidad
- `role="status"` con `aria-label` descriptivo
- `aria-live="polite"` para anunciar cuando el estado cambia
- Respetar `prefers-reduced-motion` — reducir o eliminar la animación

```scss
@media (prefers-reduced-motion: reduce) {
  .pds-loading-circle { animation-duration: 2s; }
}
```
