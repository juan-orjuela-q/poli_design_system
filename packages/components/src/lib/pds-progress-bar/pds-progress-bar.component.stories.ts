import { Meta, StoryObj } from '@storybook/angular';
import { PdsProgressBarComponent } from './pds-progress-bar.component';

const meta: Meta<PdsProgressBarComponent> = {
  title: 'Poli Design System / 06. Feedback & Overlays / Progress Bar',
  component: PdsProgressBarComponent,
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 }, description: 'Valor actual del progreso (0–100)' },
    status: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'error'],
      description: 'Estado semántico — controla el color de la barra',
    },
    label: { control: 'text', description: 'Texto de ayuda que se muestra debajo con ícono de estado' },
    showValue: { control: 'boolean', description: 'Muestra el porcentaje como texto junto a la barra' },
  },
  parameters: {
    docs: {
      description: {
        component: `
Indicador de progreso **determinado** (porcentaje conocido) para operaciones de carga, instalación,
completitud de perfil, etc. Disponible en 4 estados semánticos con label opcional.

### Cuándo usarlo
- Cuando el porcentaje de progreso es conocido y puede mostrarse numéricamente.
- Para completitud de perfil, progreso de un curso, carga de archivos con porcentaje.
- Para indicar el estado de un proceso multi-paso (junto a \`pds-stepper\`).

### Cuándo NO usarlo
- Para operaciones cuya duración es desconocida — usar \`pds-loading-circle\`.
- No usar sin un label contextual cuando el porcentaje por sí solo no da suficiente información.

### API
\`\`\`html
<pds-progress-bar
  [value]="65"
  status="primary"
  label="Cargando módulo…"
  [showValue]="true"
/>
\`\`\`

| Input        | Tipo                                           | Default       | Descripción |
|--------------|------------------------------------------------|---------------|-------------|
| \`value\`    | \`number\` (requerido)                         | —             | Valor 0–100 (se clamea automáticamente) |
| \`status\`   | \`'primary'\\|'success'\\|'warning'\\|'error'\` | \`'primary'\` | Estado semántico |
| \`label\`    | \`string \\| null\`                            | \`null\`      | Texto de ayuda debajo de la barra |
| \`showValue\` | \`boolean\`                                   | \`false\`     | Muestra el porcentaje como texto |

---

### Accesibilidad — WCAG 2.2

#### Criterios aplicables
| Criterio | Nivel | Aplicación |
|----------|-------|------------|
| **1.4.1 Uso del color** | A | El estado no se comunica solo con color — el label y el porcentaje lo refuerzan |
| **1.4.3 Contraste mínimo** | AA | Texto del label ≥ 4.5:1 sobre fondo |
| **1.4.11 Contraste no textual** | AA | La barra de progreso ≥ 3:1 sobre el track de fondo |
| **4.1.2 Nombre, rol, valor** | A | \`role="progressbar"\` con \`aria-valuenow\`, \`aria-valuemin\`, \`aria-valuemax\` y \`aria-label\` |
| **4.1.3 Mensajes de estado** | AA | Cambios de progreso se comunican a AT sin necesitar foco |

#### Navegación por teclado
La barra de progreso no es interactiva — no recibe foco.
Es un elemento de **solo lectura** que comunica el estado actual de un proceso.

#### Atributos ARIA generados
| Atributo | Valor | Función |
|----------|-------|---------|
| \`role="progressbar"\` | automático | Identifica el elemento como indicador de progreso |
| \`aria-valuenow\` | valor actual (0–100) | Valor actual para AT |
| \`aria-valuemin="0"\` | automático | Valor mínimo |
| \`aria-valuemax="100"\` | automático | Valor máximo |
| \`aria-label\` | texto descriptivo | Contexto del progreso para AT |

#### Anuncio en lectores de pantalla
Con \`role="progressbar"\`, los lectores de pantalla anuncian el valor cuando el usuario navega hasta el elemento:
*"[aria-label]: 65 por ciento"*.

Para actualizaciones dinámicas (progreso que avanza en tiempo real), considera agregar \`aria-live="polite"\`
en el contenedor padre para que los cambios se anuncien periódicamente.

#### Auditoría v1 → v2
| Hallazgo v1 (Cortés, feb 2026) | Criterio WCAG | Resolución en v2 |
|--------------------------------|---------------|------------------|
| Sin anuncio dinámico del progreso | 4.1.3 | \`role="progressbar"\` con \`aria-valuenow/min/max\` + \`aria-label\` |
| Dependencia del color para comunicar el estado | 1.4.1 | El \`label\` + el porcentaje visible complementan el color |

### Buenas prácticas
✅ Siempre acompaña la barra con un \`label\` descriptivo del contexto (*"Completitud del perfil"*, no solo el porcentaje).
✅ Usa \`showValue=true\` cuando el porcentaje exacto es relevante para el usuario.
✅ Actualiza el \`value\` con lógica real — no uses valores estáticos en producción.
❌ No uses la barra de progreso para operaciones indeterminadas — usa \`pds-loading-circle\`.
❌ No dependas solo del color para indicar el estado (error vs success) — el label los diferencia.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<PdsProgressBarComponent>;

// ── Sandbox ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default — Sandbox',
  args: { value: 65, status: 'primary', label: null, showValue: false },
};

// ── Todos los estados ─────────────────────────────────────────────────────────

export const AllStatuses: Story = {
  name: 'Todos los estados',
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:20px;max-width:480px">
        <pds-progress-bar [value]="75" status="primary" label="Cargando módulo" [showValue]="true" />
        <pds-progress-bar [value]="100" status="success" label="Descarga completada" [showValue]="true" />
        <pds-progress-bar [value]="45" status="warning" label="Espacio en disco bajo" [showValue]="true" />
        <pds-progress-bar [value]="20" status="error" label="Conexión inestable" [showValue]="true" />
      </div>
    `,
  }),
};

