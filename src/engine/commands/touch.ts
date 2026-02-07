import { VirtualFS } from '../VirtualFS.js';
import type { CommandResult } from './index.js';

export function touch(fs: VirtualFS, args: string[]): CommandResult {
  if (args.length === 0) {
    return { output: '', error: 'touch: missing file operand' };
  }

  const filename = args[0];

  if (fs.exists(filename)) {
    // File or directory already exists, do nothing (success)
    return { output: '' };
  }

  try {
    fs.writeFile(filename, '');
  } catch (e) {
    return { output: '', error: `touch: ${(e as Error).message}` };
  }

  return { output: '' };
}
