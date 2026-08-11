# @fluentui-emoji/alpine

[Fluent UI Emoji](https://github.com/microsoft/fluentui-emoji) for Alpine.js —
an `x-fluent-emoji` directive and `$fluentEmoji` magic with tree-shakeable icon
data. 3,145 emojis in `flat`, `high-contrast`, and `modern` styles.

**Docs:** https://fluentui-emoji.mkabumattar.com · **This package:** [npm](https://www.npmjs.com/package/@fluentui-emoji/alpine) · **All packages:** [@fluentui-emoji](https://www.npmjs.com/org/fluentui-emoji)

## Install

```sh
pnpm add @fluentui-emoji/alpine
```

## Usage

```js
import Alpine from 'alpinejs';
import fluentEmoji, {register} from '@fluentui-emoji/alpine';
import {Rocket} from '@fluentui-emoji/alpine/flat';

register(Rocket);
Alpine.plugin(fluentEmoji);
Alpine.start();
```

```html
<span x-fluent-emoji="'rocket'"></span>
<span x-fluent-emoji="{name: 'rocket', style: 'modern', label: 'Rocket'}"></span>
<span x-data x-html="$fluentEmoji('rocket', 'flat')"></span>
```

Only registered icons end up in your bundle. Without `label` the svg is `aria-hidden`.

## License

[MIT](https://github.com/MKAbuMattar/fluentui-emoji/blob/main/LICENSE).
Emoji assets © Microsoft, [MIT licensed](https://github.com/microsoft/fluentui-emoji/blob/main/LICENSE).
