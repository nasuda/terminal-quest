import { VirtualFS } from '../VirtualFS.js';
import type { CommandResult } from './index.js';

/**
 * Ensures the .git directory structure exists in the VirtualFS.
 * If .git doesn't exist, initializes minimal structure.
 */
function ensureGitInit(fs: VirtualFS): boolean {
  if (!fs.exists('.git')) {
    return false;
  }
  return true;
}

function getCurrentBranch(fs: VirtualFS): string {
  if (fs.exists('.git/HEAD')) {
    const head = fs.readFile('.git/HEAD').trim();
    // Format: "ref: refs/heads/main"
    if (head.startsWith('ref: refs/heads/')) {
      return head.replace('ref: refs/heads/', '');
    }
    return head;
  }
  return 'main';
}

function generateHash(): string {
  const chars = '0123456789abcdef';
  let hash = '';
  for (let i = 0; i < 7; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)];
  }
  return hash;
}

function gitStatus(fs: VirtualFS, _args: string[]): CommandResult {
  const branch = getCurrentBranch(fs);

  // If a pre-built status file exists, return its content
  if (fs.exists('.git/status')) {
    return { output: fs.readFile('.git/status') };
  }

  // Build status from staged and tracked state
  const lines: string[] = [];
  lines.push(`On branch ${branch}`);

  // Check staged files
  const staged: string[] = [];
  if (fs.exists('.git/staged')) {
    const content = fs.readFile('.git/staged').trim();
    if (content) {
      staged.push(...content.split('\n').filter(Boolean));
    }
  }

  if (staged.length > 0) {
    lines.push('Changes to be committed:');
    lines.push('  (use "git restore --staged <file>..." to unstage)');
    for (const file of staged) {
      lines.push(`\tnew file:   ${file}`);
    }
    lines.push('');
  }

  // Check tracked files for modifications
  const modified: string[] = [];
  if (fs.exists('.git/tracked')) {
    const tracked = fs.readFile('.git/tracked').trim().split('\n').filter(Boolean);
    for (const filePath of tracked) {
      if (fs.exists(filePath)) {
        // File exists and is tracked - check if content differs
        if (fs.exists(`.git/snapshots/${filePath}`)) {
          const current = fs.readFile(filePath);
          const snapshot = fs.readFile(`.git/snapshots/${filePath}`);
          if (current !== snapshot) {
            modified.push(filePath);
          }
        } else {
          // No snapshot -- treat as modified
          modified.push(filePath);
        }
      } else {
        modified.push(filePath);
      }
    }
  }

  if (modified.length > 0) {
    lines.push('Changes not staged for commit:');
    lines.push('  (use "git add <file>..." to update what will be committed)');
    for (const file of modified) {
      if (fs.exists(file)) {
        lines.push(`\tmodified:   ${file}`);
      } else {
        lines.push(`\tdeleted:    ${file}`);
      }
    }
    lines.push('');
  }

  if (staged.length === 0 && modified.length === 0) {
    lines.push('nothing to commit, working tree clean');
  }

  return { output: lines.join('\n') };
}

function gitLog(fs: VirtualFS, _args: string[]): CommandResult {
  if (!fs.exists('.git/log')) {
    return { output: '' };
  }
  return { output: fs.readFile('.git/log') };
}

function gitDiff(fs: VirtualFS, args: string[]): CommandResult {
  // If a specific filename is given, look for .git/diff/<filename>
  if (args.length > 0) {
    const filename = args[0];
    if (fs.exists(`.git/diff/${filename}`)) {
      return { output: fs.readFile(`.git/diff/${filename}`) };
    }
    // Fall through to general diff
  }

  if (fs.exists('.git/diff')) {
    // .git/diff could be a file (general diff) or a directory
    if (fs.isFile('.git/diff')) {
      return { output: fs.readFile('.git/diff') };
    }
    // If it's a directory, concatenate all diff files
    if (fs.isDirectory('.git/diff')) {
      const files = fs.listDir('.git/diff');
      if (files.length === 0) {
        return { output: '' };
      }
      const diffs = files.map(f => fs.readFile(`.git/diff/${f}`));
      return { output: diffs.join('\n') };
    }
  }

  return { output: '' };
}

