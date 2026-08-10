import type {Component} from 'svelte';
import type {SVGAttributes} from 'svelte/elements';

export type FluentEmojiData = {
  attrs: Record<string, string>;
  html: string;
};

export type EmojiProps = SVGAttributes<SVGSVGElement> & {
  /** Icon data imported from a style entry, e.g. `@fluentui-emoji/svelte/flat` */
  icon: FluentEmojiData;
  /** Accessible label. Without it the emoji is aria-hidden (decorative). */
  title?: string;
};

export declare const Emoji: Component<EmojiProps>;
