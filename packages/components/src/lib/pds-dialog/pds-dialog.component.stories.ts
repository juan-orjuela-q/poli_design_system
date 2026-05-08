import { Meta, StoryObj } from '@storybook/angular';
import { componentWrapperDecorator } from '@storybook/angular';
import { PdsDialogComponent, DialogMode } from './pds-dialog.component';

const BODY_TEXT = `¿Estás seguro de que deseas continuar con esta acción?
Esta operación puede tener consecuencias importantes y requerirá tu confirmación.`;

const BODY_DELETE = `¿Estás seguro de que deseas eliminar este elemento permanentemente?
Esta acción no puede deshacerse.`;

const meta: Meta<PdsDialogComponent> = {
  title: 'Poli Design System / 06. Feedback & Overlays / Dialog',
  component: PdsDialogComponent,
  decorators: [
    componentWrapperDecorator(
      (story) => `<div style="position:relative;min-height:400px;--pds-overlay-position:absolute">${story}</div>`
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error'],
      description: 'Modo semántico — controla ícono, color y etiqueta del botón de confirmación',
    },
    title: { control: 'text', description: 'Título del dialog. Requerido.' },
    open: { control: 'boolean', description: 'Controla la visibilidad del dialog' },
    closeOnOverlay: { control: 'boolean', description: 'Si true, clic en el overlay cierra el dialog' },
    confirmLabel: { control: 'text', description: 'Etiqueta del botón de confirmación (null = automático)' },
    cancelLabel: { control: 'text', description: 'Etiqueta del botón de cancelación' },
    showCancel: { control: 'boolean', description: 'Muestra el botón de cancelación' },
  },
  parameters: {
    docs: {
      description: {
        component: `
Diálogo de confirmación modal del DS v2. Implementa el patrón de diálogo según ARIA Authoring Practices Guide (APG).
Disponible en 4 modos semánticos con focus trap de CDK y retorno de foco al elemento disparador.

### Cuándo usarlo
- Para solicitar confirmación antes de ejecutar acciones irreversibles (eliminar, cancelar suscripción).
- Para comunicar el resultado de una operación importante (éxito, error, advertencia).
- Cuando el usuario necesita tomar una decisión antes de continuar.

### Cuándo NO usarlo
- No usar para mostrar contenido extenso o formularios — usar \`pds-modal\`.
- No usar para notificaciones temporales que no requieren acción — usar \`pds-notification\`.
- No usar como confirmación de acciones reversibles — un simple snackbar con "Deshacer" es suficiente.

### API
\`\`\`html
<pds-dialog
  mode="error"
  title="¿Eliminar elemento?"
  [open]="isOpen"
  [showCancel]="true"
  confirmLabel="Eliminar"
  cancelLabel="Cancelar"
  (closed)="isOpen = false"
  (confirmed)="onConfirm()"
>
  Esta acción no puede deshacerse.
</pds-dialog>
\`\`\`

| Input           | Tipo                                         | Default       | Descripción |
|-----------------|----------------------------------------------|---------------|-------------|
| \`mode\`         | \`'default'\\|'success'\\|'warning'\\|'error'\` | \`'default'\` | Modo semántico |
| \`title\`        | \`string\` (requerido)                       | —             | Título del dialog |
| \`open\`         | \`boolean\`                                  | \`false\`     | Visibilidad |
| \`closeOnOverlay\` | \`boolean\`                               | \`false\`     | Cierra al hacer clic en el fondo |
| \`confirmLabel\` | \`string \\| null\`                          | auto          | "Eliminar" para error, "Aceptar" para el resto |
| \`cancelLabel\`  | \`string\`                                   | \`'Cancelar'\` | Etiqueta del botón de cancelación |
| \`showCancel\`   | \`boolean\`                                  | \`true\`      | Muestra el botón Cancelar |
| \`disableScrollLock\` | \`boolean\`                            | \`false\`     | No bloquea el scroll del body (usar en Storybook) |

| Output      | Tipo     | Descripción |
|-------------|----------|-------------|
| \`closed\`    | \`void\` | Cancelación (botón Cancelar, Escape, overlay) |
| \`confirmed\` | \`void\` | Confirmación (botón de confirmación) |

---

### Accesibilidad — WCAG 2.2

#### Criterios aplicables
| Criterio | Nivel | Aplicación |
|----------|-------|------------|
| **1.3.1 Info y relaciones** | A | \`role="dialog"\` con \`aria-labelledby\` apuntando al título |
| **1.4.3 Contraste mínimo** | AA | Texto del dialog ≥ 4.5:1 sobre el fondo |
| **2.1.1 Teclado** | A | Todos los controles del dialog son operables con Tab/Enter/Space |
| **2.1.2 Sin trampa de teclado** | A | Escape cierra el dialog — el foco no queda atrapado sin salida |
| **2.4.3 Orden del foco** | A | Al abrir: foco se mueve al dialog; al cerrar: foco regresa al elemento disparador |
| **2.4.7 Foco visible** | AA | Anillo de foco doble en todos los controles del dialog |
| **4.1.2 Nombre, rol, valor** | A | \`role="dialog"\` + \`aria-modal="true"\` + \`aria-labelledby="[titleId]"\` |

#### Navegación por teclado
| Tecla | Acción |
|-------|--------|
| **Tab** | Cicla entre los controles del dialog (focus trap — no sale del dialog) |
| **Shift + Tab** | Cicla en orden inverso dentro del dialog |
| **Enter / Space** | Activa el botón enfocado |
| **Escape** | Cierra el dialog y emite \`closed\` — foco regresa al trigger |

#### Atributos ARIA
| Atributo | Valor | Función |
|----------|-------|---------|
| \`role="dialog"\` | automático | Identifica el contenedor como diálogo modal |
| \`aria-modal="true"\` | automático | Indica a AT que el contenido fuera del dialog no es accesible |
| \`aria-labelledby="[titleId]"\` | automático | Asocia el título con el dialog para lectores de pantalla |
| \`aria-hidden\` en el ícono | automático | El ícono es decorativo — el título comunica el modo |

#### Anuncio en lectores de pantalla
Al abrir: *"[título], diálogo"* — el título se anuncia inmediatamente.
Al cerrar: el foco regresa al trigger y se reanuda el contexto anterior.

#### Focus trap (CDK)
El dialog usa \`@angular/cdk/a11y\` \`FocusTrap\`. Mientras el dialog está abierto:
- Tab y Shift+Tab ciclan solo entre los controles del dialog.
- El contenido fuera del dialog queda inaccesible para el teclado.

#### Auditoría v1 → v2
| Hallazgo v1 (Cortés, feb 2026) | Criterio WCAG | Resolución en v2 |
|--------------------------------|---------------|------------------|
| Foco no regresa al elemento que abrió el dialog | 2.4.3 | \`previousFocus\` guardado; restaurado en \`destroyFocusTrap()\` |
| Sin focus trap — el teclado podía salir del dialog | 2.1.2 | Focus trap CDK activo mientras \`open=true\` |
| Dialog sin semántica ARIA modal | 4.1.2 | \`role="dialog"\` + \`aria-modal="true"\` + \`aria-labelledby\` |
| Escape no cerraba el componente | 2.1.1 | \`@HostListener('document:keydown.escape')\` emite \`closed\` |

### Buenas prácticas
✅ Usa \`mode="error"\` para acciones destructivas — el botón de confirmación cambia automáticamente a "Eliminar" y variante destructiva.
✅ El elemento que dispara el dialog debe guardar la referencia para que el foco regrese correctamente.
✅ Usa \`disableScrollLock\` solo en entornos de documentación (Storybook) — en producción mantén \`false\`.
❌ No uses \`closeOnOverlay=true\` en dialogs de confirmación de acciones destructivas — el usuario puede cerrarlos accidentalmente.
❌ No omitas el botón Cancelar en dialogs que no sean solo informativos — el usuario debe poder salir sin consecuencias.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<PdsDialogComponent>;

// ── Sandbox ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default — Sandbox',
  args: {
    mode: 'default',
    title: 'Confirmar acción',
    open: true,
    closeOnOverlay: false,
    showCancel: true,
    cancelLabel: 'Cancelar',
    disableScrollLock: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <pds-dialog
        [mode]="mode"
        [title]="title"
        [open]="open"
        [closeOnOverlay]="closeOnOverlay"
        [showCancel]="showCancel"
        [cancelLabel]="cancelLabel"
        [disableScrollLock]="disableScrollLock"
      >
        ${BODY_TEXT}
      </pds-dialog>
    `,
  }),
};

// ── Todos los modos ───────────────────────────────────────────────────────────

export const AllModes: Story = {
  name: 'Todos los modos',
  parameters: {
    docs: {
      description: {
        story: 'Cada modo ajusta automáticamente el ícono, los colores y la etiqueta del botón de confirmación.',
      },
    },
  },
  render: () => ({
    props: { openMode: 'default' as DialogMode },
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:12px">
        <button (click)="openMode='default'" style="padding:8px 16px;font-family:Poppins;border-radius:8px;border:1px solid #0F385A;cursor:pointer">Default</button>
        <button (click)="openMode='success'" style="padding:8px 16px;font-family:Poppins;border-radius:8px;border:1px solid #6F921E;cursor:pointer">Success</button>
        <button (click)="openMode='warning'" style="padding:8px 16px;font-family:Poppins;border-radius:8px;border:1px solid #D96C06;cursor:pointer">Warning</button>
        <button (click)="openMode='error'" style="padding:8px 16px;font-family:Poppins;border-radius:8px;border:1px solid #E0006E;cursor:pointer">Error</button>
      </div>
      <pds-dialog
        [mode]="openMode"
        [title]="openMode === 'error' ? '¿Eliminar elemento?' : 'Confirmar acción'"
        [open]="!!openMode"
        [disableScrollLock]="true"
        (closed)="openMode = 'default'"
        (confirmed)="openMode = 'default'"
      >
        <span *ngIf="openMode === 'error'">Esta acción no puede deshacerse.</span>
        <span *ngIf="openMode !== 'error'">${BODY_TEXT}</span>
      </pds-dialog>
    `,
  }),
};

// ── Error / Destructivo ───────────────────────────────────────────────────────

export const ErrorDestructive: Story = {
  name: 'Modo Error (destructivo)',
  parameters: {
    docs: {
      description: {
        story: `
El modo \`error\` activa automáticamente:
- Botón de confirmación con variante **destructive** (magenta) y label **"Eliminar"**
- Botón de cancelación con variante **destructive-outline**
- Ícono \`error\` en el encabezado
        `,
      },
    },
  },
  render: () => ({
    template: `
      <pds-dialog
        mode="error"
        title="¿Eliminar esta materia?"
        [open]="true"
        [disableScrollLock]="true"
      >
        ${BODY_DELETE}
      </pds-dialog>
    `,
  }),
};

