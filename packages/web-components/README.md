# @fluentui-emoji/web-components

[Fluent UI Emoji](https://github.com/microsoft/fluentui-emoji) as a framework-less
`<fluent-emoji>` custom element — 3,145 emojis in `flat`, `high-contrast`, and
`modern` styles. Works in any page, any framework, no build required.

**Docs:** https://fluentui-emoji.mkabumattar.com · **This package:** [npm](https://www.npmjs.com/package/@fluentui-emoji/web-components) · **All packages:** [@fluentui-emoji](https://www.npmjs.com/org/fluentui-emoji)

## Install

```sh
pnpm add @fluentui-emoji/web-components
```

## Usage

```js
import {defineFluentEmoji, register} from '@fluentui-emoji/web-components';
import {Rocket} from '@fluentui-emoji/web-components/flat';

defineFluentEmoji();   // defines <fluent-emoji>
register(Rocket);      // makes it available by name
```

```html
<fluent-emoji name="rocket"></fluent-emoji>
<fluent-emoji name="rocket" variant="modern" label="Rocket"></fluent-emoji>
```

Or skip the registry and set the icon directly:

```js
document.querySelector('fluent-emoji').icon = Rocket;
```

Only imported icons end up in your bundle. Without `label` the svg is `aria-hidden`.

## License

[MIT](https://github.com/MKAbuMattar/fluentui-emoji/blob/main/LICENSE).
Emoji assets © Microsoft, [MIT licensed](https://github.com/microsoft/fluentui-emoji/blob/main/LICENSE).
