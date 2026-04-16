# Date Picker — Especificación

**Figma node:** `1043:8279` · **Variantes:** 2 (Closed / Open)

## Descripción
Permite seleccionar una fecha mediante campo de entrada y calendario desplegable. Evaluar con variante `Open`.

## Variables CSS

```scss
.pds-date-picker {
  // Campo base — misma estructura que Input Field
  &__wrapper {
    background: var(--action-primary-subtle-bg);
    border: var(--border-thin) solid var(--border-brand-secondary-solid);
    border-radius: var(--radius-component-md);
    min-height: var(--input-dimensions-min-height);
    padding: 0 var(--input-dimensions-padding-x);
    cursor: pointer;

    &--open { background: var(--surface-brand-primary-subtle); }
  }

  // Calendario
  &__calendar {
    position: absolute;
    top: calc(100% + 4px);
    background: var(--surface-neutral-modal);
    border: var(--border-thin) solid var(--border-neutral-subtle);
    border-radius: var(--radius-container-md);
    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
    z-index: 100;
    padding: var(--spacing-component-md);
  }

  // Header del calendario (mes/año + navegación)
  &__cal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--spacing-component-sm);
    font-family: var(--text-component);
    font-weight: var(--font-weight-w-semibold);
    color: var(--fg-brand-primary);
  }

  // Grid de días
  &__day {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-component-sm);
    cursor: pointer;
    font-size: var(--font-size-f-sm);
    color: var(--fg-neutral-primary);

    &:hover    { background: var(--action-primary-subtle-bg); color: var(--fg-brand-primary); }
    &--today   { border: var(--border-thin) solid var(--border-brand-primary-solid); }
    &--selected {
      background: var(--action-primary-solid-bg);
      color: var(--action-primary-solid-fg);
    }
    &--disabled { opacity: 0.4; cursor: not-allowed; }
    &--other-month { color: var(--fg-neutral-secondary); }
  }
}
```

## API Angular

```typescript
@Component({ selector: 'pds-date-picker', standalone: true })
export class PdsDatePickerComponent {
  readonly label = input.required<string>();
  readonly value = input<Date | null>(null);
  readonly placeholder = input<string>('DD/MM/AAAA');
  readonly minDate = input<Date | null>(null);
  readonly maxDate = input<Date | null>(null);
  readonly disabled = input<boolean>(false);
  readonly required = input<boolean>(false);
  readonly status = input<'default' | 'error'>('default');
  readonly helperText = input<string | null>(null);
  readonly dateChange = output<Date | null>();
}
```

## Accesibilidad
- El campo de texto: `aria-haspopup="dialog"`, `aria-expanded`
- El calendario: `role="dialog"`, `aria-label="Seleccionar fecha"`
- Días: `role="button"` con `aria-label` de la fecha completa
- Navegación por teclado entre días con flechas, Enter para seleccionar

---

# File Uploader Control — Especificación

**Figma node:** `733:7857` · **Variantes:** 5 (Type=Large recomendado)

## Descripción
Área de carga de archivos arrastrando o seleccionando desde el sistema. La variante Compact muestra un botón estándar. Usar variante **Large**.

## Variantes → Props

### `Type` → `type`
| Figma | Angular |
|---|---|
| `Large` | `'large'` |
| `Compact` | `'compact'` |

### `State` → CSS
Default, Hover, Active (arrastrando), Focus

## Variables CSS

