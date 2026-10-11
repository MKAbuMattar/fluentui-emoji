export type SpriteSet = 'flat' | 'high-contrast' | 'modern';

export const sets: readonly SpriteSet[] = [
  'flat',
  'high-contrast',
  'modern',
] as const;

/**
 * Fragment URL for one icon in a sprite you serve yourself:
 * `spriteHref('/sprites/flat.svg', 'rocket')` -> `/sprites/flat.svg#rocket`.
 */
export const spriteHref = (spriteUrl: string, slug: string): string =>
  `${spriteUrl}#${slug}`;

/** Package path of a sprite file, resolvable by bundlers. */
export const spritePath = (set: SpriteSet): string =>
  `@fluentui-emoji/sprite/${set}.svg`;
