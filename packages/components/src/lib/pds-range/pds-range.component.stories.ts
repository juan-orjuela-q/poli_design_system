import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { PdsRangeComponent } from './pds-range.component';

const meta: Meta<PdsRangeComponent> = {
  title: 'Poli Design System / 05. Forms / Form (Range)',
  component: PdsRangeComponent,
  decorators: [moduleMetadata({ imports: [ReactiveFormsModule] })],
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'double'],
      description: 'Modo simple (un thumb) o doble (rango mín-máx)',
    },
    min: { control: 'number', description: 'Valor mínimo del eje' },
    max: { control: 'number', description: 'Valor máximo del eje' },
    step: { control: 'number', description: 'Incremento de cada paso' },
    value: { control: 'number', description: 'Valor inicial (modo single)' },
    showInputs: { control: 'boolean', description: 'Muestra inputs numéricos en los laterales' },
    disabled: { control: 'boolean', description: 'Deshabilitado' },
    label: { control: 'text', description: 'Etiqueta del campo (modo single)' },
    labelMin: { control: 'text', description: 'Etiqueta del input izquierdo (modo double)' },
    labelMax: { control: 'text', description: 'Etiqueta del input derecho (modo double)' },
  },
  parameters: {
    docs: {
      description: {
        component: `
Control deslizante del DS v2. Disponible en modo **single** (un thumb) y **double** (rango mín-máx).
Implementado con \`<input type="range">\` nativo para compatibilidad de teclado y AT.
Compatible con Angular Reactive Forms (CVA).

### Cuándo usarlo
- Para seleccionar un valor dentro de un rango continuo (precio, edad, porcentaje).
- Para seleccionar un rango de valores (precio mínimo-máximo, rango de fechas en formato numérico).
- Cuando el valor exacto es menos importante que la posición relativa en el rango.

### Cuándo NO usarlo
- No usar cuando el usuario necesita ingresar un valor exacto — usar \`pds-input-field\` de tipo número.
- No usar sin \`label\` — el slider sin etiqueta no comunica qué está ajustando el usuario.

### API
\`\`\`html
<!-- Modo simple -->
<pds-range
  label="Precio máximo"
  [min]="0" [max]="1000" [step]="10"
  [value]="500"
  [showInputs]="true"
  (singleChange)="onPriceChange($event)"
/>

<!-- Modo doble (rango) -->
<pds-range
  type="double"
  [min]="0" [max]="1000" [step]="10"
  labelMin="Precio mín." labelMax="Precio máx."
  [valueMin]="200" [valueMax]="800"
  [showInputs]="true"
  (rangeChange)="onRangeChange($event)"
/>
\`\`\`

| Input       | Tipo           | Default     | Descripción |
|-------------|----------------|-------------|-------------|
| \`type\`     | \`'single'\\|'double'\` | \`'single'\` | Modo simple o doble |
| \`min\`      | \`number\`     | \`0\`       | Valor mínimo del eje |
| \`max\`      | \`number\`     | \`100\`     | Valor máximo del eje |
| \`step\`     | \`number\`     | \`1\`       | Incremento por paso |
| \`value\`    | \`number \\| null\` | \`null\` | Valor inicial (single) |
| \`valueMin\` | \`number \\| null\` | \`null\` | Valor mínimo inicial (double) |
| \`valueMax\` | \`number \\| null\` | \`null\` | Valor máximo inicial (double) |
| \`showInputs\` | \`boolean\` | \`true\`  | Inputs numéricos laterales |
| \`disabled\` | \`boolean\`    | \`false\`   | Deshabilitado |
| \`label\`    | \`string \\| null\` | \`null\` | Etiqueta (single) |
| \`labelMin\` | \`string\`     | \`'Min'\`   | Etiqueta input izquierdo (double) |
| \`labelMax\` | \`string\`     | \`'Max'\`   | Etiqueta input derecho (double) |

---

### Accesibilidad — WCAG 2.2

#### Criterios aplicables
| Criterio | Nivel | Aplicación |
|----------|-------|------------|
| **1.3.3 Características sensoriales** | A | El valor numérico se muestra en texto — no solo por posición visual |
| **1.4.3 Contraste mínimo** | AA | Etiqueta y valores numéricos ≥ 4.5:1 |
| **1.4.11 Contraste no textual** | AA | Thumb y track ≥ 3:1 sobre el fondo |
| **2.1.1 Teclado** | A | \`<input type="range">\` nativo — flechas ajustan el valor, Home/End van a extremos |
| **2.4.7 Foco visible** | AA | Focus ring visible en el thumb del slider |
| **2.5.8 Tamaño del objetivo** | AA | Thumb del slider ≥ 44px de área táctil |
| **3.3.2 Etiquetas o instrucciones** | A | \`label\` obligatorio — describe qué está ajustando el usuario |
| **4.1.2 Nombre, rol, valor** | A | \`role="slider"\` implícito en \`<input type="range">\`; \`aria-valuenow/min/max\` automáticos |

#### Navegación por teclado en el slider
| Tecla | Acción |
|-------|--------|
| **Tab** | Enfoca el thumb del slider |
| **ArrowRight / ArrowUp** | Incrementa el valor en \`step\` |
| **ArrowLeft / ArrowDown** | Decrementa el valor en \`step\` |
| **Home** | Va al valor mínimo |
| **End** | Va al valor máximo |
| **PageUp** | Incremento grande (10×step) |
| **PageDown** | Decremento grande (10×step) |

#### Atributos ARIA (automáticos en input nativo)
| Atributo | Función |
|----------|---------|
| \`role="slider"\` | Identifica el control como deslizador |
| \`aria-valuenow\` | Valor actual |
| \`aria-valuemin\` | Valor mínimo |
| \`aria-valuemax\` | Valor máximo |
| \`aria-label\` / \`aria-labelledby\` | Nombre del control |

#### Anuncio en lectores de pantalla
- Al enfocar: *"Precio máximo, deslizador, 500, mínimo 0, máximo 1000"*
- Al ajustar: *"550"* (el lector anuncia el nuevo valor con cada cambio)

#### Auditoría v1 → v2
| Hallazgo v1 (Cortés, feb 2026) | Criterio WCAG | Resolución en v2 |
|--------------------------------|---------------|------------------|
| Sin label ni unidad — el slider no comunicaba qué ajustaba | 3.3.2 | Inputs \`label\` obligatorio + valor numérico visible |
| Hover con contraste 2.48:1 en el thumb | 1.4.11 | Token semántico del thumb con contraste ≥ 3:1 |
| Handle (thumb) < 44px | 2.5.8 | Thumb con área táctil ≥ 44px |
| Sin valor textual — solo visual | 4.1.2 | Inputs numéricos laterales + \`aria-valuenow\` automático |

### Buenas prácticas
✅ Usa \`label\` siempre — describe qué está ajustando el usuario: *"Precio máximo"*, no *"Slider"*.
✅ Activa \`showInputs=true\` para que el usuario vea y pueda editar el valor exacto.
✅ Usa pasos (\`step\`) que tengan sentido en el contexto: 10 para precios, 1 para edades.
❌ No uses el slider sin etiqueta — los usuarios de AT no sabrán qué están ajustando.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<PdsRangeComponent>;

// ── Sandbox ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default — Sandbox',
  args: {
    type: 'single',
    label: 'Precio máximo',
    min: 0,
    max: 1000,
    step: 10,
    value: 500,
    showInputs: true,
    disabled: false,
  },
};

// ── Modo simple ───────────────────────────────────────────────────────────────

export const SingleMode: Story = {
  name: 'Modo simple (un valor)',
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;max-width:500px">
        <pds-range
          label="Precio máximo (COP)"
          [min]="0" [max]="1000000" [step]="10000"
          [value]="500000"
          [showInputs]="true"
        />
        <pds-range
          label="Porcentaje de descuento"
          [min]="0" [max]="100" [step]="5"
          [value]="25"
          [showInputs]="true"
        />
        <pds-range
          label="Edad mínima"
          [min]="18" [max]="99" [step]="1"
          [value]="30"
          [showInputs]="true"
        />
      </div>
    `,
  }),
};

