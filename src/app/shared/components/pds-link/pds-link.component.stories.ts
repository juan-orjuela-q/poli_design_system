import { Meta, StoryObj } from '@storybook/angular';
import { PdsLinkComponent } from './pds-link.component';

const meta: Meta<PdsLinkComponent> = {
  title: 'Poli Design System / 04. Actions / Link',
  component: PdsLinkComponent,
  tags: ['autodocs'],
  argTypes: {
    href: { control: 'text', description: 'URL de destino del enlace' },
    target: {
      control: 'select',
      options: ['_self', '_blank', '_parent', '_top'],
      description: 'Comportamiento de apertura del enlace',
    },
    external: { control: 'boolean', description: 'Si true, añade rel="noopener noreferrer" e ícono de enlace externo' },
  },
  parameters: {
    docs: {
      description: {
        component: `
Enlace de texto semántico (\`<a>\`) del DS v2. Soporta apertura en nueva pestaña con protección
de seguridad automática y señal visual para enlaces externos.

### Cuándo usarlo
- Para navegar a otra página o sección dentro de la misma app (\`target="_self"\`).
- Para abrir recursos externos en nueva pestaña (\`external=true\`).
- Como texto de acción secundaria dentro de un párrafo o formulario (p. ej. "¿Olvidaste tu contraseña?").

### Cuándo NO usarlo
- No usar como reemplazo de un botón de acción (enviar, guardar) — usar \`pds-button\`.
- No usar \`<a>\` sin \`href\` para acciones JavaScript — ese patrón viola la semántica HTML y WCAG 4.1.2.

### API
\`\`\`html
<!-- Enlace interno -->
<pds-link href="/inicio">Ir al inicio</pds-link>

<!-- Enlace externo con señal visual -->
<pds-link href="https://wcag.com" [external]="true" target="_blank">
  Ver estándar WCAG 2.2
</pds-link>
\`\`\`

| Input      | Tipo                                          | Default     | Descripción |
|------------|-----------------------------------------------|-------------|-------------|
| \`href\`   | \`string\`                                    | \`'#'\`     | URL de destino |
| \`target\` | \`'_self'\\|'_blank'\\|'_parent'\\|'_top'\`   | \`'_self'\` | Comportamiento de apertura |
| \`external\` | \`boolean\`                                 | \`false\`   | true = añade \`rel="noopener noreferrer"\` + ícono externo |

---

### Accesibilidad — WCAG 2.2

#### Criterios aplicables
| Criterio | Nivel | Aplicación |
|----------|-------|------------|
| **1.4.1 Uso del color** | A | El enlace se distingue del texto circundante por subrayado, no solo por color |
| **1.4.3 Contraste mínimo** | AA | Texto del enlace ≥ 4.5:1 sobre el fondo |
| **2.1.1 Teclado** | A | Operable con Tab y Enter nativamente por ser \`<a>\` |
| **2.4.4 Propósito del enlace** | AA | El texto del ng-content debe describir el destino sin necesitar contexto adicional |
| **2.4.7 Foco visible** | AA | Anillo de foco con doble box-shadow |
| **2.5.8 Tamaño del objetivo** | AA | El área clicable debe ser suficientemente grande (min 24×24px en contexto inline) |
| **4.1.2 Nombre, rol, valor** | A | Elemento \`<a>\` con \`href\` — semántica nativa correcta |

#### Navegación por teclado
| Tecla | Acción |
|-------|--------|
| **Tab** | Mueve el foco al enlace |
| **Enter** | Activa el enlace (navega al destino) |
| **Shift + Tab** | Foco al enlace anterior |

#### Atributos ARIA
| Atributo | Valor | Cuándo |
|----------|-------|--------|
| \`rel="noopener noreferrer"\` | automático | Cuando \`external=true\` — protege contra ataques de redirección |
| \`target="_blank"\` | según input | Cuando \`target="_blank"\` — el ícono externo avisa al usuario visualmente |
| aria en el ícono externo | \`aria-hidden="true"\` | El ícono de enlace externo es decorativo |

#### Anuncio en lectores de pantalla
- NVDA/VoiceOver leen el texto del enlace seguido de *"enlace"*.
- Si el enlace abre nueva pestaña, el texto debe indicarlo: *"Ver estándar WCAG 2.2 (abre en nueva pestaña)"*
  — o el ícono externo debe tener un \`aria-label\` explicativo.

> **Para dev:** Cuando uses \`target="_blank"\`, incluye en el ng-content una advertencia textual visible
> o asegúrate de que el ícono externo tenga \`ariaLabel\` con *"(abre en nueva pestaña)"* para cumplir WCAG 2.4.4.

#### Auditoría v1 → v2
| Hallazgo v1 (Cortés, feb 2026) | Criterio WCAG | Resolución en v2 |
|--------------------------------|---------------|------------------|
| Foco no definido en el componente botón tipo Link | 2.4.7 | \`pds-link\` usa \`<a>\` nativo con focus visible por box-shadow |
| Área interactiva no garantizada (sin contenedor) | 2.5.8 | El \`<a>\` ocupa el área del texto; en contextos inline el dev debe garantizar padding suficiente |
| Sin protección en enlaces externos | — | \`rel="noopener noreferrer"\` automático cuando \`external=true\` |

### Buenas prácticas
✅ Escribe textos de enlace descriptivos que tengan sentido fuera de contexto: *"Ver política de privacidad"*, no *"Haz clic aquí"*.
✅ Usa \`external=true\` + \`target="_blank"\` juntos para enlaces externos.
✅ Si el enlace está en un párrafo, asegúrate de que sea distinguible del texto (subrayado ya incluido).
❌ No uses \`href="#"\` para acciones JavaScript — usa \`<pds-button>\` o \`<button>\`.
❌ No escribas *"clic aquí"*, *"más información"* o *"leer más"* sin contexto — viola WCAG 2.4.4.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<PdsLinkComponent>;

// ── Sandbox ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default — Sandbox',
  args: { href: '#', target: '_self', external: false },
  render: (args) => ({
    props: args,
    template: `<pds-link [href]="href" [target]="target" [external]="external">Enlace de ejemplo</pds-link>`,
  }),
};

// ── Variantes ─────────────────────────────────────────────────────────────────

export const InternalLink: Story = {
  name: 'Interno — misma pestaña',
  render: () => ({
    template: `
      <p style="font-family:'Open Sans';font-size:16px;color:#21272D">
        Para más detalles, consulta la
        <pds-link href="/politica-privacidad">política de privacidad</pds-link>
        del Politécnico.
      </p>
    `,
  }),
};

export const ExternalLink: Story = {
  name: 'Externo — nueva pestaña',
  parameters: {
    docs: {
      description: {
        story: `
Con \`external=true\` el componente añade automáticamente \`rel="noopener noreferrer"\`
y muestra un ícono de enlace externo para señalizar visualmente que se abrirá en nueva pestaña.
        `,
      },
    },
  },
  render: () => ({
    template: `
      <p style="font-family:'Open Sans';font-size:16px;color:#21272D">
        Consulta las
        <pds-link href="https://www.w3.org/TR/WCAG22/" [external]="true" target="_blank">
          Pautas WCAG 2.2 (abre en nueva pestaña)
        </pds-link>
        para entender los criterios de accesibilidad.
      </p>
    `,
  }),
};

export const InContext: Story = {
  name: 'En contexto — párrafo',
  render: () => ({
    template: `
      <div style="max-width:480px;font-family:'Open Sans';font-size:16px;color:#21272D;line-height:1.6">
        <p>Al continuar, aceptas nuestros
          <pds-link href="/terminos">términos de uso</pds-link>
          y nuestra
          <pds-link href="/privacidad">política de privacidad</pds-link>.
        </p>
        <p>¿Tienes dudas? Visita nuestro
          <pds-link href="https://soporte.poli.edu.co" [external]="true" target="_blank">
            portal de soporte (abre en nueva pestaña)
          </pds-link>.
        </p>
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
Usa **Tab** para enfocar el enlace y verifica el anillo de foco.
El enlace es operable con **Enter** por su semántica nativa \`<a href>\`.
        `,
      },
    },
  },
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;font-family:'Open Sans'">
        <pds-link href="#">Enlace interno (Tab aquí)</pds-link>
        <pds-link href="https://wcag.com" [external]="true" target="_blank">Enlace externo (nueva pestaña)</pds-link>
      </div>
    `,
  }),
};
