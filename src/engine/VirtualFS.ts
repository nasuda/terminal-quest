import type { FSNode } from '../data/types.js';

export class VirtualFS {
  private root: FSNode;
  private cwd: string;

  constructor(initialFS: FSNode, initialCwd: string = '/') {
    this.root = this.deepClone(initialFS);
    this.cwd = initialCwd;
  }

  private deepClone(node: FSNode): FSNode {
    if (node.type === 'file') {
      return { type: 'file', content: node.content ?? '', permissions: node.permissions };
    }
    const children: Record<string, FSNode> = {};
    if (node.children) {
      for (const [name, child] of Object.entries(node.children)) {
        children[name] = this.deepClone(child);
      }
    }
    return { type: 'directory', children, permissions: node.permissions };
  }

  getCwd(): string {
    return this.cwd;
  }

  resolvePath(path: string): string {
    if (path.startsWith('/')) {
      return this.normalizePath(path);
    }
    if (this.cwd === '/') {
      return this.normalizePath('/' + path);
    }
    return this.normalizePath(this.cwd + '/' + path);
  }

  private normalizePath(path: string): string {
    const parts = path.split('/').filter(Boolean);
    const resolved: string[] = [];
    for (const part of parts) {
      if (part === '.') continue;
      if (part === '..') {
        resolved.pop();
      } else {
        resolved.push(part);
      }
    }
    return '/' + resolved.join('/');
  }

  private getNode(path: string): FSNode | null {
    const resolved = this.resolvePath(path);
    if (resolved === '/') return this.root;

    const parts = resolved.split('/').filter(Boolean);
    let current = this.root;
    for (const part of parts) {
      if (current.type !== 'directory' || !current.children?.[part]) {
        return null;
      }
      current = current.children[part];
    }
    return current;
  }

  private getParentAndName(path: string): { parent: FSNode; name: string } | null {
    const resolved = this.resolvePath(path);
    if (resolved === '/') return null;

    const parts = resolved.split('/').filter(Boolean);
    const name = parts.pop()!;
    const parentPath = '/' + parts.join('/');
    const parent = this.getNode(parentPath);
    if (!parent || parent.type !== 'directory') return null;
    return { parent, name };
  }

  exists(path: string): boolean {
    return this.getNode(path) !== null;
  }

  isDirectory(path: string): boolean {
    const node = this.getNode(path);
    return node != null && node.type === 'directory';
  }

  isFile(path: string): boolean {
    const node = this.getNode(path);
    return node != null && node.type === 'file';
  }

  readFile(path: string): string {
    const node = this.getNode(path);
    if (!node) throw new Error(`No such file: ${path}`);
    if (node.type !== 'file') throw new Error(`Is a directory: ${path}`);
    return node.content ?? '';
  }

  writeFile(path: string, content: string): void {
    const existing = this.getNode(path);
    if (existing) {
      if (existing.type !== 'file') throw new Error(`Is a directory: ${path}`);
      existing.content = content;
      return;
    }

    const info = this.getParentAndName(path);
    if (!info) throw new Error(`Cannot create file: ${path}`);
    if (!info.parent.children) info.parent.children = {};
    info.parent.children[info.name] = { type: 'file', content };
  }

  appendFile(path: string, content: string): void {
    const existing = this.getNode(path);
    if (existing) {
      if (existing.type !== 'file') throw new Error(`Is a directory: ${path}`);
      existing.content = (existing.content ?? '') + content;
      return;
    }
    this.writeFile(path, content);
  }

  listDir(path: string): string[] {
    const node = this.getNode(path);
    if (!node) throw new Error(`No such directory: ${path}`);
    if (node.type !== 'directory') throw new Error(`Not a directory: ${path}`);
    return Object.keys(node.children ?? {}).sort();
  }