// ── Modo doble ────────────────────────────────────────────────────────────────

export const DoubleMode: Story = {
  name: 'Modo doble (rango mín-máx)',
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;max-width:500px">
        <pds-range
          type="double"
          labelMin="Precio mín."
          labelMax="Precio máx."
          [min]="0" [max]="1000000" [step]="10000"
          [valueMin]="200000" [valueMax]="800000"
          [showInputs]="true"
        />
        <pds-range
          type="double"
          labelMin="Edad mín."
          labelMax="Edad máx."
          [min]="18" [max]="65" [step]="1"
          [valueMin]="25" [valueMax]="45"
          [showInputs]="true"
        />
      </div>
    `,
  }),
};

// ── Deshabilitado ─────────────────────────────────────────────────────────────

export const DisabledState: Story = {
  name: 'Estado deshabilitado',
  args: {
    label: 'Precio máximo (no modificable)',
    min: 0,
    max: 1000,
    step: 10,
    value: 500,
    showInputs: true,
    disabled: true,
  },
};

// ── Accesibilidad ─────────────────────────────────────────────────────────────

export const A11yKeyboardControl: Story = {
  name: 'A11y — Control por teclado (Tab + flechas)',
  parameters: {
    docs: {
      description: {
        story: `
Usa **Tab** para enfocar el slider. Luego:
- **ArrowRight / ArrowUp**: incrementa el valor
- **ArrowLeft / ArrowDown**: decrementa el valor
- **Home**: va al valor mínimo
- **End**: va al valor máximo

NVDA/VoiceOver anuncian el valor actual con cada cambio de flecha.
        `,
      },
    },
  },
  args: {
    label: 'Volumen (Tab + flechas para ajustar)',
    min: 0,
    max: 100,
    step: 1,
    value: 50,
    showInputs: true,
  },
};
