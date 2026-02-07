import { VirtualFS } from '../VirtualFS.js';
import type { CommandResult } from './index.js';

export function echo(_fs: VirtualFS, args: string[]): CommandResult {
  return { output: args.join(' ') };
}