// ── Con label y sin label ─────────────────────────────────────────────────────

export const WithAndWithoutLabel: Story = {
  name: 'Con y sin label',
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:20px;max-width:480px">
        <pds-progress-bar [value]="60" status="primary" [showValue]="true" />
        <pds-progress-bar [value]="60" status="primary" label="Con label de contexto" [showValue]="true" />
      </div>
    `,
  }),
};

// ── Progreso animado ──────────────────────────────────────────────────────────

export const Animated: Story = {
  name: 'Progreso dinámico',
  parameters: {
    docs: {
      description: {
        story: 'Simula un progreso que avanza automáticamente. En producción, actualizar \`value\` desde la lógica del proceso real.',
      },
    },
  },
  render: () => ({
    props: {
      progress: 0,
      ngOnInit() {
        const interval = setInterval(() => {
          this['progress'] = Math.min(100, this['progress'] + 5);
          if (this['progress'] >= 100) clearInterval(interval);
        }, 300);
      },
    },
    template: `
      <div style="max-width:480px">
        <pds-progress-bar [value]="progress" status="primary" label="Instalando módulo…" [showValue]="true" />
      </div>
    `,
  }),
};

// ── Accesibilidad ─────────────────────────────────────────────────────────────

export const A11yRoleProgressbar: Story = {
  name: 'A11y — role="progressbar" (Tab para verificar)',
  parameters: {
    docs: {
      description: {
        story: `
Verifica en la pestaña **Accessibility** que el elemento tenga \`role="progressbar"\` con
\`aria-valuenow\`, \`aria-valuemin\` y \`aria-valuemax\` correctos.
NVDA/VoiceOver anuncian: *"Completitud del perfil: 65 por ciento, barra de progreso"*.
        `,
      },
    },
  },
  args: {
    value: 65,
    status: 'primary',
    label: 'Completitud del perfil de usuario',
    showValue: true,
  },
};
