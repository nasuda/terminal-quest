import { VirtualFS } from '../VirtualFS.js';
import type { CommandResult } from './index.js';

export function cd(fs: VirtualFS, args: string[]): CommandResult {
  const target = args[0] ?? '/';

  try {
    fs.changeCwd(target);
    return { output: '' };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return { output: '', error: `cd: ${msg}` };
  }
}
