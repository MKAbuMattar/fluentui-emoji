# @fluentui-emoji/solid

[Fluent UI Emoji](https://github.com/microsoft/fluentui-emoji) as tree-shakeable,
typed SolidJS components — 3,145 emojis in `flat`, `high-contrast`, and `modern` styles.
Ships DOM, SSR, and `solid`-condition JSX source builds.

## Install

```sh
pnpm add @fluentui-emoji/solid
```

## Usage

```tsx
import {Rocket} from '@fluentui-emoji/solid/flat';
// or per-icon: import Rocket from '@fluentui-emoji/solid/modern/rocket';

<Rocket width={32} />
<Rocket title="Rocket launch" />  // accessible: role="img" + aria-label
```

Styles: `@fluentui-emoji/solid/flat`, `/high-contrast`, `/modern`.
Extra props land on the root `<svg>`. Without `title` the icon is `aria-hidden`.

## License

[MIT](https://github.com/MKAbuMattar/fluentui-emoji/blob/main/LICENSE).
Emoji assets © Microsoft, [MIT licensed](https://github.com/microsoft/fluentui-emoji/blob/main/LICENSE).
