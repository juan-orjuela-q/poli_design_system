# Guía de Implementación — Fase 3 y Fase 5
## Design System v2 · Politécnico Grancolombiano

> **Documento para:** desarrollador externo + asistente IA (GitHub Copilot / Claude)
> **Proyecto base:** `Seed_Front_A11y` — Angular 19, standalone components
> **Estado al momento de escritura:** Fase 1 ✅ · Fase 2 ✅ · Fase 3 y Fase 5 pendientes

---

## 1. Contexto del proyecto

Este es el starter base (semilla) del Politécnico Grancolombiano. Más de 500 aplicativos lo usan. Estás construyendo el **Design System v2** con componentes de selector `pds-*`. Los componentes v1 (`app-*`) **no se tocan bajo ninguna circunstancia**.

**Stack:** Angular 19 · Standalone Components · Signal API · OnPush · Storybook 8 · SCSS

Lee el archivo `CLAUDE.md` en la raíz del proyecto **antes de escribir una sola línea**. Contiene todas las decisiones de arquitectura ya tomadas, tokens disponibles, patrones consolidados y cosas que explícitamente no debes hacer.

---

## 2. Cómo trabajar con la IA

**Al iniciar cada sesión de trabajo**, abre `CLAUDE.md` y compártelo con la IA como contexto adjunto. Esto le da el estado completo del proyecto sin necesidad de explicar nada desde cero.

**Instrucciones para la IA — copiar y pegar al inicio de cada sesión:**

```
Eres un asistente de desarrollo Angular 19. El proyecto en el que trabajamos
es el Design System v2 del Politécnico Grancolombiano (Semilla Front).

REGLAS ABSOLUTAS:
1. Lee CLAUDE.md antes de proponer cualquier código.
2. Nunca valores hardcodeados en CSS — siempre tokens CSS custom properties
   de src/assets/poligran/*.css. Si el token no existe, usa var(--token, fallback).
3. Señala cuando uses un fallback que aún no tiene token definido — agrégalo
   a la tabla "Tokens pendientes" de CLAUDE.md.
4. TypeScript: solo input() signal API, nunca @Input() decorador. computed()
   para estado derivado. ChangeDetectionStrategy.OnPush siempre.
5. Accesibilidad no es opcional: roles ARIA, navegación por teclado,
   aria-disabled (no disabled nativo), focus ring con box-shadow.
6. BEM con prefijo pds-: .pds-notification, .pds-notification--error, .pds-notification__title
7. Antes de crear un componente nuevo, lee su spec en specs/{componente}.md

Cuando termines un componente actualiza el roadmap en CLAUDE.md.
```

---

## 3. Setup inicial

```bash
# Instalar dependencias
npm install

# Storybook (desarrollo de componentes — hot reload)
npm run storybook

# Verificar errores TypeScript
npx tsc --noEmit
```

Los tokens CSS se cargan automáticamente vía `angular.json` en el array `styles`. No importar nada en los SCSS de componentes — los custom properties ya están disponibles globalmente.

---

## 4. Estructura de cada componente

```
src/app/shared/components/pds-{nombre}/
  pds-{nombre}.component.ts           ← lógica
  pds-{nombre}.component.html         ← template
  pds-{nombre}.component.scss         ← estilos
  pds-{nombre}.component.stories.ts   ← Storybook
```

### Plantilla TypeScript mínima

```typescript
import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'pds-mi-componente',
  standalone: true,
  imports: [NgClass],
  templateUrl: './pds-mi-componente.component.html',
  styleUrl: './pds-mi-componente.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdsMiComponenteComponent {
  readonly variant = input<'primary' | 'secondary'>('primary');
  readonly disabled = input<boolean>(false);

  protected readonly classes = computed(() => ({
    'pds-mi-componente': true,
    [`pds-mi-componente--${this.variant()}`]: true,
    'pds-mi-componente--disabled': this.disabled(),
  }));
}
```

### Plantilla Storybook mínima

```typescript
import { Meta, StoryObj } from '@storybook/angular';
import { PdsMiComponenteComponent } from './pds-mi-componente.component';

const meta: Meta<PdsMiComponenteComponent> = {
  title: 'DS v2/Mi Componente',   // ← siempre bajo "DS v2/"
  component: PdsMiComponenteComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary'] },
    disabled: { control: 'boolean' },
  },
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<PdsMiComponenteComponent>;

export const Default: Story = {
  args: { variant: 'primary', disabled: false },
};
```

