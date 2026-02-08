import { VirtualFS } from '../VirtualFS.js';
import type { CommandResult } from './index.js';
import { commandsMeta } from '../../data/commands-meta.js';

const categories: Record<string, string[]> = {
  'Navigation': ['pwd', 'cd', 'ls'],
  'File Operations': ['cat', 'cp', 'mv', 'rm', 'touch', 'mkdir', 'echo'],
  'Text Processing': ['grep', 'head', 'tail', 'wc', 'sort', 'uniq', 'cut'],
  'Search': ['find'],
  'Permissions': ['chmod'],
  'Version Control': ['git'],
  'Help': ['help', 'hint', 'man'],
};

export function man(fs: VirtualFS, args: string[]): CommandResult {
  if (args.length === 0) {
    const lines: string[] = ['Terminal Quest コマンドリファレンス', ''];
    for (const [category, cmds] of Object.entries(categories)) {
      lines.push(`  ${category}:`);
      for (const cmd of cmds) {
        const meta = commandsMeta.find(m => m.name === cmd);
        lines.push(`    ${cmd.padEnd(10)} ${meta?.description ?? ''}`);
      }
      lines.push('');
    }
    lines.push('詳細: man <コマンド名>');
    return { output: lines.join('\n') };
  }

  const cmdName = args[0];
  const meta = commandsMeta.find(m => m.name === cmdName);
  if (!meta) {
    return { output: '', error: `man: ${cmdName} のマニュアルはありません` };
  }

  const lines: string[] = [
    `NAME`,
    `    ${meta.name} - ${meta.description}`,
    '',
    `USAGE`,
    `    ${meta.usage}`,
    '',
  ];

  if (meta.options && meta.options.length > 0) {
    lines.push('OPTIONS');
    for (const opt of meta.options) {
      lines.push(`    ${opt.flag.padEnd(15)} ${opt.description}`);
    }
    lines.push('');
  }

  lines.push('EXAMPLES');
  for (const ex of meta.examples) {
    lines.push(`    $ ${ex}`);
  }

  return { output: lines.join('\n') };
}
