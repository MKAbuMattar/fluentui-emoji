export type FluentEmojiIcon = {
  slug: string;
  style: 'flat' | 'high-contrast' | 'modern';
  attrs: Record<string, string>;
  html: string;
};

const registry = new Map<string, FluentEmojiIcon>();

/** Makes icons usable by name in the directive and magic. */
export const register = (...icons: FluentEmojiIcon[]): void => {
  for (const icon of icons) registry.set(`${icon.style}/${icon.slug}`, icon);
};

const esc = (v: string): string =>
  v.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');

/** SVG markup for an icon; empty string when the icon is unknown. */
export const emojiHtml = (
  name: string,
  style: FluentEmojiIcon['style'] = 'flat',
  label?: string,
): string => {
  const icon = registry.get(`${style}/${name}`);
  if (!icon) return '';
  const attrs = Object.entries(icon.attrs)
    .map(([k, v]) => ` ${k}="${esc(v)}"`)
    .join('');
  const aria = label ? ` aria-label="${esc(label)}"` : ' aria-hidden="true"';
  return `<svg${attrs} role="img"${aria}>${icon.html}</svg>`;
};

type Expression =
  | string
  | {name: string; style?: FluentEmojiIcon['style']; label?: string};

/**
 * Alpine plugin: `Alpine.plugin(fluentEmoji)`.
 *
 * ```html
 * <span x-fluent-emoji="'rocket'"></span>
 * <span x-fluent-emoji="{name: 'rocket', style: 'modern', label: 'Rocket'}"></span>
 * <span x-html="$fluentEmoji('rocket', 'flat')"></span>
 * ```
 */
// biome-ignore lint/suspicious/noExplicitAny: Alpine has no bundled types
export default function fluentEmoji(Alpine: any): void {
  Alpine.magic('fluentEmoji', () => emojiHtml);
  Alpine.directive(
    'fluent-emoji',
    // biome-ignore lint/suspicious/noExplicitAny: Alpine directive signature
    (el: HTMLElement, {expression}: any, {evaluateLater, effect}: any) => {
      const getValue = evaluateLater(expression);
      effect(() =>
        getValue((value: Expression) => {
          const opts = typeof value === 'string' ? {name: value} : value;
          el.innerHTML = emojiHtml(opts.name, opts.style, opts.label);
        }),
      );
    },
  );
}
