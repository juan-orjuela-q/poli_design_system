import { Meta, StoryObj } from '@storybook/angular';
import { PdsCtaComponent } from './pds-cta.component';

const meta: Meta<PdsCtaComponent & { label: string }> = {
  title: 'Poli Design System / 04. Actions / CTA',
  component: PdsCtaComponent,
  tags: ['autodocs'],
  argTypes: {
    device: {
      control: 'select',
      options: ['desktop', 'mobile'],
      description: 'Variante de dispositivo — controla tamaño de texto e ícono',
    },
    disabled: { control: 'boolean', description: 'Estado deshabilitado (usa aria-disabled)' },
    iconName: { control: 'text', description: 'Nombre del ícono (Material Symbols Rounded)' },
    type: {
      control: 'select',
      options: ['button', 'submit'],
      description: 'Tipo HTML del botón',
    },
    label: { control: 'text', description: 'Texto del CTA (ng-content)' },
  },
  parameters: {
    docs: {
      description: {
        component: `
Botón de llamada a la acción (**Call to Action**) de alta jerarquía visual.
Usa gradiente de marca y está pensado para puntos de conversión críticos.
Implementado como \`<button>\` semántico con área táctil garantizada.

### Cuándo usarlo
- Para la acción de mayor prioridad en una pantalla de marketing o landing.
- En puntos de conversión clave: registro, inicio de proceso principal, descarga.
- Solo uno por pantalla o sección — es el elemento de mayor jerarquía visual.

### Cuándo NO usarlo
- No usar para acciones secundarias o de apoyo — usar \`pds-button\` variant \`primary\`.
- No usar múltiples CTAs en la misma vista — pierde su efecto de énfasis.
- No usar en pantallas de formulario donde existen otras acciones de igual peso — usar \`pds-button\`.

### API
\`\`\`html
<pds-cta
  device="desktop"
  iconName="arrow_forward"
  type="button"
  (click)="onCtaClick()"
>
  Comenzar ahora
</pds-cta>
\`\`\`

| Input       | Tipo                     | Default          | Descripción |
|-------------|--------------------------|------------------|-------------|
| \`device\`  | \`'desktop'\\|'mobile'\` | \`'desktop'\`    | Controla tamaño de texto e ícono |
| \`disabled\` | \`boolean\`             | \`false\`        | Deshabilitado vía \`aria-disabled\` |
| \`iconName\` | \`string\`              | \`'arrow_forward'\` | Ícono al final (Material Symbols) |
| \`type\`    | \`'button'\\|'submit'\`  | \`'button'\`     | Tipo HTML del botón |

---

### Accesibilidad — WCAG 2.2

#### Criterios aplicables
| Criterio | Nivel | Aplicación |
|----------|-------|------------|
| **1.4.3 Contraste mínimo** | AA | Texto blanco sobre gradiente de marca ≥ 4.5:1 |
| **1.4.11 Contraste no textual** | AA | El ícono del CTA ≥ 3:1 |
| **2.1.1 Teclado** | A | Operable con Tab y Enter/Space — nativo con \`<button>\` |
| **2.4.7 Foco visible** | AA | Anillo de foco doble (box-shadow) |
| **2.5.8 Tamaño del objetivo** | AA | Área táctil mínima de 48×48px garantizada |
| **4.1.2 Nombre, rol, valor** | A | \`<button>\` nativo; \`aria-disabled\` para estado deshabilitado |

#### Navegación por teclado
| Tecla | Acción |
|-------|--------|
| **Tab** | Mueve el foco al CTA |
| **Enter / Space** | Activa el CTA |
| **Shift + Tab** | Foco al elemento anterior |

#### Atributos ARIA
| Atributo | Valor | Cuándo |
|----------|-------|--------|
| \`aria-disabled="true"\` | automático | Cuando \`disabled=true\` — mantiene el tab order |
| \`aria-hidden="true"\` | en el ícono | El ícono es decorativo; el texto del ng-content es el nombre |

#### Anuncio en lectores de pantalla
- Estado normal: *"Comenzar ahora, botón"*
- Estado deshabilitado: *"Comenzar ahora, botón, deshabilitado"*

#### Auditoría v1 → v2
| Hallazgo v1 (Cortés, feb 2026) | Criterio WCAG | Resolución en v2 |
|--------------------------------|---------------|------------------|
| CTA sin contenedor interactivo — solo texto estilizado | 2.5.8, 4.1.2 | Implementado como \`<button>\` semántico con padding y área táctil definida |
| Sin foco visible en el sistema de diseño | 2.4.7 | Doble anillo de foco con tokens de color |
| Hover como único diferenciador de interactividad | 1.4.1 | Gradiente visible en estado default; \`aria-disabled\` para estado inactivo |
| Área interactiva no garantizada | 2.5.8 | \`min-height: 48px\` + pseudoelemento \`::before\` para touch target |

### Buenas prácticas
✅ Usa texto de acción claro y específico: *"Iniciar prueba gratuita"*, no *"Clic aquí"* o *"Más info"*.
✅ Un solo CTA por sección — es el botón de mayor jerarquía visual, no debe competir con otros.
✅ Usa \`device="mobile"\` en breakpoints pequeños para escalar el área táctil correctamente.
❌ No uses el CTA como botón secundario o de cancelación — ese rol lo cumple \`pds-button\`.
❌ No desactives el CTA sin comunicar al usuario por qué no puede usarlo (agrega un helper text o tooltip).
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<PdsCtaComponent & { label: string }>;

// ── Sandbox ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default — Sandbox',
  args: { device: 'desktop', disabled: false, iconName: 'arrow_forward', label: 'Comenzar ahora' },
  render: (args) => ({
    props: args,
    template: `
      <pds-cta [device]="device" [disabled]="disabled" [iconName]="iconName">
        {{ label }}
      </pds-cta>
    `,
  }),
};

// ── Desktop vs Mobile ─────────────────────────────────────────────────────────

export const DeviceVariants: Story = {
  name: 'Desktop vs Mobile',
  parameters: {
    docs: {
      description: {
        story: `
La variante \`mobile\` reduce el tamaño de texto e ícono para adaptarse a pantallas pequeñas
y aumenta el área táctil para cumplir con los requisitos de accesibilidad en dispositivos táctiles.
        `,
      },
    },
  },
  render: () => ({
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:24px;align-items:center">
        <div>
          <p style="font-family:Poppins;font-size:12px;color:#687C8E;margin:0 0 8px">Desktop</p>
          <pds-cta device="desktop">Comenzar ahora</pds-cta>
        </div>
        <div>
          <p style="font-family:Poppins;font-size:12px;color:#687C8E;margin:0 0 8px">Mobile</p>
          <pds-cta device="mobile">Comenzar ahora</pds-cta>
        </div>
      </div>
    `,
  }),
};

// ── Con íconos personalizados ─────────────────────────────────────────────────

export const CustomIcons: Story = {
  name: 'Con íconos personalizados',
  render: () => ({
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:16px;align-items:center">
        <pds-cta iconName="arrow_forward">Registrarse</pds-cta>
        <pds-cta iconName="school">Ver cursos</pds-cta>
        <pds-cta iconName="download">Descargar app</pds-cta>
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
Usa \`aria-disabled="true"\` para mantener el CTA en el tab order.
Los lectores de pantalla anuncian el estado deshabilitado sin necesidad de foco en el elemento.
        `,
      },
    },
  },
  render: () => ({
    template: `
      <div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap">
        <pds-cta [disabled]="false">Activo</pds-cta>
        <pds-cta [disabled]="true">Deshabilitado</pds-cta>
      </div>
    `,
  }),
};

// ── En contexto de landing ────────────────────────────────────────────────────

export const InLandingContext: Story = {
  name: 'En contexto de landing',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'El CTA en su contexto natural — como acción principal acompañada de texto de apoyo.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="text-align:center;padding:32px;font-family:Poppins">
        <h2 style="font-size:32px;font-weight:600;color:#0F385A;margin:0 0 8px">
          Transforma tu aprendizaje
        </h2>
        <p style="font-size:16px;color:#50606E;margin:0 0 24px;font-family:'Open Sans'">
          Accede a más de 500 programas del Politécnico Grancolombiano
        </p>
        <pds-cta device="desktop">Comenzar ahora</pds-cta>
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
Usa **Tab** para enfocar el CTA. El anillo de foco doble debe ser claramente visible
sobre el gradiente de fondo del botón.
La acción es activable con **Enter** o **Space** sin necesidad de mouse.
        `,
      },
    },
  },
  render: () => ({
    template: `
      <div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap">
        <pds-cta>Registrarse (Tab aquí)</pds-cta>
        <pds-cta [disabled]="true">Deshabilitado (también tabulable)</pds-cta>
      </div>
    `,
  }),
};
