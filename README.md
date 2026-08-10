# fluentui-emoji

[Fluent UI Emoji](https://github.com/microsoft/fluentui-emoji) — Microsoft's familiar,
friendly, modern emoji — packaged for every stack, with fully automated releases.

## Packages

| Package | Description |
|---|---|
| [`@fluentui-emoji/svg`](packages/svg) | Optimized SVGs (flat, high-contrast, modern) + typed metadata |
| [`@fluentui-emoji/react`](packages/react) | Tree-shakeable typed React components |
| [`@fluentui-emoji/astro`](packages/astro) | Zero-JS Astro component, SVG inlined at build time |

More frameworks (Vue, Svelte, Web Components) are planned — same generator core.

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
