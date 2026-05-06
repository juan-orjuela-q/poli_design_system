import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { PdsCardComponent } from './pds-card.component';

const meta: Meta<PdsCardComponent> = {
  title: 'Poli Design System / 07. Content / Card',
  component: PdsCardComponent,
  tags: ['autodocs'],
  argTypes: {
    behavior: {
      control: 'select',
      options: ['info', 'nav', 'selectable'],
      description: 'Modo de comportamiento: informativo, navegación o seleccionable',
    },
    title: { control: 'text', description: 'Título principal (requerido)' },
    subtitle: { control: 'text', description: 'Subtítulo debajo del título' },
    description: { control: 'text', description: 'Texto descriptivo' },
    iconName: { control: 'text', description: 'Ícono Material Symbols (pill)' },
    imageSrc: { control: 'text', description: 'URL de imagen de cabecera' },
    imageAlt: { control: 'text', description: 'Alt text de la imagen' },
    actionLabel: { control: 'text', description: 'Texto del botón de acción (solo behavior=info)' },
    showAction: { control: 'boolean', description: 'Muestra botón de acción (solo behavior=info)' },
    selected: { control: 'boolean', description: 'Estado seleccionado (solo behavior=selectable)' },
    disabled: { control: 'boolean', description: 'Deshabilita interacción (nav y selectable)' },
  },
  parameters: {
    docs: {
      description: {
        component: `
Tarjeta de contenido del DS v2. Disponible en tres modos de comportamiento:
- **info**: solo informativa, con botón de acción opcional.
- **nav**: navegación — actúa como botón que emite \`cardClick\`.
- **selectable**: seleccionable — actúa como \`role="button"\` con \`aria-pressed\`.

### Cuándo usarlo
- Para mostrar una entidad del sistema con imagen, título y descripción (modo \`info\`).
- Para navegación a una sección específica con affordance visual de clic (modo \`nav\`).
- Para seleccionar una opción dentro de un listado (modo \`selectable\`).

### Cuándo NO usarlo
- No usar \`nav\` para contenido solo informativo — el usuario esperaría navegar al hacer clic.
- No usar \`selectable\` para más de 8 opciones — un \`pds-select-field\` es más eficiente.

### API
\`\`\`html
<!-- Informativa -->
<pds-card
  title="Ingeniería de Sistemas"
  subtitle="Facultad de Ingeniería"
  description="Programa de 10 semestres con énfasis en desarrollo de software."
  iconName="computer"
  showAction="true"
  actionLabel="Ver programa"
  (cardClick)="viewProgram()"
/>

<!-- Seleccionable -->
<pds-card
  behavior="selectable"
  title="Modalidad virtual"
  subtitle="100% en línea"
  iconName="computer"
  [selected]="isSelected"
  (selectedChange)="isSelected = $event"
/>
\`\`\`

| Input          | Tipo                | Default     | Descripción |
|----------------|---------------------|-------------|-------------|
| \`behavior\`     | \`'info'\\|'nav'\\|'selectable'\` | \`'info'\` | Modo de comportamiento |
| \`title\`        | \`string\` (requerido) | — | Título principal |
| \`subtitle\`     | \`string \\| null\` | \`null\`    | Subtítulo |
| \`description\`  | \`string \\| null\` | \`null\`    | Texto descriptivo |
| \`iconName\`     | \`string \\| null\` | \`null\`    | Ícono (Material Symbols) |
| \`imageSrc\`     | \`string \\| null\` | \`null\`    | URL de imagen de cabecera |
| \`imageAlt\`     | \`string\`         | \`''\`      | Alt text de la imagen |
| \`actionLabel\`  | \`string\`         | \`'Acción'\` | Texto del botón (info) |
| \`showAction\`   | \`boolean\`        | \`false\`   | Muestra botón de acción (info) |
| \`selected\`     | \`boolean\`        | \`false\`   | Estado seleccionado (selectable) |
| \`disabled\`     | \`boolean\`        | \`false\`   | Deshabilita interacción |

| Output           | Tipo      | Descripción |
|------------------|-----------|-------------|
| \`cardClick\`      | \`void\`  | Emite al hacer clic (nav) o en el botón de acción (info) |
| \`selectedChange\` | \`boolean\` | Emite el nuevo estado de selección (selectable) |

---

### Accesibilidad — WCAG 2.2

#### Criterios aplicables
| Criterio | Nivel | Aplicación |
|----------|-------|------------|
| **1.3.1 Info y relaciones** | A | Estructura semántica de encabezado + descripción dentro del card |
| **1.4.3 Contraste mínimo** | AA | Título, subtítulo y descripción ≥ 4.5:1 |
| **1.4.11 Contraste no textual** | AA | Borde e ícono del card ≥ 3:1 sobre el fondo de la página |
| **2.1.1 Teclado** | A | Cards interactivos (nav, selectable) tienen \`tabindex="0"\` y responden a Enter/Space |
| **2.4.7 Foco visible** | AA | Focus ring con token \`--action-primary-focus-ring\` en cards interactivos |
| **2.5.8 Tamaño del objetivo** | AA | El área clicable del card es ≥ 44×44px |
| **4.1.2 Nombre, rol, valor** | A | Card nav: \`role="button"\`; Card selectable: \`role="button"\` + \`aria-pressed\`; Card deshabilitado: \`aria-disabled="true"\` |

#### Navegación por teclado
| Tecla | Acción |
|-------|--------|
| **Tab** | Enfoca el card interactivo (nav o selectable) |
| **Enter / Space** | Activa el card (navega o cambia selección) |

#### Atributos ARIA
| Atributo | Dónde | Función |
|----------|-------|---------|
| \`role="button"\` | en cards nav y selectable | Identifica el card como elemento interactivo |
| \`aria-pressed="true/false"\` | en cards selectable | Indica el estado de selección |
| \`aria-disabled="true"\` | en cards deshabilitados | Indica que el card no está disponible |
| \`tabindex="0"\` | en cards interactivos | Hace el card focusable con Tab |

#### Anuncio en lectores de pantalla
- Card info: el título y la descripción se leen como texto estático
- Card nav: *"Ingeniería de Sistemas — Ver programa, botón"*
- Card selectable (no seleccionado): *"Modalidad virtual, botón, no presionado"*
- Card selectable (seleccionado): *"Modalidad virtual, botón, presionado"*

#### Auditoría v1 → v2
| Hallazgo v1 (Cortés, feb 2026) | Criterio WCAG | Resolución en v2 |
|--------------------------------|---------------|------------------|
| Este componente es nuevo en v2 y fue diseñado desde el inicio conforme a WCAG 2.2 AA | — | — |

### Buenas prácticas
✅ Usa \`imageAlt\` descriptivo cuando la imagen aporta contenido: *"Campus Bogotá — vista exterior"*.
✅ En cards selectable, el título debe ser la opción que se está eligiendo: *"Modalidad virtual"*.
✅ Para grupos de cards selectable, envuélvelos en un \`<fieldset>\` con \`<legend>\` en el padre.
❌ No uses el mismo \`behavior\` para casos distintos — cada modo tiene semántica y ARIA diferente.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<PdsCardComponent>;

// ── Sandbox ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default — Sandbox',
  args: {
    behavior: 'info',
    title: 'Ingeniería de Sistemas',
    subtitle: 'Facultad de Ingeniería',
    description: 'Programa de 10 semestres con énfasis en desarrollo de software y arquitectura de sistemas.',
    iconName: 'computer',
    showAction: true,
    actionLabel: 'Ver programa',
    selected: false,
    disabled: false,
  },
};

// ── Modo info ─────────────────────────────────────────────────────────────────

export const InfoMode: Story = {
  name: 'Modo informativo (info)',
  render: () => ({
    template: `
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;max-width:900px">
        <pds-card
          title="Ingeniería de Sistemas"
          subtitle="Facultad de Ingeniería"
          description="Programa de 10 semestres con énfasis en desarrollo de software."
          iconName="computer"
          [showAction]="true"
          actionLabel="Ver detalles"
        />
        <pds-card
          title="Administración de Empresas"
          subtitle="Facultad de Negocios"
          description="Forma líderes empresariales con visión global y ética profesional."
          iconName="business"
          [showAction]="true"
          actionLabel="Ver detalles"
        />
        <pds-card
          title="Psicología"
          subtitle="Facultad de Ciencias Humanas"
          description="Comprende el comportamiento humano y aplica herramientas terapéuticas."
          iconName="psychology"
          [showAction]="true"
          actionLabel="Ver detalles"
        />
      </div>
    `,
  }),
};

// ── Modo nav ──────────────────────────────────────────────────────────────────

export const NavMode: Story = {
  name: 'Modo navegación (nav)',
  parameters: {
    docs: {
      description: {
        story: 'Los cards con \`behavior="nav"\` tienen \`role="button"\` y \`tabindex="0"\` — activables con Tab+Enter.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:16px;max-width:760px">
        <pds-card behavior="nav" title="Mi perfil" subtitle="Edita tu información" iconName="person" />
        <pds-card behavior="nav" title="Mis cursos" subtitle="Accede a tu contenido" iconName="school" />
        <pds-card behavior="nav" title="Calificaciones" subtitle="Consulta tus notas" iconName="grade" />
        <pds-card behavior="nav" title="Pagos" subtitle="Gestiona tu matrícula" iconName="payments" />
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
        story: 'Los cards selectable tienen \`aria-pressed\` que refleja el estado de selección. NVDA/VoiceOver anuncian *"presionado"* o *"no presionado"*.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:16px;max-width:760px">
        <pds-card behavior="selectable" title="Modalidad presencial" subtitle="Clases en campus" iconName="location_on" />
        <pds-card behavior="selectable" title="Modalidad virtual" subtitle="100% en línea" iconName="computer" [selected]="true" />
        <pds-card behavior="selectable" title="Modalidad a distancia" subtitle="Flexible — con material físico" iconName="local_shipping" />
      </div>
    `,
  }),
};

// ── Estado deshabilitado ──────────────────────────────────────────────────────

export const DisabledState: Story = {
  name: 'Estado deshabilitado',
  render: () => ({
    template: `
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:16px;max-width:500px">
        <pds-card behavior="nav" title="Recurso no disponible" subtitle="Fuera de servicio" iconName="block" [disabled]="true" />
        <pds-card behavior="selectable" title="Modalidad no habilitada" subtitle="No disponible este período" iconName="schedule" [disabled]="true" />
      </div>
    `,
  }),
};

// ── Accesibilidad ─────────────────────────────────────────────────────────────

export const A11yKeyboardNav: Story = {
  name: 'A11y — Teclado en cards interactivos (Tab + Enter)',
  parameters: {
    docs: {
      description: {
        story: `
Usa **Tab** para navegar entre cards interactivos. Presiona **Enter** o **Space** para activarlos.

- Card nav: *"Mis cursos — Accede a tu contenido, botón"*
- Card selectable (no marcado): *"Modalidad virtual — 100% en línea, botón, no presionado"*
- Card selectable (marcado): *"Modalidad virtual — 100% en línea, botón, presionado"*
        `,
      },
    },
  },
  render: () => ({
    template: `
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:16px;max-width:560px">
        <pds-card behavior="nav" title="Mis cursos" subtitle="Accede a tu contenido" iconName="school" />
        <pds-card behavior="selectable" title="Modalidad virtual" subtitle="100% en línea" iconName="computer" />
      </div>
    `,
  }),
};
