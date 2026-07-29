# CLAUDE.md — Monorepo Poli Design System v2

Contexto del monorepo para Claude Code. Leer antes de cualquier acción.

Para las **convenciones de los componentes DS v2** (naming, signals, accesibilidad, tokens, patrones consolidados y hoja de ruta), ver [`apps/semilla-front/CLAUDE.md`](apps/semilla-front/CLAUDE.md).

---

## Qué es este repositorio

Monorepo **pnpm workspaces** (`pnpm-workspace.yaml` → `packages/*`, `apps/*`) del Design System v2 del Politécnico Grancolombiano, desarrollado por Appicua.

| Ruta                   | Paquete               | Rol                                                                        |
| ---------------------- | --------------------- | -------------------------------------------------------------------------- |
| `packages/components/` | `@poli/components`    | Librería de componentes `pds-*`. **Aquí se desarrollan los componentes.**   |
| `packages/tokens/`     | `@poli/tokens`        | Tokens CSS. Fuente única de verdad. Generados externamente — no editar.     |
| `apps/semilla-front/`  | `@poli/semilla-front` | Proyecto base para aplicativos nuevos. Consume `@poli/components`.          |
| `apps/docs/`           | `@poli/docs`          | Portal de documentación (Docusaurus).                                       |
| `apps/storybook/`      | —                     | Config de Storybook (`.storybook/`). No tiene `package.json` propio.        |
| `src/`                 | —                     | Host de Storybook + páginas de Foundations. **No es una app desplegable.**  |
| `scripts/`             | —                     | Utilidades de tokens y documentación.                                       |

---

## Puntos no obvios de la arquitectura

### `src/` es el host de Storybook, no una app

`@storybook/angular` exige un `browserTarget` de Angular CLI para resolver tsconfig, estilos y providers. Ese target es el proyecto **`storybook-host`** de `angular.json`, y `src/` es su código mínimo: `main.ts`, `index.html`, un `AppComponent` vacío y `styles.scss`.

**No agregar páginas, rutas ni lógica de negocio a `src/`.** Si algo debe verse en un aplicativo, va en `apps/semilla-front/`.

La excepción es `src/stories/foundations/`: son las páginas de Foundations (Color, Typography, Effects, Workflows) que sí se publican en Storybook.

### `documentation.json` es generado, no versionado

Las tablas de props de la pestaña *Docs* de Storybook se alimentan de `documentation.json`, generado por compodoc con `tsconfig.doc.json` (que apunta a `packages/components/src/`, **no** a `src/`).

Los scripts `storybook` y `build-storybook` ejecutan `npm run compodoc` automáticamente antes del build. Si se corre el target de Angular directamente (`ng run storybook-host:build-storybook`), hay que generar el JSON primero o las tablas salen vacías.

### Los tokens tienen una sola fuente

`packages/tokens/src/*.css`. Se generan con Style Dictionary en el repositorio externo `poli-tokens` y se copian aquí. Cada consumidor los carga por su propia vía:

- Semilla → `node_modules/@poli/tokens/src/*.css` (resuelto por workspace)
- Storybook → `packages/tokens/src/*.css` (ruta relativa en `angular.json`)

---

## Despliegue

`.github/workflows/storybook.yml` publica en GitHub Pages con cada push a `master`: Storybook en la raíz del sitio y Docusaurus bajo `/docs/`. `docs.yml` está deshabilitado (solo `workflow_dispatch`) — el despliegue de docs va por el workflow unificado.

---

## Trabajo pendiente conocido

- **Autenticación de la semilla**: MSAL está deliberadamente stubbeado (`authGuard` retorna `true`, `startup.service` es no-op) a la espera de credenciales del tenant Azure. Ver `apps/semilla-front/RESTAURAR_AUTH.md`.
- **Conciliación v1 ↔ v2**: el equipo del Poli modificó componentes v1 sobre versiones que Appicua no intervino. La conciliación entre las mejoras de accesibilidad (v2) y las funcionales (Poli) queda para después de la entrega.

---

## Lo que NO hacer

- No agregar código de negocio a `src/` — es solo el host de Storybook
- No editar `packages/tokens/src/*.css` a mano — se regeneran
- No versionar `documentation.json` — está en `.gitignore`
- No hardcodear valores CSS — siempre tokens (con fallback si el token aún no existe)
- No usar `@Input()` en componentes v2 — usar `input()` signal
- No tocar `fuentes.scss`
- No usar `outline: none` sin `box-shadow` de reemplazo para el focus
