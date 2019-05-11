import path from 'path';
import fse from 'fs-extra';
import glob from 'glob';

function typescriptCopy(from, to) {
  const files = glob.sync('**/*.d.ts', { cwd: from });
  const cmds = files.map(file =>
    fse.copy(path.resolve(from, file), path.resolve(to, file)),
  );
  return Promise.all(cmds);
}

async function run() {
  // TypeScript
  const from = path.resolve(__dirname, '../src');
  await Promise.all([typescriptCopy(from, path.resolve(__dirname, '../dist'))]);
}

run();
