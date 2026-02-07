import { VirtualFS } from '../VirtualFS.js';
import type { CommandResult } from './index.js';

export function mkdir(fs: VirtualFS, args: string[]): CommandResult {
  let recursive = false;
  const paths: string[] = [];

  for (const arg of args) {
    if (arg === '-p') {
      recursive = true;
    } else if (arg.startsWith('-')) {
      return { output: '', error: `mkdir: invalid option -- '${arg}'` };
    } else {
      paths.push(arg);
    }
  }

  if (paths.length === 0) {
    return { output: '', error: 'mkdir: missing operand' };
  }

  for (const path of paths) {
    if (!recursive && fs.exists(path)) {
      return { output: '', error: `mkdir: cannot create directory '${path}': File exists` };
    }
    try {
      fs.mkdir(path, recursive);
    } catch (e) {
      return { output: '', error: `mkdir: ${(e as Error).message}` };
    }
  }

  return { output: '' };
}
