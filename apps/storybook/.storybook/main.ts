import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: [
    // Páginas de Foundations (Color, Typography, Effects, Workflows)
    '../../../src/stories/**/*.mdx',
    // Historias de los componentes pds-*
    '../../../packages/components/src/**/*.stories.@(ts|mdx)',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  staticDirs: ['../public'],
};

export default config;
