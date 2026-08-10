# Security Policy

## Scope

fluentui-emoji publishes generated npm packages (`@fluentui-emoji/*`) containing SVG data and
small framework runtimes. The concerns that apply:

- **Malicious SVG content** — the sync pipeline optimizes upstream SVGs with svgo;
  anything that could smuggle scripts or event handlers into generated output.
- **Supply chain** — the release pipeline (GitHub Actions + Changesets) and its
  npm token, and the upstream download the sync performs.
- **Injection via icon names/labels** — the runtimes escape label attributes;
  regressions there are security bugs.

## Supported versions

The latest published major on npm is supported. Older versions are not patched —
update to the latest before reporting.

## Reporting a vulnerability

**Do not open a public issue for a security problem.**

1. Preferred: open a private report via **GitHub → Security → Report a vulnerability**
   on this repository.
2. Alternative: email **info@mkabumattar.com** with a description, the affected
   package and version, and reproduction steps.

You will get an acknowledgement within a few days. Please allow a reasonable
window for a fix and release before public disclosure.
