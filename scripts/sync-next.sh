#!/usr/bin/env bash
# Merge main into next so next is always main + beta work on top.
# Run from a checkout of `next` with origin/main fetched.
#   - every conflict takes main (assets, versions, changelogs, tooling, lockfile)
#   - after a stable release on main, re-baseline changesets pre-mode on the
#     new stable versions so the next beta is above it (e.g. 2.1.0 -> 2.2.0-beta.0)
set -euo pipefail

if git merge-base --is-ancestor origin/main HEAD; then
  echo "next already contains main"
  exit 0
fi

git merge --no-ff --no-commit origin/main || true

for f in $(git diff --name-only --diff-filter=U); do
  if git checkout --theirs -- "$f" 2>/dev/null; then git add -- "$f"; else git rm -q -- "$f"; fi
done

node - <<'EOF'
const fs = require('node:fs');
const pre = JSON.parse(fs.readFileSync('.changeset/pre.json', 'utf8'));
const versions = Object.fromEntries(
  fs
    .readdirSync('packages')
    .map((dir) => JSON.parse(fs.readFileSync(`packages/${dir}/package.json`, 'utf8')))
    .filter((pkg) => !pkg.private)
    .map((pkg) => [pkg.name, pkg.version]),
);
// a stable version here means main released since the last sync
if (Object.values(versions).some((v) => !v.includes('-'))) {
  pre.initialVersions = versions;
  pre.changesets = []; // pending beta changesets re-apply on top of the new stable
  fs.writeFileSync('.changeset/pre.json', `${JSON.stringify(pre, null, 2)}\n`);
  console.log('re-baselined pre-mode on', versions);
}
EOF

pnpm install --no-frozen-lockfile
git add -A
git commit -m "chore: merge main into next"
