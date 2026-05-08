import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Poli Design System',
  tagline: 'Componentes accesibles para el ecosistema digital del Politécnico Grancolombiano',
  favicon: 'img/favicon.ico',

  url: 'https://poli-design-system.netlify.app',
  baseUrl: '/',

  organizationName: 'poligran',
  projectName: 'poli-design-system',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'es',
    locales: ['es'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'Poli Design System v2',
      logo: {
        alt: 'Poli DS Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'foundationsSidebar',
          position: 'left',
          label: 'Fundamentos',
        },
        {
          type: 'docSidebar',
          sidebarId: 'componentsSidebar',
          position: 'left',
          label: 'Componentes',
        },
        {
          href: 'http://localhost:6006',
          label: 'Storybook',
          position: 'right',
        },
        {
          href: 'https://github.com/poligran/poli-design-system',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} Politécnico Grancolombiano. Built with Docusaurus.`,
    },
    prism: {
      theme: {
        plain: { color: '#393A34', backgroundColor: '#f6f8fa' },
        styles: [],
      },
      darkTheme: {
        plain: { color: '#F8F8F2', backgroundColor: '#282A36' },
        styles: [],
      },
      additionalLanguages: ['typescript', 'scss', 'bash'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
