import { VirtualFS } from '../VirtualFS.js';
import type { CommandResult } from './index.js';

export function mv(fs: VirtualFS, args: string[]): CommandResult {
  if (args.length < 2) {
    return { output: '', error: 'mv: missing operand' };
  }

  const source = args[0];
  const dest = args[1];

  try {
    fs.move(source, dest);
  } catch (e) {
    return { output: '', error: `mv: ${(e as Error).message}` };
  }

  return { output: '' };
}
