import { VirtualFS } from '../VirtualFS.js';
import type { CommandResult } from './index.js';

export function hint(_fs: VirtualFS, _args: string[]): CommandResult {
  return { output: 'HINT_REQUEST' };
}
