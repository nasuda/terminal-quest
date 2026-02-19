import type { Story, FSNode } from '../types.js';

const mission1FS: FSNode = {
  type: 'directory',
  children: {
    home: {
      type: 'directory',
      children: {
        dev: {
          type: 'directory',
          children: {
            project: {
              type: 'directory',
              children: {
                'app.js': {
                  type: 'file',
                  content: 'const express = require("express");\nconst app = express();\napp.listen(3000);\n',
                },
                'readme.md': {
                  type: 'file',
                  content: '# My Project\n\nThis is a sample project.\n',
                },
                'test.js': {
                  type: 'file',
                  content: 'const assert = require("assert");\nassert.ok(true);\nconsole.log("tests passed");\n',
                },
                'style.css': {
                  type: 'file',
                  content: 'body { margin: 0; padding: 0; }\nh1 { color: #333; }\n',
                },
                'data.json': {
                  type: 'file',
                  content: '{"name": "my-project", "version": "1.0.0"}\n',
                },
              },
            },
          },
        },
      },
    },
  },
};

const mission2FS: FSNode = {
  type: 'directory',
  children: {
    home: {
      type: 'directory',
      children: {
        dev: {
          type: 'directory',
          children: {
            project: {
              type: 'directory',
              children: {
                'app.js': {
                  type: 'file',
                  content: 'const express = require("express");\nconst app = express();\napp.listen(3000);\n',
                },
                'style.css': {
                  type: 'file',
                  content: 'body { margin: 0; padding: 0; }\nh1 { color: #333; }\n',
                },
                'readme.md': {
                  type: 'file',
                  content: '# My Project\n\nThis is a sample project.\n',
                },
                'test.js': {
                  type: 'file',
                  content: 'const assert = require("assert");\nassert.ok(true);\nconsole.log("tests passed");\n',
                },
                src: {
                  type: 'directory',
                  children: {},
                },
                docs: {
                  type: 'directory',
                  children: {},
                },
                tests: {
                  type: 'directory',
                  children: {},
                },
              },
            },
          },
        },
      },
    },
  },
};

const mission3FS: FSNode = {
  type: 'directory',
  children: {
    home: {
      type: 'directory',
      children: {
        dev: {
          type: 'directory',
          children: {
            project: {
              type: 'directory',
              children: {
                src: {
                  type: 'directory',
                  children: {
                    'app.js': {
                      type: 'file',
                      content: 'const express = require("express");\nconst app = express();\napp.listen(3000);\n',
                    },
                    'old.tmp': {
                      type: 'file',
                      content: 'temporary file - safe to delete\n',
                    },
                  },
                },
                docs: {
                  type: 'directory',
                  children: {
                    'readme.md': {
                      type: 'file',
                      content: '# My Project\n\nThis is a sample project.\n',
                    },
                    'backup.bak': {
                      type: 'file',
                      content: 'old backup data\n',
                    },
                  },
                },
                tests: {
                  type: 'directory',
                  children: {
                    'test.js': {
                      type: 'file',
                      content: 'const assert = require("assert");\nassert.ok(true);\nconsole.log("tests passed");\n',
                    },
                  },
                },
                'cache.tmp': {
                  type: 'file',
                  content: 'cached data - safe to delete\n',
                },
              },
            },
          },
        },
      },
    },
  },
};

const appJsContent = [
  'const express = require("express");',
  'const app = express();',
  '',
  'app.get("/", (req, res) => {',
  '  res.send("Hello World");',
  '});',
  '',
  'app.get("/api/users", (req, res) => {',
  '  res.json([]);',
  '});',
  '',
  'app.get("/api/status", (req, res) => {',
  '  res.json({ status: "ok" });',
  '});',
  '',
  'app.post("/api/data", (req, res) => {',
  '  res.json({ success: true });',
  '});',
  '',
  'app.use((err, req, res, next) => {',
  '  console.error(err.stack);',
  '  res.status(500).send("Server Error");',
  '});',
  '',
  'const PORT = process.env.PORT || 3000;',
  'app.listen(PORT, () => {',
  '  console.log(`Server running on port ${PORT}`);',
  '});',
  '',
  '// End of file',
].join('\n') + '\n';