---

## 5. Patrones de accesibilidad consolidados

> Estos patrones ya están probados en Fase 1 y 2. Reutiliza, no reinventes.

### Disabled — `aria-disabled` (no atributo nativo)

```typescript
// HTML: mantiene el elemento en el tab order (WCAG 2.1.1)
[attr.aria-disabled]="disabled() ? 'true' : null"

// Handler — guardia obligatoria en click
protected handleClick(event: MouseEvent): void {
  if (this.disabled()) {
    event.preventDefault();
    event.stopImmediatePropagation();
    return;
  }
}
```

```scss
cursor: not-allowed;
// ❌ NO pointer-events: none — el cursor desaparece para el usuario
```

### Focus ring (WCAG 2.4.7)

```scss
&:focus-visible {
  outline: none;
  box-shadow:
    0 0 0 2px var(--action-focus-inner),
    0 0 0 6px var(--action-primary-focus-ring);
}
```

### Focus trap — obligatorio en Dialog y Modal

Cuando se abre un dialog/modal, el foco debe quedar atrapado dentro. Opciones:
- **CDK FocusTrap** de `@angular/cdk/a11y` (recomendado — ya disponible si Material está instalado).
- Implementación manual: escuchar Tab y Shift+Tab, circular entre el primer y último elemento focusable.

```typescript
// Con CDK
import { FocusTrap, FocusTrapFactory } from '@angular/cdk/a11y';

// En ngAfterViewInit cuando open() cambia a true:
this.focusTrap = this.focusTrapFactory.create(this.dialogEl.nativeElement);
this.focusTrap.focusInitialElementWhenReady();

// En cierre:
this.focusTrap.destroy();
this.triggerEl.focus(); // devolver foco al elemento que abrió el dialog
```

### `overflow: hidden` rompe el focus ring

Nunca apliques `overflow: hidden` en un contenedor que tenga hijos con `:focus-visible`. Usa `border-radius` directamente en el hijo.

### IDs únicos

```typescript
let counter = 0;
export class PdsDialogComponent {
  readonly dialogId = `pds-dialog-${++counter}`;
  readonly titleId = `pds-dialog-title-${this.dialogId}`;
}
```

---

## 6. Fase 3 — Componentes compuestos

**Specs:** `specs/notification.md` · `specs/dialog-modal.md`
**Dependencias:** `pds-icon`, `pds-button`, `pds-icon-button` (todos en Fase 1 y 2 — ya implementados)

### Orden de implementación recomendado

```
pds-notification  →  pds-dialog  →  pds-modal
```

Notification primero porque no requiere focus trap ni gestión del overlay. Dialog y Modal comparten la misma infraestructura de overlay.

---

### 6.1 `pds-notification`

**Inputs:** `type` ('snackbar'|'toast'|'inline'), `status` ('default'|'success'|'warning'|'error'|'info'), `title`, `dismissible`, `autoDismiss` (ms)
**Output:** `dismissed`

**Tipos de notificación:**
- `inline` — se renderiza en el flujo del contenido, sin posicionamiento absoluto.
- `snackbar` — `position: fixed; bottom: ...; left: 50%; transform: translateX(-50%)`.
- `toast` — `position: fixed; top: ...; right: ...`.

**Auto-dismiss:**

```typescript
readonly autoDismiss = input<number | null>(5000);

ngOnInit(): void {
  if (this.autoDismiss() !== null) {
    setTimeout(() => this.dismissed.emit(), this.autoDismiss()!);
  }
}
```

**Accesibilidad — la más importante de este componente:**

| `status` | `role` | Por qué |
|---|---|---|
| `error` | `role="alert"` | Urgente — el lector anuncia inmediatamente |
| `warning` | `role="alert"` | Urgente |
| `success`, `info`, `default` | `role="status"` | No urgente — anuncia en la próxima pausa |

```html
<div
  [ngClass]="notificationClasses()"
  [attr.role]="status() === 'error' || status() === 'warning' ? 'alert' : 'status'"
>
  <pds-icon [name]="iconForStatus()" [ariaHidden]="true" />
  <div class="pds-notification__content">
    @if (title()) { <p class="pds-notification__title">{{ title() }}</p> }
    <ng-content />
  </div>
  @if (dismissible()) {
    <pds-icon-button
      iconName="close"
      ariaLabel="Cerrar notificación"
      variant="ghost-neutral"
      size="sm"
      (click)="dismissed.emit()"
    />
  }
</div>
```

