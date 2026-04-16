# Stepper — Especificación

**Figma node:** `3136:1297` · Building block: Stepper Marker `962:2184`

## Descripción
Guía al usuario a través de un proceso de varios pasos en secuencia. Disponible en orientación horizontal y vertical. Anida Stepper Marker y Stepper Footer.

## Variantes Stepper Marker

| Layout | State | Descripción |
|---|---|---|
| `Horizontal` / `Vertical` | `Current` | Paso activo en curso |
| `Horizontal` / `Vertical` | `Completed` | Paso completado |
| `Horizontal` / `Vertical` | `Disabled` | Paso no disponible |

## Variables CSS

```scss
.pds-stepper {
  display: flex;

  &--horizontal { flex-direction: row; align-items: flex-start; }
  &--vertical   { flex-direction: column; }
}

.pds-stepper-marker {
  display: flex;
  align-items: center;
  gap: var(--spacing-component-sm);

  &__circle {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--text-component);
    font-weight: var(--font-weight-w-semibold);
    font-size: var(--font-size-f-sm);
    flex-shrink: 0;
    transition: all 150ms ease;
  }

  &__label {
    font-family: var(--text-component);
    font-size: var(--font-size-f-sm);
    font-weight: var(--font-weight-w-medium);
    color: var(--fg-neutral-secondary);
  }

  &__connector {
    flex: 1;
    height: var(--border-thin);
    background: var(--border-neutral-subtle);
  }

  // Current
  &--current &__circle {
    background: var(--surface-brand-primary-base);
    color: var(--fg-onColor-brandPrimary);
    border: var(--border-thick) solid var(--border-brand-primary-solid);
  }
  &--current &__label {
    color: var(--fg-brand-primary);
    font-weight: var(--font-weight-w-semibold);
  }

  // Completed
  &--completed &__circle {
    background: var(--surface-brand-secondary-muted);
    color: var(--fg-onColor-brandPrimary);
  }

  // Disabled
  &--disabled &__circle {
    background: var(--action-neutral-subtle-bg);
    color: var(--action-neutral-subtle-fgDisabled);
  }
}

.pds-stepper-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--spacing-component-sm);
  padding-top: var(--spacing-component-lg);
  border-top: var(--border-thin) solid var(--border-neutral-subtle);
}
```

## API Angular

```typescript
@Component({ selector: 'pds-stepper', standalone: true })
export class PdsStepperComponent {
  readonly steps = input.required<{ id: string; label: string; sublabel?: string }[]>();
  readonly currentStep = input<number>(0);
  readonly orientation = input<'horizontal' | 'vertical'>('horizontal');
  readonly stepChange = output<number>();
}
```

## Accesibilidad
- `role="group"` con `aria-label="Pasos del proceso"`
- Paso activo: `aria-current="step"`
- Pasos completados: `aria-label` con "Completado"
- No bloquear navegación entre pasos completados con teclado

---

# Stepper Compact — Especificación

**Figma node:** `3136:1787` · Building block: Stepper Compact Marker `783:15075`

## Descripción
Versión compacta del Stepper. Indicadores pequeños sin etiquetas de texto. Útil en espacios reducidos o como indicador de progreso secundario.

## Variantes Marker

| State | Fondo |
|---|---|
| `Current` | `--surface-brand-secondary-solid` |
| `Default` | `--action-neutral-solid-bg` |

## Variables CSS

```scss
.pds-stepper-compact {
  display: flex;
  align-items: center;
  gap: var(--spacing-component-xs);

  &__marker {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--action-neutral-solid-bg);
    transition: all 150ms ease;

    &--current {
      width: 24px;
      border-radius: var(--radius-pill);
      background: var(--surface-brand-secondary-solid);
    }
  }

  &__info {
    font-family: var(--text-body);
    font-size: var(--font-size-f-xs);
    color: var(--fg-neutral-secondary);
    margin-left: var(--spacing-component-xs);
  }
}
```

## API Angular

```typescript
@Component({ selector: 'pds-stepper-compact', standalone: true })
export class PdsStepperCompactComponent {
  readonly totalSteps = input.required<number>();
  readonly currentStep = input<number>(0);
  readonly showInfo = input<boolean>(true); // "Paso 2 de 5"
}
```

