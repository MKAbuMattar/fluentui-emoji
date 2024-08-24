import path from 'node:path';
import fs from 'fs-extra';

(async () => {
  const sourceDir = path.join(process.cwd(), 'icons');
  const targetDir = path.join(
    process.cwd(),
    'packages',
    'fluentui-emoji',
    'icons',
  );

  fs.ensureDirSync(targetDir);

  await fs.copy(sourceDir, targetDir);
})();
