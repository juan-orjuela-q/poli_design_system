import { Meta, StoryObj, applicationConfig, moduleMetadata } from '@storybook/angular';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './tabs.component';

const meta: Meta<TabsComponent> = {
  title: 'Componentes/Tabs',
  component: TabsComponent,
  tags: ['autodocs'],
  decorators: [
    /* Angular Material Tabs requiere providers de animaciones */
    applicationConfig({ providers: [provideNoopAnimations()] }),
    moduleMetadata({
      imports: [CommonModule, TabsComponent],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
## TabsComponent - Sistema de Pestañas Simple y Efectivo

Contenedor de pestañas para organizar contenido en secciones excluyentes que utiliza **proyección de contenido** con control condicional para máxima flexibilidad.

### 🔧 Características principales

- **Proyección de contenido**: Usa \`ng-content\` para insertar cualquier HTML/componente
- **Control condicional**: El contenido se muestra/oculta con \`*ngIf\` basado en \`selectedIndex\`
- **Two-way binding**: Sincronización automática del índice activo con \`[(selectedIndex)]\`
- **Material Design**: Basado en Angular Material Tabs

### 💡 Cómo usar

\`\`\`html
<app-tabs [tabs]="misTabs" [(selectedIndex)]="tabActivo">

  <!-- Contenido del primer tab -->
  <div *ngIf="tabActivo === 0">
    <h3>Contenido del primer tab</h3>
    <p>Cualquier HTML o componente aquí</p>
  </div>

  <!-- Contenido del segundo tab -->
  <div *ngIf="tabActivo === 1">
    <app-mi-componente></app-mi-componente>
  </div>

</app-tabs>
\`\`\`

\`\`\`typescript
misTabs = [
  { label: 'Primera' },
  { label: 'Segunda' }
];
tabActivo = 0; // Two-way binding con [(selectedIndex)]
\`\`\`

### ✅ Buenas prácticas

- **Títulos cortos**: Usa 1–2 palabras para evitar que se corten
- **Máximo 6 pestañas**: Para más secciones, considera agrupar o usar menús desplegables
- **Orden lógico**: Organiza de izquierda a derecha según relevancia
- **Contenido apropiado**: Cada pestaña debe tener contenido sustancial y relacionado
- **Índices consistentes**: Asegúrate de que los índices en \`*ngIf\` coincidan con la posición en el array
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<TabsComponent>;

/* --------------------------- 📖 Historias --------------------------- */

/**
 * ### 🎯 Ejemplo básico con contenido
 *
 * Demuestra el uso estándar con contenido rico en cada pestaña.
 * Incluye texto, listas, y elementos estilizados con interactividad real.
 */
export const EjemploBasico: Story = {
  args: {
    tabs: [
      { label: 'General' },
      { label: 'Detalles' },
      { label: 'Configuración' }
    ],
    selectedIndex: 0,
  },
  render: (args) => ({
    props: {
      ...args,
      selectedTabIndex: args.selectedIndex,
    },
    template: `
      <div style="padding: 20px; max-width: 800px;">
        <h3>Ejemplo de uso del TabsComponent</h3>

        <app-tabs [tabs]="tabs" [(selectedIndex)]="selectedTabIndex">

          <!-- Contenido del Tab 1 -->
          <div *ngIf="selectedTabIndex === 0" style="padding: 24px; background: #f8fafc; border-radius: 8px; margin-top: 16px;">
            <h4>📋 Información General</h4>
            <p>Este es el contenido de la primera pestaña. Aquí puedes incluir formularios, listas, o cualquier contenido HTML.</p>
            <ul>
              <li>✅ Datos básicos del usuario</li>
              <li>✅ Configuración principal</li>
              <li>✅ Información de contacto</li>
            </ul>
          </div>

          <!-- Contenido del Tab 2 -->
          <div *ngIf="selectedTabIndex === 1" style="padding: 24px; background: #f0f9ff; border-radius: 8px; margin-top: 16px;">
            <h4>🔍 Detalles Avanzados</h4>
            <p>Contenido más específico y detallado para usuarios avanzados.</p>
            <div style="background: #dbeafe; padding: 16px; border-radius: 8px; border-left: 4px solid #3b82f6; margin-top: 12px;">
              <strong>💡 Tip:</strong> Puedes incluir cualquier componente o HTML complejo aquí.
            </div>
          </div>

          <!-- Contenido del Tab 3 -->
          <div *ngIf="selectedTabIndex === 2" style="padding: 24px; background: #f0fdf4; border-radius: 8px; margin-top: 16px;">
            <h4>⚙️ Configuraciones</h4>
            <p>Opciones adicionales y configuraciones avanzadas.</p>
            <button style="background: #059669; color: white; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer; margin-top: 12px;">
              Acción de ejemplo
            </button>
          </div>

        </app-tabs>

        <div style="margin-top: 24px; padding: 16px; background: #f3f4f6; border-radius: 8px;">
          <p><strong>Tab activo:</strong> {{ selectedTabIndex + 1 }} - {{ tabs[selectedTabIndex]?.label }}</p>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: `
Implementación básica que muestra cómo usar el TabsComponent con contenido real.
Cada pestaña contiene diferente tipo de contenido y se puede navegar entre ellas.

**Características mostradas:**
- Control condicional con \`*ngIf\`
- Two-way binding con \`[(selectedIndex)]\`
- Contenido rico en cada pestaña
- Indicador del tab activo
        `,
      },
    },
  },
};

/**
 * ### 🔧 Panel administrativo complejo
 *
 * Ejemplo con 5 pestañas para casos de uso complejos como
 * paneles de administración o configuraciones avanzadas.
 */
