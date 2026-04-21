import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { PdsCardComponent } from './pds-card.component';

const meta: Meta<PdsCardComponent> = {
  title: 'DS v2/Card',
  component: PdsCardComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [PdsCardComponent] })],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    behavior: {
      control: 'select',
      options: ['info', 'nav', 'selectable'],
      description: 'Modo de comportamiento de la card.',
    },
    title: { control: 'text' },
    subtitle: { control: 'text' },
    description: { control: 'text' },
    iconName: { control: 'text', description: 'Nombre del ícono Material Symbols.' },
    imageSrc: { control: 'text', description: 'URL de la imagen de cabecera.' },
    imageAlt: { control: 'text' },
    actionLabel: { control: 'text' },
    showAction: { control: 'boolean' },
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<PdsCardComponent>;

const IMAGE = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=640&q=80';

// ── Info Card ──────────────────────────────────────────────────────────────────

export const InfoCard: Story = {
  name: 'Info — con imagen y botón',
  args: {
    behavior: 'info',
    title: 'Seguridad de datos',
    subtitle: 'ISO 27001 certificado',
    description:
      'Esta infraestructura cumple con los estándares ISO 27001 y cifrado de extremo a extremo para todos los activos.',
    iconName: 'hive',
    imageSrc: IMAGE,
    imageAlt: 'Infraestructura de seguridad',
    showAction: true,
    actionLabel: 'Ver detalles',
  },
};

export const InfoCardSinImagen: Story = {
  name: 'Info — sin imagen',
  args: {
    behavior: 'info',
    title: 'Seguridad de datos',
    subtitle: 'ISO 27001 certificado',
    description:
      'Esta infraestructura cumple con los estándares ISO 27001 y cifrado de extremo a extremo para todos los activos.',
    iconName: 'security',
    showAction: true,
    actionLabel: 'Saber más',
  },
};

export const InfoCardMinima: Story = {
  name: 'Info — solo título',
  args: {
    behavior: 'info',
    title: 'Título de la card',
    showAction: false,
  },
};

// ── Nav Card ───────────────────────────────────────────────────────────────────

export const NavCard: Story = {
  name: 'Nav — con imagen',
  args: {
    behavior: 'nav',
    title: 'Servicios académicos',
    subtitle: 'Gestión de matrículas',
    description:
      'Esta infraestructura cumple con los estándares ISO 27001 y cifrado de extremo a extremo para todos los activos.',
    iconName: 'hive',
    imageSrc: IMAGE,
    imageAlt: 'Servicios académicos',
  },
};

export const NavCardSinImagen: Story = {
  name: 'Nav — sin imagen',
  args: {
    behavior: 'nav',
    title: 'Servicios académicos',
    subtitle: 'Gestión de matrículas',
    description:
      'Accede a toda la información de tus procesos académicos y administrativos desde un solo lugar.',
    iconName: 'school',
  },
};

// ── Selectable Card ────────────────────────────────────────────────────────────

export const SelectableDefault: Story = {
  name: 'Selectable — no seleccionada',
  args: {
    behavior: 'selectable',
    title: 'Plan básico',
    subtitle: 'Acceso estándar',
    description:
      'Esta infraestructura cumple con los estándares ISO 27001 y cifrado de extremo a extremo para todos los activos.',
    iconName: 'hive',
    selected: false,
  },
};

export const SelectableSelected: Story = {
  name: 'Selectable — seleccionada',
  args: {
    behavior: 'selectable',
    title: 'Plan básico',
    subtitle: 'Acceso estándar',
    description:
      'Esta infraestructura cumple con los estándares ISO 27001 y cifrado de extremo a extremo para todos los activos.',
    iconName: 'hive',
    selected: true,
  },
};

export const SelectableGroup: Story = {
  name: 'Selectable — grupo (una a la vez)',
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;" role="group" aria-label="Selecciona un plan">
        <pds-card
          behavior="selectable"
          title="Plan básico"
          subtitle="Acceso estándar"
          description="Funcionalidades esenciales para estudiantes."
          iconName="school"
          [selected]="selected === 'basic'"
          (selectedChange)="selected = $event ? 'basic' : null"
          style="width: 280px"
        />
        <pds-card
          behavior="selectable"
          title="Plan profesional"
          subtitle="Acceso completo"
          description="Todas las herramientas disponibles para profesionales."
          iconName="work"
          [selected]="selected === 'pro'"
          (selectedChange)="selected = $event ? 'pro' : null"
          style="width: 280px"
        />
        <pds-card
          behavior="selectable"
          title="Plan empresarial"
          subtitle="Acceso corporativo"
          description="Gestión avanzada para equipos y organizaciones."
          iconName="corporate_fare"
          [selected]="selected === 'enterprise'"
          (selectedChange)="selected = $event ? 'enterprise' : null"
          style="width: 280px"
        />
      </div>
    `,
    props: { selected: 'basic' as string | null },
  }),
};
