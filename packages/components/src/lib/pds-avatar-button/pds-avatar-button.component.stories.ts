import { Meta, StoryObj } from '@storybook/angular';
import { PdsAvatarButtonComponent } from './pds-avatar-button.component';

const meta: Meta<PdsAvatarButtonComponent> = {
  title: 'Poli Design System / 04. Actions / Avatar Button',
  component: PdsAvatarButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text', description: 'Nombre completo del usuario. Requerido. Base del aria-label.' },
    role: { control: 'text', description: 'Cargo o rol del usuario (línea secundaria)' },
    type: {
      control: 'select',
      options: ['letter', 'image', 'icon'],
      description: 'Tipo de contenido del avatar',
    },
    imageSrc: { control: 'text', description: 'URL de la imagen (necesario cuando type="image")' },
    letter: { control: 'text', description: 'Letra a mostrar (por defecto usa la primera letra de name)' },
    iconName: { control: 'text', description: 'Nombre del ícono Material Symbols (cuando type="icon")' },
    showBadge: { control: 'boolean', description: 'Muestra el indicador de notificación' },
    size: {
      control: 'select',
      options: ['md', 'lg'],
      description: 'Tamaño del círculo avatar: md=40px · lg=64px',
    },
    showName: { control: 'boolean', description: 'Muestra el nombre y rol junto al avatar' },
    showRole: { control: 'boolean', description: 'Muestra solo el rol (línea secundaria)' },
    buttonType: {
      control: 'select',
      options: ['button', 'submit'],
      description: 'Tipo HTML del botón',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
Botón de avatar del DS v2. Combina un círculo avatar (letra, imagen o ícono)
con el nombre y cargo del usuario en un \`<button>\` pill accesible.
Incluye badge de notificación opcional y tres tipos de contenido de avatar.

### Cuándo usarlo
- En el header o sidenav para identificar al usuario autenticado y abrir su menú de perfil.
- Como trigger de un dropdown de opciones de cuenta.
- Siempre que sea necesario mostrar la identidad del usuario como elemento interactivo.

### Cuándo NO usarlo
- No usar solo para mostrar el avatar sin acción asociada — usar un elemento no interactivo.
- No usar como sustituto de un botón genérico — la semántica de avatar implica identidad de usuario.

### API
\`\`\`html
<pds-avatar-button
  name="María García"
  role="Docente"
  type="letter"
  [showBadge]="true"
  size="md"
  (clicked)="openProfileMenu()"
/>
\`\`\`

| Input         | Tipo                              | Default      | Descripción |
|---------------|-----------------------------------|--------------|-------------|
| \`name\`       | \`string\` (requerido)           | —            | Nombre completo del usuario |
| \`role\`       | \`string\`                       | \`''\`       | Cargo o rol del usuario |
| \`type\`       | \`'letter'\\|'image'\\|'icon'\`  | \`'letter'\` | Tipo de contenido del avatar |
| \`imageSrc\`   | \`string\`                       | \`''\`       | URL de la imagen (type="image") |
| \`letter\`     | \`string\`                       | \`''\`       | Letra explícita (fallback: primera letra de name) |
| \`iconName\`   | \`string\`                       | \`'person'\` | Ícono Material Symbols (type="icon") |
| \`showBadge\`  | \`boolean\`                      | \`false\`    | Indicador de notificaciones |
| \`size\`       | \`'md'\\|'lg'\`                  | \`'md'\`     | md=40px · lg=64px |
| \`showName\`   | \`boolean\`                      | \`true\`     | Muestra nombre y rol junto al avatar |
| \`showRole\`   | \`boolean\`                      | \`true\`     | Muestra solo el rol |
| \`buttonType\` | \`'button'\\|'submit'\`          | \`'button'\` | Tipo HTML del botón |

| Output    | Tipo     | Descripción |
|-----------|----------|-------------|
| \`clicked\` | \`void\` | Emite al hacer clic |

---

### Accesibilidad — WCAG 2.2

#### Criterios aplicables
| Criterio | Nivel | Aplicación |
|----------|-------|------------|
| **1.1.1 Contenido no textual** | A | El avatar (letra/imagen/ícono) es decorativo — el nombre textual es el contenido semántico |
| **1.4.3 Contraste mínimo** | AA | Letra del avatar y nombre de usuario ≥ 4.5:1 sobre el fondo |
| **2.1.1 Teclado** | A | El botón es operable con Tab y Enter/Space |
| **2.4.7 Foco visible** | AA | Anillo de foco doble con indicador lateral coloreado |
| **2.5.8 Tamaño del objetivo** | AA | Área táctil mínima del botón ≥ 48px de alto |
| **4.1.2 Nombre, rol, valor** | A | \`<button>\` nativo con \`aria-label\` dinámico que incluye nombre, cargo y badge |

#### Atributos ARIA
| Atributo | Valor | Cuándo |
|----------|-------|--------|
| \`aria-label\` | \`"[nombre], [cargo], tiene notificaciones pendientes"\` | Generado dinámicamente |
| \`aria-hidden="true"\` | en el avatar y badge | Son decorativos — el \`aria-label\` comunica toda la información |

#### Anuncio en lectores de pantalla
- Sin badge: *"María García, Docente, botón"*
- Con badge: *"María García, Docente, tiene notificaciones pendientes, botón"*
- Solo icono (sin showName): *"María García, botón"* — el nombre sigue accesible vía aria-label

#### Auditoría v1 → v2
Este componente es nuevo en v2 y fue diseñado desde el inicio conforme a WCAG 2.2 AA.
El \`aria-label\` dinámico resuelve el problema de botones de avatar sin nombre accesible identificado
en la auditoría v1 (Cortés, feb 2026, §3.8 — *"4.1.2 Nombre, rol y estado"*).

### Buenas prácticas
✅ Siempre provee \`name\` con el nombre completo real del usuario — es la base del aria-label.
✅ Usa \`showBadge=true\` solo cuando hay notificaciones reales pendientes — no como decoración.
✅ En la sidenav colapsada, usa \`showName=false\` — el \`aria-label\` mantiene la accesibilidad.
❌ No uses una imagen en \`type="image"\` sin asegurarte de que \`name\` es el nombre real del usuario.
❌ No uses el avatar como botón de acción genérico — está semánticamente ligado a la identidad del usuario.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<PdsAvatarButtonComponent>;

// ── Sandbox ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default — Sandbox',
  args: {
    name: 'María García López',
    role: 'Docente universitaria',
    type: 'letter',
    showBadge: false,
    size: 'md',
    showName: true,
    showRole: true,
  },
};

// ── Tipos de avatar ───────────────────────────────────────────────────────────

export const AvatarTypes: Story = {
  name: 'Tipos de avatar (letter / image / icon)',
  render: () => ({
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:16px;align-items:center">
        <pds-avatar-button
          name="Carlos Méndez"
          role="Estudiante"
          type="letter"
        />
        <pds-avatar-button
          name="Ana Martínez"
          role="Coordinadora"
          type="image"
          imageSrc="https://i.pravatar.cc/80?img=47"
        />
        <pds-avatar-button
          name="Sistema Poli"
          role="Soporte técnico"
          type="icon"
          iconName="support_agent"
        />
      </div>
    `,
  }),
};

