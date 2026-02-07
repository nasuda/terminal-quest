import { VirtualFS } from '../VirtualFS.js';
import type { CommandResult } from './index.js';

export function rm(fs: VirtualFS, args: string[]): CommandResult {
  let recursive = false;
  let force = false;
  const paths: string[] = [];

  for (const arg of args) {
    if (arg === '--recursive') {
      recursive = true;
    } else if (arg === '--force') {
      force = true;
    } else if (arg.startsWith('-') && arg.length > 1 && !arg.startsWith('--')) {
      for (const ch of arg.slice(1)) {
        if (ch === 'r' || ch === 'R') recursive = true;
        else if (ch === 'f') force = true;
        else return { output: '', error: `rm: invalid option -- '${ch}'` };
      }
    } else {
      paths.push(arg);
    }
  }

  if (paths.length === 0) {
    if (force) return { output: '' };
    return { output: '', error: 'rm: missing operand' };
  }

  for (const path of paths) {
    try {
      if (!fs.exists(path)) {
        if (!force) {
          return { output: '', error: `rm: cannot remove '${path}': No such file or directory` };
        }
        continue;
      }
      fs.remove(path, recursive);
    } catch (e) {
      if (!force) {
        return { output: '', error: `rm: ${(e as Error).message}` };
      }
    }
  }

  return { output: '' };
}
