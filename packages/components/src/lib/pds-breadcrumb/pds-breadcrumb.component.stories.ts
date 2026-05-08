import { Meta, StoryObj } from '@storybook/angular';
import {
  PdsBreadcrumbComponent,
  BreadcrumbItem,
} from './pds-breadcrumb.component';

const SHORT_PATH: BreadcrumbItem[] = [
  { label: 'Inicio', href: '/' },
  { label: 'Académico' },
];

const MEDIUM_PATH: BreadcrumbItem[] = [
  { label: 'Inicio', href: '/' },
  { label: 'Servicios académicos', href: '/academic' },
  { label: 'Inscripción de materias' },
];

const LONG_PATH: BreadcrumbItem[] = [
  { label: 'Inicio', href: '/' },
  { label: 'Mi cuenta', href: '/account' },
  { label: 'Configuración', href: '/account/settings' },
  { label: 'Seguridad', href: '/account/settings/security' },
  { label: 'Cambiar contraseña' },
];

const meta: Meta<PdsBreadcrumbComponent> = {
  title: 'Poli Design System / 08. Navigation / Breadcrumb',
  component: PdsBreadcrumbComponent,
  tags: ['autodocs'],
  argTypes: {
    items: { description: 'Lista ordenada de ítems de la ruta. El último ítem es la página actual (sin href).' },
  },
  parameters: {
    docs: {
      description: {
        component: `
Ruta de navegación contextual del DS v2. Indica al usuario su posición dentro de la jerarquía de la aplicación
y permite navegar a los niveles anteriores.
Implementado con \`<nav>\` + \`<ol>\` semánticos y marcado de la página actual con \`aria-current="page"\`.

### Cuándo usarlo
- En páginas de nivel 2 o más profundo dentro de la jerarquía de navegación.
- Cuando la estructura del sitio tiene más de dos niveles de profundidad.
- Para contextos donde el usuario puede llegar a una página desde múltiples rutas.

### Cuándo NO usarlo
- No usar en la página de inicio — no hay ruta previa que mostrar.
- No usar en aplicaciones de una sola pantalla sin jerarquía de páginas.
- No usar más de 5-6 niveles — indica que la arquitectura de información necesita revisión.

### API
\`\`\`html
<pds-breadcrumb
  [items]="[
    { label: 'Inicio', href: '/' },
    { label: 'Académico', href: '/academic' },
    { label: 'Inscripción de materias' }
  ]"
/>
\`\`\`

| Input   | Tipo              | Descripción |
|---------|-------------------|-------------|
| \`items\` | \`BreadcrumbItem[]\` (requerido) | Lista ordenada de ítems. El último no debe tener \`href\` (es la página actual). |

**BreadcrumbItem:**
\`\`\`ts
interface BreadcrumbItem {
  label: string;  // texto del ítem
  href?: string;  // URL de destino (omitir en el ítem final = página actual)
}
\`\`\`

---

### Accesibilidad — WCAG 2.2

#### Criterios aplicables
| Criterio | Nivel | Aplicación |
|----------|-------|------------|
| **1.3.1 Info y relaciones** | A | \`<nav>\` + \`<ol>\` comunican la jerarquía — los ítems son una lista ordenada |
| **1.3.2 Secuencia significativa** | A | El orden de los ítems en el DOM refleja la jerarquía de navegación |
| **1.4.3 Contraste mínimo** | AA | Texto de los enlaces ≥ 4.5:1 sobre el fondo; ítem actual ≥ 4.5:1 |
| **2.1.1 Teclado** | A | Los enlaces son operables con Tab y Enter — nativos \`<a>\` |
| **2.4.4 Propósito del enlace** | A | Cada enlace tiene texto descriptivo de la sección a la que lleva |
| **2.4.7 Foco visible** | AA | Focus visible nativo de los \`<a>\` más el focus ring del DS |
| **2.4.8 Ubicación** | AAA | El breadcrumb en sí cumple este criterio (ubicación del usuario) |
| **4.1.2 Nombre, rol, valor** | A | \`<nav aria-label="Ruta de navegación">\`; ítem actual con \`aria-current="page"\` |

#### Navegación por teclado
| Tecla | Acción |
|-------|--------|
| **Tab** | Mueve el foco entre los enlaces del breadcrumb |
| **Enter** | Navega al enlace enfocado |
| **Shift + Tab** | Foco al enlace anterior |

El ítem final (página actual) no es un enlace — no recibe foco.

#### Atributos ARIA
| Atributo | Dónde | Función |
|----------|-------|---------|
| \`aria-label="Ruta de navegación"\` | en el \`<nav>\` | Distingue este nav de otros de la página |
| \`aria-current="page"\` | en el último ítem | Indica que es la página actualmente visible |
| Separadores \`aria-hidden="true"\` | en los iconos \`/\` | Los separadores son decorativos — no se leen |

#### Anuncio en lectores de pantalla
Al navegar con Tab:
- *"Ruta de navegación, lista de navegación"*
- *"Inicio, enlace, 1 de 3"*
- *"Académico, enlace, 2 de 3"*
- *"Inscripción de materias, 3 de 3, página actual"* (no es enlace)

#### Auditoría v1 → v2
Este componente es nuevo en v2 y fue diseñado desde el inicio conforme a WCAG 2.2 AA.
Reemplaza el patrón v1 donde la ruta se mostraba con \`<div>\` y \`<span>\` sin semántica de lista ni landmark.

### Buenas prácticas
✅ El último ítem siempre es la página actual — sin \`href\`, con \`aria-current="page"\`.
✅ Usa etiquetas breves y descriptivas — no uses "Página" o "Sección" sin especificar cuál.
✅ El \`<nav>\` tiene \`aria-label\` propio para diferenciarse de la navegación principal.
❌ No hagas clic en el ítem actual — es la página donde el usuario está, no un enlace.
❌ No uses más de 5-6 niveles — si la jerarquía es tan profunda, considera simplificar la estructura.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<PdsBreadcrumbComponent>;

// ── Sandbox ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default — Sandbox',
  args: {
    items: MEDIUM_PATH,
  },
};

// ── Rutas ─────────────────────────────────────────────────────────────────────

export const ShortPath: Story = {
  name: 'Ruta corta (2 niveles)',
  args: {
    items: SHORT_PATH,
  },
};

export const MediumPath: Story = {
  name: 'Ruta media (3 niveles)',
  args: {
    items: MEDIUM_PATH,
  },
};

export const LongPath: Story = {
  name: 'Ruta larga (5 niveles)',
  args: {
    items: LONG_PATH,
  },
};

// ── En contexto de página ─────────────────────────────────────────────────────

export const InPageContext: Story = {
  name: 'En contexto de página',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'El breadcrumb en su posición natural — debajo del header y encima del título de la página.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="font-family:Poppins;max-width:800px">
        <div style="background:#0F385A;padding:16px 24px;border-radius:8px 8px 0 0">
          <span style="color:#fff;font-size:16px;font-weight:600">Portal Académico</span>
        </div>
        <div style="background:#F5F7FA;padding:16px 24px">
          <pds-breadcrumb [items]="[
            { label: 'Inicio', href: '/' },
            { label: 'Servicios académicos', href: '/academic' },
            { label: 'Inscripción de materias' }
          ]" />
        </div>
        <div style="padding:24px 24px;border:1px solid #E0E8EE;border-top:none;border-radius:0 0 8px 8px">
          <h1 style="margin:0 0 8px;font-size:24px;font-weight:600;color:#0F385A">Inscripción de materias</h1>
          <p style="margin:0;font-family:'Open Sans';font-size:15px;color:#50606E">
            Selecciona las materias para el período académico vigente.
          </p>
        </div>
      </div>
    `,
  }),
};

// ── Accesibilidad ─────────────────────────────────────────────────────────────

export const A11ySemantics: Story = {
  name: 'A11y — Semántica nav + ol + aria-current (inspeccionar)',
  parameters: {
    docs: {
      description: {
        story: `
Abre el inspector de accesibilidad del navegador y verifica:
- El elemento raíz es un \`<nav>\` con \`aria-label="Ruta de navegación"\`.
- Los ítems están en un \`<ol>\` — lista ordenada.
- Los ítems con \`href\` son \`<a>\` — operables con Tab/Enter.
- El último ítem tiene \`aria-current="page"\` y no es un enlace.
- Los separadores tienen \`aria-hidden="true"\`.
        `,
      },
    },
  },
  args: {
    items: MEDIUM_PATH,
  },
};

export const A11yKeyboardNav: Story = {
  name: 'A11y — Teclado (Tab para probar)',
  parameters: {
    docs: {
      description: {
        story: 'Usa **Tab** para navegar entre los enlaces del breadcrumb. El ítem final (página actual) no recibe foco porque no es un enlace.',
      },
    },
  },
  args: {
    items: LONG_PATH,
  },
};
