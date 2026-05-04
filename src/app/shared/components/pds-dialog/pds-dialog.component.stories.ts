import { Meta, StoryObj } from '@storybook/angular';
import { componentWrapperDecorator } from '@storybook/angular';
import { PdsDialogComponent, DialogMode } from './pds-dialog.component';

const BODY_TEXT =
  'Hemos dejado el mundo atrás, flotando suavemente en la quietud de la noche. A medida que la luz carmesí de Marte se desvanece en la distancia, las estrellas brillan como ojos plateados contra el terciopelo negro del vacío.';

const meta: Meta<PdsDialogComponent> = {
  title: 'DS v2/Dialog',
  component: PdsDialogComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**pds-dialog** interrumpe temporalmente la navegación y solicita confirmación o decisión del usuario.

Siempre aparece sobre un overlay que bloquea la interacción con el resto de la interfaz.

### Modos
| Modo | Ícono | Fondo de tarjeta | Botón confirmar |
|------|-------|-----------------|-----------------|
| \`default\`  | feedback       | blanco (neutral/modal) | Primary sólido (azul) |
| \`success\`  | check_circle   | verde sutil + borde    | Primary sólido (azul) |
| \`warning\`  | warning        | amarillo sutil + borde | Primary sólido (azul) |
| \`error\`    | error          | rosa sutil + borde     | Destructive sólido (rojo) — etiqueta "Eliminar" |

### Accesibilidad
- \`role="dialog"\` + \`aria-modal="true"\` → anunciado como ventana modal por AT.
- \`aria-labelledby\` → apunta al título del dialog.
- **Focus trap** (CDK \`FocusTrapFactory\`): el foco no puede salir del dialog mientras está abierto.
- **Escape** → cierra el dialog (emite \`closed\`).
- Al cerrar, el foco vuelve al elemento que abrió el dialog.
        `,
      },
    },
  },
  argTypes: {
    mode: {
      control: 'select',
      options: [
        'default',
        'success',
        'warning',
        'error',
      ] satisfies DialogMode[],
      description: 'Modo semántico',
    },
    title: {
      control: 'text',
      description: 'Título del dialog (requerido)',
    },
    open: {
      control: 'boolean',
      description: 'Controla la visibilidad',
    },
    closeOnOverlay: {
      control: 'boolean',
      description: 'Cerrar al hacer clic en el overlay',
    },
    confirmLabel: {
      control: 'text',
      description: 'Etiqueta del botón de confirmación (null = automático)',
    },
    cancelLabel: {
      control: 'text',
      description: 'Etiqueta del botón de cancelación',
    },
    showCancel: {
      control: 'boolean',
      description: 'Muestra el botón de cancelación',
    },
  },
  render: (args) => ({
    props: {
      ...args,
      onClosed: () => console.log('[pds-dialog] closed'),
      onConfirmed: () => console.log('[pds-dialog] confirmed'),
    },
    template: `
      <pds-dialog
        [mode]="mode"
        [title]="title"
        [open]="open"
        [closeOnOverlay]="closeOnOverlay"
        [confirmLabel]="confirmLabel"
        [cancelLabel]="cancelLabel"
        [showCancel]="showCancel"
        [disableScrollLock]="true"
        (closed)="onClosed()"
        (confirmed)="onConfirmed()"
      >
        ${BODY_TEXT}
      </pds-dialog>
    `,
  }),
};

export default meta;
type Story = StoryObj<PdsDialogComponent>;

// Wrapper para Storybook: overlay absolute dentro del canvas (no bloquea el scroll de docs)
const storyDecorators = [
  componentWrapperDecorator(
    (story) =>
      `<div style="position:relative;height:380px;overflow:hidden;--pds-overlay-position:absolute;">${story}</div>`
  ),
];

// ── Modo Default ─────────────────────────────────────────────────────────────
export const Default: Story = {
  name: 'Default',
  decorators: storyDecorators,
  args: {
    mode: 'default',
    title: 'Dialog title',
    open: true,
    closeOnOverlay: false,
    confirmLabel: null,
    cancelLabel: 'Cancelar',
    showCancel: true,
  },
};

