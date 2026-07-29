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
- **pnpm** — gestor de paquetes del repositorio

```bash
pnpm install     # desde la raíz: habilita las cuatro piezas
```

> **Usar pnpm, no npm.** El repositorio es un workspace de pnpm (`pnpm-workspace.yaml`) y la semilla referencia los paquetes internos con `"@poli/components": "workspace:*"`, un protocolo que npm no resuelve. Además, **ejecutar `npm install` en la raíz de un árbol instalado con pnpm deja dos copias de Angular conviviendo** y la semilla deja de compilar. Ver *Gestores de paquetes* al final.

---

## 1. Portal de documentación (Docusaurus)

```bash
pnpm run docs:build    # desde la raíz → genera apps/docs/build/
```

> No ejecutar `npm install` dentro de `apps/docs`. El `pnpm install` de la raíz ya instala sus dependencias como parte del workspace; un `npm install` anidado crearía un segundo `node_modules` con otra copia de React.

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
pnpm run docs:build
```

---

## 2. Librería de componentes (`@poli/components`)

42 componentes Angular 19 standalone con prefijo `pds-`, construidos sobre criterios de accesibilidad WCAG 2.1 AA.

```bash
pnpm run build:lib     # desde la raíz → genera dist/components/
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
  "node_modules/normalize.css/normalize.css",
  "node_modules/@poli/tokens/src/primitives.css",
  "node_modules/@poli/tokens/src/tokens.css",
  "node_modules/@poli/tokens/src/typescale-desktop.css",
  "node_modules/@poli/tokens/src/layout-desktop.css",
  "node_modules/@poli/tokens/src/component.css",
  "node_modules/@poli/tokens/src/component-overrides.css",
  "src/styles.scss"
]
```

#### Tokens mobile — paso obligatorio

El paquete incluye además `layout-mobile.css` y `typescale-mobile.css`, que **no pueden ir en ese array**: sólo deben aplicar por debajo de 768px y el `styles` de Angular no admite media queries. Se cargan desde el `styles.scss` del aplicativo:

```scss
@use 'sass:meta';

