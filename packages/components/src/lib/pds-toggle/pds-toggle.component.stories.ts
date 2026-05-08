import { Meta, StoryObj } from '@storybook/angular';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PdsToggleComponent } from './pds-toggle.component';

const meta: Meta<PdsToggleComponent> = {
  title: 'Poli Design System / 05. Forms / Form (Toggle)',
  component: PdsToggleComponent,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Texto visible del toggle. Requerido.' },
    checked: { control: 'boolean', description: 'Estado inicial (encendido/apagado)' },
    disabled: { control: 'boolean', description: 'Estado deshabilitado (aria-disabled)' },
    labelPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Posición del texto respecto al switch visual',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
Control de activación/desactivación del DS v2. Implementado como \`<button role="switch">\`
con \`aria-checked\` que comunica el estado binario a los lectores de pantalla.
Compatible con Angular Reactive Forms (CVA — emite \`boolean\`).

### Cuándo usarlo
- Para activar o desactivar una función o preferencia de forma inmediata (sin requerir confirmación).
- Configuraciones de notificaciones, modo oscuro, privacidad, visibilidad de perfil.
- Cuando el efecto del cambio es inmediato y reversible.

### Cuándo NO usarlo
- No usar para seleccionar entre varias opciones — usar \`pds-radio-group\`.
- No usar para opciones de formulario que se envían al mismo tiempo que otros campos — usar \`pds-checkbox\`.
- No usar cuando el cambio requiere confirmación — mostrar un dialog antes.

### API
\`\`\`html
<!-- Sin formulario reactivo -->
<pds-toggle
  label="Activar notificaciones push"
  [checked]="isEnabled"
  (checkedChange)="isEnabled = $event"
/>

<!-- Con FormControl -->
<pds-toggle label="Modo oscuro" [formControl]="darkModeCtrl" />
\`\`\`

| Input           | Tipo                    | Default   | Descripción |
|-----------------|-------------------------|-----------|-------------|
| \`label\`         | \`string\` (requerido) | —         | Texto del toggle |
| \`checked\`       | \`boolean\`            | \`false\`  | Estado inicial |
| \`disabled\`      | \`boolean\`            | \`false\`  | Deshabilitado |
| \`labelPosition\` | \`'left'\\|'right'\`   | \`'right'\` | Posición del label |

| Output         | Tipo      | Descripción |
|----------------|-----------|-------------|
| \`checkedChange\` | \`boolean\` | Emite el nuevo estado al cambiar |

---

### Accesibilidad — WCAG 2.2

#### Criterios aplicables
| Criterio | Nivel | Aplicación |
|----------|-------|------------|
| **1.4.1 Uso del color** | A | El estado on/off no depende solo del color — el thumb cambia de posición y hay etiqueta textual |
| **1.4.3 Contraste mínimo** | AA | Texto del label ≥ 4.5:1 sobre el fondo |
| **1.4.11 Contraste no textual** | AA | El track del switch ≥ 3:1 sobre el fondo en todos los estados |
| **2.1.1 Teclado** | A | Activable con Space y Enter como un botón nativo |
| **2.4.7 Foco visible** | AA | Anillo de foco doble en el botón |
| **2.5.8 Tamaño del objetivo** | AA | Área táctil del switch ≥ 48px de alto |
| **4.1.2 Nombre, rol, valor** | A | \`<button role="switch">\` + \`aria-checked="true/false"\` + \`aria-disabled\` |

#### Diferencia con checkbox
| | pds-toggle | pds-checkbox |
|---|---|---|
| Semántica | \`role="switch"\` | \`role="checkbox"\` |
| Comportamiento | Efecto inmediato | Valor enviado con el formulario |
| Uso | Configuración en tiempo real | Opción de formulario |

#### Navegación por teclado
| Tecla | Acción |
|-------|--------|
| **Tab** | Mueve el foco al toggle |
| **Space** | Activa / desactiva el toggle |
| **Enter** | Activa / desactiva el toggle |

#### Atributos ARIA
| Atributo | Valor | Cuándo |
|----------|-------|--------|
| \`role="switch"\` | en el botón | Siempre — indica que el botón tiene dos estados |
| \`aria-checked="true"\` | en el botón | Cuando está activado |
| \`aria-checked="false"\` | en el botón | Cuando está desactivado |
| \`aria-disabled="true"\` | en el botón | Cuando \`disabled=true\` |

#### Anuncio en lectores de pantalla
- Activado: *"Activar notificaciones push, interruptor, activado"*
- Desactivado: *"Activar notificaciones push, interruptor, desactivado"*
- Deshabilitado: *"Activar notificaciones push, interruptor, desactivado, no disponible"*

#### Auditoría v1 → v2
| Hallazgo v1 (Cortés, feb 2026) | Criterio WCAG | Resolución en v2 |
|--------------------------------|---------------|------------------|
| Hover y disabled con contraste 2.48:1 | 1.4.11 | Tokens semánticos con contraste ≥ 3:1 |
| Estado on/off solo diferenciado por color del track | 1.4.1 | Posición del thumb + cambio de color de track + etiqueta textual |
| Área táctil < 44px | 2.5.8 | Botón con altura mínima 48px y padding |
| Sin \`role="switch"\` ni \`aria-checked\` | 4.1.2 | \`<button role="switch" [attr.aria-checked]="checked">\` |

### Buenas prácticas
✅ El label debe describir la función que se activa: *"Recibir notificaciones push"*, no *"Notificaciones"*.
✅ El cambio de estado debe ser inmediato — si requiere guardado, usa un botón Guardar separado.
✅ Usa \`labelPosition="left"\` cuando el toggle está al final de una fila con descripción a la izquierda.
❌ No uses el toggle para preguntas de sí/no que forman parte de un formulario — usa \`pds-checkbox\`.
❌ No uses \`disabled\` sin comunicar al usuario por qué el toggle no está disponible.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<PdsToggleComponent>;

// ── Sandbox ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default — Sandbox',
  args: {
    label: 'Activar notificaciones push',
    checked: false,
    disabled: false,
    labelPosition: 'right',
  },
};

// ── Estados ───────────────────────────────────────────────────────────────────

export const AllStates: Story = {
  name: 'Todos los estados',
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:16px">
        <pds-toggle label="Desactivado (default)" [checked]="false" />
        <pds-toggle label="Activado" [checked]="true" />
        <pds-toggle label="Deshabilitado — desactivado" [checked]="false" [disabled]="true" />
        <pds-toggle label="Deshabilitado — activado" [checked]="true" [disabled]="true" />
      </div>
    `,
  }),
};

