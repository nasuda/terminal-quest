import { VirtualFS } from '../VirtualFS.js';
import type { CommandResult } from './index.js';

export function cut(fs: VirtualFS, args: string[]): CommandResult {
  // Extract stdin
  let stdin: string | undefined;
  const stdinIdx = args.findIndex(a => a.startsWith('__stdin__:'));
  if (stdinIdx !== -1) {
    stdin = args[stdinIdx].slice('__stdin__:'.length);
    args = [...args.slice(0, stdinIdx), ...args.slice(stdinIdx + 1)];
  }

  let delimiter = '\t';
  let fieldsStr: string | undefined;
  const files: string[] = [];

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '-d') {
      i++;
      if (i >= args.length) {
        return { output: '', error: 'cut: option requires an argument -- d' };
      }
      delimiter = args[i];
    } else if (arg.startsWith('-d')) {
      delimiter = arg.slice(2);
    } else if (arg === '-f') {
      i++;
      if (i >= args.length) {
        return { output: '', error: 'cut: option requires an argument -- f' };
      }
      fieldsStr = args[i];
    } else if (arg.startsWith('-f')) {
      fieldsStr = arg.slice(2);
    } else if (arg.startsWith('-')) {
      return { output: '', error: `cut: invalid option -- '${arg}'` };
    } else {
      files.push(arg);
    }
  }

  if (!fieldsStr) {
    return { output: '', error: 'cut: you must specify a list of fields' };
  }

  // Parse field numbers (1-based, comma-separated)
  const fields = fieldsStr.split(',').map(f => {
    const n = parseInt(f.trim(), 10);
    if (isNaN(n) || n < 1) return -1;
    return n;
  });

  if (fields.some(f => f === -1)) {
    return { output: '', error: `cut: invalid field value '${fieldsStr}'` };
  }

  let content: string;

  if (files.length > 0) {
    try {
      content = fs.readFile(files[0]);
    } catch (e) {
      return { output: '', error: `cut: ${(e as Error).message}` };
    }
  } else if (stdin !== undefined) {
    content = stdin;
  } else {
    return { output: '', error: 'cut: missing file operand' };
  }

  const lines = content.split('\n');
  const result = lines.map(line => {
    const parts = line.split(delimiter);
    return fields.map(f => parts[f - 1] ?? '').join(delimiter);
  });

  return { output: result.join('\n') };
}
