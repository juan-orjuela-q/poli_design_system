import { Meta, StoryObj } from '@storybook/angular';
import { componentWrapperDecorator } from '@storybook/angular';
import { PdsModalComponent, ModalSize } from './pds-modal.component';

// ── Textos de ejemplo ─────────────────────────────────────────────────────────
const BODY_SHORT = `En nuestra plataforma valoramos y protegemos tu información personal.
Los datos que proporciones en este formulario serán utilizados únicamente para gestionar
tu solicitud y mejorar nuestros servicios.`;

const BODY_MEDIUM = `Este pedido fue realizado el 12 de marzo de 2026 y actualmente se encuentra
en proceso de envío. A continuación se muestra la información completa relacionada con el
pedido, incluyendo estado, productos adquiridos y datos de envío.

Estado actual: Enviado
Fecha de despacho: 13 de marzo de 2026
Tiempo estimado de entrega: 2 a 3 días hábiles`;

const BODY_LONG = `Nuestro servicio ofrece diferentes funcionalidades orientadas a mejorar la
gestión de procesos dentro de la plataforma. Estas funcionalidades incluyen herramientas
de seguimiento, generación de reportes, control de actividades, gestión de usuarios y
administración de recursos digitales.

Además, el sistema permite integrar diferentes módulos que facilitan el monitoreo de
información en tiempo real, así como la personalización de configuraciones según las
necesidades del usuario o de la organización.

Información que recopilamos
Recopilamos datos necesarios para el funcionamiento del servicio, tales como:

Información de registro (nombre, correo electrónico)
Datos de uso y actividad dentro de la plataforma
Información técnica (dirección IP, tipo de navegador, dispositivo)`;

