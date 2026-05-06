import { Meta, StoryObj } from '@storybook/angular';
import { PdsBadgeComponent } from './pds-badge.component';

const meta: Meta<PdsBadgeComponent & { label: string }> = {
  title: 'Poli Design System / 07. Content / Badge',
  component: PdsBadgeComponent,
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['brand', 'brand-subtle', 'brand-secondary', 'neutral', 'success', 'warning', 'error'],
      description: 'Estado semántico — controla color de fondo y texto',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tamaño del badge',
    },
    shape: {
      control: 'select',
      options: ['pill', 'rectangle'],
      description: 'Forma del borde',
    },
    iconStart: { control: 'text', description: 'Ícono al inicio (nombre Material Symbols). Decorativo.' },
    iconEnd: { control: 'text', description: 'Ícono al final (nombre Material Symbols). Decorativo.' },
    label: { control: 'text', description: 'Texto visible del badge (proyectado vía ng-content)' },
  },
  parameters: {
    docs: {
      description: {
        component: `
Indicador visual compacto para comunicar **estados, categorías o información cuantitativa**.
No es interactivo — para etiquetas filtrables o seleccionables usar \`pds-tag\`.

### Cuándo usarlo
- Para mostrar el estado de un elemento (activo, pendiente, error) en listados y tarjetas.
- Para categorías o etiquetas de clasificación no interactivas.
- Para contadores de notificaciones o métricas compactas.

### Cuándo NO usarlo
- No usar como control de filtro interactivo — usar \`pds-tag\`.
- No usar el color como único diferenciador de estado — siempre combinar con texto descriptivo.
- No usar para acciones — usar \`pds-button\`.

### API
\`\`\`html
<pds-badge
  status="success"
  size="md"
  shape="pill"
  iconStart="check_circle"
>
  Activo
</pds-badge>
\`\`\`

| Input        | Tipo                                                              | Default      | Descripción |
|--------------|-------------------------------------------------------------------|--------------|-------------|
| \`status\`   | \`'brand'\\|'brand-subtle'\\|'brand-secondary'\\|'neutral'\\|'success'\\|'warning'\\|'error'\` | \`'neutral'\` | Estado semántico |
| \`size\`     | \`'sm'\\|'md'\\|'lg'\`                                           | \`'md'\`     | Tamaño del badge |
| \`shape\`    | \`'pill'\\|'rectangle'\`                                         | \`'pill'\`   | Forma del borde |
| \`iconStart\` | \`string \\| null\`                                             | \`null\`     | Ícono al inicio (Material Symbols) |
| \`iconEnd\`   | \`string \\| null\`                                             | \`null\`     | Ícono al final (Material Symbols) |

---

### Accesibilidad — WCAG 2.2

#### Criterios aplicables
| Criterio | Nivel | Aplicación |
|----------|-------|------------|
| **1.4.1 Uso del color** | A | El estado no puede depender solo del color — el texto dentro del badge es obligatorio |
| **1.4.3 Contraste mínimo** | AA | Texto del badge ≥ 4.5:1 sobre su fondo semántico |
| **1.4.11 Contraste no textual** | AA | Íconos decorativos internos ≥ 3:1 |
| **4.1.2 Nombre, rol, valor** | A | Cambios dinámicos de estado deben anunciarse si el contexto lo requiere |

#### Navegación por teclado
El badge es un elemento **no interactivo** — no recibe foco y no forma parte del orden de tabulación.

#### Atributos ARIA
| Atributo | Valor | Cuándo |
|----------|-------|--------|
| \`role="status"\` | automático | Siempre — comunica cambios dinámicos a tecnologías de asistencia (AT) |
| \`aria-hidden="true"\` | en los íconos | Los íconos dentro del badge son siempre decorativos |

#### Anuncio en lectores de pantalla
Con \`role="status"\`, NVDA/VoiceOver anuncian el texto del badge cuando su contenido cambia dinámicamente.
El ícono no se anuncia (aria-hidden en \`pds-icon\` interno).

> **Importante para dev:** Si el badge refleja un estado que puede cambiar en tiempo real (p. ej. "Procesando" → "Activo"), el \`role="status"\` garantiza el anuncio sin interrumpir la navegación del usuario.

#### Auditoría v1 → v2
Este componente es nuevo en v2 y fue diseñado desde el inicio conforme a WCAG 2.2 AA.
La adición de \`role="status"\` y la combinación obligatoria de color + texto resuelve la dependencia cromática identificada como riesgo transversal en la auditoría v1 (Cortés, feb 2026, §2.1).

### Buenas prácticas
✅ Incluye siempre texto dentro del badge — el color nunca es el único diferenciador de estado.
✅ Usa el \`status\` semántico correcto para que el color sea coherente con el significado (error = rojo, success = verde).
✅ Aprovecha \`iconStart\` para reforzar el estado con un ícono reconocible (p. ej. \`check_circle\` para success).
❌ No uses el badge como control interactivo (clic, selección) — usa \`pds-tag\`.
❌ No uses variantes de color para diferencias que el texto también debe expresar.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<PdsBadgeComponent & { label: string }>;

// ── Sandbox ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default — Sandbox',
  args: { status: 'brand', size: 'md', shape: 'pill', label: 'Nuevo', iconStart: '', iconEnd: '' },
  render: (args) => ({
    props: args,
    template: `<pds-badge [status]="status" [size]="size" [shape]="shape" [iconStart]="iconStart || null" [iconEnd]="iconEnd || null">{{ label }}</pds-badge>`,
  }),
};

// ── Todos los estados ─────────────────────────────────────────────────────────

export const AllStatuses: Story = {
  name: 'Todos los estados',
  render: () => ({
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center">
        <pds-badge status="brand">Brand</pds-badge>
        <pds-badge status="brand-subtle">Brand Subtle</pds-badge>
        <pds-badge status="brand-secondary">Brand Secondary</pds-badge>
        <pds-badge status="neutral">Neutral</pds-badge>
        <pds-badge status="success">Activo</pds-badge>
        <pds-badge status="warning">Pendiente</pds-badge>
        <pds-badge status="error">Error</pds-badge>
      </div>
    `,
  }),
};

