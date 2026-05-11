import React from 'react';
import styles from './FigmaEmbed.module.css';

interface FigmaEmbedProps {
  /** Figma node-id, e.g. "37:20705" */
  nodeId: string;
  /** Display label for the link */
  label?: string;
}

// Set FIGMA_FILE_KEY in docusaurus.config.ts customFields, or replace this default.
const FILE_KEY =
  (typeof globalThis !== 'undefined' &&
    (globalThis as any).__FIGMA_FILE_KEY__) ||
  'FIGMA_FILE_KEY';

function buildFigmaUrl(nodeId: string): string {
  const encoded = encodeURIComponent(nodeId);
  return `https://www.figma.com/design/${FILE_KEY}?node-id=${encoded}`;
}

export default function FigmaEmbed({
  nodeId,
  label = 'Ver especificación en Figma',
}: FigmaEmbedProps): JSX.Element {
  return (
    <a
      href={buildFigmaUrl(nodeId)}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.figmaLink}
      aria-label={`${label} (abre en una nueva pestaña)`}
    >
      <svg
        className={styles.figmaIcon}
        width="16"
        height="16"
        viewBox="0 0 38 57"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M19 28.5A9.5 9.5 0 1 1 28.5 19 9.51 9.51 0 0 1 19 28.5Z" fill="#1ABCFE" />
        <path d="M9.5 57A9.5 9.5 0 0 1 19 47.5V38H9.5A9.5 9.5 0 0 0 9.5 57Z" fill="#0ACF83" />
        <path d="M0 28.5A9.5 9.5 0 0 1 9.5 19H19v19H9.5A9.5 9.5 0 0 1 0 28.5Z" fill="#A259FF" />
        <path d="M0 9.5A9.5 9.5 0 0 1 9.5 0H19v19H9.5A9.5 9.5 0 0 1 0 9.5Z" fill="#F24E1E" />
        <path d="M19 0h9.5a9.5 9.5 0 0 1 0 19H19V0Z" fill="#FF7262" />
      </svg>
      {label}
      <svg
        className={styles.externalIcon}
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15,3 21,3 21,9" />
        <line x1="10" y1="14" x2="21" y2="3" />
      </svg>
    </a>
  );
}
