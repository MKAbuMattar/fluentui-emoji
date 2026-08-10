# @fluentui-emoji/svelte

[Fluent UI Emoji](https://github.com/microsoft/fluentui-emoji) for Svelte 5 —
tree-shakeable icon data plus a single `Emoji` component. 3,145 emojis in
`flat`, `high-contrast`, and `modern` styles.

## Install

```sh
pnpm add @fluentui-emoji/svelte
```

## Usage

```svelte
<script>
  import {Emoji} from '@fluentui-emoji/svelte';
  import {Rocket} from '@fluentui-emoji/svelte/flat';
  // or per-icon: import Rocket from '@fluentui-emoji/svelte/modern/rocket';
</script>

<Emoji icon={Rocket} width="32" />
<Emoji icon={Rocket} title="Rocket launch" />  <!-- accessible label -->
```

Only the icons you import end up in your bundle. Extra attributes land on the
root `<svg>`. Without `title` the icon is `aria-hidden`.

## License

[MIT](https://github.com/MKAbuMattar/fluentui-emoji/blob/main/LICENSE).
Emoji assets © Microsoft, [MIT licensed](https://github.com/microsoft/fluentui-emoji/blob/main/LICENSE).
