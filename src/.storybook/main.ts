import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  "stories": [
    '../**/*.stories.@(ts|mdx)'
  ],
  "addons": [
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y"
  ],
  "framework": {
    "name": "@storybook/angular",
    "options": {}
  }
};

export default config;
