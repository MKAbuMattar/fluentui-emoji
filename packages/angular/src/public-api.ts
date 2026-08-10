import {
  Directive,
  ElementRef,
  Input,
  inject,
  type OnChanges,
} from '@angular/core';

export type FluentEmojiIcon = {
  slug: string;
  style: 'flat' | 'high-contrast' | 'modern';
  attrs: Record<string, string>;
  html: string;
};

const registry = new Map<string, FluentEmojiIcon>();

/** Makes icons usable by name in the directive. */
export const register = (...icons: FluentEmojiIcon[]): void => {
  for (const icon of icons) registry.set(`${icon.style}/${icon.slug}`, icon);
};

const esc = (v: string): string =>
  v.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');

/** Raw SVG markup for a registered icon; empty string when unknown. */
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

/**
 * Standalone directive rendering a registered emoji into the host element.
 *
 * ```html
 * <span fluentEmoji="rocket"></span>
 * <span fluentEmoji="rocket" emojiStyle="modern" emojiLabel="Rocket"></span>
 * ```
 */
@Directive({selector: '[fluentEmoji]', standalone: true})
export class FluentEmojiDirective implements OnChanges {
  @Input({required: true}) fluentEmoji!: string;
  @Input() emojiStyle: FluentEmojiIcon['style'] = 'flat';
  @Input() emojiLabel?: string;

  readonly #el = inject<ElementRef<HTMLElement>>(ElementRef);

  ngOnChanges(): void {
    this.#el.nativeElement.innerHTML = emojiHtml(
      this.fluentEmoji,
      this.emojiStyle,
      this.emojiLabel,
    );
  }
}
