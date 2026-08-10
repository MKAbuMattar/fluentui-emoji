# @fluentui-emoji/svg

[Fluent UI Emoji](https://github.com/microsoft/fluentui-emoji) as optimized SVGs —
3,145 emojis in `flat`, `high-contrast`, and `modern` styles — with typed metadata.

Successor of the deprecated [`fluentui-emoji`](https://www.npmjs.com/package/fluentui-emoji) package.

## Install

```sh
pnpm add @fluentui-emoji/svg
```

## Usage

```ts
import {metadata, getEmoji, getEmojiPath} from '@fluentui-emoji/svg';
import type {EmojiSlug, EmojiStyle} from '@fluentui-emoji/svg';

getEmoji('rocket');                 // {slug: 'rocket', name: 'Rocket', styles: [...]}
getEmojiPath('rocket', 'flat');     // '@fluentui-emoji/svg/icons/flat/rocket.svg'
```

Import an SVG directly (bundler):

```ts
import rocket from '@fluentui-emoji/svg/icons/flat/rocket.svg';
```

Or grab the raw metadata: `import meta from '@fluentui-emoji/svg/metadata.json'`.

## License

[MIT](https://github.com/MKAbuMattar/fluentui-emoji/blob/main/LICENSE).
Emoji assets © Microsoft, [MIT licensed](https://github.com/microsoft/fluentui-emoji/blob/main/LICENSE).