function gitStash(fs: VirtualFS, args: string[]): CommandResult {
  const subcmd = args[0];

  if (!subcmd || subcmd === 'push') {
    // Save current changes to stash
    if (!fs.exists('.git/stash-stack')) {
      fs.mkdir('.git/stash-stack', true);
    }

    // Count existing stashes
    let stashCount = 0;
    if (fs.exists('.git/stash-count')) {
      stashCount = parseInt(fs.readFile('.git/stash-count'), 10) || 0;
    }

    // Save current status to stash
    const branch = getCurrentBranch(fs);
    let statusContent = '';
    if (fs.exists('.git/status')) {
      statusContent = fs.readFile('.git/status');
    }

    // Save staged content
    let stagedContent = '';
    if (fs.exists('.git/staged')) {
      stagedContent = fs.readFile('.git/staged');
    }

    if (!statusContent && !stagedContent) {
      return { output: 'No local changes to save' };
    }

    // Store stash entry
    fs.writeFile(`.git/stash-stack/${stashCount}`, JSON.stringify({
      branch,
      status: statusContent,
      staged: stagedContent,
    }));
    fs.writeFile('.git/stash-count', String(stashCount + 1));

    // Clear current state
    if (fs.exists('.git/status')) {
      fs.writeFile('.git/status', `On branch ${branch}\nnothing to commit, working tree clean`);
    }
    if (fs.exists('.git/staged')) {
      fs.writeFile('.git/staged', '');
    }

    return { output: `Saved working directory and index state WIP on ${branch}: stash@{${stashCount}}` };
  }

  if (subcmd === 'pop') {
    if (!fs.exists('.git/stash-count')) {
      return { output: '', error: 'No stash entries found.' };
    }
    const stashCount = parseInt(fs.readFile('.git/stash-count'), 10) || 0;
    if (stashCount === 0) {
      return { output: '', error: 'No stash entries found.' };
    }

    const lastIdx = stashCount - 1;
    const stashPath = `.git/stash-stack/${lastIdx}`;
    if (!fs.exists(stashPath)) {
      return { output: '', error: 'No stash entries found.' };
    }

    const entry = JSON.parse(fs.readFile(stashPath));

    // Restore state
    if (entry.status) {
      fs.writeFile('.git/status', entry.status);
    }
    if (entry.staged) {
      fs.writeFile('.git/staged', entry.staged);
    }

    // Remove stash entry
    fs.remove(stashPath);
    fs.writeFile('.git/stash-count', String(lastIdx));

    const branch = getCurrentBranch(fs);
    return { output: `On ${branch}, dropped stash@{0}` };
  }

  if (subcmd === 'list') {
    if (!fs.exists('.git/stash-count')) {
      return { output: '' };
    }
    const stashCount = parseInt(fs.readFile('.git/stash-count'), 10) || 0;
    if (stashCount === 0) {
      return { output: '' };
    }

    const lines: string[] = [];
    for (let i = stashCount - 1; i >= 0; i--) {
      const stashPath = `.git/stash-stack/${i}`;
      if (fs.exists(stashPath)) {
        const entry = JSON.parse(fs.readFile(stashPath));
        lines.push(`stash@{${stashCount - 1 - i}}: WIP on ${entry.branch}`);
      }
    }
    return { output: lines.join('\n') };
  }

  return { output: '', error: `usage: git stash [push | pop | list]` };
}

function gitBranch(fs: VirtualFS, args: string[]): CommandResult {
  const currentBranch = getCurrentBranch(fs);

  // Parse flags
  let deleteFlag = false;
  const names: string[] = [];
  for (const arg of args) {
    if (arg === '-d' || arg === '-D' || arg === '--delete') {
      deleteFlag = true;
    } else if (!arg.startsWith('-')) {
      names.push(arg);
    }
  }

  // Get or initialize branches list
  let branches: string[] = [];
  if (fs.exists('.git/branches')) {
    branches = fs.readFile('.git/branches').trim().split('\n').filter(Boolean);
  }
  if (branches.length === 0) {
    branches = [currentBranch];
  }

  // Delete branch
  if (deleteFlag) {
    if (names.length === 0) {
      return { output: '', error: 'fatal: branch name required' };
    }
    const branchName = names[0];
    if (branchName === currentBranch) {
      return { output: '', error: `error: Cannot delete branch '${branchName}' checked out at '${fs.getCwd()}'` };
    }
    if (!branches.includes(branchName)) {
      return { output: '', error: `error: branch '${branchName}' not found.` };
    }
    branches = branches.filter(b => b !== branchName);
    fs.writeFile('.git/branches', branches.join('\n'));
    return { output: `Deleted branch ${branchName}.` };
  }

  // Create new branch
  if (names.length > 0) {
    const branchName = names[0];
    if (branches.includes(branchName)) {
      return { output: '', error: `fatal: A branch named '${branchName}' already exists.` };
    }
    branches.push(branchName);
    fs.writeFile('.git/branches', branches.join('\n'));
    return { output: '' };
  }

  // List branches
  const lines = branches.map(b => {
    if (b === currentBranch) {
      return `* ${b}`;
    }
    return `  ${b}`;
  });
  return { output: lines.join('\n') };
}