// ── Con badge ─────────────────────────────────────────────────────────────────

export const WithBadge: Story = {
  name: 'Con badge de notificación',
  parameters: {
    docs: {
      description: {
        story: 'El badge se anuncia en el \`aria-label\`: *"…, tiene notificaciones pendientes, botón"*.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:16px;align-items:center">
        <pds-avatar-button
          name="María García"
          role="Docente"
          type="letter"
          [showBadge]="false"
        />
        <pds-avatar-button
          name="María García"
          role="Docente"
          type="letter"
          [showBadge]="true"
        />
      </div>
    `,
  }),
};

// ── Tamaños ───────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  name: 'Tamaños md y lg',
  render: () => ({
    template: `
      <div style="display:flex;gap:24px;align-items:center">
        <pds-avatar-button
          name="Juan Rodríguez"
          role="Director"
          type="letter"
          size="md"
        />
        <pds-avatar-button
          name="Juan Rodríguez"
          role="Director"
          type="letter"
          size="lg"
        />
      </div>
    `,
  }),
};

// ── Solo avatar (sin nombre) ──────────────────────────────────────────────────

export const AvatarOnly: Story = {
  name: 'Solo avatar (sidenav colapsada)',
  parameters: {
    docs: {
      description: {
        story: `
Usa \`[showName]="false"\` en la sidenav colapsada para mostrar solo el círculo del avatar.
El \`aria-label\` con el nombre del usuario se mantiene — los lectores de pantalla siguen anunciando *"[nombre], botón"*.
        `,
      },
    },
  },
  render: () => ({
    template: `
      <div style="display:flex;gap:16px;align-items:center">
        <pds-avatar-button
          name="Laura Pérez"
          role="Estudiante"
          type="letter"
          [showName]="true"
        />
        <pds-avatar-button
          name="Laura Pérez"
          role="Estudiante"
          type="letter"
          [showName]="false"
        />
      </div>
    `,
  }),
};

// ── Accesibilidad ─────────────────────────────────────────────────────────────

export const A11yAriaLabel: Story = {
  name: 'A11y — aria-label dinámico (inspeccionar en DevTools)',
  parameters: {
    docs: {
      description: {
        story: `
Abre el inspector de accesibilidad del navegador y verifica el \`aria-label\` generado para cada variante:
- Sin badge: *"María García, Docente, botón"*
- Con badge: *"María García, Docente, tiene notificaciones pendientes, botón"*
- Sin rol: *"María García, botón"*
        `,
      },
    },
  },
  render: () => ({
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:16px;align-items:center">
        <pds-avatar-button
          name="María García"
          role="Docente"
          type="letter"
          [showBadge]="false"
        />
        <pds-avatar-button
          name="María García"
          role="Docente"
          type="letter"
          [showBadge]="true"
        />
        <pds-avatar-button
          name="María García"
          role=""
          type="letter"
          [showBadge]="false"
        />
      </div>
    `,
  }),
};

export const A11yFocusVisible: Story = {
  name: 'A11y — Focus visible (Tab para probar)',
  parameters: {
    docs: {
      description: {
        story: 'Usa **Tab** para enfocar el botón de avatar. El anillo de foco doble con indicador lateral azul debe ser claramente visible.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display:flex;gap:24px;flex-wrap:wrap;align-items:center;padding:16px">
        <pds-avatar-button name="Carlos López" role="Docente" type="letter" [showBadge]="false" />
        <pds-avatar-button name="Ana Martínez" role="Coordinadora" type="letter" [showBadge]="true" />
        <pds-avatar-button name="Pedro Gómez" role="Soporte" type="icon" iconName="support_agent" [showBadge]="false" />
      </div>
    `,
  }),
};
