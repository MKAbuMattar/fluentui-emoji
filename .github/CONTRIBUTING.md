# Contributing to fluentui-emoji

Thanks for helping improve the project. It is a pnpm monorepo publishing the
`@fluentui-emoji/*` packages, generated from [microsoft/fluentui-emoji](https://github.com/microsoft/fluentui-emoji).

## How the repo works

- `assets/` is the **generated source of truth** — `pnpm sync` pulls the upstream
  emojis, optimizes them, and writes `assets/` + `metadata.json`. **Never edit
  `assets/` by hand**; fix the sync or generator scripts instead.
- `packages/*` are thin: a small runtime core each, plus a `build.ts` that
  generates the per-emoji modules from `assets/`. Fixes usually belong in the
  core or the emitter, not in generated output.
- `docs/` is the Astro + Starlight site (https://fluentui-emoji.mkabumattar.com).

## Ways to contribute

- **Fix a package** — a bug in a runtime core, an exports-map problem, a type issue.
- **Improve the generators** — better slugs, smaller output, new build targets.
- **Add a framework package** — copy the closest existing package (they all share
  `scripts/generate/svg-lib.ts`) and follow its shape: typed core, generated
  modules, smoke test, README.
- **Improve the docs** — code-only pages, no images, no decorative emoji renders.

## Workflow

```sh
pnpm install
pnpm sync        # regenerate assets/ from upstream (only when needed)
pnpm build       # build all packages + docs
pnpm test        # smoke tests for every package
pnpm lint        # biome
```

1. Branch from `main`; releases flow through Changesets.
2. **Every user-facing change needs a changeset**: `pnpm changeset` (pick the
   affected packages and bump level).
3. CI must be green: lint, build, and every package smoke test.
4. Conventional-commit messages (`feat:`, `fix:`, `docs:`, `ci:`); no
   `Co-Authored-By` or AI-assistant trailers.

Releases are fully automated — merging to `main` publishes a `canary`, the bot's
"Version Packages" PR publishes `latest`, and the `next` branch publishes `beta`.
Do not run `npm publish` by hand.

## Licensing

Code is MIT. Emoji assets are © Microsoft (MIT licensed).
