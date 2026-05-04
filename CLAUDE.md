# CLAUDE.md — Semilla Front / DS v2

Contexto completo del proyecto para Claude Code. Leer antes de cualquier acción.

---

## Qué es este proyecto

**Semilla Front** es el proyecto base (starter) del Politécnico Grancolombiano. Angular 19, standalone components. Más de 500 aplicativos del ecosistema Poli lo usan como punto de partida.

El objetivo actual es integrar el **Design System v2** sin romper el v1, que ya está en producción en 8 aplicativos.

---

## Decisiones de arquitectura tomadas

### Estrategia de migración: coexistencia de componentes

- Los componentes v1 (`app-*`) se mantienen intactos. No modificar.
- Los componentes v2 se crean como nuevos con selector `pds-*`.
- Nuevos proyectos usan `pds-*` desde el inicio.
- Los 8 aplicativos existentes migran a su propio ritmo, componente por componente.

### Tokens v2

Los archivos CSS generados por Style Dictionary están en `src/assets/poligran/`:

| Archivo                 | Contenido                                                                       |
| ----------------------- | ------------------------------------------------------------------------------- |
| `primitives.css`        | Colores primitivos (`--color-neutral-*`, `--color-brand-*`)                     |
| `tokens.css`            | Tokens semánticos (`--surface-*`, `--fg-*`, `--action-*`, `--border-*`)         |
| `typescale-desktop.css` | Tipografía desktop (`--font-size-*`, `--font-weight-*`, `--line-height-*`)      |
| `layout-desktop.css`    | Spacing, radios, bordes, breakpoints, sidenav                                   |
| `component.css`         | Dimensiones de componentes (`--button-*`, `--icon-*`, `--badge-*`, `--input-*`) |

Los 5 archivos se cargan en `angular.json` (styles array), antes de `src/styles.scss`.
Los overrides mobile están en `src/styles.scss` dentro de `@media (max-width: 768px)`.

Los archivos `.scss` en la misma carpeta contienen variables SCSS (`$var`), no CSS custom properties. No usarlos para tokens — usar los `.css`.

### Regla absoluta de tokens

**Nunca usar valores hardcoded en componentes v2.** Siempre CSS custom properties de los archivos de tokens. Sin `#0f385a`, sin `16px` sueltos, sin `border-radius: 10px` directo.

---

## Estructura del proyecto

```
src/
  styles.scss                        ← @use de los 6 archivos v1 + @media mobile v2
  assets/poligran/                   ← estilos globales
    primitives.css / tokens.css      ← tokens v2 (cargados en angular.json)
    typescale-desktop.css            ← tokens v2
    layout-desktop.css               ← tokens v2
    component.css                    ← tokens v2
    variables_foundation.scss        ← primitivos v1 (mantener)
    variables_tokens.scss            ← tokens semánticos v1 (mantener)
    estilos_generales.scss           ← tipografía y utilidades v1
    input_material.scss              ← overrides Angular Material v1
    layouts_poli.scss                ← layouts estructurales v1
    fuentes.scss                     ← importación de fuentes (no tocar nunca)
  app/shared/components/
    app-*/                           ← componentes DS v1 (no modificar)
    pds-*/                           ← componentes DS v2 (aquí trabajamos)
```

---

## Convenciones para componentes v2

### Naming

- Selector: `pds-{nombre}`
- Carpeta: `src/app/shared/components/pds-{nombre}/`
- Archivos: `pds-{nombre}.component.ts/html/scss/stories.ts`
- Clases CSS: BEM con prefijo `pds-` → `.pds-button`, `.pds-button--primary`, `.pds-button--lg`

### TypeScript

- `input()` signal API — no `@Input()` decorador
- `computed()` para clases y lógica derivada
- `ChangeDetectionStrategy.OnPush` siempre
- Standalone: `true`

### Accesibilidad (requisitos mínimos en todos los componentes)

- Roles ARIA correctos
- `aria-label` / `aria-labelledby` donde corresponda
- Estados `aria-disabled`, `aria-expanded`, `aria-selected` según el componente
- Navegación por teclado: Enter, Space, Escape, Tab según contexto
- Focus visible: `box-shadow` con tokens de color — nunca `outline: none` sin reemplazo

