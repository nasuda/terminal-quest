import { VirtualFS } from '../VirtualFS.js';
import type { CommandResult } from './index.js';

export function uniq(fs: VirtualFS, args: string[]): CommandResult {
  // Extract stdin
  let stdin: string | undefined;
  const stdinIdx = args.findIndex(a => a.startsWith('__stdin__:'));
  if (stdinIdx !== -1) {
    stdin = args[stdinIdx].slice('__stdin__:'.length);
    args = [...args.slice(0, stdinIdx), ...args.slice(stdinIdx + 1)];
  }

  let showCount = false;
  const files: string[] = [];

  for (const arg of args) {
    if (arg.startsWith('-') && arg.length > 1) {
      for (const ch of arg.slice(1)) {
        if (ch === 'c') showCount = true;
        else return { output: '', error: `uniq: invalid option -- '${ch}'` };
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
      return { output: '', error: `uniq: ${(e as Error).message}` };
    }
  } else if (stdin !== undefined) {
    content = stdin;
  } else {
    return { output: '', error: 'uniq: missing file operand' };
  }

  const lines = content.split('\n');
  // Remove trailing empty element from trailing newline (pipe or file)
  if (lines.length > 0 && lines[lines.length - 1] === '') lines.pop();
  const result: string[] = [];

  if (showCount) {
    let i = 0;
    while (i < lines.length) {
      let count = 1;
      while (i + count < lines.length && lines[i + count] === lines[i]) {
        count++;
      }
      result.push(`${count} ${lines[i]}`);
      i += count;
    }
  } else {
    for (let i = 0; i < lines.length; i++) {
      if (i === 0 || lines[i] !== lines[i - 1]) {
        result.push(lines[i]);
      }
    }
  }

  return { output: result.join('\n') };
}
