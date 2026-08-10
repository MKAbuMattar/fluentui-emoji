# @fluentui-emoji/react

## 2.0.0-beta.0

### Major Changes

- 9bfbe2d: Monorepo consolidation — the `fluentui-emoji` and `react-fluentui-emoji` packages
  move to the `@fluentui-emoji` scope with a new Astro package:

  - `fluentui-emoji` → `@fluentui-emoji/svg`: typed metadata, `getEmoji`/`getEmojiPath`
    helpers, dual ESM+CJS.
  - `react-fluentui-emoji` → `@fluentui-emoji/react`: tree-shakeable per-style entries
    (`/flat`, `/high-contrast`, `/modern`), per-icon imports, dual ESM+CJS,
    `title` prop for accessible labels.
  - New `@fluentui-emoji/astro`: build-time inlined SVG, zero client JS.