### Storybook

- Cada componente tiene su `.stories.ts`
- Título: `'DS v2/{Nombre}'` (agrupa bajo DS v2, separado de los v1)
- `tags: ['autodocs']` siempre
- `argTypes` con `control: 'select'` para todos los props de tipo unión
- Stories que cubren: todas las variantes, todos los tamaños, casos de accesibilidad

---

## Specs de referencia

Los archivos en `specs/` definen la API exacta de cada componente v2:
Figma node ID, variantes → props, CSS vars a aplicar, API Angular con signals, ejemplos.

| Spec                        | Componente                                                                                       |
| --------------------------- | ------------------------------------------------------------------------------------------------ |
| `icon-component.md`         | `pds-icon` ✅                                                                                    |
| `button.md`                 | `pds-button`                                                                                     |
| `badge.md`                  | `pds-badge`                                                                                      |
| `loading-circle.md`         | `pds-loading-circle`                                                                             |
| `tag.md`                    | `pds-tag`                                                                                        |
| `link.md`                   | `pds-link`                                                                                       |
| `cta.md`                    | `pds-cta`                                                                                        |
| `icon-button.md`            | `pds-icon-button`                                                                                |
| `tooltip.md`                | `pds-tooltip`                                                                                    |
| `progress-bar.md`           | `pds-progress-bar`                                                                               |
| `notification.md`           | `pds-notification`                                                                               |
| `dialog-modal.md`           | `pds-dialog` / `pds-modal`                                                                       |
| `form-controls.md`          | `pds-checkbox`, `pds-radio`, `pds-toggle`, `pds-input`, `pds-select`, `pds-textarea`             |
| `navigation-components.md`  | `pds-breadcrumb`, `pds-tabs`, `pds-paginator`, `pds-stepper`, `pds-avatar-button`, `pds-sidenav` |
| `date-picker-file-range.md` | `pds-date-picker`, `pds-file-uploader`, `pds-range`                                              |
| `complex-components.md`     | `pds-accordion`, `pds-table`, `pds-selectable-card`, `pds-code-block`                            |

---

## Hoja de ruta

### Fase 1 — Componentes atómicos (sin dependencias) ✅ COMPLETA

- [x] `pds-icon` — base de todos los demás
- [x] `pds-button` — usado por Dialog, Modal, Stepper, Notification
- [x] `pds-badge`
- [x] `pds-loading-circle`
- [x] `pds-tag`
- [x] `pds-link`
- [x] `pds-helper-text` — componente utilitario no listado en specs originales; reutilizado por progress-bar, inputs, file-uploader
- [x] `pds-progress-bar` — adelantado desde Fase 2 por dependencia con pds-helper-text

### Fase 2 — Componentes con dependencia de Icon o Button

- [x] `pds-cta` — depende de `pds-icon`
- [x] `pds-icon-button` — depende de `pds-icon`
- [x] `pds-tooltip` — depende de `pds-icon`

### Fase 3 — Componentes compuestos

- [x] `pds-notification` — depende de `pds-icon` + `pds-icon-button` + `pds-button`; tipos inline/snackbar/toast; 5 estados de status; auto-dismiss configurable; **NEW: botones modales (actions), timer visual con colores de contraste (30s configurable)**
- [x] `pds-dialog` — depende de `pds-icon` + `pds-button`; 4 modos (default/success/warning/error); focus trap CDK; Escape para cerrar; scroll-lock en body
- [x] `pds-modal` — depende de `pds-icon-button` + `pds-button`; 5 tamaños (SM/MD/LG/XL/2XL); contenido libre vía ng-content; footer slot personalizable; focus trap CDK; bottom sheet en móvil

### Fase 4 — Formularios

