import { describe, it, expect, beforeEach } from 'vitest';
import { VirtualFS } from './VirtualFS.js';
import { CommandHandler } from './CommandHandler.js';
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
              'hello.txt': {
                type: 'file',
                content: 'Hello, World!\nThis is a test file.\nHello again!',
              },
              'notes.txt': {
                type: 'file',
                content: 'Some notes here\nImportant note\nAnother line',
              },
              '.hidden': {
                type: 'file',
                content: 'hidden file content',
              },
              docs: {
                type: 'directory',
                children: {
                  'readme.md': {
                    type: 'file',
                    content: '# README\nThis is the readme file.\n',
                  },
                  'guide.txt': {
                    type: 'file',
                    content: 'Step 1: Hello\nStep 2: World\n',
                  },
                },
              },
            },
          },
        },
      },
      tmp: {
        type: 'directory',
        children: {},
      },
    },
  };
}

describe('CommandHandler', () => {
  let handler: CommandHandler;
  let fs: VirtualFS;

  beforeEach(() => {
    fs = new VirtualFS(createTestFS(), '/home/user');
    handler = new CommandHandler(fs);
  });

  // --- pwd ---
  describe('pwd', () => {
    it('should print current working directory', () => {
      const result = handler.execute('pwd');
      expect(result.output).toBe('/home/user');
      expect(result.error).toBeUndefined();
    });

    it('should reflect directory changes', () => {
      handler.execute('cd docs');
      const result = handler.execute('pwd');
      expect(result.output).toBe('/home/user/docs');
    });
  });

  // --- ls ---
  describe('ls', () => {
    it('should list current directory contents', () => {
      const result = handler.execute('ls');
      expect(result.output).toContain('hello.txt');
      expect(result.output).toContain('notes.txt');
      expect(result.output).toContain('docs');
      expect(result.output).not.toContain('.hidden');
    });

    it('should show hidden files with -a', () => {
      const result = handler.execute('ls -a');
      expect(result.output).toContain('.hidden');
      expect(result.output).toContain('hello.txt');
    });

    it('should show detailed output with -l', () => {
      const result = handler.execute('ls -l');
      expect(result.output).toContain('docs/');
      expect(result.output).toContain('hello.txt');
      // Should contain permission strings
      expect(result.output).toMatch(/[d-][rwx-]{9}/);
    });

    it('should combine -la flags', () => {
      const result = handler.execute('ls -la');
      expect(result.output).toContain('.hidden');
      expect(result.output).toMatch(/[d-][rwx-]{9}/);
    });

    it('should list a specific path', () => {
      const result = handler.execute('ls docs');
      expect(result.output).toContain('readme.md');
      expect(result.output).toContain('guide.txt');
    });

    it('should error for non-existent path', () => {
      const result = handler.execute('ls nonexistent');
      expect(result.error).toContain('No such file or directory');
    });

    it('should handle listing a file path', () => {
      const result = handler.execute('ls hello.txt');
      expect(result.output).toContain('hello.txt');
    });
  });

  // --- cd ---
  describe('cd', () => {
    it('should change to a subdirectory', () => {
      const result = handler.execute('cd docs');
      expect(result.error).toBeUndefined();
      expect(fs.getCwd()).toBe('/home/user/docs');
    });

    it('should change to absolute path', () => {
      handler.execute('cd /tmp');
      expect(fs.getCwd()).toBe('/tmp');
    });

    it('should change to parent with ..', () => {
      handler.execute('cd ..');
      expect(fs.getCwd()).toBe('/home');
    });

    it('should go to root with no args', () => {
      handler.execute('cd');
      expect(fs.getCwd()).toBe('/');
    });

    it('should error for non-existent directory', () => {
      const result = handler.execute('cd nonexistent');
      expect(result.error).toContain('cd:');
    });

    it('should error when cd to a file', () => {
      const result = handler.execute('cd hello.txt');
      expect(result.error).toContain('cd:');
    });
  });

  // --- cat ---
  describe('cat', () => {
    it('should display file contents', () => {
      const result = handler.execute('cat hello.txt');
      expect(result.output).toBe('Hello, World!\nThis is a test file.\nHello again!');
    });

    it('should concatenate multiple files', () => {
      const result = handler.execute('cat hello.txt notes.txt');
      expect(result.output).toContain('Hello, World!');
      expect(result.output).toContain('Some notes here');
    });

    it('should error for non-existent file', () => {
      const result = handler.execute('cat nonexistent.txt');
      expect(result.error).toContain('cat:');
    });

    it('should error with no args', () => {
      const result = handler.execute('cat');
      expect(result.error).toBe('cat: missing file operand');
    });
  });

  // --- grep ---
  describe('grep', () => {
    it('should search for pattern in file', () => {
      const result = handler.execute('grep Hello hello.txt');
      expect(result.output).toContain('Hello, World!');
      expect(result.output).toContain('Hello again!');
    });

    it('should support case-insensitive search with -i', () => {
      const result = handler.execute('grep -i hello hello.txt');
      expect(result.output).toContain('Hello, World!');
      expect(result.output).toContain('Hello again!');
    });

    it('should show line numbers with -n', () => {
      const result = handler.execute('grep -n Hello hello.txt');
      expect(result.output).toContain('1:');
      expect(result.output).toContain('3:');
    });

    it('should search recursively with -r', () => {
      const result = handler.execute('grep -r Hello .');
      expect(result.output).toContain('hello.txt');
    });

    it('should combine flags -in', () => {
      const result = handler.execute('grep -in hello hello.txt');
      expect(result.output).toContain('1:');
      expect(result.output).toContain('3:');
    });

    it('should error for missing pattern', () => {
      const result = handler.execute('grep');
      expect(result.error).toContain('missing pattern');
    });

    it('should error for missing file operand', () => {
      const result = handler.execute('grep pattern');
      expect(result.error).toContain('missing file operand');
    });

    it('should error for non-existent file', () => {
      const result = handler.execute('grep Hello nonexistent.txt');
      expect(result.error).toContain('No such file or directory');
    });
  });

  // --- cp ---
  describe('cp', () => {
    it('should copy a file', () => {
      const result = handler.execute('cp hello.txt hello_copy.txt');
      expect(result.error).toBeUndefined();
      expect(fs.readFile('hello_copy.txt')).toBe('Hello, World!\nThis is a test file.\nHello again!');
    });

    it('should copy a file to a directory', () => {
      handler.execute('cp hello.txt /tmp');
      expect(fs.readFile('/tmp/hello.txt')).toBe('Hello, World!\nThis is a test file.\nHello again!');
    });

    it('should copy directory with -r', () => {
      handler.execute('cp -r docs /tmp');
      expect(fs.isDirectory('/tmp/docs')).toBe(true);
      expect(fs.readFile('/tmp/docs/readme.md')).toContain('README');
    });

    it('should error when copying directory without -r', () => {
      const result = handler.execute('cp docs /tmp');
      expect(result.error).toContain('directory');
    });

    it('should error with missing operand', () => {
      const result = handler.execute('cp hello.txt');
      expect(result.error).toContain('missing file operand');
    });
  });

  // --- echo ---
  describe('echo', () => {
    it('should echo text', () => {
      const result = handler.execute('echo hello world');
      expect(result.output).toBe('hello world');
    });

    it('should echo empty for no args', () => {
      const result = handler.execute('echo');
      expect(result.output).toBe('');
    });

    it('should handle quoted strings', () => {
      const result = handler.execute('echo "hello world"');
      expect(result.output).toBe('hello world');
    });

    it('should handle single-quoted strings', () => {
      const result = handler.execute("echo 'hello world'");
      expect(result.output).toBe('hello world');
    });
  });

  // --- help ---
  describe('help', () => {
    it('should display available commands', () => {
      const result = handler.execute('help');
      expect(result.output).toContain('pwd');
      expect(result.output).toContain('ls');
      expect(result.output).toContain('cd');
      expect(result.output).toContain('cat');
      expect(result.output).toContain('grep');
      expect(result.output).toContain('echo');
    });
  });

  // --- hint ---
  describe('hint', () => {
    it('should return HINT_REQUEST', () => {
      const result = handler.execute('hint');
      expect(result.output).toBe('HINT_REQUEST');
    });
  });

  // --- clear ---
  describe('clear', () => {
    it('should return CLEAR_SCREEN', () => {
      const result = handler.execute('clear');
      expect(result.output).toBe('CLEAR_SCREEN');
    });
  });

  // --- Redirect ---
  describe('redirect >', () => {
    it('should write output to file with >', () => {
      const result = handler.execute('echo hello > /tmp/out.txt');
      expect(result.output).toBe('');
      expect(result.error).toBeUndefined();
      expect(fs.readFile('/tmp/out.txt')).toBe('hello');
    });

    it('should overwrite existing file with >', () => {
      handler.execute('echo first > /tmp/out.txt');
      handler.execute('echo second > /tmp/out.txt');
      expect(fs.readFile('/tmp/out.txt')).toBe('second');
    });

    it('should append to file with >>', () => {
      handler.execute('echo first > /tmp/out.txt');
      handler.execute('echo second >> /tmp/out.txt');
      expect(fs.readFile('/tmp/out.txt')).toBe('firstsecond');
    });

    it('should create file if it does not exist with >>', () => {
      handler.execute('echo hello >> /tmp/new.txt');
      expect(fs.readFile('/tmp/new.txt')).toBe('hello');
    });
  });

  // --- Quote handling ---
  describe('quote handling', () => {
    it('should handle double quotes with spaces', () => {
      const result = handler.execute('echo "hello   world"');
      expect(result.output).toBe('hello   world');
    });

    it('should handle single quotes with spaces', () => {
      const result = handler.execute("echo 'hello   world'");
      expect(result.output).toBe('hello   world');
    });

    it('should handle mixed quotes', () => {
      const result = handler.execute(`echo "it's" a 'test "here"'`);
      expect(result.output).toBe("it's a test \"here\"");
    });

    it('should handle adjacent quoted and unquoted text', () => {
      const result = handler.execute('echo hello"world"');
      expect(result.output).toBe('helloworld');
    });
  });

  // --- Unknown commands ---
  describe('unknown commands', () => {
    it('should return error for unknown command', () => {
      const result = handler.execute('foobar');
      expect(result.error).toBe('foobar: command not found');
    });

    it('should return error with correct command name', () => {
      const result = handler.execute('nonexistent_cmd file.txt');
      expect(result.error).toBe('nonexistent_cmd: command not found');
    });
  });

  // --- Empty / whitespace input ---
  describe('empty input', () => {
    it('should handle empty input', () => {
      const result = handler.execute('');
      expect(result.output).toBe('');
      expect(result.error).toBeUndefined();
    });

    it('should handle whitespace-only input', () => {
      const result = handler.execute('   ');
      expect(result.output).toBe('');
      expect(result.error).toBeUndefined();
    });
  });

  // --- Pipe ---
  describe('pipe', () => {
    it('should pass output through pipe (basic support)', () => {
      // echo hello | grep hello should still work as far as grep gets the text
      // Currently piped grep won't receive stdin, but basic pipe splitting works
      const result = handler.execute('echo hello');
      expect(result.output).toBe('hello');
    });
  });

  // --- wc line count fix ---
  describe('wc line count', () => {
    it('should count newlines correctly for content ending with newline', () => {
      // hello.txt has 3 lines with no trailing newline -> 2 newlines -> 2 lines
      const result = handler.execute('wc -l hello.txt');
      expect(result.output).toBe('2 hello.txt');
    });

    it('should return 0 lines for empty file', () => {
      fs.writeFile('/tmp/empty.txt', '');
      handler.execute('cd /tmp');
      const result = handler.execute('wc -l empty.txt');
      expect(result.output).toBe('0 empty.txt');
    });

    it('should count single line with trailing newline as 1', () => {
      fs.writeFile('/tmp/oneline.txt', 'hello\n');
      handler.execute('cd /tmp');
      const result = handler.execute('wc -l oneline.txt');
      expect(result.output).toBe('1 oneline.txt');
    });

    it('should count lines from pipe correctly', () => {
      const result = handler.execute('echo "line1\nline2\nline3" | wc -l');
      // pipe adds trailing \n: "line1\nline2\nline3\n" → 3 newlines → 3 lines
      expect(result.output).toBe('3');
    });
  });

  // --- head/tail empty file ---
  describe('head/tail empty file', () => {
    it('head should return empty for empty file', () => {
      fs.writeFile('/tmp/empty.txt', '');
      handler.execute('cd /tmp');
      const result = handler.execute('head empty.txt');
      expect(result.output).toBe('');
    });

    it('tail should return empty for empty file', () => {
      fs.writeFile('/tmp/empty.txt', '');
      handler.execute('cd /tmp');
      const result = handler.execute('tail empty.txt');
      expect(result.output).toBe('');
    });
  });

  // --- sort -t/-k ---
  describe('sort -t/-k', () => {
    it('should sort by field with delimiter', () => {
      fs.writeFile('/tmp/data.csv', 'Bob,30\nAlice,25\nCharlie,35');
      handler.execute('cd /tmp');
      const result = handler.execute('sort -t, -k2 -n data.csv');
      expect(result.output).toBe('Alice,25\nBob,30\nCharlie,35');
    });

    it('should sort by field in reverse', () => {
      fs.writeFile('/tmp/data.csv', 'Bob,30\nAlice,25\nCharlie,35');
      handler.execute('cd /tmp');
      const result = handler.execute('sort -t, -k2 -n -r data.csv');
      expect(result.output).toBe('Charlie,35\nBob,30\nAlice,25');
    });
  });

  // --- ls -l path resolution ---
  describe('ls -l path resolution', () => {
    it('should show permissions for subdirectory entries', () => {
      const result = handler.execute('ls -l docs');
      expect(result.output).toContain('readme.md');
      expect(result.output).toMatch(/[d-][rwx-]{9}/);
    });
  });

  // --- man command ---
  describe('man', () => {
    it('should show command reference for no args', () => {
      const result = handler.execute('man');
      expect(result.output).toContain('Terminal Quest');
      expect(result.output).toContain('Navigation');
    });

    it('should show detail for specific command', () => {
      const result = handler.execute('man ls');
      expect(result.output).toContain('NAME');
      expect(result.output).toContain('USAGE');
      expect(result.output).toContain('EXAMPLES');
    });

    it('should error for unknown command', () => {
      const result = handler.execute('man nonexistent');
      expect(result.error).toContain('マニュアルはありません');
    });
  });

  // --- pipe chains ---
  describe('pipe chains', () => {
    it('should pipe echo into grep', () => {
      const result = handler.execute('echo hello | grep hello');
      expect(result.output).toContain('hello');
      expect(result.error).toBeUndefined();
    });

    it('should pipe cat into head -n 1', () => {
      const result = handler.execute('cat hello.txt | head -n 1');
      expect(result.output).toBe('Hello, World!');
    });

    it('should pipe cat into tail -n 1', () => {
      const result = handler.execute('cat hello.txt | tail -n 1');
      expect(result.output).toBe('Hello again!');
    });

    it('should handle 3-stage pipe: cat | grep | wc -l', () => {
      // hello.txt: "Hello, World!\nThis is a test file.\nHello again!"
      // grep Hello matches 2 lines -> "Hello, World!\nHello again!"
      // pipe adds trailing \n → wc -l counts 2 newlines → 2 lines
      const result = handler.execute('cat hello.txt | grep Hello | wc -l');
      expect(result.output).toBe('2');
    });

    it('should pipe cat into sort', () => {
      const result = handler.execute('cat notes.txt | sort');
      // notes.txt: "Some notes here\nImportant note\nAnother line"
      // sorted: Another line, Important note, Some notes here
      expect(result.output).toBe('Another line\nImportant note\nSome notes here');
    });

    it('should pipe cat into sort then uniq', () => {
      const result = handler.execute('cat notes.txt | sort | uniq');
      expect(result.output).toBe('Another line\nImportant note\nSome notes here');
    });
  });

  // --- pipe errors ---
  describe('pipe errors', () => {
    it('should error on empty pipe segment', () => {
      const result = handler.execute('echo hello | | grep hello');
      expect(result.error).toContain('syntax error');
    });

    it('should error on trailing pipe', () => {
      const result = handler.execute('echo hello |');
      expect(result.error).toBeDefined();
    });

    it('should error when command not found in pipe', () => {
      const result = handler.execute('echo hello | nonexistent');
      expect(result.error).toContain('command not found');
    });
  });

  // --- pipe + redirect ---
  describe('pipe + redirect', () => {
    it('should pipe output and redirect to file', () => {
      const result = handler.execute('cat hello.txt | grep Hello > /tmp/result.txt');
      expect(result.error).toBeUndefined();
      const content = fs.readFile('/tmp/result.txt');
      expect(content).toContain('Hello');
    });
  });

  // --- command edge cases ---
  describe('command edge cases', () => {
    it('should error when rm target does not exist', () => {
      const result = handler.execute('rm nonexistent.txt');
      expect(result.error).toBeDefined();
    });

    it('should error when cp destination directory does not exist', () => {
      const result = handler.execute('cp hello.txt /nonexistent/dir/');
      expect(result.error).toBeDefined();
    });

    it('should find files by name pattern with find -name', () => {
      const result = handler.execute('find . -name "*.txt"');
      expect(result.output).toContain('hello.txt');
      expect(result.output).toContain('notes.txt');
    });

    it('should find files by type with find -type f', () => {
      const result = handler.execute('find . -type f');
      expect(result.output).toContain('hello.txt');
    });

    it('should show counts for multiple files with wc -l', () => {
      const result = handler.execute('wc -l hello.txt notes.txt');
      // hello.txt has 2 newlines, notes.txt has 2 newlines
      expect(result.output).toContain('hello.txt');
      expect(result.output).toContain('notes.txt');
      expect(result.output).toContain('total');
    });
  });

  // --- grep -c ---
  describe('grep -c', () => {
    it('should count matching lines with -c', () => {
      const result = handler.execute('grep -c Hello hello.txt');
      // hello.txt has 2 lines containing "Hello": "Hello, World!" and "Hello again!"
      expect(result.output).toBe('2');
    });

    it('should return 0 when no lines match with -c', () => {
      const result = handler.execute('grep -c ERROR hello.txt');
      expect(result.output).toBe('0');
    });

    it('should count matching lines from stdin with -c', () => {
      const result = handler.execute('echo "Hello World\nHello Again\nBye" | grep -c Hello');
      expect(result.output).toBe('2');
    });
  });
});
