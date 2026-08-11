# @fluentui-emoji/iconify

[Fluent UI Emoji](https://github.com/microsoft/fluentui-emoji) as Iconify JSON collections — drop into unplugin-icons, the Tailwind Iconify plugin, or any Iconify component — 3,145 emojis in `flat`, `high-contrast`, and `modern` sets.

**Docs:** https://fluentui-emoji.mkabumattar.com · **This package:** [npm](https://www.npmjs.com/package/@fluentui-emoji/iconify) · **All packages:** [@fluentui-emoji](https://www.npmjs.com/org/fluentui-emoji)

## Install

```sh
pnpm add @fluentui-emoji/iconify
```

## Usage

```ts
// unplugin-icons (vite.config.ts)
import Icons from "unplugin-icons/vite";
import {ExternalPackageIconLoader} from "unplugin-icons/loaders";

Icons({customCollections: ExternalPackageIconLoader("@fluentui-emoji/iconify")});
```

```ts
// or register manually with any Iconify component:
import {addCollection} from "@iconify/react";
import flat from "@fluentui-emoji/iconify/flat.json";
addCollection(flat);
// <Icon icon="fluentui-emoji-flat:rocket" />
```

## License

[MIT](https://github.com/MKAbuMattar/fluentui-emoji/blob/main/LICENSE).
Emoji assets © Microsoft, [MIT licensed](https://github.com/microsoft/fluentui-emoji/blob/main/LICENSE).
