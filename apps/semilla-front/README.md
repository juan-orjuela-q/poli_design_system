# Semilla Front — Angular 19 + DS v2

Proyecto plantilla del Politécnico Grancolombiano. Base para todos los aplicativos del ecosistema Poli.

## Stack

- Angular 19 (standalone components, signals)
- `@poli/components` v2 — Design System Poli
- MSAL / Entra ID — autenticación corporativa
- ngx-translate — internacionalización (es/en/de)
- Angular CDK

## Prerrequisitos

- Node 20+
- npm 10+ (o pnpm 11+)
- Acceso al feed de GitHub Packages `@poli` (solicitar token a tu lead)

## Configuración inicial

1. Crear un `.npmrc` en la raíz del proyecto con tu token:

```
@poli:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=TU_TOKEN_AQUI
```

2. Instalar dependencias:

```bash
npm install
```

3. Copiar y editar las variables de entorno:

```bash
cp src/environments/environment.ts src/environments/environment.local.ts
# Editar environment.local.ts con el clientId y tenantId de tu aplicativo
```

## Scripts

```bash
npm start          # Servidor de desarrollo (http://localhost:4200)
npm run build      # Build producción
npm run build:prod # Build con configuration=production
npm test           # Tests unitarios
```

## Estructura

```
src/
  app/
    core/auth/          ← MSAL config, auth guard, auth service
    pages/
      login/            ← Pantalla de login
      home/             ← Home protegida (ejemplo)
      not-found/        ← 404
  assets/
    i18n/               ← Traducciones (es.json, en.json, de.json)
  environments/         ← environment.ts (plantilla) + environment.prod.ts
```

## Autenticación

El proyecto usa MSAL Angular v3 con Entra ID. Los placeholders `YOUR_CLIENT_ID` y `YOUR_TENANT_ID` en `src/environments/environment.ts` deben reemplazarse con los valores de tu app registration en Azure.

Ver [docs/entra-id-token-management.md](https://poli-design-system.github.io) para más detalles.

## Consumo del Design System

Los componentes están disponibles directamente desde `@poli/components`:

```typescript
import { PdsButtonComponent } from '@poli/components';
```

Los tokens CSS se cargan automáticamente desde `@poli/tokens` (ver `angular.json`).
