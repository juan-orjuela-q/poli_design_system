# Accesibilidad

El Design System v2 cumple **WCAG 2.1 nivel AA** en todos sus componentes. Esta página documenta los patrones de accesibilidad implementados de forma consistente.

## Principios aplicados

### `aria-disabled` en lugar de `disabled` nativo

Los componentes interactivos usan `aria-disabled` en lugar del atributo HTML `disabled`:

```html
<button [attr.aria-disabled]="disabled() || null">
  Acción
</button>
```

**Por qué**: mantiene el elemento en el tab order para que los lectores de pantalla lo anuncien como "no disponible". Los guards de JS previenen la acción:

```typescript
handleClick(event: Event) {
  if (this.disabled()) {
    event.preventDefault();
    event.stopImmediatePropagation();
    return;
  }
  // ...
}
```

El cursor `not-allowed` se aplica sin `pointer-events: none` para que sea visible.

### Focus ring visible

Todos los elementos interactivos tienen un focus ring de **doble anillo** cumpliendo WCAG 2.4.7:

```scss
&:focus-visible {
  outline: none;
  box-shadow:
    0 0 0 2px var(--action-focus-inner),        // anillo interior blanco
    0 0 0 6px var(--action-primary-focus-ring);  // anillo exterior azul
}
```

Los campos de formulario en estados de error/warning/success usan sus variantes:

```scss
// En estado error:
box-shadow:
  0 0 0 2px var(--action-focus-inner),
  0 0 0 6px var(--action-status-error-focus-ring);
```

:::caution
Nunca usar `outline: none` sin reemplazarlo con `box-shadow`. Nunca usar `overflow: hidden` en contenedores que tengan hijos con focus ring.
:::

### Touch targets 48×48px (WCAG 2.5.5)

Los componentes de 32px de alto (tags, badges, botones de icono pequeños) amplían su área de toque con `::before`:

```scss
position: relative;
&::before {
  content: '';
  position: absolute;
  inset: -8px 0; // +8px arriba y abajo → 48px total
}
```

### Roles ARIA correctos

| Patrón | Implementación |
|--------|----------------|
| Toggle/switch | `<button role="switch" aria-checked>` |
| Combobox/select | `role="combobox"` + `aria-haspopup="listbox"` + `aria-expanded` |
| Listbox | `role="listbox"` con opciones `role="option" aria-selected` |
| Tablist | `role="tablist"` con `role="tab" aria-selected aria-controls` |
| Dialog/Modal | `role="dialog"` con `aria-modal="true"` y `aria-labelledby` |
| Breadcrumb | `<nav aria-label="Ruta de navegación">` con `aria-current="page"` |
| Stepper | `aria-current="step"` en el paso actual |

### Roving tabindex (radio groups, tabs)

El patrón de *roving tabindex* (APG) se usa en grupos de opciones:

- Solo el elemento activo/seleccionado tiene `tabindex="0"`.
- El resto tienen `tabindex="-1"`.
- Las teclas de flecha mueven el foco **y** la selección simultáneamente.
- `Home`/`End` saltan al primer/último elemento.

### Navegación por teclado

| Componente | Teclas soportadas |
|------------|-------------------|
| `pds-button`, `pds-icon-button` | `Enter`, `Space` |
| `pds-tag` (removable) | `Delete`, `Backspace` para eliminar |
| `pds-radio-group` | `ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`, `Home`, `End` |
| `pds-tabs` | `ArrowLeft`, `ArrowRight`, `Home`, `End` |
| `pds-select-field` | `ArrowUp`, `ArrowDown`, `Enter`, `Escape`, `Home`, `End` |
| `pds-dialog`, `pds-modal` | `Escape` para cerrar |
| `pds-accordion` | `Enter`, `Space` para expandir/colapsar |
| `pds-date-picker` | `ArrowKeys` en el calendario, `Escape` para cerrar |

### Focus trap (Dialog y Modal)

Los overlays usan `FocusTrap` de Angular CDK (`@angular/cdk/a11y`):

```typescript
private focusTrap?: FocusTrap;

ngAfterViewInit() {
  this.focusTrap = this.focusTrapFactory.create(this.dialogEl.nativeElement);
  this.focusTrap.focusInitialElement();
}

ngOnDestroy() {
  this.focusTrap?.destroy();
}
```

Al cerrar, el foco vuelve al elemento que abrió el overlay (`previousFocus`).

### Texto accesible oculto

Para textos visibles solo para lectores de pantalla:

```scss
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

### Movimiento reducido

Todos los componentes con animaciones respetan la preferencia del sistema:

```scss
@media (prefers-reduced-motion: reduce) {
  animation: none;
  transition: none;
}
```

### Live regions

- `pds-notification` (snackbar/toast): `role="alert"` o `aria-live="polite"` según urgencia.
- `pds-loading-circle`: `role="status"` (implica `aria-live="polite"`).
- `pds-stepper` contador: `aria-live="polite"`.

## Checklist de accesibilidad por componente

Antes de considerar completo un componente nuevo:

- [ ] Roles ARIA correctos
- [ ] `aria-label` / `aria-labelledby` donde aplica
- [ ] Estados `aria-disabled`, `aria-expanded`, `aria-selected` según necesidad
- [ ] Navegación por teclado implementada
- [ ] Focus visible con `box-shadow` (nunca `outline: none` sin reemplazo)
- [ ] Touch target ≥ 48×48px para elementos ≤ 32px
- [ ] Color no es el único medio de comunicar información
- [ ] `prefers-reduced-motion` considerado
- [ ] Texto alternativo para imágenes e iconos informativos