// ── Posición del label ────────────────────────────────────────────────────────

export const LabelPositions: Story = {
  name: 'Posición del label',
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:16px">
        <pds-toggle label="Label a la derecha (default)" [checked]="false" labelPosition="right" />
        <pds-toggle label="Label a la izquierda" [checked]="true" labelPosition="left" />
      </div>
    `,
  }),
};

// ── En contexto de configuración ─────────────────────────────────────────────

export const InSettingsContext: Story = {
  name: 'En contexto de configuración',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Ejemplo de toggles en un panel de configuración. Cada toggle tiene efecto inmediato y label descriptivo.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="max-width:400px;font-family:Poppins;border:1px solid #E0E8EE;border-radius:8px;overflow:hidden">
        <div style="padding:16px 20px;background:#F5F7FA;border-bottom:1px solid #E0E8EE">
          <h3 style="margin:0;font-size:16px;font-weight:600;color:#0F385A">Notificaciones</h3>
        </div>
        <div style="padding:8px 0">
          <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 20px">
            <span style="font-size:14px;color:#2C3E50">Correo electrónico</span>
            <pds-toggle label="Correo electrónico" [checked]="true" [showName]="false" labelPosition="left" />
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 20px;border-top:1px solid #F5F7FA">
            <span style="font-size:14px;color:#2C3E50">Notificaciones push</span>
            <pds-toggle label="Notificaciones push" [checked]="false" labelPosition="left" />
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 20px;border-top:1px solid #F5F7FA">
            <span style="font-size:14px;color:#2C3E50">SMS</span>
            <pds-toggle label="SMS" [checked]="false" [disabled]="true" labelPosition="left" />
          </div>
        </div>
      </div>
    `,
  }),
};

// ── Con Reactive Forms ────────────────────────────────────────────────────────

export const WithFormControl: Story = {
  name: 'Con FormControl (Reactive Forms)',
  render: () => ({
    moduleMetadata: { imports: [ReactiveFormsModule] },
    props: {
      ctrl: new FormControl(false),
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;font-family:Poppins">
        <pds-toggle label="Modo oscuro" [formControl]="ctrl" />
        <p style="font-size:13px;color:#50606E;margin:0">
          Valor: <strong>{{ ctrl.value ? 'activado' : 'desactivado' }}</strong>
        </p>
      </div>
    `,
  }),
};

// ── Accesibilidad ─────────────────────────────────────────────────────────────

export const A11yRoleSwitch: Story = {
  name: 'A11y — role="switch" + aria-checked (inspeccionar)',
  parameters: {
    docs: {
      description: {
        story: `
Abre el inspector de accesibilidad y verifica:
- El elemento es un \`<button>\` con \`role="switch"\`.
- \`aria-checked="true"\` cuando está activado; \`"false"\` cuando está desactivado.
- Los lectores de pantalla anuncian: *"[label], interruptor, [activado/desactivado]"*.

Usa **Space** o **Enter** para cambiar el estado y verificar el cambio en \`aria-checked\`.
      `,
      },
    },
  },
  render: () => ({
    props: { on: false },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px">
        <pds-toggle
          label="Recibir alertas de seguridad"
          [checked]="on"
          (checkedChange)="on = $event"
        />
        <p style="font-family:Poppins;font-size:13px;color:#50606E">
          aria-checked: <strong>"{{ on }}"</strong>
        </p>
      </div>
    `,
  }),
};
