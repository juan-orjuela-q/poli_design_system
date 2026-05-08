#!/usr/bin/env ts-node
/**
 * audit-contrast.ts
 *
 * Audita las variables CSS de color en packages/tokens/src/
 * verificando que los pares text/background cumplan WCAG 2.1
 * contraste mínimo (AA: 4.5:1 normal, 3:1 large).
 *
 * Uso:
 *   npx ts-node scripts/audit-contrast.ts
 *   npx ts-node scripts/audit-contrast.ts --level AAA
 */

import * as fs from 'fs';
import * as path from 'path';

const TOKENS_SRC = path.join(__dirname, '../packages/tokens/src');

// Convierte color CSS hex/rgb a luminancia relativa
function hexToRgb(hex: string): [number, number, number] | null {
  const clean = hex.replace('#', '');
  if (clean.length === 3) {
    const r = parseInt(clean[0] + clean[0], 16);
    const g = parseInt(clean[1] + clean[1], 16);
    const b = parseInt(clean[2] + clean[2], 16);
    return [r, g, b];
  }
  if (clean.length === 6) {
    return [
      parseInt(clean.slice(0, 2), 16),
      parseInt(clean.slice(2, 4), 16),
      parseInt(clean.slice(4, 6), 16),
    ];
  }
  return null;
}

function relativeLuminance(r: number, g: number, b: number): number {
  const sRGB = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
}

function contrastRatio(l1: number, l2: number): number {
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function parseHexColorsFromFile(filePath: string): Map<string, string> {
  const content = fs.readFileSync(filePath, 'utf-8');
  const result = new Map<string, string>();
  const varRegex = /--([\w-]+)\s*:\s*(#[0-9a-fA-F]{3,6})\s*;/g;
  let match: RegExpExecArray | null;

  while ((match = varRegex.exec(content)) !== null) {
    result.set(`--${match[1]}`, match[2]);
  }

  return result;
}

function main() {
  const levelArg = process.argv.find((a) => a.startsWith('--level='))?.split('=')[1] ?? 'AA';
  const minRatio = levelArg === 'AAA' ? 7 : 4.5;
  const minRatioLarge = levelArg === 'AAA' ? 4.5 : 3;

  console.log(`\n🔍 Auditoría de contraste WCAG ${levelArg} (mínimo ${minRatio}:1)\n`);

  if (!fs.existsSync(TOKENS_SRC)) {
    console.error(`No se encontró: ${TOKENS_SRC}`);
    process.exit(1);
  }

  const cssFiles = fs.readdirSync(TOKENS_SRC).filter((f) => f.endsWith('.css'));
  const allColors = new Map<string, string>();

  for (const file of cssFiles) {
    const colors = parseHexColorsFromFile(path.join(TOKENS_SRC, file));
    colors.forEach((v, k) => allColors.set(k, v));
  }

  console.log(`Total de variables de color con valor hex: ${allColors.size}`);

  // Pares conocidos text/bg del DS
  const pairsToCheck = [
    ['--color-text-primary', '--color-surface-default'],
    ['--color-text-secondary', '--color-surface-default'],
    ['--color-text-on-primary', '--color-action-primary'],
    ['--color-text-on-primary', '--color-action-primary-hover'],
  ];

  let issues = 0;
  let checked = 0;

  for (const [textVar, bgVar] of pairsToCheck) {
    const textHex = allColors.get(textVar);
    const bgHex = allColors.get(bgVar);

    if (!textHex || !bgHex) continue;

    const textRgb = hexToRgb(textHex);
    const bgRgb = hexToRgb(bgHex);

    if (!textRgb || !bgRgb) continue;

    const l1 = relativeLuminance(...textRgb);
    const l2 = relativeLuminance(...bgRgb);
    const ratio = contrastRatio(l1, l2);
    const passes = ratio >= minRatio;

    checked++;
    const icon = passes ? '✓' : '✗';
    const status = passes ? 'PASS' : 'FAIL';

    console.log(`${icon} ${status} ${ratio.toFixed(2)}:1 — ${textVar} / ${bgVar}`);
    if (!passes) issues++;
  }

  console.log(`\nResultado: ${checked - issues}/${checked} pares verificados pasan WCAG ${levelArg}`);

  if (issues > 0) {
    console.warn(`\n⚠ ${issues} problema(s) de contraste encontrado(s). Revisar tokens.css`);
    process.exit(1);
  } else {
    console.log('\n✓ Todos los pares verificados cumplen WCAG');
  }
}

main();
