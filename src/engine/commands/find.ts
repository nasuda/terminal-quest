import { VirtualFS } from '../VirtualFS.js';
import type { CommandResult } from './index.js';

export function find(fs: VirtualFS, args: string[]): CommandResult {
  let searchPath = '.';
  let namePattern: string | undefined;
  let typeFilter: 'f' | 'd' | undefined;

  let i = 0;

  // First non-flag argument is the path (if it doesn't start with -)
  if (i < args.length && !args[i].startsWith('-')) {
    searchPath = args[i];
    i++;
  }

  while (i < args.length) {
    const arg = args[i];
    if (arg === '-name') {
      i++;
      if (i >= args.length) {
        return { output: '', error: 'find: missing argument to -name' };
      }
      namePattern = args[i];
    } else if (arg === '-type') {
      i++;
      if (i >= args.length) {
        return { output: '', error: 'find: missing argument to -type' };
      }
      const t = args[i];
      if (t !== 'f' && t !== 'd') {
        return { output: '', error: `find: invalid type '${t}'` };
      }
      typeFilter = t;
    } else {
      return { output: '', error: `find: unknown option '${arg}'` };
    }
    i++;
  }

  if (!fs.exists(searchPath)) {
    return { output: '', error: `find: '${searchPath}': No such file or directory` };
  }

  const results = fs.find(searchPath, (path, node) => {
    if (typeFilter === 'f' && node.type !== 'file') return false;
    if (typeFilter === 'd' && node.type !== 'directory') return false;

    if (namePattern !== undefined) {
      const name = path.split('/').filter(Boolean).pop() ?? '';
      if (path === '/' && !namePattern) return false;
      return matchWildcard(name, namePattern);
    }

    return true;
  });

  return { output: results.join('\n') };
}

function matchWildcard(str: string, pattern: string): boolean {
  // Convert wildcard pattern to regex
  const escaped = pattern.replace(/[.+^${}()|[\]\\]/g, '\\$&');
  const regexStr = '^' + escaped.replace(/\*/g, '.*').replace(/\?/g, '.') + '$';
  return new RegExp(regexStr).test(str);
}