// ── Todos los tamaños ─────────────────────────────────────────────────────────

export const AllSizes: Story = {
  name: 'Todos los tamaños',
  render: () => ({
    template: `
      <div style="display:flex;gap:8px;align-items:center">
        <pds-badge status="brand" size="sm">SM</pds-badge>
        <pds-badge status="brand" size="md">MD</pds-badge>
        <pds-badge status="brand" size="lg">LG</pds-badge>
      </div>
    `,
  }),
};

// ── Pill vs Rectangle ─────────────────────────────────────────────────────────

export const Shapes: Story = {
  name: 'Pill vs Rectangle',
  render: () => ({
    template: `
      <div style="display:flex;gap:8px;align-items:center">
        <pds-badge status="success" shape="pill">Pill</pds-badge>
        <pds-badge status="success" shape="rectangle">Rectangle</pds-badge>
      </div>
    `,
  }),
};

// ── Con íconos ────────────────────────────────────────────────────────────────

export const WithIcon: Story = {
  name: 'Con ícono',
  render: () => ({
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center">
        <pds-badge status="brand" iconStart="star">Destacado</pds-badge>
        <pds-badge status="success" iconStart="check_circle">Completado</pds-badge>
        <pds-badge status="warning" iconStart="schedule">Pendiente</pds-badge>
        <pds-badge status="error" iconStart="error">Error</pds-badge>
        <pds-badge status="neutral" iconEnd="arrow_forward">Ver más</pds-badge>
      </div>
    `,
  }),
};

// ── Accesibilidad ─────────────────────────────────────────────────────────────

export const A11yColorPlusText: Story = {
  name: 'A11y — Color + texto (WCAG 1.4.1)',
  parameters: {
    docs: {
      description: {
        story: `
**WCAG 1.4.1 — Uso del color**: el estado nunca depende solo del color.
El texto dentro del badge es siempre obligatorio para que usuarios con daltonismo o baja visión puedan comprender el estado.
        `,
      },
    },
  },
  render: () => ({
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center">
        <pds-badge status="success" iconStart="check_circle">Activo</pds-badge>
        <pds-badge status="warning" iconStart="schedule">Pendiente</pds-badge>
        <pds-badge status="error" iconStart="cancel">Inactivo</pds-badge>
        <pds-badge status="neutral">Sin estado</pds-badge>
      </div>
    `,
  }),
};
