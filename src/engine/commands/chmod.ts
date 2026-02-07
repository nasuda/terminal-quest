import { VirtualFS } from '../VirtualFS.js';
import type { CommandResult } from './index.js';

export function chmod(fs: VirtualFS, args: string[]): CommandResult {
  if (args.length < 2) {
    return { output: '', error: 'chmod: missing operand' };
  }

  const modeStr = args[0];
  const filePath = args[1];

  if (!fs.exists(filePath)) {
    return { output: '', error: `chmod: cannot access '${filePath}': No such file or directory` };
  }

  const currentPerms = fs.getPermissions(filePath);
  let newPerms: string;

  // Check if numeric mode (e.g., 755, 644)
  if (/^\d{3,4}$/.test(modeStr)) {
    newPerms = numericToSymbolic(modeStr, fs.isDirectory(filePath));
  } else {
    // Symbolic mode (e.g., +x, u+w, go-r)
    newPerms = applySymbolicMode(currentPerms, modeStr);
    if (!newPerms) {
      return { output: '', error: `chmod: invalid mode: '${modeStr}'` };
    }
  }

  try {
    fs.setPermissions(filePath, newPerms);
  } catch (e) {
    return { output: '', error: `chmod: ${(e as Error).message}` };
  }

  return { output: '' };
}

function numericToSymbolic(mode: string, isDir: boolean): string {
  // Take last 3 digits
  const digits = mode.slice(-3);
  const prefix = isDir ? 'd' : '-';

  const perms = digits.split('').map(d => {
    const n = parseInt(d, 10);
    return (
      ((n & 4) ? 'r' : '-') +
      ((n & 2) ? 'w' : '-') +
      ((n & 1) ? 'x' : '-')
    );
  });

  return prefix + perms.join('');
}

function applySymbolicMode(current: string, modeStr: string): string {
  // Parse symbolic mode: [ugoa][+-=][rwx]
  const chars = current.split('');

  // Support multiple comma-separated modes
  const modes = modeStr.split(',');

  for (const mode of modes) {
    const match = mode.match(/^([ugoa]*)([-+=])([rwx]+)$/);
    if (!match) return '';

    let who = match[1];
    const op = match[2];
    const perms = match[3];

    // If no who specified, default to 'a' (all)
    if (who === '' || who === 'a') {
      who = 'ugo';
    }

    for (const w of who) {
      let offset: number;
      if (w === 'u') offset = 1;
      else if (w === 'g') offset = 4;
      else if (w === 'o') offset = 7;
      else continue;

      for (const p of perms) {
        let permOffset: number;
        if (p === 'r') permOffset = 0;
        else if (p === 'w') permOffset = 1;
        else if (p === 'x') permOffset = 2;
        else continue;

        const idx = offset + permOffset;
        if (op === '+') {
          chars[idx] = p;
        } else if (op === '-') {
          chars[idx] = '-';
        } else if (op === '=') {
          // First clear all, then set
          chars[offset] = '-';
          chars[offset + 1] = '-';
          chars[offset + 2] = '-';
          chars[idx] = p;
        }
      }
    }
  }

  return chars.join('');
}
