# Progress Bar — Especificación

**Figma node:** `350:4316` · **Variantes:** 4

## Descripción
Comunica visualmente el avance de un proceso con duración perceptible: carga de archivos, procesamiento, sincronización. Muestra cuánto falta y si hay condiciones relevantes como éxito, advertencia o error.

## Variantes → Props

### `State` → `status`
| Figma | Angular | Color barra | Track |
|---|---|---|---|
| `Primary` | `'primary'` | `--surface-brand-primary-base` | `--surface-brand-primary-subtle` |
| `Success` | `'success'` | `--surface-status-success-solid` | `--surface-status-success-subtle` |
| `Warning` | `'warning'` | `--surface-status-warning-solid` | `--surface-status-warning-subtle` |
| `Error` | `'error'` | `--surface-status-error-solid` | `--surface-status-error-subtle` |

## Variables CSS

```scss
.pds-progress-bar {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-component-xs);
  width: 100%;

  &__labels {
    display: flex;
    justify-content: space-between;
    font-family: var(--text-body);
    font-size: var(--font-size-f-xs);
    color: var(--fg-neutral-secondary);
  }

  &__track {
    width: 100%;
    height: 8px;
    border-radius: var(--radius-component-sm);
    overflow: hidden;
    background: var(--surface-neutral-sunken);
  }

  &__fill {
    height: 100%;
    border-radius: var(--radius-component-sm);
    transition: width 300ms ease;
  }

  // Estados — track y fill
  &--primary &__track { background: var(--surface-brand-primary-subtle); }
  &--primary &__fill  { background: var(--surface-brand-primary-base); }

  &--success &__track { background: var(--surface-status-success-subtle); }
  &--success &__fill  { background: var(--surface-status-success-solid); }

  &--warning &__track { background: var(--surface-status-warning-subtle); }
  &--warning &__fill  { background: var(--surface-status-warning-solid); }

  &--error &__track   { background: var(--surface-status-error-subtle); }
  &--error &__fill    { background: var(--surface-status-error-solid); }
}
```

## API Angular

```typescript
@Component({ selector: 'pds-progress-bar', standalone: true })
export class PdsProgressBarComponent {
  readonly value = input.required<number>();   // 0–100
  readonly status = input<'primary' | 'success' | 'warning' | 'error'>('primary');
  readonly label = input<string | null>(null);
  readonly showValue = input<boolean>(false);
}
```

## Accesibilidad
- `role="progressbar"` con `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="100"`
- `aria-label` o `aria-labelledby` describiendo qué proceso se está midiendo
- El color no es el único indicador del estado — acompañar con ícono o texto
