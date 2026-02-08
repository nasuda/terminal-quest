import { VirtualFS } from '../VirtualFS.js';
import type { CommandResult } from './index.js';

export function ls(fs: VirtualFS, args: string[]): CommandResult {
  let showAll = false;
  let longFormat = false;
  const paths: string[] = [];

  for (const arg of args) {
    if (arg.startsWith('-')) {
      for (const ch of arg.slice(1)) {
        if (ch === 'a') showAll = true;
        else if (ch === 'l') longFormat = true;
        else return { output: '', error: `ls: invalid option -- '${ch}'` };
      }
    } else {
      paths.push(arg);
    }
  }

  const targetPath = paths.length > 0 ? paths[0] : '.';

  if (!fs.exists(targetPath)) {
    return { output: '', error: `ls: cannot access '${targetPath}': No such file or directory` };
  }

  if (fs.isFile(targetPath)) {
    const resolved = fs.resolvePath(targetPath);
    const name = resolved.split('/').filter(Boolean).pop() ?? resolved;
    if (longFormat) {
      const perms = fs.getPermissions(targetPath);
      return { output: `${perms} ${name}` };
    }
    return { output: name };
  }

  if (longFormat) {
    const entries = fs.listDirDetailed(targetPath);
    const lines = entries
      .filter(e => showAll || !e.name.startsWith('.'))
      .map(e => {
        const resolvedDir = fs.resolvePath(targetPath);
        const fullPath = resolvedDir === '/' ? `/${e.name}` : `${resolvedDir}/${e.name}`;
        const perms = fs.getPermissions(fullPath);
        const suffix = e.type === 'directory' ? '/' : '';
        return `${perms} ${e.name}${suffix}`;
      });
    return { output: lines.join('\n') };
  }

  const entries = fs.listDir(targetPath);
  const filtered = entries.filter(e => showAll || !e.startsWith('.'));
  return { output: filtered.join('  ') };
}
