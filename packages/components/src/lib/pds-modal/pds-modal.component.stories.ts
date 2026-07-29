import { Meta, StoryObj } from '@storybook/angular';
import { componentWrapperDecorator } from '@storybook/angular';
import { PdsModalComponent, ModalSize } from './pds-modal.component';

const LOREM = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.`;

const meta: Meta<PdsModalComponent> = {
  title: 'Poli Design System / 06. Feedback & Overlays / Modal',
  component: PdsModalComponent,
  decorators: [
    componentWrapperDecorator(
      (story) => `<div style="position:relative;min-height:500px;--pds-overlay-position:absolute">${story}</div>`
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Tamaño del modal (SM=420px · MD=560px · LG=720px · XL=900px · 2XL=1200px)',
    },
    title: { control: 'text', description: 'Título del modal. Requerido.' },
    open: { control: 'boolean', description: 'Controla la visibilidad del modal' },
    closeOnOverlay: { control: 'boolean', description: 'Cierra al hacer clic en el overlay' },
    showActions: { control: 'boolean', description: 'Muestra el footer con botones Cancelar + Aceptar' },
    showCancel: { control: 'boolean', description: 'Muestra el botón Cancelar en el footer' },
    confirmLabel: { control: 'text', description: 'Etiqueta del botón de confirmación' },
    cancelLabel: { control: 'text', description: 'Etiqueta del botón de cancelación' },
  },
  parameters: {
    docs: {
      description: {
        component: `
