# Poli Design System v2 — Contexto para Claude Code

## Proyecto
Sistema de diseño institucional del Politécnico Grancolombiano. El ecosistema tiene más de 500 aplicativos web en Angular 19, todos en el mismo Azure DevOps organizados por dominios.

El DS v2 es una actualización del proyecto existente **Semilla Front** — no un proyecto nuevo. La estrategia es continuar sobre esa base haciendo los ajustes necesarios para incorporar los cambios del DS v2.

## Qué es Semilla Front
Semilla Front es el proyecto base (starter) del Poli. Además de los componentes del Design System incluye:
- Autenticación
- Estructura base de aplicativo
- Otras utilidades reutilizables para nuevos proyectos

Es el punto de partida que usan los equipos del Poli para crear nuevos aplicativos. Por eso es crítico que los cambios del DS v2 queden bien integrados aquí — todos los aplicativos nuevos los heredarán.

## Situación del repo
- **Repo original**: Azure DevOps del Poli (sin acceso directo por ahora)
- **Estrategia**: trabajar sobre una copia local del repo, colaborar con el equipo de Appicua a través de GitHub, y luego sincronizar de vuelta a Azure DevOps
- **Flujo Git**:
  ```
  Copia local (desde Azure DevOps)
       ↓ push inicial
  GitHub (Appicua) — desarrollo colaborativo
       ↓ PR aprobado → merge a main
  Azure DevOps — producción (sincronización manual o pipeline)
  ```

## Lo primero que debe hacer Code
1. Leer la estructura completa del proyecto Semilla Front tal como está
2. Identificar dónde viven los componentes del DS actual (v1)
3. Entender las convenciones de código existentes (prefijos, naming, estructura de archivos)
4. Proponer la estrategia de migración respetando la estructura existente

**No asumir ni crear estructura nueva** hasta haber leído el proyecto.

---

## Tokens — COMPLETADO ✓
El proyecto `poli-tokens/` ya está configurado y genera los siguientes archivos en `dist/`:

| Archivo | Contenido |
|---|---|
| `primitives.css` | Variables CSS base (colores hex, spacing px, radios px, tipografía rem) |
| `tokens.css` | Variables semánticas de color (surface, fg, border, action, portal) |
| `typescale-desktop.css` | Font sizes en rem, line-heights, font-weights — desktop |
| `typescale-mobile.css` | Ídem — mobile (valores distintos en algunos tamaños) |
| `layout-desktop.css` | Spacing, radios, breakpoints, border widths — desktop |
| `layout-mobile.css` | Ídem — mobile |
| `component.css` | Dimensiones de componentes (button heights, input dimensions, icon sizes, etc.) |

### Convención de nombres de tokens
Figma usa `/` como separador → CSS usa `-`:
- `surface/neutral/canvas` → `--surface-neutral-canvas`
- `action/primary/solid/bg` → `--action-primary-solid-bg`
- `font-size/f-base` → `--font-size-f-base`
- `spacing/component/lg` → `--spacing-component-lg`

### Tokens más usados en componentes
```css
/* Colores */
--surface-neutral-canvas        /* #ffffff */
--surface-neutral-subtle        /* #e5e9ec */
--surface-brand-primary-base    /* #0f385a — azul primario */
--fg-neutral-primary            /* #0c0f12 */
--fg-brand-primary              /* #0f385a */
--action-primary-solid-bg       /* #0f385a — fondo botón primary */
--action-primary-solid-fg       /* #ffffff — texto botón primary */

/* Tipografía */
--font-size-f-base              /* 1rem */
--font-size-f-sm                /* 0.875rem */
--font-weight-w-semibold        /* 600 */
--line-height-lh-base           /* 1.5 */

/* Espaciado */
--spacing-component-lg          /* 16px */
--spacing-component-md          /* 12px */
--spacing-component-sm          /* 8px */

/* Radios */
--radius-pill                   /* 99999px */
--radius-component-md           /* 10px */
--radius-component-sm           /* 4px */
--radius-container-md           /* 16px */

/* Dimensiones */
--button-dimensions-height      /* 48px */
--button-dimensions-height-sm   /* 32px */
--button-dimensions-height-lg   /* 56px */
--input-dimensions-min-height   /* 48px */
--icon-sm                       /* 20px */
--icon-md                       /* 24px */
```

---

## Componentes del DS v2 (35 en total)