const meta: Meta<PdsModalComponent> = {
  title: 'Poli Design System / 06. Feedback & Overlays / Modal',
  component: PdsModalComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**pds-modal** es un contenedor superpuesto para mostrar información libre o acciones
complementarias sin abandonar el contexto actual.

A diferencia de \`pds-dialog\`, el modal:
- Puede alojar cualquier contenido: texto, formularios, imágenes, video, listas.
- Tiene 5 tamaños controlados por \`size\`.
- **No tiene modos semánticos** (sin colores especiales en el header).
- El cuerpo es scrollable con \`overflow-y: auto; max-height: 90vh\`.
- \`closeOnOverlay\` es \`true\` por defecto.
- En móvil se comporta como **bottom sheet** (se ancla al fondo de la pantalla).

### Estructura interna
\`\`\`
Overlay (fixed, 90% opacidad)
└── Card (role="dialog")
    ├── Header:  Título (h2) + botón ✕
    ├── Body:    <ng-content />          ← contenido libre, scrollable
    └── Footer:  [slot=footer] ó botones built-in (Cancelar + Aceptar)
\`\`\`

### Footer personalizado
Si el contenido del footer varía (ej. solo "Cerrar", o 3 botones), usa \`[slot=footer]\`
y desactiva los botones built-in con \`[showActions]="false"\`:
\`\`\`html
<pds-modal title="Mi modal" [open]="open" [showActions]="false">
  Contenido del cuerpo…
  <div slot="footer" style="display:flex; justify-content:flex-end">
    <pds-button variant="outline" (click)="close()">Cerrar</pds-button>
  </div>
</pds-modal>
\`\`\`

### Accesibilidad
- \`role="dialog"\` + \`aria-modal="true"\` → anunciado como ventana modal.
- \`aria-labelledby\` → apunta al título.
- **Focus trap** (CDK \`FocusTrapFactory\`): foco atrapado dentro del modal.
- **Escape** → cierra el modal (emite \`closed\`).
- Al cerrar, el foco vuelve al elemento activador.
- Scroll del body bloqueado mientras el modal está abierto.

### Buenas prácticas (del Figma)
- ✅ Usa Modal para contenido breve o una tarea puntual sin sacar al usuario del contexto.
- ✅ Usa tamaños mayores cuando el contenido necesite más espacio (formularios, multimedia).
- ✅ Mantén jerarquía clara: cerrar (✕), cancelar y confirmar.
- ❌ No uses Modal para grandes volúmenes de contenido sin jerarquía clara.
- ❌ No uses el Modal sin overlay — el contraste con el fondo es insuficiente.
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl'] satisfies ModalSize[],
      description: 'Tamaño del modal (max-width)',
    },
    title: {
      control: 'text',
      description: 'Título del modal (requerido)',
    },
    open: {
      control: 'boolean',
      description: 'Controla la visibilidad',
    },
    closeOnOverlay: {
      control: 'boolean',
      description: 'Cerrar al hacer clic en el overlay',
    },
    showActions: {
      control: 'boolean',
      description: 'Muestra el footer con botones built-in',
    },
    showCancel: {
      control: 'boolean',
      description: 'Muestra el botón Cancelar',
    },
    confirmLabel: {
      control: 'text',
      description: 'Etiqueta del botón de confirmación',
    },
    cancelLabel: {
      control: 'text',
      description: 'Etiqueta del botón de cancelación',
    },
  },
  render: (args) => ({
    props: {
      ...args,
      onClosed: () => console.log('[pds-modal] closed'),
      onConfirmed: () => console.log('[pds-modal] confirmed'),
    },
    template: `
      <pds-modal
        [size]="size"
        [title]="title"
        [open]="open"
        [closeOnOverlay]="closeOnOverlay"
        [showActions]="showActions"
        [showCancel]="showCancel"
        [confirmLabel]="confirmLabel"
        [cancelLabel]="cancelLabel"
        [disableScrollLock]="true"
        (closed)="onClosed()"
        (confirmed)="onConfirmed()"
      >
        En nuestra plataforma valoramos y protegemos tu información personal.
        Los datos que proporciones en este formulario serán utilizados únicamente
        para gestionar tu solicitud y mejorar nuestros servicios.
      </pds-modal>
    `,
  }),
};

export default meta;
type Story = StoryObj<PdsModalComponent>;

// Wrapper para Storybook: overlay absolute dentro del canvas (no bloquea el scroll de docs)
const storyDecorators = [
  componentWrapperDecorator(
    (story) =>
      `<div style="position:relative;height:480px;overflow:hidden;--pds-overlay-position:absolute;">${story}</div>`
  ),
];

// ── Default (SM) ──────────────────────────────────────────────────────────────
export const Default: Story = {
  name: 'Default — SM',
  decorators: storyDecorators,
  args: {
    size: 'sm',
    title: 'Modal title',
    open: true,
    closeOnOverlay: true,
    showActions: true,
    showCancel: true,
    confirmLabel: 'Aceptar',
    cancelLabel: 'Cancelar',
  },
};

// ── MD ────────────────────────────────────────────────────────────────────────
export const SizeMd: Story = {
  name: 'Size — MD',
  decorators: storyDecorators,
  args: {
    size: 'md',
    title: 'Modal title',
    open: true,
    closeOnOverlay: true,
    showActions: true,
    showCancel: true,
    confirmLabel: 'Aceptar',
    cancelLabel: 'Cancelar',
  },
};

// ── LG ────────────────────────────────────────────────────────────────────────
export const SizeLg: Story = {
  name: 'Size — LG',
  decorators: storyDecorators,
  args: {
    size: 'lg',
    title: 'Modal title',
    open: true,
    closeOnOverlay: true,
    showActions: true,
    showCancel: true,
    confirmLabel: 'Aceptar',
    cancelLabel: 'Cancelar',
  },
};

// ── XL ────────────────────────────────────────────────────────────────────────
export const SizeXl: Story = {
  name: 'Size — XL',
  decorators: storyDecorators,
  args: {
    size: 'xl',
    title: 'Modal title',
    open: true,
    closeOnOverlay: true,
    showActions: true,
    showCancel: true,
    confirmLabel: 'Aceptar',
    cancelLabel: 'Cancelar',
  },
};

// ── 2XL ───────────────────────────────────────────────────────────────────────
export const Size2xl: Story = {
  name: 'Size — 2XL',
  decorators: storyDecorators,
  args: {
    size: '2xl',
    title: 'Modal title',
    open: true,
    closeOnOverlay: true,
    showActions: true,
    showCancel: true,
    confirmLabel: 'Aceptar',
    cancelLabel: 'Cancelar',
  },
};

// ── Case 1: Política de privacidad (SM — contenido breve) ─────────────────────
export const Case1PoliticaPrivacidad: Story = {
  name: 'Case 1 — Política de privacidad (SM)',
  decorators: storyDecorators,
  parameters: {
    docs: {
      description: {
        story: `
✅ **Correcto**: Modal SM para mostrar información breve o una tarea puntual
sin sacar al usuario del contexto actual.

❌ **Incorrecto**: Evitar usar Modal para grandes volúmenes de contenido sin
jerarquía clara; dificulta la lectura, navegación y cierre.
        `,
      },
    },
  },
  render: () => ({
    template: `
      <pds-modal
        title="Política de privacidad"
        [open]="true" [disableScrollLock]="true"
        size="sm"
        [closeOnOverlay]="true"
        confirmLabel="Aceptar"
        cancelLabel="Cancelar"
      >
        ${BODY_SHORT}
      </pds-modal>
    `,
    props: {},
  }),
};

// ── Case 2: Detalle del pedido (MD — contenido medio con estructura) ──────────
export const Case2DetallePedido: Story = {
  name: 'Case 2 — Detalle del pedido (MD)',
  decorators: storyDecorators,
  parameters: {
    docs: {
      description: {
        story: `
✅ **Correcto**: Usa tamaños mayores cuando el contenido necesite más espacio,
como formularios, multimedia o bloques informativos complejos.
        `,
      },
    },
  },
  render: () => ({
    template: `
      <pds-modal
        title="Detalle del pedido"
        [open]="true" [disableScrollLock]="true"
        size="md"
        [closeOnOverlay]="true"
        confirmLabel="Aceptar"
        cancelLabel="Cancelar"
      >
        <p style="margin:0 0 12px">
          Este pedido fue realizado el 12 de marzo de 2026 y actualmente se encuentra en
          proceso de envío. A continuación se muestra la información completa relacionada
          con el pedido, incluyendo estado, productos adquiridos y datos de envío.
        </p>
        <p style="margin:0 0 4px"><strong>Estado actual:</strong> Enviado</p>
        <p style="margin:0 0 4px"><strong>Fecha de despacho:</strong> 13 de marzo de 2026</p>
        <p style="margin:0"><strong>Tiempo estimado de entrega:</strong> 2 a 3 días hábiles</p>
      </pds-modal>
    `,
    props: {},
  }),
};

// ── Case 3: Jerarquía clara de acciones ───────────────────────────────────────
export const Case3JerarquiaAcciones: Story = {
  name: 'Case 3 — Jerarquía clara de acciones',
  parameters: {
    docs: {
      description: {
        story: `
✅ **Correcto**: Mantén una jerarquía clara entre cerrar, cancelar y confirmar.
El botón ✕ cierra sin acción; Cancelar es la salida neutral; Aceptar es la acción primaria.

❌ **Incorrecto**: No incluyas múltiples botones con el mismo peso visual;
genera confusión sobre la acción principal.
        `,
      },
    },
  },
  render: () => ({
    template: `
      <pds-modal
        title="Política de privacidad"
        [open]="true" [disableScrollLock]="true"
        size="sm"
        confirmLabel="Aceptar"
        cancelLabel="Cancelar"
      >
        ${BODY_SHORT}
      </pds-modal>
    `,
    props: {},
  }),
};

// ── Case 4: Overlay obligatorio ───────────────────────────────────────────────
export const Case4OverlayObligatorio: Story = {
  name: 'Case 4 — Overlay obligatorio',
  parameters: {
    docs: {
      description: {
        story: `
✅ **Correcto**: Usa el overlay para dirigir la atención al contenido modal y bloquear
la interacción con el fondo.

❌ **Incorrecto**: No permitas que el contenido de fondo compita visualmente o siga
siendo interactuable mientras el modal está abierto.
        `,
      },
    },
  },
  render: () => ({
    template: `
      <!-- El fondo simula la app subyacente -->
      <div style="
        width:100%; height:400px; background: var(--surface-brand-primary-base, #0f385a);
        display:flex; align-items:center; justify-content:center;
        font-family:Poppins; color:#fff; font-size:1rem;
      ">
        Contenido de la aplicación (bloqueado)
      </div>

      <pds-modal
        title="Política de privacidad"
        [open]="true" [disableScrollLock]="true"
        size="sm"
        [closeOnOverlay]="true"
        confirmLabel="Confirmar"
        cancelLabel="Cerrar"
      >
        ${BODY_SHORT}
      </pds-modal>
    `,
    props: {},
  }),
};

// ── Solo botón "Cerrar" (sin confirmación) ────────────────────────────────────
export const OnlyClose: Story = {
  name: 'Solo botón Cerrar',
  parameters: {
    docs: {
      description: {
        story:
          'Modal informativo sin acción de confirmación — solo botón de cierre en el footer.',
      },
    },
  },
  render: () => ({
    template: `
      <pds-modal
        title="Política de privacidad"
        [open]="true" [disableScrollLock]="true"
        size="md"
        [showActions]="true"
        [showCancel]="false"
        confirmLabel="Cerrar"
      >
        ${BODY_LONG}
      </pds-modal>
    `,
    props: {},
  }),
};

// ── Contenido scrollable (caso incorrecto evitar) ─────────────────────────────
export const ScrollableBody: Story = {
  name: 'Contenido largo — body scrollable',
  parameters: {
    docs: {
      description: {
        story: `
El cuerpo del modal tiene \`overflow-y: auto\` y \`max-height: 90vh\`, por lo que el
contenido largo es scrollable. El header y footer permanecen fijos.

> ⚠️ Para contenido muy extenso sin jerarquía clara, considera una página dedicada
> en lugar de un modal (buena práctica del Figma DS).
        `,
      },
    },
  },
  render: () => ({
    template: `
      <pds-modal
        title="Política de privacidad"
        [open]="true" [disableScrollLock]="true"
        size="sm"
        [closeOnOverlay]="true"
        confirmLabel="Aceptar"
        cancelLabel="Cancelar"
      >
        ${BODY_LONG}
      </pds-modal>
    `,
    props: {},
  }),
};

