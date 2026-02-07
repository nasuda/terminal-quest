import { VirtualFS } from '../VirtualFS.js';
import type { CommandResult } from './index.js';

export function cp(fs: VirtualFS, args: string[]): CommandResult {
  let recursive = false;
  const paths: string[] = [];

  for (const arg of args) {
    if (arg === '-r' || arg === '-R' || arg === '--recursive') {
      recursive = true;
    } else {
      paths.push(arg);
    }
  }

  if (paths.length < 2) {
    return { output: '', error: 'cp: missing file operand' };
  }

  const src = paths[0];
  const dest = paths[1];

  try {
    fs.copy(src, dest, recursive);
    return { output: '' };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return { output: '', error: `cp: ${msg}` };
  }
}
