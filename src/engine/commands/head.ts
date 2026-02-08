import { VirtualFS } from '../VirtualFS.js';
import type { CommandResult } from './index.js';

export function head(fs: VirtualFS, args: string[]): CommandResult {
  // Extract stdin
  let stdin: string | undefined;
  const stdinIdx = args.findIndex(a => a.startsWith('__stdin__:'));
  if (stdinIdx !== -1) {
    stdin = args[stdinIdx].slice('__stdin__:'.length);
    args = [...args.slice(0, stdinIdx), ...args.slice(stdinIdx + 1)];
  }

  let lineCount = 10;
  const files: string[] = [];

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '-n') {
      i++;
      if (i >= args.length) {
        return { output: '', error: 'head: option requires an argument -- n' };
      }
      const n = parseInt(args[i], 10);
      if (isNaN(n)) {
        return { output: '', error: `head: invalid number of lines: '${args[i]}'` };
      }
      lineCount = n;
    } else if (arg.startsWith('-n')) {
      const n = parseInt(arg.slice(2), 10);
      if (isNaN(n)) {
        return { output: '', error: `head: invalid number of lines: '${arg.slice(2)}'` };
      }
      lineCount = n;
    } else if (arg.startsWith('-')) {
      return { output: '', error: `head: invalid option -- '${arg}'` };
    } else {
      files.push(arg);
    }
  }

  let content: string;

  if (files.length > 0) {
    try {
      content = fs.readFile(files[0]);
    } catch (e) {
      return { output: '', error: `head: ${(e as Error).message}` };
    }
  } else if (stdin !== undefined) {
    content = stdin;
  } else {
    return { output: '', error: 'head: missing file operand' };
  }

  if (content === '') return { output: '' };
  const lines = content.split('\n');
  const selected = lines.slice(0, lineCount);
  return { output: selected.join('\n') };
}
