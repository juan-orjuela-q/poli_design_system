# Notification — Especificación

**Figma node:** `86:1447` · **Variantes:** 15

## Descripción
Retroalimentación del sistema que comunica el resultado de una acción o el estado de un proceso. Puede mostrarse flotante (Snackbar, Toast) o integrado en el contenido (Inline).

## Variantes → Props

### `Type` → `type`
| Figma | Angular | Comportamiento |
|---|---|---|
| `Snackbar` | `'snackbar'` | Flotante inferior, auto-dismiss |
| `Toast` | `'toast'` | Flotante superior derecha, auto-dismiss |
| `Inline` | `'inline'` | Integrado en el flujo del contenido |

### `Status` → `status`
| Figma | Angular | Fondo | Borde |
|---|---|---|---|
| `Default` | `'default'` | `--surface-brand-primary-base` | `--border-brand-primary-solid` |
| `Success` | `'success'` | `--surface-status-success-subtle` | `--border-status-success-solid` |
| `Warning` | `'warning'` | `--surface-status-warning-subtle` | `--border-status-warning-solid` |
| `Error` | `'error'` | `--surface-status-error-subtle` | `--border-status-error-solid` |
| `Info` | `'info'` | `--surface-status-info-subtle` | `--border-status-info-solid` |

## Variables CSS

```scss
.pds-notification {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-component-md);
  padding: var(--spacing-component-md) var(--spacing-component-lg);
  border-radius: var(--radius-container-sm);
  border-left: var(--border-bold) solid;

  &__icon { flex-shrink: 0; }
  &__content { flex: 1; }
  &__title {
    font-family: var(--text-component);
    font-size: var(--font-size-component-notification-title);
    font-weight: var(--font-weight-w-semibold);
  }
  &__body {
    font-family: var(--text-body);
    font-size: var(--font-size-f-sm);
    color: var(--fg-neutral-secondary);
  }
  &__close { flex-shrink: 0; }

  // Estados
  &--default {
    background: var(--surface-brand-primary-soft);
    border-color: var(--border-brand-primary-solid);
    color: var(--fg-brand-primary);
  }
  &--success {
    background: var(--surface-status-success-subtle);
    border-color: var(--border-status-success-solid);
  }
  &--warning {
    background: var(--surface-status-warning-subtle);
    border-color: var(--border-status-warning-solid);
  }
  &--error {
    background: var(--surface-status-error-subtle);
    border-color: var(--border-status-error-solid);
  }
  &--info {
    background: var(--surface-status-info-subtle);
    border-color: var(--border-status-info-solid);
  }

  // Flotantes
  &--snackbar, &--toast {
    position: fixed;
    z-index: 1100;
    box-shadow: 0 4px 16px rgba(0,0,0,0.16);
    min-width: 320px;
    max-width: 480px;
  }
  &--snackbar { bottom: var(--spacing-component-2xl); left: 50%; transform: translateX(-50%); }
  &--toast    { top: var(--spacing-component-2xl); right: var(--spacing-component-2xl); }
}
```

## API Angular

```typescript
@Component({ selector: 'pds-notification', standalone: true })
export class PdsNotificationComponent {
  readonly type = input<'snackbar' | 'toast' | 'inline'>('inline');
  readonly status = input<'default' | 'success' | 'warning' | 'error' | 'info'>('default');
  readonly title = input<string | null>(null);
  readonly dismissible = input<boolean>(true);
  readonly autoDismiss = input<number | null>(5000); // ms, null = no auto
  readonly dismissed = output<void>();
}
```

## Accesibilidad
- `role="alert"` para mensajes de error urgentes
- `role="status"` para confirmaciones y mensajes informativos
- `aria-live="polite"` para mensajes no urgentes
- El botón de cerrar necesita `aria-label="Cerrar notificación"`
- No depender solo del color para comunicar el tipo
