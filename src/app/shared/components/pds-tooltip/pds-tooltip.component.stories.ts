import { Meta, StoryObj } from '@storybook/angular';
import { PdsTooltipComponent } from './pds-tooltip.component';

const meta: Meta<PdsTooltipComponent & { triggerLabel: string }> = {
  title: 'Poli Design System / 06. Feedback & Overlays / Tooltip',
  component: PdsTooltipComponent,
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text', description: 'Texto del tooltip. Requerido.' },
    position: {
      control: 'select',
      options: ['top', 'top-end', 'bottom', 'left', 'right'],
      description: 'Posición del tooltip respecto al activador',
    },
    disabled: { control: 'boolean', description: 'Deshabilita la aparición del tooltip' },
    triggerLabel: { control: 'text', description: 'Texto del botón activador (solo para el sandbox)' },
  },
  parameters: {
    docs: {
      description: {
        component: `
Envuelve un elemento activador y muestra un globo de texto informativo al hacer **hover** o **foco** sobre él.
El componente expone \`tooltipId\` para que el activador lo use en \`aria-describedby\`.

### Cuándo usarlo
- Para aclarar la función de controles cuyo texto visible puede ser ambiguo (íconos, botones cortos).
- Como complemento a \`pds-icon-button\` (ya integrado internamente).
- Para mostrar ayuda contextual sin ocupar espacio permanente en el layout.

### Cuándo NO usarlo
- No usar para mostrar información crítica que el usuario necesita leer antes de actuar — usar un helper text o un dialog.
- No usar en elementos que no sean interactivos (p. ej. un \`<div>\` estático) — el tooltip no se activa por foco.
- No usar como único canal de información si el activador es un elemento \`disabled\` nativo (no recibe foco).

### API
\`\`\`html
<pds-tooltip text="Información adicional" position="top">
  <button [attr.aria-describedby]="tooltipRef.tooltipId" #tooltipRef="...">
    Ayuda
  </button>
</pds-tooltip>
\`\`\`

| Input       | Tipo                                               | Default  | Descripción |
|-------------|----------------------------------------------------|----------|-------------|
| \`text\`     | \`string\` (requerido)                            | —        | Texto del tooltip |
| \`position\` | \`'top'\\|'top-end'\\|'bottom'\\|'left'\\|'right'\` | \`'top'\` | Posición del globo |
| \`disabled\` | \`boolean\`                                       | \`false\` | Deshabilita la aparición |

**Propiedad pública expuesta:**
| Propiedad    | Tipo     | Descripción |
|--------------|----------|-------------|
| \`tooltipId\` | \`string\` | ID único del globo — usar en \`aria-describedby\` del activador |

---

### Accesibilidad — WCAG 2.2

#### Criterios aplicables
| Criterio | Nivel | Aplicación |
|----------|-------|------------|
| **1.3.3 Características sensoriales** | A | El tooltip no usa solo la posición visual para transmitir información |
| **1.4.3 Contraste mínimo** | AA | Texto del tooltip ≥ 4.5:1 sobre el fondo del globo |
| **2.1.1 Teclado** | A | El tooltip aparece al enfocar el activador con Tab — no requiere mouse |
| **2.4.7 Foco visible** | AA | El foco es visible en el activador que envuelve el componente |
| **1.4.13 Contenido en hover o foco** | AA | El globo permanece visible mientras el puntero está sobre él y puede ser descartado con Escape |
| **4.1.2 Nombre, rol, valor** | A | El activador usa \`aria-describedby\` para asociar el texto del tooltip |

#### Navegación por teclado
| Tecla | Acción |
|-------|--------|
| **Tab** | Enfoca el activador — muestra el tooltip |
| **Escape** | Oculta el tooltip (WCAG 1.4.13) |
| **Shift + Tab** | Foco al elemento anterior — oculta el tooltip |

#### Atributos ARIA
| Atributo | Dónde | Función |
|----------|-------|---------|
| \`aria-describedby="[tooltipId]"\` | En el activador (manual) | Asocia el globo al activador para lectores de pantalla |
| El globo en sí no tiene rol ARIA adicional | — | El texto se expone como descripción vía \`aria-describedby\` |

#### Anuncio en lectores de pantalla
Cuando el activador recibe foco: *"[nombre del activador], botón — [texto del tooltip]"*.
El texto del tooltip se lee como descripción adicional, no interrumpiendo el flujo.

#### Auditoría v1 → v2
| Hallazgo v1 (Cortés, feb 2026) | Criterio WCAG | Resolución en v2 |
|--------------------------------|---------------|------------------|
| Tooltip solo activable por hover — no accesible por teclado | 2.1.1 | El globo aparece al recibir foco (\`:focus-within\`) y al hacer hover |
| Sin asociación semántica entre activador y tooltip | 4.1.2 | \`tooltipId\` expuesto para vincularlo con \`aria-describedby\` |
| El globo no permanecía visible al pasar el cursor sobre él | 1.4.13 | El hover en el globo también lo mantiene visible |

### Buenas prácticas
✅ Conecta siempre \`[attr.aria-describedby]="tooltipRef.tooltipId"\` en el elemento activador.
✅ El texto del tooltip debe complementar, no duplicar, el nombre del activador.
✅ Usa \`pds-icon-button\` cuando el activador sea un ícono-botón — ya trae el tooltip integrado.
❌ No uses tooltips en elementos no interactivos — los usuarios de teclado no podrían acceder a ellos.
❌ No uses el tooltip para información esencial de formulario — usa \`pds-helper-text\`.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<PdsTooltipComponent & { triggerLabel: string }>;

// ── Sandbox ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default — Sandbox',
  args: { text: 'Información adicional del elemento', position: 'top', disabled: false, triggerLabel: 'Pasa el cursor o enfoca aquí' },
  render: (args) => ({
    props: args,
    template: `
      <div style="display:flex;justify-content:center;padding:60px">
        <pds-tooltip [text]="text" [position]="position" [disabled]="disabled">
          <button style="padding:8px 16px;font-family:Poppins;border-radius:8px;border:1px solid #0F385A;cursor:pointer">
            {{ triggerLabel }}
          </button>
        </pds-tooltip>
      </div>
    `,
  }),
};

// ── Todas las posiciones ──────────────────────────────────────────────────────

export const AllPositions: Story = {
  name: 'Todas las posiciones',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Cinco posiciones disponibles respecto al activador: top, top-end, bottom, left, right.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:48px;justify-content:center;padding:60px">
        <pds-tooltip text="Posición top" position="top">
          <button style="padding:8px 16px;font-family:Poppins;border-radius:8px;border:1px solid #0F385A;cursor:pointer">Top</button>
        </pds-tooltip>
        <pds-tooltip text="Posición top-end" position="top-end">
          <button style="padding:8px 16px;font-family:Poppins;border-radius:8px;border:1px solid #0F385A;cursor:pointer">Top-end</button>
        </pds-tooltip>
        <pds-tooltip text="Posición bottom" position="bottom">
          <button style="padding:8px 16px;font-family:Poppins;border-radius:8px;border:1px solid #0F385A;cursor:pointer">Bottom</button>
        </pds-tooltip>
        <pds-tooltip text="Posición left" position="left">
          <button style="padding:8px 16px;font-family:Poppins;border-radius:8px;border:1px solid #0F385A;cursor:pointer">Left</button>
        </pds-tooltip>
        <pds-tooltip text="Posición right" position="right">
          <button style="padding:8px 16px;font-family:Poppins;border-radius:8px;border:1px solid #0F385A;cursor:pointer">Right</button>
        </pds-tooltip>
      </div>
    `,
  }),
};

