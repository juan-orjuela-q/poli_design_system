import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Component, input, output } from '@angular/core';
import { PdsStepperComponent, StepperStep } from './pds-stepper.component';

// ── Sample data ──────────────────────────────────────────────────────────────

const SAMPLE_STEPS_4: StepperStep[] = [
  {
    id: 'account',
    label: 'Account',
    description: 'Account information',
    icon: 'person',
  },
  {
    id: 'address',
    label: 'Address',
    description: 'Billing address',
    icon: 'home',
  },
  {
    id: 'payment',
    label: 'Payment',
    description: 'Payment method',
    icon: 'credit_card',
  },
  {
    id: 'confirm',
    label: 'Confirm',
    description: 'Review & submit',
    icon: 'check_circle',
  },
];

const SAMPLE_STEPS_3: StepperStep[] = [
  { id: 'info', label: 'Info', description: 'Personal data', icon: 'badge' },
  {
    id: 'docs',
    label: 'Docs',
    description: 'Upload documents',
    icon: 'upload_file',
  },
  { id: 'done', label: 'Done', description: 'Confirmation', icon: 'task_alt' },
];

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

/** Default view — 4-step flow positioned on step 2 (shows completed/current/disabled). */
export const Default: Story = {
  args: {
    steps: SAMPLE_STEPS_4,
    currentStepIndex: 1,
    showCount: true,
    orientation: 'horizontal',
    prevLabel: 'Anterior',
    nextLabel: 'Siguiente',
    finishLabel: 'Finalizar',
    ariaLabel: 'Proceso de registro',
  },
};

/** First step — only "Siguiente" button is shown (no "Anterior"). */
export const FirstStep: Story = {
  args: {
    steps: SAMPLE_STEPS_4,
    currentStepIndex: 0,
    showCount: true,
    orientation: 'horizontal',
  },
};

/** Middle step — both "Anterior" and "Siguiente" buttons visible. */
export const MiddleStep: Story = {
  args: {
    steps: SAMPLE_STEPS_4,
    currentStepIndex: 2,
    showCount: true,
    orientation: 'horizontal',
  },
};

/** Last step — "Siguiente" is replaced by "Finalizar". */
export const LastStep: Story = {
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
  args: {
    steps: SAMPLE_STEPS_3,
    currentStepIndex: 1,
    showCount: true,
    orientation: 'horizontal',
  },
};

/** Without step counter label. */
export const WithoutCounter: Story = {
  args: {
    steps: SAMPLE_STEPS_4,
    currentStepIndex: 1,
    showCount: false,
    orientation: 'horizontal',
  },
};

/** Vertical orientation — markers stacked top to bottom. */
export const VerticalOrientation: Story = {
  args: {
    steps: SAMPLE_STEPS_3,
    currentStepIndex: 1,
    showCount: true,
    orientation: 'vertical',
  },
};

/**
 * Interactive demo — wraps PdsStepperComponent to allow clicking the
 * Anterior / Siguiente / Finalizar buttons and watching the stepper advance.
 */
@Component({
  selector: 'storybook-stepper-interactive-demo',
  standalone: true,
  imports: [PdsStepperComponent],
  template: `
    <pds-stepper
      [steps]="steps()"
      [currentStepIndex]="currentIndex"
      [showCount]="true"
      ariaLabel="Demo de proceso interactivo"
      (stepChange)="currentIndex = $event"
      (finished)="currentIndex = 0"
    >
      <div
        style="padding:24px 0; color:var(--fg-neutral-secondary,#4d5b69); font-family:var(--text-body,'Open Sans',sans-serif);"
      >
        Contenido del paso {{ currentIndex + 1 }}:
        {{ steps()[currentIndex]?.label }}
      </div>
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
