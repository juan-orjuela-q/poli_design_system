import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { PdsAvatarButtonComponent } from './pds-avatar-button.component';

const meta: Meta<PdsAvatarButtonComponent> = {
  title: 'DS v2/Avatar Button',
  component: PdsAvatarButtonComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [PdsAvatarButtonComponent],
    }),
  ],
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f0f8ff' },
        { name: 'dark-brand', value: '#0f385a' },
        { name: 'white', value: '#ffffff' },
      ],
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['letter', 'image', 'icon'],
      description: 'Tipo de contenido del avatar.',
    },
    size: {
      control: 'select',
      options: ['md', 'lg'],
      description: 'Tamaño del círculo del avatar.',
    },
    name: { control: 'text', description: 'Nombre del usuario.' },
    role: { control: 'text', description: 'Cargo o rol del usuario.' },
    letter: {
      control: 'text',
      description: 'Letra explícita (sobreescribe la inicial del nombre).',
    },
    imageSrc: {
      control: 'text',
      description: 'URL de la imagen (type=image).',
    },
    iconName: {
      control: 'text',
      description: 'Nombre del ícono de Material Symbols (type=icon).',
    },
    showBadge: {
      control: 'boolean',
      description: 'Muestra el indicador de notificación.',
    },
    showName: {
      control: 'boolean',
      description: 'Muestra el bloque de nombre y rol.',
    },
    showRole: { control: 'boolean', description: 'Muestra la línea de rol.' },
    buttonType: {
      control: 'select',
      options: ['button', 'submit'],
      description: 'Tipo HTML del botón.',
    },
  },
};

export default meta;
type Story = StoryObj<PdsAvatarButtonComponent>;

// ── Variante: Letter (default) ────────────────────────────────────────

export const Default: Story = {
  name: 'Letter — Default',
  args: {
    name: 'Andrea Zamora',
    role: 'Administrador',
    type: 'letter',
    size: 'md',
    showBadge: true,
    showName: true,
    showRole: true,
  },
};

// ── Variante: Solo avatar (sin nombre) ────────────────────────────────

export const SoloAvatar: Story = {
  name: 'Letter — Solo Avatar',
  args: {
    name: 'Andrea Zamora',
    role: 'Administrador',
    type: 'letter',
    size: 'md',
    showBadge: true,
    showName: false,
    showRole: false,
  },
};

// ── Variante: Sin role ────────────────────────────────────────────────

export const SinRole: Story = {
  name: 'Letter — Sin Role',
  args: {
    name: 'Andrea Zamora',
    role: '',
    type: 'letter',
    size: 'md',
    showBadge: false,
    showName: true,
    showRole: false,
  },
};

// ── Variante: Ícono ───────────────────────────────────────────────────

export const ConIcono: Story = {
  name: 'Icon — Con ícono',
  args: {
    name: 'Andrea Zamora',
    role: 'Administrador',
    type: 'icon',
    iconName: 'person',
    size: 'md',
    showBadge: true,
    showName: true,
    showRole: true,
  },
};

// ── Variante: Imagen ──────────────────────────────────────────────────

export const ConImagen: Story = {
  name: 'Image — Con foto',
  args: {
    name: 'Andrea Zamora',
    role: 'Administrador',
    type: 'image',
    imageSrc: 'https://i.pravatar.cc/80?img=47',
    size: 'md',
    showBadge: true,
    showName: true,
    showRole: true,
  },
};

// ── Tamaños ───────────────────────────────────────────────────────────

export const Tamanios: Story = {
  name: 'Tamaños (md / lg)',
  render: (args) => ({
    props: args,
    template: `
      <div style="display:flex; align-items:center; gap:24px; flex-wrap:wrap;">
        <pds-avatar-button name="Andrea Zamora" role="Admin" size="md" [showBadge]="true" />
        <pds-avatar-button name="Andrea Zamora" role="Admin" size="lg" [showBadge]="true" />
      </div>
    `,
  }),
};

// ── Variantes de tipo ─────────────────────────────────────────────────

export const TiposDeAvatar: Story = {
  name: 'Tipos (letter / icon / image)',
  render: (args) => ({
    props: args,
    template: `
      <div style="display:flex; align-items:center; gap:24px; flex-wrap:wrap;">
        <pds-avatar-button name="Andrea Zamora" role="Admin" type="letter" [showBadge]="false" />
        <pds-avatar-button name="Andrea Zamora" role="Admin" type="icon" iconName="person" [showBadge]="false" />
        <pds-avatar-button name="Andrea Zamora" role="Admin" type="image" imageSrc="https://i.pravatar.cc/80?img=47" [showBadge]="false" />
      </div>
    `,
  }),
};

// ── Mostrar / ocultar badge ───────────────────────────────────────────

export const ConYSinBadge: Story = {
  name: 'Badge de notificación',
  render: (args) => ({
    props: args,
    template: `
      <div style="display:flex; align-items:center; gap:32px;">
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
          <pds-avatar-button name="Andrea Zamora" role="Admin" [showBadge]="false" />
          <small>Sin badge</small>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
          <pds-avatar-button name="Andrea Zamora" role="Admin" [showBadge]="true" />
          <small>Con badge</small>
        </div>
      </div>
    `,
  }),
};

// ── Sobre fondo oscuro ────────────────────────────────────────────────

export const SobreFondoOscuro: Story = {
  name: 'Sobre Brand Primary (fondo oscuro)',
  parameters: {
    backgrounds: { default: 'dark-brand' },
  },
  args: {
    name: 'Andrea Zamora',
    role: 'Administrador',
    type: 'letter',
    size: 'md',
    showBadge: true,
    showName: true,
    showRole: true,
  },
};

// ── Accesibilidad ─────────────────────────────────────────────────────

export const Accesibilidad: Story = {
  name: 'Accesibilidad — aria-label dinámico',
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;">
        <pds-avatar-button
          name="Andrea Zamora"
          role="Administrador"
          aria-description="Sin notificaciones"
        />
        <pds-avatar-button
          name="Andrea Zamora"
          role="Administrador"
          [showBadge]="true"
          aria-description="Con notificaciones (aria-label incluye aviso)"
        />
        <pds-avatar-button
          name="Andrea Zamora"
          aria-description="Sin estado deshabilitado"
        />
      </div>
    `,
  }),
};
