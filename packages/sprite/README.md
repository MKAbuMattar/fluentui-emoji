# @fluentui-emoji/sprite

[Fluent UI Emoji](https://github.com/microsoft/fluentui-emoji) as SVG symbol sprites — one `<use href>` sheet per set, ideal for pages with many emojis — 3,145 emojis in `flat`, `high-contrast`, and `modern` sets.

**Docs:** https://fluentui-emoji.mkabumattar.com · **This package:** [npm](https://www.npmjs.com/package/@fluentui-emoji/sprite) · **All packages:** [@fluentui-emoji](https://www.npmjs.com/org/fluentui-emoji)

## Install

```sh
pnpm add @fluentui-emoji/sprite
```

## Usage

```html
<!-- copy dist/flat.svg into your static assets, then: -->
<svg width="32" height="32"><use href="/sprites/flat.svg#rocket" /></svg>
```

```ts
import {spriteHref} from "@fluentui-emoji/sprite";
spriteHref("/sprites/flat.svg", "rocket"); // "/sprites/flat.svg#rocket"
```

## License

[MIT](https://github.com/MKAbuMattar/fluentui-emoji/blob/main/LICENSE).
Emoji assets © Microsoft, [MIT licensed](https://github.com/microsoft/fluentui-emoji/blob/main/LICENSE).
