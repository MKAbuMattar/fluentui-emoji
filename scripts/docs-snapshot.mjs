// Cuts a docs version snapshot after a stable release.
// Policy: one snapshot per minor/major (patch releases reuse it); never on prereleases.
// Appending to docs/versions.json activates starlight-versions, and the docs
// build materializes the snapshot files, which the release workflow commits.
import {execSync} from 'node:child_process';
import fs from 'node:fs';

const pkg = JSON.parse(fs.readFileSync('packages/svg/package.json', 'utf8'));
if (pkg.version.includes('-')) {
  console.log(`prerelease ${pkg.version} — no docs snapshot`);
  process.exit(0);
}

const [major, minor] = pkg.version.split('.');
const slug = `${major}.${minor}`;
const file = 'docs/versions.json';
const versions = JSON.parse(fs.readFileSync(file, 'utf8'));
if (versions.some((v) => v.slug === slug)) {
  console.log(`docs version ${slug} already exists`);
  process.exit(0);
}

versions.unshift({slug, label: `v${slug}`});
fs.writeFileSync(file, `${JSON.stringify(versions, null, 2)}\n`);
execSync('pnpm --filter @fluentui-emoji/docs build', {stdio: 'inherit'});
console.log(`docs version ${slug} snapshotted`);
