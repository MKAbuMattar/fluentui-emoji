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

const TONES = [
  'medium-light',
  'medium-dark',
  'default',
  'light',
  'medium',
  'dark',
];

const allSlugs = new Set(styleMap.keys());

/** slug -> {base, tone} when it belongs to a skin-tone family (3+ toned siblings). */
const toneOf = (slug: string): {base: string; tone: string} | undefined => {
  const tone = TONES.find((t) => slug.endsWith(`-${t}`));
  if (!tone) return undefined;
  const base = slug.slice(0, -(tone.length + 1));
  const siblings = TONES.filter((t) => allSlugs.has(`${base}-${t}`)).length;
  return siblings >= 3 ? {base, tone} : undefined;
};

const emojis = [...styleMap.keys()].sort().map((slug) => {
  const toned = toneOf(slug);
  return {
    slug,
    name: titleCase(slug),
    styles: styleMap.get(slug),
    ...(toned ? {base: toned.base, tone: toned.tone} : {}),
  };
});

fs.writeFileSync(
  path.join(ASSETS, 'metadata.json'),
  `${JSON.stringify({count: emojis.length, styles: STYLES, emojis}, null, 2)}\n`,
);
console.log(`assets/metadata.json: ${emojis.length} emojis`);
