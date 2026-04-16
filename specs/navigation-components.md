# Breadcrumb — Especificación

**Figma node:** `950:2768` · Building block: Breadcrumb Item (`567:5056`)

## Descripción
Muestra la ruta de navegación dentro de una jerarquía. Ayuda al usuario a entender dónde está y volver a niveles anteriores sin depender del botón "atrás".

## Variables CSS

```scss
.pds-breadcrumb {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--spacing-component-xs);
  list-style: none;
  margin: 0;
  padding: 0;

  &__item {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-component-xs);
    font-family: var(--text-body);
    font-size: var(--font-size-f-sm);
  }

  &__link {
    color: var(--action-primary-ghost-fg);
    text-decoration: none;
    padding: var(--spacing-component-xxs) var(--spacing-component-xs);
    border-radius: var(--radius-component-sm);
    transition: background 150ms ease;

    &:hover { background: var(--action-primary-ghost-bgHover); }
    &:focus-visible {
      outline: none;
      box-shadow: 0 0 0 var(--border-thin) var(--action-focusInner),
                  0 0 0 var(--border-thick) var(--action-primary-focusRing);
    }
  }

  &__current {
    color: var(--fg-brand-primary);
    font-weight: var(--font-weight-w-semibold);
  }

  &__separator {
    color: var(--fg-neutral-secondary);
  }
}
```

## API Angular

```typescript
@Component({ selector: 'pds-breadcrumb', standalone: true })
export class PdsBreadcrumbComponent {
  readonly items = input.required<{ label: string; href?: string }[]>();
}
```

## Accesibilidad
- `<nav aria-label="Ruta de navegación">` como contenedor
- Lista `<ol>` (orden importa)
- Página actual: `aria-current="page"`
- El separador: `aria-hidden="true"`

---

# Tabs / Tab Item — Especificación

**Figma nodes:** Tabs `857:14704` · Tab Item `299:2963`

## Descripción
Organiza contenido relacionado en secciones paralelas para cambiar entre vistas del mismo contexto.

## Variantes Tab Item → Estado

| Figma | Angular |
|---|---|
| `Default` | Base |
| `Hover` | `:hover` |
| `Active` | `[active]="true"` |
| `Focus` | `:focus-visible` |
| `Disabled` | `[disabled]="true"` |

## Variables CSS

```scss
.pds-tabs {
  display: flex;
  flex-direction: column;

  &__list {
    display: flex;
    border-bottom: var(--border-thin) solid var(--border-neutral-default);
    gap: 0;
  }
}

.pds-tab-item {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-component-xs);
  padding: var(--spacing-component-sm) var(--spacing-component-lg);
  border: none;
  background: transparent;
  cursor: pointer;
  position: relative;
  font-family: var(--text-component);
  font-size: var(--font-size-component-tab);
  font-weight: var(--font-weight-w-medium);
  color: var(--fg-brand-primary);
  transition: background 150ms ease;

  // Indicador activo
  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: var(--border-thick);
    background: transparent;
    transition: background 150ms ease;
  }

  &:hover { background: var(--action-primary-ghost-bgHover); }

  &--active {
    color: var(--fg-brand-primary);
    font-weight: var(--font-weight-w-semibold);
    &::after { background: var(--border-brand-primary-solid); }
  }

  &--disabled {
    color: var(--action-neutral-ghost-fgDisabled);
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 var(--border-thin) var(--action-focusInner),
                0 0 0 var(--border-thick) var(--action-primary-focusRing);
  }
}
```

## API Angular

```typescript
@Component({ selector: 'pds-tabs', standalone: true })
export class PdsTabsComponent {
  readonly tabs = input.required<{ id: string; label: string; disabled?: boolean }[]>();
  readonly activeTab = input<string>('');
  readonly tabChange = output<string>();
}
```

## Accesibilidad
- Lista de tabs: `role="tablist"`
- Cada tab: `role="tab"` con `aria-selected`, `aria-controls`
- Panel: `role="tabpanel"` con `aria-labelledby`
- Navegación entre tabs con flechas izquierda/derecha

---

# Accordion — Especificación

**Figma node:** `91:1596` · Building block: Accordion Item `914:9534`

## Descripción
Organiza contenido en secciones expandibles y colapsables. Reduce la carga visual mostrando información secundaria solo cuando se necesita.

