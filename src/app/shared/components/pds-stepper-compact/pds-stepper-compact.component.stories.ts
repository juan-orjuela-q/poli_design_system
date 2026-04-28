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
  args: {
    steps: STEPS_5,
    currentIndex: 0,
  },
};

/** Paso intermedio — muestra ambos botones de navegación. */
export const PasoIntermedio: Story = {
  name: 'Paso 3 de 5 (intermedio)',
  args: {
    steps: STEPS_5,
    currentIndex: 2,
  },
};

/** Último paso — botón "Finalizar" con ícono check. */
export const UltimoPaso: Story = {
  name: 'Último paso (Finalizar)',
  args: {
    steps: STEPS_5,
    currentIndex: 4,
  },
};

/** Flujo de 3 pasos — versión mínima. */
export const Flujo3Pasos: Story = {
  name: '3 pasos',
  args: {
    steps: STEPS_3,
    currentIndex: 1,
  },
};

/** Flujo de 7 pasos — muchos marcadores, todos flex:1. */
export const Flujo7Pasos: Story = {
  name: '7 pasos',
  args: {
    steps: STEPS_7,
    currentIndex: 3,
  },
};

/** Sin pie de navegación — solo el encabezado con marcadores. */
export const SinFooter: Story = {
  name: 'Sin footer de navegación',
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
  args: {
    steps: STEPS_5,
    currentIndex: 2,
  },
};

/**
 * Interactivo — navegación completa controlada por el padre.
 * Los botones incrementan / decrementan el índice.
 */
@Component({
  standalone: true,
  imports: [PdsStepperCompactComponent],
  template: `
    <pds-stepper-compact
      [steps]="steps"
      [currentIndex]="currentIndex()"
      (next)="onNext()"
      (prev)="onPrev()"
    >
      <div
        style="
        min-height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--surface-neutral-subtle, #e5e9ec);
        border-radius: 10px;
        font-family: var(--text-component, Poppins);
        font-size: 0.875rem;
        color: var(--fg-neutral-secondary, #4d5b69);
      "
      >
        Contenido del paso {{ currentIndex() + 1 }}
      </div>
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