const readmeContent = [
  '# My Project',
  '',
  '## Overview',
  'A sample web application.',
  '',
  '## Installation',
  'npm install',
  '',
  '## Usage',
  'npm start',
].join('\n');

const testJsContent = [
  'const assert = require("assert");',
  '',
  'describe("App", () => {',
  '  it("should return 200", () => {',
  '    assert.ok(true);',
  '  });',
  '',
  '  it("should return users", () => {',
  '    assert.deepEqual([], []);',
  '  });',
  '',
  '  it("should return status", () => {',
  '    assert.equal("ok", "ok");',
  '  });',
  '',
  '  it("should handle errors", () => {',
  '    assert.ok(true);',
  '  });',
  '});',
].join('\n');

const mission4FS: FSNode = {
  type: 'directory',
  children: {
    home: {
      type: 'directory',
      children: {
        dev: {
          type: 'directory',
          children: {
            project: {
              type: 'directory',
              children: {
                src: {
                  type: 'directory',
                  children: {
                    'app.js': {
                      type: 'file',
                      content: appJsContent,
                    },
                  },
                },
                docs: {
                  type: 'directory',
                  children: {
                    'readme.md': {
                      type: 'file',
                      content: readmeContent,
                    },
                  },
                },
                tests: {
                  type: 'directory',
                  children: {
                    'test.js': {
                      type: 'file',
                      content: testJsContent,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export const story02: Story = {
  id: 'story-02',
  title: '散らかったプロジェクト',
  description:
    'プロジェクトのディレクトリがぐちゃぐちゃ。整理整頓してプロジェクト構造を立て直そう。',
  emoji: '\u{1F4C1}',
  missions: [
    {
      id: 'mission-02-01',
      title: 'ディレクトリを作ろう',
      description: 'mkdir コマンドでディレクトリを作成して、プロジェクト構造を整理しよう。',
      goal: 'mkdir でプロジェクトのディレクトリ構造を設計・作成できるようになる',
      narrative:
        'プロジェクトにはソースコード、ドキュメント、テストが混在している。まずはディレクトリを整理しよう。',
      initialCwd: '/home/dev/project',
      newCommands: ['mkdir'],
      initialFS: mission1FS,
      objectives: [
        {
          id: 'obj-02-01-01',
          description: 'src ディレクトリを作成する',
          checks: [{ type: 'file_exists', path: '/home/dev/project/src' }],
          hints: [
            { level: 1, text: 'ディレクトリを作成するコマンドがあります。' },
            { level: 2, text: '"Make Directory" の略で、mkdir コマンドを使います。' },
            { level: 3, text: '「mkdir src」と入力してEnterを押してください。' },
          ],
          feedbacks: [
            { pattern: 'touch', message: 'touch は空のファイルを作成するコマンドです。ディレクトリを作成するには、別のコマンドを使います。' },
            { pattern: 'cd', message: 'cd はディレクトリを移動するコマンドです。新しいディレクトリを作成するには、別のコマンドを使います。' },
          ],
        },
        {
          id: 'obj-02-01-02',
          description: 'docs ディレクトリを作成する',
          checks: [{ type: 'file_exists', path: '/home/dev/project/docs' }],
          hints: [
            { level: 1, text: '同じコマンドでもう1つディレクトリを作りましょう。' },
            { level: 2, text: 'mkdir コマンドに別の名前を指定します。' },
            { level: 3, text: '「mkdir docs」と入力してEnterを押してください。' },
          ],
        },
        {
          id: 'obj-02-01-03',
          description: 'tests ディレクトリを作成する',
          checks: [{ type: 'file_exists', path: '/home/dev/project/tests' }],
          hints: [
            { level: 1, text: 'テスト用のディレクトリも同様に作りましょう。' },
            { level: 2, text: 'mkdir コマンドを使って tests という名前で作成します。' },
            { level: 3, text: '「mkdir tests」と入力してEnterを押してください。' },
          ],
        },
      ],
    },
    {
      id: 'mission-02-02',
      title: 'ファイルを移動せよ',
      description: 'mv コマンドでファイルを適切なディレクトリに移動しよう。',
      goal: 'mv でファイルを適切な場所に移動・整理できるようになる',
      narrative:
        'ディレクトリができた。次はファイルを適切な場所に移動しよう。',
      initialCwd: '/home/dev/project',
      newCommands: ['mv'],
      initialFS: mission2FS,
      objectives: [
        {
          id: 'obj-02-02-01',
          description: 'app.js を src/ ディレクトリに移動する',
          checks: [
            { type: 'file_exists', path: '/home/dev/project/src/app.js' },
            { type: 'file_not_exists', path: '/home/dev/project/app.js' },
          ],
          hints: [
            { level: 1, text: 'ファイルを移動するコマンドがあります。' },
            { level: 2, text: '"Move" の略で、mv コマンドを使います。mv 元 先 の形式です。' },
            { level: 3, text: '「mv app.js src/」と入力してEnterを押してください。' },
          ],
          feedbacks: [
            { pattern: 'cp.*src', message: 'cp はファイルをコピーするコマンドです。コピーだと元の場所にもファイルが残ります。元のファイルを残さず移動するには mv を使いましょう。' },
            { pattern: 'cp', message: 'cp はファイルをコピーするコマンドです。元のファイルを残さず移動するには、mv コマンドを使います。' },
            { pattern: 'rm', message: 'rm はファイルを削除するコマンドです。ファイルを別の場所に移動するには、mv コマンドを使います。' },
          ],
        },
        {
          id: 'obj-02-02-02',
          description: 'readme.md を docs/ ディレクトリに移動する',
          checks: [{ type: 'file_exists', path: '/home/dev/project/docs/readme.md' }],
          hints: [
            { level: 1, text: 'ドキュメントファイルも適切な場所に移動しましょう。' },
            { level: 2, text: 'mv コマンドで readme.md を docs/ に移動します。' },
            { level: 3, text: '「mv readme.md docs/」と入力してEnterを押してください。' },
          ],
          feedbacks: [
            { pattern: 'cp.*docs', message: 'cp だと元の場所にもファイルが残ります。mv を使って移動しましょう。' },
          ],
        },
        {
          id: 'obj-02-02-03',
          description: 'test.js を tests/ ディレクトリに移動する',
          checks: [{ type: 'file_exists', path: '/home/dev/project/tests/test.js' }],
          hints: [
            { level: 1, text: 'テストファイルも適切な場所に移動しましょう。' },
            { level: 2, text: 'mv コマンドで test.js を tests/ に移動します。' },
            { level: 3, text: '「mv test.js tests/」と入力してEnterを押してください。' },
          ],
          feedbacks: [
            { pattern: 'cp.*tests', message: 'cp だと元の場所にもファイルが残ります。mv を使って移動しましょう。' },
          ],
        },
      ],
    },
    {
      id: 'mission-02-03',
      title: '不要なファイルを削除',
      description: '.tmp ファイルを見つけて削除しよう。',
      goal: 'find で不要ファイルを検索し、rm で安全に削除できるようになる',
      narrative:
        'プロジェクト内に不要な .tmp ファイルが散らばっている。find コマンドで見つけ出して、rm で削除しよう。',
      initialCwd: '/home/dev/project',
      newCommands: ['rm', 'find'],
      initialFS: mission3FS,
      objectives: [
        {
          id: 'obj-02-03-01',
          description: 'find コマンドで .tmp ファイルをすべて見つける',
          checks: [
            { type: 'command_executed', command: 'find' },
            { type: 'output_contains', pattern: '.tmp' },
          ],
          hints: [
            { level: 1, text: 'ファイルを検索するコマンドがあります。' },
            { level: 2, text: 'find コマンドは現在のディレクトリとサブディレクトリをすべて検索します。-name オプションで名前パターンを指定します。' },
            { level: 3, text: '「find . -name "*.tmp"」と入力してEnterを押してください。' },
          ],
          feedbacks: [
            { pattern: 'ls', message: 'ls は現在のディレクトリの中身を表示するコマンドです。サブディレクトリも含めてファイルを検索するには、別のコマンドを使います。' },
            { pattern: 'grep', message: 'grep はファイルの中身を検索するコマンドです。ファイル名で検索するには、別のコマンドを使います。' },
          ],
        },
        {
          id: 'obj-02-03-02',
          description: 'cache.tmp を削除する',
          checks: [{ type: 'file_not_exists', path: '/home/dev/project/cache.tmp' }],
          hints: [
            { level: 1, text: 'ファイルを削除するコマンドがあります。' },
            { level: 2, text: '"Remove" の略で、rm コマンドを使います。' },
            { level: 3, text: '「rm cache.tmp」と入力してEnterを押してください。' },
          ],
          feedbacks: [
            { pattern: 'mv', message: 'mv はファイルを移動するコマンドです。ファイルを削除するには、別のコマンドを使います。' },
            { pattern: 'find', message: 'find はファイルを検索するコマンドです。すでに見つけたファイルを削除するには、別のコマンドを使います。' },
          ],
        },
        {
          id: 'obj-02-03-03',
          description: 'src/old.tmp を削除する',
          checks: [{ type: 'file_not_exists', path: '/home/dev/project/src/old.tmp' }],
          hints: [
            { level: 1, text: 'サブディレクトリ内のファイルも削除しましょう。' },
            { level: 2, text: 'rm コマンドにパスを指定します。' },
            { level: 3, text: '「rm src/old.tmp」と入力してEnterを押してください。' },
          ],
        },
      ],
    },
    {
      id: 'mission-02-04',
      title: '新しいファイルを作成',
      description: '新しいファイルを作成して、プロジェクトの状態を確認しよう。',
      goal: 'touch でファイルを作成し、wc でコードの行数を確認できるようになる',
      narrative:
        'プロジェクト構造が整った。新しいファイルを作成して、プロジェクトの状態を確認しよう。',
      initialCwd: '/home/dev/project',
      newCommands: ['touch', 'wc'],
      initialFS: mission4FS,
      objectives: [
        {
          id: 'obj-02-04-01',
          description: 'CHANGELOG.md を作成する',
          checks: [{ type: 'file_exists', path: '/home/dev/project/CHANGELOG.md' }],
          hints: [
            { level: 1, text: '空のファイルを作成するコマンドがあります。' },
            { level: 2, text: 'touch コマンドでファイルを作成できます。' },
            { level: 3, text: '「touch CHANGELOG.md」と入力してEnterを押してください。' },
          ],
          feedbacks: [
            { pattern: 'mkdir', message: 'mkdir はディレクトリを作成するコマンドです。空のファイルを作成するには、別のコマンドを使います。' },
            { pattern: 'echo', message: 'echo はテキストを出力するコマンドです。空のファイルを作成するだけなら、もっと簡単なコマンドがあります。' },
          ],
        },
        {
          id: 'obj-02-04-02',
          description: 'app.js の行数を確認する',
          checks: [
            { type: 'command_executed', command: 'wc' },
            { type: 'output_contains', pattern: '30' },
          ],
          hints: [
            { level: 1, text: 'ファイルの行数を数えるコマンドがあります。' },
            { level: 2, text: '"Word Count" の略の wc コマンドに -l オプションをつけると行数を表示します。' },
            { level: 3, text: '「wc -l src/app.js」と入力してEnterを押してください。' },
          ],
        },
      ],
    },
  ],
  unlockRequires: ['story-01'],
  course: 'engineer',
};
