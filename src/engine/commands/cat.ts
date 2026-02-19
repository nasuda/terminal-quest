import { VirtualFS } from '../VirtualFS.js';
import type { CommandResult } from './index.js';

export function cat(fs: VirtualFS, args: string[]): CommandResult {
  // Extract stdin
  let stdin: string | undefined;
  const stdinIdx = args.findIndex(a => a.startsWith('__stdin__:'));
  if (stdinIdx !== -1) {
    stdin = args[stdinIdx].slice('__stdin__:'.length);
    args = [...args.slice(0, stdinIdx), ...args.slice(stdinIdx + 1)];
  }

  if (args.length === 0 && stdin == null) {
    return { output: '', error: 'cat: missing file operand' };
  }

  // If stdin and no file args, pass through stdin (pipe usage)
  if (args.length === 0 && stdin != null) {
    return { output: stdin };
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