Modal de contenido libre del DS v2. A diferencia del \`pds-dialog\` (confirmación estructurada),
el modal acepta cualquier contenido vía \`ng-content\` y soporta 5 tamaños.
Implementa el patrón ARIA APG con focus trap CDK. Se centra en todos los tamaños de pantalla.

### Cuándo usarlo
- Para mostrar formularios, detalles de elementos, configuraciones o contenido extenso en un overlay.
- Cuando el usuario necesita completar una tarea que requiere más espacio que un dialog de confirmación.
- Para vistas de detalle o edición sin cambiar de ruta.

### Cuándo NO usarlo
- No usar para confirmaciones simples de dos opciones — usar \`pds-dialog\`.
- No usar para alertas o notificaciones temporales — usar \`pds-notification\`.
- No anidar modales — genera problemas de accesibilidad y UX.

### API
\`\`\`html
<pds-modal
  title="Editar perfil"
  size="md"
  [open]="isOpen"
  confirmLabel="Guardar"
  (closed)="isOpen = false"
  (confirmed)="onSave()"
>
  <!-- contenido libre aquí -->
  <form>...</form>
</pds-modal>
\`\`\`

| Input              | Tipo                              | Default      | Descripción |
|--------------------|-----------------------------------|--------------|-------------|
| \`title\`           | \`string\` (requerido)           | —            | Título del modal |
| \`size\`            | \`'sm'\\|'md'\\|'lg'\\|'xl'\\|'2xl'\` | \`'md'\` | Max-width del contenedor |
| \`open\`            | \`boolean\`                      | \`false\`    | Visibilidad |
| \`closeOnOverlay\`  | \`boolean\`                      | \`true\`     | Cierra al clic en el fondo |
| \`showActions\`     | \`boolean\`                      | \`true\`     | Muestra el footer con botones |
| \`showCancel\`      | \`boolean\`                      | \`true\`     | Muestra el botón Cancelar |
| \`confirmLabel\`    | \`string\`                       | \`'Aceptar'\` | Etiqueta del botón de confirmación |
| \`cancelLabel\`     | \`string\`                       | \`'Cancelar'\` | Etiqueta del botón de cancelación |
| \`disableScrollLock\` | \`boolean\`                    | \`false\`    | No bloquea el scroll del body (Storybook) |

| Output      | Tipo     | Descripción |
|-------------|----------|-------------|
| \`closed\`    | \`void\` | Botón ✕, Cancelar, Escape, clic en overlay |
| \`confirmed\` | \`void\` | Botón de confirmación del footer |

---

### Accesibilidad — WCAG 2.2

#### Criterios aplicables
| Criterio | Nivel | Aplicación |
|----------|-------|------------|
| **1.3.1 Info y relaciones** | A | \`role="dialog"\` con \`aria-labelledby\` apuntando al título |
| **1.4.3 Contraste mínimo** | AA | Texto del modal ≥ 4.5:1 sobre el fondo |
| **2.1.1 Teclado** | A | Todos los controles son operables con Tab/Enter/Space |
| **2.1.2 Sin trampa de teclado** | A | Escape cierra el modal — el foco no queda atrapado sin salida |
| **2.4.3 Orden del foco** | A | Al abrir: foco se mueve al modal; al cerrar: foco regresa al trigger |
| **2.4.7 Foco visible** | AA | Anillo de foco doble en todos los controles del modal |
| **4.1.2 Nombre, rol, valor** | A | \`role="dialog"\` + \`aria-modal="true"\` + \`aria-labelledby="[titleId]"\` |

#### Navegación por teclado
| Tecla | Acción |
|-------|--------|
| **Tab** | Cicla entre los controles del modal (focus trap activo) |
| **Shift + Tab** | Cicla en orden inverso dentro del modal |
| **Enter / Space** | Activa el control enfocado |
| **Escape** | Cierra el modal — foco regresa al trigger |

#### Atributos ARIA
| Atributo | Valor | Función |
|----------|-------|---------|
| \`role="dialog"\` | automático | Identifica el contenedor como diálogo modal |
| \`aria-modal="true"\` | automático | Indica a AT que el contenido externo no es accesible |
| \`aria-labelledby="[titleId]"\` | automático | Asocia el título con el modal |
| \`aria-label="Cerrar"\` | en el botón ✕ | Nombre accesible del botón de cierre |

#### Anuncio en lectores de pantalla
Al abrir: *"[título], diálogo"* — el título se anuncia al enfocar el modal.
Al cerrar: el foco regresa al trigger y los lectores de pantalla retoman el contexto anterior.

#### Auditoría v1 → v2
| Hallazgo v1 (Cortés, feb 2026) | Criterio WCAG | Resolución en v2 |
|--------------------------------|---------------|------------------|
| Foco no regresa al elemento que abrió el modal | 2.4.3 | \`previousFocus\` guardado; restaurado al destruir el focus trap |
| Sin focus trap — el teclado podía salir del modal | 2.1.2 | Focus trap CDK activo mientras \`open=true\` |
| Modal sin semántica ARIA | 4.1.2 | \`role="dialog"\` + \`aria-modal\` + \`aria-labelledby\` |
| Escape no cerraba el componente | 2.1.1 | \`@HostListener('document:keydown.escape')\` emite \`closed\` |

### Buenas prácticas
✅ El elemento que dispara el modal debe guardar la referencia para que el foco regrese correctamente.
✅ Usa el tamaño mínimo que contenga el contenido sin scroll — el scroll interno es señal de que el contenido es demasiado extenso.
✅ En móvil el modal sigue centrado y ocupa el ancho disponible menos el margen del overlay.
❌ No anidar modales — en lugar de eso, usa un stepper o tabs dentro del modal.
❌ No uses \`disableScrollLock\` en producción — solo en Storybook para evitar scroll-lock en el iframe de docs.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<PdsModalComponent>;

// ── Sandbox ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default — Sandbox',
  args: {
    title: 'Título del modal',
    size: 'md',
    open: true,
    closeOnOverlay: true,
    showActions: true,
    showCancel: true,
    confirmLabel: 'Aceptar',
    cancelLabel: 'Cancelar',
    disableScrollLock: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <pds-modal
        [title]="title"
        [size]="size"
        [open]="open"
        [closeOnOverlay]="closeOnOverlay"
        [showActions]="showActions"
        [showCancel]="showCancel"
        [confirmLabel]="confirmLabel"
        [cancelLabel]="cancelLabel"
        [disableScrollLock]="disableScrollLock"
      >
        <p style="font-family:'Open Sans';font-size:16px;color:#50606E;margin:0">${LOREM}</p>
      </pds-modal>
    `,
  }),
};

// ── Todos los tamaños ─────────────────────────────────────────────────────────