---

# Avatar Button — Especificación

**Figma node:** `698:8892` · **Variantes:** 4

## Descripción
Representa visualmente a una persona, cuenta o perfil. Puede mostrarse como imagen, inicial/letra o ícono. Facilita reconocimiento rápido y orientación en flujos de usuario.

## Variantes → Estado (CSS)
Default, Hover, Focus, Pressed

## Variables CSS

```scss
.pds-avatar-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--size-md);      // 48px
  height: var(--size-md);
  border-radius: var(--radius-pill);
  border: var(--border-thick) solid var(--border-neutral-transparent);
  background: var(--action-primary-subtle-bg);
  cursor: pointer;
  overflow: hidden;
  transition: all 150ms ease;

  &:hover {
    border-color: var(--surface-brand-primary-base);
    background: var(--action-primary-subtle-bgPressed);
  }

  &:active {
    transform: scale(0.96);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 var(--border-thin) var(--action-focusInner),
                0 0 0 var(--border-thick) var(--action-primary-focusRing);
  }

  // Tipos de contenido
  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__letter {
    font-family: var(--text-component);
    font-weight: var(--font-weight-w-semibold);
    font-size: var(--font-size-f-base);
    color: var(--fg-brand-primaryStrong);
    text-transform: uppercase;
  }

  &__icon {
    color: var(--action-primary-subtle-fgLight);
  }

  // Estado activo/sesión
  &--active {
    border-color: var(--surface-brand-primary-base);
    background: var(--surface-brand-primary-base);
    .pds-avatar-button__letter { color: var(--fg-onColor-brandPrimary); }
  }

  // Indicador de notificación
  &__badge {
    position: absolute;
    top: 0;
    right: 0;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--surface-status-error-solid);
    border: var(--border-thick) solid var(--surface-neutral-canvas);
  }
}
```

## API Angular

```typescript
@Component({ selector: 'pds-avatar-button', standalone: true })
export class PdsAvatarButtonComponent {
  readonly type = input<'image' | 'letter' | 'icon'>('letter');
  readonly imageSrc = input<string | null>(null);
  readonly letter = input<string | null>(null);
  readonly name = input.required<string>(); // Para aria-label
  readonly showBadge = input<boolean>(false);
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly clicked = output<void>();
}
```

## Accesibilidad
- `aria-label` con el nombre del usuario: "Menú de [nombre]"
- Si tiene badge de notificación: incluirlo en el aria-label: "Menú de [nombre], 3 notificaciones"

---

# Sidenav — Especificación

**Figma node:** `3128:851` · **Variantes:** 2 (Open / Closed)

## Descripción
Navegación lateral persistente para aplicativos backoffice en desktop (>1024px). Tres áreas: Header (logo + nombre app), Navegación (items y subitems), Información adicional.

## Variantes → Estado

| Figma | Angular | Ancho |
|---|---|---|
| `Open` | `[expanded]="true"` | `--component-sidenav-open` (304px) |
| `Closed` | `[expanded]="false"` | `--component-sidenav-closed` (80px) |

## Variables CSS