**Tokens de estado:**

```scss
.pds-notification {
  border-left: var(--border-bold) solid;

  &--default { background: var(--surface-brand-primary-soft);     border-color: var(--border-brand-primary-solid); }
  &--success { background: var(--surface-status-success-subtle);  border-color: var(--border-status-success-solid); }
  &--warning { background: var(--surface-status-warning-subtle);  border-color: var(--border-status-warning-solid); }
  &--error   { background: var(--surface-status-error-subtle);    border-color: var(--border-status-error-solid); }
  &--info    { background: var(--surface-status-info-subtle);     border-color: var(--border-status-info-solid); }
}
```

---

### 6.2 `pds-dialog`

**Inputs:** `mode` ('default'|'success'|'warning'|'error'), `title` (required), `open`, `closeOnOverlay`
**Outputs:** `closed`, `confirmed`

**Arquitectura del template:**

```html
@if (open()) {
  <div class="pds-dialog-overlay" (click)="onOverlayClick($event)" [attr.aria-hidden]="!open()">
    <div
      class="pds-dialog pds-dialog--{{ mode() }}"
      role="dialog"
      aria-modal="true"
      [attr.aria-labelledby]="titleId"
      (click)="$event.stopPropagation()"
    >
      <div class="pds-dialog__header">
        <pds-icon [name]="iconForMode()" [ariaHidden]="true" />
        <h2 [id]="titleId" class="pds-dialog__title">{{ title() }}</h2>
        <pds-icon-button iconName="close" ariaLabel="Cerrar" variant="ghost-neutral" size="sm" (click)="closed.emit()" />
      </div>
      <div class="pds-dialog__body">
        <ng-content />
      </div>
      <div class="pds-dialog__footer">
        <ng-content select="[slot=footer]" />
      </div>
    </div>
  </div>
}
```

**Gestión de foco — crítico para WCAG 2.1.2:**

```typescript
@ViewChild('dialogEl') dialogEl!: ElementRef;
private focusTrap?: FocusTrap;
private previousFocus?: HTMLElement;

// Cuando open() cambia a true:
effect(() => {
  if (this.open()) {
    this.previousFocus = document.activeElement as HTMLElement;
    // Crear focus trap en el siguiente ciclo (cuando el DOM está disponible)
    setTimeout(() => {
      this.focusTrap = this.focusTrapFactory.create(this.dialogEl.nativeElement);
      this.focusTrap.focusInitialElementWhenReady();
    });
  } else {
    this.focusTrap?.destroy();
    this.previousFocus?.focus();
  }
});
```

**Escape para cerrar:**

```typescript
@HostListener('document:keydown.escape')
onEscape(): void {
  if (this.open()) this.closed.emit();
}
```

**Scroll del body cuando el modal está abierto:**

```typescript
effect(() => {
  document.body.style.overflow = this.open() ? 'hidden' : '';
});
```

---

### 6.3 `pds-modal`

**Inputs:** `size` ('sm'|'md'|'lg'|'xl'|'2xl'), `title` (required), `open`, `closeOnOverlay` (default: `true`)
**Output:** `closed`

Comparte la misma infraestructura de overlay y focus trap que `pds-dialog`. Las diferencias:
- Sin modos de status (sin colores en el header).
- 5 tamaños controlados por `max-width`.
- El cuerpo tiene `overflow-y: auto` y `max-height: 90vh` — el contenido puede ser largo.
- El footer admite contenido libre vía `<ng-content select="[slot=footer]" />`.
- `closeOnOverlay` es `true` por defecto (al contrario que dialog).

**Sugerencia de refactor:** extraer la lógica de overlay + focus trap a un servicio o clase base reutilizable entre dialog y modal para no duplicar código.

---

## 7. Fase 5 — Navegación

**Spec:** `specs/navigation-components.md`
**Dependencias:** `pds-icon`, `pds-button`, `pds-icon-button`

### Orden de implementación recomendado

```
pds-breadcrumb  →  pds-tabs  →  pds-paginator  →  pds-stepper  →  pds-avatar-button  →  pds-sidenav
```

Breadcrumb y Paginator son los más simples. Sidenav es el más complejo — dejarlo para el final.

---

### 7.1 `pds-breadcrumb`

**Input:** `items: {label: string; href?: string}[]` (required)