### Elementos base
Icon Component, Image Overlay, Loading circle

### Acciones
Link, CTA, Button (solid/ghost/outline/subtle/error — sm/md/lg), Icon Button (+ tertiary, ghost neutral)

### Feedback
Badge (rectangle/pill — sm/md/lg — brand/success/warning/error/neutral), Tag, Tooltip, Progress Bar, Notification (snackbar/toast/inline), Dialog, Modal

### Formularios
Checkbox+Text, Radio+Text, Toggle+Text, Input Field, Select Field, Textarea Field, Date Picker, File Uploader Control (Large), Range (Double)

### Contenido y datos
Code Block, Accordion, Table cell, Selectable Card

### Navegación
Breadcrumb, Tab Item/Tabs, Paginator, Stepper, Stepper Compact, Avatar Button, Sidenav

### Específicos del ecosistema Poli
Portal Icon

---

## Cambios del DS v1 → v2

### Tokens/Variables
- **v1**: valores hardcoded o variables SCSS con nombres distintos
- **v2**: CSS custom properties generadas desde Figma Variables vía Style Dictionary
- Los nombres cambiaron — hay que mapear los valores antiguos a los nuevos tokens

### Diseño y accesibilidad
- Ajustes visuales significativos en la mayoría de componentes
- Mejoras de contraste para cumplir WCAG (documentado en auditoría de contraste)
- Focus rings implementados con box-shadow (no con outline)
- Nuevas variantes en Button e Icon Button (tertiary, ghost neutral)

### Angular
- Proyecto en Angular 19
- Migrar a `input()` signal API donde sea posible
- Mantener compatibilidad con lo existente en Semilla Front

---

## Convenciones que Code debe respetar
- **No asumir** el prefijo de componentes ni la estructura hasta leer el proyecto v1
- **No romper** las funcionalidades no-DS de Semilla Front (autenticación, etc.)
- **Mantener** el estilo de código existente en el proyecto
- **Usar siempre** CSS custom properties de los tokens — nunca valores hardcoded

---

## Accesibilidad — requisitos mínimos
- Roles ARIA correctos
- `aria-label` o `aria-labelledby` donde corresponda
- Estados `aria-disabled`, `aria-expanded`, `aria-selected`
- Navegación por teclado (Enter, Space, Escape, Tab)
- Focus visible con box-shadow usando tokens de color

---

## Integración de tokens en Angular
Una vez leída la estructura del proyecto, los archivos de `poli-tokens/dist/` deben importarse en `angular.json` (styles) y en el stylesheet global. El orden de importación es:
1. `primitives.css`
2. `tokens.css`
3. `typescale-desktop.css` (desktop, en media query para mobile)
4. `layout-desktop.css` (desktop, en media query para mobile)
5. `component.css`

---

## Lo que ya está resuelto (no rehacer)
- Pipeline de tokens con Style Dictionary v4 ✓
- Archivos CSS/SCSS generados y validados ✓
- Auditoría completa del archivo Figma ✓
- Variables semánticas de color con descripciones ✓
- Auditoría de contraste Component vs Surface ✓


---

## Estructura del proyecto de referencia (aplicativo v1)

Code recibirá un **aplicativo concreto** del ecosistema Poli que usa DS v1, no el proyecto Semilla Front limpio. Este aplicativo tiene sus propias pantallas y funcionalidades particulares — ignorarlas y enfocarse solo en la capa del Design System.

### Estructura raíz del proyecto
```
.angular/
.git/
docs/
node_modules/
public/
src/
.editorconfig
.gitignore
.postcssrc
angular.json
azure-static-web-apps-*.json
documentation
package.json
package-lock.json
README
tsconfig.app.json
tsconfig.json
tsconfig.spec.json
```

### Estilos del DS v1 — ubicación actual
```
src/assets/poligran/
  estilos_generales.scss   ← estilos globales del DS
  fuentes.scss             ← tipografía e importación de fuentes
  input_material.scss      ← overrides de Angular Material
  layouts_poli.scss        ← layouts y grillas
  variables_foundation.scss ← primitivos base (equivale a 00 Primitives)
  variables_tokens.scss    ← tokens semánticos (equivale a 02 Color)
```

### Dónde van los tokens v2
Mantener la misma ruta `src/assets/poligran/` para no romper imports existentes.
Reemplazar/agregar los archivos CSS generados por Style Dictionary:

