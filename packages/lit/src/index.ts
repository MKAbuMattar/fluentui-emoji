import {LitElement, nothing} from 'lit';
import type {DirectiveResult} from 'lit/directive.js';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';

export type FluentEmojiIcon = {
  slug: string;
  style: 'flat' | 'high-contrast' | 'modern';
  attrs: Record<string, string>;
  html: string;
};

const registry = new Map<string, FluentEmojiIcon>();

/** Makes icons usable by name: `<fluent-emoji name="rocket">`. */
export const register = (...icons: FluentEmojiIcon[]): void => {
  for (const icon of icons) registry.set(`${icon.style}/${icon.slug}`, icon);
};

const esc = (v: string): string =>
  v.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');

/** Raw SVG markup for an icon. */
export const emojiSvg = (icon: FluentEmojiIcon, label?: string): string => {
  const attrs = Object.entries(icon.attrs)
    .map(([k, v]) => ` ${k}="${esc(v)}"`)
    .join('');
  const aria = label ? ` aria-label="${esc(label)}"` : ' aria-hidden="true"';
  return `<svg${attrs} role="img"${aria}>${icon.html}</svg>`;
};

/** For use inside your own `html` templates: `${emojiTemplate(Rocket)}`. */
export const emojiTemplate = (
  icon: FluentEmojiIcon,
  label?: string,
): DirectiveResult => unsafeHTML(emojiSvg(icon, label));

/**
 * `<fluent-emoji>` Lit element. Renders into light DOM so the SVG inherits
 * page styles. Icons resolve from the registry or the `icon` property.
 */
export class FluentEmojiElement extends LitElement {
  static properties = {
    name: {type: String},
    variant: {type: String},
    label: {type: String},
    icon: {attribute: false},
  };

  declare name?: string;
  declare variant?: FluentEmojiIcon['style'];
  declare label?: string;
  declare icon?: FluentEmojiIcon;

  protected override createRenderRoot() {
    return this;
  }

  protected override render() {
    const icon =
      this.icon ??
      (this.name
        ? registry.get(`${this.variant ?? 'flat'}/${this.name}`)
        : undefined);
    return icon ? emojiTemplate(icon, this.label) : nothing;
  }
}

/** Defines the element (browser only). */
export const defineFluentEmoji = (tag = 'fluent-emoji'): void => {
  if (!customElements.get(tag)) customElements.define(tag, FluentEmojiElement);
};