```html
<nav aria-label="Ruta de navegación">
  <ol class="pds-breadcrumb">
    @for (item of items(); track item.label; let last = $last) {
      <li class="pds-breadcrumb__item">
        @if (!last) {
          <a [href]="item.href" class="pds-breadcrumb__link">{{ item.label }}</a>
          <pds-icon name="chevron_right" size="xs" class="pds-breadcrumb__separator" [ariaHidden]="true" />
        } @else {
          <span class="pds-breadcrumb__current" aria-current="page">{{ item.label }}</span>
        }
      </li>
    }
  </ol>
</nav>
```

Usar `<ol>` (lista ordenada) — el orden de la ruta tiene significado semántico.

---

### 7.2 `pds-tabs`

**Inputs:** `tabs: {id: string; label: string; disabled?: boolean}[]` (required), `activeTab`
**Output:** `tabChange: EventEmitter<string>`

**Patrón ARIA (APG Tabs pattern):**

```html
<div class="pds-tabs">
  <div role="tablist" class="pds-tabs__list">
    @for (tab of tabs(); track tab.id) {
      <button
        role="tab"
        [id]="'tab-' + tab.id"
        [attr.aria-selected]="activeTab() === tab.id"
        [attr.aria-controls]="'panel-' + tab.id"
        [attr.aria-disabled]="tab.disabled ? 'true' : null"
        [class.pds-tab-item--active]="activeTab() === tab.id"
        [class.pds-tab-item--disabled]="tab.disabled"
        class="pds-tab-item"
        (click)="onTabClick(tab)"
        (keydown)="onTabKeydown($event, tab)"
      >
        {{ tab.label }}
      </button>
    }
  </div>
  <!-- Los panels los renderiza el consumidor -->
</div>
```

**Navegación por teclado — obligatoria (WCAG 2.1.1):**

```typescript
protected onTabKeydown(event: KeyboardEvent, tab: {id: string}): void {
  const tabs = this.tabs().filter(t => !t.disabled);
  const idx = tabs.findIndex(t => t.id === tab.id);

  if (event.key === 'ArrowRight') {
    event.preventDefault();
    const next = tabs[(idx + 1) % tabs.length];
    this.tabChange.emit(next.id);
  } else if (event.key === 'ArrowLeft') {
    event.preventDefault();
    const prev = tabs[(idx - 1 + tabs.length) % tabs.length];
    this.tabChange.emit(prev.id);
  } else if (event.key === 'Home') {
    event.preventDefault();
    this.tabChange.emit(tabs[0].id);
  } else if (event.key === 'End') {
    event.preventDefault();
    this.tabChange.emit(tabs[tabs.length - 1].id);
  }
}
```

---

### 7.3 `pds-paginator`

**Inputs:** `totalItems` (required), `pageSize`, `currentPage`, `pageSizeOptions`, `showPageSizeSelector`
**Outputs:** `pageChange`, `pageSizeChange`

```html
<nav aria-label="Paginación" class="pds-paginator">
  <button
    class="pds-paginator__control"
    [attr.disabled]="currentPage() === 1 ? '' : null"
    aria-label="Página anterior"
    (click)="goTo(currentPage() - 1)"
  >
    <pds-icon name="chevron_left" size="sm" [ariaHidden]="true" />
  </button>

  @for (page of visiblePages(); track page) {
    @if (page === -1) {
      <span class="pds-paginator__ellipsis" aria-hidden="true">…</span>
    } @else {
      <button
        class="pds-paginator__control"
        [class.pds-paginator__control--active]="page === currentPage()"
        [attr.aria-current]="page === currentPage() ? 'page' : null"
        (click)="goTo(page)"
      >
        {{ page }}
      </button>
    }
  }

  <button
    class="pds-paginator__control"
    [attr.disabled]="currentPage() === totalPages() ? '' : null"
    aria-label="Página siguiente"
    (click)="goTo(currentPage() + 1)"
  >
    <pds-icon name="chevron_right" size="sm" [ariaHidden]="true" />
  </button>
</nav>
```

`visiblePages()` debe devolver un array con los números de página visibles y `-1` para los elipsis. Algoritmo recomendado: mostrar siempre primera, última, página actual ±1, y rellenar con `…` donde haya huecos.

---

### 7.4 `pds-stepper`

**Inputs:** `steps: {id: string; label: string; disabled?: boolean}[]` (required), `currentStep`, `orientation: 'horizontal' | 'vertical'`
**Output:** `stepChange: EventEmitter<string>`

