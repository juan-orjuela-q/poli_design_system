import type { Meta, StoryObj } from '@storybook/angular';
import { PdsFileUploaderComponent } from './pds-file-uploader.component';
import type { PdsFileItem } from './pds-file-uploader.types';

const SAMPLE_ITEMS: PdsFileItem[] = [
  {
    id: 'item-1',
    file: new File([''], 'documento-identidad.pdf', { type: 'application/pdf' }),
    name: 'documento-identidad.pdf',
    size: 245000,
    progress: 100,
    status: 'success',
    errorMessage: null,
    previewUrl: null,
  },
  {
    id: 'item-2',
    file: new File([''], 'foto-perfil.jpg', { type: 'image/jpeg' }),
    name: 'foto-perfil.jpg',
    size: 820000,
    progress: 65,
    status: 'loading',
    errorMessage: null,
    previewUrl: null,
  },
];

const ERROR_ITEMS: PdsFileItem[] = [
  {
    id: 'item-err',
    file: new File([''], 'archivo-grande.zip', { type: 'application/zip' }),
    name: 'archivo-grande.zip',
    size: 52428800,
    progress: 0,
    status: 'error',
    errorMessage: 'El archivo supera el tamaño máximo permitido (10 MB)',
    previewUrl: null,
  },
];

