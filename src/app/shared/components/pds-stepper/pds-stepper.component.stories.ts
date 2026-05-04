import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Component, input } from '@angular/core';
import { PdsStepperComponent, StepperStep } from './pds-stepper.component';

// ── Sample data ──────────────────────────────────────────────────────────────

const SAMPLE_STEPS_4: StepperStep[] = [
  {
    id: 'datos',
    label: 'Datos personales',
    description: 'Información básica',
    icon: 'person',
  },
  {
    id: 'domicilio',
    label: 'Domicilio',
    description: 'Dirección de residencia',
    icon: 'home',
  },
  {
    id: 'documentos',
    label: 'Documentos',
    description: 'Adjuntar archivos',
    icon: 'upload_file',
  },
  {
    id: 'confirmacion',
    label: 'Confirmación',
    description: 'Revisar y enviar',
    icon: 'check_circle',
  },
];

const SAMPLE_STEPS_3: StepperStep[] = [
  {
    id: 'info',
    label: 'Información',
    description: 'Datos personales',
    icon: 'badge',
  },
  {
    id: 'docs',
    label: 'Documentos',
    description: 'Subir archivos',
    icon: 'upload_file',
  },
  {
    id: 'done',
    label: 'Confirmación',
    description: 'Revisar y enviar',
    icon: 'task_alt',
  },
];

// ── Estilos compartidos para contenido de demo (neutro) ─────────────────────

const DEMO_STYLES = `
  <style>
    .demo-body {
      font-family: var(--text-body, 'Open Sans', sans-serif);
      color: var(--fg-neutral-primary, #0f385a);
      display: flex;
      flex-direction: column;
      gap: var(--spacing-component-md, 12px);
    }
    .demo-title {
      margin: 0;
      font-family: var(--text-headings, Poppins);
      font-size: var(--font-size-f-lg, 18px);
      font-weight: var(--font-weight-w-semibold, 600);
      line-height: 1.2;
      color: var(--fg-brand-primary, #0f385a);
    }
    .demo-text {
      margin: 0;
      font-size: var(--font-size-f-sm, 0.875rem);
      line-height: 1.5;
      color: var(--fg-neutral-secondary, #4d5b69);
    }
    .demo-list {
      margin: 0;
      padding-left: var(--spacing-component-lg, 16px);
      display: grid;
      gap: var(--spacing-component-xs, 6px);
      color: var(--fg-neutral-secondary, #4d5b69);
      font-size: var(--font-size-f-sm, 0.875rem);
    }
    .demo-note {
      padding: var(--spacing-component-sm, 8px) var(--spacing-component-md, 12px);
      border-left: var(--border-thick, 2px) solid var(--border-brand-primary-solid, #0f385a);
      background: var(--surface-neutral-subtle, #e5e9ec);
      border-radius: var(--radius-component-2xs, 4px);
      font-size: var(--font-size-f-sm, 0.875rem);
      color: var(--fg-brand-primary, #0f385a);
    }
  </style>
`;

// ── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<PdsStepperComponent> = {
  title: 'DS v2/Stepper',
  component: PdsStepperComponent,
  tags: ['autodocs'],
  decorators: [applicationConfig({ providers: [provideAnimations()] })],
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
    },
    currentStepIndex: { control: { type: 'number', min: 0, step: 1 } },
    showCount: { control: 'boolean' },
    prevLabel: { control: 'text' },
    nextLabel: { control: 'text' },
    finishLabel: { control: 'text' },
    ariaLabel: { control: 'text' },
  },
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<PdsStepperComponent>;

// ── Stories ───────────────────────────────────────────────────────────────────

