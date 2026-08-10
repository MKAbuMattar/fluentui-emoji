# @fluentui-emoji/astro

[Fluent UI Emoji](https://github.com/microsoft/fluentui-emoji) for Astro —
the SVG is inlined at build time, so pages ship **zero client JS**.

## Install

```sh
pnpm add @fluentui-emoji/astro
```

## Usage

```astro
---
import {Emoji} from '@fluentui-emoji/astro';
---

<Emoji name="rocket" />
<Emoji name="rocket" variant="high-contrast" width="32" />
<Emoji name="party-popper" title="Celebration!" />
```

- `name` — typed emoji slug (3,145 available)
- `variant` — `flat` (default) · `high-contrast` · `modern`
- `title` — accessible label; omitted → `aria-hidden`
- any other attribute is passed to the root `<svg>`

Need the raw string (endpoints, MDX helpers)? `loadEmojiSvg(name, variant, attrs)`.

## License

[MIT](https://github.com/MKAbuMattar/fluentui-emoji/blob/main/LICENSE).
Emoji assets © Microsoft, [MIT licensed](https://github.com/microsoft/fluentui-emoji/blob/main/LICENSE).