export const AllSizes: Story = {
  name: 'Todos los tamaños',
  parameters: {
    docs: {
      description: {
        story: `
Cinco tamaños disponibles para adaptarse al contenido:
SM (420px) · MD (560px) · LG (720px) · XL (900px) · 2XL (1200px).
Elige el tamaño mínimo que contenga el contenido sin requerir scroll interno.
        `,
      },
    },
  },
  render: () => ({
    props: { currentSize: 'md' as ModalSize },
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px">
        <button (click)="currentSize='sm'" style="padding:6px 12px;font-family:Poppins;font-size:13px;border-radius:6px;border:1px solid #0F385A;cursor:pointer">SM</button>
        <button (click)="currentSize='md'" style="padding:6px 12px;font-family:Poppins;font-size:13px;border-radius:6px;border:1px solid #0F385A;cursor:pointer">MD</button>
        <button (click)="currentSize='lg'" style="padding:6px 12px;font-family:Poppins;font-size:13px;border-radius:6px;border:1px solid #0F385A;cursor:pointer">LG</button>
        <button (click)="currentSize='xl'" style="padding:6px 12px;font-family:Poppins;font-size:13px;border-radius:6px;border:1px solid #0F385A;cursor:pointer">XL</button>
        <button (click)="currentSize='2xl'" style="padding:6px 12px;font-family:Poppins;font-size:13px;border-radius:6px;border:1px solid #0F385A;cursor:pointer">2XL</button>
      </div>
      <pds-modal
        [title]="'Modal tamaño ' + currentSize.toUpperCase()"
        [size]="currentSize"
        [open]="true"
        [disableScrollLock]="true"
      >
        <p style="font-family:'Open Sans';font-size:16px;color:#50606E;margin:0">${LOREM}</p>
      </pds-modal>
    `,
  }),
};

// ── Sin footer ────────────────────────────────────────────────────────────────

export const WithoutActions: Story = {
  name: 'Sin footer de acciones',
  parameters: {
    docs: {
      description: {
        story: 'Usa \`[showActions]="false"\` cuando el contenido tiene sus propios controles o cuando el modal es solo informativo.',
      },
    },
  },
  render: () => ({
    template: `
      <pds-modal
        title="Política de privacidad"
        size="lg"
        [open]="true"
        [showActions]="false"
        [disableScrollLock]="true"
      >
        <div style="font-family:'Open Sans';font-size:15px;color:#50606E;line-height:1.6">
          <p>${LOREM}</p>
          <p>${LOREM}</p>
        </div>
      </pds-modal>
    `,
  }),
};

// ── Con formulario ────────────────────────────────────────────────────────────

export const WithForm: Story = {
  name: 'Con formulario',
  parameters: {
    docs: {
      description: {
        story: 'Ejemplo de modal con formulario interior. El focus trap garantiza que Tab cicle solo entre los campos del formulario y los botones del footer.',
      },
    },
  },
  render: () => ({
    template: `
      <pds-modal
        title="Editar perfil"
        size="sm"
        [open]="true"
        confirmLabel="Guardar cambios"
        [disableScrollLock]="true"
      >
        <div style="display:flex;flex-direction:column;gap:16px">
          <div>
            <label style="font-family:Poppins;font-size:13px;font-weight:600;color:#0F385A;display:block;margin-bottom:4px" for="modal-name">Nombre completo</label>
            <input id="modal-name" type="text" value="Juan Rodríguez" style="width:100%;padding:8px 12px;font-family:'Open Sans';border:1px solid #B0BEC5;border-radius:8px;font-size:15px;box-sizing:border-box" />
          </div>
          <div>
            <label style="font-family:Poppins;font-size:13px;font-weight:600;color:#0F385A;display:block;margin-bottom:4px" for="modal-email">Correo electrónico</label>
            <input id="modal-email" type="email" value="juan@poli.edu.co" style="width:100%;padding:8px 12px;font-family:'Open Sans';border:1px solid #B0BEC5;border-radius:8px;font-size:15px;box-sizing:border-box" />
          </div>
        </div>
      </pds-modal>
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
1. Haz clic en **"Abrir modal"** — el foco debe moverse automáticamente dentro del modal.
2. Usa **Tab** para verificar que el foco cicla solo entre los controles del modal.
3. Presiona **Escape** o **Cancelar** — el foco debe regresar al botón que abrió el modal.
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
          Abrir modal (verifica focus trap con Tab)
        </button>
        <pds-modal
          title="Verificar accesibilidad"
          size="md"
          [open]="isOpen"
          [disableScrollLock]="true"
          (closed)="isOpen = false"
          (confirmed)="isOpen = false"
        >
          <p style="font-family:'Open Sans';font-size:15px;color:#50606E;margin:0">
            Usa Tab para ciclar por los controles. Escape debe cerrar el modal y devolver el foco al botón de apertura.
          </p>
        </pds-modal>
      </div>
    `,
  }),
};
