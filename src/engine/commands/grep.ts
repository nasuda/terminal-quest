import { VirtualFS } from '../VirtualFS.js';
import type { CommandResult } from './index.js';

export function grep(fs: VirtualFS, args: string[]): CommandResult {
  // Extract stdin
  let stdin: string | undefined;
  const stdinIdx = args.findIndex(a => a.startsWith('__stdin__:'));
  if (stdinIdx !== -1) {
    stdin = args[stdinIdx].slice('__stdin__:'.length);
    args = [...args.slice(0, stdinIdx), ...args.slice(stdinIdx + 1)];
  }

  let ignoreCase = false;
  let showLineNumbers = false;
  let recursive = false;
  const nonFlagArgs: string[] = [];

  for (const arg of args) {
    if (arg.startsWith('-') && arg.length > 1 && !arg.startsWith('--')) {
      for (const ch of arg.slice(1)) {
        if (ch === 'i') ignoreCase = true;
        else if (ch === 'n') showLineNumbers = true;
        else if (ch === 'r') recursive = true;
        else return { output: '', error: `grep: invalid option -- '${ch}'` };
      }
    } else {
      nonFlagArgs.push(arg);
    }
  }

  if (nonFlagArgs.length < 1) {
    return { output: '', error: 'grep: missing pattern' };
  }

  const pattern = nonFlagArgs[0];
  const targets = nonFlagArgs.slice(1);

  if (targets.length === 0 && stdin === undefined) {
    return { output: '', error: 'grep: missing file operand' };
  }

  // If no file targets but stdin is available, search stdin
  if (targets.length === 0 && stdin !== undefined) {
    const flags = ignoreCase ? 'i' : '';
    let regex: RegExp;
    try {
      regex = new RegExp(pattern, flags);
    } catch {
      return { output: '', error: `grep: invalid regular expression '${pattern}'` };
    }

    const lines = stdin.split('\n');
    const results: string[] = [];
    for (let i = 0; i < lines.length; i++) {
      if (regex.test(lines[i])) {
        let line = '';
        if (showLineNumbers) {
          line += `${i + 1}:`;
        }
        line += lines[i];
        results.push(line);
      }
    }
    return { output: results.join('\n') };
  }

  const flags = ignoreCase ? 'i' : '';
  let regex: RegExp;
  try {
    regex = new RegExp(pattern, flags);
  } catch {
    return { output: '', error: `grep: invalid regular expression '${pattern}'` };
  }

  const results: string[] = [];
  const multipleFiles = targets.length > 1 || recursive;

  function searchFile(filePath: string): void {
    try {
      const content = fs.readFile(filePath);
      const lines = content.split('\n');
      for (let i = 0; i < lines.length; i++) {
        if (regex.test(lines[i])) {
          let line = '';
          if (multipleFiles) {
            line += `${filePath}:`;
          }
          if (showLineNumbers) {
            line += `${i + 1}:`;
          }
          line += lines[i];
          results.push(line);
        }
      }
    } catch {
      // Skip files that can't be read
    }
  }

  function searchRecursive(dirPath: string): void {
    try {
      const entries = fs.listDirDetailed(dirPath);
      for (const entry of entries) {
        const fullPath = dirPath === '/' ? `/${entry.name}` : `${dirPath}/${entry.name}`;
        if (entry.type === 'file') {
          searchFile(fullPath);
        } else if (entry.type === 'directory') {
          searchRecursive(fullPath);
        }
      }
    } catch {
      // Skip directories that can't be read
    }
  }

  for (const target of targets) {
    if (recursive && fs.isDirectory(target)) {
      searchRecursive(fs.resolvePath(target));
    } else if (fs.isFile(target)) {
      searchFile(fs.resolvePath(target));
    } else if (!fs.exists(target)) {
      return { output: '', error: `grep: ${target}: No such file or directory` };
    } else if (fs.isDirectory(target) && !recursive) {
      return { output: '', error: `grep: ${target}: Is a directory` };
    }
  }

  return { output: results.join('\n') };
}
