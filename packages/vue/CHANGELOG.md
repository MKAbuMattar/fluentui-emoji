# @fluentui-emoji/vue

## 2.1.0

### Minor Changes

- c675cc8: - **`currentColor` for the high-contrast set** — high-contrast emojis are
  monochrome and now inherit CSS `color`, so `color: red` just works.
  - **Skin-tone metadata** — tone variants (already shipped as their own slugs)
    now carry `base` and `tone` fields in `metadata.json` and the `EmojiEntry` type.
  - `"./package.json"` added to every package's exports map.
  - `engines.node >= 18` declared.

## 2.0.0

### Major Changes

- 09d4ad4: New framework packages, all generated from the same optimized SVG assets:

  - `@fluentui-emoji/vue` — typed Vue 3 components, dual ESM+CJS
  - `@fluentui-emoji/preact` — typed Preact components, dual ESM+CJS
  - `@fluentui-emoji/solid` — SolidJS components with DOM/SSR/`solid`-condition builds
  - `@fluentui-emoji/svelte` — Svelte 5 `Emoji` component + tree-shakeable icon data
  - `@fluentui-emoji/web-components` — framework-less `<fluent-emoji>` custom element
  - `@fluentui-emoji/alpine` — Alpine.js `x-fluent-emoji` directive + `$fluentEmoji` magic
