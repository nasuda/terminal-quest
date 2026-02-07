import { VirtualFS } from '../VirtualFS.js';
import type { CommandResult } from './index.js';

export function clear(_fs: VirtualFS, _args: string[]): CommandResult {
  return { output: 'CLEAR_SCREEN' };
}
