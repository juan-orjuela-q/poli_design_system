import { Meta, StoryFn } from '@storybook/angular';
import { provideRouter } from '@angular/router';
import { BreadcrumbComponent, BreadcrumbItem } from './breadcrumb.component';

export default {
  title: 'DS v1 (Legacy)/Breadcrumb',
  component: BreadcrumbComponent,
  tags: ['autodocs'],

  // 👇 Proveedores globales para todos los stories de este archivo
  applicationConfig: {
    providers: [
      provideRouter([]), // Router vacío; suficiente para RouterLink
    ],
  },

  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
### Descripción
El **Breadcrumb** muestra la ruta de navegación jerárquica hasta la página actual.  
Limita cada nivel a 30 caracteres (con truncado “…”) y separa los niveles por 5 px con “›”.  
El último nivel se resalta con \`font-weight: 600\`.

### Buenas prácticas
- **Profundidad moderada** (≤ 5 niveles).  
- **Texto conciso**; el truncado es respaldo, no excusa para nombres vagos.  
- **Coherencia visual**: mismo separador, 5 px; evita iconos superfluos.  
- **Accesibilidad**: \`aria-label\` en el contenedor y \`aria-current="page"\` en el ítem actual.  
- **Complemento de la nav principal**, no su reemplazo.
        `,
      },
    },
  },
} as Meta<BreadcrumbComponent>;

const Template: StoryFn<BreadcrumbComponent> = (args: BreadcrumbComponent) => ({
  props: args,
});

export const Basico = Template.bind({});
Basico.args = {
  items: [
    { label: 'Inicio', route: '/' },
    { label: 'Roles', route: '/roles' },
    { label: 'Administración', route: '/roles/admin' },
  ] as BreadcrumbItem[],
};

export const ConTextoLargo = Template.bind({});
ConTextoLargo.args = {
  items: [
    { label: 'Inicio', route: '/' },
    {
      label: 'Configuración avanzada de la plataforma educativa del Politécnico',
      route: '/config/advanced',
    },
    { label: 'Detalle', route: '/config/advanced/detail' },
  ] as BreadcrumbItem[],
};
