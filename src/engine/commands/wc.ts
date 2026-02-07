import { VirtualFS } from '../VirtualFS.js';
import type { CommandResult } from './index.js';

export function wc(fs: VirtualFS, args: string[]): CommandResult {
  // Extract stdin
  let stdin: string | undefined;
  const stdinIdx = args.findIndex(a => a.startsWith('__stdin__:'));
  if (stdinIdx !== -1) {
    stdin = args[stdinIdx].slice('__stdin__:'.length);
    args = [...args.slice(0, stdinIdx), ...args.slice(stdinIdx + 1)];
  }

  let showLines = false;
  let showWords = false;
  let showBytes = false;
  const files: string[] = [];

  for (const arg of args) {
    if (arg.startsWith('-') && arg.length > 1) {
      for (const ch of arg.slice(1)) {
        if (ch === 'l') showLines = true;
        else if (ch === 'w') showWords = true;
        else if (ch === 'c') showBytes = true;
        else return { output: '', error: `wc: invalid option -- '${ch}'` };
      }
    } else {
      files.push(arg);
    }
  }

  // If no flags specified, show all
  if (!showLines && !showWords && !showBytes) {
    showLines = true;
    showWords = true;
    showBytes = true;
  }

  let content: string;
  let filename: string | undefined;

  if (files.length > 0) {
    filename = files[0];
    try {
      content = fs.readFile(filename);
    } catch (e) {
      return { output: '', error: `wc: ${(e as Error).message}` };
    }
  } else if (stdin !== undefined) {
    content = stdin;
  } else {
    return { output: '', error: 'wc: missing file operand' };
  }

  const lines = content === '' ? 0 : content.split('\n').length;
  const words = content === '' ? 0 : content.split(/\s+/).filter(Boolean).length;
  const bytes = new TextEncoder().encode(content).length;

  const parts: string[] = [];
  if (showLines) parts.push(String(lines));
  if (showWords) parts.push(String(words));
  if (showBytes) parts.push(String(bytes));
  if (filename) parts.push(filename);

  return { output: parts.join(' ') };
}