// ── Sin botón cancelar ────────────────────────────────────────────────────────

export const WithoutCancel: Story = {
  name: 'Sin botón Cancelar (solo informativo)',
  render: () => ({
    template: `
      <pds-dialog
        mode="success"
        title="¡Registro completado!"
        [open]="true"
        [showCancel]="false"
        confirmLabel="Continuar"
        [disableScrollLock]="true"
      >
        Tu cuenta ha sido creada correctamente. Ya puedes acceder a todos los servicios del Politécnico.
      </pds-dialog>
    `,
  }),
};

// ── Accesibilidad ─────────────────────────────────────────────────────────────

export const A11yFocusTrap: Story = {
  name: 'A11y — Focus trap y retorno de foco (Tab para probar)',
  parameters: {
    docs: {
      description: {
        story: `
1. Haz clic en **"Abrir dialog"** para abrir el diálogo y verifica que el foco se mueve automáticamente dentro.
2. Usa **Tab** y **Shift+Tab** para verificar que el foco cicla solo entre los controles del dialog.
3. Presiona **Escape** o haz clic en **Cancelar** y verifica que el foco regresa al botón que abrió el dialog.
        `,
      },
    },
  },
  render: () => ({
    props: { isOpen: false },
    template: `
      <div style="padding:16px">
        <button
          (click)="isOpen = true"
          style="padding:8px 16px;font-family:Poppins;border-radius:8px;background:#0F385A;color:#fff;border:none;cursor:pointer"
        >
          Abrir dialog (Tab para probar focus trap)
        </button>
        <pds-dialog
          mode="warning"
          title="¿Continuar con la operación?"
          [open]="isOpen"
          [disableScrollLock]="true"
          (closed)="isOpen = false"
          (confirmed)="isOpen = false"
        >
          Verifica que el foco queda atrapado dentro del dialog y regresa aquí al cerrarlo.
        </pds-dialog>
      </div>
    `,
  }),
};
