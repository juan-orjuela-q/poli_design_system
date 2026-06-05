import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Poli Design System',
  tagline: 'Componentes accesibles para el ecosistema digital del Politécnico Grancolombiano',
  favicon: 'img/favicon.ico',

  url: 'https://juan-orjuela-q.github.io',
  baseUrl: '/poli_design_system/docs/',

  organizationName: 'juan-orjuela-q',
  projectName: 'poli_design_system',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // ⚙️ Reemplaza este valor con la file key real de Figma.
  // Encuéntrala en la URL del archivo: figma.com/design/{FILE_KEY}/...
  customFields: {
    figmaFileKey: 'zSX8SWEPoztBiWxTpdiaUs',
  },

  clientModules: ['./src/clientModules/figmaGlobal.ts'],

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
      title: 'Poli Design System',
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
          href: 'https://juan-orjuela-q.github.io/poli_design_system/',
          label: 'Storybook',
          position: 'right',
        },
        {
          href: 'https://github.com/juan-orjuela-q/poli_design_system',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} Politécnico Grancolombiano. Desarrollado por <a style="color:#dffd68"href="https://appicua.com/" target="_blank" rel="noopener noreferrer">Appicua</a>.`,
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

