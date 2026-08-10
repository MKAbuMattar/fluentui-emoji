---
'@fluentui-emoji/svg': minor
'@fluentui-emoji/react': minor
'@fluentui-emoji/preact': minor
'@fluentui-emoji/vue': minor
'@fluentui-emoji/solid': minor
'@fluentui-emoji/svelte': minor
'@fluentui-emoji/astro': minor
'@fluentui-emoji/angular': minor
'@fluentui-emoji/lit': minor
'@fluentui-emoji/web-components': minor
'@fluentui-emoji/alpine': minor
'@fluentui-emoji/htmx': minor
---

- **`currentColor` for the high-contrast set** — high-contrast emojis are
  monochrome and now inherit CSS `color`, so `color: red` just works.
- **Skin-tone metadata** — tone variants (already shipped as their own slugs)
  now carry `base` and `tone` fields in `metadata.json` and the `EmojiEntry` type.
- `"./package.json"` added to every package's exports map.
- `engines.node >= 18` declared.
