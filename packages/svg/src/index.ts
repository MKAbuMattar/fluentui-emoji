import metadataJson from '../metadata.json' with {type: 'json'};
import type {EmojiSlug, EmojiStyle} from './emoji.generated';

export type {EmojiSlug, EmojiStyle} from './emoji.generated';

export type EmojiEntry = {
  slug: EmojiSlug;
  name: string;
  styles: EmojiStyle[];
  /** present on skin-tone variants */
  base?: string;
  tone?:
    | 'default'
    | 'light'
    | 'medium-light'
    | 'medium'
    | 'medium-dark'
    | 'dark';
};

export type EmojiMetadata = {
  count: number;
  styles: EmojiStyle[];
  emojis: EmojiEntry[];
};

export const metadata = metadataJson as EmojiMetadata;

const bySlug = new Map(metadata.emojis.map((e) => [e.slug, e]));

/** Metadata entry for one emoji, or undefined if the slug is unknown. */
export const getEmoji = (slug: EmojiSlug): EmojiEntry | undefined =>
  bySlug.get(slug);

/**
 * Package path of an emoji SVG, resolvable by bundlers and
 * `import.meta.resolve` / `require.resolve`.
 */
export const getEmojiPath = (slug: EmojiSlug, style: EmojiStyle): string =>
  `@fluentui-emoji/svg/icons/${style}/${slug}.svg`;
