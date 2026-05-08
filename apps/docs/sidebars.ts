import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  foundationsSidebar: [
    {
      type: 'category',
      label: 'Fundamentos',
      items: [
        'foundations/introduccion',
        'foundations/tokens',
        'foundations/colores',
        'foundations/tipografia',
        'foundations/espaciado',
        'foundations/accesibilidad',
      ],
    },
    {
      type: 'category',
      label: 'Guías',
      items: [
        'guides/instalacion',
        'guides/consumo',
        'guides/migracion',
      ],
    },
  ],
  componentsSidebar: [
    {
      type: 'category',
      label: 'Acciones',
      items: [
        'components/button',
        'components/icon-button',
        'components/cta',
        'components/link',
      ],
    },
    {
      type: 'category',
      label: 'Formularios',
      items: [
        'components/input-field',
        'components/textarea-field',
        'components/select-field',
        'components/checkbox',
        'components/checkbox-group',
        'components/radio',
        'components/radio-group',
        'components/toggle',
        'components/range',
        'components/date-picker',
        'components/time-picker',
        'components/file-uploader',
      ],
    },
    {
      type: 'category',
      label: 'Feedback',
      items: [
        'components/badge',
        'components/tag',
        'components/notification',
        'components/loading-circle',
        'components/progress-bar',
        'components/helper-text',
        'components/tooltip',
      ],
    },
    {
      type: 'category',
      label: 'Navegación',
      items: [
        'components/breadcrumb',
        'components/tabs',
        'components/sidenav',
        'components/paginator',
        'components/stepper',
        'components/stepper-compact',
      ],
    },
    {
      type: 'category',
      label: 'Contenido',
      items: [
        'components/accordion',
        'components/card',
        'components/stat-card',
        'components/table',
        'components/code-block',
        'components/avatar-button',
        'components/icon',
      ],
    },
    {
      type: 'category',
      label: 'Overlays',
      items: [
        'components/dialog',
        'components/modal',
      ],
    },
  ],
};

export default sidebars;
