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

  if (files.length > 0) {
    const outputLines: string[] = [];
    let totalLines = 0;
    let totalWords = 0;
    let totalBytes = 0;

    for (const filename of files) {
      let content: string;
      try {
        content = fs.readFile(filename);
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        return { output: '', error: `wc: ${msg}` };
      }

      const lines = content === '' ? 0 : (content.match(/\n/g) || []).length;
      const words = content === '' ? 0 : content.split(/\s+/).filter(Boolean).length;
      const bytes = new TextEncoder().encode(content).length;

      totalLines += lines;
      totalWords += words;
      totalBytes += bytes;

      const parts: string[] = [];
      if (showLines) parts.push(String(lines));
      if (showWords) parts.push(String(words));
      if (showBytes) parts.push(String(bytes));
      parts.push(filename);
      outputLines.push(parts.join(' '));
    }

    if (files.length > 1) {
      const totalParts: string[] = [];
      if (showLines) totalParts.push(String(totalLines));
      if (showWords) totalParts.push(String(totalWords));
      if (showBytes) totalParts.push(String(totalBytes));
      totalParts.push('total');
      outputLines.push(totalParts.join(' '));
    }

    return { output: outputLines.join('\n') };
  } else if (stdin !== undefined) {
    const content = stdin;
    const lines = content === '' ? 0 : (content.match(/\n/g) || []).length;
    const words = content === '' ? 0 : content.split(/\s+/).filter(Boolean).length;
    const bytes = new TextEncoder().encode(content).length;

    const parts: string[] = [];
    if (showLines) parts.push(String(lines));
    if (showWords) parts.push(String(words));
    if (showBytes) parts.push(String(bytes));

    return { output: parts.join(' ') };
  } else {
    return { output: '', error: 'wc: missing file operand' };
  }
}
