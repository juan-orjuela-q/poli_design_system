# Guía de mantenimiento de Design Tokens

Este documento explica cómo se generan los archivos CSS y SCSS a partir de los JSON exportados desde Figma Variables, y qué hacer ante los cambios más comunes.

---

## Estructura del proyecto

```
poli_ds_tokens/
├── tokens/                        ← archivos fuente (NO editar a mano)
│   ├── 00-primitives/
│   │   └── primitives.json        → dist/primitives.css + primitives.scss
│   ├── 01-typescale/
│   │   ├── typescale-desktop.json → dist/typescale-desktop.css + .scss
│   │   └── typescale-mobile.json  → dist/typescale-mobile.css + .scss
│   ├── 02-color/
│   │   └── color.json             → dist/tokens.css + tokens.scss
│   ├── 03-layout/
│   │   ├── layout-desktop.json    → dist/layout-desktop.css + .scss
│   │   └── layout-mobile.json     → dist/layout-mobile.css + .scss
│   └── 04-component/
│       └── component.json         → dist/component.css + .scss
├── dist/                          ← archivos generados (NO versionar si se usa CI)
├── build.mjs                      ← script de transformación (Style Dictionary v4)
└── package.json
```

Los archivos de `dist/` son **generados automáticamente**. No se deben editar a mano; cualquier cambio manual se perderá en el próximo build.

---

## Cómo generar los archivos

### Requisitos previos

- Node.js ≥ 18
- Dependencias instaladas (`npm install`, solo hace falta hacerlo una vez)

### Comando de build

```bash
npm run build
```

Esto ejecuta `node build.mjs` y regenera todos los archivos en `dist/`.

---

## Cómo exportar desde Figma

1. Abrir el archivo de Figma del Design System.
2. Ir al exportador nativo de Figma Variables.
3. Exportar en formato **W3C / JSON** cada colección por separado.
4. Reemplazar el archivo `.json` correspondiente en la carpeta `tokens/` del proyecto.
5. Ejecutar `npm run build`.

> El exportador de Figma genera valores de color como objetos `{ colorSpace, components, alpha, hex }`. El script de build extrae automáticamente el `hex` y convierte colores con opacidad a `rgba()`.

---

## Convenciones de nombres

| En Figma | En CSS/SCSS |
|---|---|
| Separador `/` en el nombre de la variable | Guión `-` |
| `surface/neutral/canvas` | `--surface-neutral-canvas` / `$surface-neutral-canvas` |
| Mayúsculas en camelCase | Convertidas a kebab-case |
| `sidenavOpen` | `--component-sidenav-open` |

---

## Reglas de transformación de valores

| Tipo de token | Criterio de detección | Valor resultante |
|---|---|---|
| Color opaco | `$type: color` + `hex` | `#rrggbb` en minúsculas |
| Color con transparencia | `$type: color` + `alpha < 1` | `rgba(r, g, b, a)` |
| Tipografía / font-size | Scope Figma `FONT_SIZE` o path `typography.size.*` / `font-size.*` | `px → rem` (base 16px) |
| Espaciado y radio (primitivos) | Path `spacing.*` o `radius.*` | número → `px` |
| Dimensiones, bordes, gaps | Scope Figma `WIDTH_HEIGHT`, `STROKE_FLOAT`, `CORNER_RADIUS`, `GAP` | número → `px` |
| Opacidad | Path `opacity.*` | escala 0-100 → 0-1 |
| Familia tipográfica, otros `string` | `$type: string` | valor literal sin cambios |

---

## Escenarios de cambio en Figma

### 1. Se modifica el valor de una variable existente

**Ejemplo:** el color `color/neutral/gray-500` cambia de `#627380` a `#5e6f7c`.

**Qué hacer:**

1. Exportar el JSON de la colección afectada desde Figma.
2. Reemplazar el archivo en `tokens/`.
3. Ejecutar `npm run build`.

No es necesario tocar `build.mjs`. El script extrae el `.hex` automáticamente.

---

### 2. Se agrega una nueva variable dentro de una colección existente

**Ejemplo:** se agrega `color/neutral/gray-25` a los primitivos, o un nuevo token semántico `surface/neutral/elevated` en la colección de color.

**Qué hacer:**

1. Exportar el JSON de la colección afectada.
2. Reemplazar el archivo en `tokens/`.
3. Ejecutar `npm run build`.

