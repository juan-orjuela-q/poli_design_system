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

// ── Estilos compartidos para contenido de demo ────────────────────────────────

const DEMO_STYLES = `
  <style>
    .demo-body {
      font-family: var(--text-body, 'Open Sans', sans-serif);
      color: var(--fg-neutral-primary, #0f385a);
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .demo-body h4 {
      margin: 0 0 4px;
      font-family: var(--text-component, Poppins);
      font-size: var(--font-size-f-md, 1rem);
      font-weight: 600;
      color: var(--fg-brand-primary, #0f385a);
    }
    .demo-body p {
      margin: 0;
      font-size: var(--font-size-f-sm, 0.875rem);
      color: var(--fg-neutral-secondary, #4d5b69);
      line-height: 1.5;
    }
    .demo-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    .demo-field {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .demo-field label {
      font-family: var(--input-font-label, Poppins);
      font-size: var(--font-size-f-sm, 0.875rem);
      font-weight: 600;
      color: var(--fg-brand-primary, #0f385a);
    }
    .demo-field .demo-input {
      background: var(--surface-neutral-canvas, #fff);
      border: 1px solid var(--border-neutral-default, #b0bec5);
      border-radius: var(--input-radius-base, 10px);
      padding: 10px 12px;
      font-family: var(--input-font-main, 'Open Sans');
      font-size: var(--font-size-f-sm, 0.875rem);
      color: var(--fg-neutral-primary, #0f385a);
      min-height: 44px;
    }
    .demo-field .demo-input--placeholder {
      color: var(--fg-neutral-disabled, #b0bec5);
    }
    .demo-upload {
      border: 2px dashed var(--border-neutral-default, #b0bec5);
      border-radius: var(--radius-container-sm, 10px);
      padding: 24px;
      text-align: center;
      color: var(--fg-neutral-secondary, #4d5b69);
      font-size: var(--font-size-f-sm, 0.875rem);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
    }
    .demo-upload .demo-upload-icon {
      font-family: 'Material Symbols Outlined';
      font-size: 32px;
      color: var(--fg-neutral-tertiary, #b0bec5);
    }
    .demo-summary {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .demo-summary-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 14px;
      background: var(--surface-neutral-subtle, #e5e9ec);
      border-radius: 8px;
    }
    .demo-summary-row .demo-summary-label {
      font-size: var(--font-size-f-sm, 0.875rem);
      color: var(--fg-neutral-secondary, #4d5b69);
    }
    .demo-summary-row .demo-summary-value {
      font-size: var(--font-size-f-sm, 0.875rem);
      font-weight: 600;
      color: var(--fg-brand-primary, #0f385a);
    }
    .demo-badge-ok {
      background: var(--surface-status-success-subtle, #f7fbec);
      color: var(--fg-status-success, #6f921e);
      border: 1px solid var(--border-status-success-solid, #6f921e);
      border-radius: 20px;
      padding: 4px 12px;
      font-size: 0.75rem;
      font-weight: 600;
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
    <div>
      <h4>Datos personales</h4>
      <p>Completa tu información básica para crear tu cuenta en el Politécnico Grancolombiano.</p>
    </div>
    <div class="demo-grid">
      <div class="demo-field">
        <label>Nombres</label>
        <div class="demo-input">Laura Marcela</div>
      </div>
      <div class="demo-field">
        <label>Apellidos</label>
        <div class="demo-input">Ramírez Torres</div>
      </div>
      <div class="demo-field">
        <label>Tipo de documento</label>
        <div class="demo-input">Cédula de ciudadanía</div>
      </div>
      <div class="demo-field">
        <label>Número de documento</label>
        <div class="demo-input">1.020.456.789</div>
      </div>
      <div class="demo-field">
        <label>Correo electrónico</label>
        <div class="demo-input">laura.ramirez</div>
      </div>
      <div class="demo-field">
        <label>Teléfono celular</label>
        <div class="demo-input">+57 310 234 5678</div>
      </div>
    </div>
  </div>`,

  // Paso 1 — Domicilio
  `${DEMO_STYLES}
  <div class="demo-body">
    <div>
      <h4>Dirección de residencia</h4>
      <p>Ingresa tu dirección actual. Esta información es necesaria para el envío de comunicados oficiales.</p>
    </div>
    <div class="demo-grid">
      <div class="demo-field">
        <label>Departamento</label>
        <div class="demo-input">Cundinamarca</div>
      </div>
      <div class="demo-field">
        <label>Ciudad / Municipio</label>
        <div class="demo-input">Bogotá D.C.</div>
      </div>
      <div class="demo-field" style="grid-column: span 2;">
        <label>Dirección</label>
        <div class="demo-input">Calle 57 # 28-14, Apto 302</div>
      </div>
      <div class="demo-field">
        <label>Barrio</label>
        <div class="demo-input">Chapinero Alto</div>
      </div>
      <div class="demo-field">
        <label>Código postal</label>
        <div class="demo-input">110231</div>
      </div>
    </div>
  </div>`,

  // Paso 2 — Documentos
  `${DEMO_STYLES}
  <div class="demo-body">
    <div>
      <h4>Documentos requeridos</h4>
      <p>Adjunta los documentos en formato PDF o imagen (máx. 5 MB por archivo).</p>
    </div>
    <div class="demo-field">
      <label>Copia del documento de identidad</label>
      <div class="demo-upload">
        <span class="demo-upload-icon">upload_file</span>
        <strong>Subir archivo</strong>
        <span>Arrastra y suelta o haz clic para seleccionar</span>
        <span style="color:var(--fg-neutral-tertiary,#b0bec5);">PDF, JPG, PNG — máx. 5 MB</span>
      </div>
    </div>
    <div class="demo-field">
      <label>Certificado de bachillerato</label>
      <div class="demo-upload">
        <span class="demo-upload-icon">upload_file</span>
        <strong>Subir archivo</strong>
        <span>Arrastra y suelta o haz clic para seleccionar</span>
        <span style="color:var(--fg-neutral-tertiary,#b0bec5);">PDF, JPG, PNG — máx. 5 MB</span>
      </div>
    </div>
  </div>`,

  // Paso 3 — Confirmación
  `${DEMO_STYLES}
  <div class="demo-body">
    <div>
      <h4>Resumen de tu inscripción</h4>
      <p>Revisa los datos antes de enviar. Una vez confirmado, recibirás un correo con tu número de radicado.</p>
    </div>
    <div class="demo-summary">
      <div class="demo-summary-row">
        <span class="demo-summary-label">Nombre completo</span>
        <span class="demo-summary-value">Laura Marcela Ramírez Torres</span>
      </div>
      <div class="demo-summary-row">
        <span class="demo-summary-label">Documento</span>
        <span class="demo-summary-value">C.C. 1.020.456.789</span>
      </div>
      <div class="demo-summary-row">
        <span class="demo-summary-label">Correo electrónico</span>
        <span class="demo-summary-value">laura.ramirez</span>
      </div>
      <div class="demo-summary-row">
        <span class="demo-summary-label">Ciudad</span>
        <span class="demo-summary-value">Bogotá D.C.</span>
      </div>
      <div class="demo-summary-row">
        <span class="demo-summary-label">Documentos adjuntos</span>
        <span class="demo-badge-ok">2 archivos listos</span>
      </div>
    </div>
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
        gap: 16px;
      }
      .demo-body h4 {
        margin: 0 0 4px;
        font-family: var(--text-component, Poppins);
        font-size: var(--font-size-f-md, 1rem);
        font-weight: 600;
        color: var(--fg-brand-primary, #0f385a);
      }
      .demo-body p {
        margin: 0;
        font-size: var(--font-size-f-sm, 0.875rem);
        color: var(--fg-neutral-secondary, #4d5b69);
        line-height: 1.5;
      }
      .demo-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
      }
      .demo-field {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .demo-field label {
        font-family: var(--input-font-label, Poppins);
        font-size: var(--font-size-f-sm, 0.875rem);
        font-weight: 600;
        color: var(--fg-brand-primary, #0f385a);
      }
      .demo-input {
        background: var(--surface-neutral-canvas, #fff);
        border: 1px solid var(--border-neutral-default, #b0bec5);
        border-radius: var(--input-radius-base, 10px);
        padding: 10px 12px;
        font-family: var(--input-font-main, 'Open Sans');
        font-size: var(--font-size-f-sm, 0.875rem);
        color: var(--fg-neutral-primary, #0f385a);
        min-height: 44px;
      }
      .demo-upload {
        border: 2px dashed var(--border-neutral-default, #b0bec5);
        border-radius: var(--radius-container-sm, 10px);
        padding: 24px;
        text-align: center;
        color: var(--fg-neutral-secondary, #4d5b69);
        font-size: var(--font-size-f-sm, 0.875rem);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
      }
      .demo-upload .ico {
        font-family: 'Material Symbols Outlined';
        font-size: 32px;
        color: var(--fg-neutral-tertiary, #b0bec5);
      }
      .demo-summary {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .demo-summary-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 14px;
        background: var(--surface-neutral-subtle, #e5e9ec);
        border-radius: 8px;
      }
      .demo-summary-label {
        font-size: var(--font-size-f-sm, 0.875rem);
        color: var(--fg-neutral-secondary, #4d5b69);
      }
      .demo-summary-value {
        font-size: var(--font-size-f-sm, 0.875rem);
        font-weight: 600;
        color: var(--fg-brand-primary, #0f385a);
      }
      .demo-badge-ok {
        background: var(--surface-status-success-subtle, #f7fbec);
        color: var(--fg-status-success, #6f921e);
        border: 1px solid var(--border-status-success-solid, #6f921e);
        border-radius: 20px;
        padding: 4px 12px;
        font-size: 0.75rem;
        font-weight: 600;
      }
      .span2 {
        grid-column: span 2;
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
        <div>
          <h4>Datos personales</h4>
          <p>
            Completa tu información básica para crear tu cuenta en el
            Politécnico Grancolombiano.
          </p>
        </div>
        <div class="demo-grid">
          <div class="demo-field">
            <label>Nombres</label>
            <div class="demo-input">Laura Marcela</div>
          </div>
          <div class="demo-field">
            <label>Apellidos</label>
            <div class="demo-input">Ramírez Torres</div>
          </div>
          <div class="demo-field">
            <label>Tipo de documento</label>
            <div class="demo-input">Cédula de ciudadanía</div>
          </div>
          <div class="demo-field">
            <label>Número de documento</label>
            <div class="demo-input">1.020.456.789</div>
          </div>
          <div class="demo-field">
            <label>Correo electrónico</label>
            <div class="demo-input">laura.ramirez</div>
          </div>
          <div class="demo-field">
            <label>Teléfono celular</label>
            <div class="demo-input">+57 310 234 5678</div>
          </div>
        </div>
      </div>
      }

      <!-- Paso 1 — Domicilio -->
      @if (currentIndex === 1) {
      <div class="demo-body">
        <div>
          <h4>Dirección de residencia</h4>
          <p>
            Ingresa tu dirección actual. Esta información es necesaria para el
            envío de comunicados oficiales.
          </p>
        </div>
        <div class="demo-grid">
          <div class="demo-field">
            <label>Departamento</label>
            <div class="demo-input">Cundinamarca</div>
          </div>
          <div class="demo-field">
            <label>Ciudad / Municipio</label>
            <div class="demo-input">Bogotá D.C.</div>
          </div>
          <div class="demo-field span2">
            <label>Dirección</label>
            <div class="demo-input">Calle 57 # 28-14, Apto 302</div>
          </div>
          <div class="demo-field">
            <label>Barrio</label>
            <div class="demo-input">Chapinero Alto</div>
          </div>
          <div class="demo-field">
            <label>Código postal</label>
            <div class="demo-input">110231</div>
          </div>
        </div>
      </div>
      }

      <!-- Paso 2 — Documentos -->
      @if (currentIndex === 2) {
      <div class="demo-body">
        <div>
          <h4>Documentos requeridos</h4>
          <p>
            Adjunta los documentos en formato PDF o imagen (máx. 5 MB por
            archivo).
          </p>
        </div>
        <div class="demo-field">
          <label>Copia del documento de identidad</label>
          <div class="demo-upload">
            <span class="ico">upload_file</span>
            <strong>Subir archivo</strong>
            <span>Arrastra y suelta o haz clic para seleccionar</span>
            <span style="color:var(--fg-neutral-tertiary,#b0bec5)"
              >PDF, JPG, PNG — máx. 5 MB</span
            >
          </div>
        </div>
        <div class="demo-field">
          <label>Certificado de bachillerato</label>
          <div class="demo-upload">
            <span class="ico">upload_file</span>
            <strong>Subir archivo</strong>
            <span>Arrastra y suelta o haz clic para seleccionar</span>
            <span style="color:var(--fg-neutral-tertiary,#b0bec5)"
              >PDF, JPG, PNG — máx. 5 MB</span
            >
          </div>
        </div>
      </div>
      }

      <!-- Paso 3 — Confirmación -->
      @if (currentIndex === 3) {
      <div class="demo-body">
        <div>
          <h4>Resumen de tu inscripción</h4>
          <p>
            Revisa los datos antes de enviar. Una vez confirmado, recibirás un
            correo con tu número de radicado.
          </p>
        </div>
        <div class="demo-summary">
          <div class="demo-summary-row">
            <span class="demo-summary-label">Nombre completo</span
            ><span class="demo-summary-value"
              >Laura Marcela Ramírez Torres</span
            >
          </div>
          <div class="demo-summary-row">
            <span class="demo-summary-label">Documento</span
            ><span class="demo-summary-value">C.C. 1.020.456.789</span>
          </div>
          <div class="demo-summary-row">
            <span class="demo-summary-label">Correo electrónico</span
            ><span class="demo-summary-value"
              >laura.ramirez</span
            >
          </div>
          <div class="demo-summary-row">
            <span class="demo-summary-label">Ciudad</span
            ><span class="demo-summary-value">Bogotá D.C.</span>
          </div>
          <div class="demo-summary-row">
            <span class="demo-summary-label">Documentos adjuntos</span
            ><span class="demo-badge-ok">2 archivos listos</span>
          </div>
        </div>
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
