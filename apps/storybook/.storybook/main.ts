import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: [
    '../../../src/**/*.stories.@(ts|mdx)',
    '../../../src/**/*.mdx',
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
