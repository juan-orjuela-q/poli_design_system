import { Meta, StoryObj } from '@storybook/angular';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PdsCheckboxComponent } from './pds-checkbox.component';

const meta: Meta<PdsCheckboxComponent> = {
  title: 'Poli Design System / 05. Forms / Form (Checkbox)',
  component: PdsCheckboxComponent,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Texto visible del checkbox. Requerido.' },
    checked: { control: 'boolean', description: 'Estado marcado inicial' },
    indeterminate: { control: 'boolean', description: 'Estado intermedio (ni marcado ni desmarcado)' },
    disabled: { control: 'boolean', description: 'Estado deshabilitado (usa aria-disabled vía input nativo)' },
    value: { control: 'text', description: 'Valor enviado en formularios HTML' },
    name: { control: 'text', description: 'Atributo name del input nativo' },
  },
  parameters: {
    docs: {
      description: {
        component: `
Control de selección múltiple del DS v2. Implementado con un \`<input type="checkbox">\` nativo oculto
y un control visual custom. El input nativo gestiona la semántica, el tab order y el estado ARIA.
Compatible con Angular Reactive Forms (CVA).

### Cuándo usarlo
- Cuando el usuario puede seleccionar múltiples opciones de un conjunto.
- Para opciones de preferencias, filtros o configuración.
- Cuando la selección es independiente entre opciones.

### Cuándo NO usarlo
- No usar cuando solo una opción puede seleccionarse — usar \`pds-radio\`.
- No usar para activar/desactivar una función — usar \`pds-toggle\`.
- No usar aislado para grupos de opciones relacionadas — usar \`pds-checkbox-group\`.

### API
\`\`\`html
<!-- Sin formulario reactivo -->
<pds-checkbox
  label="Acepto los términos y condiciones"
  [checked]="accepted"
  (checkedChange)="accepted = $event"
/>

<!-- Con FormControl -->
<pds-checkbox label="Suscribirse al boletín" [formControl]="newsletterCtrl" />
\`\`\`

| Input          | Tipo      | Default | Descripción |
|----------------|-----------|---------|-------------|
| \`label\`        | \`string\` (requerido) | — | Texto del checkbox |
| \`checked\`      | \`boolean\` | \`false\` | Estado marcado |
| \`indeterminate\` | \`boolean\` | \`false\` | Estado intermedio |
| \`disabled\`     | \`boolean\` | \`false\` | Deshabilitado |
| \`value\`        | \`string \\| null\` | \`null\` | Valor en formularios HTML |
| \`name\`         | \`string \\| null\` | \`null\` | Nombre del campo |

| Output         | Tipo      | Descripción |
|----------------|-----------|-------------|
| \`checkedChange\` | \`boolean\` | Emite el nuevo estado al cambiar |

---

### Accesibilidad — WCAG 2.2

#### Criterios aplicables
| Criterio | Nivel | Aplicación |
|----------|-------|------------|
| **1.3.1 Info y relaciones** | A | \`<input type="checkbox">\` nativo con \`<label>\` asociado por \`for\`/\`id\` |
| **1.4.3 Contraste mínimo** | AA | Texto del label ≥ 4.5:1 |
| **1.4.11 Contraste no textual** | AA | El recuadro del checkbox ≥ 3:1 sobre el fondo en todos los estados |
| **2.1.1 Teclado** | A | Space marca/desmarca — comportamiento nativo del \`<input type="checkbox">\` |
| **2.4.7 Foco visible** | AA | Focus ring CSS vía \`.sr-only:focus-visible + .__control\` — no requiere JS |
| **2.5.8 Tamaño del objetivo** | AA | Área táctil mínima de 48×48px vía pseudoelemento \`::before\` |
| **4.1.2 Nombre, rol, valor** | A | Input nativo: \`role\` = checkbox implícito; \`aria-checked\` automático; estado deshabilitado vía \`disabled\` nativo |

#### Patrón de implementación: input oculto + control visual
\`\`\`
<input type="checkbox" class="sr-only" [id]="checkboxId">
<div class="__control">...</div>
<label [for]="checkboxId">{{ label }}</label>
\`\`\`

El \`<input>\` oculto gestiona:
- El tab order nativo.
- Los eventos \`change\` con soporte de teclado (Space).
- El estado \`checked\`, \`indeterminate\` y \`disabled\`.
- El focus ring CSS via selector \`.sr-only:focus-visible + .__control\`.

#### Navegación por teclado
| Tecla | Acción |
|-------|--------|
| **Tab** | Mueve el foco al checkbox |
| **Space** | Marca / desmarca el checkbox |
| **Shift + Tab** | Foco al elemento anterior |

#### Atributos ARIA
Los atributos ARIA son gestionados automáticamente por el elemento \`<input type="checkbox">\` nativo:
- \`role="checkbox"\` — implícito
- \`aria-checked\` — sincronizado con el estado del DOM
- \`aria-disabled\` — cuando \`disabled=true\`

#### Estado indeterminate
El estado \`indeterminate\` se establece vía \`ElementRef\`: \`inputRef.nativeElement.indeterminate = true\`.
Los lectores de pantalla anuncian: *"[label], casilla de verificación, mixta"*.

#### Anuncio en lectores de pantalla
- Marcado: *"Acepto los términos, casilla de verificación, marcada"*
- Desmarcado: *"Acepto los términos, casilla de verificación, no marcada"*
- Indeterminate: *"Seleccionar todo, casilla de verificación, mixta"*
- Deshabilitado: *"Acepto los términos, casilla de verificación, no disponible"*

#### Auditoría v1 → v2
| Hallazgo v1 (Cortés, feb 2026) | Criterio WCAG | Resolución en v2 |
|--------------------------------|---------------|------------------|
| Hover y disabled con contraste 2.48:1 — demasiado bajo | 1.4.11 | Tokens semánticos de borde con contraste ≥ 3:1 en todos los estados |
| Estado solo diferenciado por color | 1.4.1 | El icono ✓ aparece dentro del recuadro — no solo cambio de color |
| Área táctil < 44px | 2.5.8 | \`::before\` con área de 48×48px en el label |

### Buenas prácticas
✅ Usa \`pds-checkbox-group\` cuando tengas múltiples checkboxes relacionados — proporciona \`<fieldset>\`+\`<legend>\`.
✅ El \`label\` debe describir la opción completa — no usar "Sí" o "X" sin contexto.
✅ Usa \`indeterminate=true\` para el checkbox "Seleccionar todos" cuando hay selección parcial.
❌ No uses el checkbox para toggle de funciones — usa \`pds-toggle\`.
❌ No omitas el \`label\` aunque el checkbox esté dentro de una celda de tabla con encabezado visible.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<PdsCheckboxComponent>;

// ── Sandbox ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default — Sandbox',
  args: {
    label: 'Acepto los términos y condiciones',
    checked: false,
    indeterminate: false,
    disabled: false,
  },
};

// ── Estados ───────────────────────────────────────────────────────────────────

export const AllStates: Story = {
  name: 'Todos los estados',
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:12px">
        <pds-checkbox label="Desmarcado (default)" [checked]="false" />
        <pds-checkbox label="Marcado" [checked]="true" />
        <pds-checkbox label="Indeterminate (selección parcial)" [checked]="false" [indeterminate]="true" />
        <pds-checkbox label="Deshabilitado — desmarcado" [checked]="false" [disabled]="true" />
        <pds-checkbox label="Deshabilitado — marcado" [checked]="true" [disabled]="true" />
      </div>
    `,
  }),
};

