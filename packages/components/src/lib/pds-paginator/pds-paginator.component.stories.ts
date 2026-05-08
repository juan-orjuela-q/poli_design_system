import type { Meta, StoryObj } from '@storybook/angular';
import { PdsPaginatorComponent } from './pds-paginator.component';

const meta: Meta<PdsPaginatorComponent> = {
  title: 'Poli Design System / 07. Content / Paginator',
  component: PdsPaginatorComponent,
  tags: ['autodocs'],
  argTypes: {
    totalItems: { control: { type: 'number', min: 0 }, description: 'Total de ítems en el conjunto de datos. Requerido.' },
    pageSize: { control: { type: 'number', min: 1 }, description: 'Ítems por página actualmente seleccionada' },
    currentPage: { control: { type: 'number', min: 1 }, description: 'Página actual (1-indexada)' },
    showPageSizeSelector: { control: 'boolean', description: 'Muestra el selector de ítems por página' },
  },
  parameters: {
    docs: {
      description: {
        component: `
Componente de paginación del DS v2 para navegar entre páginas de resultados en tablas y listados.
Incluye controles de primera/anterior/siguiente/última página, indicador de rango y selector de ítems por página.

### Cuándo usarlo
- En tablas, listados y grillas de datos donde el conjunto total supera los 20-50 ítems.
- Cuando el rendimiento o el layout requieren mostrar los datos en bloques.
- Como complemento de \`pds-table\` para conjuntos de datos grandes.

### Cuándo NO usarlo
- No usar para listas cortas (< 20 ítems) — mostrar todo el contenido directamente.
- No usar para feeds infinitos — la paginación implica un total conocido de páginas.

### API
\`\`\`html
<pds-paginator
  [totalItems]="totalItems"
  [pageSize]="pageSize"
  [currentPage]="currentPage"
  [pageSizeOptions]="[10, 20, 50, 100]"
  [showPageSizeSelector]="true"
  (pageChange)="onPageChange($event)"
  (pageSizeChange)="onPageSizeChange($event)"
/>
\`\`\`

| Input                 | Tipo       | Default           | Descripción |
|-----------------------|------------|-------------------|-------------|
| \`totalItems\`         | \`number\` (requerido) | — | Total de ítems |
| \`pageSize\`           | \`number\` | \`20\`            | Ítems por página |
| \`currentPage\`        | \`number\` | \`1\`             | Página actual (1-indexada) |
| \`pageSizeOptions\`    | \`number[]\` | \`[10, 20, 50, 100]\` | Opciones del selector |
| \`showPageSizeSelector\` | \`boolean\` | \`true\`       | Muestra el selector de tamaño |

| Output          | Tipo     | Descripción |
|-----------------|----------|-------------|
| \`pageChange\`    | \`number\` | Número de página al que navegar |
| \`pageSizeChange\` | \`number\` | Nuevo tamaño de página seleccionado |

---

### Accesibilidad — WCAG 2.2

#### Criterios aplicables
| Criterio | Nivel | Aplicación |
|----------|-------|------------|
| **1.3.1 Info y relaciones** | A | El paginador tiene \`<nav aria-label>\` para identificar su función |
| **1.4.3 Contraste mínimo** | AA | Texto del rango e ítems ≥ 4.5:1 sobre fondo |
| **1.4.11 Contraste no textual** | AA | Botones outline ≥ 3:1 sobre fondo de la página |
| **2.1.1 Teclado** | A | Todos los controles operables con Tab/Enter/Space |
| **2.4.7 Foco visible** | AA | Anillo de foco doble en botones de navegación e ítems del dropdown |
| **2.5.8 Tamaño del objetivo** | AA | Botones de navegación ≥ 48×48px |
| **4.1.2 Nombre, rol, valor** | A | Botones de navegación con \`aria-label\` descriptivo; botones deshabilitados con \`aria-disabled\` |

#### Navegación por teclado
| Tecla | Acción |
|-------|--------|
| **Tab** | Navega entre: selector de tamaño, botones primera/anterior/siguiente/última |
| **Enter / Space** | Activa el botón o ítem enfocado |
| **Escape** | Cierra el dropdown del selector de tamaño (si está abierto) |
| **ArrowDown / ArrowUp** | Navega dentro del dropdown de tamaño de página |

#### Atributos ARIA en los botones de navegación
| Botón | aria-label | Cuándo aria-disabled |
|-------|-----------|----------------------|
| Primera página | \`"Primera página"\` | Cuando ya está en la página 1 |
| Página anterior | \`"Página anterior"\` | Cuando ya está en la página 1 |
| Página siguiente | \`"Página siguiente"\` | Cuando ya está en la última página |
| Última página | \`"Última página"\` | Cuando ya está en la última página |

#### Indicador de rango accesible
El texto *"Mostrando X-Y de Z"* es un elemento de solo lectura.
Los lectores de pantalla lo leen al enfocarlo o al navegar por la región.

#### Anuncio en lectores de pantalla
- Botón siguiente habilitado: *"Página siguiente, botón"*
- Botón anterior deshabilitado: *"Página anterior, botón, deshabilitado"*
- Al cambiar de página: el contenido de la tabla/lista cambia y los AT lo anuncian si tiene \`aria-live\`

#### Auditoría v1 → v2
Este componente es nuevo en v2 y fue diseñado desde el inicio conforme a WCAG 2.2 AA.
Los botones de navegación tienen \`aria-label\` descriptivo (no solo íconos sin nombre) y usan
\`aria-disabled\` para mantener el tab order en los extremos de la paginación.

### Buenas prácticas
✅ Conecta \`(pageChange)\` y \`(pageSizeChange)\` a la lógica real de carga de datos.
✅ Cuando cambia la página, mueve el foco al primer elemento de la tabla actualizada para que los lectores de pantalla anuncien el nuevo contenido.
✅ Usa \`aria-live="polite"\` en el contenedor de la tabla para anunciar cuándo los datos cambian.
❌ No uses el paginador con \`totalItems=0\` — muestra un estado vacío en la tabla en su lugar.
❌ No desactives el selector de tamaño sin comunicar al usuario que solo hay una opción disponible.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<PdsPaginatorComponent>;

// ── Sandbox ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default — Sandbox',
  args: {
    totalItems: 237,
    pageSize: 20,
    currentPage: 3,
    showPageSizeSelector: true,
    pageSizeOptions: [10, 20, 50, 100],
  },
};

// ── Primera página ────────────────────────────────────────────────────────────

export const FirstPage: Story = {
  name: 'Primera página (anterior deshabilitado)',
  parameters: {
    docs: {
      description: {
        story: 'En la primera página, los botones "Primera página" y "Página anterior" tienen \`aria-disabled="true"\` y son visibles pero no activables.',
      },
    },
  },
  args: {
    totalItems: 150,
    pageSize: 20,
    currentPage: 1,
    showPageSizeSelector: true,
  },
};

// ── Última página ─────────────────────────────────────────────────────────────

export const LastPage: Story = {
  name: 'Última página (siguiente deshabilitado)',
  args: {
    totalItems: 150,
    pageSize: 20,
    currentPage: 8,
    showPageSizeSelector: true,
  },
};

// ── Sin selector de tamaño ────────────────────────────────────────────────────

export const WithoutPageSizeSelector: Story = {
  name: 'Sin selector de tamaño de página',
  args: {
    totalItems: 85,
    pageSize: 10,
    currentPage: 2,
    showPageSizeSelector: false,
  },
};

// ── Pocos resultados ──────────────────────────────────────────────────────────

export const FewResults: Story = {
  name: 'Pocos resultados (una página)',
  parameters: {
    docs: {
      description: {
        story: 'Con todos los ítems en una sola página, todos los botones de navegación están deshabilitados.',
      },
    },
  },
  args: {
    totalItems: 8,
    pageSize: 20,
    currentPage: 1,
    showPageSizeSelector: true,
  },
};

// ── Con paginación controlada ─────────────────────────────────────────────────

export const Controlled: Story = {
  name: 'Paginación controlada (interactiva)',
  parameters: {
    docs: {
      description: {
        story: 'Ejemplo completamente interactivo. Los botones actualizan la página actual y el rango mostrado.',
      },
    },
  },
  render: () => ({
    props: {
      totalItems: 237,
      pageSize: 20,
      currentPage: 1,
      onPageChange(page: number) { this['currentPage'] = page; },
      onPageSizeChange(size: number) {
        this['pageSize'] = size;
        this['currentPage'] = 1;
      },
    },
    template: `
      <pds-paginator
        [totalItems]="totalItems"
        [pageSize]="pageSize"
        [currentPage]="currentPage"
        [pageSizeOptions]="[10, 20, 50, 100]"
        [showPageSizeSelector]="true"
        (pageChange)="onPageChange($event)"
        (pageSizeChange)="onPageSizeChange($event)"
      />
    `,
  }),
};

// ── Accesibilidad ─────────────────────────────────────────────────────────────

export const A11yAriaLabels: Story = {
  name: 'A11y — aria-labels en botones (inspeccionar)',
  parameters: {
    docs: {
      description: {
        story: `
Abre el inspector de accesibilidad y verifica que cada botón de ícono tiene un \`aria-label\` descriptivo:
- *"Primera página"*, *"Página anterior"*, *"Página siguiente"*, *"Última página"*

Los botones en el extremo actual tienen \`aria-disabled="true"\` — siguen siendo tabulables
para que los lectores de pantalla anuncien por qué no pueden usarse.
        `,
      },
    },
  },
  args: {
    totalItems: 200,
    pageSize: 20,
    currentPage: 5,
    showPageSizeSelector: true,
  },
};

export const A11yFocusVisible: Story = {
  name: 'A11y — Focus visible (Tab para probar)',
  parameters: {
    docs: {
      description: {
        story: 'Usa **Tab** para navegar entre todos los controles del paginador. El anillo de foco doble debe ser visible en el selector de tamaño y en cada botón de navegación.',
      },
    },
  },
  args: {
    totalItems: 237,
    pageSize: 20,
    currentPage: 3,
    showPageSizeSelector: true,
  },
};
