import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { PdsStatCardComponent } from './pds-stat-card.component';

const meta: Meta<PdsStatCardComponent> = {
  title: 'Poli Design System / 07. Content / Cards',
  component: PdsStatCardComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [PdsStatCardComponent] })],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    behavior: {
      control: 'select',
      options: ['info', 'nav', 'selectable'],
      description: 'Modo de comportamiento de la stat card.',
    },
    iconName: { control: 'text' },
    label: { control: 'text' },
    value: { control: 'text' },
    trendValue: { control: 'text', description: 'Ej: "+12.5%". Activa la sección de tendencia.' },
    trendLabel: { control: 'text', description: 'Ej: "vs last month".' },
    badgeStatus: {
      control: 'select',
      options: ['brand', 'brand-subtle', 'brand-secondary', 'neutral', 'success', 'warning', 'error'],
      description: 'Estado/color del badge indicador.',
    },
    badgeIcon: { control: 'text', description: 'Nombre del ícono Material Symbols del badge. Ej: "trending_up".' },
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<PdsStatCardComponent>;

// ── Stat Info Card ─────────────────────────────────────────────────────────────

export const StatInfoCard: Story = {
  name: 'Info — con tendencia positiva',
  args: {
    behavior: 'info',
    iconName: 'person',
    label: 'Active users',
    value: '12.480',
    trendValue: '+12.5%',
    trendLabel: 'vs last month',
    badgeStatus: 'success',
    badgeIcon: 'trending_up',
  },
};

export const StatInfoCardNegativa: Story = {
  name: 'Info — con tendencia negativa',
  args: {
    behavior: 'info',
    iconName: 'person',
    label: 'Tasa de abandono',
    value: '4.2%',
    trendValue: '+1.8%',
    trendLabel: 'vs last month',
    badgeStatus: 'error',
    badgeIcon: 'trending_down',
  },
};

export const StatInfoCardSinTendencia: Story = {
  name: 'Info — sin tendencia',
  args: {
    behavior: 'info',
    iconName: 'school',
    label: 'Programas activos',
    value: '348',
  },
};

// ── Stat Nav Card ──────────────────────────────────────────────────────────────

export const StatNavCard: Story = {
  name: 'Nav — con tendencia',
  args: {
    behavior: 'nav',
    iconName: 'person',
    label: 'Active users',
    value: '12.480',
    trendValue: '+ 4.2%',
    trendLabel: 'vs last month',
    badgeStatus: 'success',
    badgeIcon: 'trending_up',
  },
};

// ── Stat Selectable Card ───────────────────────────────────────────────────────

export const StatSelectableDefault: Story = {
  name: 'Selectable — no seleccionada',
  args: {
    behavior: 'selectable',
    iconName: 'person',
    label: 'Active users',
    value: '12.480',
    trendValue: '+ 4.2%',
    trendLabel: 'vs last month',
    badgeStatus: 'success',
    badgeIcon: 'trending_up',
    selected: false,
  },
};

export const StatSelectableSelected: Story = {
  name: 'Selectable — seleccionada',
  args: {
    behavior: 'selectable',
    iconName: 'person',
    label: 'Active users',
    value: '12.480',
    trendValue: '+ 4.2%',
    trendLabel: 'vs last month',
    badgeStatus: 'success',
    badgeIcon: 'trending_up',
    selected: true,
  },
};

export const StatSelectableGroup: Story = {
  name: 'Selectable — dashboard de métricas',
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;" role="group" aria-label="Selecciona una métrica">
        <pds-stat-card
          behavior="selectable"
          iconName="person"
          label="Usuarios activos"
          value="12.480"
          trendValue="+12.5%"
          trendLabel="vs mes anterior"
          badgeStatus="success"
          badgeIcon="trending_up"
          [selected]="selected === 'users'"
          (selectedChange)="selected = $event ? 'users' : null"
          style="width: 280px"
        />
        <pds-stat-card
          behavior="selectable"
          iconName="school"
          label="Matrículas nuevas"
          value="3.240"
          trendValue="+4.2%"
          trendLabel="vs mes anterior"
          badgeStatus="success"
          badgeIcon="trending_up"
          [selected]="selected === 'enrollments'"
          (selectedChange)="selected = $event ? 'enrollments' : null"
          style="width: 280px"
        />
        <pds-stat-card
          behavior="selectable"
          iconName="trending_down"
          label="Tasa de abandono"
          value="2.1%"
          trendValue="-0.5%"
          trendLabel="vs mes anterior"
          badgeStatus="error"
          badgeIcon="trending_down"
          [selected]="selected === 'dropout'"
          (selectedChange)="selected = $event ? 'dropout' : null"
          style="width: 280px"
        />
      </div>
    `,
    props: { selected: 'users' as string | null },
  }),
};
