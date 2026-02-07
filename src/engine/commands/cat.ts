import { VirtualFS } from '../VirtualFS.js';
import type { CommandResult } from './index.js';

export function cat(fs: VirtualFS, args: string[]): CommandResult {
  if (args.length === 0) {
    return { output: '', error: 'cat: missing file operand' };
  }

  const outputs: string[] = [];

  for (const filePath of args) {
    try {
      const content = fs.readFile(filePath);
      outputs.push(content);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      return { output: '', error: `cat: ${msg}` };
    }
  }

  return { output: outputs.join('') };
}