function gitCheckout(fs: VirtualFS, args: string[]): CommandResult {
  let createBranch = false;
  const names: string[] = [];

  for (const arg of args) {
    if (arg === '-b') {
      createBranch = true;
    } else if (!arg.startsWith('-')) {
      names.push(arg);
    }
  }

  if (names.length === 0) {
    return { output: '', error: 'error: you must specify a branch to checkout' };
  }

  const branchName = names[0];

  // Get or initialize branches list
  let branches: string[] = [];
  if (fs.exists('.git/branches')) {
    branches = fs.readFile('.git/branches').trim().split('\n').filter(Boolean);
  }
  const currentBranch = getCurrentBranch(fs);
  if (branches.length === 0) {
    branches = [currentBranch];
  }

  if (createBranch) {
    // Create and switch
    if (branches.includes(branchName)) {
      return { output: '', error: `fatal: A branch named '${branchName}' already exists.` };
    }
    branches.push(branchName);
    fs.writeFile('.git/branches', branches.join('\n'));
    fs.writeFile('.git/HEAD', `ref: refs/heads/${branchName}`);
    return { output: `Switched to a new branch '${branchName}'` };
  }

  // Switch to existing branch
  if (!branches.includes(branchName)) {
    return { output: '', error: `error: pathspec '${branchName}' did not match any file(s) known to git` };
  }

  fs.writeFile('.git/HEAD', `ref: refs/heads/${branchName}`);
  return { output: `Switched to branch '${branchName}'` };
}

function gitMerge(fs: VirtualFS, args: string[]): CommandResult {
  if (args.length === 0) {
    return { output: '', error: 'fatal: No remote for the current branch.' };
  }

  const branchName = args[0];

  // Check if the branch exists
  let branches: string[] = [];
  if (fs.exists('.git/branches')) {
    branches = fs.readFile('.git/branches').trim().split('\n').filter(Boolean);
  }
  const currentBranch = getCurrentBranch(fs);
  if (branches.length === 0) {
    branches = [currentBranch];
  }

  if (!branches.includes(branchName)) {
    return { output: '', error: `merge: ${branchName} - not something we can merge` };
  }

  if (branchName === currentBranch) {
    return { output: `Already up to date.` };
  }

  // Check for pre-built merge result
  if (fs.exists('.git/merge-result')) {
    return { output: fs.readFile('.git/merge-result') };
  }

  // Simulate successful merge
  return { output: `Merge made by the 'recursive' strategy.\n Already up to date with branch '${branchName}'.` };
}

function gitAdd(fs: VirtualFS, args: string[]): CommandResult {
  if (args.length === 0) {
    return { output: '', error: 'Nothing specified, nothing added.' };
  }

  // Ensure .git directory exists
  if (!fs.exists('.git')) {
    return { output: '', error: 'fatal: not a git repository (or any of the parent directories): .git' };
  }

  const filesToAdd: string[] = [];

  for (const arg of args) {
    if (arg === '.') {
      // Add all files in cwd (simple simulation: find all files)
      const cwd = fs.getCwd();
      const allFiles = fs.find(cwd, (path, node) => {
        return node.type === 'file' && !path.includes('/.git/');
      });
      // Convert absolute paths to relative
      for (const f of allFiles) {
        const relative = cwd === '/' ? f.slice(1) : f.slice(cwd.length + 1);
        if (relative) filesToAdd.push(relative);
      }
    } else {
      if (!fs.exists(arg)) {
        return { output: '', error: `fatal: pathspec '${arg}' did not match any files` };
      }
      filesToAdd.push(arg);
    }
  }

  // Read existing staged files
  let staged: string[] = [];
  if (fs.exists('.git/staged')) {
    const content = fs.readFile('.git/staged').trim();
    if (content) {
      staged = content.split('\n').filter(Boolean);
    }
  }

  // Add new files (deduplicate)
  for (const file of filesToAdd) {
    if (!staged.includes(file)) {
      staged.push(file);
    }
  }

  fs.writeFile('.git/staged', staged.join('\n'));
  return { output: '' };
}