```scss
.pds-file-uploader {
  // Variante Large
  &--large {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-component-sm);
    padding: var(--spacing-component-2xl);
    background: var(--surface-neutral-card);
    border: var(--border-thick) dashed var(--border-brand-primary-solid);
    border-radius: var(--radius-container-sm);
    cursor: pointer;
    transition: all 150ms ease;

    &:hover, &--hover {
      background: var(--action-primary-subtle-bgHover);
      border-color: var(--border-brand-secondary-solid);
    }

    &--active, &:focus-within {
      background: var(--action-primary-subtle-bg);
      border-color: var(--border-brand-secondary-solid);
      box-shadow: 0 0 0 var(--border-thin) var(--action-focusInner),
                  0 0 0 var(--border-thick) var(--action-primary-focusRing);
    }
  }

  &__icon  { color: var(--action-primary-ghost-fg); }
  &__label {
    font-family: var(--text-component);
    font-size: var(--font-size-f-base);
    font-weight: var(--font-weight-w-semibold);
    color: var(--fg-brand-primary);
    text-align: center;
  }
  &__hint {
    font-size: var(--font-size-f-xs);
    color: var(--fg-neutral-secondary);
  }
}
```

## API Angular

```typescript
@Component({ selector: 'pds-file-uploader', standalone: true })
export class PdsFileUploaderComponent {
  readonly type = input<'large' | 'compact'>('large');
  readonly accept = input<string>('*');
  readonly multiple = input<boolean>(false);
  readonly maxSize = input<number | null>(null); // bytes
  readonly disabled = input<boolean>(false);
  readonly label = input<string>('Arrastra un archivo o haz clic para cargar');
  readonly hint = input<string | null>(null);
  readonly filesSelected = output<File[]>();
  readonly error = output<string>();
}
```

## Accesibilidad
- Input `type="file"` nativo (oculto) activado por el área visual
- El área tiene `role="button"` con `aria-label`
- Zona de drop: `aria-dropeffect="copy"` cuando está activa
- Errores de tipo/tamaño: anunciados con `aria-live`

---

# Range — Especificación

**Figma node:** `783:6023` · **Variantes:** 2 (usar Type=Double)

## Descripción
Selección de uno o dos valores numéricos dentro de un intervalo. Usar en modo Double (rango mín-máx). Puede incluir inputs para edición manual.

## Variables CSS

```scss
.pds-range {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-component-sm);
  width: 100%;

  &__track-wrapper {
    position: relative;
    height: 6px;
    background: var(--surface-brand-primary-subtle);
    border-radius: var(--radius-pill);
  }

  &__track-fill {
    position: absolute;
    height: 100%;
    background: var(--surface-brand-primary-base);
    border-radius: var(--radius-pill);
  }

  &__thumb {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--surface-neutral-card);
    border: var(--border-thick) solid var(--border-brand-primary-solid);
    cursor: grab;
    box-shadow: 0 1px 4px rgba(0,0,0,0.16);

    &:active { cursor: grabbing; }
    &:focus-visible {
      outline: none;
      box-shadow: 0 0 0 var(--border-thin) var(--action-focusInner),
                  0 0 0 var(--border-thick) var(--action-primary-focusRing);
    }
  }

  &__inputs {
    display: flex;
    gap: var(--spacing-component-sm);
    align-items: center;
  }

  &__input-field {
    // Versión compacta del Input Field
    background: var(--action-primary-subtle-bg);
    border: var(--border-thin) solid var(--border-brand-secondary-solid);
    border-radius: var(--radius-component-sm);
    padding: var(--spacing-component-xs) var(--spacing-component-sm);
    font-size: var(--font-size-f-sm);
    color: var(--fg-brand-primary);
    width: 80px;
    text-align: center;
  }
}
```

## API Angular

```typescript
@Component({ selector: 'pds-range', standalone: true })
export class PdsRangeComponent {
  readonly type = input<'single' | 'double'>('double');
  readonly min = input<number>(0);
  readonly max = input<number>(100);
  readonly step = input<number>(1);
  readonly valueMin = input<number>(0);
  readonly valueMax = input<number>(100);
  readonly showInputs = input<boolean>(true);
  readonly disabled = input<boolean>(false);
  readonly label = input<string | null>(null);
  readonly rangeChange = output<{ min: number; max: number }>();
}
```

## Accesibilidad
- Cada thumb: `role="slider"` con `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `aria-valuetext`
- Navegable con flechas del teclado
- En Double: comunicar ambos valores en el `aria-label`