## Variantes Accordion Item

| Figma State | Angular |
|---|---|
| `Closed` | `[expanded]="false"` |
| `Open` | `[expanded]="true"` |
| `Hover` | `:hover` |
| `Focus` | `:focus-visible` |
| `Disabled` | `[disabled]="true"` |

## Variables CSS

```scss
.pds-accordion {
  display: flex;
  flex-direction: column;
  gap: 0;
  background: var(--action-primary-subtle-bg);
  border-radius: var(--radius-container-sm);
  overflow: hidden;
}

.pds-accordion-item {
  border-bottom: var(--border-thin) solid var(--border-brand-primary-solid);

  &:last-child { border-bottom: none; }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing-component-lg);
    background: var(--surface-neutral-card);
    cursor: pointer;
    transition: background 150ms ease;

    &:hover { background: var(--action-primary-subtle-bgHover); }
  }

  &__title {
    font-family: var(--text-component);
    font-size: var(--font-size-f-base);
    font-weight: var(--font-weight-w-semibold);
    color: var(--fg-brand-primary);
  }

  &__chevron {
    color: var(--fg-brand-primary);
    transition: transform 200ms ease;
    &--open { transform: rotate(180deg); }
  }

  &__body {
    padding: var(--spacing-component-lg);
    font-family: var(--text-body);
    font-size: var(--font-size-f-base);
    color: var(--fg-neutral-primary);
    display: none;
    &--open { display: block; }
  }

  &--disabled &__header {
    background: var(--action-neutral-solid-bgDisabled);
    cursor: not-allowed;
    .pds-accordion-item__title { color: var(--fg-neutral-disabled); }
  }

  &__header:focus-visible {
    outline: none;
    box-shadow: inset 0 0 0 var(--border-thick) var(--action-primary-focusRing);
  }
}
```

## API Angular

```typescript
@Component({ selector: 'pds-accordion', standalone: true })
export class PdsAccordionComponent {
  readonly items = input.required<{ id: string; title: string; disabled?: boolean }[]>();
  readonly multiple = input<boolean>(false);
  readonly expandedIds = input<string[]>([]);
  readonly expandedChange = output<string[]>();
}
```

## Accesibilidad
- Header: `<button>` con `aria-expanded`, `aria-controls`
- Panel: `id` correspondiente, `role="region"`, `aria-labelledby`

---

# Code Block — Especificación

**Figma node:** `778:3560`

## Descripción
Presenta fragmentos de código en un contenedor estructurado. Puede incluir título, numeración de líneas y botón de copiado.

## Variables CSS

```scss
.pds-code-block {
  background: var(--surface-neutral-inverse);
  border-radius: var(--radius-container-sm);
  border: var(--border-thin) solid var(--border-neutral-subtle);
  overflow: hidden;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing-component-sm) var(--spacing-component-md);
    background: var(--surface-brand-primary-base);
    color: var(--fg-onColor-inverse);
    font-family: var(--text-component);
    font-size: var(--font-size-f-xs);
  }

  &__copy {
    // Icon Button ghost sobre fondo oscuro
    color: var(--fg-onColor-inverse);
    background: transparent;
    border: none;
    cursor: pointer;
    padding: var(--spacing-component-xxs);
    border-radius: var(--radius-component-sm);

    &:hover { background: rgba(255,255,255,0.1); }
  }

  &__body {
    padding: var(--spacing-component-md);
    overflow-x: auto;
  }

  &__code {
    font-family: var(--text-code);
    font-size: var(--font-size-f-sm);
    color: var(--fg-neutral-inverse);
    line-height: var(--line-height-lh-base);
    white-space: pre;
  }

  // Inline variant
  &--inline {
    display: inline;
    background: var(--action-primary-subtle-bg);
    border-radius: var(--radius-component-sm);
    padding: 2px var(--spacing-component-xs);
    .pds-code-block__code {
      color: var(--action-primary-subtle-fgStrong);
      font-size: 0.9em;
    }
  }
}
```

## API Angular

```typescript
@Component({ selector: 'pds-code-block', standalone: true })
export class PdsCodeBlockComponent {
  readonly code = input.required<string>();
  readonly language = input<string>('plaintext');
  readonly title = input<string | null>(null);
  readonly showCopy = input<boolean>(true);
  readonly showLineNumbers = input<boolean>(false);
  readonly inline = input<boolean>(false);
}
```

