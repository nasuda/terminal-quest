import { describe, it, expect } from 'vitest';
import { VirtualFS } from './VirtualFS.js';
import type { FSNode } from '../data/types.js';

const testFS: FSNode = {
  type: 'directory',
  children: {
    home: {
      type: 'directory',
      children: {
        user: {
          type: 'directory',
          children: {
            'readme.txt': { type: 'file', content: 'Hello World' },
            docs: {
              type: 'directory',
              children: {
                'notes.md': { type: 'file', content: '# Notes\nSome notes' },
              },
            },
          },
        },
      },
    },
    etc: {
      type: 'directory',
      children: {
        'config.ini': { type: 'file', content: 'key=value' },
      },
    },
    var: {
      type: 'directory',
      children: {
        log: {
          type: 'directory',
          children: {
            'app.log': {
              type: 'file',
              content: 'INFO: started\nERROR: something failed\nINFO: recovered',
            },
          },
        },
      },
    },
  },
};

describe('VirtualFS', () => {
  it('should initialize with cwd', () => {
    const fs = new VirtualFS(testFS, '/home/user');
    expect(fs.getCwd()).toBe('/home/user');
  });

  it('should resolve absolute paths', () => {
    const fs = new VirtualFS(testFS, '/home/user');
    expect(fs.resolvePath('/etc')).toBe('/etc');
  });

  it('should resolve relative paths', () => {
    const fs = new VirtualFS(testFS, '/home/user');
    expect(fs.resolvePath('docs')).toBe('/home/user/docs');
  });

  it('should resolve .. in paths', () => {
    const fs = new VirtualFS(testFS, '/home/user');
    expect(fs.resolvePath('..')).toBe('/home');
    expect(fs.resolvePath('../..')).toBe('/');
  });

  it('should check if path exists', () => {
    const fs = new VirtualFS(testFS);
    expect(fs.exists('/home/user/readme.txt')).toBe(true);
    expect(fs.exists('/nonexistent')).toBe(false);
  });

  it('should check directory/file type', () => {
    const fs = new VirtualFS(testFS);
    expect(fs.isDirectory('/home')).toBe(true);
    expect(fs.isFile('/home/user/readme.txt')).toBe(true);
    expect(fs.isDirectory('/home/user/readme.txt')).toBe(false);
  });

  it('should read file content', () => {
    const fs = new VirtualFS(testFS);
    expect(fs.readFile('/home/user/readme.txt')).toBe('Hello World');
  });

  it('should throw when reading nonexistent file', () => {
    const fs = new VirtualFS(testFS);
    expect(() => fs.readFile('/nonexistent')).toThrow('No such file');
  });

  it('should throw when reading directory as file', () => {
    const fs = new VirtualFS(testFS);
    expect(() => fs.readFile('/home')).toThrow('Is a directory');
  });

  it('should list directory contents', () => {
    const fs = new VirtualFS(testFS);
    expect(fs.listDir('/home/user')).toEqual(['docs', 'readme.txt']);
  });

  it('should write new files', () => {
    const fs = new VirtualFS(testFS);
    fs.writeFile('/home/user/new.txt', 'new content');
    expect(fs.readFile('/home/user/new.txt')).toBe('new content');
  });

  it('should overwrite existing files', () => {
    const fs = new VirtualFS(testFS);
    fs.writeFile('/home/user/readme.txt', 'updated');
    expect(fs.readFile('/home/user/readme.txt')).toBe('updated');
  });

  it('should change cwd', () => {
    const fs = new VirtualFS(testFS, '/');
    fs.changeCwd('/home/user');
    expect(fs.getCwd()).toBe('/home/user');
  });

  it('should throw when changing to nonexistent dir', () => {
    const fs = new VirtualFS(testFS);
    expect(() => fs.changeCwd('/nonexistent')).toThrow();
  });

  it('should copy files', () => {
    const fs = new VirtualFS(testFS);
    fs.copy('/home/user/readme.txt', '/home/user/readme_backup.txt');
    expect(fs.readFile('/home/user/readme_backup.txt')).toBe('Hello World');
    expect(fs.readFile('/home/user/readme.txt')).toBe('Hello World');
  });

  it('should copy file into directory', () => {
    const fs = new VirtualFS(testFS);
    fs.copy('/home/user/readme.txt', '/etc');
    expect(fs.readFile('/etc/readme.txt')).toBe('Hello World');
  });

  it('should create directories', () => {
    const fs = new VirtualFS(testFS);
    fs.mkdir('/home/user/newdir');
    expect(fs.isDirectory('/home/user/newdir')).toBe(true);
  });

  it('should create directories recursively', () => {
    const fs = new VirtualFS(testFS);
    fs.mkdir('/home/user/a/b/c', true);
    expect(fs.isDirectory('/home/user/a/b/c')).toBe(true);
  });

  it('should remove files', () => {
    const fs = new VirtualFS(testFS);
    fs.remove('/home/user/readme.txt');
    expect(fs.exists('/home/user/readme.txt')).toBe(false);
  });

  it('should remove directories recursively', () => {
    const fs = new VirtualFS(testFS);
    fs.remove('/home/user/docs', true);
    expect(fs.exists('/home/user/docs')).toBe(false);
  });

  it('should move files', () => {
    const fs = new VirtualFS(testFS);
    fs.move('/home/user/readme.txt', '/etc/readme.txt');
    expect(fs.exists('/home/user/readme.txt')).toBe(false);
    expect(fs.readFile('/etc/readme.txt')).toBe('Hello World');
  });

  it('should not mutate the original FS data', () => {
    const fs = new VirtualFS(testFS);
    fs.writeFile('/home/user/readme.txt', 'modified');
    expect(testFS.children!.home.children!.user.children!['readme.txt'].content).toBe('Hello World');
  });

  it('should find files by predicate', () => {
    const fs = new VirtualFS(testFS);
    const results = fs.find('/', (path, node) => node.type === 'file' && path.endsWith('.txt'));
    expect(results).toContain('/home/user/readme.txt');
  });

  it('should append to files', () => {
    const fs = new VirtualFS(testFS);
    fs.appendFile('/home/user/readme.txt', '\nAppended');
    expect(fs.readFile('/home/user/readme.txt')).toBe('Hello World\nAppended');
  });

  it('should list dir with details', () => {
    const fs = new VirtualFS(testFS);
    const items = fs.listDirDetailed('/home/user');
    expect(items).toEqual([
      { name: 'docs', type: 'directory' },
      { name: 'readme.txt', type: 'file' },
    ]);
  });
});
