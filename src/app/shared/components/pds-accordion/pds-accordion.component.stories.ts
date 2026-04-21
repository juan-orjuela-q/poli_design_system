import { Meta, StoryObj } from '@storybook/angular';
import { PdsAccordionComponent } from './pds-accordion.component';
import { PdsAccordionGroupComponent } from './pds-accordion-group.component';

const meta: Meta<PdsAccordionComponent> = {
  title: 'DS v2/Accordion',
  component: PdsAccordionComponent,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text', description: 'Encabezado H5 opcional dentro del panel de contenido' },
    iconName: { control: 'text', description: 'Nombre del ícono Material Symbols a la izquierda del título' },
    expanded: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  parameters: {
    docs: {
      description: {
        component: `
Componente de acordeón del DS v2. Soporta uso autónomo o dentro de \`pds-accordion-group\`
(comportamiento exclusivo: solo uno abierto al mismo tiempo).

#### Uso autónomo
\`\`\`html
<pds-accordion title="Título del panel" [expanded]="true">
  Contenido del panel
</pds-accordion>
\`\`\`

#### Con grupo exclusivo
\`\`\`html
<pds-accordion-group>
  <pds-accordion title="Pregunta 1">Respuesta 1</pds-accordion>
  <pds-accordion title="Pregunta 2">Respuesta 2</pds-accordion>
  <pds-accordion title="Pregunta 3">Respuesta 3</pds-accordion>
</pds-accordion-group>
\`\`\`

#### Accesibilidad
- \`<button>\` nativo para el trigger (Enter y Space nativos).
- \`aria-expanded\` refleja el estado al botón.
- \`aria-controls\` apunta al panel; el panel tiene \`role="region"\` + \`aria-labelledby\`.
- Estado deshabilitado usa \`aria-disabled\` en lugar de \`disabled\` nativo (mantiene el tab order).
- Focus ring: doble anillo con tokens \`--action-focus-inner\` / \`--action-primary-focus-ring\`.
- Chevron: \`prefers-reduced-motion\` desactiva la transición de rotación.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<PdsAccordionComponent>;

// ── Default ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    title: '¿Qué es el Politécnico Grancolombiano?',
    subtitle: undefined,
    iconName: 'school',
    expanded: false,
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <pds-accordion
        [title]="title"
        [subtitle]="subtitle"
        [iconName]="iconName"
        [expanded]="expanded"
        [disabled]="disabled"
      >
        El Politécnico Grancolombiano es una institución de educación superior colombiana
        con más de 45 años de historia, comprometida con la excelencia académica y la
        innovación en programas presenciales y virtuales.
      </pds-accordion>
    `,
  }),
};

// ── Expanded ──────────────────────────────────────────────────────────────────

export const Expanded: Story = {
  args: {
    title: 'Panel abierto por defecto',
    subtitle: 'Subtítulo dentro del panel',
    iconName: 'info',
    expanded: true,
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <pds-accordion [title]="title" [subtitle]="subtitle" [iconName]="iconName" [expanded]="expanded">
        Este panel se muestra expandido desde el inicio.
        El chevron apunta hacia arriba y el fondo del header es azul navy.
        El subtítulo aparece dentro del panel como encabezado H5.
      </pds-accordion>
    `,
  }),
};

// ── With Subtitle ─────────────────────────────────────────────────────────────

export const WithSubtitle: Story = {
  args: {
    title: 'Oferta académica',
    subtitle: 'Programas técnicos, tecnológicos y universitarios',
    iconName: 'menu_book',
    expanded: true,
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <pds-accordion [title]="title" [subtitle]="subtitle" [iconName]="iconName" [expanded]="expanded">
        Contamos con más de 80 programas en todas las áreas del conocimiento,
        disponibles en modalidad presencial, virtual y a distancia.
      </pds-accordion>
    `,
  }),
};

// ── Disabled ──────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  args: {
    title: 'Sección no disponible',
    disabled: true,
    expanded: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <pds-accordion [title]="title" [disabled]="disabled">
        Este contenido no debería ser visible ya que el acordeón está deshabilitado.
      </pds-accordion>
    `,
  }),
};

// ── Group (Exclusive) ─────────────────────────────────────────────────────────

export const Group: Story = {
  render: () => ({
    moduleMetadata: { imports: [PdsAccordionGroupComponent] },
    template: `
      <pds-accordion-group style="display: flex; flex-direction: column; gap: 8px;">
        <pds-accordion title="¿Cómo me matriculo?" iconName="how_to_reg">
          Puedes matricularte a través del portal estudiantil ingresando con tu número
          de documento. El proceso tarda menos de 10 minutos.
        </pds-accordion>
        <pds-accordion title="¿Cuáles son los requisitos de ingreso?" iconName="checklist">
          Para programas universitarios necesitas título de bachiller y pruebas Saber 11.
          Para tecnológicos, solo el título de bachiller.
        </pds-accordion>
        <pds-accordion title="¿Ofrecen becas y financiamiento?" iconName="payments" subtitle="Opciones de apoyo económico">
          Sí, contamos con becas por mérito académico, descuentos para egresados y
          convenios con ICETEX para créditos educativos.
        </pds-accordion>
        <pds-accordion title="Sección deshabilitada" iconName="lock" [disabled]="true">
          Este contenido no está disponible.
        </pds-accordion>
      </pds-accordion-group>
    `,
  }),
};

// ── Standalone Multiple ───────────────────────────────────────────────────────

export const StandaloneMultiple: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <pds-accordion title="Panel A — independiente" [expanded]="true">
          Sin group: múltiples paneles pueden estar abiertos al mismo tiempo.
        </pds-accordion>
        <pds-accordion title="Panel B — independiente" [expanded]="true">
          Este también está expandido al mismo tiempo que Panel A.
        </pds-accordion>
        <pds-accordion title="Panel C — independiente">
          Y este está cerrado.
        </pds-accordion>
      </div>
    `,
  }),
};
