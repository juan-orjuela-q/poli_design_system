import { Meta, StoryObj } from '@storybook/angular';
import { PdsAccordionComponent } from './pds-accordion.component';
import { PdsAccordionGroupComponent } from './pds-accordion-group.component';

const meta: Meta<PdsAccordionComponent> = {
  title: 'Poli Design System / 07. Data Display / Accordion',
  component: PdsAccordionComponent,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text', description: 'Texto de la cabecera (requerido)' },
    subtitle: { control: 'text', description: 'Subtítulo dentro del panel (opcional)' },
    iconName: { control: 'text', description: 'Ícono Material Symbols a la izquierda del título' },
    expanded: { control: 'boolean', description: 'Estado expandido inicial (modo autónomo)' },
    disabled: { control: 'boolean', description: 'Deshabilita las interacciones (usa aria-disabled)' },
  },
  parameters: {
    docs: {
      description: {
        component: `
Panel desplegable del DS v2. Implementado con el patrón APG Accordion: \`<button>\` como trigger, \`aria-expanded\`, \`aria-controls\` y panel identificado con \`id\`.
Soporta uso **autónomo** (cada ítem gestiona su propio estado) o **exclusivo** dentro de \`pds-accordion-group\` (solo uno abierto a la vez).

### Cuándo usarlo
- Para secciones de FAQ o preguntas frecuentes.
- Para organizar contenido extenso en secciones colapsables que el usuario puede explorar bajo demanda.
- Para formularios con secciones opcionales que no todos los usuarios necesitan ver.

### Cuándo NO usarlo
- No usar para navegación a otras páginas — usar \`pds-sidenav\` o \`pds-tabs\`.
- No usar si el contenido de todos los paneles es relevante simultáneamente — mostrar el contenido directamente.
- No usar para mostrar/ocultar un campo — usar \`pds-toggle\` o lógica condicional.

### API
\`\`\`html
<!-- Autónomo -->
<pds-accordion title="¿Cómo me inscribo?" [expanded]="true">
  El proceso de inscripción se realiza a través del portal estudiantil...
</pds-accordion>

<!-- Exclusivo (solo uno abierto) -->
<pds-accordion-group>
  <pds-accordion title="Pregunta 1">Respuesta 1</pds-accordion>
  <pds-accordion title="Pregunta 2">Respuesta 2</pds-accordion>
  <pds-accordion title="Pregunta 3">Respuesta 3</pds-accordion>
</pds-accordion-group>
\`\`\`

| Input            | Tipo             | Default  | Descripción |
|------------------|------------------|----------|-------------|
| \`title\`          | \`string\` (requerido) | — | Texto de la cabecera |
| \`subtitle\`       | \`string \\| null\` | \`null\` | Subtítulo dentro del panel |
| \`iconName\`       | \`string \\| null\` | \`null\` | Ícono decorativo (Material Symbols) |
| \`expanded\`       | \`boolean\`      | \`false\` | Estado expandido inicial (modo autónomo) |
| \`disabled\`       | \`boolean\`      | \`false\` | Deshabilita con \`aria-disabled\` |

| Output           | Tipo      | Descripción |
|------------------|-----------|-------------|
| \`expandedChange\` | \`boolean\` | Emite el nuevo estado al hacer toggle |

---

### Accesibilidad — WCAG 2.2

#### Criterios aplicables
| Criterio | Nivel | Aplicación |
|----------|-------|------------|
| **1.3.1 Info y relaciones** | A | Trigger como \`<button>\` con \`aria-expanded\` y \`aria-controls\`; panel identificado con \`id\` |
| **1.4.3 Contraste mínimo** | AA | Texto del título ≥ 4.5:1 |
| **2.1.1 Teclado** | A | Trigger activable con Tab+Enter/Space; panel expandido accesible con Tab |
| **2.4.7 Foco visible** | AA | Focus ring visible en el trigger con token \`--action-primary-focus-ring\` |
| **4.1.2 Nombre, rol, valor** | A | \`<button aria-expanded="true/false" aria-controls="[panelId]">\` en el trigger |

#### Patrón ARIA APG Accordion
\`\`\`html
<!-- Trigger -->
<button
  [attr.aria-expanded]="isExpanded"
  [attr.aria-controls]="panelId"
  [attr.aria-disabled]="disabled || null"
>
  ¿Cómo me inscribo?
</button>

<!-- Panel -->
<div
  [id]="panelId"
  role="region"
  [attr.aria-labelledby]="headerId"
>
  El proceso de inscripción...
</div>
\`\`\`

#### Navegación por teclado
| Tecla | Acción |
|-------|--------|
| **Tab** | Enfoca el trigger del accordion |
| **Enter / Space** | Expande o colapsa el panel |
| **Tab** (panel abierto) | Navega al contenido dentro del panel |
| **Shift+Tab** | Sale del panel hacia el trigger anterior |

#### Anuncio en lectores de pantalla
- Trigger cerrado: *"¿Cómo me inscribo?, expandido: No, botón"*
- Trigger abierto: *"¿Cómo me inscribo?, expandido: Sí, botón"*
- Al expandir: el contenido del panel queda disponible para navegación con Tab

#### Auditoría v1 → v2
| Hallazgo v1 (Cortés, feb 2026) | Criterio WCAG | Resolución en v2 |
|--------------------------------|---------------|------------------|
| Este componente es nuevo en v2 y fue diseñado desde el inicio conforme a WCAG 2.2 AA | — | — |

### Buenas prácticas
✅ Usa \`pds-accordion-group\` cuando el contenido de los paneles es mutuamente excluyente.
✅ El \`title\` debe ser una pregunta o encabezado claro — el usuario debe saber qué encontrará al expandir.
✅ Usa \`iconName\` para categorizar visualmente los paneles (ej. \`school\`, \`payments\`).
❌ No anides acordeones — la semántica se vuelve confusa y la navegación por teclado se complica.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<PdsAccordionComponent>;

// ── Sandbox ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default — Sandbox',
  args: {
    title: '¿Cómo me inscribo al programa?',
    expanded: false,
    disabled: false,
  },
};

// ── Autónomo ──────────────────────────────────────────────────────────────────

export const Standalone: Story = {
  name: 'Modo autónomo (cada ítem independiente)',
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:8px;max-width:640px">
        <pds-accordion title="¿Cuáles son los requisitos de admisión?" [expanded]="true">
          <p style="margin:0;font-family:Open Sans;font-size:14px;line-height:1.6">
            Para inscribirte necesitas: copia del documento de identidad, título de bachiller o
            acta de grado, y resultado de las Pruebas Saber 11. Consulta el reglamento académico
            para requisitos específicos por programa.
          </p>
        </pds-accordion>
        <pds-accordion title="¿Cuánto cuesta la matrícula?">
          <p style="margin:0;font-family:Open Sans;font-size:14px;line-height:1.6">
            El valor de la matrícula varía por programa y período académico. Consulta la
            liquidación en el portal financiero o comunícate con la oficina de admisiones.
          </p>
        </pds-accordion>
        <pds-accordion title="¿Qué modalidades están disponibles?">
          <p style="margin:0;font-family:Open Sans;font-size:14px;line-height:1.6">
            El Politécnico Grancolombiano ofrece modalidades presencial, virtual y a distancia
            según el programa seleccionado.
          </p>
        </pds-accordion>
      </div>
    `,
  }),
};