```scss
.pds-sidenav {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: var(--surface-neutral-canvas);
  border-right: var(--border-thin) solid var(--border-neutral-default);
  transition: width 250ms ease;
  overflow: hidden;
  position: sticky;
  top: 0;

  width: var(--component-sidenav-open);
  &--closed { width: var(--component-sidenav-closed); }

  // Header
  &__header {
    background: var(--surface-brand-primary-base);
    padding: var(--spacing-component-md) var(--spacing-component-lg);
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
    min-height: 64px;
  }

  &__app-name {
    font-family: var(--text-component);
    font-size: var(--font-size-component-sidenav-title);
    font-weight: var(--font-weight-w-semibold);
    color: var(--fg-onColor-brandPrimary);
    overflow: hidden;
    white-space: nowrap;
    opacity: 1;
    transition: opacity 150ms ease;
    .pds-sidenav--closed & { opacity: 0; width: 0; }
  }

  &__toggle {
    color: var(--fg-onColor-brandPrimary);
    background: transparent;
    border: none;
    cursor: pointer;
    flex-shrink: 0;
  }

  // Navigation area
  &__nav {
    flex: 1;
    overflow-y: auto;
    padding: var(--spacing-component-sm) 0;
  }

  // Footer
  &__footer {
    padding: var(--spacing-component-sm) 0;
    border-top: var(--border-thin) solid var(--border-neutral-default);
  }
}

// Sidenav Item
.pds-sidenav-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-component-sm);
  padding: var(--spacing-component-sm) var(--spacing-component-lg);
  cursor: pointer;
  color: var(--fg-brand-primary);
  font-family: var(--text-component);
  font-size: var(--font-size-component-sidenav-subtitle);
  font-weight: var(--font-weight-w-medium);
  border-left: var(--border-bold) solid transparent;
  transition: all 150ms ease;
  text-decoration: none;

  &:hover { background: var(--surface-neutral-subtle); }

  &--active {
    background: var(--surface-neutral-subtle);
    border-left-color: var(--border-brand-primary-solid);
    color: var(--fg-brand-primary);
    font-weight: var(--font-weight-w-semibold);
  }

  &__label {
    overflow: hidden;
    white-space: nowrap;
    opacity: 1;
    transition: opacity 150ms ease;
    .pds-sidenav--closed & { opacity: 0; width: 0; }
  }

  &__icon { flex-shrink: 0; }
}
```

## API Angular

```typescript
@Component({ selector: 'pds-sidenav', standalone: true })
export class PdsSidenavComponent {
  readonly expanded = input<boolean>(true);
  readonly appName = input.required<string>();
  readonly appSubtitle = input<string | null>(null);
  readonly items = input.required<SidenavItem[]>();
  readonly expandedChange = output<boolean>();
}

interface SidenavItem {
  id: string;
  label: string;
  icon: string;
  href?: string;
  children?: SidenavItem[];
  badge?: number;
}
```

## Accesibilidad
- `<nav aria-label="Navegación principal">` como contenedor
- Items activos: `aria-current="page"`
- Botón toggle: `aria-expanded`, `aria-label="Contraer navegación"` / `"Expandir navegación"`
- Subitems expandibles: `aria-expanded` en el item padre

---

# Portal Icon — Especificación

**Figma node:** `3178:1914` · **Variantes:** 8

## Descripción
Identificación visual para portales del ecosistema Poli. 4 colores de fondo y 2 tamaños (Header XL, Sidenav LG).

## Variantes → Props

### `Color` → `color`
| Figma | Angular | Fondo | Borde |
|---|---|---|---|
| `Blue` | `'blue'` | `--portal-blue-bg` | `--portal-blue-borderOnLight` |
| `Yellow` | `'yellow'` | `--portal-yellow-bg` | `--portal-yellow-borderOnLight` |
| `Green` | `'green'` | `--portal-green-bg` | `--portal-green-borderOnLight` |
| `Magenta` | `'magenta'` | `--portal-magenta-bg` | `--portal-magenta-borderOnLight` |

### `Size` → `size`
| Figma | Angular | Dimensión |
|---|---|---|
| `XL - Header` | `'xl'` | `--size-xl` (80px) |
| `LG - Sidenav` | `'lg'` | `--size-lg` (64px) |

## Variables CSS

```scss
.pds-portal-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-component-sm);
  border: var(--border-thick) solid;
  flex-shrink: 0;

  &--xl { width: var(--size-xl); height: var(--size-xl); }
  &--lg { width: var(--size-lg); height: var(--size-lg); }

  &--blue    { background: var(--portal-blue-bg); border-color: var(--portal-blue-borderOnLight); color: var(--fg-brand-primary); }
  &--yellow  { background: var(--portal-yellow-bg); border-color: var(--portal-yellow-borderOnLight); color: var(--fg-brand-primary); }
  &--green   { background: var(--portal-green-bg); border-color: var(--portal-green-borderOnLight); color: var(--fg-brand-primary); }
  &--magenta { background: var(--portal-magenta-bg); border-color: var(--portal-magenta-borderOnLight); color: var(--fg-onColor-error); }
}
```

