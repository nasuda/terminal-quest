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
  let delimiter: string | undefined;
  let keyField: number | undefined;
  const files: string[] = [];

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '-t') {
      i++;
      if (i >= args.length) {
        return { output: '', error: 'sort: option requires an argument -- t' };
      }
      delimiter = args[i];
    } else if (arg.startsWith('-t') && arg.length > 2) {
      delimiter = arg.slice(2);
    } else if (arg === '-k') {
      i++;
      if (i >= args.length) {
        return { output: '', error: 'sort: option requires an argument -- k' };
      }
      keyField = parseInt(args[i], 10);
      if (isNaN(keyField)) {
        return { output: '', error: `sort: invalid number at field start: '${args[i]}'` };
      }
    } else if (arg.startsWith('-k') && arg.length > 2) {
      keyField = parseInt(arg.slice(2), 10);
      if (isNaN(keyField)) {
        return { output: '', error: `sort: invalid number at field start: '${arg.slice(2)}'` };
      }
    } else if (arg.startsWith('-') && arg.length > 1 && !arg.startsWith('--')) {
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
      const msg = e instanceof Error ? e.message : String(e);
      return { output: '', error: `sort: ${msg}` };
    }
  } else if (stdin !== undefined) {
    content = stdin;
  } else {
    return { output: '', error: 'sort: missing file operand' };
  }

  const lines = content.split('\n');
  // Remove trailing empty element from trailing newline (pipe or file)
  if (lines.length > 0 && lines[lines.length - 1] === '') lines.pop();

  const getKey = (line: string): string => {
    if (delimiter !== undefined && keyField !== undefined) {
      const fields = line.split(delimiter);
      return fields[keyField - 1] ?? '';
    }
    return line;
  };

  if (numeric) {
    lines.sort((a, b) => {
      const ka = getKey(a);
      const kb = getKey(b);
      const na = isNaN(parseFloat(ka)) ? 0 : parseFloat(ka);
      const nb = isNaN(parseFloat(kb)) ? 0 : parseFloat(kb);
      return na - nb;
    });
  } else {
    lines.sort((a, b) => {
      const ka = getKey(a);
      const kb = getKey(b);
      return ka.localeCompare(kb);
    });
  }

  if (reverse) {
    lines.reverse();
  }

  return { output: lines.join('\n') };
}