```
src/assets/poligran/
  primitives.css           ← reemplaza variables_foundation.scss
  tokens.css               ← reemplaza variables_tokens.scss
  typescale-desktop.css    ← nuevo
  typescale-mobile.css     ← nuevo
  layout-desktop.css       ← nuevo (reemplaza layouts_poli parcialmente)
  layout-mobile.css        ← nuevo
  component.css            ← nuevo
  estilos_generales.scss   ← mantener, actualizar referencias a vars viejas
  fuentes.scss             ← mantener
  input_material.scss      ← mantener, revisar overrides
```

### Qué debe hacer Code al analizar el proyecto
1. Leer `angular.json` para entender qué estilos se importan globalmente
2. Leer `src/styles.scss` (o el archivo de estilos raíz) para ver cómo se importa `assets/poligran/`
3. Leer `variables_foundation.scss` y `variables_tokens.scss` para mapear nombres v1 → nombres v2
4. Identificar los componentes del DS v1 (carpeta, prefijos, estructura)
5. **No tocar** las pantallas ni funcionalidades propias del aplicativo

### Prioridad de análisis
- Lo que importa: componentes DS, variables CSS, estilos globales
- Lo que se ignora: páginas, servicios de negocio, guards, modelos de datos del aplicativo


---

## Mapeo de nombres v1 → v2 (crítico para la migración)

### Sistema de nomenclatura — diferencias clave

| Aspecto | v1 | v2 |
|---|---|---|
| Idioma | Español (`colores-marca-poli-azul-principal-base`) | Inglés (`surface-brand-primary-base`) |
| Estructura | Por elemento de UI (`color-button-primary-*`) | Por rol semántico (`action-primary-solid-*`) |
| Escala | Numérica arbitraria (`escala-4` = 16px) | Directa con unidad (`spacing-component-lg` = 16px) |
| Tipografía | Variables de headers separadas por breakpoint en el mismo archivo | Archivos separados `typescale-desktop.css` / `typescale-mobile.css` |

### Mapeo de colores principales

| v1 | v2 |
|---|---|
| `--colores-marca-poli-azul-principal-base` | `--color-brand-primary-base` (primitivo) / `--surface-brand-primary-base` (semántico) |
| `--colores-marca-poli-azul-secundario-base` | `--color-brand-secondary-base` / `--surface-brand-secondary-muted` |
| `--colores-marca-poli-magenta-alt` | `--surface-status-error-solid` |
| `--colores-marca-poli-amarillo-base` | `--surface-status-warning-solid` |
| `--colores-marca-poli-verde-base` | `--surface-status-success-solid` |
| `--colores-marca-poli-cian-base` | `--surface-status-info-solid` |
| `--colores-utility-bruma-50` | `--color-neutral-gray-50` |
| `--colores-utility-bruma-100` | `--color-neutral-gray-100` |
| `--colores-utility-bruma-500` | `--color-neutral-gray-500` |

### Mapeo de tokens semánticos

| v1 | v2 |
|---|---|
| `--color-text-text-primary` | `--fg-brand-primary` |
| `--color-text-text-secondary` | `--fg-neutral-secondary` |
| `--color-text-text-button-light` | `--fg-onColor-brandPrimary` |
| `--color-text-link-default` | `--fg-brand-link` |
| `--color-surface-surface-primary` | `--surface-neutral-canvas` |
| `--color-surface-surface-tertiary` | `--surface-neutral-subtle` |
| `--color-surface-surface-quaternary` | `--surface-neutral-sunken` |
| `--color-surface-surface-dark` | `--surface-brand-primary-base` |
| `--color-button-primary-button-primary-default` | `--action-primary-solid-bg` |
| `--color-button-primary-button-primary-hover` | `--action-primary-solid-bgHover` |
| `--color-button-outline-button-outline-stroke` | `--border-brand-primary-solid` |
| `--color-input-default-background` | `--action-primary-subtle-bg` |
| `--color-input-default-border` | `--border-neutral-default` |
| `--color-input-default-border-focused` | `--border-brand-secondary-solid` |
| `--color-border-border-tertiary` | `--border-neutral-default` |
| `--color-surface-surface-panel-danger` | `--surface-status-error-subtle` |
| `--color-surface-surface-panel-success` | `--surface-status-success-subtle` |
| `--color-surface-surface-panel-warning` | `--surface-status-warning-subtle` |
| `--color-surface-surface-panel-info` | `--surface-status-info-subtle` |

