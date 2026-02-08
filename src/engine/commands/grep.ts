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
  let countOnly = false;
  const nonFlagArgs: string[] = [];

  for (const arg of args) {
    if (arg.startsWith('-') && arg.length > 1 && !arg.startsWith('--')) {
      for (const ch of arg.slice(1)) {
        if (ch === 'i') ignoreCase = true;
        else if (ch === 'n') showLineNumbers = true;
        else if (ch === 'r') recursive = true;
        else if (ch === 'c') countOnly = true;
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
    let matchCount = 0;
    for (let i = 0; i < lines.length; i++) {
      if (regex.test(lines[i])) {
        matchCount++;
        if (!countOnly) {
          let line = '';
          if (showLineNumbers) {
            line += `${i + 1}:`;
          }
          line += lines[i];
          results.push(line);
        }
      }
    }
    if (countOnly) {
      return { output: String(matchCount) };
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
  const fileCounts: { path: string; count: number }[] = [];
  const multipleFiles = targets.length > 1 || recursive;

  function searchFile(filePath: string): void {
    try {
      const content = fs.readFile(filePath);
      const lines = content.split('\n');
      let fileMatchCount = 0;
      for (let i = 0; i < lines.length; i++) {
        if (regex.test(lines[i])) {
          fileMatchCount++;
          if (!countOnly) {
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
      }
      if (countOnly) {
        fileCounts.push({ path: filePath, count: fileMatchCount });
      }
    } catch (e) {
      results.push(`grep: ${filePath}: ${e instanceof Error ? e.message : 'cannot read file'}`);
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
    } catch (e) {
      results.push(`grep: ${dirPath}: ${e instanceof Error ? e.message : 'cannot read directory'}`);
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

  if (countOnly) {
    if (multipleFiles) {
      return { output: fileCounts.map(fc => `${fc.path}:${fc.count}`).join('\n') };
    }
    const total = fileCounts.reduce((sum, fc) => sum + fc.count, 0);
    return { output: String(total) };
  }

  return { output: results.join('\n') };
}
