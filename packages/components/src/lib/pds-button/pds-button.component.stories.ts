import { Meta, StoryObj } from '@storybook/angular';
import { PdsButtonComponent } from './pds-button.component';

const meta: Meta<PdsButtonComponent & { label: string }> = {
  title: 'Poli Design System / 04. Actions / Button',
  component: PdsButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'destructive', 'destructive-outline'],
      description: 'Variante visual del botón',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tamaño del botón',
    },
    disabled: { control: 'boolean', description: 'Estado deshabilitado (usa aria-disabled, mantiene el tab order)' },
    label: { control: 'text', description: 'Texto visible del botón (ng-content)' },
    iconStart: { control: 'text', description: 'Ícono al inicio (nombre Material Symbols)' },
    iconEnd: { control: 'text', description: 'Ícono al final (nombre Material Symbols)' },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'Tipo HTML del botón',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
Componente de acción principal del DS v2. Implementado con \`<button>\` nativo,
disponible en 6 variantes semánticas, 3 tamaños y soporte de íconos opcionales.

### Cuándo usarlo
- Para cualquier acción que modifique estado o desencadene un proceso (guardar, enviar, eliminar).
- \`primary\`: acción principal de la pantalla (solo uno por vista).
- \`secondary\`: acción alternativa de igual importancia visual.
- \`outline\` / \`ghost\`: acciones terciarias o de menor jerarquía.
- \`destructive\` / \`destructive-outline\`: acciones irreversibles (eliminar, cancelar suscripción).

### Cuándo NO usarlo
- No usar para navegación a otra URL — usar \`pds-link\` o \`<a>\`.
- No usar \`<div>\` ni \`<span>\` como botones — usar siempre este componente.
- No uses más de un \`primary\` por área de acción — confunde la jerarquía visual.

### API
\`\`\`html
<pds-button
  variant="primary"
  size="md"
  [disabled]="false"
  iconStart="save"
  type="submit"
>
  Guardar cambios
</pds-button>
\`\`\`

| Input        | Tipo                                                                               | Default       | Descripción |
|--------------|------------------------------------------------------------------------------------|---------------|-------------|
| \`variant\`  | \`'primary'\\|'secondary'\\|'outline'\\|'ghost'\\|'destructive'\\|'destructive-outline'\` | \`'primary'\` | Variante visual |
| \`size\`     | \`'sm'\\|'md'\\|'lg'\`                                                             | \`'md'\`      | Tamaño del botón |
| \`disabled\` | \`boolean\`                                                                        | \`false\`     | Deshabilitado vía \`aria-disabled\` |
| \`iconStart\` | \`string \\| null\`                                                               | \`null\`      | Ícono al inicio (Material Symbols) |
| \`iconEnd\`   | \`string \\| null\`                                                               | \`null\`      | Ícono al final (Material Symbols) |
| \`type\`     | \`'button'\\|'submit'\\|'reset'\`                                                  | \`'button'\`  | Tipo HTML del botón |

---

### Accesibilidad — WCAG 2.2

#### Criterios aplicables
| Criterio | Nivel | Aplicación |
|----------|-------|------------|
| **1.4.3 Contraste mínimo** | AA | Texto del botón ≥ 4.5:1 sobre fondo en todos los estados |
| **1.4.11 Contraste no textual** | AA | Borde del botón (outline/ghost) ≥ 3:1 sobre el fondo de la página |
| **2.1.1 Teclado** | A | Operable con Tab (foco) y Enter/Space (activación) — nativo con \`<button>\` |
| **2.4.7 Foco visible** | AA | Anillo de foco doble: anillo interior blanco + anillo exterior azul (box-shadow) |
| **2.5.8 Tamaño del objetivo** | AA | Touch target mínimo 48×48px en size \`sm\` vía pseudoelemento \`::before\` |
| **4.1.2 Nombre, rol, valor** | A | \`<button>\` nativo; íconos decorativos con \`aria-hidden\`; estado \`aria-disabled\` |

#### Navegación por teclado
| Tecla | Acción |
|-------|--------|
| **Tab** | Mueve el foco al botón (incluso cuando está deshabilitado — \`aria-disabled\` mantiene el tab order) |
| **Enter / Space** | Activa el botón (si no está deshabilitado) |
| **Shift + Tab** | Foco al botón anterior |

#### Atributos ARIA
| Atributo | Valor | Cuándo |
|----------|-------|--------|
| \`aria-disabled="true"\` | automático | Cuando \`disabled=true\` |
| \`aria-hidden="true"\` | en los íconos | Los íconos son siempre decorativos |

> **Por qué \`aria-disabled\` en lugar de \`disabled\`:**
> El atributo nativo \`disabled\` retira el elemento del tab order, impidiendo que usuarios de teclado
> descubran el botón y entiendan por qué no pueden usarlo. \`aria-disabled\` lo mantiene accesible.
> La acción se bloquea por código en el handler de clic.

#### Anuncio en lectores de pantalla
- Estado normal: *"Guardar cambios, botón"*
- Estado deshabilitado: *"Guardar cambios, botón, deshabilitado"*
- Con ícono: el ícono NO se anuncia (\`aria-hidden\`); se lee solo el texto del botón.

#### Auditoría v1 → v2
| Hallazgo v1 (Cortés, feb 2026) | Criterio WCAG | Resolución en v2 |
|--------------------------------|---------------|------------------|
| Foco no definido en el sistema de diseño | 2.4.7 | Doble anillo de foco con tokens \`--action-focus-inner\` + \`--action-primary-focus-ring\` |
| Hover ≈ Pressed — estados indistinguibles | 1.4.1 | Estados diferenciados con tokens semánticos separados |
| Ghost y Outline sin affordance suficiente | 1.4.1, 1.4.11 | Borde visible en outline; fondo sutil en hover para ghost |
| Disabled solo diferenciado por color | 1.4.1 | \`aria-disabled\` + cambio de opacidad + cursor \`not-allowed\` |
| Área interactiva < 44px en size SM | 2.5.8 | Touch target de 48×48px vía pseudoelemento \`::before\` |
| Uso de \`<div>\` como botón en v1 | 4.1.2 | \`<button>\` nativo siempre |

### Buenas prácticas
✅ Usa siempre este componente — nunca \`<div role="button">\` ni \`<span>\` clickeable.
✅ El texto del botón debe describir la acción, no el estado: *"Guardar cambios"*, no *"OK"*.
✅ Para acciones destructivas, usa \`destructive\` y confirma en un \`pds-dialog\` antes de ejecutar.
✅ Usa \`type="submit"\` en botones de envío de formulario para compatibilidad con Enter nativo.
❌ No uses más de un botón \`primary\` por área de acción — confunde la jerarquía visual.
❌ No ocultes información importante detrás del ícono — el texto del botón es obligatorio.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<PdsButtonComponent & { label: string }>;

// ── Sandbox ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default — Sandbox',
  args: { variant: 'primary', size: 'md', disabled: false, label: 'Guardar', iconStart: '', iconEnd: '' },
  render: (args) => ({
    props: args,
    template: `
      <pds-button
        [variant]="variant"
        [size]="size"
        [disabled]="disabled"
        [iconStart]="iconStart || null"
        [iconEnd]="iconEnd || null"
      >{{ label }}</pds-button>
    `,
  }),
};

// ── Variantes ─────────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'Todas las variantes',
  render: () => ({
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">
        <pds-button variant="primary">Primary</pds-button>
        <pds-button variant="secondary">Secondary</pds-button>
        <pds-button variant="outline">Outline</pds-button>
        <pds-button variant="ghost">Ghost</pds-button>
        <pds-button variant="destructive">Destructive</pds-button>
        <pds-button variant="destructive-outline">Destructive Outline</pds-button>
      </div>
    `,
  }),
};