```html
<div
  class="pds-stepper pds-stepper--{{ orientation() }}"
  role="group"
  aria-label="Pasos del proceso"
>
  @for (step of steps(); track step.id; let i = $index, last = $last) {
    <div class="pds-stepper__item" [class.pds-stepper__item--current]="step.id === currentStep()">
      <div class="pds-stepper__marker">
        @if (isCompleted(step.id)) {
          <pds-icon name="check" size="sm" [ariaHidden]="true" />
        } @else {
          <span aria-hidden="true">{{ i + 1 }}</span>
        }
      </div>
      <span
        class="pds-stepper__label"
        [attr.aria-current]="step.id === currentStep() ? 'step' : null"
      >
        {{ step.label }}
      </span>
      @if (!last) {
        <div class="pds-stepper__connector" aria-hidden="true"></div>
      }
    </div>
  }
</div>
```

---

### 7.5 `pds-avatar-button`

**Inputs:** `type: 'image' | 'letter' | 'icon'`, `imageSrc`, `letter`, `name` (required), `showBadge`, `size: 'sm' | 'md' | 'lg'`
**Output:** `clicked`

- `overflow: hidden` en el avatar para recortar la imagen — pero el focus ring debe estar en el `<button>` padre, no en el contenedor de la imagen.
- Badge: posición `absolute; top: 0; right: 0` con border de 2px blanco para separarlo del fondo.
- `aria-label` del botón: incluir el nombre del usuario. Si `showBadge`, añadir indicador: `"Juan García, tiene notificaciones pendientes"`.

---

### 7.6 `pds-sidenav`

El más complejo de la Fase 5. Abordar en sub-pasos:

**Sub-paso 1 — Estructura y expand/collapse:**

```scss
.pds-sidenav {
  width: var(--component-sidenav-open);    // 304px
  transition: width 250ms ease;
  overflow: hidden;                         // oculta labels al colapsar

  &--collapsed {
    width: var(--component-sidenav-closed); // 80px
  }
}
```

Los labels de los ítems deben hacer `opacity: 0` y `width: 0` al colapsar (no `display: none` — eso sacaría los elementos del tab order cuando el sidenav está colapsado pero todavía visible).

**Sub-paso 2 — Ítems activos y navegación:**

```html
<nav aria-label="Navegación principal" class="pds-sidenav">
  @for (item of items(); track item.id) {
    <a
      [href]="item.href"
      class="pds-sidenav__item"
      [class.pds-sidenav__item--active]="item.active"
      [attr.aria-current]="item.active ? 'page' : null"
    >
      <pds-icon [name]="item.icon" [ariaHidden]="true" />
      <span class="pds-sidenav__label">{{ item.label }}</span>
    </a>
  }
</nav>
```

**Sub-paso 3 — Tooltip en ítems cuando está colapsado:**

Cuando el sidenav está colapsado, los labels no son visibles. Envolver cada ítem en `<pds-tooltip>` con `[disabled]="expanded()"` para que el tooltip solo aparezca en estado colapsado.

**Accesibilidad del sidenav colapsado:**
- Los ítems colapsados siguen teniendo su `aria-label` visible para el lector de pantalla.
- El botón de expand/collapse necesita `aria-expanded` y `aria-label` descriptivo: `"Expandir menú de navegación"`.

---

## 8. Organización del repositorio GitHub

### Estrategia de ramas

```
main                          ← producción (protegida, requiere PR + review)
develop                       ← integración — base de todos los PRs del DS
feature/ds-fase-3             ← rama de trabajo para toda la Fase 3
feature/ds-fase-3-notification ← sub-feature por componente (opcional)
feature/ds-fase-5             ← rama de trabajo para toda la Fase 5
```

### Reglas de protección de `main`

Configurar en GitHub → Settings → Branches → Branch protection rules:
- Requerir PR antes de merge (sin push directo).
- Mínimo 1 revisión aprobada.
- Requerir que los checks de CI pasen.

### Convención de commits (Conventional Commits)

```
feat(pds-notification): implementar auto-dismiss y variantes de status
feat(pds-dialog): agregar focus trap y gestión de foco al cerrar
fix(pds-tabs): navegación con flechas no circula correctamente
docs(claude): actualizar tokens pendientes y roadmap
a11y(pds-sidenav): aria-current en ítem activo
```

### Pull Request — descripción estándar

