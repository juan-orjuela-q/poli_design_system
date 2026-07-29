# Poli Design System v2 — Monorepo

Sistema de diseño y proyecto semilla del **Politécnico Grancolombiano**. Angular 19, standalone components, tokens generados desde Figma.

Monorepo gestionado con **pnpm workspaces** (`pnpm-workspace.yaml`).

> **¿Vas a publicar esto en Azure?** Ver [`ENTREGA.md`](ENTREGA.md) — guía de handoff con el detalle de construcción y configuración de cada pieza.

---

## Estructura

| Ruta                   | Paquete              | Qué es                                                                             |
| ---------------------- | -------------------- | ---------------------------------------------------------------------------------- |
| `packages/components/` | `@poli/components`   | Librería de componentes DS v2 (`pds-*`). Se publica con ng-packagr.                 |
| `packages/tokens/`     | `@poli/tokens`       | Tokens CSS generados con Style Dictionary. **Fuente única de verdad** de los tokens. |
| `apps/semilla-front/`  | `@poli/semilla-front` | Proyecto base (starter) para aplicativos nuevos. Consume `@poli/components`.        |
| `apps/docs/`           | `@poli/docs`         | Portal de documentación (Docusaurus).                                               |
| `apps/storybook/`      | —                    | Configuración de Storybook (catálogo de componentes).                               |
| `src/`                 | —                    | **Host de Storybook.** No es una app desplegable — ver nota abajo.                   |
| `scripts/`             | —                    | Utilidades de tokens y documentación (`sync-tokens`, `audit-contrast`).             |

### Sobre `src/` (host de Storybook)

`@storybook/angular` necesita un `browserTarget` de Angular CLI para resolver tsconfig, estilos globales y providers al renderizar las historias. Ese target es el proyecto **`storybook-host`** definido en `angular.json`, y `src/` es su código mínimo (`main.ts`, `index.html`, un `AppComponent` vacío, `styles.scss` y las fuentes).

`src/stories/foundations/` sí es contenido real: son las páginas de **Foundations** (Color, Typography, Effects, Workflows) que se publican en Storybook.

> `src/` no se despliega en ningún ambiente. Para el proyecto semilla, ver `apps/semilla-front/`.

---

## Instalación

```bash
pnpm install
```

---

## Scripts principales

| Script                    | Descripción                                                          |
| ------------------------- | -------------------------------------------------------------------- |
| `pnpm run build:lib`       | Build de `@poli/components` (ng-packagr → `dist/components`)          |
| `pnpm run storybook`       | Storybook en modo dev (`localhost:6006`)                              |
| `pnpm run build-storybook` | Build estático de Storybook → `apps/storybook/storybook-static`       |
| `pnpm run compodoc`        | Genera `documentation.json` (metadatos para las tablas de props)      |
| `pnpm run semilla:start`   | Servidor de desarrollo de la semilla                                  |
| `pnpm run semilla:build`   | Build de la semilla                                                   |
| `pnpm run docs:start`      | Portal Docusaurus en modo dev                                         |
| `pnpm run docs:build`      | Build del portal Docusaurus                                           |
| `pnpm run tokens:sync`     | Regenera `packages/tokens/tokens.json` desde los CSS                  |
| `pnpm run tokens:audit`    | Auditoría de contraste de color (WCAG)                                |
| `pnpm run lint`            | Lint TS + templates de la librería de componentes                     |
| `pnpm test`                | Pruebas unitarias de `@poli/components`                               |

`pnpm run storybook` y `pnpm run build-storybook` ejecutan `compodoc` automáticamente antes del build: sin ese paso las tablas de props de la pestaña *Docs* quedan vacías.

---

## Despliegue

`.github/workflows/storybook.yml` publica en **GitHub Pages** con cada push a `master`:

- Storybook en la raíz del sitio
- Portal Docusaurus bajo `/docs/`

---

## Tokens de diseño

Los CSS de `packages/tokens/src/` se generan con **Style Dictionary** desde el repositorio externo `poli-tokens`. **No editarlos manualmente.** El flujo completo está documentado en la página *Workflows* de Storybook.

---

## Documentación

- **Catálogo de componentes**: Storybook
- **Guías y portal editorial**: `apps/docs/`
- **Convenciones de componentes DS v2**: [`apps/semilla-front/CLAUDE.md`](apps/semilla-front/CLAUDE.md)
- **Specs de componentes**: `specs/*.md`