## API Angular

```typescript
@Component({ selector: 'pds-portal-icon', standalone: true })
export class PdsPortalIconComponent {
  readonly color = input<'blue' | 'yellow' | 'green' | 'magenta'>('blue');
  readonly size = input<'lg' | 'xl'>('xl');
  readonly iconName = input.required<string>();
  readonly portalName = input.required<string>(); // Para aria-label
}
```

---

# Icono Poli / Logo Poli — Especificación

**Icono Figma node:** `3143:3758` · **Logo Figma node:** `3143:3478`

## Icono Poli

### Variantes
| Tamaño | Color | Uso |
|---|---|---|
| `Lg 80` Dark | Fondos claros | Header principal |
| `Md 48` Dark | Fondos claros | Espacios compactos |
| `Lg 80` Light | Fondos oscuros / primary | Header sobre primario |
| `Md 48` Light | Fondos oscuros / primary | Compacto sobre primario |

```typescript
@Component({ selector: 'pds-icono-poli', standalone: true })
export class PdsIconoPoliComponent {
  readonly size = input<'md' | 'lg'>('lg');
  readonly color = input<'dark' | 'light'>('dark');
}
```

## Logo Poli Full Text

### Variantes
| Tipo | Uso |
|---|---|
| `Default` | Fondos claros |
| `Light` | Fondos oscuros / primary solid |

```typescript
@Component({ selector: 'pds-logo-poli', standalone: true })
export class PdsLogoPoliComponent {
  readonly tipo = input<'default' | 'light'>('default');
}
```

## Accesibilidad (ambos)
- `role="img"` con `aria-label="Politécnico Grancolombiano"`
- Si es decorativo: `aria-hidden="true"`

---

# A11y Button / Help Button — Especificación

**A11y Button node:** `3183:9117` · **Help Button node:** `3183:9236` · **Variantes:** 5 c/u

## Descripción
**A11y Button:** Acceso rápido a opciones de ajuste de visualización (tamaño de texto). Nota: el panel de opciones está pendiente de implementación.

**Help Button:** Acceso a canales de soporte: tickets, contacto telefónico, etc.

## Variables CSS

```scss
.pds-floating-button {
  // Base compartida
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--button-dimensions-height);
  height: var(--button-dimensions-height);
  border-radius: var(--radius-pill);
  cursor: pointer;
  transition: all 150ms ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.16);

  // A11y Button
  &--a11y {
    background: var(--action-neutral-solid-bg);
    color: var(--action-neutral-solid-fg);
    border: var(--border-thin) solid var(--surface-neutral-inverse);

    &:hover  { background: var(--surface-neutral-inverse); color: var(--fg-onColor-inverse); }
    &--error {
      background: var(--action-status-error-solid-bg);
      color: var(--action-status-error-solid-fg);
      &:hover  { background: var(--action-status-error-solid-bgHover); }
      &:active { background: var(--action-status-error-solid-bgPressed); }
    }
  }

  // Help Button
  &--help {
    background: var(--action-neutral-solid-bg);
    color: var(--action-neutral-solid-fg);
    border: var(--border-thin) solid var(--surface-neutral-inverse);

    &:hover  {
      background: var(--action-secondary-solid-bgHover);
      border-color: var(--action-secondary-solid-border);
      color: var(--action-secondary-solid-fg);
    }
    &:active { background: var(--action-secondary-solid-bgPressed); }
  }

  &:disabled {
    opacity: var(--button-opacity-disabled);
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
@Component({ selector: 'pds-a11y-button', standalone: true })
export class PdsA11yButtonComponent {
  readonly disabled = input<boolean>(false);
  readonly clicked = output<void>();
}

@Component({ selector: 'pds-help-button', standalone: true })
export class PdsHelpButtonComponent {
  readonly disabled = input<boolean>(false);
  readonly clicked = output<void>();
}
```

## Accesibilidad
- `aria-label="Opciones de accesibilidad"` / `aria-label="Ayuda y soporte"`
- `aria-expanded` cuando tienen panel desplegable
- Posicionamiento fijo: siempre visible, no interfiere con el contenido principal