@media (max-width: 768px) {
  @include meta.load-css('@poli/tokens/src/layout-mobile');
  @include meta.load-css('@poli/tokens/src/typescale-mobile');
}
```

`meta.load-css` inlina el CSS generado dentro del `@media`, así que los valores siguen viniendo del paquete y no hay que copiarlos a mano.

**Si se omite este paso la app compila y se ve bien en escritorio, pero en móvil conserva los márgenes, gutters y tamaños de fuente de escritorio** (36px de margen lateral en vez de 20px, títulos a 40px en vez de 32px). Es un fallo silencioso: no hay error, sólo un layout desproporcionado en pantallas pequeñas.

#### Reset de estilos

Los componentes declaran su propio `box-sizing`, pero el DS **no aplica un reset global**. El aplicativo debe incluir `normalize.css` (ver el array de arriba) y un reset base en su `styles.scss` — `box-sizing: border-box` heredado, `margin: 0` en `body` y la familia tipográfica base. Ver `apps/semilla-front/src/styles.scss` como referencia.

Peer dependencies que el aplicativo debe tener: `@angular/core`, `@angular/common`, `@angular/forms`, `@angular/cdk`, `@angular/material` (la usa `pds-icon`) y `date-fns` (la usa `pds-date-picker`).

---

## 3. Catálogo de componentes (Storybook)

```bash
pnpm run build-storybook   # desde la raíz → genera apps/storybook/storybook-static/
```

El contenido de `apps/storybook/storybook-static/` es el sitio estático a publicar. No requiere configuración de dominio.

> El script ejecuta `compodoc` automáticamente antes del build. Ese paso genera `documentation.json`, que alimenta las tablas de propiedades de la pestaña *Docs*. Si se invoca el target de Angular directamente sin ese paso, las tablas salen vacías.

---

## 4. Proyecto semilla (`semilla-front`)

Aplicación Angular 19 de referencia. Consume componentes reales de `@poli/components`.

Implementa **dos shells de layout**, que reproducen los dos niveles del ecosistema:

| Ruta | Shell | Contenido |
| ---- | ----- | --------- |
| `/` | `PortalLayoutComponent` — barra superior, **sin** sidenav | Portada del portal: `pds-portal-header` y tarjetas hacia los aplicativos |
| `/home` | `LayoutComponent` — barra superior **+** sidenav | Portada del aplicativo: `pds-app-header` (banner) y tarjetas hacia sus secciones |
| `/showcase/*` | `LayoutComponent` | Tres pantallas de catálogo: componentes, formularios y navegación |
| `/login` | — | Pantalla de acceso |

`apps/semilla-front/src/app/layout/portal-config.ts` centraliza la identidad del portal, la del aplicativo y sus listados. Una sola declaración alimenta el breadcrumb de la barra, el menú móvil y las tarjetas de ambas portadas.

Por debajo de 768px el sidenav se oculta y su navegación pasa al menú de la barra superior, para no ofrecer dos menús para lo mismo.

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

**42 componentes implementados; todos los specs de referencia están cubiertos.** Una salvedad de nomenclatura: el spec `pds-selectable-card` se implementó como **`pds-card`** con los inputs `selectable`/`selected` y `aria-pressed`, no como un componente aparte.

Componentes adicionales no previstos en los specs: `pds-card`, `pds-stat-card`, `pds-time-picker` y `pds-helper-text`.

Los cuatro últimos componentes cubren los layouts de portal y aplicativo, y **no tienen spec en `specs/`** — se implementaron directamente desde Figma:

| Componente | Nodo de Figma | Rol |
| ---------- | ------------- | --- |
| `pds-portal-nav` | `3770:8604` | Barra superior del ecosistema. Breadcrumb Portal Institucional → Portal → App, con menú móvil |
| `pds-portal-header` | `3776:16039` | Encabezado de la portada de un portal, con slot de acciones |
| `pds-app-header` | `3774:2955` | Banner de la portada de un aplicativo (degradado azul) |
| `pds-sidenav-header` | `3142:3116` | Building block de `pds-sidenav`: marca del aplicativo, navegable |

El inventario por fases está en `apps/semilla-front/CLAUDE.md`.

### Cerrar sesión sin sitio en la interfaz

La semilla tenía un header propio dentro del shell con el botón de cerrar sesión. Se eliminó porque duplicaba el avatar y el nombre del aplicativo que ya muestra la barra superior. **La acción `auth.logout()` sigue implementada en `AuthService`, pero ningún control de la interfaz la invoca.**

Su lugar natural es un menú desplegable en el avatar de `pds-portal-nav`, que `pds-avatar-button` todavía no ofrece. Como MSAL está desactivado no afecta hoy, pero **debe resolverse antes de activar la autenticación real**.

### Logotipo de la semilla

`apps/semilla-front/src/assets/images/logo-poli.svg` es un placeholder. El logotipo oficial sí está incorporado en `pds-portal-nav` (embebido en su plantilla), pero ese archivo suelto de la semilla no se reemplazó.

### Deriva entre el showcase y la API de los componentes

Las pantallas de showcase llamaban a seis componentes con inputs que no existen (`label=`, `message=`, `variant=` donde el componente espera `status=`, y contenido proyectado). **Angular no lo detecta**: al escribirse como atributos estáticos, sin corchetes, se tratan como atributos HTML y se ignoran en silencio. El resultado eran componentes renderizados vacíos.

Se corrigió y se verificó que las tres pantallas ya no usan ningún atributo desconocido. Conviene tenerlo presente al conciliar con la v1: si hay otros consumidores escritos contra la API antigua, fallarán igual de silenciosamente. Un binding con corchetes (`[label]="..."`) sí habría roto la compilación.

### Conciliación de componentes v1

El equipo del Poli modificó componentes de la v1 sobre versiones que Appicua no intervino. La v2 entregada aporta mejoras de accesibilidad; la versión del Poli aporta mejoras funcionales. **La conciliación entre ambas queda fuera del alcance de esta entrega** y debe planificarse por separado.

### Sobre los errores `TS2322` en las historias

Si aparecen cientos de errores `TS2322` (*"Type 'string' is not assignable to type 'InputSignal<string>'"*) al construir Storybook, **no busque el problema en los `.stories.ts`**: es el síntoma de haber mezclado npm y pnpm en el mismo árbol. Ver *Gestores de paquetes*. La solución es `rm -rf node_modules && pnpm install`.

### Pipeline de tokens

Los CSS de `packages/tokens/src/` se generan con **Style Dictionary desde un repositorio externo** (`poli_ds_tokens`), que no forma parte de esta entrega. El flujo completo Figma → tokens → CSS está documentado en la página *Workflows* del Storybook. Si el Poli necesita regenerar tokens, requiere acceso a ese repositorio.

### Gestores de paquetes

**Usar pnpm para todo el repositorio.** Las cuatro piezas se verificaron construyendo desde un árbol instalado con `pnpm install`.

Históricamente el repo se construía con npm en la raíz, lo que funcionaba por un motivo frágil: el `node_modules` plano de npm hacía visibles paquetes que **nunca fueron declarados**. Al pasar a la resolución estricta de pnpm salieron a la luz y se declararon: `normalize.css`, `@angular/material` y `date-fns` en la semilla; `@storybook/manager-api` y `@storybook/theming` en la raíz.

> **No mezclar gestores.** Ejecutar `npm install` en la raíz sobre un árbol de pnpm deja dos instalaciones de Angular simultáneas. El síntoma es ruidoso y engañoso: cientos de errores `TS2322` del tipo *"Type 'string' is not assignable to type 'InputSignal<string>'"* en los `.stories.ts`, que **no indican ningún problema en ese código** — son dos identidades distintas del mismo tipo. Con un `pnpm install` limpio, el build de Storybook termina con cero errores.

`package-lock.json` **ya no existe en el repositorio**: los dos workflows de GitHub Actions se migraron a `pnpm install --frozen-lockfile`, así que el lockfile de npm dejó de tener razón de ser y su presencia sólo invitaba a ejecutar `npm install` por error. El único lockfile válido es `pnpm-lock.yaml`.

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

1. `pnpm install --frozen-lockfile` (raíz)
2. `pnpm run build-storybook` → `apps/storybook/storybook-static/`
3. `pnpm run build` en `apps/docs` → `apps/docs/build/`

`.github/workflows/library.yml` construye la librería en cada push y la publica sólo al crear un *release*. Ambos workflows usan Node 20 y pnpm 10.
