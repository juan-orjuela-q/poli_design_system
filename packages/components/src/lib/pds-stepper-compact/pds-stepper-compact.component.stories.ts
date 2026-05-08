import { signal } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import { componentWrapperDecorator } from '@storybook/angular';
import { PdsStepperCompactComponent, CompactStep } from './pds-stepper-compact.component';

const STEPS_ENROLLMENT: CompactStep[] = [
  { id: 'personal', label: 'Datos personales' },
  { id: 'academic', label: 'Información académica' },
  { id: 'documents', label: 'Documentos adjuntos' },
  { id: 'payment', label: 'Pago de matrícula' },
  { id: 'confirm', label: 'Confirmación' },
];

const STEPS_SHORT: CompactStep[] = [
  { id: 'form', label: 'Formulario' },
  { id: 'review', label: 'Revisión' },
  { id: 'submit', label: 'Envío' },
];

const meta: Meta<PdsStepperCompactComponent> = {
  title: 'Poli Design System / 08. Navigation / Stepper Compact',
  component: PdsStepperCompactComponent,
  decorators: [
    componentWrapperDecorator(
      (story) =>
        `<div style="max-width:560px;background:var(--surface-canvas,#f5f7f9);padding:24px;border-radius:12px">${story}</div>`,
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    currentIndex: {
      control: { type: 'number', min: 0 },
      description: 'Índice del paso activo (0-based). El padre actualiza este valor.',
    },
    showFooter: { control: 'boolean', description: 'Muestra el pie con botones de navegación' },
    nextLabel: { control: 'text', description: 'Etiqueta del botón Siguiente' },
    prevLabel: { control: 'text', description: 'Etiqueta del botón Anterior' },
    finishLabel: { control: 'text', description: 'Etiqueta del botón Finalizar' },
  },
  parameters: {
    docs: {
      description: {
        component: `
Variante compacta del stepper para flujos secuenciales con espacio vertical reducido.
Muestra marcadores de segmento (barra teal gruesa = activo, barra gris delgada = resto),
un encabezado con el contador de pasos y el título del paso actual, y la línea "Siguiente paso: …".
El pie de página opcional incluye los botones de navegación.

**Usar sobre fondos Canvas, Subtle o Sunken** — el componente no tiene contraste suficiente sobre fondos Primary Solid.

### Cuándo usarlo
- En modales o paneles laterales donde el stepper completo no cabe.
- Para flujos de más de 3 pasos en contextos de espacio reducido.
- Como alternativa al stepper horizontal en vistas de formulario de página completa en móvil.

### Cuándo NO usarlo
- No usar sobre fondos de color primary solid — el contraste del texto es insuficiente.
- Si el usuario necesita ver todos los pasos simultáneamente — usar \`pds-stepper\` horizontal.

### API
\`\`\`html
<pds-stepper-compact
  [steps]="steps"
  [currentIndex]="currentIndex"
  (next)="goNext()"
  (prev)="goPrev()"
>
  <!-- Contenido del paso activo (ng-content) -->
  <form [formGroup]="form">...</form>
</pds-stepper-compact>
\`\`\`

| Input         | Tipo              | Default        | Descripción |
|---------------|-------------------|----------------|-------------|
| \`steps\`       | \`CompactStep[]\` (requerido) | — | Lista de pasos del flujo |
| \`currentIndex\` | \`number\`       | \`0\`          | Índice del paso activo (0-based) |
| \`showFooter\`  | \`boolean\`      | \`true\`       | Muestra botones de navegación |
| \`nextLabel\`   | \`string\`       | \`'Siguiente'\` | Etiqueta botón siguiente |
| \`prevLabel\`   | \`string\`       | \`'Anterior'\`  | Etiqueta botón anterior |
| \`finishLabel\` | \`string\`       | \`'Finalizar'\` | Etiqueta botón finalizar |

| Output  | Tipo   | Descripción |
|---------|--------|-------------|
| \`next\`  | \`void\` | Emite al hacer clic en Siguiente o Finalizar |
| \`prev\`  | \`void\` | Emite al hacer clic en Anterior |

**CompactStep:**
\`\`\`ts
interface CompactStep {
  id: string;
  label: string;
}
\`\`\`

---

### Accesibilidad — WCAG 2.2

#### Criterios aplicables
| Criterio | Nivel | Aplicación |
|----------|-------|------------|
| **1.4.1 Uso del color** | A | El paso activo se anuncia con \`aria-live="polite"\` — no solo con el color del marcador |
| **1.4.3 Contraste mínimo** | AA | Contador y etiquetas ≥ 4.5:1 sobre fondos Canvas/Subtle/Sunken |
| **1.4.11 Contraste no textual** | AA | Marcador activo (barra teal) ≥ 3:1 sobre el fondo |
| **2.1.1 Teclado** | A | Botones Anterior/Siguiente/Finalizar son \`<button>\` nativos — Tab+Enter |
| **2.4.7 Foco visible** | AA | Focus ring visible en los botones de navegación |
| **4.1.3 Mensajes de estado** | A | El contador tiene \`aria-live="polite"\` — anuncia el cambio de paso automáticamente |

#### Navegación por teclado
| Tecla | Acción |
|-------|--------|
| **Tab** | Enfoca el botón Anterior (si existe) y el botón Siguiente/Finalizar |
| **Enter / Space** | Activa el botón enfocado |
| **Shift+Tab** | Navega hacia atrás |

#### Atributos ARIA
| Atributo | Dónde | Función |
|----------|-------|---------|
| \`aria-live="polite"\` | en el contador "Paso X de Y" | Anuncia el progreso al cambiar de paso |
| \`id\` | en el contador | Referenciado para anuncios futuros |

#### Anuncio en lectores de pantalla
- Al cargar: *"Paso 1 de 5"* (live region al moverse)
- Al avanzar: *"Paso 2 de 5"* se anuncia automáticamente sin enfocar el contador
- El botón de avanzar anuncia: *"Siguiente, botón"* (o *"Finalizar, botón"* en el último paso)

#### Auditoría v1 → v2
| Hallazgo v1 (Cortés, feb 2026) | Criterio WCAG | Resolución en v2 |
|--------------------------------|---------------|------------------|
| Este componente es nuevo en v2 y fue diseñado desde el inicio conforme a WCAG 2.2 AA | — | — |

### Buenas prácticas
✅ Usa siempre sobre fondos Canvas, Subtle o Sunken — verifica el contraste en fondos personalizados.
✅ Proyecta el contenido del paso activo via \`ng-content\` — el stepper solo gestiona la navegación.
✅ Actualiza \`currentIndex\` en el padre al recibir los outputs \`next\` y \`prev\`.
❌ No uses sobre fondos primary solid — el contraste del texto es insuficiente.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<PdsStepperCompactComponent>;

// ── Sandbox ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default — Sandbox',
  args: {
    steps: STEPS_ENROLLMENT,
    currentIndex: 1,
    showFooter: true,
    nextLabel: 'Siguiente',
    prevLabel: 'Anterior',
    finishLabel: 'Finalizar',
  },
};

// ── Primer paso ───────────────────────────────────────────────────────────────

export const FirstStep: Story = {
  name: 'Primer paso (sin botón Anterior)',
  args: {
    steps: STEPS_ENROLLMENT,
    currentIndex: 0,
    showFooter: true,
  },
};

// ── Último paso ───────────────────────────────────────────────────────────────

export const LastStep: Story = {
  name: 'Último paso (botón Finalizar)',
  args: {
    steps: STEPS_ENROLLMENT,
    currentIndex: 4,
    showFooter: true,
  },
};

// ── Sin footer ────────────────────────────────────────────────────────────────

export const WithoutFooter: Story = {
  name: 'Sin pie de navegación',
  parameters: {
    docs: {
      description: {
        story: 'Cuando \`showFooter=false\`, el padre gestiona los botones de navegación externamente.',
      },
    },
  },
  args: {
    steps: STEPS_SHORT,
    currentIndex: 1,
    showFooter: false,
  },
};

// ── Navegación interactiva ────────────────────────────────────────────────────

export const Interactive: Story = {
  name: 'Interactivo — navega entre pasos',
  render: () => ({
    props: {
      currentIndex: signal(0),
      steps: STEPS_ENROLLMENT,
      goNext() { this['currentIndex'].update((i: number) => Math.min(i + 1, STEPS_ENROLLMENT.length - 1)); },
      goPrev() { this['currentIndex'].update((i: number) => Math.max(i - 1, 0)); },
    },
    template: `
      <pds-stepper-compact
        [steps]="steps"
        [currentIndex]="currentIndex()"
        (next)="goNext()"
        (prev)="goPrev()"
      >
        <div style="padding:16px 0;font-family:Poppins;font-size:14px;color:#374151">
          Contenido del paso {{ currentIndex() + 1 }}: {{ steps[currentIndex()].label }}
        </div>
      </pds-stepper-compact>
    `,
  }),
};

// ── Accesibilidad ─────────────────────────────────────────────────────────────

export const A11yAriaLive: Story = {
  name: 'A11y — aria-live en contador (Tab + Enter)',
  parameters: {
    docs: {
      description: {
        story: `
El contador *"Paso X de Y"* tiene \`aria-live="polite"\` — NVDA/VoiceOver lo anuncian al cambiar.

Usa **Tab** para enfocar el botón **Siguiente** y presiona **Enter** para avanzar.
El lector de pantalla anuncia el nuevo paso sin que el usuario necesite enfocar el contador.
        `,
      },
    },
  },
  args: {
    steps: STEPS_ENROLLMENT,
    currentIndex: 0,
    showFooter: true,
  },
};
