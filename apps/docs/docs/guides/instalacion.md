---
id: instalacion
title: Instalación
sidebar_position: 1
---

# Instalación

## 1. Instalar paquetes

```bash
npm install @poli/tokens @poli/components
```

## 2. Agregar tokens CSS en `angular.json`

En la sección `styles` de tu proyecto:

```json
"styles": [
  "node_modules/@poli/tokens/src/primitives.css",
  "node_modules/@poli/tokens/src/tokens.css",
  "node_modules/@poli/tokens/src/typescale-desktop.css",
  "node_modules/@poli/tokens/src/layout-desktop.css",
  "node_modules/@poli/tokens/src/component.css",
  "node_modules/@poli/tokens/src/component-overrides.css"
]
```

## 3. Registrar fuentes en `styles.scss`

```scss
@use '@poli/tokens/fonts/poppins/poppins.css';
@use '@poli/tokens/fonts/open-sans/open-sans.css';
```

## 4. Usar componentes

Los componentes son standalone — impórtalos directamente en tu componente:

```typescript
import { PdsButtonComponent } from '@poli/components';

@Component({
  imports: [PdsButtonComponent],
  template: `<pds-button variant="primary">Acción</pds-button>`
})
export class MiComponente {}
```