function gitCommit(fs: VirtualFS, args: string[]): CommandResult {
  // Parse -m "message"
  let message = '';
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '-m' && i + 1 < args.length) {
      message = args[i + 1];
      break;
    }
    // Handle -m"message" (no space)
    if (args[i].startsWith('-m') && args[i].length > 2) {
      message = args[i].slice(2);
      break;
    }
  }

  if (!message) {
    return { output: '', error: 'error: switch `m\' requires a value' };
  }

  // Check if there are staged files
  let staged: string[] = [];
  if (fs.exists('.git/staged')) {
    const content = fs.readFile('.git/staged').trim();
    if (content) {
      staged = content.split('\n').filter(Boolean);
    }
  }

  if (staged.length === 0) {
    return { output: '', error: 'nothing to commit, working tree clean' };
  }

  const branch = getCurrentBranch(fs);
  const hash = generateHash();
  const date = new Date().toISOString().split('T')[0];

  // Build commit entry
  const commitEntry = [
    `commit ${hash}`,
    `Author: User`,
    `Date:   ${date}`,
    '',
    `    ${message}`,
  ].join('\n');

  // Prepend to log
  let existingLog = '';
  if (fs.exists('.git/log')) {
    existingLog = fs.readFile('.git/log');
  }

  const newLog = existingLog ? commitEntry + '\n\n' + existingLog : commitEntry;
  fs.writeFile('.git/log', newLog);

  // Update tracked files
  let tracked: string[] = [];
  if (fs.exists('.git/tracked')) {
    const content = fs.readFile('.git/tracked').trim();
    if (content) {
      tracked = content.split('\n').filter(Boolean);
    }
  }
  for (const file of staged) {
    if (!tracked.includes(file)) {
      tracked.push(file);
    }
  }
  fs.writeFile('.git/tracked', tracked.join('\n'));

  // Take snapshots of committed files
  if (!fs.exists('.git/snapshots')) {
    fs.mkdir('.git/snapshots', true);
  }
  for (const file of staged) {
    if (fs.exists(file) && fs.isFile(file)) {
      const content = fs.readFile(file);
      // Create parent directories in snapshots if needed
      const parts = file.split('/');
      if (parts.length > 1) {
        const dir = '.git/snapshots/' + parts.slice(0, -1).join('/');
        fs.mkdir(dir, true);
      }
      fs.writeFile(`.git/snapshots/${file}`, content);
    }
  }

  // Clear staged
  fs.writeFile('.git/staged', '');

  // Clear status if it was pre-built
  if (fs.exists('.git/status')) {
    fs.remove('.git/status');
  }

  const fileCount = staged.length;
  const output = `[${branch} ${hash}] ${message}\n ${fileCount} file${fileCount !== 1 ? 's' : ''} changed`;
  return { output };
}

export function git(fs: VirtualFS, args: string[]): CommandResult {
  if (args.length === 0) {
    return {
      output: 'usage: git <command> [<args>]\n\nAvailable commands:\n   status    Show the working tree status\n   log       Show commit logs\n   diff      Show changes\n   stash     Stash the changes in a dirty working directory\n   branch    List, create, or delete branches\n   checkout  Switch branches\n   merge     Join two development histories\n   add       Add file contents to the index\n   commit    Record changes to the repository',
    };
  }

  const subcommand = args[0];
  const subArgs = args.slice(1);

  // All subcommands (except help-like usage) require .git to exist
  if (!ensureGitInit(fs) && subcommand !== 'init') {
    return { output: '', error: 'fatal: not a git repository (or any of the parent directories): .git' };
  }

  switch (subcommand) {
    case 'status':
      return gitStatus(fs, subArgs);
    case 'log':
      return gitLog(fs, subArgs);
    case 'diff':
      return gitDiff(fs, subArgs);
    case 'stash':
      return gitStash(fs, subArgs);
    case 'branch':
      return gitBranch(fs, subArgs);
    case 'checkout':
      return gitCheckout(fs, subArgs);
    case 'merge':
      return gitMerge(fs, subArgs);
    case 'add':
      return gitAdd(fs, subArgs);
    case 'commit':
      return gitCommit(fs, subArgs);
    default:
      return { output: '', error: `git: '${subcommand}' is not a git command. See 'git --help'.` };
  }
}
