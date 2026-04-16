# Checkbox+Text — Especificación

**Figma node:** `55:2119` · **Variantes:** 6

## Descripción
Control de selección múltiple. El usuario puede marcar una o varias opciones de forma independiente.

## Variantes → Estado interno

| Figma State | Angular | `aria-checked` |
|---|---|---|
| `Default` | Base | `false` |
| `Hover` | `:hover` | — |
| `Focus` | `:focus-visible` | — |
| `Selected` | `[checked]="true"` | `true` |
| `Indeterminate` | `[indeterminate]="true"` | `mixed` |
| `Disabled` | `[disabled]="true"` | — |

## Variables CSS

```scss
.pds-checkbox {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-component-sm);
  cursor: pointer;

  &__control {
    width: var(--input-dimensions-radio-checkbox-height);
    height: var(--input-dimensions-radio-checkbox-height);
    border-radius: var(--radius-checkbox);
    border: var(--border-thin) solid var(--border-neutral-default);
    background: var(--action-primary-ghost-bg);
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 150ms ease;

    &:hover { border-color: var(--border-brand-primary-solid); background: var(--action-primary-ghost-bgHover); }
  }

  &__label {
    font-family: var(--text-body);
    font-size: var(--font-size-f-base);
    color: var(--fg-brand-primary);
  }

  // Selected
  &--selected &__control {
    background: var(--action-primary-solid-bg);
    border-color: var(--border-brand-primary-solid);
    color: var(--action-primary-solid-fg);
  }

  // Disabled
  &--disabled {
    cursor: not-allowed;
    .pds-checkbox__control { background: var(--action-neutral-solid-bgDisabled); border-color: transparent; }
    .pds-checkbox__label   { color: var(--fg-neutral-disabled); }
  }

  &:focus-visible &__control, input:focus-visible + &__control {
    box-shadow: 0 0 0 var(--border-thin) var(--action-focusInner),
                0 0 0 var(--border-thick) var(--action-primary-focusRing);
  }
}
```

## API Angular

```typescript
@Component({ selector: 'pds-checkbox', standalone: true })
export class PdsCheckboxComponent {
  readonly checked = input<boolean>(false);
  readonly indeterminate = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly label = input.required<string>();
  readonly name = input<string | null>(null);
  readonly value = input<string | null>(null);
  readonly checkedChange = output<boolean>();
}
```

## Accesibilidad
- Usar `<input type="checkbox">` nativo (oculto visualmente) + control visual custom
- `aria-checked="mixed"` para estado indeterminate
- El label debe estar asociado con `for`/`id` o `aria-labelledby`

---

# Radio+Text — Especificación

**Figma node:** `55:2139` · **Variantes:** 5

## Descripción
Control de selección única dentro de un grupo. El usuario solo puede seleccionar una opción a la vez.

## Variables CSS

```scss
.pds-radio {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-component-sm);
  cursor: pointer;

  &__control {
    width: var(--input-dimensions-radio-checkbox-height);
    height: var(--input-dimensions-radio-checkbox-height);
    border-radius: 50%;
    border: var(--border-thin) solid var(--border-neutral-default);
    background: var(--action-primary-ghost-bg);
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 150ms ease;

    &:hover { border-color: var(--border-brand-primary-solid); background: var(--action-primary-ghost-bgHover); }

    // Punto interior cuando está seleccionado
    &::after {
      content: '';
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--action-primary-solid-fg);
      opacity: 0;
      transition: opacity 150ms ease;
    }
  }

  &--selected &__control {
    border-color: var(--border-brand-primary-solid);
    background: var(--action-primary-solid-bg);
    &::after { opacity: 1; }
  }

  &--disabled {
    cursor: not-allowed;
    .pds-radio__control { background: var(--action-neutral-solid-bgDisabled); }
    .pds-radio__label   { color: var(--fg-neutral-disabled); }
  }
}
```

## API Angular

```typescript
@Component({ selector: 'pds-radio', standalone: true })
export class PdsRadioComponent {
  readonly checked = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly label = input.required<string>();
  readonly name = input.required<string>();
  readonly value = input.required<string>();
  readonly checkedChange = output<string>();
}
```

---

# Toggle+Text — Especificación

**Figma node:** `813:9116` · **Variantes:** 2

## Descripción
Interruptor binario que activa o desactiva una función. A diferencia del Checkbox, comunica un cambio inmediato de estado (on/off).

