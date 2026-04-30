import { Component, signal } from '@angular/core';
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

const STEP_CONTENT_5 = [
  // Paso 0 — Crear cuenta
  `<div style="display:flex;flex-direction:column;gap:10px;font-family:var(--text-body,'Open Sans',sans-serif);">
    <p style="margin:0;font-size:var(--font-size-f-sm,0.875rem);color:var(--fg-neutral-secondary,#4d5b69);">Ingresa tus datos para registrarte en el Politécnico Grancolombiano.</p>
    <div style="display:flex;flex-direction:column;gap:6px;">
      <label style="font-family:var(--input-font-label,Poppins);font-size:0.8125rem;font-weight:600;color:var(--fg-brand-primary,#0f385a);">Correo institucional</label>
      <div style="background:var(--surface-neutral-canvas,#fff);border:1px solid var(--border-neutral-default,#b0bec5);border-radius:var(--input-radius-base,10px);padding:10px 12px;font-size:0.875rem;color:var(--fg-neutral-primary,#0f385a);">laura.ramirez</div>
    </div>
    <div style="display:flex;flex-direction:column;gap:6px;">
      <label style="font-family:var(--input-font-label,Poppins);font-size:0.8125rem;font-weight:600;color:var(--fg-brand-primary,#0f385a);">Contraseña</label>
      <div style="background:var(--surface-neutral-canvas,#fff);border:1px solid var(--border-neutral-default,#b0bec5);border-radius:var(--input-radius-base,10px);padding:10px 12px;font-size:0.875rem;color:var(--fg-neutral-tertiary,#b0bec5);">••••••••••</div>
    </div>
  </div>`,

  // Paso 1 — Verificar información
  `<div style="display:flex;flex-direction:column;gap:10px;font-family:var(--text-body,'Open Sans',sans-serif);">
    <p style="margin:0;font-size:var(--font-size-f-sm,0.875rem);color:var(--fg-neutral-secondary,#4d5b69);">Hemos enviado un código de verificación a <strong>laura.ramirez</strong>.</p>
    <div style="display:flex;flex-direction:column;gap:6px;">
      <label style="font-family:var(--input-font-label,Poppins);font-size:0.8125rem;font-weight:600;color:var(--fg-brand-primary,#0f385a);">Código de verificación</label>
      <div style="background:var(--surface-neutral-canvas,#fff);border:1px solid var(--border-neutral-default,#b0bec5);border-radius:var(--input-radius-base,10px);padding:10px 12px;font-size:1rem;font-weight:700;letter-spacing:6px;color:var(--fg-brand-primary,#0f385a);text-align:center;">4 8 2 1</div>
    </div>
    <p style="margin:0;font-size:0.75rem;color:var(--fg-neutral-tertiary,#b0bec5);">El código expira en 10 minutos. ¿No lo recibiste? <span style="color:var(--fg-brand-primary,#0f385a);cursor:pointer;font-weight:600;">Reenviar</span></p>
  </div>`,

  // Paso 2 — Seleccionar plan
  `<div style="display:flex;flex-direction:column;gap:10px;font-family:var(--text-body,'Open Sans',sans-serif);">
    <p style="margin:0;font-size:var(--font-size-f-sm,0.875rem);color:var(--fg-neutral-secondary,#4d5b69);">Selecciona el plan que mejor se adapta a tus necesidades.</p>
    <div style="border:2px solid var(--border-brand-primary-solid,#0f385a);border-radius:10px;padding:14px 16px;display:flex;justify-content:space-between;align-items:center;background:var(--surface-brand-primary-soft,#e6effd);">
      <div>
        <p style="margin:0;font-weight:600;font-size:0.875rem;color:var(--fg-brand-primary,#0f385a);">Plan Básico</p>
        <p style="margin:4px 0 0;font-size:0.75rem;color:var(--fg-neutral-secondary,#4d5b69);">Acceso a todos los módulos del curso</p>
      </div>
      <span style="font-size:0.875rem;font-weight:700;color:var(--fg-brand-primary,#0f385a);">$0 / mes</span>
    </div>
    <div style="border:1px solid var(--border-neutral-default,#b0bec5);border-radius:10px;padding:14px 16px;display:flex;justify-content:space-between;align-items:center;">
      <div>
        <p style="margin:0;font-weight:600;font-size:0.875rem;color:var(--fg-neutral-primary,#0f385a);">Plan Premium</p>
        <p style="margin:4px 0 0;font-size:0.75rem;color:var(--fg-neutral-secondary,#4d5b69);">Módulos + recursos adicionales + soporte</p>
      </div>
      <span style="font-size:0.875rem;font-weight:700;color:var(--fg-neutral-primary,#0f385a);">$29.900 / mes</span>
    </div>
  </div>`,

  // Paso 3 — Configurar pago
  `<div style="display:flex;flex-direction:column;gap:10px;font-family:var(--text-body,'Open Sans',sans-serif);">
    <p style="margin:0;font-size:var(--font-size-f-sm,0.875rem);color:var(--fg-neutral-secondary,#4d5b69);">Ingresa los datos de tu método de pago.</p>
    <div style="display:flex;flex-direction:column;gap:6px;">
      <label style="font-family:var(--input-font-label,Poppins);font-size:0.8125rem;font-weight:600;color:var(--fg-brand-primary,#0f385a);">Número de tarjeta</label>
      <div style="background:var(--surface-neutral-canvas,#fff);border:1px solid var(--border-neutral-default,#b0bec5);border-radius:var(--input-radius-base,10px);padding:10px 12px;font-size:0.875rem;color:var(--fg-neutral-primary,#0f385a);">**** **** **** 4521</div>
    </div>
    <div style="display:flex;gap:12px;">
      <div style="flex:1;display:flex;flex-direction:column;gap:6px;">
        <label style="font-family:var(--input-font-label,Poppins);font-size:0.8125rem;font-weight:600;color:var(--fg-brand-primary,#0f385a);">Vencimiento</label>
        <div style="background:var(--surface-neutral-canvas,#fff);border:1px solid var(--border-neutral-default,#b0bec5);border-radius:var(--input-radius-base,10px);padding:10px 12px;font-size:0.875rem;color:var(--fg-neutral-primary,#0f385a);">08/28</div>
      </div>
      <div style="flex:1;display:flex;flex-direction:column;gap:6px;">
        <label style="font-family:var(--input-font-label,Poppins);font-size:0.8125rem;font-weight:600;color:var(--fg-brand-primary,#0f385a);">CVV</label>
        <div style="background:var(--surface-neutral-canvas,#fff);border:1px solid var(--border-neutral-default,#b0bec5);border-radius:var(--input-radius-base,10px);padding:10px 12px;font-size:0.875rem;color:var(--fg-neutral-primary,#0f385a);">•••</div>
      </div>
    </div>
  </div>`,

  // Paso 4 — Confirmar y activar
  `<div style="display:flex;flex-direction:column;gap:10px;font-family:var(--text-body,'Open Sans',sans-serif);">
    <p style="margin:0;font-size:var(--font-size-f-sm,0.875rem);color:var(--fg-neutral-secondary,#4d5b69);">Revisa los datos antes de activar tu cuenta. Una vez confirmado recibirás un correo de bienvenida.</p>
    <div style="display:flex;flex-direction:column;gap:6px;">
      <div style="display:flex;justify-content:space-between;padding:8px 12px;background:var(--surface-neutral-subtle,#e5e9ec);border-radius:8px;font-size:0.8125rem;"><span style="color:var(--fg-neutral-secondary,#4d5b69);">Correo</span><strong style="color:var(--fg-brand-primary,#0f385a);">laura.ramirez</strong></div>
      <div style="display:flex;justify-content:space-between;padding:8px 12px;background:var(--surface-neutral-subtle,#e5e9ec);border-radius:8px;font-size:0.8125rem;"><span style="color:var(--fg-neutral-secondary,#4d5b69);">Plan</span><strong style="color:var(--fg-brand-primary,#0f385a);">Básico (Gratuito)</strong></div>
      <div style="display:flex;justify-content:space-between;padding:8px 12px;background:var(--surface-neutral-subtle,#e5e9ec);border-radius:8px;font-size:0.8125rem;"><span style="color:var(--fg-neutral-secondary,#4d5b69);">Pago</span><strong style="color:var(--fg-brand-primary,#0f385a);">Tarjeta •••• 4521</strong></div>
      <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 12px;background:var(--surface-neutral-subtle,#e5e9ec);border-radius:8px;font-size:0.8125rem;"><span style="color:var(--fg-neutral-secondary,#4d5b69);">Estado</span><span style="background:var(--surface-status-success-subtle,#f7fbec);color:var(--fg-status-success,#6f921e);border:1px solid var(--border-status-success-solid,#6f921e);border-radius:20px;padding:3px 10px;font-size:0.75rem;font-weight:600;">Listo para activar</span></div>
    </div>
  </div>`,
];

// ── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<PdsStepperCompactComponent> = {
  title: 'DS v2/Stepper Compact',
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
        <div style="padding:16px;background:var(--surface-neutral-subtle,#e5e9ec);border-radius:10px;font-family:var(--text-body,'Open Sans',sans-serif);font-size:0.875rem;color:var(--fg-neutral-secondary,#4d5b69);">
          Completa los campos requeridos para avanzar al siguiente paso.
        </div>
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
        <div style="padding:16px;background:var(--surface-neutral-subtle,#e5e9ec);border-radius:10px;font-family:var(--text-body,'Open Sans',sans-serif);font-size:0.875rem;color:var(--fg-neutral-secondary,#4d5b69);">
          Completa todos los pasos del flujo de onboarding para activar tu cuenta.
        </div>
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

/**
 * Sobre superficie Sunken — contraste máximo también garantizado.
 */
export const SobreSuperficieSunken: Story = {
  name: 'Sobre superficie Sunken',
  decorators: [
    componentWrapperDecorator(
      (story) =>
        `<div style="max-width:480px;padding:24px;background:var(--surface-neutral-sunken,#ced5db);">${story}</div>`
    ),
  ],
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

/**
 * Interactivo — navegación completa controlada por el padre.
 * Muestra contenido real de un flujo de activación de cuenta.
 */
@Component({
  standalone: true,
  imports: [PdsStepperCompactComponent],
  styles: [
    `
      .demo-body {
        font-family: var(--text-body, 'Open Sans', sans-serif);
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .demo-field {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .demo-label {
        font-family: var(--input-font-label, Poppins);
        font-size: 0.8125rem;
        font-weight: 600;
        color: var(--fg-brand-primary, #0f385a);
      }
      .demo-input {
        background: var(--surface-neutral-canvas, #fff);
        border: 1px solid var(--border-neutral-default, #b0bec5);
        border-radius: var(--input-radius-base, 10px);
        padding: 10px 12px;
        font-size: 0.875rem;
        color: var(--fg-neutral-primary, #0f385a);
        min-height: 44px;
      }
      .demo-input--placeholder {
        color: var(--fg-neutral-tertiary, #b0bec5);
      }
      .demo-note {
        margin: 0;
        font-size: var(--font-size-f-sm, 0.875rem);
        color: var(--fg-neutral-secondary, #4d5b69);
      }
      .demo-card {
        border-radius: 10px;
        padding: 14px 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .demo-card--active {
        border: 2px solid var(--border-brand-primary-solid, #0f385a);
        background: var(--surface-brand-primary-soft, #e6effd);
      }
      .demo-card--inactive {
        border: 1px solid var(--border-neutral-default, #b0bec5);
      }
      .demo-card-title {
        margin: 0;
        font-weight: 600;
        font-size: 0.875rem;
        color: var(--fg-brand-primary, #0f385a);
      }
      .demo-card-desc {
        margin: 4px 0 0;
        font-size: 0.75rem;
        color: var(--fg-neutral-secondary, #4d5b69);
      }
      .demo-card-price {
        font-size: 0.875rem;
        font-weight: 700;
        color: var(--fg-brand-primary, #0f385a);
      }
      .demo-row {
        display: flex;
        gap: 12px;
      }
      .demo-summary-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 12px;
        background: var(--surface-neutral-subtle, #e5e9ec);
        border-radius: 8px;
        font-size: 0.8125rem;
      }
      .demo-summary-key {
        color: var(--fg-neutral-secondary, #4d5b69);
      }
      .demo-summary-val {
        font-weight: 600;
        color: var(--fg-brand-primary, #0f385a);
      }
      .demo-badge {
        background: var(--surface-status-success-subtle, #f7fbec);
        color: var(--fg-status-success, #6f921e);
        border: 1px solid var(--border-status-success-solid, #6f921e);
        border-radius: 20px;
        padding: 3px 10px;
        font-size: 0.75rem;
        font-weight: 600;
      }
      .otp {
        font-size: 1rem;
        font-weight: 700;
        letter-spacing: 6px;
        text-align: center;
      }
      .otp-hint {
        margin: 0;
        font-size: 0.75rem;
        color: var(--fg-neutral-tertiary, #b0bec5);
      }
      .resend {
        color: var(--fg-brand-primary, #0f385a);
        cursor: pointer;
        font-weight: 600;
      }
    `,
  ],
  template: `
    <pds-stepper-compact
      [steps]="steps"
      [currentIndex]="currentIndex()"
      (next)="onNext()"
      (prev)="onPrev()"
    >
      <!-- Paso 0 — Crear cuenta -->
      @if (currentIndex() === 0) {
      <div class="demo-body">
        <p class="demo-note">
          Ingresa tus datos para registrarte en el Politécnico Grancolombiano.
        </p>
        <div class="demo-field">
          <span class="demo-label">Correo institucional</span>
          <div class="demo-input">laura.ramirez</div>
        </div>
        <div class="demo-field">
          <span class="demo-label">Contraseña</span>
          <div class="demo-input demo-input--placeholder">••••••••••</div>
        </div>
      </div>
      }

      <!-- Paso 1 — Verificar información -->
      @if (currentIndex() === 1) {
      <div class="demo-body">
        <p class="demo-note">
          Hemos enviado un código de verificación a
          <strong>laura.ramirez</strong>.
        </p>
        <div class="demo-field">
          <span class="demo-label">Código de verificación</span>
          <div class="demo-input otp">4 8 2 1</div>
        </div>
        <p class="otp-hint">
          El código expira en 10 minutos. ¿No lo recibiste?
          <span class="resend">Reenviar</span>
        </p>
      </div>
      }

      <!-- Paso 2 — Seleccionar plan -->
      @if (currentIndex() === 2) {
      <div class="demo-body">
        <p class="demo-note">
          Selecciona el plan que mejor se adapta a tus necesidades.
        </p>
        <div class="demo-card demo-card--active">
          <div>
            <p class="demo-card-title">Plan Básico</p>
            <p class="demo-card-desc">Acceso a todos los módulos del curso</p>
          </div>
          <span class="demo-card-price">$0 / mes</span>
        </div>
        <div class="demo-card demo-card--inactive">
          <div>
            <p class="demo-card-title">Plan Premium</p>
            <p class="demo-card-desc">
              Módulos + recursos adicionales + soporte
            </p>
          </div>
          <span class="demo-card-price">$29.900 / mes</span>
        </div>
      </div>
      }

      <!-- Paso 3 — Configurar pago -->
      @if (currentIndex() === 3) {
      <div class="demo-body">
        <p class="demo-note">Ingresa los datos de tu método de pago.</p>
        <div class="demo-field">
          <span class="demo-label">Número de tarjeta</span>
          <div class="demo-input">**** **** **** 4521</div>
        </div>
        <div class="demo-row">
          <div class="demo-field" style="flex:1">
            <span class="demo-label">Vencimiento</span>
            <div class="demo-input">08/28</div>
          </div>
          <div class="demo-field" style="flex:1">
            <span class="demo-label">CVV</span>
            <div class="demo-input">•••</div>
          </div>
        </div>
      </div>
      }

      <!-- Paso 4 — Confirmar y activar -->
      @if (currentIndex() === 4) {
      <div class="demo-body">
        <p class="demo-note">Revisa los datos antes de activar tu cuenta.</p>
        <div class="demo-summary-item">
          <span class="demo-summary-key">Correo</span
          ><span class="demo-summary-val">laura.ramirez</span>
        </div>
        <div class="demo-summary-item">
          <span class="demo-summary-key">Plan</span
          ><span class="demo-summary-val">Básico (Gratuito)</span>
        </div>
        <div class="demo-summary-item">
          <span class="demo-summary-key">Pago</span
          ><span class="demo-summary-val">Tarjeta •••• 4521</span>
        </div>
        <div class="demo-summary-item">
          <span class="demo-summary-key">Estado</span
          ><span class="demo-badge">Listo para activar</span>
        </div>
      </div>
      }
    </pds-stepper-compact>
  `,
})
class InteractiveDemoComponent {
  readonly steps = STEPS_5;
  protected readonly currentIndex = signal(0);

  onNext(): void {
    if (this.currentIndex() < this.steps.length - 1) {
      this.currentIndex.update((i) => i + 1);
    }
  }

  onPrev(): void {
    if (this.currentIndex() > 0) {
      this.currentIndex.update((i) => i - 1);
    }
  }
}

export const Interactivo: Story = {
  name: 'Interactivo (navegación completa)',
  render: () => ({
    component: InteractiveDemoComponent,
    props: {},
  }),
};
