export type FluentEmojiIcon = {
  slug: string;
  style: 'flat' | 'high-contrast' | 'modern';
  attrs: Record<string, string>;
  html: string;
};

const registry = new Map<string, FluentEmojiIcon>();

/** Makes an icon usable by name: `<fluent-emoji name="rocket" variant="flat">`. */
export const register = (...icons: FluentEmojiIcon[]): void => {
  for (const icon of icons) registry.set(`${icon.style}/${icon.slug}`, icon);
};

const render = (el: HTMLElement, icon: FluentEmojiIcon | undefined): void => {
  if (!icon) {
    el.replaceChildren();
    return;
  }
  const label = el.getAttribute('label');
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  for (const [k, v] of Object.entries(icon.attrs)) svg.setAttribute(k, v);
  svg.setAttribute('role', 'img');
  if (label) svg.setAttribute('aria-label', label);
  else svg.setAttribute('aria-hidden', 'true');
  svg.innerHTML = icon.html;
  el.replaceChildren(svg);
};

/**
 * Defines the `<fluent-emoji>` custom element (browser only).
 *
 * ```html
 * <fluent-emoji name="rocket" variant="modern" label="Rocket"></fluent-emoji>
 * ```
 *
 * Icons resolve from the registry (`register(Rocket)`) or via the `icon`
 * property. `variant` defaults to `flat`; without `label` the svg is
 * aria-hidden.
 */
export const defineFluentEmoji = (tag = 'fluent-emoji'): void => {
  if (typeof HTMLElement === 'undefined') {
    throw new Error('@fluentui-emoji/web-components requires a DOM');
  }
  if (customElements.get(tag)) return;

  class FluentEmojiElement extends HTMLElement {
    static observedAttributes = ['name', 'variant', 'label'];
    #icon: FluentEmojiIcon | undefined;

    get icon(): FluentEmojiIcon | undefined {
      return this.#icon;
    }

    set icon(icon: FluentEmojiIcon | undefined) {
      this.#icon = icon;
      render(this, this.#resolve());
    }

    #resolve(): FluentEmojiIcon | undefined {
      if (this.#icon) return this.#icon;
      const name = this.getAttribute('name');
      const variant = this.getAttribute('variant') ?? 'flat';
      return name ? registry.get(`${variant}/${name}`) : undefined;
    }

    connectedCallback() {
      render(this, this.#resolve());
    }

    attributeChangedCallback() {
      if (this.isConnected) render(this, this.#resolve());
    }
  }

  customElements.define(tag, FluentEmojiElement);
};
