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
    const msg = e instanceof Error ? e.message : String(e);
    return { output: '', error: `mv: ${msg}` };
  }

  return { output: '' };
}
