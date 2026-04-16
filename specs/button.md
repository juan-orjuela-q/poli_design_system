# Button — Especificación de componente

**Figma node:** `37:20705`
**Página Figma:** Button - 🟠 To Doc
**Variantes totales:** 90

---

## Descripción

Componente de acción principal del sistema. Disponible en 3 tamaños, 8 tipos visuales y 5 estados. Es el componente más usado del DS — todos los demás componentes que contienen acciones (Dialog, Modal, Form) lo importan internamente.

---

## Variantes de Figma → Props de Angular

### `Type` → `variant`

| Figma | Angular | Descripción |
|---|---|---|
| `Primary` | `'primary'` | Acción principal. Fondo azul sólido. |
| `Secondary` | `'secondary'` | Acción secundaria. Fondo azul secundario sólido. |
| `Outline` | `'outline'` | Acción alternativa. Sin fondo, con borde. |
| `Ghost` | `'ghost'` | Acción de bajo énfasis. Sin fondo ni borde visible. |
| `Subtle` | `'subtle'` | Acción suave. Fondo azul muy claro. |
| `Destructive` | `'destructive'` | Acción destructiva. Fondo magenta/error sólido. |
| `Destructive Out` | `'destructive-outline'` | Acción destructiva sin fondo. |
| `Tertiary` | `'tertiary'` | Acción terciaria de mínimo énfasis. |

### `Size` → `size`

| Figma | Angular | Alto | Padding X | Font size |
|---|---|---|---|---|
| `SM` | `'sm'` | `--button-dimensions-height-sm` (32px) | `--button-dimensions-padding-x-sm` (16px) | `--font-size-f-sm` |
| `Default` | `'md'` | `--button-dimensions-height` (48px) | `--button-dimensions-padding-x` (20px) | `--font-size-f-base` |
| `LG` | `'lg'` | `--button-dimensions-height-lg` (56px) | `--button-dimensions-padding-x-lg` (28px) | `--font-size-f-lg` |

### `State` → manejado internamente + `disabled` input

| Figma | Angular |
|---|---|
| `Default` | Estado base |
| `Hover` | `:hover` CSS |
| `Pressed` | `:active` CSS |
| `Focus` | `:focus-visible` CSS |
| `Disabled` | `[disabled]="true"` input |

### `Radius` → `rounded`

| Figma | Angular | Valor |
|---|---|---|
| `Rectangle` | `rounded="rectangle"` | `--radius-component-md` (10px) |
| `Pill` | `rounded="pill"` | `--radius-pill` (99999px) |

---

## Variables CSS aplicadas

```scss
.pds-button {
  // Estructura
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-component-sm);          // 8px — gap ícono/texto

  // Dimensiones (por size)
  height: var(--button-dimensions-height);   // md: 48px
  min-width: var(--button-dimensions-min-width); // 72px
  padding: 0 var(--button-dimensions-padding-x); // md: 20px

  // Tipografía
  font-family: var(--text-component);        // Poppins
  font-size: var(--font-size-f-base);        // 1rem
  font-weight: var(--font-weight-w-semibold);// 600
  line-height: var(--line-height-lh-none);   // 1

  // Radio
  border-radius: var(--radius-pill);         // variante pill (default)

  // Transición
  transition: background 150ms ease, color 150ms ease;

  // Estado disabled
  &:disabled, &[aria-disabled="true"] {
    opacity: var(--button-opacity-disabled); // 0.8
    cursor: not-allowed;
    pointer-events: none;
  }
}

// ── Variante Primary ──────────────────────────────────────
.pds-button--primary {
  background: var(--action-primary-solid-bg);       // #0f385a
  color: var(--action-primary-solid-fg);            // #ffffff
  border: none;

  &:hover  { background: var(--action-primary-solid-bgHover); }
  &:active { background: var(--action-primary-solid-bgPressed); }
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 var(--border-thin) var(--action-focusInner),
                0 0 0 var(--border-thick) var(--action-primary-focusRing);
  }
}

// ── Variante Secondary ────────────────────────────────────
.pds-button--secondary {
  background: var(--action-secondary-solid-bg);
  color: var(--action-secondary-solid-fg);
  border: var(--border-thin) solid var(--action-secondary-solid-border);

  &:hover  { background: var(--action-secondary-solid-bgHover); }
  &:active { background: var(--action-secondary-solid-bgPressed); }
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 var(--border-thin) var(--action-focusInner),
                0 0 0 var(--border-thick) var(--action-secondary-focusRing);
  }
}

// ── Variante Outline ──────────────────────────────────────
.pds-button--outline {
  background: var(--action-primary-ghost-bg);       // transparente
  color: var(--action-primary-ghost-fg);
  border: var(--border-thin) solid var(--action-primary-ghost-fg);

  &:hover  { background: var(--action-primary-ghost-bgHover); }
  &:active { background: var(--action-primary-ghost-bgPressed); }
}

// ── Variante Ghost ────────────────────────────────────────
.pds-button--ghost {
  background: transparent;
  color: var(--action-primary-ghost-fg);
  border: none;

  &:hover  { background: var(--action-primary-ghost-bgHover); }
  &:active { background: var(--action-primary-ghost-bgPressed); }
}

// ── Variante Subtle ───────────────────────────────────────
.pds-button--subtle {
  background: var(--action-primary-subtle-bg);
  color: var(--action-primary-subtle-fg);
  border: none;

  &:hover  { background: var(--action-primary-subtle-bgHover); }
  &:active { background: var(--action-primary-subtle-bgPressed); }
}

// ── Variante Destructive ──────────────────────────────────
.pds-button--destructive {
  background: var(--action-status-error-solid-bg);
  color: var(--action-status-error-solid-fg);
  border: none;

  &:hover  { background: var(--action-status-error-solid-bgHover); }
  &:active { background: var(--action-status-error-solid-bgPressed); }
  &:focus-visible {
    box-shadow: 0 0 0 var(--border-thin) var(--action-focusInner),
                0 0 0 var(--border-thick) var(--action-status-error-focusRing);
  }
}

// ── Size SM ───────────────────────────────────────────────
.pds-button--sm {
  height: var(--button-dimensions-height-sm);        // 32px
  padding: 0 var(--button-dimensions-padding-x-sm);  // 16px
  font-size: var(--font-size-f-sm);                  // 0.875rem
}

// ── Size LG ───────────────────────────────────────────────
.pds-button--lg {
  height: var(--button-dimensions-height-lg);        // 56px
  padding: 0 var(--button-dimensions-padding-x-lg);  // 28px
  font-size: var(--font-size-f-lg);                  // 1.25rem
}

// ── Radius Rectangle ─────────────────────────────────────
.pds-button--rectangle {
  border-radius: var(--radius-component-md);         // 10px
}
```

