# Configuración de Azure Static Web Apps para Angular

Esta guía documenta la configuración necesaria para desplegar una aplicación Angular en Azure Static Web Apps usando Azure DevOps Pipelines.

## Requisitos Previos

- Aplicación Angular 17+
- Repositorio en Azure DevOps
- Azure Static Web App creado en Azure Portal
- Token de API de Azure Static Web Apps

## Estructura del Proyecto

```
proyecto/
├── src/
│   ├── environments/
│   │   ├── environment.ts          # Desarrollo
│   │   ├── environment.qa.ts       # QA
│   │   └── environment.prod.ts     # Producción
│   └── staticwebapp.config.json    # Configuración de rutas
├── angular.json
└── azure-static-web-apps-{nombre}.yml
```

## Paso 1: Configurar `staticwebapp.config.json`

Crear el archivo `src/staticwebapp.config.json`:

```json
{
  "navigationFallback": {
    "rewrite": "/index.html"
  }
}
```

Este archivo asegura que todas las rutas del lado del cliente redirijan a `index.html`, evitando errores 404.

## Paso 2: Incluir `staticwebapp.config.json` en Assets

Editar `angular.json` para incluir el archivo de configuración en el build:

```json
{
  "projects": {
    "tu-proyecto": {
      "architect": {
        "build": {
          "options": {
            "assets": [
              {
                "glob": "**/*",
                "input": "public"
              },
              "src/favicon.ico",
              "src/assets",
              "src/staticwebapp.config.json"  // ← Agregar esta línea
            ]
          }
        }
      }
    }
  }
}
```

## Paso 3: Configurar Presupuestos de Build

En `angular.json`, ajustar los límites de presupuesto según las necesidades del proyecto:

```json
{
  "budgets": [
    {
      "type": "initial",
      "maximumWarning": "1.3MB",
      "maximumError": "2MB"
    },
    {
      "type": "anyComponentStyle",
      "maximumWarning": "10kB",
      "maximumError": "12kB"
    }
  ]
}
```

## Paso 4: Crear Pipeline de Azure DevOps

Crear el archivo `azure-static-web-apps-{nombre}.yml` en la raíz del proyecto:

```yaml
name: Azure Static Web Apps CI/CD

pr:
  branches:
    include:
      - dev  # Cambiar según la rama objetivo

trigger:
  branches:
    include:
      - dev  # Cambiar según la rama objetivo

jobs:
- job: build_and_deploy_job
  displayName: Build and Deploy Job
  condition: or(eq(variables['Build.Reason'], 'Manual'),or(eq(variables['Build.Reason'], 'PullRequest'),eq(variables['Build.Reason'], 'IndividualCI')))
  pool:
    vmImage: ubuntu-latest
  variables:
  - group: Azure-Static-Web-Apps-{nombre}-variable-group  # Crear en Azure DevOps
  
  steps:
  - checkout: self
    submodules: true
  
  # Instalar Node.js
  - task: NodeTool@0
    inputs:
      versionSpec: '18.x'
    displayName: 'Install Node.js'

  # Instalar dependencias y compilar
  - script: |
      npm install
      npm run build -- --configuration=development
    displayName: 'Install dependencies and build'

  # Desplegar a Azure Static Web Apps
  - task: AzureStaticWebApp@0
    inputs:
      azure_static_web_apps_api_token: $(AZURE_STATIC_WEB_APPS_API_TOKEN_{NOMBRE})
      skip_app_build: true
      app_location: "dist/base-project/browser"  # Ajustar según el nombre del proyecto
      api_location: ""
      output_location: ""
```

## Configuraciones por Ambiente

### Desarrollo (DEV)
```bash
npm run build -- --configuration=development
```
Usa: `src/environments/environment.ts`

### QA
```bash
npm run build -- --configuration=qa
```
Usa: `src/environments/environment.qa.ts`

### Producción (PROD)
```bash
npm run build -- --configuration=production
```
Usa: `src/environments/environment.prod.ts`

## Paso 5: Configurar Variables en Azure DevOps

