import { VirtualFS } from '../VirtualFS.js';
import type { CommandResult } from './index.js';

export function pwd(fs: VirtualFS, _args: string[]): CommandResult {
  return { output: fs.getCwd() };
}