const STEP_CONTENT_BLOCKS = [
  // Paso 0 — Datos personales
  `${DEMO_STYLES}
  <div class="demo-body">
    <h4 class="demo-title">Datos personales</h4>
    <p class="demo-text">Este bloque es solo informativo para demostrar el slot de contenido del stepper.</p>
    <ul class="demo-list">
      <li>Campos sugeridos: nombres, apellidos, tipo y número de documento.</li>
      <li>Validar formato de correo y teléfono en el formulario real.</li>
      <li>Persistir progreso al cambiar de paso.</li>
    </ul>
    <p class="demo-note">Nota: Los controles de formulario reales deben implementarse con componentes DS v2.</p>
  </div>`,

  // Paso 1 — Domicilio
  `${DEMO_STYLES}
  <div class="demo-body">
    <h4 class="demo-title">Dirección de residencia</h4>
    <p class="demo-text">Ejemplo de contenido descriptivo para este paso sin simular inputs visuales.</p>
    <ul class="demo-list">
      <li>Departamento y ciudad.</li>
      <li>Dirección principal y barrio.</li>
      <li>Código postal y referencias opcionales.</li>
    </ul>
    <p class="demo-note">Este contenido se proyecta con ng-content y puede reemplazarse por layout real del producto.</p>
  </div>`,

  // Paso 2 — Documentos
  `${DEMO_STYLES}
  <div class="demo-body">
    <h4 class="demo-title">Documentos requeridos</h4>
    <p class="demo-text">Resumen de reglas para carga documental en el paso correspondiente.</p>
    <ul class="demo-list">
      <li>Formatos permitidos: PDF, JPG, PNG.</li>
      <li>Tamaño máximo por archivo: 5 MB.</li>
      <li>Mostrar progreso y estado de validación por archivo.</li>
    </ul>
    <p class="demo-note">Para subida de archivos, usar el componente DS de file uploader cuando esté integrado.</p>
  </div>`,

  // Paso 3 — Confirmación
  `${DEMO_STYLES}
  <div class="demo-body">
    <h4 class="demo-title">Confirmación</h4>
    <p class="demo-text">Vista final para revisión antes de enviar la información.</p>
    <ul class="demo-list">
      <li>Revisar datos personales capturados.</li>
      <li>Verificar dirección y documentos asociados.</li>
      <li>Confirmar envío y mostrar número de radicado.</li>
    </ul>
    <p class="demo-note">Este ejemplo evita UI simulada para no confundir con componentes productivos del sistema.</p>
  </div>`,
];

