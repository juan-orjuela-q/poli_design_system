#!/usr/bin/env ts-node
/**
 * sync-tokens.ts
 *
 * Sincroniza las variables CSS de packages/tokens/src/ con
 * un JSON estructurado para consumo por herramientas externas
 * (Figma Tokens Plugin, Style Dictionary, etc.).
 *
 * Uso:
 *   npx ts-node scripts/sync-tokens.ts
 *
 * Output: packages/tokens/tokens.json
 */

import * as fs from 'fs';
import * as path from 'path';

const TOKENS_SRC = path.join(__dirname, '../packages/tokens/src');
const OUTPUT = path.join(__dirname, '../packages/tokens/tokens.json');

interface TokenEntry {
  value: string;
  type: string;
  file: string;
}

function extractCssVariables(cssContent: string, fileName: string): Record<string, TokenEntry> {
  const result: Record<string, TokenEntry> = {};
  const varRegex = /--([\w-]+)\s*:\s*([^;]+);/g;
  let match: RegExpExecArray | null;

  while ((match = varRegex.exec(cssContent)) !== null) {
    const name = match[1].trim();
    const value = match[2].trim();

    // Inferir tipo del token por nombre
    let type = 'other';
    if (name.includes('color') || name.includes('bg') || name.includes('surface') || name.includes('text') || name.includes('border')) {
      type = 'color';
    } else if (name.includes('font-size') || name.includes('typescale')) {
      type = 'fontSize';
    } else if (name.includes('font-weight')) {
      type = 'fontWeight';
    } else if (name.includes('line-height')) {
      type = 'lineHeight';
    } else if (name.includes('spacing') || name.includes('gap') || name.includes('padding') || name.includes('margin')) {
      type = 'spacing';
    } else if (name.includes('radius')) {
      type = 'borderRadius';
    } else if (name.includes('shadow')) {
      type = 'boxShadow';
    } else if (name.includes('font-family') || name.includes('family')) {
      type = 'fontFamily';
    }

    result[`--${name}`] = { value, type, file: fileName };
  }

  return result;
}

function main() {
  if (!fs.existsSync(TOKENS_SRC)) {
    console.error(`No se encontró el directorio de tokens: ${TOKENS_SRC}`);
    process.exit(1);
  }

  const cssFiles = fs.readdirSync(TOKENS_SRC).filter((f) => f.endsWith('.css'));
  const allTokens: Record<string, Record<string, TokenEntry>> = {};

  for (const file of cssFiles) {
    const content = fs.readFileSync(path.join(TOKENS_SRC, file), 'utf-8');
    const vars = extractCssVariables(content, file);
    const group = file.replace('.css', '');
    allTokens[group] = vars;
    console.log(`  → ${file}: ${Object.keys(vars).length} tokens`);
  }

  const totalTokens = Object.values(allTokens).reduce(
    (sum, group) => sum + Object.keys(group).length,
    0
  );

  fs.writeFileSync(OUTPUT, JSON.stringify(allTokens, null, 2), 'utf-8');
  console.log(`\n✓ tokens.json generado: ${totalTokens} tokens en ${cssFiles.length} archivos`);
  console.log(`  Output: ${OUTPUT}`);
}

main();
