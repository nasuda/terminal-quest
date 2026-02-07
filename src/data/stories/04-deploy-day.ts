import type { Story, FSNode } from '../types.js';

const mission1FS: FSNode = {
  type: 'directory',
  children: {
    home: {
      type: 'directory',
      children: {
        deploy: {
          type: 'directory',
          children: {
            source: {
              type: 'directory',
              children: {
                app: {
                  type: 'directory',
                  children: {
                    'index.js': {
                      type: 'file',
                      content: 'const app = require("./server");\napp.start();\n',
                    },
                    'server.js': {
                      type: 'file',
                      content: [
                        'const http = require("http");',
                        'module.exports = {',
                        '  start() {',
                        '    http.createServer((req, res) => {',
                        '      res.end("OK");',
                        '    }).listen(8080);',
                        '  }',
                        '};',
                      ].join('\n'),
                    },
                  },
                },
                config: {
                  type: 'directory',
                  children: {
                    'app.json': {
                      type: 'file',
                      content: '{"env": "production", "port": 8080}\n',
                    },
                  },
                },
                'README.md': {
                  type: 'file',
                  content: '# Deploy App\n\nProduction application.\n',
                },
              },
            },
          },
        },
      },
    },
    var: {
      type: 'directory',
      children: {
        www: {
          type: 'directory',
          children: {},
        },
      },
    },
  },
};

