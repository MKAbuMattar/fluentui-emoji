<script>
let {icon, title, ...rest} = $props();
</script>

<svg
  {...icon.attrs}
  role="img"
  aria-hidden={title ? undefined : 'true'}
  aria-label={title}
  {...rest}
>
  <!-- eslint-disable-next-line svelte/no-at-html-tags -- build-time trusted SVG -->
  {@html icon.html}
</svg>
