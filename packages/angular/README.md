# @fluentui-emoji/angular

[Fluent UI Emoji](https://github.com/microsoft/fluentui-emoji) for Angular — a
standalone `fluentEmoji` directive with tree-shakeable icon data. 3,145 emojis
in `flat`, `high-contrast`, and `modern` styles. Angular 17+.

**Docs:** https://fluentui-emoji.mkabumattar.com · **This package:** [npm](https://www.npmjs.com/package/@fluentui-emoji/angular) · **All packages:** [@fluentui-emoji](https://www.npmjs.com/org/fluentui-emoji)

## Install

```sh
pnpm add @fluentui-emoji/angular
```

## Usage

```ts
import {Component} from '@angular/core';
import {FluentEmojiDirective, register} from '@fluentui-emoji/angular';
import {Rocket} from '@fluentui-emoji/angular/flat';

register(Rocket);

@Component({
  standalone: true,
  imports: [FluentEmojiDirective],
  template: `
    <span fluentEmoji="rocket"></span>
    <span fluentEmoji="rocket" emojiStyle="modern" emojiLabel="Rocket"></span>
  `,
})
export class AppComponent {}
```

Only registered icons end up in your bundle. Without `emojiLabel` the svg is
`aria-hidden`. `emojiHtml(name, style, label)` is exported for direct use.

## License

[MIT](https://github.com/MKAbuMattar/fluentui-emoji/blob/main/LICENSE).
Emoji assets © Microsoft, [MIT licensed](https://github.com/microsoft/fluentui-emoji/blob/main/LICENSE).