El nuevo token aparece automáticamente en el archivo CSS/SCSS correspondiente. No se requiere ningún cambio en `build.mjs`.

**Verificar** que el tipo de dato del nuevo token esté correctamente configurado en Figma:
- Si es color → scope no importa; se detecta por `$type: color`.
- Si es un número de dimensión → asignar scope `WIDTH_HEIGHT`, `CORNER_RADIUS`, `GAP` o `STROKE_FLOAT` según corresponda, para que reciba la unidad `px`.
- Si es font-size → asignar scope `FONT_SIZE` para que se convierta a `rem`.
- Si es opacidad y debe quedar en escala 0-1 → el path del token debe empezar con `opacity`.

---

### 3. Se elimina una variable existente

**Qué hacer:**

1. Exportar el JSON actualizado desde Figma.
2. Reemplazar el archivo en `tokens/`.
3. Ejecutar `npm run build`.

El token desaparece del `dist/`. **Revisar** que ningún componente o archivo de estilos del proyecto lo esté usando antes de hacer el reemplazo.

---

### 4. Se crea una nueva colección en Figma *(caso poco frecuente)*

**Ejemplo:** se crea una nueva colección llamada `05-motion` con tokens de duración y easing de animaciones.

Este escenario requiere un cambio en `build.mjs` para incorporar el nuevo archivo al proceso de build.

**Pasos:**

1. Exportar el JSON de la nueva colección desde Figma.
2. Guardar el archivo en una nueva carpeta dentro de `tokens/`, siguiendo la convención de numeración:
   ```
   tokens/
   └── 05-motion/
       └── motion.json
   ```
3. Abrir `build.mjs` y agregar un nuevo bloque `buildSet` al final de la sección de builds, **antes** de la línea `console.log('✅ Build completo...')`:

   ```js
   await buildSet({
     source: ['tokens/05-motion/motion.json'],
     cssFile: 'motion.css',
     scssFile: 'motion.scss',
   });
   ```

4. Si los tokens de la nueva colección tienen un tipo de dato que aún no tiene regla de transformación (por ejemplo, duración en milisegundos), agregar un nuevo transform en `build.mjs`:

   ```js
   // Ejemplo: duración en ms → string con unidad
   StyleDictionary.registerTransform({
     name: 'figma/duration-ms',
     type: 'value',
     filter: (token) =>
       token.$type === 'number' && token.path?.[0] === 'duration',
     transform: (token) => `${token.$value}ms`,
   });
   ```

   Y añadir `'figma/duration-ms'` al array del `registerTransformGroup('figma/css', ...)`.

5. Ejecutar `npm run build`.

---

### 5. Se divide una colección en dos *(caso poco frecuente)*

**Ejemplo:** la colección `04-component` se divide en `04-component-size` y `05-component-tokens`.

**Pasos:**

1. Exportar los dos nuevos JSON desde Figma.
2. Guardar cada uno en su carpeta dentro de `tokens/`.
3. En `build.mjs`, reemplazar el `buildSet` del archivo original por dos nuevos `buildSet`, uno por cada archivo.
4. Ejecutar `npm run build`.
5. Eliminar el archivo JSON anterior de `tokens/` y el CSS/SCSS correspondiente de `dist/` si ya no se necesita. **Avisar al equipo** antes de eliminar archivos de `dist/` para que actualicen sus imports.

---

## Solución de problemas frecuentes

### Un token aparece sin unidad (número crudo)

El token tiene un tipo `number` en Figma pero su **scope no está configurado** correctamente.

Solución en Figma: abrir la variable → en el panel de scopes, asignar el scope correcto (`WIDTH_HEIGHT`, `GAP`, `FONT_SIZE`, etc.).

Solución temporal en `build.mjs`: agregar el path del token al filtro del transform correspondiente.

### Un color aparece como objeto `[object Object]`

El exportador de Figma generó un formato inesperado. Verificar que el JSON exportado tenga la propiedad `hex` dentro del objeto `$value`.

### El build falla con el error "token already registered"

Ocurre si se ejecuta el script más de una vez en el mismo proceso de Node. Reiniciar el terminal y ejecutar `npm run build` de nuevo.

### Los caracteres especiales en comentarios aparecen mal en el terminal

Los archivos `dist/` están codificados en UTF-8. El problema es solo visual en PowerShell. Los archivos se leen correctamente en VS Code y en navegadores. Para forzar lectura UTF-8 en PowerShell: `Get-Content archivo.css -Encoding UTF8`.
