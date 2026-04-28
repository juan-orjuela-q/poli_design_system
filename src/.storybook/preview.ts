import type { Preview } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from "../../documentation.json"; 

setCompodocJson(docJson);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      autodocs: true,
    },
    a11y: {
      // Ejecutar axe-core en todas las stories automáticamente
      manual: false,
      config: {
        rules: [
          // Desactivar solo reglas que generan falsos positivos en stories aisladas
          { id: 'color-contrast', enabled: true },
          { id: 'landmark-one-main', enabled: false },
          { id: 'region', enabled: false },
        ],
      },
    },
  },
};

export default preview;
