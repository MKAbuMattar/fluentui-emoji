# fluentui-emoji

[Fluent UI Emoji](https://github.com/microsoft/fluentui-emoji) — Microsoft's familiar,
friendly, modern emoji — packaged for every stack, with fully automated releases.

**Docs:** https://fluentui-emoji.mkabumattar.com · **All packages on npm:** [@fluentui-emoji](https://www.npmjs.com/org/fluentui-emoji)

## Packages

| Package | Description | npm |
|---|---|---|
| [`@fluentui-emoji/svg`](packages/svg) | Optimized SVGs (flat, high-contrast, modern) + typed metadata | [npm](https://www.npmjs.com/package/@fluentui-emoji/svg) |
| [`@fluentui-emoji/react`](packages/react) | Tree-shakeable typed React components | [npm](https://www.npmjs.com/package/@fluentui-emoji/react) |
| [`@fluentui-emoji/preact`](packages/preact) | Tree-shakeable typed Preact components | [npm](https://www.npmjs.com/package/@fluentui-emoji/preact) |
| [`@fluentui-emoji/vue`](packages/vue) | Tree-shakeable typed Vue 3 components | [npm](https://www.npmjs.com/package/@fluentui-emoji/vue) |
| [`@fluentui-emoji/solid`](packages/solid) | SolidJS components (DOM, SSR, and `solid`-condition builds) | [npm](https://www.npmjs.com/package/@fluentui-emoji/solid) |
| [`@fluentui-emoji/svelte`](packages/svelte) | Svelte 5 `Emoji` component + tree-shakeable icon data | [npm](https://www.npmjs.com/package/@fluentui-emoji/svelte) |
| [`@fluentui-emoji/astro`](packages/astro) | Zero-JS Astro component, SVG inlined at build time | [npm](https://www.npmjs.com/package/@fluentui-emoji/astro) |
| [`@fluentui-emoji/angular`](packages/angular) | Standalone `fluentEmoji` directive (Angular 17+) | [npm](https://www.npmjs.com/package/@fluentui-emoji/angular) |
| [`@fluentui-emoji/lit`](packages/lit) | `<fluent-emoji>` LitElement + template helpers | [npm](https://www.npmjs.com/package/@fluentui-emoji/lit) |
| [`@fluentui-emoji/web-components`](packages/web-components) | Framework-less `<fluent-emoji>` custom element | [npm](https://www.npmjs.com/package/@fluentui-emoji/web-components) |
| [`@fluentui-emoji/alpine`](packages/alpine) | Alpine.js directive + magic | [npm](https://www.npmjs.com/package/@fluentui-emoji/alpine) |
| [`@fluentui-emoji/htmx`](packages/htmx) | Server handler serving emoji fragments for htmx | [npm](https://www.npmjs.com/package/@fluentui-emoji/htmx) |
| [`@fluentui-emoji/react-native`](packages/react-native) | React Native components on react-native-svg | [npm](https://www.npmjs.com/package/@fluentui-emoji/react-native) |
| [`@fluentui-emoji/qwik`](packages/qwik) | Typed Qwik components | [npm](https://www.npmjs.com/package/@fluentui-emoji/qwik) |
| [`@fluentui-emoji/iconify`](packages/iconify) | Iconify JSON collections (unplugin-icons, Tailwind) | [npm](https://www.npmjs.com/package/@fluentui-emoji/iconify) |
| [`@fluentui-emoji/sprite`](packages/sprite) | SVG symbol sprites for use-href sheets | [npm](https://www.npmjs.com/package/@fluentui-emoji/sprite) |

## Release channels

- `latest` — stable, published when the auto-generated Version Packages PR merges
- `beta` — pre-releases from the `next` branch (`x.y.z-beta.N`)
- `canary` — snapshot of every `main` merge (`@fluentui-emoji/react@canary`)

New upstream emoji land automatically: a weekly workflow syncs
`microsoft/fluentui-emoji`, opens a PR, and merging it rides the release train.
No release step in this repo is manual.

## Development

```sh
pnpm install
pnpm sync      # scrape upstream → optimize → assets/ + metadata.json
pnpm build     # build all packages
pnpm lint
```

Previously: [`archived-fluentui-emoji`](https://github.com/MKAbuMattar/archived-fluentui-emoji),
[`archived-react-fluentui-emoji`](https://github.com/MKAbuMattar/archived-react-fluentui-emoji),
[`archived-public-fluentui-emoji`](https://github.com/MKAbuMattar/archived-public-fluentui-emoji).
The old npm names `fluentui-emoji` and `react-fluentui-emoji` are deprecated in favor of the scope.

Emoji assets are © Microsoft, [MIT licensed](https://github.com/microsoft/fluentui-emoji/blob/main/LICENSE).
This repo and packages: [MIT](LICENSE).