// ── Grupo exclusivo ───────────────────────────────────────────────────────────

export const ExclusiveGroup: Story = {
  name: 'Grupo exclusivo (pds-accordion-group)',
  parameters: {
    docs: {
      description: {
        story: 'Dentro de \`pds-accordion-group\` solo un panel puede estar abierto simultáneamente. El grupo gestiona el estado internamente.',
      },
    },
  },
  render: () => ({
    imports: [PdsAccordionGroupComponent],
    template: `
      <div style="max-width:640px">
        <pds-accordion-group>
          <pds-accordion title="Preguntas sobre inscripción" iconName="edit_note">
            <p style="margin:0;font-family:Open Sans;font-size:14px;line-height:1.6">
              La inscripción se realiza a través del portal estudiantil en los períodos habilitados.
            </p>
          </pds-accordion>
          <pds-accordion title="Preguntas sobre pagos" iconName="payments">
            <p style="margin:0;font-family:Open Sans;font-size:14px;line-height:1.6">
              Los pagos se realizan en línea a través de la plataforma financiera del portal.
            </p>
          </pds-accordion>
          <pds-accordion title="Preguntas sobre el campus" iconName="location_on">
            <p style="margin:0;font-family:Open Sans;font-size:14px;line-height:1.6">
              El campus principal está ubicado en Bogotá. Consulta las sedes regionales en el portal.
            </p>
          </pds-accordion>
          <pds-accordion title="Preguntas sobre soporte" iconName="support_agent">
            <p style="margin:0;font-family:Open Sans;font-size:14px;line-height:1.6">
              El equipo de soporte está disponible de lunes a viernes, 8:00 a 17:00.
            </p>
          </pds-accordion>
        </pds-accordion-group>
      </div>
    `,
  }),
};

// ── Con ícono ─────────────────────────────────────────────────────────────────

export const WithIcon: Story = {
  name: 'Con ícono decorativo',
  args: {
    title: 'Información académica',
    iconName: 'school',
    subtitle: 'Detalles del programa seleccionado',
    expanded: true,
  },
};

// ── Estado deshabilitado ──────────────────────────────────────────────────────

export const DisabledState: Story = {
  name: 'Estado deshabilitado',
  parameters: {
    docs: {
      description: {
        story: 'El estado deshabilitado usa \`aria-disabled="true"\` para mantener el ítem en el tab order y que los lectores de pantalla lo anuncien como *"no disponible"*.',
      },
    },
  },
  args: {
    title: 'Contenido no disponible en este período',
    disabled: true,
    iconName: 'lock',
  },
};

// ── Accesibilidad ─────────────────────────────────────────────────────────────

export const A11yKeyboardNav: Story = {
  name: 'A11y — APG Accordion (Tab + Enter)',
  parameters: {
    docs: {
      description: {
        story: `
Usa **Tab** para enfocar el trigger del acordeón. Presiona **Enter** o **Space** para expandir/colapsar.

NVDA/VoiceOver anuncian:
- Cerrado: *"¿Cómo me inscribo?, expandido: No, botón"*
- Abierto: *"¿Cómo me inscribo?, expandido: Sí, botón"*

Tras expandir, el contenido del panel queda accesible con **Tab**.
        `,
      },
    },
  },
  render: () => ({
    template: `
      <div style="max-width:640px">
        <pds-accordion title="¿Cómo me inscribo al programa? (Tab + Enter para probar)">
          <p style="margin:0;font-family:Open Sans;font-size:14px;line-height:1.6">
            El proceso de inscripción se realiza a través del portal estudiantil en los períodos habilitados
            por la dirección académica. Consulta las fechas en el calendario académico.
          </p>
        </pds-accordion>
      </div>
    `,
  }),
};