### Mapeo de espaciado (escala v1 → tokens v2)

| v1 (escala) | Valor | v2 |
|---|---|---|
| `--escala-1` | 4px | `--spacing-component-xxs` |
| `--escala-1-5` | 6px | `--spacing-component-xs` |
| `--escala-2` | 8px | `--spacing-component-sm` |
| `--escala-3` | 12px | `--spacing-component-md` |
| `--escala-4` | 16px | `--spacing-component-lg` |
| `--escala-5` | 20px | `--spacing-component-xl` |
| `--escala-6` | 24px | `--spacing-component-2xl` |
| `--escala-8` | 32px | `--spacing-component-3xl` |
| `--escala-10` | 40px | `--spacing-component-4xl` |

### Mapeo de tipografía

| v1 | v2 |
|---|---|
| `--tipografia-font-family-family-sans-heading` | `--text-component` / `--text-headings` |
| `--tipografia-font-family-family-sans-body` | `--text-body` |
| `--tipografia-font-family-family-mono` | `--text-code` |
| `--tipografia-font-size-body-body-base` | `--font-size-f-base` |
| `--tipografia-font-size-body-body-sm` | `--font-size-f-sm` |
| `--tipografia-font-size-body-body-xs` | `--font-size-f-xs` |
| `--tipografia-font-size-body-body-lg` | `--font-size-f-lg` |
| `--tipografia-font-weight-weight-regular` | `--font-weight-w-regular` |
| `--tipografia-font-weight-weight-semibold` | `--font-weight-w-semibold` |
| `--tipografia-font-weight-weight-bold` | `--font-weight-w-bold` |

### Mapeo de radios

| v1 | v2 |
|---|---|
| `--radius-inputs-inputs-base-radius` | `--radius-component-md` (10px) |
| `--radius-base-rounded-full` / `--escala-1138` | `--radius-pill` |
| `--radius-base-rounded-small` | `--radius-component-sm` |
| `--radius-base-rounded-large` | `--radius-container-sm` |

### Archivos a actualizar en estilos_generales.scss
- Referencias a `--tipografia-*` → usar tokens v2
- Referencias a `--color-text-*` → usar `--fg-*`
- Referencias a `--spacing-universal-spacing-*` → usar `--spacing-component-*` o `--spacing-layout-*`
- Referencias a `--spacing-effects-shadow-*` → mantener o reemplazar con valores fijos
- Mixins de sombras (`$shadows`) → actualizar colores a `rgba` con valores de primitivos v2

### input_material.scss
- `--radius-inputs-inputs-base-radius` → `--radius-component-md`
- `--color-input-default-background` → `--action-primary-subtle-bg`
- `--color-input-default-placeholder` → `--fg-neutral-placeholder`
- `--color-text-text-primary` → `--fg-brand-primary`
- `--spacing-inputs-input-large-height` → `--input-dimensions-min-height`
- `--spacing-effects-focus-ring-inner-spread` → `--border-thin`
- `--spacing-effects-focus-ring-outer-spread` → `--border-thick`
- `--color-surface-surface-primary` → `--surface-neutral-canvas`

### layouts_poli.scss
- `--spacing-universal-spacing-2xl` → `--spacing-component-2xl`
- `--spacing-universal-spacing-8xl` → `--spacing-component-3xl`
- `--spacing-universal-spacing-10xl` → `--spacing-component-4xl`
- `--spacing-universal-spacing-6xl` → `--spacing-component-4xl`
- `--spacing-universal-spacing-24` → valor directo `96px` o `--size-2xl`

### fuentes.scss
- Mantener sin cambios — las rutas de fuentes son independientes del DS

### Estrategia de migración para Code
1. Copiar los 7 archivos CSS/SCSS de v2 a `src/assets/poligran/`
2. NO eliminar los archivos v1 todavía — mantenerlos como referencia durante la migración
3. En `angular.json` o `styles.scss`, importar los nuevos archivos v2 ANTES de los v1
4. Actualizar `estilos_generales.scss`, `input_material.scss` y `layouts_poli.scss` variable por variable usando el mapeo anterior
5. Una vez actualizados los 3 archivos, eliminar los imports de `variables_foundation.scss` y `variables_tokens.scss`
6. Verificar que no queden referencias a variables v1 en los componentes