export const PanelAdmin: Story = {
  args: {
    tabs: [
      { label: 'Dashboard' },
      { label: 'Usuarios' },
      { label: 'Config' },
      { label: 'Reportes' },
      { label: 'Ayuda' }
    ],
    selectedIndex: 2,
  },
  render: (args) => ({
    props: {
      ...args,
      selectedTabIndex: args.selectedIndex,
    },
    template: `
      <div style="padding: 20px; max-width: 900px;">
        <h3>Panel Administrativo - 5 Pestañas</h3>

        <app-tabs [tabs]="tabs" [(selectedIndex)]="selectedTabIndex">

          <!-- Dashboard -->
          <div *ngIf="selectedTabIndex === 0" style="padding: 24px; background: #fef3c7; border-radius: 8px; margin-top: 16px;">
            <h4>📊 Dashboard</h4>
            <p>Vista principal con métricas y estadísticas del sistema.</p>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-top: 16px;">
              <div style="background: white; padding: 16px; border-radius: 8px; text-align: center;">
                <strong style="color: #1f2937; font-size: 24px;">125</strong>
                <p style="margin: 4px 0 0 0; color: #6b7280;">Usuarios activos</p>
              </div>
              <div style="background: white; padding: 16px; border-radius: 8px; text-align: center;">
                <strong style="color: #1f2937; font-size: 24px;">87%</strong>
                <p style="margin: 4px 0 0 0; color: #6b7280;">Rendimiento</p>
              </div>
            </div>
          </div>

          <!-- Usuarios -->
          <div *ngIf="selectedTabIndex === 1" style="padding: 24px; background: #ede9fe; border-radius: 8px; margin-top: 16px;">
            <h4>👥 Usuarios</h4>
            <p>Gestión de usuarios del sistema.</p>
            <div style="margin-top: 16px;">
              <input type="text" placeholder="Buscar usuarios..." style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px;">
            </div>
          </div>

          <!-- Configuración -->
          <div *ngIf="selectedTabIndex === 2" style="padding: 24px; background: #f0f9ff; border-radius: 8px; margin-top: 16px;">
            <h4>⚙️ Configuración</h4>
            <p>Configuraciones del sistema y preferencias.</p>
            <div style="display: flex; flex-direction: column; gap: 12px; max-width: 400px; margin-top: 16px;">
              <label style="display: flex; flex-direction: column;">
                <strong>Nombre del sistema:</strong>
                <input type="text" value="Gestión Académica" style="padding: 8px; margin-top: 4px; border: 1px solid #d1d5db; border-radius: 4px;">
              </label>
              <label style="display: flex; flex-direction: column;">
                <strong>Idioma por defecto:</strong>
                <select style="padding: 8px; margin-top: 4px; border: 1px solid #d1d5db; border-radius: 4px;">
                  <option>Español</option>
                  <option>Inglés</option>
                  <option>Francés</option>
                </select>
              </label>
            </div>
          </div>

          <!-- Reportes -->
          <div *ngIf="selectedTabIndex === 3" style="padding: 24px; background: #fee2e2; border-radius: 8px; margin-top: 16px;">
            <h4>📈 Reportes</h4>
            <p>Generación y visualización de reportes del sistema.</p>
            <div style="margin-top: 16px;">
              <button style="background: #dc2626; color: white; padding: 8px 16px; border: none; border-radius: 4px; margin-right: 8px; cursor: pointer;">
                Generar Reporte Mensual
              </button>
              <button style="background: #7c2d12; color: white; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer;">
                Exportar CSV
              </button>
            </div>
          </div>

          <!-- Ayuda -->
          <div *ngIf="selectedTabIndex === 4" style="padding: 24px; background: #ecfdf5; border-radius: 8px; margin-top: 16px;">
            <h4>❓ Ayuda</h4>
            <p>Documentación y soporte técnico.</p>
            <div style="margin-top: 16px;">
              <a href="#" style="color: #059669; text-decoration: none; display: block; margin-bottom: 8px;">📖 Manual de usuario</a>
              <a href="#" style="color: #059669; text-decoration: none; display: block; margin-bottom: 8px;">🎥 Tutoriales en video</a>
              <a href="#" style="color: #059669; text-decoration: none; display: block;">📞 Contactar soporte</a>
            </div>
          </div>

        </app-tabs>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: `
Panel administrativo con 5 pestañas que demuestra la capacidad del componente
para manejar interfaces complejas con diferentes tipos de contenido en cada sección.

**Contenido incluido:**
- Dashboard con métricas
- Gestión de usuarios con formularios
- Configuraciones del sistema
- Generación de reportes
- Sección de ayuda y documentación

Inicia en la pestaña "Config" (índice 2) para demostrar el control del tab activo.
        `,
      },
    },
  },
};

/**
 * ### 📋 Configuración simple (solo tabs)
 *
 * Muestra solo la estructura de tabs sin contenido proyectado,
 * útil para entender la configuración básica del componente.
 */
export const ConfiguracionSimple: Story = {
  args: {
    tabs: [
      { label: 'General' },
      { label: 'Avanzado' },
      { label: 'Seguridad' }
    ],
    selectedIndex: 1,
  },
  parameters: {
    docs: {
      description: {
        story: `
Configuración básica que muestra solo la estructura de tabs.
En una implementación real, el contenido se agregaría usando proyección de contenido.

**Nota:** Esta historia muestra solo los tabs sin contenido proyectado para
demostrar la configuración mínima necesaria.
        `,
      },
    },
  },
};
