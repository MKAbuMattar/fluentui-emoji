# @fluentui-emoji/svg

## 2.1.1

### Patch Changes

- b9210e9: Correct `exports` types conditions: CJS consumers now resolve `index.d.cts`
  instead of ESM-flavored types (publint strict clean).

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

- 9bfbe2d: Monorepo consolidation — the `fluentui-emoji` and `react-fluentui-emoji` packages
  move to the `@fluentui-emoji` scope with a new Astro package:

  - `fluentui-emoji` → `@fluentui-emoji/svg`: typed metadata, `getEmoji`/`getEmojiPath`
    helpers, dual ESM+CJS.
  - `react-fluentui-emoji` → `@fluentui-emoji/react`: tree-shakeable per-style entries
    (`/flat`, `/high-contrast`, `/modern`), per-icon imports, dual ESM+CJS,
    `title` prop for accessible labels.
  - New `@fluentui-emoji/astro`: build-time inlined SVG, zero client JS.