## Variantes → Props

| Figma State | Angular |
|---|---|
| `Default` | `[checked]` controla on/off |
| `Disabled` | `[disabled]="true"` |

## Variables CSS

```scss
.pds-toggle {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-component-sm);
  cursor: pointer;

  &__track {
    position: relative;
    width: 44px;
    height: 24px;
    border-radius: var(--radius-pill);
    background: var(--action-neutral-solid-bgSubtle);
    transition: background 150ms ease;
  }

  &__thumb {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--action-neutral-solid-fg);
    transition: transform 150ms ease, background 150ms ease;
  }

  // On
  &--on &__track { background: var(--action-primary-solid-bg); }
  &--on &__thumb {
    transform: translateX(20px);
    background: var(--action-primary-solid-fg);
  }

  // Disabled
  &--disabled {
    cursor: not-allowed;
    opacity: var(--button-opacity-disabled);
  }

  &__label {
    font-family: var(--text-body);
    font-size: var(--font-size-f-base);
    color: var(--fg-neutral-primary);
  }
}
```

## API Angular

```typescript
@Component({ selector: 'pds-toggle', standalone: true })
export class PdsToggleComponent {
  readonly checked = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly label = input.required<string>();
  readonly labelPosition = input<'left' | 'right'>('right');
  readonly checkedChange = output<boolean>();
}
```

## Accesibilidad
- `role="switch"` con `aria-checked`
- El label debe estar siempre visible — no solo el toggle
- Activable con Space

---

# Input Field — Especificación

**Figma node:** `39:36094` · Componente único (agrupa Label + Field + Helper + Counter)

## Descripción
Campo de texto completo con label, campo de entrada, mensaje de ayuda y contador de caracteres. Building block de formularios.

## Estados → modo del campo

| Estado | Descripción |
|---|---|
| `Default` | Estado base |
| `Hover` | Foco visual leve |
| `Focus` | Campo activo |
| `Error` | Validación fallida |
| `Warning` | Advertencia |
| `Success` | Validación exitosa |
| `Loading` | Procesando |
| `Read Only` | Solo lectura |
| `Disabled` | Deshabilitado |

## Variables CSS

```scss
.pds-input-field {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-component-xs);

  &__label {
    font-family: var(--text-component);
    font-size: var(--font-size-f-sm);
    font-weight: var(--font-weight-w-semibold);
    color: var(--fg-brand-primary);
  }

  &__wrapper {
    position: relative;
    display: flex;
    align-items: center;
    min-height: var(--input-dimensions-min-height);
    padding: var(--input-dimensions-padding-y) var(--input-dimensions-padding-x);
    background: var(--action-primary-subtle-bg);
    border: var(--border-thin) solid var(--border-neutral-default);
    border-radius: var(--radius-component-md);
    transition: border-color 150ms ease, box-shadow 150ms ease;

    &:focus-within {
      border-color: var(--border-brand-secondary-solid);
      box-shadow: 0 0 0 var(--border-thin) var(--action-focusInner),
                  0 0 0 var(--border-thick) var(--action-primary-focusRing);
    }
  }

  &__input {
    flex: 1;
    border: none;
    background: transparent;
    font-family: var(--input-font-main);
    font-size: var(--font-size-f-base);
    color: var(--action-primary-ghost-fg);
    outline: none;

    &::placeholder { color: var(--fg-neutral-placeholder); }
  }

  &__helper {
    display: flex;
    justify-content: space-between;
    font-family: var(--text-body);
    font-size: var(--font-size-f-xs);
    color: var(--fg-neutral-secondary);
  }

  // Estados
  &--error   &__wrapper { border-color: var(--border-status-error-solid); }
  &--error   &__helper  { color: var(--fg-status-error); }
  &--success &__wrapper { border-color: var(--border-status-success-solid); }
  &--warning &__wrapper { border-color: var(--border-status-warning-solid); }

  &--disabled {
    opacity: var(--button-opacity-disabled);
    pointer-events: none;
  }
  &--readonly &__wrapper { background: var(--action-neutral-solid-bgSubtle); }
}
```

## API Angular

