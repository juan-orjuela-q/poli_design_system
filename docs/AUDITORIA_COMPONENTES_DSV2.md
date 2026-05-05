**Reporte**
Tomé como criterio de cierre esto: limpio si ya usa tokens para tipografía, focus y sombras compuestas donde aplica; fallback permitido si solo quedan var con fallback por tokens aún pendientes; deuda pendiente si todavía hay valores compuestos hardcodeados que deberían centralizarse.

**Limpios**
- pds-button: referencia base correcta para focus ring, sombras de interacción y tipografía.
- pds-cta: tipografía alineada; hover, pressed y focus usan patrón DS.
- pds-avatar-button: sombras hover y pressed migradas a tokens; tipografía principal normalizada.
- pds-dialog: shadow migrada a shadow-500; title y body con tokens tipográficos.
- pds-modal: shadow migrada a shadow-500; tipografía normalizada.
- pds-card: shadow-200 y compound states centralizados; tipografía normalizada.
- pds-stat-card: mismo criterio que card; sin deuda visible.
- pds-notification: shadows de toast y snackbar migradas a shadow-component-notification; tipografía normalizada.
- pds-paginator: dropdown shadow migrada a shadow-100; tipografía alineada.
- pds-file-uploader: tipografía y focus consistentes.
- pds-file-uploader-item: pesos y line-heights pasados a tokens.
- pds-sidenav: sombras hover migradas a shadow-100; tipografía alineada.
- pds-tabs: focus ring alineado al patrón documentado; tipografía limpia.
- pds-stepper: line-height y pesos tipográficos normalizados.
- pds-stepper-compact: tipografía normalizada.
- pds-tag: line-height alineado a token.
- pds-table: último line-height literal removido.

**Con Fallback Permitido**
Estos no quedaron con deuda estructural; lo que permanece son fallbacks dentro de var para tokens que hoy no están completamente garantizados en export.
- pds-input-field: fallback de border-neutral-default en box-shadow inset.
- pds-textarea-field: mismo caso que input-field.
- pds-select-field: fallback de border-neutral-default en estados base.
- pds-date-picker: varios fallbacks de bordes semánticos; dropdown shadow ya corregida.
- pds-time-picker: fallback de border-neutral-default.
- pds-range: labels ya alineados a tokens, pero además tiene deuda real en sombras del thumb, ver abajo.

**Deuda Pendiente**
Esto es lo que todavía conviene intervenir en una siguiente pasada porque no depende solo de un fallback sencillo.
- pds-range: el thumb del slider conserva sombras y halos hardcodeados en hover, active y focus. Aquí falta definir un patrón compuesto claro del DS para thumb elevation y thumb interaction ring.
- pds-date-picker: aunque funcionalmente está bien, los estados de day, month y year usan varios inset box-shadow con fallback literal en lugar de una abstracción más centralizada. No es urgente, pero sí deuda de consistencia.
- pds-time-picker, pds-input-field, pds-textarea-field, pds-select-field: la deuda aquí no es de implementación sino de diseño tokenizado. Mientras no exista el token definitivo de borde neutral, seguirán apareciendo como coincidencia en auditorías de fallback.

**Resumen**
El sistema quedó limpio en tipografía literal y bastante mejor en sombras y focus. La deuda real ya no está distribuida por todo el repo: se concentró casi por completo en pds-range y en fallbacks de borde neutral de los form controls.