Crear `.github/PULL_REQUEST_TEMPLATE.md` con el siguiente contenido:

```markdown
## Componente(s)
<!-- Qué pds-* se implementa o modifica -->

## Screenshots Storybook
<!-- Captura de las variantes principales (default, disabled, estados) -->

## Checklist de accesibilidad
- [ ] Roles ARIA correctos
- [ ] Navegación por teclado funciona (Tab, Enter/Space, Escape, flechas según contexto)
- [ ] Focus ring visible en todos los estados interactivos
- [ ] aria-disabled en lugar de disabled nativo (si aplica)
- [ ] Touch target ≥ 48×48px (si el elemento es más pequeño visualmente)
- [ ] Focus trap implementado (si es dialog/modal)
- [ ] Probado con lector de pantalla (NVDA / VoiceOver)

## Checklist técnico
- [ ] Solo tokens CSS (sin valores hardcodeados)
- [ ] input() signals — sin @Input() decoradores
- [ ] ChangeDetectionStrategy.OnPush
- [ ] Sin errores TypeScript (npx tsc --noEmit)
- [ ] CLAUDE.md actualizado (roadmap + tokens pendientes)
- [ ] Stories cubren todas las variantes y estados
```

---

## 9. Integración del DS en aplicativos existentes

### Estrategia de coexistencia v1/v2

Los aplicativos existentes tienen componentes `app-*` (v1). La migración es **incremental, componente por componente**, sin fechas límite impuestas:

```
aplicativo-X
  ├── usa app-button   ← no tocar, sigue funcionando
  └── usa pds-button   ← nuevo, empieza a usar aquí
```

### Pasos para incorporar la semilla actualizada en un aplicativo

1. Traer los cambios de la semilla (rebase, subtree update, o copia manual según la estrategia del aplicativo).

2. Verificar que `angular.json` cargue los 5 archivos CSS de tokens **en el orden correcto**:
   ```json
   "styles": [
     "src/assets/poligran/primitives.css",
     "src/assets/poligran/tokens.css",
     "src/assets/poligran/typescale-desktop.css",
     "src/assets/poligran/layout-desktop.css",
     "src/assets/poligran/component.css",
     "src/styles.scss"
   ]
   ```

3. Copiar la carpeta `src/app/shared/components/pds-*/` al aplicativo destino.

4. Importar los componentes en los standalone components del aplicativo:
   ```typescript
   imports: [PdsNotificationComponent, PdsTabsComponent]
   ```

### NO hacer durante la integración

- No modificar los archivos de tokens (`*.css` en `src/assets/poligran/`) — son compartidos.
- No mezclar clases v1 (`app-button`) y v2 (`pds-button`) en el mismo elemento HTML.
- No asumir que los tokens tienen valores si los 5 archivos CSS no están cargados — verificar en DevTools que `--action-primary-solid-bg` resuelve a un color.

### Verificación post-integración

```bash
npm run build  # sin errores
```

En el navegador con DevTools:
1. Inspeccionar cualquier componente `pds-*` migrado.
2. Computed → buscar `--action-primary-solid-bg`. Debe tener un valor hexadecimal.
3. Navegar con Tab — el focus ring debe ser visible en todos los componentes.
4. Para Dialog/Modal: verificar que el foco queda atrapado dentro al abrirlo.

---

## 10. Checklist de "componente completo"

Antes de marcar `[x]` en el roadmap de `CLAUDE.md`:

- [ ] **TypeScript:** `input()` signals, `computed()`, `OnPush`, `standalone: true`
- [ ] **HTML:** roles ARIA correctos, `aria-*` states, IDs únicos donde aplica
- [ ] **SCSS:** 100% tokens CSS (sin valores hardcodeados), BEM con prefijo `pds-`
- [ ] **Estados:** default, hover, focus, active, disabled — todos visibles en Storybook
- [ ] **Teclado:** Tab, Enter/Space, Escape, flechas según el componente
- [ ] **Touch target:** mínimo 48×48px (con `::before` si el elemento es más pequeño)
- [ ] **`prefers-reduced-motion`:** `animation: none` y `transition: none` donde aplica
- [ ] **Storybook:** `title: 'DS v2/...'`, `tags: ['autodocs']`, todas las variantes cubiertas
- [ ] **Sin errores** TypeScript (`npx tsc --noEmit`)
- [ ] **`CLAUDE.md` actualizado:** roadmap marcado + tokens pendientes registrados si aplica
