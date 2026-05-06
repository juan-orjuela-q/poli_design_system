import type { Preview } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from "../../documentation.json"; 

setCompodocJson(docJson);

const preview: Preview = {
  parameters: {
    options: {
      // @ts-expect-error Storybook evaluates this callback in a JS runtime context.
      storySort: (a, b) =>
        a.id === b.id
          ? 0
          : a.id.localeCompare(b.id, undefined, { numeric: true }),
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewMode: 'docs',
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
