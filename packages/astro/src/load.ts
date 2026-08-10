import fs from 'node:fs/promises';
import {createRequire} from 'node:module';
import type {EmojiSlug, EmojiStyle} from '@fluentui-emoji/svg';

const resolve = createRequire(import.meta.url).resolve;

/**
 * Reads an emoji SVG from @fluentui-emoji/svg and injects extra attributes
 * into the root <svg> tag. Runs at build time — the page ships inline SVG,
 * zero client JS.
 */
export const loadEmojiSvg = async (
  name: EmojiSlug,
  style: EmojiStyle = 'flat',
  attrs: Record<string, unknown> = {},
): Promise<string> => {
  const file = resolve(`@fluentui-emoji/svg/icons/${style}/${name}.svg`);
  const svg = await fs.readFile(file, 'utf8');
  const extra = Object.entries(attrs)
    .filter(([, v]) => v !== undefined && v !== null && v !== false)
    .map(([k, v]) => ` ${k}="${String(v).replaceAll('"', '&quot;')}"`)
    .join('');
  return extra ? svg.replace('<svg', `<svg${extra}`) : svg;
};