// ── Con texto largo ───────────────────────────────────────────────────────────

export const LongText: Story = {
  name: 'Con texto largo',
  render: () => ({
    template: `
      <div style="display:flex;justify-content:center;padding:80px">
        <pds-tooltip
          text="Este es un texto de tooltip más largo que proporciona contexto adicional sobre la función del elemento"
          position="bottom"
        >
          <button style="padding:8px 16px;font-family:Poppins;border-radius:8px;border:1px solid #0F385A;cursor:pointer">
            Hover o foco aquí
          </button>
        </pds-tooltip>
      </div>
    `,
  }),
};

// ── Deshabilitado ─────────────────────────────────────────────────────────────

export const DisabledTooltip: Story = {
  name: 'Tooltip deshabilitado',
  render: () => ({
    template: `
      <div style="display:flex;gap:32px;justify-content:center;padding:60px">
        <pds-tooltip text="Activo: aparece al hacer hover o foco" position="bottom">
          <button style="padding:8px 16px;font-family:Poppins;border-radius:8px;border:1px solid #0F385A;cursor:pointer">
            Tooltip activo
          </button>
        </pds-tooltip>
        <pds-tooltip text="Este texto no aparecerá" position="bottom" [disabled]="true">
          <button style="padding:8px 16px;font-family:Poppins;border-radius:8px;border:1px solid #8FA4B2;cursor:pointer;color:#8FA4B2">
            Tooltip deshabilitado
          </button>
        </pds-tooltip>
      </div>
    `,
  }),
};

// ── Accesibilidad ─────────────────────────────────────────────────────────────

export const A11yKeyboardAccess: Story = {
  name: 'A11y — Acceso por teclado (Tab para probar)',
  parameters: {
    docs: {
      description: {
        story: `
Usa **Tab** para mover el foco entre los botones. El tooltip debe aparecer al enfocar
cada botón sin necesidad de mover el cursor.
El texto del tooltip se lee como descripción adicional en lectores de pantalla.
        `,
      },
    },
  },
  render: () => ({
    template: `
      <div style="display:flex;gap:24px;justify-content:center;padding:80px">
        <pds-tooltip text="Guardar los cambios realizados en el formulario" position="bottom">
          <button
            style="padding:8px 16px;font-family:Poppins;border-radius:8px;background:#0F385A;color:#fff;border:none;cursor:pointer"
          >
            Guardar
          </button>
        </pds-tooltip>
        <pds-tooltip text="Descartar los cambios y volver al estado anterior" position="bottom">
          <button
            style="padding:8px 16px;font-family:Poppins;border-radius:8px;border:1px solid #0F385A;cursor:pointer"
          >
            Cancelar
          </button>
        </pds-tooltip>
      </div>
    `,
  }),
};
