import { VirtualFS } from '../VirtualFS.js';
import type { CommandResult } from './index.js';

export function tail(fs: VirtualFS, args: string[]): CommandResult {
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
        return { output: '', error: 'tail: option requires an argument -- n' };
      }
      const n = parseInt(args[i], 10);
      if (isNaN(n)) {
        return { output: '', error: `tail: invalid number of lines: '${args[i]}'` };
      }
      lineCount = n;
    } else if (arg.startsWith('-n')) {
      const n = parseInt(arg.slice(2), 10);
      if (isNaN(n)) {
        return { output: '', error: `tail: invalid number of lines: '${arg.slice(2)}'` };
      }
      lineCount = n;
    } else if (arg.startsWith('-')) {
      return { output: '', error: `tail: invalid option -- '${arg}'` };
    } else {
      files.push(arg);
    }
  }

  let content: string;

  if (files.length > 0) {
    try {
      content = fs.readFile(files[0]);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      return { output: '', error: `tail: ${msg}` };
    }
  } else if (stdin !== undefined) {
    content = stdin;
  } else {
    return { output: '', error: 'tail: missing file operand' };
  }

  if (content === '') return { output: '' };
  const lines = content.split('\n');
  // Remove trailing empty element from trailing newline (pipe or file)
  if (lines.length > 0 && lines[lines.length - 1] === '') lines.pop();
  const selected = lines.slice(-lineCount);
  return { output: selected.join('\n') };
}