// ── Indeterminate ─────────────────────────────────────────────────────────────

export const IndeterminateState: Story = {
  name: 'Estado indeterminate (Seleccionar todos)',
  parameters: {
    docs: {
      description: {
        story: `
El estado \`indeterminate\` se usa para el checkbox "Seleccionar todos" cuando hay selección parcial.
Se establece vía \`ElementRef\` (\`nativeElement.indeterminate = true\`) y los lectores de pantalla
anuncian *"mixta"* en lugar de "marcada" o "no marcada".
        `,
      },
    },
  },
  render: () => ({
    props: {
      allChecked: false,
      someChecked: true,
      items: [
        { label: 'Opción A', checked: true },
        { label: 'Opción B', checked: false },
        { label: 'Opción C', checked: false },
      ],
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:8px">
        <pds-checkbox
          label="Seleccionar todas"
          [checked]="allChecked"
          [indeterminate]="someChecked && !allChecked"
        />
        <div style="padding-left:24px;display:flex;flex-direction:column;gap:8px">
          <pds-checkbox *ngFor="let item of items" [label]="item.label" [checked]="item.checked" />
        </div>
      </div>
    `,
  }),
};

// ── Con Reactive Forms ────────────────────────────────────────────────────────

export const WithFormControl: Story = {
  name: 'Con FormControl (Reactive Forms)',
  render: () => ({
    moduleMetadata: { imports: [ReactiveFormsModule] },
    props: {
      ctrl: new FormControl(false),
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;font-family:Poppins">
        <pds-checkbox
          label="Suscribirse al boletín de noticias"
          [formControl]="ctrl"
        />
        <p style="font-size:13px;color:#50606E;margin:0">
          Valor del FormControl: <strong>{{ ctrl.value }}</strong>
        </p>
        <button
          (click)="ctrl.setValue(!ctrl.value)"
          style="padding:6px 12px;font-family:Poppins;font-size:13px;border-radius:6px;border:1px solid #0F385A;cursor:pointer;width:fit-content"
        >
          Cambiar valor externo
        </button>
      </div>
    `,
  }),
};

// ── Accesibilidad ─────────────────────────────────────────────────────────────

export const A11yFocusVisible: Story = {
  name: 'A11y — Focus visible (Tab para probar)',
  parameters: {
    docs: {
      description: {
        story: 'Usa **Tab** para enfocar cada checkbox. El focus ring CSS aparece sin JS — selector \`.sr-only:focus-visible + .__control\`.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:12px">
        <pds-checkbox label="Primera opción" [checked]="false" />
        <pds-checkbox label="Segunda opción" [checked]="true" />
        <pds-checkbox label="Tercera opción — deshabilitada" [checked]="false" [disabled]="true" />
      </div>
    `,
  }),
};

export const A11yKeyboard: Story = {
  name: 'A11y — Space para marcar/desmarcar',
  parameters: {
    docs: {
      description: {
        story: 'Usa **Tab** para enfocar y **Space** para marcar/desmarcar. El comportamiento es nativo del \`<input type="checkbox">\` — no requiere JS adicional.',
      },
    },
  },
  args: {
    label: 'Acepto los términos y condiciones (Tab + Space para probar)',
    checked: false,
  },
};