```typescript
@Component({ selector: 'pds-input-field', standalone: true })
export class PdsInputFieldComponent {
  readonly label = input.required<string>();
  readonly placeholder = input<string>('');
  readonly type = input<string>('text');
  readonly value = input<string>('');
  readonly status = input<'default' | 'error' | 'warning' | 'success' | 'loading'>('default');
  readonly helperText = input<string | null>(null);
  readonly maxLength = input<number | null>(null);
  readonly showCounter = input<boolean>(false);
  readonly required = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly readonly = input<boolean>(false);
  readonly iconStart = input<string | null>(null);
  readonly iconEnd = input<string | null>(null);
  readonly valueChange = output<string>();
}
```

## Accesibilidad
- `<label>` siempre visible asociado con `for`/`id`
- Asterisco de requerido: `aria-required="true"` en el input
- Mensaje de error: `aria-describedby` apuntando al helper
- El ícono de tooltip: `aria-label` descriptivo

---

# Textarea Field — Especificación

**Figma node:** `61:1084`

## Descripción
Captura texto libre de varias líneas. Misma lógica que Input Field pero con `<textarea>`.

## Variables CSS

```scss
.pds-textarea-field {
  // Misma estructura que Input Field

  &__wrapper {
    align-items: flex-start; // Override — textarea no centra verticalmente
    padding: var(--input-dimensions-textarea-padding-y) var(--input-dimensions-padding-x);
    min-height: var(--input-dimensions-textarea-min-height);
  }

  &__input {
    resize: vertical;
    min-height: var(--input-dimensions-textarea-min-height);
  }
}
```

## API Angular

```typescript
@Component({ selector: 'pds-textarea-field', standalone: true })
export class PdsTextareaFieldComponent {
  readonly label = input.required<string>();
  readonly placeholder = input<string>('');
  readonly value = input<string>('');
  readonly status = input<'default' | 'error' | 'warning' | 'success'>('default');
  readonly helperText = input<string | null>(null);
  readonly maxLength = input<number | null>(null);
  readonly showCounter = input<boolean>(false);
  readonly rows = input<number>(3);
  readonly required = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly readonly = input<boolean>(false);
  readonly valueChange = output<string>();
}
```

---

# Select Field — Especificación

**Figma node:** `674:5637` · **Variantes:** 2 (Closed / Open)

## Descripción
Campo de selección con lista desplegable. Building block de formularios para opciones predefinidas.

## Variables CSS

```scss
.pds-select-field {
  // Misma estructura base que Input Field

  &__wrapper {
    cursor: pointer;
    background: var(--action-primary-subtle-bg);
    border: var(--border-thin) solid var(--border-neutral-default);

    &--open {
      border-color: var(--border-brand-secondary-solid);
      background: var(--surface-brand-primary-subtle);
    }
  }

  &__chevron {
    color: var(--action-primary-ghost-fg);
    transition: transform 150ms ease;
    &--open { transform: rotate(180deg); }
  }

  &__dropdown {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    right: 0;
    background: var(--surface-neutral-modal);
    border: var(--border-thin) solid var(--border-neutral-default);
    border-radius: var(--radius-component-md);
    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
    z-index: 100;
    max-height: 240px;
    overflow-y: auto;
  }

  &__option {
    padding: var(--spacing-component-sm) var(--spacing-component-md);
    cursor: pointer;
    font-family: var(--text-body);
    font-size: var(--font-size-f-base);
    color: var(--fg-neutral-primary);

    &:hover    { background: var(--action-primary-subtle-bg); }
    &--selected {
      background: var(--action-primary-solid-bg);
      color: var(--fg-onColor-brandPrimary);
    }
  }
}
```

## API Angular

```typescript
@Component({ selector: 'pds-select-field', standalone: true })
export class PdsSelectFieldComponent {
  readonly label = input.required<string>();
  readonly options = input.required<{ value: string; label: string }[]>();
  readonly value = input<string | null>(null);
  readonly placeholder = input<string>('Selecciona una opción');
  readonly status = input<'default' | 'error' | 'warning' | 'success'>('default');
  readonly helperText = input<string | null>(null);
  readonly disabled = input<boolean>(false);
  readonly required = input<boolean>(false);
  readonly valueChange = output<string>();
}
```

## Accesibilidad
- `role="combobox"` con `aria-expanded`, `aria-haspopup="listbox"`
- La lista: `role="listbox"`
- Opciones: `role="option"` con `aria-selected`
- Navegación con flechas, Enter para seleccionar, Escape para cerrar
