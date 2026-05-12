import { create } from '@storybook/theming/create';

export const poliTheme = create({
  base: 'light',

  // ── Marca ────────────────────────────────────────────────────────────────
  brandTitle: 'Poli Design System v2',
  brandUrl: 'https://juan-orjuela-q.github.io/poli_design_system/',
  brandImage: '/logo.svg', // archivo en apps/storybook/public/logo.svg
  brandTarget: '_blank',

  // ── Colores de la UI shell ────────────────────────────────────────────────
  // Sidebar / nav
  colorPrimary: '#e0006e',     // magenta brand (action-brand-primary)
  colorSecondary: '#0f385a',   // navy (action-primary-solid-bg)

  // App background
  appBg: '#f4f6f8',            // surface-neutral-subtle
  appContentBg: '#ffffff',     // surface-neutral-canvas
  appPreviewBg: '#ffffff',
  appBorderColor: '#d1dbe3',   // border-neutral-subtle
  appBorderRadius: 10,         // radius-container-sm

  // ── Tipografía ─────────────────────────────────────────────────────────────
  fontBase: '"Open Sans", sans-serif',   // cuerpo de texto
  fontCode: '"IBM Plex Mono", "Fira Code", monospace', // fragmentos de código
  // Títulos/headings → Poppins, aplicado vía CSS en preview-head.html

  // ── Barra de herramientas (toolbar) ───────────────────────────────────────
  barTextColor: '#627380',     // fg-neutral-secondary
  barHoverColor: '#0f385a',    // navy hover
  barSelectedColor: '#e0006e', // magenta para item activo
  barBg: '#ffffff',

  // ── Inputs / controles ────────────────────────────────────────────────────
  inputBg: '#ffffff',
  inputBorder: '#8fa3b0',      // border-neutral-default
  inputTextColor: '#0f2b42',   // fg-neutral-primary
  inputBorderRadius: 10,       // radius-container-sm

  // ── Encabezados de texto ──────────────────────────────────────────────────
  textColor: '#0f2b42',        // fg-neutral-primary
  textMutedColor: '#627380',   // fg-neutral-secondary
  textInverseColor: '#ffffff',
});
