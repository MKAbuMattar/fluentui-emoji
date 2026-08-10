// Copies the emoji SVGs into public/ so the gallery can serve them.
import fs from 'node:fs';

const dest = new URL('./public/emoji/', import.meta.url);
fs.rmSync(dest, {recursive: true, force: true});
fs.cpSync(new URL('../assets/', import.meta.url), dest, {recursive: true});
console.log('docs: copied assets/ -> public/emoji/');
