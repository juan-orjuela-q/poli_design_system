# Semilla Front — Poli Design System v2

Proyecto base (starter) del Politécnico Grancolombiano. Angular 19, standalone components, DS v2.

---

## ¿Cómo consumir este repo?

### Opción A — Solo el Design System (recomendado para apps nuevas)

Próximamente disponible como paquete npm `@poli/ds`. Por ahora, copiar la carpeta `src/app/shared/components/pds-*` a tu proyecto e importar los tokens desde `src/assets/poligran/`.

### Opción B — App starter completa

Clona el repo y elimina el contenido de negocio que no necesites (`src/app/pages/`, rutas específicas, etc.):

```bash
git clone https://github.com/appicua/semilla-front.git mi-nuevo-proyecto
cd mi-nuevo-proyecto
npm install
ng serve
```

---

## Storybook — Catálogo de componentes

```bash
npm run storybook
```

- **DS v2** — Componentes del sistema de diseño v2 con prefijo `pds-`
- **DS v1 (Legacy)** — Componentes del sistema anterior (deprecados, solo para comparación)

El Storybook publicado está disponible en Azure Static Web Apps.

---

## Lint de accesibilidad

```bash
npm run lint
```

Ejecutar antes de hacer PR. Revisa reglas WCAG en los templates Angular (`alt-text`, `label-has-associated-control`, `valid-aria`, etc.).

---

## Tokens de diseño

Los tokens CSS viven en `src/assets/poligran/`. Se generan con Style Dictionary desde el repositorio `poli-tokens`. No editar manualmente.

---

## Documentación

- **Specs de componentes**: `specs/*.md`
- **Guías técnicas**: `docs/`
- **Documentación editorial (Loop)**: enlazada desde las páginas del Storybook
- **Diseño (Figma)**: enlazado desde el plugin Storybook Connect

---

## Scripts principales

| Script | Descripción |
|--------|-------------|
| `npm start` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm test` | Pruebas unitarias |
| `npm run lint` | Lint TypeScript + templates |
| `npm run storybook` | Catálogo de componentes |
| `npm run build-storybook` | Build estático del Storybook |

---

## 🎯 Características Principales

- ✅ **Angular 19** con standalone components
- ✅ **Sistema de diseño** del Politécnico Grancolombiano
- ✅ **Navegación mejorada** con servicios centralizados
- ✅ **Autenticación Azure MSAL**
- ✅ **Responsive design** (mobile y desktop)
- ✅ **Estado reactivo** con Angular Signals

---

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.5.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