1. Ir a **Pipelines** → **Library** → **Variable groups**
2. Crear un grupo de variables con el nombre especificado en el YAML
3. Agregar la variable:
   - Nombre: `AZURE_STATIC_WEB_APPS_API_TOKEN_{NOMBRE}`
   - Valor: Token obtenido del Azure Portal (marcar como secreto)

## Paso 6: Obtener el Token de API

1. Ir al Azure Portal
2. Navegar al recurso de Azure Static Web Apps
3. En el menú lateral, seleccionar **Deployment tokens**
4. Copiar el token de deployment

## Paso 7: Crear y Configurar el Pipeline

1. En Azure DevOps, ir a **Pipelines** → **New Pipeline**
2. Seleccionar **Azure Repos Git**
3. Seleccionar el repositorio
4. Seleccionar **Existing Azure Pipelines YAML file**
5. Seleccionar el archivo `azure-static-web-apps-{nombre}.yml`
6. Ejecutar el pipeline

## Configuración de Output Location

El `output_location` debe coincidir con la estructura de build de Angular:

```
dist/
└── {nombre-proyecto}/
    └── browser/
        ├── index.html
        ├── main.js
        └── ...
```

Para verificar el nombre del proyecto, revisar `angular.json`:

```json
{
  "projects": {
    "nombre-proyecto": {  // ← Este es el nombre a usar
      "architect": {
        "build": {
          "options": {
            "outputPath": "dist/nombre-proyecto"
          }
        }
      }
    }
  }
}
```

## Solución de Problemas Comunes

### Error: "npm ci requires package-lock.json"

**Problema:** El proyecto no tiene `package-lock.json`

**Solución:** Cambiar `npm ci` por `npm install` en el pipeline

### Error: "Failed to find a default file (index.html)"

**Problema:** El `app_location` no apunta a la carpeta correcta

**Solución:** 
- Usar `app_location: "dist/{nombre-proyecto}/browser"`
- Dejar `output_location: ""`
- Agregar `skip_app_build: true`

### Error 404 en rutas de Angular

**Problema:** No se copió `staticwebapp.config.json` al build

**Solución:** Verificar que el archivo esté incluido en `assets` del `angular.json`

### Error: "Budget exceeded"

**Problema:** El bundle supera los límites configurados

**Solución:** Aumentar los límites en `budgets` dentro de `angular.json`

## Múltiples Ambientes

Para manejar múltiples ambientes (DEV, QA, PROD), crear pipelines separados:

### Pipeline DEV
```yaml
trigger:
  branches:
    include:
      - dev

- script: |
    npm run build -- --configuration=development
```

### Pipeline QA
```yaml
trigger:
  branches:
    include:
      - qa

- script: |
    npm run build -- --configuration=qa
```

### Pipeline PROD
```yaml
trigger:
  branches:
    include:
      - main

- script: |
    npm run build -- --configuration=production
```

## Verificación del Deployment

1. Una vez completado el pipeline, verificar en Azure Portal:
   - Estado del deployment
   - URL de la aplicación
   - Logs de build

2. Probar las rutas principales de la aplicación

3. Verificar que las variables de entorno sean las correctas usando las Dev Tools del navegador

## Recursos Adicionales

- [Documentación oficial de Azure Static Web Apps](https://docs.microsoft.com/en-us/azure/static-web-apps/)
- [Angular Deployment Guide](https://angular.io/guide/deployment)
- [Azure DevOps Pipelines](https://docs.microsoft.com/en-us/azure/devops/pipelines/)

## Checklist de Configuración

- [ ] Crear `staticwebapp.config.json` en `src/`
- [ ] Incluir `staticwebapp.config.json` en assets de `angular.json`
- [ ] Ajustar presupuestos de build en `angular.json`
- [ ] Crear archivo YAML del pipeline
- [ ] Verificar el nombre del proyecto en `angular.json`
- [ ] Actualizar `app_location` con la ruta correcta
- [ ] Configurar variables en Azure DevOps
- [ ] Obtener y guardar el token de API
- [ ] Crear el pipeline en Azure DevOps
- [ ] Ejecutar y verificar el deployment
- [ ] Probar todas las rutas de la aplicación