/** Default view — paso 2 de 4 (muestra estados completado / actual / deshabilitado). */
export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <pds-stepper
        [steps]="steps"
        [currentStepIndex]="currentStepIndex"
        [showCount]="showCount"
        [orientation]="orientation"
        [prevLabel]="prevLabel"
        [nextLabel]="nextLabel"
        [finishLabel]="finishLabel"
        [ariaLabel]="ariaLabel"
      >${STEP_CONTENT_BLOCKS[1]}</pds-stepper>
    `,
  }),
  args: {
    steps: SAMPLE_STEPS_4,
    currentStepIndex: 1,
    showCount: true,
    orientation: 'horizontal',
    prevLabel: 'Anterior',
    nextLabel: 'Siguiente',
    finishLabel: 'Finalizar',
    ariaLabel: 'Proceso de inscripción',
  },
};

/** First step — solo se muestra el botón "Siguiente". */
export const FirstStep: Story = {
  render: (args) => ({
    props: args,
    template: `
      <pds-stepper [steps]="steps" [currentStepIndex]="currentStepIndex" [showCount]="showCount" [orientation]="orientation">
        ${STEP_CONTENT_BLOCKS[0]}
      </pds-stepper>
    `,
  }),
  args: {
    steps: SAMPLE_STEPS_4,
    currentStepIndex: 0,
    showCount: true,
    orientation: 'horizontal',
  },
};

/** Middle step — se muestran los botones "Anterior" y "Siguiente". */
export const MiddleStep: Story = {
  render: (args) => ({
    props: args,
    template: `
      <pds-stepper [steps]="steps" [currentStepIndex]="currentStepIndex" [showCount]="showCount" [orientation]="orientation">
        ${STEP_CONTENT_BLOCKS[2]}
      </pds-stepper>
    `,
  }),
  args: {
    steps: SAMPLE_STEPS_4,
    currentStepIndex: 2,
    showCount: true,
    orientation: 'horizontal',
  },
};

/** Last step — "Siguiente" se reemplaza por "Finalizar". */
export const LastStep: Story = {
  render: (args) => ({
    props: args,
    template: `
      <pds-stepper [steps]="steps" [currentStepIndex]="currentStepIndex" [showCount]="showCount" [orientation]="orientation">
        ${STEP_CONTENT_BLOCKS[3]}
      </pds-stepper>
    `,
  }),
  args: {
    steps: SAMPLE_STEPS_4,
    currentStepIndex: 3,
    showCount: true,
    orientation: 'horizontal',
  },
};

/** All three marker states at a glance (3-step stepper at step index 1). */
export const AllMarkerStates: Story = {
  name: 'All Marker States (completed / current / disabled)',
  render: (args) => ({
    props: args,
    template: `
      <pds-stepper [steps]="steps" [currentStepIndex]="currentStepIndex" [showCount]="showCount" [orientation]="orientation">
        ${STEP_CONTENT_BLOCKS[1]}
      </pds-stepper>
    `,
  }),
  args: {
    steps: SAMPLE_STEPS_3,
    currentStepIndex: 1,
    showCount: true,
    orientation: 'horizontal',
  },
};

/** Without step counter label. */
export const WithoutCounter: Story = {
  render: (args) => ({
    props: args,
    template: `
      <pds-stepper [steps]="steps" [currentStepIndex]="currentStepIndex" [showCount]="showCount" [orientation]="orientation">
        ${STEP_CONTENT_BLOCKS[1]}
      </pds-stepper>
    `,
  }),
  args: {
    steps: SAMPLE_STEPS_4,
    currentStepIndex: 1,
    showCount: false,
    orientation: 'horizontal',
  },
};

/** Vertical orientation — markers stacked top to bottom. */
export const VerticalOrientation: Story = {
  render: (args) => ({
    props: args,
    template: `
      <pds-stepper [steps]="steps" [currentStepIndex]="currentStepIndex" [showCount]="showCount" [orientation]="orientation">
        ${STEP_CONTENT_BLOCKS[1]}
      </pds-stepper>
    `,
  }),
  args: {
    steps: SAMPLE_STEPS_3,
    currentStepIndex: 1,
    showCount: true,
    orientation: 'vertical',
  },
};

/**
 * Interactive demo — navega entre pasos con contenido real por cada etapa.
 * Los botones Anterior / Siguiente / Finalizar avanzan el stepper.
 */
@Component({
  selector: 'storybook-stepper-interactive-demo',
  standalone: true,
  imports: [PdsStepperComponent],
  styles: [
    `
      .demo-body {
        font-family: var(--text-body, 'Open Sans', sans-serif);
        color: var(--fg-neutral-primary, #0f385a);
        display: flex;
        flex-direction: column;
        gap: var(--spacing-component-md, 12px);
      }
      .demo-title {
        margin: 0;
        font-family: var(--text-headings, Poppins);
        font-size: var(--font-size-f-lg, 18px);
        font-weight: var(--font-weight-w-semibold, 600);
        line-height: 1.2;
        color: var(--fg-brand-primary, #0f385a);
      }
      .demo-text {
        margin: 0;
        font-size: var(--font-size-f-sm, 0.875rem);
        color: var(--fg-neutral-secondary, #4d5b69);
        line-height: 1.5;
      }
      .demo-list {
        margin: 0;
        padding-left: var(--spacing-component-lg, 16px);
        display: grid;
        gap: var(--spacing-component-xs, 6px);
        color: var(--fg-neutral-secondary, #4d5b69);
        font-size: var(--font-size-f-sm, 0.875rem);
      }
      .demo-note {
        padding: var(--spacing-component-sm, 8px) var(--spacing-component-md, 12px);
        border-left: var(--border-thick, 2px) solid var(--border-brand-primary-solid, #0f385a);
        background: var(--surface-neutral-subtle, #e5e9ec);
        border-radius: var(--radius-component-2xs, 4px);
        font-size: var(--font-size-f-sm, 0.875rem);
        color: var(--fg-brand-primary, #0f385a);
      }
    `,
  ],
  template: `
    <pds-stepper
      [steps]="steps()"
      [currentStepIndex]="currentIndex"
      [showCount]="true"
      ariaLabel="Proceso de inscripción Politécnico"
      prevLabel="Anterior"
      nextLabel="Siguiente"
      finishLabel="Finalizar"
      (stepChange)="currentIndex = $event"
      (finished)="currentIndex = 0"
    >
      <!-- Paso 0 — Datos personales -->
      @if (currentIndex === 0) {
      <div class="demo-body">
        <h4 class="demo-title">Datos personales</h4>
        <p class="demo-text">Este paso muestra solo contenido descriptivo de ejemplo.</p>
        <ul class="demo-list">
          <li>Capturar datos básicos del aspirante.</li>
          <li>Aplicar validaciones en tiempo real.</li>
          <li>Guardar borrador antes de avanzar.</li>
        </ul>
        <p class="demo-note">Implementa campos reales con componentes DS v2 de formulario.</p>
      </div>
      }

      <!-- Paso 1 — Domicilio -->
      @if (currentIndex === 1) {
      <div class="demo-body">
        <h4 class="demo-title">Dirección de residencia</h4>
        <p class="demo-text">Contenido de apoyo del flujo para este paso.</p>
        <ul class="demo-list">
          <li>Seleccionar departamento y municipio.</li>
          <li>Registrar dirección de residencia completa.</li>
          <li>Agregar datos complementarios opcionales.</li>
        </ul>
        <p class="demo-note">Este story evita maquetar controles visuales que no sean del DS.</p>
      </div>
      }

      <!-- Paso 2 — Documentos -->
      @if (currentIndex === 2) {
      <div class="demo-body">
        <h4 class="demo-title">Documentos requeridos</h4>
        <p class="demo-text">Reglas de carga documental para el proceso.</p>
        <ul class="demo-list">
          <li>Formatos permitidos: PDF, JPG y PNG.</li>
          <li>Tamaño máximo: 5 MB por archivo.</li>
          <li>Mostrar estado de carga y validación.</li>
        </ul>
        <p class="demo-note">Usar file-uploader DS v2 cuando el componente esté disponible.</p>
      </div>
      }

      <!-- Paso 3 — Confirmación -->
      @if (currentIndex === 3) {
      <div class="demo-body">
        <h4 class="demo-title">Confirmación</h4>
        <p class="demo-text">Resumen final del flujo antes del envío.</p>
        <ul class="demo-list">
          <li>Revisión de datos personales.</li>
          <li>Revisión de dirección y anexos.</li>
          <li>Confirmación y generación de radicado.</li>
        </ul>
        <p class="demo-note">Mantener este bloque como guía funcional, no como UI definitiva.</p>
      </div>
      }
    </pds-stepper>
  `,
})
class StepperInteractiveDemo {
  readonly steps = input.required<StepperStep[]>();
  currentIndex = 0;
}

export const Interactive: StoryObj<StepperInteractiveDemo> = {
  name: 'Interactive (with body content)',
  render: (args) => ({
    props: args,
    template: `
      <storybook-stepper-interactive-demo [steps]="steps" />
    `,
  }),
  args: {
    steps: SAMPLE_STEPS_4,
  } as any,
  decorators: [applicationConfig({ providers: [provideAnimations()] })],
};
