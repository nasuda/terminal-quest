import { VirtualFS } from '../VirtualFS.js';
import type { CommandResult } from './index.js';

export function echo(_fs: VirtualFS, args: string[]): CommandResult {
  const stdinIdx = args.findIndex(a => a.startsWith('__stdin__:'));
  if (stdinIdx !== -1) {
    args = [...args.slice(0, stdinIdx), ...args.slice(stdinIdx + 1)];
  }
  return { output: args.join(' ') };
}
