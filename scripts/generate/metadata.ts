/**
 * Builds assets/metadata.json from the synced SVG dirs:
 * every emoji slug, its display name, and which styles it exists in.
 * Packages and the docs gallery are generated from this file.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '../..');
const ASSETS = path.join(ROOT, 'assets');
const STYLES = ['flat', 'high-contrast', 'modern'] as const;

const styleMap = new Map<string, string[]>();
for (const style of STYLES) {
  for (const file of fs.readdirSync(path.join(ASSETS, style))) {
    if (!file.endsWith('.svg')) continue;
    const slug = file.slice(0, -4);
    styleMap.set(slug, [...(styleMap.get(slug) ?? []), style]);
  }
}

const titleCase = (slug: string): string =>
  slug
    .split('-')
    .map((w) => (w[0] ? w[0].toUpperCase() + w.slice(1) : w))
    .join(' ');

const emojis = [...styleMap.keys()].sort().map((slug) => ({
  slug,
  name: titleCase(slug),
  styles: styleMap.get(slug),
}));

fs.writeFileSync(
  path.join(ASSETS, 'metadata.json'),
  `${JSON.stringify({count: emojis.length, styles: STYLES, emojis}, null, 2)}\n`,
);
console.log(`assets/metadata.json: ${emojis.length} emojis`);
