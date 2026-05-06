import { Meta, StoryObj } from '@storybook/angular';
import { PdsLoadingCircleComponent } from './pds-loading-circle.component';

const meta: Meta<PdsLoadingCircleComponent> = {
  title: 'Poli Design System / 06. Feedback & Overlays / Loading Indicator',
  component: PdsLoadingCircleComponent,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tamaño del spinner',
    },
    ariaLabel: { control: 'text', description: 'Texto accesible para AT (obligatorio). Visible si no hay label.' },
    label: { control: 'text', description: 'Etiqueta visible junto al spinner. Si se omite, no se muestra texto.' },
  },
  parameters: {
    docs: {
      description: {
        component: `
Indicador de carga animado (**spinner circular**) para estados de procesamiento o espera.
Disponible en 3 tamaños y con soporte completo de etiqueta visible y texto accesible para AT.

### Cuándo usarlo
- Mientras una operación asíncrona está en curso (carga de datos, envío de formulario, navegación).
- Como reemplazo de contenido mientras se carga (skeleton o inline).
- Dentro de botones o controles para indicar que se está procesando la acción.

### Cuándo NO usarlo
- No usar para progreso determinado (con porcentaje conocido) — usar \`pds-progress-bar\`.
- No mostrar junto a texto que ya describe el estado ("Guardando…") sin ocultar el spinner para AT — evita duplicación de anuncios.

### API
\`\`\`html
<!-- Spinner mínimo -->
<pds-loading-circle ariaLabel="Cargando datos" />

<!-- Con etiqueta visible -->
<pds-loading-circle
  size="md"
  ariaLabel="Enviando formulario"
  label="Enviando…"
/>
\`\`\`

| Input        | Tipo                    | Default         | Descripción |
|--------------|-------------------------|-----------------|-------------|
| \`size\`     | \`'sm'\\|'md'\\|'lg'\`  | \`'md'\`        | sm=24px · md=40px · lg=56px |
| \`ariaLabel\` | \`string\`             | \`'Cargando'\`  | Texto para AT (siempre requerido) |
| \`label\`    | \`string\`              | \`''\`          | Etiqueta visible — si se omite, no muestra texto |

---

### Accesibilidad — WCAG 2.2

#### Criterios aplicables
| Criterio | Nivel | Aplicación |
|----------|-------|------------|
| **1.4.3 Contraste mínimo** | AA | El spinner debe contrastar ≥ 3:1 con el fondo (criterio de componente UI) |
| **1.3.3 Características sensoriales** | A | La carga no se comunica solo por el movimiento visual — se acompaña de texto accesible |
| **2.2.2 Pausar, detener, ocultar** | A | Animaciones de más de 5s deben poder pausarse — considerar \`prefers-reduced-motion\` |
| **4.1.3 Mensajes de estado** | AA | El estado de carga se comunica a AT sin necesitar foco |

#### Navegación por teclado
El spinner no es interactivo — no recibe foco.
La gestión del foco durante la carga es responsabilidad del padre
(p. ej. mover el foco al contenido nuevo una vez que cargue).

#### Atributos ARIA generados
| Atributo | Valor | Función |
|----------|-------|---------|
| \`role="status"\` | automático | Implica \`aria-live="polite"\` — anuncia la carga sin interrumpir |
| Texto en \`<span class="sr-only">\` | valor de \`ariaLabel\` | El texto accesible está dentro del contenedor, no en \`aria-label\` del wrapper |

> **Nota técnica:** \`role="status"\` implica \`aria-live="polite"\` — no duplicar ambos atributos.
> El texto accesible va en \`<span class="sr-only">\` dentro del spinner, no en \`aria-label\` del elemento vacío.

#### Anuncio en lectores de pantalla
- Cuando el spinner aparece en el DOM: NVDA/VoiceOver anuncian *"[ariaLabel]"* (p. ej. *"Cargando"*) de forma no intrusiva.
- Cuando el spinner desaparece: el padre debe anunciar el resultado (p. ej. con \`aria-live\` en el área de contenido).

#### Soporte de movimiento reducido
El spinner respeta \`prefers-reduced-motion: reduce\` — la animación se detiene para usuarios que tienen activada esta preferencia en su sistema operativo.

#### Auditoría v1 → v2
Este componente es nuevo en v2 y fue diseñado desde el inicio conforme a WCAG 2.2 AA.
La implementación con \`role="status"\` y texto en \`<span class="sr-only">\` resuelve el patrón incorrecto de v1 que usaba \`aria-label\` en el contenedor vacío del spinner.

### Buenas prácticas
✅ Siempre pasa \`ariaLabel\` con una descripción del contexto: *"Cargando datos del usuario"* en lugar del genérico *"Cargando"*.
✅ Cuando el spinner reemplaza un botón, deshabilita el botón y muestra el spinner con \`label\`.
✅ Cuando la carga termina, anuncia el resultado usando \`aria-live\` en el área de contenido actualizada.
❌ No uses animaciones CSS infinitas sin respetar \`prefers-reduced-motion\` — puede causar nauseas o crisis epilépticas.
❌ No muestres el spinner sin comunicar a AT que hay una operación en curso — viola WCAG 4.1.3.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<PdsLoadingCircleComponent>;

// ── Sandbox ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default — Sandbox',
  args: { size: 'md', ariaLabel: 'Cargando', label: '' },
};

// ── Tamaños ───────────────────────────────────────────────────────────────────

export const AllSizes: Story = {
  name: 'Todos los tamaños',
  render: () => ({
    template: `
      <div style="display:flex;gap:32px;align-items:center">
        <div style="text-align:center">
          <pds-loading-circle size="sm" ariaLabel="Cargando" />
          <p style="font-size:11px;margin:8px 0 0;color:#687C8E;font-family:Poppins">sm · 24px</p>
        </div>
        <div style="text-align:center">
          <pds-loading-circle size="md" ariaLabel="Cargando" />
          <p style="font-size:11px;margin:8px 0 0;color:#687C8E;font-family:Poppins">md · 40px</p>
        </div>
        <div style="text-align:center">
          <pds-loading-circle size="lg" ariaLabel="Cargando" />
          <p style="font-size:11px;margin:8px 0 0;color:#687C8E;font-family:Poppins">lg · 56px</p>
        </div>
      </div>
    `,
  }),
};

// ── Con etiqueta ──────────────────────────────────────────────────────────────

export const WithLabel: Story = {
  name: 'Con etiqueta visible',
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:16px">
        <pds-loading-circle size="sm" ariaLabel="Guardando cambios" label="Guardando…" />
        <pds-loading-circle size="md" ariaLabel="Cargando datos" label="Cargando datos…" />
        <pds-loading-circle size="lg" ariaLabel="Procesando solicitud" label="Procesando solicitud…" />
      </div>
    `,
  }),
};