const meta: Meta<PdsFileUploaderComponent> = {
  title: 'Poli Design System / 05. Forms / Form (File Uploader)',
  component: PdsFileUploaderComponent,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Etiqueta del campo (opcional)' },
    type: {
      control: 'select',
      options: ['large', 'compact'],
      description: 'Variante: zona de arrastre (large) o botón compacto (compact)',
    },
    required: { control: 'boolean', description: 'Muestra asterisco de requerido' },
    multiple: { control: 'boolean', description: 'Permite subir varios archivos' },
    disabled: { control: 'boolean', description: 'Deshabilitado' },
    accept: { control: 'text', description: 'Tipos MIME o extensiones aceptados (ej. "image/*,.pdf")' },
    instructive: { control: 'text', description: 'Texto instruccional dentro de la zona de carga' },
    hint: { control: 'text', description: 'Texto de ayuda debajo de la zona' },
    maxSize: { control: 'number', description: 'Tamaño máximo en bytes (null = sin límite)' },
  },
  parameters: {
    docs: {
      description: {
        component: `
Zona de carga de archivos del DS v2. Disponible en variante **large** (drop zone con área visual) y **compact** (solo botón).
Soporta drag & drop, selección por clic, múltiples archivos, validación de tamaño y modo controlado mediante el input \`items\`.
No implementa CVA — emite eventos \`filesAdded\` y \`fileRemoved\` para que el padre gestione el estado de progreso y error.

### Cuándo usarlo
- Para adjuntar documentos en formularios académicos (cédula, certificados, recibos).
- Para subir imágenes de perfil o materiales de curso.
- Cuando el usuario necesita ver el progreso de carga y el estado de cada archivo.

### Cuándo NO usarlo
- No usar para capturar texto — usar \`pds-input-field\` o \`pds-textarea-field\`.
- No usar la variante \`large\` en espacios reducidos — usar \`compact\`.

### API
\`\`\`html
<!-- Variante large (por defecto) -->
<pds-file-uploader
  label="Documentos de inscripción"
  [required]="true"
  accept="image/*,.pdf"
  [multiple]="true"
  [maxSize]="10485760"
  hint="Archivos PDF o imagen, máximo 10 MB cada uno"
  (filesAdded)="onFilesAdded($event)"
  (fileRemoved)="onFileRemoved($event)"
/>

<!-- Variante compacta -->
<pds-file-uploader
  label="Foto de perfil"
  type="compact"
  accept="image/*"
  (filesAdded)="onFilesAdded($event)"
/>
\`\`\`

| Input          | Tipo                   | Default                                  | Descripción |
|----------------|------------------------|------------------------------------------|-------------|
| \`label\`        | \`string \\| null\`    | \`null\`                                 | Etiqueta del campo |
| \`type\`         | \`'large'\\|'compact'\` | \`'large'\`                             | Variante de presentación |
| \`required\`     | \`boolean\`            | \`false\`                                | Muestra asterisco requerido |
| \`instructive\`  | \`string\`             | \`'Arrastra el archivo que deseas subir o'\` | Texto dentro de la zona |
| \`hint\`         | \`string \\| null\`    | \`null\`                                 | Texto de ayuda |
| \`accept\`       | \`string\`             | \`'*'\`                                  | Tipos aceptados (MIME/extensiones) |
| \`multiple\`     | \`boolean\`            | \`false\`                                | Permite múltiples archivos |
| \`maxSize\`      | \`number \\| null\`    | \`null\`                                 | Tamaño máximo en bytes |
| \`disabled\`     | \`boolean\`            | \`false\`                                | Deshabilitado |
| \`items\`        | \`PdsFileItem[] \\| null\` | \`null\`                             | Modo controlado: array de ítems externos |

| Output         | Tipo            | Descripción |
|----------------|-----------------|-------------|
| \`filesAdded\`   | \`PdsFileItem[]\` | Emite los nuevos ítems al añadir archivos |
| \`fileRemoved\`  | \`string\`        | Emite el \`id\` del ítem eliminado |

**PdsFileItem:**
\`\`\`ts
interface PdsFileItem {
  id: string;
  file: File;
  name: string;
  size: number;
  progress: number;         // 0–100
  status: 'loading' | 'success' | 'error';
  errorMessage: string | null;
  previewUrl: string | null; // URL.createObjectURL para imágenes
}
\`\`\`

---

### Accesibilidad — WCAG 2.2

#### Criterios aplicables
| Criterio | Nivel | Aplicación |
|----------|-------|------------|
| **1.3.1 Info y relaciones** | A | \`<label>\` vinculado al \`<input type="file">\` oculto; lista de archivos en \`<ul>\` semántico |
| **1.3.3 Características sensoriales** | A | Las instrucciones se dan en texto — no dependen solo de la zona visual de arrastre |
| **1.4.3 Contraste mínimo** | AA | Texto de label, hint y nombres de archivo ≥ 4.5:1 |
| **1.4.11 Contraste no textual** | AA | Borde de la zona de drop ≥ 3:1 sobre el fondo de la página |
| **2.1.1 Teclado** | A | El botón de carga es un \`<button>\` nativo — activable con Tab+Enter/Space; el input file se activa mediante el botón |
| **2.4.7 Foco visible** | AA | Focus ring visible en el botón de carga con token \`--action-primary-focus-ring\` |
| **2.5.8 Tamaño del objetivo** | AA | Botón de carga ≥ 44px de altura |
| **3.3.1 Identificación de errores** | A | Mensaje de error por archivo ilegible visible textualmente en el ítem |
| **3.3.2 Etiquetas o instrucciones** | A | Label persistente + texto instruccional + hint con el formato esperado |
| **4.1.2 Nombre, rol, valor** | A | \`<input type="file">\` oculto con \`aria-label\` derivado del label; botón con nombre accesible |
| **4.1.3 Mensajes de estado** | A | Al añadir/eliminar archivos, un \`<div role="status" aria-live="polite">\` anuncia el cambio |

#### Navegación por teclado
| Tecla | Acción |
|-------|--------|
| **Tab** | Enfoca el botón de carga |
| **Enter / Space** | Abre el selector de archivos nativo del sistema operativo |
| **Tab** (en lista de archivos) | Navega entre los botones de eliminar de cada ítem |
| **Enter / Space** (en botón eliminar) | Elimina el ítem correspondiente |

#### Atributos ARIA
| Atributo | Dónde | Función |
|----------|-------|---------|
| \`aria-label\` | en el \`<input type="file">\` oculto | Nombre accesible derivado del label del campo |
| \`aria-disabled="true"\` | en el botón de carga | Indica que el campo está deshabilitado |
| \`aria-live="polite"\` | en el contenedor de estado | Anuncia añadidos/eliminaciones a lectores de pantalla |
| \`aria-label="Eliminar [nombre]"\` | en cada botón de ítem | Identifica qué archivo se eliminará |

#### Anuncio en lectores de pantalla
- Al enfocar el botón: *"Subir archivo, botón"*
- Al abrir el selector: el sistema operativo toma el control
- Al añadir un archivo: *"documento.pdf añadido, cargando…"* (región live)
- Al completar la carga: *"documento.pdf cargado correctamente"*
- Al encontrar un error: *"documento.pdf — El archivo supera el tamaño máximo"*
- Al eliminar: *"documento.pdf eliminado"*

#### Auditoría v1 → v2
| Hallazgo v1 (Cortés, feb 2026) | Criterio WCAG | Resolución en v2 |
|--------------------------------|---------------|------------------|
| Este componente es nuevo en v2 y fue diseñado desde el inicio conforme a WCAG 2.2 AA | — | — |

### Buenas prácticas
✅ Usa \`hint\` para indicar los tipos y tamaño máximo aceptados: *"PDF o imagen, máximo 10 MB"*.
✅ Activa \`multiple=true\` solo cuando el formulario realmente necesita varios archivos.
✅ Proporciona \`accept\` para filtrar el selector nativo y reducir errores del usuario.
✅ Usa \`items\` (modo controlado) para gestionar el estado de progreso desde el padre.
❌ No uses la variante \`large\` si el formulario tiene poco espacio vertical — usa \`compact\`.
❌ No dependas solo del drag & drop — el botón de carga es el mecanismo principal de teclado.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<PdsFileUploaderComponent>;

// ── Sandbox ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default — Sandbox',
  args: {
    label: 'Documentos de inscripción',
    type: 'large',
    required: false,
    multiple: false,
    disabled: false,
    accept: '*',
    instructive: 'Arrastra el archivo que deseas subir o',
    hint: null,
  },
};

// ── Variante large ────────────────────────────────────────────────────────────

export const LargeVariant: Story = {
  name: 'Variante large (zona de arrastre)',
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;max-width:560px">
        <pds-file-uploader
          label="Foto de perfil"
          accept="image/*"
          hint="JPG, PNG o GIF — máximo 5 MB"
          [maxSize]="5242880"
        />
        <pds-file-uploader
          label="Documentos de inscripción"
          [required]="true"
          accept="image/*,.pdf"
          [multiple]="true"
          hint="PDF o imagen — máximo 10 MB por archivo"
          [maxSize]="10485760"
        />
      </div>
    `,
  }),
};

