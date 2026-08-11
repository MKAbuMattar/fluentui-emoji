# @fluentui-emoji/react

[Fluent UI Emoji](https://github.com/microsoft/fluentui-emoji) as tree-shakeable,
typed React components — 3,145 emojis in `flat`, `high-contrast`, and `modern` styles.

Successor of the deprecated [`react-fluentui-emoji`](https://www.npmjs.com/package/react-fluentui-emoji) package. Dual ESM + CJS.

**Docs:** https://fluentui-emoji.mkabumattar.com · **This package:** [npm](https://www.npmjs.com/package/@fluentui-emoji/react) · **All packages:** [@fluentui-emoji](https://www.npmjs.com/org/fluentui-emoji)

## Install

```sh
pnpm add @fluentui-emoji/react
```

## Usage

```tsx
import {Rocket} from '@fluentui-emoji/react/flat';
// or per-icon (no barrel): import Rocket from '@fluentui-emoji/react/modern/rocket';

<Rocket width={32} />                     // decorative: aria-hidden
<Rocket title="Rocket launch" />          // accessible: role="img" + aria-label
```

Styles: `@fluentui-emoji/react/flat`, `/high-contrast`, `/modern`.
Every component forwards its ref and accepts all `SVGProps<SVGSVGElement>`.
Icon names are the PascalCased slug (`1st-place-medal` → `Emoji1stPlaceMedal`).

## License

[MIT](https://github.com/MKAbuMattar/fluentui-emoji/blob/main/LICENSE).
Emoji assets © Microsoft, [MIT licensed](https://github.com/microsoft/fluentui-emoji/blob/main/LICENSE).
