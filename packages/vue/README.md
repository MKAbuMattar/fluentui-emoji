# @fluentui-emoji/vue

[Fluent UI Emoji](https://github.com/microsoft/fluentui-emoji) as tree-shakeable,
typed Vue 3 components — 3,145 emojis in `flat`, `high-contrast`, and `modern` styles.
Dual ESM + CJS.

**Docs:** https://fluentui-emoji.mkabumattar.com · **This package:** [npm](https://www.npmjs.com/package/@fluentui-emoji/vue) · **All packages:** [@fluentui-emoji](https://www.npmjs.com/org/fluentui-emoji)

## Install

```sh
pnpm add @fluentui-emoji/vue
```

## Usage

```vue
<script setup>
import {Rocket} from '@fluentui-emoji/vue/flat';
// or per-icon: import Rocket from '@fluentui-emoji/vue/modern/rocket';
</script>

<template>
  <Rocket width="32" />
  <Rocket title="Rocket launch" />  <!-- accessible: role="img" + aria-label -->
</template>
```

Styles: `@fluentui-emoji/vue/flat`, `/high-contrast`, `/modern`.
Extra attributes land on the root `<svg>`. Without `title` the icon is `aria-hidden`.

## License

[MIT](https://github.com/MKAbuMattar/fluentui-emoji/blob/main/LICENSE).
Emoji assets © Microsoft, [MIT licensed](https://github.com/microsoft/fluentui-emoji/blob/main/LICENSE).