---

# Selectable Card — Especificación

**Figma node:** `766:5587` · **Variantes:** 5

## Descripción
Tarjeta seleccionable dentro de un conjunto de opciones. Actúa como un control de radio o checkbox pero con mayor área visual.

## Variantes → Estado

| Figma | Angular |
|---|---|
| `Default` | Base |
| `Hover` | `:hover` |
| `Active` | `[selected]="true"` |
| `Focus` | `:focus-visible` |
| `Pressed` | `:active` |

## Variables CSS

```scss
.pds-selectable-card {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-component-sm);
  padding: var(--spacing-component-lg);
  background: var(--action-primary-ghost-bg);
  border: var(--border-thin) solid var(--border-neutral-default);
  border-radius: var(--radius-container-sm);
  cursor: pointer;
  transition: all 150ms ease;
  user-select: none;

  &:hover {
    background: var(--action-primary-ghost-bgHover);
    border-color: var(--border-brand-primary-solid);
  }

  &--selected {
    background: var(--action-neutral-solid-bgSubtle);
    border-color: var(--border-brand-primary-solid);
    border-width: var(--border-thick);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 var(--border-thin) var(--action-focusInner),
                0 0 0 var(--border-thick) var(--action-primary-focusRing);
  }

  &__title {
    font-family: var(--text-component);
    font-weight: var(--font-weight-w-semibold);
    color: var(--fg-brand-primary);
  }

  &__description {
    font-family: var(--text-body);
    font-size: var(--font-size-f-sm);
    color: var(--fg-neutral-secondary);
  }
}
```

## API Angular

```typescript
@Component({ selector: 'pds-selectable-card', standalone: true })
export class PdsSelectableCardComponent {
  readonly selected = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly value = input.required<string>();
  readonly selectedChange = output<string>();
}
```

## Accesibilidad
- `role="radio"` o `role="checkbox"` según comportamiento del grupo
- `aria-checked` para indicar selección
- Activable con Space/Enter

---

# Paginator — Especificación

**Figma node:** `701:8889` (Device=Desktop)

## Descripción
Navegación entre páginas de contenido paginado. Permite ir a páginas específicas y controlar el número de resultados por página.

## Variables CSS

```scss
.pds-paginator {
  display: flex;
  align-items: center;
  gap: var(--spacing-component-sm);
  font-family: var(--text-body);
  font-size: var(--font-size-f-sm);

  &__control {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--button-dimensions-height-sm);
    height: var(--button-dimensions-height-sm);
    border-radius: var(--radius-component-sm);
    border: var(--border-thin) solid var(--border-neutral-subtle);
    background: transparent;
    color: var(--action-primary-ghost-fg);
    cursor: pointer;
    transition: all 150ms ease;

    &:hover:not(:disabled) {
      background: var(--action-primary-ghost-bgHover);
      border-color: var(--border-brand-primary-solid);
    }

    &--active {
      background: var(--action-primary-solid-bg);
      color: var(--action-primary-solid-fg);
      border-color: var(--border-brand-primary-solid);
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    &:focus-visible {
      outline: none;
      box-shadow: 0 0 0 var(--border-thin) var(--action-focusInner),
                  0 0 0 var(--border-thick) var(--action-primary-focusRing);
    }
  }

  &__info {
    color: var(--fg-neutral-secondary);
    white-space: nowrap;
  }

  &__per-page {
    // Versión compacta de Select Field
    font-size: var(--font-size-f-xs);
  }
}
```

## API Angular

```typescript
@Component({ selector: 'pds-paginator', standalone: true })
export class PdsPaginatorComponent {
  readonly totalItems = input.required<number>();
  readonly pageSize = input<number>(10);
  readonly currentPage = input<number>(1);
  readonly pageSizeOptions = input<number[]>([10, 25, 50]);
  readonly showPageSizeSelector = input<boolean>(true);
  readonly pageChange = output<number>();
  readonly pageSizeChange = output<number>();
}
```

## Accesibilidad
- `<nav aria-label="Paginación">` como contenedor
- Botón activo: `aria-current="page"`
- Botones prev/next: `aria-label="Página anterior"`, `aria-label="Página siguiente"`
