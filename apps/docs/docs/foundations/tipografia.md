# Tipografía

El Design System v2 usa dos familias tipográficas con roles bien diferenciados.

## Familias tipográficas

| Variable CSS | Fuente | Uso |
|--------------|--------|-----|
| `--text-component` | **Poppins** | Etiquetas, botones, tags, badges, campos de formulario |
| `--text-body` | **Open Sans** | Cuerpo de texto, tooltips, notificaciones, tablas |
| `--input-font-label` | Poppins | Labels y helper text de formularios |
| `--input-font-main` | Open Sans | Texto dentro de inputs y selects |

Las fuentes se cargan desde `src/assets/fonts/` (autoalojadas) a través de `fuentes.scss`.

## Escala tipográfica desktop (`typescale-desktop.css`)

### Tamaños de fuente

| Token | Valor | Uso típico |
|-------|-------|------------|
| `--font-size-f-xs` | `0.75rem` (12px) | Textos muy pequeños, contadores |
| `--font-size-f-sm` | `0.875rem` (14px) | Labels, helper text |
| `--font-size-f-base` | `1rem` (16px) | Cuerpo de texto |
| `--font-size-f-lg` | `1.125rem` (18px) | Subtítulos |
| `--font-size-f-xl` | `1.25rem` (20px) | Títulos de sección |
| `--font-size-f-2xl` | `1.5rem` (24px) | Títulos de página |

### Tamaños específicos de componentes

| Token | Valor | Componente |
|-------|-------|------------|
| `--font-size-component-tag` | `0.875rem` | `pds-tag`, `pds-badge` |
| `--font-size-component-accordion-title` | `1.25rem` | `pds-accordion` |
| `--font-size-component-card-title` | `1.25rem` | `pds-card` |
| `--font-size-component-sidenav-title` | `1.25rem` | `pds-sidenav` (título app) |
| `--font-size-component-sidenav-subtitle` | `0.875rem` | `pds-sidenav` (subtítulo) |

### Pesos de fuente

| Token | Valor | Uso |
|-------|-------|-----|
| `--font-weight-w-regular` | `400` | Cuerpo de texto |
| `--font-weight-w-medium` | `500` | Labels secundarios |
| `--font-weight-w-semibold` | `600` | Labels, botones, tags |
| `--font-weight-w-bold` | `700` | Títulos destacados |

### Interlineado

| Token | Valor |
|-------|-------|
| `--line-height-lh-tight` | `1.2` |
| `--line-height-lh-base` | `1.5` |
| `--line-height-lh-loose` | `1.75` |

## Overrides mobile

Para pantallas ≤ 768px, `src/styles.scss` redefine los tamaños base:

```scss
@media (max-width: 768px) {
  :root {
    --font-size-f-base: 0.875rem;
    --font-size-f-lg: 1rem;
    // ...
  }
}
```

También existen archivos `typescale-mobile.css` y `layout-mobile.css` en `src/assets/poligran/` para los tokens específicos mobile.

## Patrón de tipografía en componentes

```scss
// Etiqueta de componente (tag, badge, botón)
font-family: var(--text-component, Poppins);
font-size: var(--font-size-component-tag, 14px);
font-weight: var(--font-weight-w-semibold, 600);
line-height: 1;
letter-spacing: 0.28px;

// Label de formulario
font-family: var(--input-font-label, Poppins);
font-size: var(--font-size-f-sm);
font-weight: var(--font-weight-w-semibold);
line-height: var(--line-height-lh-base);
```
