import { VirtualFS } from '../VirtualFS.js';
import type { CommandResult } from './index.js';

export function sort(fs: VirtualFS, args: string[]): CommandResult {
  // Extract stdin
  let stdin: string | undefined;
  const stdinIdx = args.findIndex(a => a.startsWith('__stdin__:'));
  if (stdinIdx !== -1) {
    stdin = args[stdinIdx].slice('__stdin__:'.length);
    args = [...args.slice(0, stdinIdx), ...args.slice(stdinIdx + 1)];
  }

  let reverse = false;
  let numeric = false;
  const files: string[] = [];

  for (const arg of args) {
    if (arg.startsWith('-') && arg.length > 1) {
      for (const ch of arg.slice(1)) {
        if (ch === 'r') reverse = true;
        else if (ch === 'n') numeric = true;
        else return { output: '', error: `sort: invalid option -- '${ch}'` };
      }
    } else {
      files.push(arg);
    }
  }

  let content: string;

  if (files.length > 0) {
    try {
      content = fs.readFile(files[0]);
    } catch (e) {
      return { output: '', error: `sort: ${(e as Error).message}` };
    }
  } else if (stdin !== undefined) {
    content = stdin;
  } else {
    return { output: '', error: 'sort: missing file operand' };
  }

  const lines = content.split('\n');

  if (numeric) {
    lines.sort((a, b) => {
      const na = parseFloat(a) || 0;
      const nb = parseFloat(b) || 0;
      return na - nb;
    });
  } else {
    lines.sort();
  }

  if (reverse) {
    lines.reverse();
  }

  return { output: lines.join('\n') };
}
