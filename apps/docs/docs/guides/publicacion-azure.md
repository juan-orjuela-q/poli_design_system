---
id: publicacion-azure
title: Publicación en Azure Artifacts
sidebar_position: 5
---

# Publicación en Azure Artifacts

Esta guía describe cómo publicar `@poli/components` y `@poli/tokens` en Azure Artifacts y cómo los desarrolladores consumidores deben configurar sus proyectos para usarlos.

Azure Artifacts actúa como un registro npm privado. Publicas los paquetes ahí y los consumidores los instalan como cualquier dependencia npm.

---

## Parte 1 — Configurar Azure Artifacts (una sola vez)

### 1. Crear el feed en Azure DevOps

1. Ve a tu organización en `dev.azure.com/{organización}`
2. **Artifacts** → **Create Feed**
3. Nombre sugerido: `poli-ds` — Visibility: **This organization only**
4. Anota la URL del feed; tendrá la forma:

```
https://pkgs.dev.azure.com/{org}/_packaging/{feed}/npm/registry/
```

### 2. Autenticarte localmente con el feed

Instala el helper de credenciales de Azure:

```powershell
npm install -g vsts-npm-auth
```

Luego autentícate (solo la primera vez o cuando expire el token):

```powershell
vsts-npm-auth -config .npmrc
```

---

## Parte 2 — Configurar el repo para publicar

### 3. Crear `.npmrc` en la raíz del monorepo

```ini
; .npmrc — raíz del monorepo
@poli:registry=https://pkgs.dev.azure.com/{org}/_packaging/poli-ds/npm/registry/
always-auth=true
```

Reemplaza `{org}` con el nombre real de tu organización en Azure DevOps.

### 4. Agregar scripts de publish en `package.json` (raíz)

```json
"scripts": {
  "build:lib": "ng build @poli/components --configuration production",
  "publish:components": "cd dist/components && npm publish",
  "publish:tokens": "cd packages/tokens && npm publish",
  "release": "pnpm build:lib && pnpm publish:components && pnpm publish:tokens"
}
```

### 5. Verificar el `package.json` de la librería compilada

El `ng-packagr` genera el `package.json` en `dist/components/`. Verifica que el campo `name` sea exactamente `@poli/components` y que **no** tenga `"private": true`.

Para `@poli/tokens` el archivo `packages/tokens/package.json` ya está configurado correctamente (`"private": false`).

---

## Parte 3 — Publicar (flujo por release)

```powershell
# 1. Bump de versión en ambos paquetes (deben tener siempre la misma versión)
npm version minor --workspace=packages/components
npm version minor --workspace=packages/tokens

# 2. Build de la librería Angular
ng build @poli/components --configuration production

# 3. Publicar tokens (no requiere build, son archivos CSS estáticos)
cd packages/tokens
npm publish

# 4. Publicar componentes (desde el artefacto generado por ng-packagr)
cd ../../dist/components
npm publish
```

:::tip Versiona siempre los dos paquetes juntos
`@poli/tokens` y `@poli/components` deben tener el mismo número de versión para evitar incompatibilidades entre tokens y componentes.
:::

---

## Parte 4 — Pipeline CI/CD en Azure DevOps (recomendado)

Crea `azure-pipelines.yml` en la raíz del repositorio:

```yaml
trigger:
  branches:
    include:
      - main
  paths:
    include:
      - packages/**

pool:
  vmImage: 'ubuntu-latest'

steps:
  - task: NodeTool@0
    inputs:
      versionSpec: '20.x'

  - task: npmAuthenticate@0
    inputs:
      workingFile: .npmrc

  - script: npm install -g pnpm
    displayName: 'Instalar pnpm'

  - script: pnpm install --frozen-lockfile
    displayName: 'Instalar dependencias'

  - script: pnpm build:lib
    displayName: 'Build @poli/components'

  - script: |
      cd dist/components && npm publish
    displayName: 'Publicar @poli/components'

  - script: |
      cd packages/tokens && npm publish
    displayName: 'Publicar @poli/tokens'
```

---

## Parte 5 — Cómo lo usan los desarrolladores

### 1. Configurar `.npmrc` en el proyecto consumidor

Añade este archivo en la raíz del proyecto Angular del desarrollador (una sola vez por proyecto):

```ini
; .npmrc
@poli:registry=https://pkgs.dev.azure.com/{org}/_packaging/poli-ds/npm/registry/
always-auth=true
```

### 2. Autenticarse

```powershell
vsts-npm-auth -config .npmrc
```

O de forma manual: en Azure DevOps → User Settings → **Personal Access Tokens** → crear token con scope **Packaging (Read)**. Luego añadirlo al `.npmrc`:

```ini
//pkgs.dev.azure.com/{org}/_packaging/poli-ds/npm/registry/:_authToken={PAT}
```

:::caution Seguridad
No commitees el token PAT al repositorio. Guárdalo solo en el archivo `.npmrc` local (añade `.npmrc` al `.gitignore` si contiene el token) o usa variables de entorno en el pipeline de CI.
:::

### 3. Instalar los paquetes

```bash
npm install @poli/components @poli/tokens
# o con pnpm:
pnpm add @poli/components @poli/tokens
```

### 4. Instalar peer dependencies

Si el proyecto no tiene `@angular/cdk` instalado:

```bash
npm install @angular/cdk@^19.2.0
```

### 5. Cargar los tokens CSS en `angular.json`

```json
"styles": [
  "node_modules/@poli/tokens/src/primitives.css",
  "node_modules/@poli/tokens/src/tokens.css",
  "node_modules/@poli/tokens/src/typescale-desktop.css",
  "node_modules/@poli/tokens/src/layout-desktop.css",
  "node_modules/@poli/tokens/src/component.css",
  "src/styles.scss"
]
```

### 6. Usar los componentes en Angular

Importa cada componente directamente en tu componente standalone:

```typescript
import { PdsButtonComponent } from '@poli/components';

@Component({
  standalone: true,
  imports: [PdsButtonComponent],
  template: `<pds-button variant="primary">Guardar</pds-button>`
})
export class MiComponente {}
```

---

## Resumen del flujo completo

```
Desarrollador DS → git push a main
        ↓
Azure Pipelines: build + npm publish → Azure Artifacts (feed poli-ds)
        ↓
Desarrollador consumidor: npm install @poli/components@2.x.x
```
