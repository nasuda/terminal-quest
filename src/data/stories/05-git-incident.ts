import type { Story, FSNode } from '../types.js';

const gitLogContent = [
  'commit a1b2c3d (HEAD -> main)',
  'Author: senpai <senpai@example.com>',
  'Date:   Mon Jan 15 10:00:00 2024',
  '',
  '    add api endpoint',
  '',
  'commit e4f5g6h',
  'Author: senpai <senpai@example.com>',
  'Date:   Mon Jan 15 09:00:00 2024',
  '',
  '    add login feature',
  '',
  'commit i7j8k9l',
  'Author: senpai <senpai@example.com>',
  'Date:   Mon Jan 15 08:00:00 2024',
  '',
  '    initial commit',
].join('\n');

const gitStatusOutput = [
  'On branch main',
  'Changes not staged for commit:',
  '  (use "git add <file>..." to update what will be committed)',
  '  (use "git restore <file>..." to discard changes in working directory)',
  '',
  '	modified:   src/app.js',
  '	modified:   config.json',
  '',
  'no changes added to commit (use "git add" to track)',
].join('\n');

const gitDiffOutput = [
  'diff --git a/src/app.js b/src/app.js',
  'index 1234567..abcdefg 100644',
  '--- a/src/app.js',
  '+++ b/src/app.js',
  '@@ -1,5 +1,7 @@',
  ' const express = require("express");',
  ' const app = express();',
  '+const cors = require("cors");',
  '+app.use(cors());',
  ' ',
  ' app.get("/api/users", (req, res) => {',
  '-  res.json([]);',
  '+  res.json([{ id: 1, name: "admin" }]);',
  ' });',
  'diff --git a/config.json b/config.json',
  'index 2345678..bcdefgh 100644',
  '--- a/config.json',
  '+++ b/config.json',
  '@@ -1,3 +1,4 @@',
  ' {',
  '   "port": 3000,',
  '-  "debug": false',
  '+  "debug": true,',
  '+  "cors": true',
  ' }',
].join('\n');

