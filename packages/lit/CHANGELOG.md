# @fluentui-emoji/lit

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

- 0de8164: Three more framework packages:

  - `@fluentui-emoji/angular` — standalone `fluentEmoji` directive (partial-Ivy,
    ng-packagr build) + tree-shakeable icon data
  - `@fluentui-emoji/lit` — `<fluent-emoji>` LitElement and `emojiTemplate`
    helper + tree-shakeable icon data
  - `@fluentui-emoji/htmx` — server handler and `emojiHtml` helper serving
    emoji SVG fragments
