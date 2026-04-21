import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { PdsFileUploaderComponent } from './pds-file-uploader.component';
import { PdsFileUploaderItemComponent } from './pds-file-uploader-item/pds-file-uploader-item.component';
import type { PdsFileItem } from './pds-file-uploader.types';

const meta: Meta<PdsFileUploaderComponent> = {
  title: 'DS v2/File Uploader',
  component: PdsFileUploaderComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({ imports: [PdsFileUploaderComponent, PdsFileUploaderItemComponent] }),
  ],
  parameters: { layout: 'padded' },
  argTypes: {
    type: {
      control: 'select',
      options: ['large', 'compact'],
      description: "'large' = drop zone visual. 'compact' = solo botón outline.",
    },
    label: { control: 'text' },
    required: { control: 'boolean' },
    hint: { control: 'text' },
    instructive: { control: 'text' },
    accept: { control: 'text' },
    multiple: { control: 'boolean' },
    maxSize: { control: 'number', description: 'Tamaño máximo en bytes. null = sin límite.' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<PdsFileUploaderComponent>;

// ── Drop zone vacía ───────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Drop zone — vacía',
  args: {
    label: 'Elegir imagen de perfil',
    required: true,
    hint: 'Carga únicamente un archivo de máximo 5mb.',
    instructive: 'Arrastra el archivo que deseas subir o',
    accept: 'image/*,.pdf',
    multiple: false,
  },
};

export const SinLabel: Story = {
  name: 'Drop zone — sin label',
  args: {
    hint: 'Formatos aceptados: PDF, PNG, JPG.',
    instructive: 'Arrastra el archivo que deseas subir o',
    multiple: true,
  },
};

export const Disabled: Story = {
  name: 'Drop zone — deshabilitada',
  args: {
    label: 'Documento adjunto',
    disabled: true,
    hint: 'No puedes cargar archivos en este momento.',
  },
};

export const Compact: Story = {
  name: 'Compact — botón outline',
  args: {
    type: 'compact',
    label: 'Adjuntar documento',
    hint: 'Carga únicamente un archivo de máximo 5mb.',
    multiple: false,
  },
};

export const CompactMultiple: Story = {
  name: 'Compact — múltiples archivos',
  args: {
    type: 'compact',
    label: 'Documentos adjuntos',
    hint: 'Máximo 10mb por archivo.',
    multiple: true,
  },
};

// ── Con archivos en distintos estados ─────────────────────────────────────────

/** Fixture de items de ejemplo para stories controladas. */
const mockFile = new File([''], 'Nombre_del_archivo.pdf', { type: 'application/pdf' });
const mockImage = new File([''], 'foto_perfil.jpg', { type: 'image/jpeg' });

const itemLoading: PdsFileItem = {
  id: 'item-loading',
  file: mockFile,
  name: 'Nombre_del_archivo.pdf',
  size: 270336, // 264 kb
  progress: 45,
  status: 'loading',
  errorMessage: null,
  previewUrl: null,
};

const itemSuccess: PdsFileItem = {
  id: 'item-success',
  file: mockImage,
  name: 'Nombre_del_archivo.pdf',
  size: 270336,
  progress: 100,
  status: 'success',
  errorMessage: null,
  previewUrl: 'https://picsum.photos/seed/pds/64/64',
};

const itemError: PdsFileItem = {
  id: 'item-error',
  file: mockFile,
  name: 'Nombre_del_archivo.pdf',
  size: 270336,
  progress: 100,
  status: 'error',
  errorMessage: 'Motivo del error',
  previewUrl: null,
};

export const ConArchivos: Story = {
  name: 'Con archivos — todos los estados',
  render: () => ({
    template: `
      <pds-file-uploader
        label="Elegir imagen de perfil"
        [required]="true"
        hint="Carga únicamente un archivo de máximo 5mb."
        [multiple]="true"
        [items]="items"
      />
    `,
    props: {
      items: [itemSuccess, itemError, itemLoading],
    },
  }),
};

export const SoloExito: Story = {
  name: 'Item — Carga completa',
  render: () => ({
    template: `
      <pds-file-uploader
        label="Foto de perfil"
        [items]="items"
      />
    `,
    props: { items: [itemSuccess] },
  }),
};

export const SoloError: Story = {
  name: 'Item — Error',
  render: () => ({
    template: `
      <pds-file-uploader
        label="Documento"
        [items]="items"
      />
    `,
    props: { items: [itemError] },
  }),
};

export const SoloCargando: Story = {
  name: 'Item — Cargando',
  render: () => ({
    template: `
      <pds-file-uploader
        label="Documento"
        [items]="items"
      />
    `,
    props: { items: [itemLoading] },
  }),
};

export const Multiple: Story = {
  name: 'Multiple — con botón Agregar otro',
  render: () => ({
    template: `
      <pds-file-uploader
        label="Documentos adjuntos"
        hint="Máximo 10mb por archivo."
        [multiple]="true"
        [items]="items"
      />
    `,
    props: {
      items: [itemSuccess, itemLoading],
    },
  }),
};