const mission1FS: FSNode = {
  type: 'directory',
  children: {
    home: {
      type: 'directory',
      children: {
        dev: {
          type: 'directory',
          children: {
            repo: {
              type: 'directory',
              children: {
                '.git': {
                  type: 'directory',
                  children: {
                    HEAD: {
                      type: 'file',
                      content: 'ref: refs/heads/main',
                    },
                    branches: {
                      type: 'file',
                      content: 'main\nfeature/login\nfeature/api',
                    },
                    log: {
                      type: 'file',
                      content: gitLogContent,
                    },
                    status: {
                      type: 'file',
                      content: gitStatusOutput,
                    },
                  },
                },
                src: {
                  type: 'directory',
                  children: {
                    'app.js': {
                      type: 'file',
                      content: [
                        'const express = require("express");',
                        'const app = express();',
                        'const cors = require("cors");',
                        'app.use(cors());',
                        '',
                        'app.get("/api/users", (req, res) => {',
                        '  res.json([{ id: 1, name: "admin" }]);',
                        '});',
                        '',
                        'app.listen(3000);',
                      ].join('\n'),
                    },
                  },
                },
                'config.json': {
                  type: 'file',
                  content: '{\n  "port": 3000,\n  "debug": true,\n  "cors": true\n}\n',
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
            repo: {
              type: 'directory',
              children: {
                '.git': {
                  type: 'directory',
                  children: {
                    HEAD: {
                      type: 'file',
                      content: 'ref: refs/heads/main',
                    },
                    branches: {
                      type: 'file',
                      content: 'main\nfeature/login\nfeature/api',
                    },
                    log: {
                      type: 'file',
                      content: gitLogContent,
                    },
                    status: {
                      type: 'file',
                      content: gitStatusOutput,
                    },
                  },
                },
                src: {
                  type: 'directory',
                  children: {
                    'app.js': {
                      type: 'file',
                      content: [
                        'const express = require("express");',
                        'const app = express();',
                        'const cors = require("cors");',
                        'app.use(cors());',
                        '',
                        'app.get("/api/users", (req, res) => {',
                        '  res.json([{ id: 1, name: "admin" }]);',
                        '});',
                        '',
                        'app.listen(3000);',
                      ].join('\n'),
                    },
                  },
                },
                'config.json': {
                  type: 'file',
                  content: '{\n  "port": 3000,\n  "debug": true,\n  "cors": true\n}\n',
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
            repo: {
              type: 'directory',
              children: {
                '.git': {
                  type: 'directory',
                  children: {
                    HEAD: {
                      type: 'file',
                      content: 'ref: refs/heads/main',
                    },
                    branches: {
                      type: 'file',
                      content: 'main\nfeature/login\nfeature/api',
                    },
                    log: {
                      type: 'file',
                      content: gitLogContent,
                    },
                  },
                },
                src: {
                  type: 'directory',
                  children: {
                    'app.js': {
                      type: 'file',
                      content: 'const express = require("express");\nconst app = express();\napp.listen(3000);\n',
                    },
                  },
                },
                'config.json': {
                  type: 'file',
                  content: '{\n  "port": 3000,\n  "debug": false\n}\n',
                },
              },
            },
          },
        },
      },
    },
  },
};

const mission4FS: FSNode = {
  type: 'directory',
  children: {
    home: {
      type: 'directory',
      children: {
        dev: {
          type: 'directory',
          children: {
            repo: {
              type: 'directory',
              children: {
                '.git': {
                  type: 'directory',
                  children: {
                    HEAD: {
                      type: 'file',
                      content: 'ref: refs/heads/hotfix',
                    },
                    branches: {
                      type: 'file',
                      content: 'main\nfeature/login\nfeature/api\nhotfix',
                    },
                    log: {
                      type: 'file',
                      content: gitLogContent,
                    },
                    diff: {
                      type: 'file',
                      content: gitDiffOutput,
                    },
                  },
                },
                src: {
                  type: 'directory',
                  children: {
                    'app.js': {
                      type: 'file',
                      content: [
                        'const express = require("express");',
                        'const app = express();',
                        'const cors = require("cors");',
                        'app.use(cors());',
                        '',
                        'app.get("/api/users", (req, res) => {',
                        '  res.json([{ id: 1, name: "admin" }]);',
                        '});',
                        '',
                        'app.listen(3000);',
                      ].join('\n'),
                    },
                  },
                },
                'config.json': {
                  type: 'file',
                  content: '{\n  "port": 3000,\n  "debug": true,\n  "cors": true\n}\n',
                },
              },
            },
          },
        },
      },
    },
  },
};

const mission5FS: FSNode = {
  type: 'directory',
  children: {
    home: {
      type: 'directory',
      children: {
        dev: {
          type: 'directory',
          children: {
            repo: {
              type: 'directory',
              children: {
                '.git': {
                  type: 'directory',
                  children: {
                    HEAD: {
                      type: 'file',
                      content: 'ref: refs/heads/hotfix',
                    },
                    branches: {
                      type: 'file',
                      content: 'main\nfeature/login\nfeature/api\nhotfix',
                    },
                    log: {
                      type: 'file',
                      content: gitLogContent,
                    },
                    'merge-result': {
                      type: 'file',
                      content: 'Merge made by the \'ort\' strategy.\n src/app.js   | 4 +++-\n config.json  | 3 ++-\n 2 files changed, 5 insertions(+), 2 deletions(-)',
                    },
                  },
                },
                src: {
                  type: 'directory',
                  children: {
                    'app.js': {
                      type: 'file',
                      content: [
                        'const express = require("express");',
                        'const app = express();',
                        'const cors = require("cors");',
                        'app.use(cors());',
                        '',
                        'app.get("/api/users", (req, res) => {',
                        '  res.json([{ id: 1, name: "admin" }]);',
                        '});',
                        '',
                        'app.listen(3000);',
                      ].join('\n'),
                    },
                  },
                },
                'config.json': {
                  type: 'file',
                  content: '{\n  "port": 3000,\n  "debug": true,\n  "cors": true\n}\n',
                },
              },
            },
          },
        },
      },
    },
  },
};

export const story05: Story = {
  id: 'story-05',
  title: 'Git大事件',
  description:
    'チームのGitリポジトリでトラブル発生！ブランチの混乱を整理し、マージの問題を解決しよう。',
  emoji: '\u{1F33F}',
  missions: [
    {
      id: 'mission-05-01',
      title: '状況確認',
      description: 'git status と git log で現在のリポジトリの状態を把握しよう。',
      goal: 'git status と git log でリポジトリの状態と履歴を把握できるようになる',
      narrative:
        '先輩が「リポジトリがおかしい」と焦っている。まずは状況を確認しよう。',
      initialCwd: '/home/dev/repo',
      newCommands: ['git'],
      initialFS: mission1FS,
      objectives: [
        {
          id: 'obj-05-01-01',
          description: 'git status で変更されたファイルを確認する',
          checks: [
            { type: 'command_executed', command: 'git' },
            { type: 'output_contains', pattern: 'modified' },
          ],
          hints: [
            { level: 1, text: '変更されたファイルや現在の状態を一覧表示するGitコマンドがあります。' },
            { level: 2, text: 'git status コマンドで変更されたファイルを確認できます。' },
            { level: 3, text: '「git status」と入力してEnterを押してください。' },
          ],
        },
        {
          id: 'obj-05-01-02',
          description: 'コミット履歴を確認する',
          checks: [
            { type: 'command_executed', command: 'git' },
            { type: 'output_contains', pattern: 'Author' },
          ],
          hints: [
            { level: 1, text: 'コミットの履歴を表示するGitコマンドがあります。' },
            { level: 2, text: 'git log コマンドで過去のコミットを確認できます。' },
            { level: 3, text: '「git log」と入力してEnterを押してください。' },
          ],
        },
      ],
      review: {
        question: 'git status と git log の違いは何ですか？',
        choices: [
          'どちらも同じ情報を表示する',
          'status は現在の変更状態、log は過去のコミット履歴を表示する',
          'status はブランチ一覧、log はファイル一覧を表示する',
          'status は削除専用、log は作成専用のコマンド',
        ],
        correctIndex: 1,
        explanation: 'git status は「今どのファイルが変更されているか」を表示します。git log は「過去にどんなコミットがあったか」の履歴を表示します。どちらも状況把握に重要です。',
      },
    },
    {
      id: 'mission-05-02',
      title: '変更の退避',
      description: 'git stash で作業中の変更を一旦退避しよう。',
      goal: 'git stash で作業中の変更を安全に退避できるようになる',
      narrative:
        '作業中の変更を一旦退避して、安全な状態に戻そう。',
      initialCwd: '/home/dev/repo',
      initialFS: mission2FS,
      objectives: [
        {
          id: 'obj-05-02-01',
          description: 'git stash で作業中の変更を一時退避する',
          checks: [
            { type: 'command_executed', command: 'git' },
            { type: 'output_contains', pattern: 'stash' },
          ],
          hints: [
            { level: 1, text: '変更を一時的に退避するGitコマンドがあります。' },
            { level: 2, text: 'git stash コマンドで変更を一時保存し、作業ツリーをクリーンな状態にできます。' },
            { level: 3, text: '「git stash」と入力してEnterを押してください。' },
          ],
        },
      ],
      review: {
        question: 'git stash はどんな時に使いますか？',
        choices: [
          '変更を完全に削除したい時',
          '作業中の変更を一時的に退避して、後で戻したい時',
          '新しいブランチを作成する時',
          'ファイルの名前を変更する時',
        ],
        correctIndex: 1,
        explanation: 'git stash は「今の作業を一旦棚に上げる」イメージです。別の作業をした後、git stash pop で棚から戻せます。変更を失わずに安全に退避できる便利なコマンドです。',
      },
    },
    {
      id: 'mission-05-03',
      title: 'ブランチ操作',
      description: 'git branch と git checkout でブランチを操作しよう。',
      goal: 'git branch でブランチ確認、git checkout -b で新しいブランチを作れるようになる',
      narrative:
        '修正用のブランチを作って切り替えよう。',
      initialCwd: '/home/dev/repo',
      initialFS: mission3FS,
      objectives: [
        {
          id: 'obj-05-03-01',
          description: 'ブランチの一覧を確認する',
          checks: [
            { type: 'command_executed', command: 'git' },
            { type: 'output_contains', pattern: 'main' },
          ],
          hints: [
            { level: 1, text: 'ブランチの一覧を表示するGitコマンドがあります。' },
            { level: 2, text: 'git branch コマンドでブランチ一覧を表示できます。' },
            { level: 3, text: '「git branch」と入力してEnterを押してください。' },
          ],
        },
        {
          id: 'obj-05-03-02',
          description: 'hotfix ブランチを作成して切り替える',
          checks: [
            { type: 'command_executed', command: 'git' },
            { type: 'output_contains', pattern: 'hotfix' },
          ],
          hints: [
            { level: 1, text: '新しいブランチを作成して同時に切り替えるオプションがあります。' },
            { level: 2, text: 'git checkout に -b オプションをつけると、新しいブランチを作って切り替えられます。' },
            { level: 3, text: '「git checkout -b hotfix」と入力してEnterを押してください。' },
          ],
          feedbacks: [
            { pattern: 'git branch hotfix$', message: 'git branch だけではブランチの作成のみで、切り替えはされません。git checkout -b hotfix で作成と切り替えを同時にできます。' },
            { pattern: 'git checkout hotfix$', message: '-b をつけないと既存ブランチへの切り替えになります。新規作成するには git checkout -b hotfix です。' },
          ],
        },
      ],
      review: {
        question: '「git checkout -b hotfix」は何をしますか？',
        choices: [
          'hotfix ブランチを削除する',
          'hotfix という名前の新しいブランチを作成し、そこに切り替える',
          '既存の hotfix ブランチに切り替える',
          'hotfix ブランチの変更をマージする',
        ],
        correctIndex: 1,
        explanation: 'git checkout -b は「新しいブランチを作って同時に切り替える」コマンドです。-b なしの git checkout hotfix は「既にある hotfix ブランチに切り替える」だけです。',
      },
    },
    {
      id: 'mission-05-04',
      title: '変更の確認',
      description: 'git diff で変更内容を確認して問題箇所を特定しよう。',
      goal: 'git diff でコードの変更差分を確認し問題を特定できるようになる',
      narrative:
        '変更内容を確認して、問題の箇所を特定しよう。',
      initialCwd: '/home/dev/repo',
      initialFS: mission4FS,
      objectives: [
        {
          id: 'obj-05-04-01',
          description: 'git diff でコードの変更差分を確認する',
          checks: [
            { type: 'command_executed', command: 'git' },
            { type: 'output_contains', pattern: '@@' },
          ],
          hints: [
            { level: 1, text: 'ファイルの変更差分を表示するGitコマンドがあります。' },
            { level: 2, text: 'git diff コマンドで変更箇所を確認できます。' },
            { level: 3, text: '「git diff」と入力してEnterを押してください。' },
          ],
        },
      ],
      review: {
        question: 'git diff の出力で「+」と「-」は何を表しますか？',
        choices: [
          '+ は追加された行、- は削除された行',
          '+ はファイル作成、- はファイル削除',
          '+ は正しいコード、- は間違ったコード',
          '+ はコミット済み、- は未コミット',
        ],
        correctIndex: 0,
        explanation: 'git diff では + の行は新しく追加された行、- の行は削除された行を表します。変更前と変更後の差分がひと目でわかるので、レビューに欠かせないコマンドです。',
      },
    },
    {
      id: 'mission-05-05',
      title: 'マージ',
      description: '修正をメインブランチに統合しよう。',
      goal: 'git checkout と git merge でブランチを統合できるようになる',
      narrative:
        '修正が完了した。メインブランチに統合しよう。',
      initialCwd: '/home/dev/repo',
      initialFS: mission5FS,
      objectives: [
        {
          id: 'obj-05-05-01',
          description: 'main ブランチに切り替える',
          checks: [
            { type: 'command_executed', command: 'git' },
            { type: 'output_contains', pattern: 'Switched' },
          ],
          hints: [
            { level: 1, text: 'ブランチを切り替えるGitコマンドがあります。' },
            { level: 2, text: 'git checkout コマンドでブランチを切り替えられます。' },
            { level: 3, text: '「git checkout main」と入力してEnterを押してください。' },
          ],
        },
        {
          id: 'obj-05-05-02',
          description: 'hotfix ブランチをマージする',
          checks: [
            { type: 'command_executed', command: 'git' },
            { type: 'output_contains', pattern: 'Merge' },
          ],
          hints: [
            { level: 1, text: '別のブランチの変更を取り込むGitコマンドがあります。' },
            { level: 2, text: 'git merge コマンドで指定したブランチの変更を現在のブランチに統合できます。' },
            { level: 3, text: '「git merge hotfix」と入力してEnterを押してください。' },
          ],
          feedbacks: [
            { pattern: 'git merge main$', message: '今 main ブランチにいるので、main をマージしても意味がありません。統合したいブランチ名（hotfix）を指定しましょう。' },
          ],
        },
      ],
      review: {
        question: 'git merge hotfix を実行する前に必要なことは何ですか？',
        choices: [
          'hotfix ブランチを削除する',
          '統合先のブランチ（main）に切り替えておく',
          'すべてのファイルを削除する',
          'git stash を実行する',
        ],
        correctIndex: 1,
        explanation: 'git merge は「現在いるブランチに、指定したブランチの変更を取り込む」コマンドです。なので、先に統合先のブランチ（この場合は main）に切り替えておく必要があります。',
      },
    },
  ],
  unlockRequires: ['story-02'],
  course: 'engineer',
};
