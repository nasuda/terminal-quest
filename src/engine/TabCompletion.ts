import { VirtualFS } from './VirtualFS.js';
import { commandRegistry } from './commands/index.js';

export interface CompletionResult {
  completed: string;
  candidates: string[];
}

export class TabCompletion {
  constructor(private fs: VirtualFS) {}

  complete(input: string): CompletionResult {
    if (input === '') {
      return { completed: '', candidates: [] };
    }

    const parts = input.split(/\s+/);
    const endsWithSpace = input.endsWith(' ');

    if (parts.length === 1 && !endsWithSpace) {
      return this.completeCommand(parts[0]);
    }

    const partial = endsWithSpace ? '' : parts[parts.length - 1];
    const prefix = endsWithSpace ? input : parts.slice(0, -1).join(' ') + ' ';

    const result = this.completePath(partial);
    return {
      completed: prefix + result.completed,
      candidates: result.candidates,
    };
  }

  private completeCommand(partial: string): CompletionResult {
    const commands = Object.keys(commandRegistry);
    const matches = commands.filter(cmd => cmd.startsWith(partial));

    if (matches.length === 0) {
      return { completed: partial, candidates: [] };
    }

    if (matches.length === 1) {
      return { completed: matches[0] + ' ', candidates: [] };
    }

    const common = this.longestCommonPrefix(matches);
    return { completed: common, candidates: matches };
  }

  private completePath(partial: string): CompletionResult {
    let dirPath: string;
    let filePrefix: string;

    const lastSlash = partial.lastIndexOf('/');
    if (lastSlash === -1) {
      dirPath = '.';
      filePrefix = partial;
    } else {
      dirPath = partial.slice(0, lastSlash) || '/';
      filePrefix = partial.slice(lastSlash + 1);
    }

    try {
      if (!this.fs.exists(dirPath) || !this.fs.isDirectory(dirPath)) {
        return { completed: partial, candidates: [] };
      }

      const entries = this.fs.listDirDetailed(dirPath);
      const matches = entries.filter(e => e.name.startsWith(filePrefix));

      if (matches.length === 0) {
        return { completed: partial, candidates: [] };
      }

      const dirPrefix = lastSlash === -1 ? '' : partial.slice(0, lastSlash + 1);

      if (matches.length === 1) {
        const match = matches[0];
        const suffix = match.type === 'directory' ? '/' : ' ';
        return { completed: dirPrefix + match.name + suffix, candidates: [] };
      }

      const matchNames = matches.map(m => m.name);
      const common = this.longestCommonPrefix(matchNames);
      return {
        completed: dirPrefix + common,
        candidates: matchNames.map(n => {
          const entry = matches.find(m => m.name === n)!;
          return entry.type === 'directory' ? n + '/' : n;
        }),
      };
    } catch {
      return { completed: partial, candidates: [] };
    }
  }

  private longestCommonPrefix(strings: string[]): string {
    if (strings.length === 0) return '';
    if (strings.length === 1) return strings[0];

    let prefix = strings[0];
    for (let i = 1; i < strings.length; i++) {
      while (!strings[i].startsWith(prefix)) {
        prefix = prefix.slice(0, -1);
        if (prefix === '') return '';
      }
    }
    return prefix;
  }
}
