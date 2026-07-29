import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const isProduction = process.env.NODE_ENV === 'production';

/**
 * Destino del despliegue — configurable por variables de entorno.
 *
 * Los valores por defecto corresponden al GitHub Pages de desarrollo de Appicua.
 * Para publicar en otro hosting (p. ej. Azure Static Web Apps), definir:
 *
 *   DOCS_URL=https://mi-dominio.poli.edu.co
 *   DOCS_BASE_URL=/
 *
 * DOCS_BASE_URL debe empezar y terminar con "/". Si el portal se sirve en la
 * raíz del dominio, el valor correcto es "/".
 */
const SITE_URL = process.env.DOCS_URL ?? 'https://juan-orjuela-q.github.io';
const BASE_URL = process.env.DOCS_BASE_URL ?? (isProduction ? '/poli_design_system/docs/' : '/');

/** Enlaces externos de la barra de navegación. */
const STORYBOOK_URL =
  process.env.DOCS_STORYBOOK_URL ?? 'https://juan-orjuela-q.github.io/poli_design_system/';
const REPO_URL =
  process.env.DOCS_REPO_URL ?? 'https://github.com/juan-orjuela-q/poli_design_system';

const config: Config = {
  title: 'Poli Design System',
  tagline: 'Componentes accesibles para el ecosistema digital del Politécnico Grancolombiano',
  favicon: 'img/favicon.ico',

  url: SITE_URL,
  baseUrl: BASE_URL,

  organizationName: process.env.DOCS_ORG ?? 'juan-orjuela-q',
  projectName: process.env.DOCS_PROJECT ?? 'poli_design_system',

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
          href: STORYBOOK_URL,
          label: 'Storybook',
          position: 'right',
        },
        {
          href: REPO_URL,
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

