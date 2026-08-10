/** Shared helpers for the per-framework icon generators. */
import fs from 'node:fs';
import path from 'node:path';

export const STYLES = ['flat', 'high-contrast', 'modern'] as const;
export type Style = (typeof STYLES)[number];

export const componentName = (slug: string): string => {
  const pascal = slug
    .split('-')
    .map((w) => (w[0] ? w[0].toUpperCase() + w.slice(1) : w))
    .join('');
  return /^\d/.test(pascal) ? `Emoji${pascal}` : pascal;
};

const SVG_RE = /^<svg([^>]*)>([\s\S]*)<\/svg>\s*$/;
const ATTR_RE = /([a-zA-Z:-]+)="([^"]*)"/g;

export const parseSvg = (
  svg: string,
): {attrs: Record<string, string>; html: string} => {
  const m = SVG_RE.exec(svg);
  if (!m) throw new Error('unparseable svg');
  const attrs: Record<string, string> = {};
  for (const [, key, value] of m[1].matchAll(ATTR_RE)) attrs[key] = value;
  return {attrs, html: m[2]};
};

export type Icon = {
  slug: string;
  name: string;
  attrs: Record<string, string>;
  html: string;
};

/** Yields every icon of a style, sorted, with clash-checked component names. */
export function* eachIcon(assetsDir: string, style: Style): Generator<Icon> {
  const seen = new Map<string, string>();
  for (const file of fs.readdirSync(path.join(assetsDir, style)).sort()) {
    if (!file.endsWith('.svg')) continue;
    const slug = file.slice(0, -4);
    const name = componentName(slug);
    const clash = seen.get(name);
    if (clash) throw new Error(`name clash: ${slug} vs ${clash} -> ${name}`);
    seen.set(name, slug);
    const {attrs, html} = parseSvg(
      fs.readFileSync(path.join(assetsDir, style, file), 'utf8'),
    );
    yield {slug, name, attrs, html};
  }
}