// ── Dentro de botón ───────────────────────────────────────────────────────────

export const InlineInButton: Story = {
  name: 'Inline en botón — estado de carga',
  parameters: {
    docs: {
      description: {
        story: `
Patrón de botón en estado de carga. El botón se deshabilita y el spinner reemplaza el ícono.
El \`ariaLabel\` del spinner describe la operación en curso para AT.
        `,
      },
    },
  },
  render: () => ({
    template: `
      <div style="display:flex;gap:12px;align-items:center">
        <button
          style="display:inline-flex;align-items:center;gap:8px;padding:8px 20px;border-radius:50px;background:var(--action-primary-bg,#0F385A);color:#fff;border:none;cursor:not-allowed;opacity:0.8;font-family:Poppins;font-size:14px"
          disabled
          aria-disabled="true"
        >
          <pds-loading-circle size="sm" ariaLabel="Guardando cambios" />
          Guardando…
        </button>
        <span style="font-family:'Open Sans';font-size:13px;color:#687C8E">(botón deshabilitado durante carga)</span>
      </div>
    `,
  }),
};

// ── Accesibilidad ─────────────────────────────────────────────────────────────

export const A11yRoleStatus: Story = {
  name: 'A11y — role="status" y aria-live',
  parameters: {
    docs: {
      description: {
        story: `
El componente usa \`role="status"\` (equivale a \`aria-live="polite"\`).
Cuando el spinner aparece en el DOM, NVDA/VoiceOver anuncian el \`ariaLabel\` sin interrumpir la lectura actual.

Verifica en la pestaña **Accessibility** del addon que no haya violaciones.
        `,
      },
    },
  },
  args: { size: 'md', ariaLabel: 'Cargando contenido del módulo', label: 'Cargando contenido del módulo…' },
};

export const A11yReducedMotion: Story = {
  name: 'A11y — prefers-reduced-motion',
  parameters: {
    docs: {
      description: {
        story: `
Activa la preferencia de movimiento reducido en tu sistema operativo para verificar que
la animación del spinner se detiene. El componente respeta \`@media (prefers-reduced-motion: reduce)\`.
        `,
      },
    },
  },
  args: { size: 'md', ariaLabel: 'Cargando', label: 'Cargando (sin animación con reduced-motion)' },
};
