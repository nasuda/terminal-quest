import { describe, it, expect, beforeEach } from 'vitest';
import { VirtualFS } from './VirtualFS.js';
import { TabCompletion } from './TabCompletion.js';
import type { FSNode } from '../data/types.js';

function createTestFS(): FSNode {
  return {
    type: 'directory',
    children: {
      home: {
        type: 'directory',
        children: {
          user: {
            type: 'directory',
            children: {
              'hello.txt': { type: 'file', content: 'hello' },
              'help.md': { type: 'file', content: 'help' },
              'notes.txt': { type: 'file', content: 'notes' },
              docs: {
                type: 'directory',
                children: {
                  'readme.md': { type: 'file', content: 'readme' },
                },
              },
              src: {
                type: 'directory',
                children: {
                  'main.ts': { type: 'file', content: 'main' },
                },
              },
            },
          },
        },
      },
    },
  };
}

describe('TabCompletion', () => {
  let tc: TabCompletion;

  beforeEach(() => {
    const fs = new VirtualFS(createTestFS(), '/home/user');
    tc = new TabCompletion(fs);
  });

  describe('empty input', () => {
    it('should return empty for empty input', () => {
      const result = tc.complete('');
      expect(result.completed).toBe('');
      expect(result.candidates).toEqual([]);
    });
  });

  describe('command completion', () => {
    it('should complete unique command prefix', () => {
      const result = tc.complete('pw');
      expect(result.completed).toBe('pwd ');
      expect(result.candidates).toEqual([]);
    });

    it('should show candidates for ambiguous command prefix', () => {
      const result = tc.complete('he');
      expect(result.candidates).toContain('head');
      expect(result.candidates).toContain('help');
    });

    it('should return no candidates for non-matching prefix', () => {
      const result = tc.complete('xyz');
      expect(result.completed).toBe('xyz');
      expect(result.candidates).toEqual([]);
    });
  });

  describe('path completion', () => {
    it('should complete unique file prefix', () => {
      const result = tc.complete('cat n');
      expect(result.completed).toBe('cat notes.txt ');
    });

    it('should complete directory with trailing slash', () => {
      const result = tc.complete('cd d');
      expect(result.completed).toBe('cd docs/');
    });

    it('should show candidates for ambiguous path prefix', () => {
      const result = tc.complete('cat hel');
      expect(result.candidates).toContain('hello.txt');
      expect(result.candidates).toContain('help.md');
    });

    it('should complete with path containing slash', () => {
      const result = tc.complete('cat docs/r');
      expect(result.completed).toBe('cat docs/readme.md ');
    });

    it('should complete on empty arg after space', () => {
      const result = tc.complete('ls ');
      expect(result.candidates.length).toBeGreaterThan(0);
    });

    it('should show directories with trailing slash in candidates', () => {
      const result = tc.complete('ls ');
      expect(result.candidates).toContain('docs/');
      expect(result.candidates).toContain('src/');
    });
  });
});
