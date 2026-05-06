import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { PdsStatCardComponent } from './pds-stat-card.component';

const meta: Meta<PdsStatCardComponent> = {
  title: 'Poli Design System / 07. Data Display / Stat Card',
  component: PdsStatCardComponent,
  tags: ['autodocs'],
  argTypes: {
    behavior: {
      control: 'select',
      options: ['info', 'nav', 'selectable'],
      description: 'Modo: informativo, navegación o seleccionable',
    },
    iconName: { control: 'text', description: 'Ícono Material Symbols (requerido)' },
    label: { control: 'text', description: 'Etiqueta descriptiva de la métrica (requerido)' },
    value: { control: 'text', description: 'Valor principal de la métrica (requerido)' },
    trendValue: { control: 'text', description: 'Valor de tendencia (ej. "+12.5%")' },
    trendLabel: { control: 'text', description: 'Texto de contexto de la tendencia' },
    badgeStatus: {
      control: 'select',
      options: ['brand', 'brand-subtle', 'brand-secondary', 'neutral', 'success', 'warning', 'error'],
      description: 'Estado del badge indicador',
    },
    badgeIcon: { control: 'text', description: 'Ícono del badge (Material Symbols)' },
    selected: { control: 'boolean', description: 'Estado seleccionado (solo behavior=selectable)' },
    disabled: { control: 'boolean', description: 'Deshabilita interacción' },
  },
  parameters: {
    docs: {
      description: {
        component: `
Tarjeta de métrica del DS v2. Presenta un valor numérico clave con ícono, badge de estado y tendencia opcional.
Disponible en tres modos: **info** (solo muestra datos), **nav** (navega al hacer clic) y **selectable** (con \`aria-pressed\`).

### Cuándo usarlo
- En dashboards de gestión para mostrar KPIs o métricas de alto nivel (usuarios activos, ingresos, solicitudes pendientes).
- Como punto de entrada a una sección con más detalle (modo \`nav\`).
- Para seleccionar una métrica como filtro de un gráfico o tabla (modo \`selectable\`).

### Cuándo NO usarlo
- No usar para texto explicativo largo — usar \`pds-card\`.
- No usar en contextos donde la imagen o descripción son importantes — usar \`pds-card\`.

### API
\`\`\`html
<pds-stat-card
  iconName="person"
  label="Estudiantes activos"
  value="12.480"
  trendValue="+8.2%"
  trendLabel="vs semestre anterior"
  badgeStatus="success"
  badgeIcon="trending_up"
  (cardClick)="viewStudents()"
/>
\`\`\`

| Input         | Tipo                | Default      | Descripción |
|---------------|---------------------|--------------|-------------|
| \`behavior\`    | \`'info'\\|'nav'\\|'selectable'\` | \`'info'\` | Modo de comportamiento |
| \`iconName\`    | \`string\` (requerido) | — | Ícono de la métrica (Material Symbols) |
| \`label\`       | \`string\` (requerido) | — | Etiqueta descriptiva |
| \`value\`       | \`string\` (requerido) | — | Valor principal |
| \`trendValue\`  | \`string \\| null\` | \`null\`     | Valor de tendencia |
| \`trendLabel\`  | \`string \\| null\` | \`null\`     | Contexto de la tendencia |
| \`badgeStatus\` | \`BadgeVariant\`    | \`'neutral'\` | Estado del badge |
| \`badgeIcon\`   | \`string \\| null\` | \`null\`     | Ícono del badge |
| \`selected\`    | \`boolean\`         | \`false\`    | Estado seleccionado (selectable) |
| \`disabled\`    | \`boolean\`         | \`false\`    | Deshabilita interacción |

| Output           | Tipo      | Descripción |
|------------------|-----------|-------------|
| \`cardClick\`      | \`void\`  | Emite al hacer clic |
| \`selectedChange\` | \`boolean\` | Emite el nuevo estado (selectable) |

---

### Accesibilidad — WCAG 2.2

#### Criterios aplicables
| Criterio | Nivel | Aplicación |
|----------|-------|------------|
| **1.3.3 Características sensoriales** | A | La tendencia se indica con texto numérico — no solo con color o ícono |
| **1.4.3 Contraste mínimo** | AA | Label y value ≥ 4.5:1; trendValue ≥ 4.5:1 |
| **1.4.11 Contraste no textual** | AA | Ícono y badge ≥ 3:1 sobre el fondo de la card |
| **2.1.1 Teclado** | A | Cards nav y selectable tienen \`tabindex="0"\` y responden a Enter/Space |
| **2.4.7 Foco visible** | AA | Focus ring con token \`--action-primary-focus-ring\` |
| **4.1.2 Nombre, rol, valor** | A | Card nav: \`role="button"\`; Card selectable: \`role="button"\` + \`aria-pressed\` |

#### Navegación por teclado
| Tecla | Acción |
|-------|--------|
| **Tab** | Enfoca el stat card interactivo |
| **Enter / Space** | Activa el card |

#### Anuncio en lectores de pantalla
- Card info: los datos se leen como texto: *"Estudiantes activos — 12.480 — +8.2% vs semestre anterior"*
- Card nav: *"Estudiantes activos — 12.480, botón"*
- Card selectable (no marcado): *"Estudiantes activos — 12.480, botón, no presionado"*

#### Auditoría v1 → v2
| Hallazgo v1 (Cortés, feb 2026) | Criterio WCAG | Resolución en v2 |
|--------------------------------|---------------|------------------|
| Este componente es nuevo en v2 y fue diseñado desde el inicio conforme a WCAG 2.2 AA | — | — |

### Buenas prácticas
✅ Usa \`badgeStatus\` para indicar la salud de la métrica: \`success\` (bien), \`warning\` (atención), \`error\` (crítico).
✅ Incluye \`trendLabel\` para contextualizar la tendencia: *"+12.5% vs semestre anterior"*.
✅ El \`label\` debe describir qué mide la métrica — no el valor en sí: *"Estudiantes activos"*, no *"12.480"*.
❌ No dependas solo del color del badge para comunicar el estado — incluye \`badgeIcon\` o texto de tendencia.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<PdsStatCardComponent>;

// ── Sandbox ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default — Sandbox',
  args: {
    behavior: 'info',
    iconName: 'person',
    label: 'Estudiantes activos',
    value: '12.480',
    trendValue: '+8.2%',
    trendLabel: 'vs semestre anterior',
    badgeStatus: 'success',
    badgeIcon: 'trending_up',
    selected: false,
    disabled: false,
  },
};

// ── Dashboard de métricas ─────────────────────────────────────────────────────

export const DashboardGrid: Story = {
  name: 'Grid de métricas (dashboard)',
  render: () => ({
    template: `
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:16px;max-width:960px">
        <pds-stat-card
          iconName="person"
          label="Estudiantes activos"
          value="12.480"
          trendValue="+8.2%"
          trendLabel="vs semestre anterior"
          badgeStatus="success"
          badgeIcon="trending_up"
        />
        <pds-stat-card
          iconName="school"
          label="Cursos publicados"
          value="3.240"
          trendValue="+5.1%"
          trendLabel="vs semestre anterior"
          badgeStatus="brand"
          badgeIcon="library_books"
        />
        <pds-stat-card
          iconName="payments"
          label="Pagos pendientes"
          value="847"
          trendValue="+12.4%"
          trendLabel="vs semana pasada"
          badgeStatus="warning"
          badgeIcon="warning"
        />
        <pds-stat-card
          iconName="report"
          label="Solicitudes vencidas"
          value="23"
          trendValue="-3.0%"
          trendLabel="vs mes anterior"
          badgeStatus="error"
          badgeIcon="error"
        />
      </div>
    `,
  }),
};

// ── Modo nav ──────────────────────────────────────────────────────────────────

export const NavMode: Story = {
  name: 'Modo navegación (nav)',
  render: () => ({
    template: `
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:16px;max-width:700px">
        <pds-stat-card behavior="nav" iconName="person" label="Estudiantes" value="12.480" badgeStatus="success" />
        <pds-stat-card behavior="nav" iconName="school" label="Cursos" value="3.240" badgeStatus="brand" />
        <pds-stat-card behavior="nav" iconName="assignment" label="Solicitudes" value="156" badgeStatus="warning" />
      </div>
    `,
  }),
};

// ── Modo selectable ───────────────────────────────────────────────────────────

export const SelectableMode: Story = {
  name: 'Modo seleccionable (selectable)',
  parameters: {
    docs: {
      description: {
        story: 'Los stat cards selectable tienen \`aria-pressed\`. Útiles como filtros de un gráfico o tabla subyacente.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:16px;max-width:700px">
        <pds-stat-card behavior="selectable" iconName="person" label="Estudiantes" value="12.480" badgeStatus="success" [selected]="true" />
        <pds-stat-card behavior="selectable" iconName="school" label="Cursos" value="3.240" badgeStatus="brand" />
        <pds-stat-card behavior="selectable" iconName="assignment" label="Solicitudes" value="156" badgeStatus="warning" />
      </div>
    `,
  }),
};

// ── Sin tendencia ─────────────────────────────────────────────────────────────

export const WithoutTrend: Story = {
  name: 'Sin sección de tendencia',
  args: {
    iconName: 'group',
    label: 'Docentes vinculados',
    value: '824',
    badgeStatus: 'neutral',
  },
};

// ── Accesibilidad ─────────────────────────────────────────────────────────────

export const A11yKeyboardNav: Story = {
  name: 'A11y — Teclado en stat cards interactivos (Tab)',
  parameters: {
    docs: {
      description: {
        story: `
Usa **Tab** para navegar entre stat cards interactivos. Presiona **Enter** o **Space** para activarlos.

Card nav: *"Estudiantes activos — 12.480, botón"*
Card selectable no marcado: *"Estudiantes activos — 12.480, botón, no presionado"*
Card selectable marcado: *"Estudiantes activos — 12.480, botón, presionado"*

La tendencia (+8.2% vs semestre anterior) se lee en el contenido del card — no depende del color del badge.
        `,
      },
    },
  },
  render: () => ({
    template: `
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:16px;max-width:500px">
        <pds-stat-card behavior="nav" iconName="person" label="Estudiantes activos" value="12.480" trendValue="+8.2%" trendLabel="vs semestre anterior" badgeStatus="success" badgeIcon="trending_up" />
        <pds-stat-card behavior="selectable" iconName="payments" label="Pagos pendientes" value="847" badgeStatus="warning" badgeIcon="warning" />
      </div>
    `,
  }),
};
