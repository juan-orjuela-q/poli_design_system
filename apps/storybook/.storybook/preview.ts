import type { Preview } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '../../../documentation.json';
import { poliTheme } from './poli-theme';

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
      theme: poliTheme,
    },
    a11y: {
      manual: false,
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'landmark-one-main', enabled: false },
          { id: 'region', enabled: false },
        ],
      },
    },
  },
};

export default preview;