  listDirDetailed(path: string): Array<{ name: string; type: 'file' | 'directory' }> {
    const node = this.getNode(path);
    if (!node) throw new Error(`No such directory: ${path}`);
    if (node.type !== 'directory') throw new Error(`Not a directory: ${path}`);
    return Object.entries(node.children ?? {})
      .map(([name, child]) => ({ name, type: child.type }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  mkdir(path: string, recursive: boolean = false): void {
    if (this.exists(path)) {
      if (this.isDirectory(path)) return;
      throw new Error(`File exists: ${path}`);
    }

    if (recursive) {
      const resolved = this.resolvePath(path);
      const parts = resolved.split('/').filter(Boolean);
      let current = '/';
      for (const part of parts) {
        current = current === '/' ? '/' + part : current + '/' + part;
        if (!this.exists(current)) {
          this.mkdirSingle(current);
        } else if (!this.isDirectory(current)) {
          throw new Error(`Not a directory: ${current}`);
        }
      }
    } else {
      this.mkdirSingle(path);
    }
  }

  private mkdirSingle(path: string): void {
    const info = this.getParentAndName(path);
    if (!info) throw new Error(`Cannot create directory: ${path}`);
    if (!info.parent.children) info.parent.children = {};
    if (info.parent.children[info.name]) throw new Error(`Already exists: ${path}`);
    info.parent.children[info.name] = { type: 'directory', children: {} };
  }

  remove(path: string, recursive: boolean = false): void {
    const node = this.getNode(path);
    if (!node) throw new Error(`No such file or directory: ${path}`);
    if (node.type === 'directory' && !recursive) {
      const children = Object.keys(node.children ?? {});
      if (children.length > 0) {
        throw new Error(`Directory not empty: ${path}`);
      }
    }

    const info = this.getParentAndName(path);
    if (!info) throw new Error(`Cannot remove root`);
    delete info.parent.children![info.name];
  }

  copy(src: string, dest: string, recursive: boolean = false): void {
    const srcNode = this.getNode(src);
    if (!srcNode) throw new Error(`No such file or directory: ${src}`);

    if (srcNode.type === 'directory' && !recursive) {
      throw new Error(`Is a directory (use -r): ${src}`);
    }

    const cloned = this.deepClone(srcNode);

    if (this.exists(dest) && this.isDirectory(dest)) {
      const srcParts = this.resolvePath(src).split('/').filter(Boolean);
      const srcName = srcParts[srcParts.length - 1];
      const destNode = this.getNode(dest)!;
      if (!destNode.children) destNode.children = {};
      destNode.children[srcName] = cloned;
    } else {
      const info = this.getParentAndName(dest);
      if (!info) throw new Error(`Cannot copy to: ${dest}`);
      if (!info.parent.children) info.parent.children = {};
      info.parent.children[info.name] = cloned;
    }
  }

  move(src: string, dest: string): void {
    const srcNode = this.getNode(src);
    if (!srcNode) throw new Error(`No such file or directory: ${src}`);

    const resolvedSrc = this.resolvePath(src);
    const resolvedDest = this.resolvePath(dest);
    if (resolvedDest === resolvedSrc) {
      throw new Error(`'${src}' and '${dest}' are the same file`);
    }
    if (resolvedDest.startsWith(resolvedSrc + '/')) {
      throw new Error(`Cannot move '${src}' to a subdirectory of itself`);
    }

    const cloned = this.deepClone(srcNode);

    if (this.exists(dest) && this.isDirectory(dest)) {
      const srcParts = this.resolvePath(src).split('/').filter(Boolean);
      const srcName = srcParts[srcParts.length - 1];
      const destNode = this.getNode(dest)!;
      if (!destNode.children) destNode.children = {};
      destNode.children[srcName] = cloned;
    } else {
      const info = this.getParentAndName(dest);
      if (!info) throw new Error(`Cannot move to: ${dest}`);
      if (!info.parent.children) info.parent.children = {};
      info.parent.children[info.name] = cloned;
    }

    const srcInfo = this.getParentAndName(src);
    if (srcInfo) {
      delete srcInfo.parent.children![srcInfo.name];
    }
  }

  changeCwd(path: string): void {
    const resolved = this.resolvePath(path);
    const node = this.getNode(resolved);
    if (!node) throw new Error(`No such directory: ${path}`);
    if (node.type !== 'directory') throw new Error(`Not a directory: ${path}`);
    this.cwd = resolved;
  }

  getPermissions(path: string): string {
    const node = this.getNode(path);
    if (!node) throw new Error(`No such file or directory: ${path}`);
    return node.permissions ?? (node.type === 'directory' ? 'drwxr-xr-x' : '-rw-r--r--');
  }

  setPermissions(path: string, permissions: string): void {
    const node = this.getNode(path);
    if (!node) throw new Error(`No such file or directory: ${path}`);
    node.permissions = permissions;
  }

  find(startPath: string, predicate: (path: string, node: FSNode) => boolean): string[] {
    const results: string[] = [];
    const resolved = this.resolvePath(startPath);

    const walk = (currentPath: string, node: FSNode) => {
      if (predicate(currentPath, node)) {
        results.push(currentPath);
      }
      if (node.type === 'directory' && node.children) {
        for (const [name, child] of Object.entries(node.children)) {
          walk(currentPath === '/' ? '/' + name : currentPath + '/' + name, child);
        }
      }
    };

    const startNode = this.getNode(resolved);
    if (startNode) {
      walk(resolved, startNode);
    }
    return results;
  }
}
