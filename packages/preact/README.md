# @fluentui-emoji/preact

[Fluent UI Emoji](https://github.com/microsoft/fluentui-emoji) as tree-shakeable,
typed Preact components — 3,145 emojis in `flat`, `high-contrast`, and `modern` styles.
Dual ESM + CJS. Preact 10+.

## Install

```sh
pnpm add @fluentui-emoji/preact
```

## Usage

```tsx
import {Rocket} from '@fluentui-emoji/preact/flat';
// or per-icon: import Rocket from '@fluentui-emoji/preact/modern/rocket';

<Rocket width={32} />
<Rocket title="Rocket launch" />  // accessible: role="img" + aria-label
```

Styles: `@fluentui-emoji/preact/flat`, `/high-contrast`, `/modern`.
Extra props land on the root `<svg>`. Without `title` the icon is `aria-hidden`.

## License

[MIT](https://github.com/MKAbuMattar/fluentui-emoji/blob/main/LICENSE).
Emoji assets © Microsoft, [MIT licensed](https://github.com/microsoft/fluentui-emoji/blob/main/LICENSE).