---

## API del componente Angular

```typescript
@Component({
  selector: 'pds-button',
  standalone: true,
})
export class PdsButtonComponent {
  // Variante visual
  readonly variant = input<
    'primary' | 'secondary' | 'outline' | 'ghost' |
    'subtle' | 'destructive' | 'destructive-outline' | 'tertiary'
  >('primary');

  // Tamaño
  readonly size = input<'sm' | 'md' | 'lg'>('md');

  // Forma del radio
  readonly rounded = input<'pill' | 'rectangle'>('pill');

  // Estado
  readonly disabled = input<boolean>(false);

  // Ícono opcional (nombre del ícono del sistema)
  readonly iconStart = input<string | null>(null);
  readonly iconEnd = input<string | null>(null);

  // Para uso como submit en forms
  readonly type = input<'button' | 'submit' | 'reset'>('button');
}
```

### Template HTML

```html
<button
  [type]="type()"
  [disabled]="disabled()"
  [attr.aria-disabled]="disabled()"
  [class]="buttonClasses()">
  
  @if (iconStart()) {
    <pds-icon [name]="iconStart()" size="sm" />
  }
  
  <ng-content />
  
  @if (iconEnd()) {
    <pds-icon [name]="iconEnd()" size="sm" />
  }
</button>
```

### Clases computadas

```typescript
protected buttonClasses = computed(() => ({
  'pds-button': true,
  [`pds-button--${this.variant()}`]: true,
  [`pds-button--${this.size()}`]: this.size() !== 'md',
  [`pds-button--${this.rounded()}`]: this.rounded() !== 'pill',
  'pds-button--disabled': this.disabled(),
}));
```

---

## Accesibilidad

- Usar elemento `<button>` nativo — no `<div>` ni `<span>`
- El atributo `disabled` nativo maneja automáticamente `aria-disabled`, `tabindex` y eventos
- Focus visible con doble anillo (box-shadow): anillo interior blanco + anillo exterior de color de variante
- El texto del botón debe ser descriptivo — evitar "Click aquí" o "Ver más"
- Si el botón solo tiene ícono (sin texto), agregar `aria-label`

---

## Contraste vs superficie (auditoría)

| Variante | Canvas | Subtle | Sunken | Primary Solid |
|---|---|---|---|---|
| Primary | MAX ✓ | MAX ✓ | MAX ✓ | NO ✗ |
| Secondary | RST | RST | RST | TXT ✓ |
| Outline/Ghost | NO — depende del borde/texto | NO | RST | MAX ✓ |
| Subtle | NO — depende del texto | NO | NO | MAX ✓ |
| Destructive | TXT ✓ | UI | UI | RST |

> **Nota:** Ghost y Subtle son válidos sobre fondos claros siempre que el texto tenga contraste suficiente. No usar Primary sobre Primary Solid.

---

## Uso en otros componentes

Button es importado internamente por: Dialog, Modal, Notification, Date Picker, File Uploader, Stepper Footer.

---

## Casos de uso

```html
<!-- Acción principal -->
<pds-button variant="primary">Guardar</pds-button>

<!-- Con ícono al inicio -->
<pds-button variant="primary" iconStart="save">Guardar</pds-button>

<!-- Tamaño pequeño para toolbars -->
<pds-button variant="outline" size="sm">Editar</pds-button>

<!-- Acción destructiva -->
<pds-button variant="destructive">Eliminar registro</pds-button>

<!-- Deshabilitado -->
<pds-button variant="primary" [disabled]="true">Guardar</pds-button>

<!-- Como submit -->
<pds-button variant="primary" type="submit">Enviar formulario</pds-button>

<!-- Radio rectangular (para contextos específicos) -->
<pds-button variant="primary" rounded="rectangle">Aceptar</pds-button>
```
