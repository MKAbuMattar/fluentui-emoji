import fs from 'node:fs/promises';
import type {IncomingMessage, ServerResponse} from 'node:http';
import {createRequire} from 'node:module';
import type {EmojiSlug, EmojiStyle} from '@fluentui-emoji/svg';

const resolve = createRequire(import.meta.url).resolve;

const esc = (v: string): string =>
  v.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');

/**
 * SVG fragment for an emoji, ready to swap into the page.
 * Runs on the server — htmx fetches the result.
 */
export const emojiHtml = async (
  name: EmojiSlug,
  style: EmojiStyle = 'flat',
  label?: string,
): Promise<string> => {
  const file = resolve(`@fluentui-emoji/svg/icons/${style}/${name}.svg`);
  const svg = await fs.readFile(file, 'utf8');
  const aria = label
    ? ` role="img" aria-label="${esc(label)}"`
    : ' role="img" aria-hidden="true"';
  return svg.replace('<svg', `<svg${aria}`);
};

const STYLES = new Set(['flat', 'high-contrast', 'modern']);
const SLUG = /^[a-z0-9-]+$/;

/**
 * Request handler serving emoji fragments for htmx. Works with node:http,
 * Express, and anything with the same (req, res, next?) shape.
 *
 * ```js
 * app.use(fluentEmojiHandler());   // GET /fluentui-emoji/:style/:slug?label=...
 * ```
 * ```html
 * <span hx-get="/fluentui-emoji/flat/rocket" hx-trigger="load"></span>
 * ```
 */
export const fluentEmojiHandler = ({prefix = '/fluentui-emoji'} = {}) => {
  return async (
    req: IncomingMessage,
    res: ServerResponse,
    next?: () => void,
  ): Promise<void> => {
    const url = new URL(req.url ?? '/', 'http://local');
    if (!url.pathname.startsWith(`${prefix}/`)) {
      if (next) return next();
      res.statusCode = 404;
      res.end();
      return;
    }
    const [style, slug] = url.pathname.slice(prefix.length + 1).split('/');
    if (!STYLES.has(style) || !slug || !SLUG.test(slug)) {
      res.statusCode = 404;
      res.end('unknown emoji');
      return;
    }
    try {
      const html = await emojiHtml(
        slug as EmojiSlug,
        style as EmojiStyle,
        url.searchParams.get('label') ?? undefined,
      );
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      res.end(html);
    } catch {
      res.statusCode = 404;
      res.end('unknown emoji');
    }
  };
};