// ── Tamaños ───────────────────────────────────────────────────────────────────

export const AllSizes: Story = {
  name: 'Todos los tamaños',
  render: () => ({
    template: `
      <div style="display:flex;gap:12px;align-items:center">
        <pds-button variant="primary" size="sm">Small</pds-button>
        <pds-button variant="primary" size="md">Medium</pds-button>
        <pds-button variant="primary" size="lg">Large</pds-button>
      </div>
    `,
  }),
};

// ── Con íconos ────────────────────────────────────────────────────────────────

export const WithIcons: Story = {
  name: 'Con íconos',
  render: () => ({
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">
        <pds-button variant="primary" iconStart="save">Guardar</pds-button>
        <pds-button variant="outline" iconStart="edit">Editar</pds-button>
        <pds-button variant="destructive" iconStart="delete">Eliminar</pds-button>
        <pds-button variant="primary" iconEnd="arrow_forward">Continuar</pds-button>
        <pds-button variant="ghost" iconEnd="open_in_new">Abrir</pds-button>
      </div>
    `,
  }),
};

// ── Estado deshabilitado ──────────────────────────────────────────────────────

export const DisabledState: Story = {
  name: 'Estado deshabilitado',
  parameters: {
    docs: {
      description: {
        story: `
Usa \`aria-disabled="true"\` en lugar del atributo nativo \`disabled\`,
lo que mantiene el botón en el tab order para que los lectores de pantalla lo anuncien como deshabilitado.
        `,
      },
    },
  },
  render: () => ({
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">
        <pds-button variant="primary" [disabled]="true">Primary</pds-button>
        <pds-button variant="secondary" [disabled]="true">Secondary</pds-button>
        <pds-button variant="outline" [disabled]="true">Outline</pds-button>
        <pds-button variant="ghost" [disabled]="true">Ghost</pds-button>
        <pds-button variant="destructive" [disabled]="true">Destructive</pds-button>
        <pds-button variant="destructive-outline" [disabled]="true">Destr. Outline</pds-button>
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
Usa **Tab** para navegar entre los botones. Observa el anillo de foco doble
(anillo interior blanco + anillo exterior azul) en cada variante.
El foco es visible tanto en botones activos como en deshabilitados (\`aria-disabled\`).
        `,
      },
    },
  },
  render: () => ({
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">
        <pds-button variant="primary">Primary</pds-button>
        <pds-button variant="secondary">Secondary</pds-button>
        <pds-button variant="outline">Outline</pds-button>
        <pds-button variant="ghost">Ghost</pds-button>
        <pds-button variant="destructive">Destructive</pds-button>
        <pds-button variant="primary" [disabled]="true">Deshabilitado</pds-button>
      </div>
    `,
  }),
};

export const A11yTouchTargetSM: Story = {
  name: 'A11y — Touch target SM (48×48px)',
  parameters: {
    docs: {
      description: {
        story: `
El botón SM tiene 32px de altura visual pero su área táctil es de 48×48px
gracias al pseudoelemento \`::before\`, cumpliendo **WCAG 2.5.8 Target Size (Minimum)**.
        `,
      },
    },
  },
  render: () => ({
    template: `
      <div style="display:flex;gap:16px;align-items:center">
        <pds-button variant="primary" size="sm">SM (32px visual, 48px táctil)</pds-button>
        <pds-button variant="outline" size="sm" iconStart="save">SM con ícono</pds-button>
      </div>
    `,
  }),
};

export const A11yAriaDisabled: Story = {
  name: 'A11y — aria-disabled vs disabled nativo',
  parameters: {
    docs: {
      description: {
        story: `
**¿Por qué \`aria-disabled\` y no \`disabled\`?**

El atributo nativo \`disabled\` retira el botón del tab order — los usuarios de teclado no pueden
descubrirlo ni entender por qué no está disponible. Con \`aria-disabled="true"\` el botón
sigue siendo tabulable y los lectores de pantalla anuncian *"Guardar cambios, botón, deshabilitado"*.

Usa **Tab** para verificar que ambos botones reciben foco.
        `,
      },
    },
  },
  render: () => ({
    template: `
      <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">
        <pds-button variant="primary" [disabled]="true">Con aria-disabled (tabulable)</pds-button>
        <button
          disabled
          style="padding:8px 20px;border-radius:50px;background:#0F385A;color:#fff;border:none;cursor:not-allowed;font-family:Poppins;font-size:14px"
        >Nativo disabled (no tabulable)</button>
      </div>
    `,
  }),
};
