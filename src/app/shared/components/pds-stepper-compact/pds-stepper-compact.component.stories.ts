import { signal } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import { componentWrapperDecorator } from '@storybook/angular';

import {
  PdsStepperCompactComponent,
  type CompactStep,
} from './pds-stepper-compact.component';

// ── Datos de ejemplo ─────────────────────────────────────────────────────────

const STEPS_5: CompactStep[] = [
  { id: 'cuenta', label: 'Crear cuenta' },
  { id: 'verificar', label: 'Verificar información' },
  { id: 'plan', label: 'Seleccionar plan' },
  { id: 'pago', label: 'Configurar pago' },
  { id: 'confirmar', label: 'Confirmar y activar' },
];

const STEPS_3: CompactStep[] = [
  { id: 'datos', label: 'Datos personales' },
  { id: 'documentos', label: 'Subir documentos' },
  { id: 'revision', label: 'Revisión final' },
];

const STEPS_7: CompactStep[] = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'perfil', label: 'Perfil' },
  { id: 'documentos', label: 'Documentos' },
  { id: 'referencias', label: 'Referencias' },
  { id: 'pago', label: 'Pago' },
  { id: 'revision', label: 'Revisión' },
  { id: 'confirmar', label: 'Confirmación' },
];

// ── Contenido por paso para flujo de 5 pasos ────────────────────────────────

const COMPACT_DEMO_STYLES = `
  <style>
    .compact-demo {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-component-md, 12px);
      font-family: var(--text-body, 'Open Sans', sans-serif);
      color: var(--fg-neutral-primary, #0f385a);
    }
    .compact-demo__title {
      margin: 0;
      font-family: var(--text-headings, Poppins);
      font-size: var(--font-size-f-lg, 18px);
      font-weight: var(--font-weight-w-semibold, 600);
      line-height: 1.2;
      color: var(--fg-brand-primary, #0f385a);
    }
    .compact-demo__text {
      margin: 0;
      font-size: var(--font-size-f-sm, 0.875rem);
      line-height: 1.5;
      color: var(--fg-neutral-secondary, #4d5b69);
    }
    .compact-demo__list {
      margin: 0;
      padding-left: var(--spacing-component-lg, 16px);
      display: grid;
      gap: var(--spacing-component-xs, 6px);
      font-size: var(--font-size-f-sm, 0.875rem);
      color: var(--fg-neutral-secondary, #4d5b69);
    }
    .compact-demo__note {
      margin: 0;
      padding: var(--spacing-component-sm, 8px) var(--spacing-component-md, 12px);
      border-left: var(--border-thick, 2px) solid var(--border-brand-primary-solid, #0f385a);
      border-radius: var(--radius-component-2xs, 4px);
      background: var(--surface-neutral-subtle, #e5e9ec);
      color: var(--fg-brand-primary, #0f385a);
      font-size: var(--font-size-f-sm, 0.875rem);
    }
  </style>
`;

const STEP_CONTENT_5 = [
  // Paso 0 — Crear cuenta
  `${COMPACT_DEMO_STYLES}
  <div class="compact-demo">
    <h4 class="compact-demo__title">Crear cuenta</h4>
    <p class="compact-demo__text">Contenido demostrativo del paso inicial, sin simular componentes visuales de formulario.</p>
    <ul class="compact-demo__list">
      <li>Capturar datos mínimos de registro.</li>
      <li>Validar formato de información.</li>
      <li>Guardar progreso para continuar.</li>
    </ul>
    <p class="compact-demo__note">Este bloque es informativo para Storybook y evita UI no perteneciente al DS.</p>
  </div>`,

  // Paso 1 — Verificar información
  `${COMPACT_DEMO_STYLES}
  <div class="compact-demo">
    <h4 class="compact-demo__title">Verificar información</h4>
    <p class="compact-demo__text">Ejemplo de contenido de verificación para el flujo compact.</p>
    <ul class="compact-demo__list">
      <li>Confirmar correo o medio de contacto.</li>
      <li>Mostrar estado de validación del paso.</li>
      <li>Permitir reintento cuando aplique.</li>
    </ul>
    <p class="compact-demo__note">Para OTP o validaciones visuales, usar componentes DS reales del módulo correspondiente.</p>
  </div>`,

  // Paso 2 — Seleccionar plan
  `${COMPACT_DEMO_STYLES}
  <div class="compact-demo">
    <h4 class="compact-demo__title">Seleccionar plan</h4>
    <p class="compact-demo__text">Contenido de referencia del paso de selección.</p>
    <ul class="compact-demo__list">
      <li>Presentar opciones disponibles.</li>
      <li>Resaltar la opción seleccionada.</li>
      <li>Mostrar impacto en costo o beneficios.</li>
    </ul>
    <p class="compact-demo__note">La UI de selección debe componerse con controles DS en la implementación real.</p>
  </div>`,

  // Paso 3 — Configurar pago
  `${COMPACT_DEMO_STYLES}
  <div class="compact-demo">
    <h4 class="compact-demo__title">Configurar pago</h4>
    <p class="compact-demo__text">Bloque de guía para el paso de método de pago.</p>
    <ul class="compact-demo__list">
      <li>Elegir método disponible.</li>
      <li>Validar datos requeridos por método.</li>
      <li>Confirmar autorización antes de continuar.</li>
    </ul>
    <p class="compact-demo__note">No se incluyen controles mock para evitar confusión con componentes del sistema.</p>
  </div>`,

  // Paso 4 — Confirmar y activar
  `${COMPACT_DEMO_STYLES}
  <div class="compact-demo">
    <h4 class="compact-demo__title">Confirmar y activar</h4>
    <p class="compact-demo__text">Resumen funcional del cierre del flujo.</p>
    <ul class="compact-demo__list">
      <li>Revisar la información consolidada.</li>
      <li>Confirmar aceptación de términos.</li>
      <li>Completar activación de cuenta.</li>
    </ul>
    <p class="compact-demo__note">El resumen visual definitivo debe construirse con componentes DS del producto.</p>
  </div>`,
];

// ── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<PdsStepperCompactComponent> = {
  title: 'Poli Design System / 08. Navigation / Stepper Compact',
  component: PdsStepperCompactComponent,
  tags: ['autodocs'],
  decorators: [
    componentWrapperDecorator(
      (story) =>
        `<div style="max-width:480px;padding:24px;background:var(--surface-neutral-canvas,#fff);">${story}</div>`
    ),
  ],
  argTypes: {
    currentIndex: { control: { type: 'number', min: 0, max: 6, step: 1 } },
    showFooter: { control: 'boolean' },
    nextLabel: { control: 'text' },
    prevLabel: { control: 'text' },
    finishLabel: { control: 'text' },
  },
  args: {
    steps: STEPS_5,
    currentIndex: 0,
    showFooter: true,
    nextLabel: 'Siguiente',
    prevLabel: 'Anterior',
    finishLabel: 'Finalizar',
  },
};

export default meta;
type Story = StoryObj<PdsStepperCompactComponent>;

// ── Stories ──────────────────────────────────────────────────────────────────

/** Paso 1 de 5 — estado inicial con botón "Siguiente". No muestra "Anterior". */
export const Paso1De5: Story = {
  name: 'Paso 1 de 5',
  render: (args) => ({
    props: args,
    template: `
      <pds-stepper-compact [steps]="steps" [currentIndex]="currentIndex" [showFooter]="showFooter">
        ${STEP_CONTENT_5[0]}
      </pds-stepper-compact>
    `,
  }),
  args: {
    steps: STEPS_5,
    currentIndex: 0,
  },
};

/** Paso intermedio — muestra ambos botones de navegación. */
export const PasoIntermedio: Story = {
  name: 'Paso 3 de 5 (intermedio)',
  render: (args) => ({
    props: args,
    template: `
      <pds-stepper-compact [steps]="steps" [currentIndex]="currentIndex" [showFooter]="showFooter">
        ${STEP_CONTENT_5[2]}
      </pds-stepper-compact>
    `,
  }),
  args: {
    steps: STEPS_5,
    currentIndex: 2,
  },
};

/** Último paso — botón "Finalizar" con ícono check. */
export const UltimoPaso: Story = {
  name: 'Último paso (Finalizar)',
  render: (args) => ({
    props: args,
    template: `
      <pds-stepper-compact [steps]="steps" [currentIndex]="currentIndex" [showFooter]="showFooter">
        ${STEP_CONTENT_5[4]}
      </pds-stepper-compact>
    `,
  }),
  args: {
    steps: STEPS_5,
    currentIndex: 4,
  },
};

/** Flujo de 3 pasos — versión mínima. */
export const Flujo3Pasos: Story = {
  name: '3 pasos',
  render: (args) => ({
    props: args,
    template: `
      <pds-stepper-compact [steps]="steps" [currentIndex]="currentIndex" [showFooter]="showFooter">
        ${STEP_CONTENT_5[1]}
      </pds-stepper-compact>
    `,
  }),
  args: {
    steps: STEPS_3,
    currentIndex: 1,
  },
};

/** Flujo de 7 pasos — muchos marcadores, todos flex:1. */
export const Flujo7Pasos: Story = {
  name: '7 pasos',
  render: (args) => ({
    props: args,
    template: `
      <pds-stepper-compact [steps]="steps" [currentIndex]="currentIndex" [showFooter]="showFooter">
        ${STEP_CONTENT_5[2]}
      </pds-stepper-compact>
    `,
  }),
  args: {
    steps: STEPS_7,
    currentIndex: 3,
  },
};

/** Sin pie de navegación — solo el encabezado con marcadores. */
export const SinFooter: Story = {
  name: 'Sin footer de navegación',
  render: (args) => ({
    props: args,
    template: `
      <pds-stepper-compact [steps]="steps" [currentIndex]="currentIndex" [showFooter]="showFooter">
        ${STEP_CONTENT_5[1]}
      </pds-stepper-compact>
    `,
  }),
  args: {
    steps: STEPS_5,
    currentIndex: 1,
    showFooter: false,
  },
};

/**
 * Sobre superficie Subtle — contraste recomendado ≥ 7:1 (MAX).
 * Usar sobre canvas, subtle y sunken.
 */
export const SobreSuperficieSubtle: Story = {
  name: 'Sobre superficie Subtle',
  decorators: [
    componentWrapperDecorator(
      (story) =>
        `<div style="max-width:480px;padding:24px;background:var(--surface-neutral-subtle,#e5e9ec);">${story}</div>`
    ),
  ],
  render: (args) => ({
    props: args,
    template: `
      <pds-stepper-compact [steps]="steps" [currentIndex]="currentIndex" [showFooter]="showFooter">
        ${STEP_CONTENT_5[1]}
      </pds-stepper-compact>
    `,
  }),
  args: {
    steps: STEPS_5,
    currentIndex: 1,
  },
};
