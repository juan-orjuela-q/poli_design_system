// Exposes the Figma file key as a browser global so FigmaEmbed can build URLs
// without needing to import docusaurus config from every MDX page.
import siteConfig from '@generated/docusaurus.config';

if (typeof globalThis !== 'undefined') {
  (globalThis as any).__FIGMA_FILE_KEY__ =
    (siteConfig.customFields as any)?.figmaFileKey ?? 'FIGMA_FILE_KEY';
}