// ── Showcase — Todos los tamaños ─────────────────────────────────────────────
export const AllSizes: Story = {
  name: 'Showcase — All Sizes',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Todos los tamaños del Modal sin overlay para facilitar la comparación visual.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display:flex; flex-direction:column; gap:32px; padding:16px;">
        @for (cfg of sizes; track cfg.size) {
          <div>
            <span style="
              font-family: 'IBM Plex Mono', monospace;
              font-size: 12px; font-weight: 700;
              letter-spacing: 0.6px; text-transform: uppercase;
              color: #bd00ff; display: block; margin-bottom: 8px;
            ">SIZE: {{ cfg.size }} — max-width: {{ cfg.maxWidth }}</span>
            <pds-modal
              [size]="cfg.size"
              title="Modal title"
              [open]="true" [disableScrollLock]="true"
              style="--pds-modal-static: 1"
            >
              Hemos dejado el mundo atrás, flotando suavemente en la quietud de la noche.
              Las estrellas brillan como ojos plateados contra el terciopelo negro del vacío.
            </pds-modal>
          </div>
        }
      </div>
    `,
    props: {
      sizes: [
        { size: 'sm', maxWidth: '420px' },
        { size: 'md', maxWidth: '560px' },
        { size: 'lg', maxWidth: '720px' },
        { size: 'xl', maxWidth: '900px' },
        { size: '2xl', maxWidth: '1200px' },
      ],
    },
  }),
};
