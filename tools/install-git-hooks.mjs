import { chmod } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';

const root = new URL('../', import.meta.url);
const hookDir = new URL('.githooks/', root);

execFileSync('git', ['config', 'core.hooksPath', '.githooks'], { cwd: root });

for (const hook of ['commit-msg', 'pre-commit', 'pre-push']) {
  await chmod(new URL(hook, hookDir), 0o755);
}

console.log('Git hooks configured via core.hooksPath=.githooks');
