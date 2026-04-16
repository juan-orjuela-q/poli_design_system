# Icon Component — Especificación

**Figma node:** `600:4380` · **Variantes:** 40

## Descripción
Estandariza el uso de iconografía dentro de la interfaz asegurando consistencia visual, escalabilidad y reutilización. Define tamaños normalizados y facilita el reemplazo rápido del ícono manteniendo estructura y alineación.

## Variantes → Props

### `Size` → `size`
| Figma | Angular | Token |
|---|---|---|
| `XS` | `'xs'` | `--icon-xs` (16px) |
| `SM` | `'sm'` | `--icon-sm` (20px) |
| `MD` | `'md'` | `--icon-md` (24px) |
| `LG` | `'lg'` | `--icon-lg` (32px) |
| `XL` | `'xl'` | `--icon-xl` (40px) |

### `Mode` → `mode`
| Figma | Angular |
|---|---|
| `Neutral` | `'neutral'` |
| `Brand` | `'brand'` |
| `Brand Ghost` | `'brand-ghost'` |
| `Brand Secondary` | `'brand-secondary'` |
| `Brand Subtle` | `'brand-subtle'` |
| `Error` | `'error'` |
| `Success` | `'success'` |
| `Warning` | `'warning'` |

## Variables CSS

```scss
.pds-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  // Tamaños
  &--xs { width: var(--icon-xs); height: var(--icon-xs); }
  &--sm { width: var(--icon-sm); height: var(--icon-sm); }
  &--md { width: var(--icon-md); height: var(--icon-md); }
  &--lg { width: var(--icon-lg); height: var(--icon-lg); }
  &--xl { width: var(--icon-xl); height: var(--icon-xl); }

  // Modos — color del SVG via currentColor
  &--neutral      { color: var(--fg-neutral-primary); }
  &--brand        { color: var(--fg-brand-primary); }
  &--brand-ghost  { color: var(--fg-brand-primary); background: var(--surface-brand-primary-soft); border-radius: var(--radius-component-sm); }
  &--brand-secondary { color: var(--fg-brand-primary); background: var(--surface-brand-secondary-muted); border-radius: var(--radius-component-sm); }
  &--brand-subtle { color: var(--fg-brand-primary); background: var(--surface-neutral-subtle); border-radius: var(--radius-component-sm); }
  &--error        { color: var(--fg-onColor-error); background: var(--surface-status-error-solid); border-radius: var(--radius-component-sm); }
  &--success      { color: var(--fg-onColor-brandPrimary); background: var(--surface-status-success-solid); border-radius: var(--radius-component-sm); }
  &--warning      { color: var(--fg-onColor-brandPrimary); background: var(--surface-status-warning-solid); border-radius: var(--radius-component-sm); }
}
```

## API Angular

```typescript
@Component({ selector: 'pds-icon', standalone: true })
export class PdsIconComponent {
  readonly name = input.required<string>();
  readonly size = input<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md');
  readonly mode = input<'neutral' | 'brand' | 'brand-ghost' | 'brand-secondary' | 'brand-subtle' | 'error' | 'success' | 'warning'>('neutral');
  readonly ariaLabel = input<string | null>(null);
  readonly ariaHidden = input<boolean>(true);
}
```

## Accesibilidad
- Íconos decorativos: `aria-hidden="true"` (default)
- Íconos informativos: `aria-label` con descripción del significado
- El color del SVG debe ser `currentColor` para respetar el modo

## Uso en otros componentes
Importado por: Button, Icon Button, CTA, Badge, Notification, Input Field, Breadcrumb Item, Tab Item, Sidenav Item, Avatar Button, A11y Button, Help Button.
