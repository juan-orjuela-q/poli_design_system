# Guía de entrega — Poli Design System v2

Documento de handoff para el equipo de DevOps del Politécnico Grancolombiano.
Describe qué se entrega, cómo construir cada pieza y qué queda pendiente.

---

## Qué se entrega

| # | Pieza | Ruta | Tipo | Destino sugerido en Azure |
| - | ----- | ---- | ---- | ------------------------- |
| 1 | Portal de documentación | `apps/docs/` | Sitio estático (Docusaurus) | Azure Static Web Apps |
| 2 | Librería de componentes | `packages/components/` | Paquete npm (Angular) | Azure Artifacts |
| 3 | Catálogo de componentes | `apps/storybook/` | Sitio estático (Storybook) | Azure Static Web Apps |
| 4 | Proyecto semilla | `apps/semilla-front/` | App Angular 19 | App Service / Static Web Apps |

Pieza de apoyo: `packages/tokens/` (`@poli/tokens`) contiene los tokens CSS generados desde Figma. No es un entregable independiente, pero las piezas 2, 3 y 4 dependen de él.

---

## Requisitos

- **Node.js 20**
- **npm** — para las piezas 1, 2 y 3 (es lo que usa el pipeline de CI)
- **pnpm** — necesario **solo** para la pieza 4 (proyecto semilla)

```bash
npm install     # desde la raíz: habilita build:lib, build-storybook y docs
```

> **Por qué dos gestores.** El repositorio es un workspace de pnpm (`pnpm-workspace.yaml`) pero el `package.json` de la raíz no declara `workspaces`, así que npm no conoce los paquetes internos. Las piezas 1-3 no lo necesitan: Storybook y la librería resuelven `@poli/components` por alias de TypeScript y rutas relativas. La semilla sí, porque declara `"@poli/components": "workspace:*"`, un protocolo que **npm no sabe resolver**. Ver la sección *Gestores de paquetes* al final.

---

## 1. Portal de documentación (Docusaurus)

```bash
cd apps/docs
npm install
npm run build          # genera apps/docs/build/
```

El contenido de `apps/docs/build/` es el sitio estático a publicar.

### Configuración obligatoria antes de publicar

Las URLs del portal son configurables por variables de entorno. **Si no se definen, el portal apunta al GitHub Pages de desarrollo de Appicua y los enlaces y assets no funcionarán en el dominio del Poli.**

| Variable | Descripción | Ejemplo |
| -------- | ----------- | ------- |
| `DOCS_URL` | Dominio donde se publica el portal | `https://ds.poli.edu.co` |
| `DOCS_BASE_URL` | Ruta base. Debe empezar y terminar en `/`. Si el portal va en la raíz del dominio, usar `/` | `/` |
| `DOCS_STORYBOOK_URL` | URL pública del Storybook (enlace del navbar) | `https://ds.poli.edu.co/storybook/` |
| `DOCS_REPO_URL` | URL del repositorio (enlace del navbar) | `https://dev.azure.com/poli/...` |

```bash
DOCS_URL="https://ds.poli.edu.co" \
DOCS_BASE_URL="/" \
DOCS_STORYBOOK_URL="https://ds.poli.edu.co/storybook/" \
npm run build
```

---

## 2. Librería de componentes (`@poli/components`)

38 componentes Angular 19 standalone con prefijo `pds-`, construidos sobre criterios de accesibilidad WCAG 2.1 AA.

```bash
npm run build:lib      # desde la raíz → genera dist/components/
```

### Publicación en Azure Artifacts

1. Crear un feed en Azure Artifacts (p. ej. `poli-frontend`).
2. Configurar `.npmrc` en la raíz del repositorio:

   ```ini
   @poli:registry=https://pkgs.dev.azure.com/<organizacion>/_packaging/<feed>/npm/registry/
   always-auth=true
   ```

3. Autenticarse (`vsts-npm-auth` en Windows, o token en variable de entorno en CI).
4. Publicar desde el artefacto construido, **no desde el código fuente**:

   ```bash
   npm run build:lib
   cd dist/components
   npm publish
   ```

> La versión se controla en `packages/components/package.json` (actualmente `2.0.0`). Subirla en cada publicación.
>
> La carpeta a publicar es `dist/components`, definida en `dest` de `packages/components/ng-package.json`. Si se cambia allí, actualizar también `.github/workflows/library.yml`.

### Referencia: publicación automatizada existente