- [x] `pds-checkbox` — CVA completo, indeterminate con ElementRef, `<input>` nativo oculto
- [x] `pds-checkbox-group` — fieldset + legend, CVA con `string[]`
- [x] `pds-radio` — `<input type=radio>` nativo oculto, tabIndex controlable externamente
- [x] `pds-radio-group` — CVA, tabindex roving, ArrowKey navigation (APG pattern)
- [x] `pds-toggle` — `<button role="switch">`, CVA boolean
- [x] `pds-input-field` — 9 estados, password toggle, iconStart/End, loading, counter, CVA string
- [x] `pds-textarea-field` — variante de input-field con resize:vertical, CVA string
- [x] `pds-select-field` — custom dropdown ARIA combobox/listbox, ArrowKey nav, CVA string|null

### Fase 5 — Navegación

- [ ] `pds-breadcrumb`, `pds-paginator`
- [x] `pds-tabs` — APG tablist pattern; roving tabindex; ArrowLeft/Right/Home/End; active=magenta indicator (`--border-status-error-solid`); hover=navy indicator+bg; disabled aria-disabled; icono opcional sobre label; sin panels (parent responsable)
- [x] `pds-stepper` — horizontal (default) + vertical orientation; 4-state markers (completed/current/disabled) with `check_circle` override on completed; connector lines between markers; FIRST/MIDDLE/LAST footer variants; `stepChange` output (parent controls index); `finished` output on last step; `showCount` toggle; `ariaLabel` input; `aria-current="step"` on current marker; `aria-live="polite"` on counter
- [x] `pds-avatar-button` — `<button>` pill; tipos letter/icon/image; badge notificación; estados hover/focus/pressed con indicador `--portal-blue-bg`; aria-label dinámico con nombre+rol+badge; aria-disabled
- [x] `pds-sidenav` — flex column; estados expandido/colapsado con transición de ancho; acordeón de sub-ítems (1 nivel); tooltip automático en estado colapsado; toggle button colgando fuera del borde derecho; portal icon 48px; labels con opacity/max-width transition (no display:none); `aria-current`/`aria-expanded` correctos
- [x] `pds-stepper-compact` — variante compacta del stepper para espacios reducidos; marcadores de segmento (current=teal/8px · default=gris/4px) con flex:1; info header con count/título/siguiente-paso; pie de navegación con botones Anterior+Siguiente/Finalizar; `aria-live="polite"` en el contador; transición suave de marcadores; solo sobre Canvas/Subtle/Sunken (contraste)

### Fase 6 — Complejos

- [ ] `pds-date-picker`, `pds-file-uploader`, `pds-range`
- [ ] `pds-accordion`, `pds-table`, `pds-selectable-card`, `pds-code-block`

---

## Aprendizajes de la Fase 1

### Patrones de accesibilidad consolidados

**Disabled con `aria-disabled`** (NO `disabled` nativo):

- Mantiene el elemento en el tab order para que los lectores de pantalla lo anuncien
- Requiere guard JS en el handler: `if (this.disabled()) { event.preventDefault(); event.stopImmediatePropagation(); return; }`
- Cursor: `not-allowed` SIN `pointer-events: none` (para que el cursor sea visible)
- Excepción: el sub-elemento remove de `pds-tag` sí usa `pointer-events: none` porque su padre ya comunica el estado disabled

**Touch target 48×48px con `::before`** (WCAG 2.5.5):

```scss
position: relative;
&::before {
  content: "";
  position: absolute;
  inset: -8px 0; // expande 8px arriba y abajo sobre elemento de 32px
}
```

Usar en todos los componentes de 32px de alto (tag, badge, chip, etc.).

**Botones dentro de botones (HTML inválido)**:

- `<button>` no puede contener otro `<button>`
- Solución: `<span role="button" tabindex="0">` con handler `(keydown)` para Enter/Space

**Focus ring**:

```scss
&:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--action-focus-inner), // anillo interior blanco
    0 0 0 6px var(--action-primary-focus-ring); // anillo exterior azul
}
```

`overflow: hidden` en el padre corta el focus ring — usar `border-radius` explícito en el hijo en su lugar.

**Loading/spinner**: `role="status"` implica `aria-live="polite"` — no duplicar. El texto accesible va en `<span class="sr-only">` dentro, no en `aria-label` del contenedor vacío.

**`prefers-reduced-motion`**: usar `animation: none` — no solo reducir la velocidad.