const mission2FS: FSNode = {
  type: 'directory',
  children: {
    var: {
      type: 'directory',
      children: {
        www: {
          type: 'directory',
          children: {
            app: {
              type: 'directory',
              children: {
                'start.sh': {
                  type: 'file',
                  content: [
                    '#!/bin/bash',
                    'echo "Starting application..."',
                    'node index.js',
                  ].join('\n'),
                  permissions: '-rw-r--r--',
                },
                'config.json': {
                  type: 'file',
                  content: '{"env": "production", "port": 8080}\n',
                },
                'index.html': {
                  type: 'file',
                  content: [
                    '<!DOCTYPE html>',
                    '<html>',
                    '<head><title>App</title></head>',
                    '<body><h1>Welcome</h1></body>',
                    '</html>',
                  ].join('\n'),
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
    var: {
      type: 'directory',
      children: {
        www: {
          type: 'directory',
          children: {
            app: {
              type: 'directory',
              children: {
                'start.sh': {
                  type: 'file',
                  content: [
                    '#!/bin/bash',
                    'echo "Starting application..."',
                    'node index.js',
                  ].join('\n'),
                  permissions: '-rwxr-xr-x',
                },
                'config.json': {
                  type: 'file',
                  content: '{"env": "production", "port": 8080}\n',
                },
                'index.html': {
                  type: 'file',
                  content: [
                    '<!DOCTYPE html>',
                    '<html>',
                    '<head><title>App</title></head>',
                    '<body><h1>Welcome</h1></body>',
                    '</html>',
                  ].join('\n'),
                },
              },
            },
            'backup-old': {
              type: 'directory',
              children: {
                'start.sh': {
                  type: 'file',
                  content: '#!/bin/bash\necho "Old version"\n',
                },
                'config.json': {
                  type: 'file',
                  content: '{"env": "staging", "port": 3000}\n',
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
    var: {
      type: 'directory',
      children: {
        www: {
          type: 'directory',
          children: {
            app: {
              type: 'directory',
              children: {
                'start.sh': {
                  type: 'file',
                  content: [
                    '#!/bin/bash',
                    'echo "Starting application..."',
                    'node index.js',
                  ].join('\n'),
                  permissions: '-rwxr-xr-x',
                },
                'config.json': {
                  type: 'file',
                  content: '{"env":"production","port":8080,"debug":false}\n',
                },
                'index.html': {
                  type: 'file',
                  content: [
                    '<!DOCTYPE html>',
                    '<html>',
                    '<head><title>App</title></head>',
                    '<body><h1>Welcome</h1></body>',
                    '</html>',
                  ].join('\n'),
                },
                static: {
                  type: 'directory',
                  children: {
                    'style.css': {
                      type: 'file',
                      content: 'body { font-family: sans-serif; margin: 0; }\n',
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

export const story04: Story = {
  id: 'story-04',
  title: 'デプロイの日',
  description:
    'いよいよ本番デプロイ。ファイルの権限設定やディレクトリのコピーなど、デプロイ手順を実行しよう。',
  emoji: '\u{1F680}',
  missions: [
    {
      id: 'mission-04-01',
      title: 'デプロイ先の準備',
      description: 'mkdir -p と cp -r でデプロイ先を準備しよう。',
      narrative:
        'デプロイ先のディレクトリを作成して、ソースをコピーしよう。',
      initialCwd: '/home/deploy',
      initialFS: mission1FS,
      objectives: [
        {
          id: 'obj-04-01-01',
          description: '/var/www/app ディレクトリを再帰的に作成する',
          checks: [{ type: 'file_exists', path: '/var/www/app' }],
          hints: [
            { level: 1, text: '深い階層のディレクトリを一度に作成するオプションがあります。' },
            { level: 2, text: 'mkdir に -p オプションをつけると、親ディレクトリも含めて作成できます。' },
            { level: 3, text: '「mkdir -p /var/www/app」と入力してEnterを押してください。' },
          ],
        },
        {
          id: 'obj-04-01-02',
          description: 'source の内容をデプロイ先にコピーする',
          checks: [{ type: 'file_exists', path: '/var/www/app/README.md' }],
          hints: [
            { level: 1, text: 'ディレクトリごとコピーするオプションがあります。' },
            { level: 2, text: 'cp に -r オプションをつけると、ディレクトリを再帰的にコピーできます。' },
            { level: 3, text: '「cp -r source/* /var/www/app/」と入力してEnterを押してください。' },
          ],
        },
      ],
    },
    {
      id: 'mission-04-02',
      title: '権限の設定',
      description: 'chmod コマンドでファイルの実行権限を設定しよう。',
      narrative:
        'デプロイしたファイルの実行権限を設定しよう。',
      initialCwd: '/var/www/app',
      initialFS: mission2FS,
      objectives: [
        {
          id: 'obj-04-02-01',
          description: 'start.sh に実行権限を付与する',
          checks: [{ type: 'command_executed', command: 'chmod' }],
          hints: [
            { level: 1, text: 'ファイルの権限を変更するコマンドがあります。' },
            { level: 2, text: 'chmod コマンドで権限を変更します。+x で実行権限を追加できます。' },
            { level: 3, text: '「chmod +x start.sh」と入力してEnterを押してください。' },
          ],
        },
      ],
    },
    {
      id: 'mission-04-03',
      title: 'バックアップ作成',
      description: '古いバックアップを削除して、新しいバックアップを作ろう。',
      narrative:
        '古いバックアップを削除して、新しいバックアップを作ろう。',
      initialCwd: '/var/www',
      initialFS: mission3FS,
      objectives: [
        {
          id: 'obj-04-03-01',
          description: '古いバックアップ（backup-old）を削除する',
          checks: [{ type: 'file_not_exists', path: '/var/www/backup-old' }],
          hints: [
            { level: 1, text: 'ディレクトリを削除するにはオプションが必要です。' },
            { level: 2, text: 'rm に -rf オプションをつけると、ディレクトリを中身ごと削除できます。' },
            { level: 3, text: '「rm -rf backup-old」と入力してEnterを押してください。' },
          ],
        },
        {
          id: 'obj-04-03-02',
          description: '現在の app を backup としてコピーする',
          checks: [{ type: 'file_exists', path: '/var/www/backup' }],
          hints: [
            { level: 1, text: 'ディレクトリをまるごとコピーしましょう。' },
            { level: 2, text: 'cp -r コマンドでディレクトリを再帰的にコピーできます。' },
            { level: 3, text: '「cp -r app backup」と入力してEnterを押してください。' },
          ],
        },
      ],
    },
    {
      id: 'mission-04-04',
      title: '最終確認',
      description: 'デプロイが完了したか最終確認しよう。',
      narrative:
        'デプロイが完了した。最終確認をしよう。',
      initialCwd: '/var/www/app',
      initialFS: mission4FS,
      objectives: [
        {
          id: 'obj-04-04-01',
          description: '全ファイルの一覧を表示する',
          checks: [{ type: 'command_executed', command: 'find' }],
          hints: [
            { level: 1, text: 'ディレクトリ内の全ファイルを再帰的に表示するコマンドがあります。' },
            { level: 2, text: 'find コマンドでカレントディレクトリ以下を全て表示できます。' },
            { level: 3, text: '「find .」と入力してEnterを押してください。' },
          ],
        },
        {
          id: 'obj-04-04-02',
          description: '設定ファイルの内容を確認して production であることを確かめる',
          checks: [{ type: 'output_contains', pattern: 'production' }],
          hints: [
            { level: 1, text: 'ファイルの内容を表示するコマンドで設定を確認しましょう。' },
            { level: 2, text: 'cat コマンドで config.json の内容を表示できます。' },
            { level: 3, text: '「cat config.json」と入力してEnterを押してください。' },
          ],
        },
      ],
    },
  ],
  unlockRequires: ['story-02', 'story-03'],
};
