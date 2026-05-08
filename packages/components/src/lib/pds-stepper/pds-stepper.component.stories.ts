import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { PdsStepperComponent, StepperStep } from './pds-stepper.component';

const STEPS_ENROLLMENT: StepperStep[] = [
  { id: 'personal', label: 'Datos personales', icon: 'person' },
  { id: 'academic', label: 'Información académica', icon: 'school' },
  { id: 'documents', label: 'Documentos', icon: 'attach_file' },
  { id: 'payment', label: 'Pago', icon: 'payments' },
  { id: 'confirm', label: 'Confirmación', icon: 'check_circle' },
];

const STEPS_SHORT: StepperStep[] = [
  { id: 'form', label: 'Formulario', icon: 'edit_note' },
  { id: 'review', label: 'Revisión', icon: 'preview' },
  { id: 'submit', label: 'Enviar', icon: 'send' },
];

const meta: Meta<PdsStepperComponent> = {
  title: 'Poli Design System / 08. Navigation / Stepper',
  component: PdsStepperComponent,
  decorators: [applicationConfig({ providers: [provideAnimations()] })],
  tags: ['autodocs'],
  argTypes: {
    currentStepIndex: {
      control: { type: 'number', min: 0 },
      description: 'Índice del paso activo (0-based). El padre actualiza este valor al recibir stepChange.',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Orientación del stepper',
    },
    showCount: { control: 'boolean', description: 'Muestra el contador "Paso X de N"' },
    ariaLabel: { control: 'text', description: 'Descripción del proceso para lectores de pantalla' },
    prevLabel: { control: 'text', description: 'Etiqueta del botón Anterior' },
    nextLabel: { control: 'text', description: 'Etiqueta del botón Siguiente' },
    finishLabel: { control: 'text', description: 'Etiqueta del botón Finalizar (último paso)' },
  },
  parameters: {
    docs: {
      description: {
        component: `
Indicador de progreso de flujos secuenciales del DS v2. Disponible en orientación **horizontal** (por defecto) y **vertical**.
Los marcadores de paso tienen 3 estados: completado (check), activo (ícono del paso) y pendiente.
El padre controla el índice activo y responde a los outputs \`stepChange\` y \`finished\`.

### Cuándo usarlo
- Para flujos de inscripción, solicitudes o procesos divididos en etapas claramente definidas.
- Cuando el usuario necesita saber cuántos pasos faltan para completar el proceso.
- Para formularios largos particionados en secciones lógicas.

### Cuándo NO usarlo
- No usar para navegación entre secciones no secuenciales — usar \`pds-tabs\`.
- No usar para procesos de más de 7 pasos en orientación horizontal — el texto se trunca.
- Para espacios reducidos usar \`pds-stepper-compact\`.

### API
\`\`\`html
<pds-stepper
  [steps]="steps"
  [currentStepIndex]="currentStep"
  ariaLabel="Proceso de inscripción"
  (stepChange)="currentStep = $event"
  (finished)="onFinish()"
/>
\`\`\`

| Input              | Tipo                | Default                | Descripción |
|--------------------|---------------------|------------------------|-------------|
| \`steps\`            | \`StepperStep[]\` (requerido) | — | Definición de los pasos |
| \`currentStepIndex\` | \`number\`         | \`0\`                  | Índice del paso activo (0-based) |
| \`showCount\`        | \`boolean\`        | \`true\`               | Muestra contador de pasos |
| \`orientation\`      | \`'horizontal'\\|'vertical'\` | \`'horizontal'\` | Orientación |
| \`ariaLabel\`        | \`string\`         | \`'Pasos del proceso'\` | Nombre del grupo para AT |
| \`prevLabel\`        | \`string\`         | \`'Anterior'\`         | Etiqueta botón anterior |
| \`nextLabel\`        | \`string\`         | \`'Siguiente'\`        | Etiqueta botón siguiente |
| \`finishLabel\`      | \`string\`         | \`'Finalizar'\`        | Etiqueta botón finalizar |

| Output       | Tipo     | Descripción |
|--------------|----------|-------------|
| \`stepChange\` | \`number\` | Emite el nuevo índice al navegar (el padre actualiza \`currentStepIndex\`) |
| \`finished\`   | \`void\`   | Emite al hacer clic en "Finalizar" en el último paso |

**StepperStep:**
\`\`\`ts
interface StepperStep {
  id: string;
  label: string;
  description?: string;
  icon: string; // Material Symbols — reemplazado por check_circle en pasos completados
}
\`\`\`

---

### Accesibilidad — WCAG 2.2

#### Criterios aplicables
| Criterio | Nivel | Aplicación |
|----------|-------|------------|
| **1.3.1 Info y relaciones** | A | \`aria-label\` en el grupo; marcadores en lista semántica |
| **1.4.1 Uso del color** | A | El estado activo se indica con \`aria-current="step"\` — no solo con color |
| **1.4.3 Contraste mínimo** | AA | Labels de paso ≥ 4.5:1; contador ≥ 4.5:1 |
| **2.1.1 Teclado** | A | Los botones Anterior/Siguiente/Finalizar son \`<button>\` nativos |
| **2.4.7 Foco visible** | AA | Focus ring en los botones de navegación |
| **4.1.2 Nombre, rol, valor** | A | \`aria-current="step"\` en el marcador activo; \`aria-live="polite"\` en el contador |
| **4.1.3 Mensajes de estado** | A | \`aria-live="polite"\` en el contador — anuncia "Paso 2 de 5" al cambiar |

#### Navegación por teclado
| Tecla | Acción |
|-------|--------|
| **Tab** | Navega a los botones Anterior / Siguiente / Finalizar |
| **Enter / Space** | Activa el botón enfocado |
| **Shift+Tab** | Navega hacia atrás entre botones |

#### Atributos ARIA
| Atributo | Dónde | Función |
|----------|-------|---------|
| \`aria-current="step"\` | en el marcador activo | Identifica el paso actual |
| \`aria-label="[Paso X de N]"\` | en el marcador | Nombre completo del marcador para AT |
| \`aria-live="polite"\` | en el contador | Anuncia el cambio de paso |

#### Anuncio en lectores de pantalla
- Al cargar: *"Proceso de inscripción — Paso 1 de 5: Datos personales"*
- Al avanzar: el contador anuncia *"Paso 2 de 5"* automáticamente (live region)
- Marcador activo: *"Información académica, paso actual"*
- Marcador completado: *"Datos personales, completado"*

#### Auditoría v1 → v2
| Hallazgo v1 (Cortés, feb 2026) | Criterio WCAG | Resolución en v2 |
|--------------------------------|---------------|------------------|
| Sin indicador del paso actual — solo color diferenciaba el estado activo | 1.4.1 | \`aria-current="step"\` en el marcador activo |
| Contraste de pasos pendientes muy bajo | 1.4.3 | Tokens semánticos con contraste garantizado ≥ 4.5:1 |
| Sin anuncio dinámico al cambiar de paso | 4.1.3 | \`aria-live="polite"\` en el contador de pasos |

### Buenas prácticas
✅ Provee un \`ariaLabel\` descriptivo del proceso: *"Proceso de inscripción"*, no *"Stepper"*.
✅ Mantén las etiquetas de paso cortas — max 2-3 palabras para orientación horizontal.
✅ Para flujos en espacios reducidos, usa \`pds-stepper-compact\`.
❌ No uses el stepper para navegación no secuencial — el usuario espera un orden lineal.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<PdsStepperComponent>;

// ── Sandbox ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default — Sandbox',
  args: {
    steps: STEPS_ENROLLMENT,
    currentStepIndex: 1,
    showCount: true,
    orientation: 'horizontal',
    ariaLabel: 'Proceso de inscripción',
  },
};

// ── Horizontal ────────────────────────────────────────────────────────────────

export const Horizontal: Story = {
  name: 'Orientación horizontal',
  render: () => ({
    props: {
      steps: STEPS_ENROLLMENT,
      currentStep: 2,
    },
    template: `
      <pds-stepper
        [steps]="steps"
        [currentStepIndex]="currentStep"
        ariaLabel="Proceso de inscripción"
        (stepChange)="currentStep = $event"
      />
    `,
  }),
};

// ── Vertical ──────────────────────────────────────────────────────────────────

export const Vertical: Story = {
  name: 'Orientación vertical',
  render: () => ({
    props: {
      steps: STEPS_SHORT,
      currentStep: 0,
    },
    template: `
      <div style="max-width:400px">
        <pds-stepper
          [steps]="steps"
          [currentStepIndex]="currentStep"
          orientation="vertical"
          ariaLabel="Proceso de solicitud"
          (stepChange)="currentStep = $event"
        />
      </div>
    `,
  }),
};

// ── Primer paso ───────────────────────────────────────────────────────────────

export const FirstStep: Story = {
  name: 'Primer paso (sin botón Anterior)',
  args: {
    steps: STEPS_ENROLLMENT,
    currentStepIndex: 0,
    showCount: true,
    ariaLabel: 'Proceso de inscripción',
  },
};

// ── Último paso ───────────────────────────────────────────────────────────────

export const LastStep: Story = {
  name: 'Último paso (botón Finalizar)',
  args: {
    steps: STEPS_ENROLLMENT,
    currentStepIndex: 4,
    showCount: true,
    ariaLabel: 'Proceso de inscripción',
  },
};

// ── Sin contador ──────────────────────────────────────────────────────────────

export const WithoutCount: Story = {
  name: 'Sin contador de pasos',
  args: {
    steps: STEPS_ENROLLMENT,
    currentStepIndex: 2,
    showCount: false,
    ariaLabel: 'Proceso de inscripción',
  },
};

// ── Accesibilidad ─────────────────────────────────────────────────────────────

export const A11yAriaLive: Story = {
  name: 'A11y — aria-live en contador (navega con Tab+Enter)',
  parameters: {
    docs: {
      description: {
        story: `
El contador *"Paso X de N"* tiene \`aria-live="polite"\` — NVDA/VoiceOver lo anuncian automáticamente al cambiar de paso.

Usa **Tab** para llegar al botón **Siguiente** y presiona **Enter** para avanzar.
El lector de pantalla anuncia: *"Paso 2 de 5"* sin necesidad de enfocar el contador.

\`aria-current="step"\` en el marcador activo permite navegar por landmarks y escuchar cuál paso está activo.
        `,
      },
    },
  },
  args: {
    steps: STEPS_ENROLLMENT,
    currentStepIndex: 0,
    showCount: true,
    ariaLabel: 'Proceso de inscripción — Tab + Enter para navegar',
  },
};