---

### Patrones de diseño consolidados

**Tipografía de componentes** (tags, labels, badges, inputs):

```scss
font-family: var(--text-component, Poppins);
font-size: var(--font-size-component-tag, 14px);
font-weight: var(--font-weight-w-semibold, 600);
line-height: 1; // 100%
letter-spacing: 0.28px;
```

**Tipografía de labels de formulario / helper text**:

```scss
font-family: var(--input-font-label, Poppins);
font-size: var(--font-size-f-sm);
font-weight: var(--font-weight-w-semibold);
line-height: var(--line-height-lh-base);
```

**Disabled por variante** (convención Button, aplica a Tag y otros):

- Solid/primary → fondo `--action-neutral-solid-bg-disabled`, sin borde
- Outlined/secondary → fondo gris, borde transparent
- Ghost/tertiary → fondo transparent, borde y texto `--action-neutral-solid-bg-disabled`

**Overlay de color sobre fondo variable** (remove button, badges sobre imágenes):

- Usar `rgba(0, 0, 0, N)` en lugar de colores fijos — se adapta a cualquier fondo subyacente
- N = 0.9 para primary oscuro, 0.15 para secondary, 0.10 para tertiary

**Remove button flush al borde** (tag, chip):

```scss
align-self: stretch;
margin-right: calc(-1 * var(--spacing-component-md)); // cancela el padding del padre
border-radius: 0 var(--radius-component-md) var(--radius-component-md) 0; // solo esquinas derechas
```

**Icono heredando color del padre**:

```scss
pds-icon {
  --pds-icon-color: currentColor;
}
```

---

### Tokens pendientes de crear en `component.css`

Estos tokens se usan con fallback y deben formalizarse en la próxima iteración del Style Dictionary:

| Token                        | Valor       | Usado en                                                                                                           |
| ---------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------ |
| `--loading-circle-border-sm` | `6px`       | `pds-loading-circle`                                                                                               |
| `--loading-circle-border-md` | `8px`       | `pds-loading-circle`                                                                                               |
| `--loading-circle-border-lg` | `10px`      | `pds-loading-circle`                                                                                               |
| `--color-cta-gradient-end`   | `#29015c`   | `pds-cta` (extremo del gradiente magenta en hover/pressed)                                                         |
| `--text-body`                | `Open Sans` | `pds-tooltip` (usa `--typography-family-sans2` como fallback)                                                      |
| `--border-neutral-default`   | `#b0bec5`   | `pds-checkbox`, `pds-radio`, `pds-input-field`, `pds-textarea-field`, `pds-select-field` (borde en estado default) |
| `--fg-status-error`          | `#e0006e`   | `pds-input-field` (asterisco requerido + color icono error)                                                        |
| `--fg-status-success`        | `#6f921e`   | `pds-input-field` (color icono success)                                                                            |
| `--fg-status-warning`        | `#d96c06`   | `pds-input-field` (color icono warning)                                                                            |
| `--action-tag-remove-bg`     | `#002b49`   | `pds-tag` (base para `rgba()` del botón remove en variante primary; actualmente hardcodeado como `$remove-color`)  |

### Tokens ya disponibles (no pendientes)

| Token                                    | Dónde está definido                             | Usado en                                                                     |
| ---------------------------------------- | ----------------------------------------------- | ---------------------------------------------------------------------------- |
| `--text-component`                       | `component.css`                                 | `pds-tag`, `pds-badge`                                                       |
| `--font-size-component-tag`              | `typescale-desktop.css`, `typescale-mobile.css` | `pds-tag`                                                                    |
| `--size-2xs`                             | `component.css`                                 | `pds-progress-bar` (altura del track; NO usar `--progress-bar-track-height`) |
| `--font-size-component-sidenav-title`    | `typescale-desktop.css`                         | `pds-sidenav` (título de app en encabezado; 1.25rem / 20px)                  |
| `--font-size-component-sidenav-subtitle` | `typescale-desktop.css`                         | `pds-sidenav` (subtítulo de app en encabezado; 0.875rem / 14px)              |
| `--component-sidenav-open`               | `layout-desktop.css`                            | `pds-sidenav` (ancho expandido; 304px)                                       |
| `--component-sidenav-closed`             | `layout-desktop.css`                            | `pds-sidenav` (ancho colapsado; 80px)                                        |