`.github/workflows/library.yml` ya automatiza este flujo contra **GitHub Packages**, y sirve de plantilla para replicarlo en Azure DevOps. Publica sólo al crear un *release* de GitHub; en los push a `master` únicamente construye la librería para validar que compila.

### Consumo desde un aplicativo

```bash
npm install @poli/components @poli/tokens
```

Cargar los tokens CSS en el `styles` array del `angular.json` del aplicativo, **antes** de sus propios estilos:

```json
"styles": [
  "node_modules/@poli/tokens/src/primitives.css",
  "node_modules/@poli/tokens/src/tokens.css",
  "node_modules/@poli/tokens/src/typescale-desktop.css",
  "node_modules/@poli/tokens/src/layout-desktop.css",
  "node_modules/@poli/tokens/src/component.css",
  "node_modules/@poli/tokens/src/component-overrides.css",
  "src/styles.scss"
]
```

Peer dependencies que el aplicativo debe tener: `@angular/core`, `@angular/common`, `@angular/forms`, `@angular/cdk`, `@angular/material` (la usa `pds-icon`) y `date-fns` (la usa `pds-date-picker`).

---

## 3. Catálogo de componentes (Storybook)

```bash
npm run build-storybook    # desde la raíz → genera apps/storybook/storybook-static/
```

El contenido de `apps/storybook/storybook-static/` es el sitio estático a publicar. No requiere configuración de dominio.

> El script ejecuta `compodoc` automáticamente antes del build. Ese paso genera `documentation.json`, que alimenta las tablas de propiedades de la pestaña *Docs*. Si se invoca el target de Angular directamente sin ese paso, las tablas salen vacías.

---

## 4. Proyecto semilla (`semilla-front`)

Aplicación Angular 19 de referencia. Incluye layout autenticado (header + sidenav), login, home y tres pantallas de showcase que consumen componentes reales de `@poli/components`.

```bash
pnpm install                          # desde la RAÍZ del repositorio, no desde apps/semilla-front
cd apps/semilla-front
npm run build:prod                    # genera apps/semilla-front/dist/semilla-front/
```

> Usar `pnpm install` desde la raíz. `npm install` dentro de `apps/semilla-front` **falla**: no resuelve el protocolo `workspace:*` con el que la semilla referencia `@poli/components` y `@poli/tokens`.

### Estado de la autenticación — leer antes de usar

La app implementa autenticación con **Azure Entra ID (MSAL)**, pero está **deliberadamente desactivada** porque Appicua no dispuso de las credenciales del tenant del Poli para configurarla ni probarla.

Qué significa en la práctica:

- La app **arranca y funciona** sin credenciales, mostrando los layouts y componentes. Esto es intencional: permite usarla como referencia visual de inmediato.
- La infraestructura MSAL **está completa**: `msal.config.ts`, `auth.service.ts`, el interceptor de token y los providers en `app.config.ts` están implementados y sin modificar. Las dependencias `@azure/msal-angular` y `@azure/msal-browser` están declaradas.
- Sólo **tres archivos** están en modo stub: `auth.guard.ts` (retorna siempre `true`), `startup.service.ts` (no-op) y `user-profile.service.ts` (datos de ejemplo).

**`apps/semilla-front/RESTAURAR_AUTH.md` contiene el procedimiento exacto**, con el código completo de los tres archivos y los valores a completar en `src/environments/`. Requiere del tenant: Client ID, Tenant ID, redirect URIs y scopes.

> Appicua no pudo validar el flujo de autenticación end-to-end contra un tenant real. El equipo del Poli debe verificarlo al activarlo.

---

## Estructura objetivo del repositorio

Hoy todo vive en un solo repositorio porque así resultó cómodo durante el desarrollo. **La estructura recomendada a mediano plazo son dos repositorios**, alineados a audiencias y ciclos de vida distintos:

| Repositorio | Contenido | Audiencia |
| ----------- | --------- | --------- |
| `poli-design-system` | `packages/tokens`, `packages/components`, `apps/storybook`, `apps/docs`, `src/` (host) | Equipo que mantiene el DS |
| `poli-semilla-front` | La semilla, consumiendo `@poli/components` desde Azure Artifacts | Los equipos de aplicativos |

Por qué así:

- **Tokens, componentes y Storybook cambian juntos.** Tocar un token repercute en un componente y en su historia; mantenerlos en un monorepo evita versionar y sincronizar en cada ajuste menor.
- **La semilla es un *template*.** Debe poder clonarse limpia, sin arrastrar el sistema de diseño completo. Consumir el paquete publicado además **valida que la publicación funciona**, porque la semilla se vuelve el primer cliente real del feed.
- **Elimina la ambigüedad de gestores de paquetes.** `workspace:*` lo usa únicamente la semilla; al extraerla, el repo del DS deja de necesitar pnpm.
- **El portal de docs se queda con el DS**: no tiene ninguna dependencia de código, pero su contenido se actualiza al ritmo de los componentes, y separarlo añadiría un pipeline sin beneficio.

### Requisito previo para separar

La semilla no puede vivir en su propio repositorio hasta que exista el feed de Azure Artifacts con `@poli/components` y `@poli/tokens` publicados: sin él no hay de dónde instalarlos. **Orden sugerido:** crear el feed → publicar los dos paquetes → extraer la semilla aplicando el cambio de `workspace:*` a semver descrito en *Gestores de paquetes*.

---

## Pendientes conocidos

### Cobertura de componentes

**38 componentes implementados; todos los specs de referencia están cubiertos.** Una salvedad de nomenclatura: el spec `pds-selectable-card` se implementó como **`pds-card`** con los inputs `selectable`/`selected` y `aria-pressed`, no como un componente aparte.

Componentes adicionales no previstos en los specs: `pds-card`, `pds-stat-card`, `pds-time-picker` y `pds-helper-text`.

El inventario por fases está en `apps/semilla-front/CLAUDE.md`.

### Conciliación de componentes v1

El equipo del Poli modificó componentes de la v1 sobre versiones que Appicua no intervino. La v2 entregada aporta mejoras de accesibilidad; la versión del Poli aporta mejoras funcionales. **La conciliación entre ambas queda fuera del alcance de esta entrega** y debe planificarse por separado.

### Errores de tipado en las historias de Storybook

Los archivos `.stories.ts` emiten advertencias de TypeScript (`TS2322`) al asignar valores planos a `args` cuando los inputs son `InputSignal`. **No impiden el build ni afectan el sitio publicado**, pero conviene corregirlos. Es una condición preexistente, no introducida en la limpieza de entrega.

### Pipeline de tokens

Los CSS de `packages/tokens/src/` se generan con **Style Dictionary desde un repositorio externo** (`poli_ds_tokens`), que no forma parte de esta entrega. El flujo completo Figma → tokens → CSS está documentado en la página *Workflows* del Storybook. Si el Poli necesita regenerar tokens, requiere acceso a ese repositorio.

### Gestores de paquetes

El repositorio convive con dos lockfiles (`package-lock.json` y `pnpm-lock.yaml`) porque cada mitad usa uno:

| Pieza | Gestor | Motivo |
| ----- | ------ | ------ |
| Portal, librería, Storybook | **npm** | Es lo que ejecuta el CI. Resuelven `@poli/components` por alias de TypeScript y rutas relativas, sin depender de `node_modules`. |
| Semilla | **pnpm** | Declara `"@poli/components": "workspace:*"`; sólo pnpm resuelve ese protocolo y crea los symlinks en `apps/semilla-front/node_modules/@poli/`. |

Unificar en un solo gestor es recomendable pero **no es trivial**: requiere o bien añadir el campo `workspaces` al `package.json` de la raíz y reemplazar los `workspace:*` por rangos semver, o bien migrar el CI a pnpm. Se deja como decisión del Poli para evitar cambios no verificados en la entrega.

**Al extraer la semilla como repositorio independiente** (escenario probable si el Poli parte de su propia versión), reemplazar en `apps/semilla-front/package.json`:

```diff
- "@poli/components": "workspace:*",
- "@poli/tokens": "workspace:*",
+ "@poli/components": "^2.0.0",
+ "@poli/tokens": "^2.0.0",
```

y configurar el `.npmrc` apuntando al feed de Azure Artifacts. A partir de ahí la semilla funciona con npm sin necesidad de pnpm.

---

## Despliegue de referencia

`.github/workflows/storybook.yml` construye y publica Storybook y el portal de documentación en GitHub Pages con cada push a `master`. Sirve como referencia del orden de construcción al migrar el pipeline a Azure DevOps:

1. `npm install` (raíz)
2. `npm run build-storybook` → `apps/storybook/storybook-static/`
3. `npm install && npm run build` en `apps/docs` → `apps/docs/build/`
