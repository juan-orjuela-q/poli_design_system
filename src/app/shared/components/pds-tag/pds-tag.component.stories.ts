import { Meta, StoryObj } from '@storybook/angular';
import { PdsTagComponent } from './pds-tag.component';

const meta: Meta<PdsTagComponent & { text: string }> = {
  title: 'Poli Design System / 07. Content / Tags',
  component: PdsTagComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description: 'Variante visual del tag',
    },
    iconStart: { control: 'text', description: 'Ícono al inicio (nombre Material Symbols)' },
    label: { control: 'text', description: 'Texto del tag — también usado en el aria-label del botón eliminar' },
    disabled: { control: 'boolean', description: 'Estado deshabilitado (usa aria-disabled, mantiene el tab order)' },
    removable: { control: 'boolean', description: 'Muestra el botón de eliminar (×)' },
    selected: { control: 'boolean', description: 'Estado seleccionado (aria-pressed en el tag)' },
    text: { control: 'text', description: 'Contenido de texto proyectado vía ng-content' },
  },
  parameters: {
    docs: {
      description: {
        component: `
Etiqueta interactiva para **filtros, categorías y selecciones**. Admite estados seleccionado, deshabilitado y eliminable.
Para indicadores visuales no interactivos usar \`pds-badge\`.

### Cuándo usarlo
- Para filtros de búsqueda activos que el usuario puede activar/desactivar o eliminar.
- Para categorías seleccionables en formularios de multi-selección.
- Para mostrar el valor actual de un campo con opción de borrado.

### Cuándo NO usarlo
- No usar como indicador de estado no interactivo — usar \`pds-badge\`.
- No usar cuando el espacio es limitado y el texto sería demasiado corto — un badge es más compacto.

### API
\`\`\`html
<pds-tag
  variant="primary"
  label="Angular"
  [selected]="true"
  [removable]="true"
  (removed)="onRemove()"
>
  Angular
</pds-tag>
\`\`\`

| Input       | Tipo                                       | Default       | Descripción |
|-------------|--------------------------------------------|---------------|-------------|
| \`variant\` | \`'primary'\\|'secondary'\\|'tertiary'\`   | \`'primary'\` | Variante visual |
| \`label\`   | \`string\`                                 | \`''\`        | Texto del tag — alimenta el aria-label del botón eliminar |
| \`iconStart\` | \`string \\| null\`                      | \`null\`      | Ícono al inicio (Material Symbols) |
| \`selected\` | \`boolean\`                               | \`false\`     | Estado seleccionado (\`aria-pressed\`) |
| \`removable\` | \`boolean\`                              | \`false\`     | Muestra el botón × de eliminación |
| \`disabled\` | \`boolean\`                               | \`false\`     | Deshabilitado vía \`aria-disabled\` |

| Output    | Tipo   | Descripción |
|-----------|--------|-------------|
| \`removed\` | \`void\` | Emitido al hacer clic en el botón × |

---

### Accesibilidad — WCAG 2.2

#### Criterios aplicables
| Criterio | Nivel | Aplicación |
|----------|-------|------------|
| **1.4.1 Uso del color** | A | El estado seleccionado no depende solo del color — \`aria-pressed\` lo comunica a AT |
| **1.4.3 Contraste mínimo** | AA | Texto del tag ≥ 4.5:1 sobre fondo en todos los estados |
| **1.4.11 Contraste no textual** | AA | Borde y ícono del botón × ≥ 3:1 |
| **2.1.1 Teclado** | A | Tag y botón × son operables por teclado (Enter/Space) |
| **2.4.7 Foco visible** | AA | Anillo de foco con doble box-shadow en ambos controles |
| **2.5.8 Tamaño del objetivo** | AA | Touch target de 48×48px vía \`::before\` pseudoelemento |
| **4.1.2 Nombre, rol, valor** | A | \`aria-pressed\` en el tag; \`aria-label="Eliminar [label]"\` en el botón × |

#### Navegación por teclado
| Tecla | Acción |
|-------|--------|
| **Tab** | Mueve el foco al tag (luego al botón × si existe) |
| **Enter / Space** | Alterna el estado seleccionado del tag |
| **Tab** (desde el tag) | Mueve el foco al botón × (si \`removable=true\`) |
| **Enter / Space** (en ×) | Emite el evento \`removed\` |

#### Atributos ARIA
| Atributo | Valores | Cuándo |
|----------|---------|--------|
| \`aria-pressed\` | \`"true"\\|"false"\` | En el elemento tag principal — indica selección |
| \`aria-disabled\` | \`"true"\` | Cuando \`disabled=true\` — mantiene el tab order |
| \`aria-label\` | \`"Eliminar [label]"\` | En el botón × — describe la acción con el contexto del tag |
| \`role="button"\` | automático | En el botón × (implementado como \`<span role="button" tabindex="0">\`) |

#### Anuncio en lectores de pantalla
- Al enfocar el tag: *"[texto del tag], botón, presionado/no presionado"*
- Al enfocar el botón ×: *"Eliminar Angular, botón"*
- Al estar deshabilitado: *"[texto del tag], botón, deshabilitado"*

#### Auditoría v1 → v2
Este componente es nuevo en v2 y fue diseñado desde el inicio conforme a WCAG 2.2 AA.
El diseño resolvió el riesgo de dependencia cromática (auditoría v1, §2.1) mediante \`aria-pressed\` para el estado seleccionado y \`aria-disabled\` en lugar del atributo nativo \`disabled\` (que retira el elemento del tab order, violando WCAG 2.1.1).

### Buenas prácticas
✅ Pasa siempre \`label\` aunque el texto ya esté proyectado vía ng-content — es la base del \`aria-label\` del botón eliminar.
✅ Usa \`aria-disabled\` (el \`disabled\` del componente) en lugar de deshabilitar el elemento padre con \`pointer-events: none\`.
✅ Mantén las acciones de selección y eliminación separadas — clic en el tag = toggle; clic en × = eliminar.
❌ No fusiones la acción de seleccionar y eliminar en el mismo clic — son intenciones distintas del usuario.
❌ No uses el tag como badge estático — si el elemento no es interactivo, usa \`pds-badge\`.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<PdsTagComponent & { text: string }>;

// ── Sandbox ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default — Sandbox',
  args: { variant: 'primary', label: 'Angular', text: 'Angular', disabled: false, removable: false, selected: false, iconStart: '' },
  render: (args) => ({
    props: args,
    template: `
      <pds-tag
        [variant]="variant"
        [label]="label"
        [disabled]="disabled"
        [removable]="removable"
        [selected]="selected"
        [iconStart]="iconStart || null"
      >{{ text }}</pds-tag>
    `,
  }),
};

// ── Variantes ─────────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'Todas las variantes',
  render: () => ({
    template: `
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
        <pds-tag variant="primary" label="Primary">Primary</pds-tag>
        <pds-tag variant="secondary" label="Secondary">Secondary</pds-tag>
        <pds-tag variant="tertiary" label="Tertiary">Tertiary</pds-tag>
      </div>
    `,
  }),
};

// ── Con ícono ─────────────────────────────────────────────────────────────────

export const WithIcon: Story = {
  name: 'Con ícono al inicio',
  render: () => ({
    template: `
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
        <pds-tag variant="primary" label="Angular" iconStart="code">Angular</pds-tag>
        <pds-tag variant="secondary" label="Design" iconStart="palette">Design</pds-tag>
        <pds-tag variant="tertiary" label="Accesibilidad" iconStart="accessibility">Accesibilidad</pds-tag>
      </div>
    `,
  }),
};

// ── Removable ─────────────────────────────────────────────────────────────────

export const Removable: Story = {
  name: 'Removable — Con botón ×',
  render: () => ({
    props: { onRemoved: (tag: string) => console.log('[pds-tag] removed:', tag) },
    template: `
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
        <pds-tag variant="primary" label="Angular" [removable]="true" (removed)="onRemoved('Angular')">Angular</pds-tag>
        <pds-tag variant="secondary" label="React" [removable]="true" (removed)="onRemoved('React')">React</pds-tag>
        <pds-tag variant="tertiary" label="Vue" [removable]="true" (removed)="onRemoved('Vue')">Vue</pds-tag>
      </div>
    `,
  }),
};

// ── Seleccionado ──────────────────────────────────────────────────────────────

export const Selected: Story = {
  name: 'Estado seleccionado',
  render: () => ({
    template: `
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
        <pds-tag variant="primary" label="Seleccionado" [selected]="true">Seleccionado</pds-tag>
        <pds-tag variant="primary" label="No seleccionado" [selected]="false">No seleccionado</pds-tag>
        <pds-tag variant="secondary" label="Seleccionado" [selected]="true">Seleccionado</pds-tag>
      </div>
    `,
  }),
};

// ── Deshabilitado ─────────────────────────────────────────────────────────────

export const DisabledState: Story = {
  name: 'Estado deshabilitado',
  render: () => ({
    template: `
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
        <pds-tag variant="primary" label="Primary" [disabled]="true">Primary</pds-tag>
        <pds-tag variant="secondary" label="Secondary" [disabled]="true">Secondary</pds-tag>
        <pds-tag variant="tertiary" label="Tertiary" [disabled]="true">Tertiary</pds-tag>
        <pds-tag variant="primary" label="Removable" [disabled]="true" [removable]="true">Removable</pds-tag>
      </div>
    `,
  }),
};

// ── Accesibilidad ─────────────────────────────────────────────────────────────

export const A11yFocusVisible: Story = {
  name: 'A11y — Focus visible (Tab para probar)',
  parameters: {
    docs: {
      description: {
        story: `
Usa **Tab** para navegar entre los tags. Observa el anillo de foco doble en cada elemento.
Con \`removable=true\`, Tab avanza del tag al botón ×.
        `,
      },
    },
  },
  render: () => ({
    template: `
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
        <pds-tag variant="primary" label="Angular" [removable]="true">Angular</pds-tag>
        <pds-tag variant="secondary" label="React" [removable]="true">React</pds-tag>
        <pds-tag variant="primary" label="Deshabilitado" [disabled]="true">Deshabilitado</pds-tag>
      </div>
    `,
  }),
};

export const A11yAriaPressed: Story = {
  name: 'A11y — aria-pressed (selección)',
  parameters: {
    docs: {
      description: {
        story: `
El tag usa \`aria-pressed\` para comunicar el estado de selección a lectores de pantalla,
independientemente del cambio visual de color. Esto satisface **WCAG 1.4.1** y **4.1.2**.
        `,
      },
    },
  },
  render: () => ({
    props: { selected: false },
    template: `
      <div style="display:flex;gap:8px;align-items:center">
        <pds-tag
          variant="primary"
          label="Filtro activo"
          [selected]="selected"
          (click)="selected = !selected"
        >Filtro activo</pds-tag>
        <span style="font-family:'Open Sans';font-size:13px;color:#687C8E">
          Estado: {{ selected ? 'seleccionado' : 'no seleccionado' }}
        </span>
      </div>
    `,
  }),
};