---

### Decisiones de UX tomadas en Fase 1

**Tag removable**: las acciones click (toggle selección) y eliminar son independientes. Click en el tag = `aria-pressed`. Click en la X = emite `(removed)`. Nunca fusionar ambas acciones.

**`pds-helper-text`**: componente nuevo no en specs originales. Encapsula el patrón icono + texto de feedback que se repite en progress-bar, inputs, select, textarea, file-uploader. Evita duplicar SCSS de estados en cada formulario.

---

### Patrones de Fase 4 consolidados

**CVA + signals (patrón base para todos los form controls)**:

- `internalValue = signal(initial)` — fuente de verdad del UI
- `effect(() => internalValue.set(input()))` — sincroniza prop → signal al montar (uso sin formControl)
- `writeValue(val)` → `internalValue.set(val)` — CVA sobrescribe cuando hay formControl
- `setDisabledState(bool)` → `internalDisabled.set(bool)` — siempre separado de `disabled` input

**Input nativo oculto + control visual custom** (checkbox, radio):

- `<input type="checkbox/radio" class="sr-only">` — maneja la semántica nativa, tab order, y cambio de estado
- `<div class="__control">` — el visual custom que el usuario ve
- Focus ring: selector CSS `.sr-only:focus-visible + .__control` — no necesita JS
- Indeterminate: requiere `ElementRef` → `nativeElement.indeterminate = true` en `effect()`

**Tabindex roving** (radio-group — APG pattern):

- Solo el radio seleccionado (o el primero si ninguno) tiene `tabindex="0"`; el resto `-1`
- Las flechas cambian la selección Y mueven el foco en el mismo gesto
- `HostListener('keydown')` en el grupo — escucha ArrowDown/Up/Left/Right, Home, End

**Custom dropdown** (select-field — ARIA combobox/listbox):

- Trigger: `role="combobox"` + `aria-expanded` + `aria-haspopup="listbox"` + `aria-activedescendant`
- Lista: `role="listbox"` con `id` único; opciones: `role="option"` con `aria-selected`
- Cierre fuera del componente: `@HostListener('document:click')` filtrando por `closest('#container-id')`
- No usar `pointer-events: none` en opciones disabled — el cursor must-allow hover para feedback visual

**Focus ring en campo de texto** (input-field, textarea, select trigger):

- El focus ring va en el **wrapper**, no en el `<input>` nativo, usando `:focus-within`
- Estados de error/warning/success tienen su propio `--action-status-{status}-focus-ring`
- Password toggle: `pds-icon-button` dentro del wrapper — NO produce doble focus ring porque el wrapper usa `:focus-within`

**Tokens de input confirmados en `component.css`**:

- `--input-font-main: Open Sans` — texto dentro del campo
- `--input-font-label: Poppins` — label, helper, contador
- `--input-radius-base: 10px` — radio del wrapper
- `--input-dimensions-min-height: 48px` — alto mínimo del campo
- `--input-dimensions-padding-y: 4px` / `--input-dimensions-padding-x: 12px`
- `--input-dimensions-textarea-min-height: 96px` / `--input-dimensions-textarea-padding-y: 16px`
- `--input-dimensions-radio-checkbox-height: 20px`
- `--radius-checkbox: 4px`

---

## Lo que NO hacer

- No modificar componentes `app-*` existentes
- No hardcodear valores CSS — siempre tokens (con fallback si el token aún no existe)
- No usar `@Input()` en componentes v2 — usar `input()` signal
- No tocar `fuentes.scss`
- No tocar las páginas, servicios, guards ni modelos de negocio del aplicativo
- No usar `outline: none` sin `box-shadow` de reemplazo para el focus
- No usar `overflow: hidden` en contenedores que tengan hijos con focus ring
- No fusionar `disabled` nativo con `aria-disabled` — elegir uno y ser consistente (el DS v2 usa `aria-disabled`)