// ── Variante compact ──────────────────────────────────────────────────────────

export const CompactVariant: Story = {
  name: 'Variante compact (botón)',
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;max-width:400px">
        <pds-file-uploader
          label="Recibo de pago"
          type="compact"
          accept=".pdf,.jpg,.png"
          hint="PDF o imagen — máximo 2 MB"
          [maxSize]="2097152"
        />
        <pds-file-uploader
          label="Certificado médico"
          type="compact"
          accept=".pdf"
          [required]="true"
          hint="Solo archivos PDF"
        />
      </div>
    `,
  }),
};

// ── Con archivos cargados (modo controlado) ───────────────────────────────────

export const WithItems: Story = {
  name: 'Con archivos cargados (modo controlado)',
  parameters: {
    docs: {
      description: {
        story: 'En modo controlado, el padre provee el array \`items\` y gestiona el estado de progreso y error de cada ítem.',
      },
    },
  },
  render: () => ({
    props: {
      items: SAMPLE_ITEMS,
    },
    template: `
      <div style="max-width:560px">
        <pds-file-uploader
          label="Documentos adjuntos"
          [multiple]="true"
          accept="image/*,.pdf"
          hint="PDF o imagen — máximo 10 MB"
          [items]="items"
        />
      </div>
    `,
  }),
};

// ── Con error en ítem ─────────────────────────────────────────────────────────

export const WithErrorItem: Story = {
  name: 'Con ítem en estado error',
  parameters: {
    docs: {
      description: {
        story: 'El componente muestra el \`errorMessage\` del ítem en texto — no solo con color — para cumplir WCAG 1.4.1 y 3.3.1.',
      },
    },
  },
  render: () => ({
    props: {
      items: ERROR_ITEMS,
    },
    template: `
      <div style="max-width:560px">
        <pds-file-uploader
          label="Archivo adjunto"
          accept="*"
          [maxSize]="10485760"
          hint="Tamaño máximo 10 MB"
          [items]="items"
        />
      </div>
    `,
  }),
};

// ── Estado deshabilitado ──────────────────────────────────────────────────────

export const DisabledState: Story = {
  name: 'Estado deshabilitado',
  args: {
    label: 'Documentos (período cerrado)',
    type: 'large',
    disabled: true,
    hint: 'El período de inscripción ha cerrado',
    accept: '*',
  },
};

// ── Accesibilidad ─────────────────────────────────────────────────────────────

export const A11yKeyboardUpload: Story = {
  name: 'A11y — Carga por teclado (Tab + Enter)',
  parameters: {
    docs: {
      description: {
        story: `
Usa **Tab** para enfocar el botón de carga. Presiona **Enter** o **Space** para abrir el selector de archivos del sistema operativo.

Tras seleccionar, la región \`aria-live="polite"\` anuncia el resultado a NVDA/VoiceOver:
- Carga exitosa: *"documento.pdf cargado correctamente"*
- Error de tamaño: *"documento.pdf — El archivo supera el tamaño máximo"*

Cada ítem en la lista tiene un botón *"Eliminar [nombre de archivo]"* accesible con Tab+Enter.
        `,
      },
    },
  },
  args: {
    label: 'Adjunta tu recibo de pago (Tab + Enter para probar)',
    type: 'large',
    accept: 'image/*,.pdf',
    hint: 'PDF o imagen — máximo 5 MB',
    maxSize: 5242880,
  },
};