// ── Modo Error ────────────────────────────────────────────────────────────────
export const Error: Story = {
  name: 'Error',
  decorators: storyDecorators,
  args: {
    mode: 'error',
    title: 'Dialog title',
    open: true,
    closeOnOverlay: false,
    confirmLabel: null, // auto → 'Eliminar'
    cancelLabel: 'Cancelar',
    showCancel: true,
  },
};

// ── Modo Warning ──────────────────────────────────────────────────────────────
export const Warning: Story = {
  name: 'Warning',
  decorators: storyDecorators,
  args: {
    mode: 'warning',
    title: 'Dialog title',
    open: true,
    closeOnOverlay: false,
    confirmLabel: null,
    cancelLabel: 'Cancelar',
    showCancel: true,
  },
};

// ── Modo Success ──────────────────────────────────────────────────────────────
export const Success: Story = {
  name: 'Success',
  decorators: storyDecorators,
  args: {
    mode: 'success',
    title: 'Dialog title',
    open: true,
    closeOnOverlay: false,
    confirmLabel: null,
    cancelLabel: 'Cancelar',
    showCancel: true,
  },
};

// ── Todos los modos (showcase) ────────────────────────────────────────────────
export const AllModes: Story = {
  name: 'Showcase — All Modes',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Todos los modos del Dialog. Sin overlay para facilitar la comparación visual.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 24px; align-items: flex-start;">
        @for (mode of modes; track mode) {
          <div style="position: relative; width: 420px;">
            <span style="
              font-family: 'IBM Plex Mono', monospace;
              font-size: 12px;
              font-weight: 700;
              letter-spacing: 0.6px;
              text-transform: uppercase;
              color: #bd00ff;
              display: block;
              margin-bottom: 8px;
            ">MODE: {{ mode }}</span>
            <pds-dialog
              [mode]="mode"
              title="Dialog title"
              [open]="true" [disableScrollLock]="true"
              style="--pds-dialog-static: 1"
            >
              Hemos dejado el mundo atrás, flotando suavemente en la quietud de la noche.
              Las estrellas brillan como ojos plateados contra el terciopelo negro del vacío.
            </pds-dialog>
          </div>
        }
      </div>
    `,
    props: {
      modes: ['default', 'error', 'warning', 'success'] as DialogMode[],
    },
  }),
};

// ── Sin botón Cancelar ────────────────────────────────────────────────────────
export const WithoutCancel: Story = {
  name: 'Sin cancelación',
  decorators: storyDecorators,
  parameters: {
    docs: {
      description: {
        story:
          'Dialog de confirmación sin opción de cancelar. Útil para operaciones irreversibles donde se requiere reconocimiento explícito.',
      },
    },
  },
  args: {
    mode: 'default',
    title: 'Operación completada',
    open: true,
    confirmLabel: 'Entendido',
    showCancel: false,
  },
};

// ── Con etiquetas personalizadas ──────────────────────────────────────────────
export const CustomLabels: Story = {
  name: 'Etiquetas personalizadas',
  decorators: storyDecorators,
  parameters: {
    docs: {
      description: {
        story:
          'Las etiquetas de los botones son configurables para adaptarse al contexto de la acción.',
      },
    },
  },
  args: {
    mode: 'warning',
    title: '¿Desea continuar?',
    open: true,
    confirmLabel: 'Sí, continuar',
    cancelLabel: 'No, volver',
  },
};

// ── Overlay clicable ──────────────────────────────────────────────────────────
export const CloseOnOverlay: Story = {
  name: 'Cierre por overlay',
  decorators: storyDecorators,
  parameters: {
    docs: {
      description: {
        story:
          '`closeOnOverlay: true` — al hacer clic en el overlay se emite `closed`. Usar con moderación; puede causar pérdida accidental de datos.',
      },
    },
  },
  args: {
    mode: 'default',
    title: 'Dialog con cierre por overlay',
    open: true,
    closeOnOverlay: true,
  },
};
