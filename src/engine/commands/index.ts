import { VirtualFS } from '../VirtualFS.js';
import { pwd } from './pwd.js';
import { ls } from './ls.js';
import { cd } from './cd.js';
import { cat } from './cat.js';
import { grep } from './grep.js';
import { cp } from './cp.js';
import { echo } from './echo.js';
import { help } from './help.js';
import { git } from './git.js';
import { mkdir } from './mkdir.js';
import { mv } from './mv.js';
import { rm } from './rm.js';
import { find } from './find.js';
import { touch } from './touch.js';
import { head } from './head.js';
import { tail } from './tail.js';
import { wc } from './wc.js';
import { sort } from './sort.js';
import { uniq } from './uniq.js';
import { cut } from './cut.js';
import { chmod } from './chmod.js';
import { man } from './man.js';

export interface CommandResult {
  output: string;
  error?: string;
}

export type CommandFn = (fs: VirtualFS, args: string[]) => CommandResult;

export const commandRegistry: Record<string, CommandFn> = {
  pwd,
  ls,
  cd,
  cat,
  grep,
  cp,
  echo,
  help,
  git,
  mkdir,
  mv,
  rm,
  find,
  touch,
  head,
  tail,
  wc,
  sort,
  uniq,
  cut,
  chmod,
  man,
};
