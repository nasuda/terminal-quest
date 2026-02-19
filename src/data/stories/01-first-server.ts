import type { Story, FSNode } from '../types.js';

const mission1FS: FSNode = {
  type: 'directory',
  children: {
    home: {
      type: 'directory',
      children: {
        admin: {
          type: 'directory',
          children: {
            'welcome.txt': {
              type: 'file',
              content: 'ようこそ、新しい管理者さん！\nこのサーバーの管理をよろしくお願いします。\n',
            },
          },
        },
      },
    },
    var: {
      type: 'directory',
      children: {
        log: {
          type: 'directory',
          children: {},
        },
      },
    },
    etc: {
      type: 'directory',
      children: {},
    },
  },
};

const mission2FS: FSNode = {
  type: 'directory',
  children: {
    etc: {
      type: 'directory',
      children: {
        nginx: {
          type: 'directory',
          children: {
            'nginx.conf': {
              type: 'file',
              content: [
                'worker_processes auto;',
                'error_log /var/log/nginx/error.log;',
                '',
                'events {',
                '    worker_connections 1024;',
                '}',
                '',
                'http {',
                '    server {',
                '        listen 80;',
                '        server_name localhost;',
                '        location / {',
                '            proxy_pass http://localhost:3000;',
                '        }',
                '    }',
                '}',
              ].join('\n'),
            },
          },
        },
        app: {
          type: 'directory',
          children: {
            'config.json': {
              type: 'file',
              content: '{"port": 3000, "debug": false, "logLevel": "info"}',
            },
          },
        },
      },
    },
    home: {
      type: 'directory',
      children: {
        admin: {
          type: 'directory',
          children: {},
        },
      },
    },
  },
};

const logLines = [
  '2024-01-15 08:00:01 [INFO] Server started on port 3000',
  '2024-01-15 08:00:02 [INFO] Database connection established',
  '2024-01-15 08:05:13 [INFO] User login: admin',
  '2024-01-15 08:10:45 [ERROR] Failed to connect to cache server: Connection refused',
  '2024-01-15 08:11:00 [INFO] Retrying cache connection...',
  '2024-01-15 08:11:05 [ERROR] Cache server retry failed: timeout after 5000ms',
  '2024-01-15 08:15:22 [INFO] Request processed: GET /api/users',
  '2024-01-15 08:20:33 [INFO] Request processed: POST /api/data',
  '2024-01-15 08:25:10 [ERROR] Disk space warning: /var/log is 85% full',
  '2024-01-15 08:30:01 [INFO] Scheduled backup started',
  '2024-01-15 08:30:45 [INFO] Backup completed successfully',
  '2024-01-15 08:35:12 [INFO] Request processed: GET /api/status',
  '2024-01-15 08:40:00 [ERROR] Authentication failed for user: unknown_user',
  '2024-01-15 08:45:33 [INFO] Request processed: GET /api/health',
  '2024-01-15 08:50:01 [INFO] Memory usage: 62%',
  '2024-01-15 08:55:22 [INFO] Request processed: PUT /api/config',
  '2024-01-15 09:00:00 [INFO] Hourly log rotation completed',
  '2024-01-15 09:05:15 [ERROR] Unable to send notification email: SMTP connection failed',
  '2024-01-15 09:10:30 [INFO] Request processed: DELETE /api/cache',
  '2024-01-15 09:15:00 [INFO] System health check: all services nominal',
].join('\n');

const mission3FS: FSNode = {
  type: 'directory',
  children: {
    var: {
      type: 'directory',
      children: {
        log: {
          type: 'directory',
          children: {
            'app.log': {
              type: 'file',
              content: logLines,
            },
          },
        },
      },
    },
    home: {
      type: 'directory',
      children: {
        admin: {
          type: 'directory',
          children: {},
        },
      },
    },
  },
};

const mission4FS: FSNode = {
  type: 'directory',
  children: {
    etc: {
      type: 'directory',
      children: {
        app: {
          type: 'directory',
          children: {
            'config.json': {
              type: 'file',
              content: '{"port": 3000, "debug": false, "logLevel": "info"}',
            },
          },
        },
      },
    },
    home: {
      type: 'directory',
      children: {
        admin: {
          type: 'directory',
          children: {
            backups: {
              type: 'directory',
              children: {},
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
    etc: {
      type: 'directory',
      children: {
        app: {
          type: 'directory',
          children: {
            'config.json': {
              type: 'file',
              content: '{"port": 3000, "debug": false}',
            },
          },
        },
      },
    },
  },
};

export const story01: Story = {
  id: 'story-01',
  title: '初めてのサーバー管理',
  description:
    'あなたは新人サーバー管理者。先輩が急に休みを取り、本番サーバーの管理を1人で任されることに。基本的なコマンドを使ってサーバーを管理しよう。',
  emoji: '🖥️',
  missions: [
    {
      id: 'mission-01-01',
      title: '現在地を確認しよう',
      description: '基本中の基本、現在のディレクトリを確認し、ファイルの一覧を表示してみよう。',
      goal: 'pwd と ls を使って、今いる場所とファイル構成を把握できるようになる',
      review: {
        question: '現在のディレクトリを表示するコマンドはどれですか？',
        choices: ['ls', 'cd', 'pwd', 'cat'],
        correctIndex: 2,
        explanation: 'pwd (Print Working Directory) は現在いるディレクトリのパスを表示するコマンドです。',
      },
      narrative:
        '先輩からの引き継ぎメモには「まずは現在いるディレクトリを確認」と書いてある。ターミナルを開いたら、まず自分がどこにいるのか把握しよう。',
      initialCwd: '/home/admin',
      newCommands: ['pwd', 'ls'],
      initialFS: mission1FS,
      objectives: [
        {
          id: 'obj-01-01-01',
          description: '現在のディレクトリを確認する（pwd コマンド）',
          checks: [{ type: 'command_executed', command: 'pwd' }],
          hints: [
            { level: 1, text: '現在のディレクトリを表示するコマンドがあります。' },
            { level: 2, text: '"Print Working Directory" の略で、3文字のコマンドです。' },
            { level: 3, text: '「pwd」と入力してEnterを押してください。' },
          ],
          feedbacks: [
            { pattern: 'ls', message: 'ls はディレクトリの中身を一覧表示するコマンドです。現在の場所を確認するには、別のコマンドを使います。' },
            { pattern: 'cd', message: 'cd はディレクトリを移動するコマンドです。現在の場所を確認するには、別のコマンドを使います。' },
            { pattern: 'cat', message: 'cat はファイルの内容を表示するコマンドです。現在の場所を確認するには、別のコマンドを使います。' },
          ],
        },
        {
          id: 'obj-01-01-02',
          description: 'ファイルの一覧を表示する（ls コマンド）',
          checks: [{ type: 'command_executed', command: 'ls' }],
          hints: [
            { level: 1, text: 'ディレクトリの中身を一覧表示するコマンドを使いましょう。' },
            { level: 2, text: '"List" の略で、2文字のコマンドです。' },
            { level: 3, text: '「ls」と入力してEnterを押してください。' },
          ],
          feedbacks: [
            { pattern: 'pwd', message: 'pwd は現在のディレクトリを表示するコマンドです。ファイル一覧を表示するには、別のコマンドを使います。' },
            { pattern: 'cd', message: 'cd はディレクトリを移動するコマンドです。ファイル一覧を表示するには、別のコマンドを使います。' },
            { pattern: 'cat', message: 'cat はファイルの内容を表示するコマンドです。ファイル一覧を表示するには、別のコマンドを使います。' },
          ],
        },
      ],
    },
    {
      id: 'mission-01-02',
      title: '設定ファイルを探せ',
      description: 'サーバーの設定ファイルを見つけて内容を確認しよう。',
      goal: 'cd でディレクトリを移動し、cat でファイル内容を確認できるようになる',
      review: {
        question: 'ディレクトリを移動するコマンドはどれですか？',
        choices: ['ls', 'cd', 'cat', 'pwd'],
        correctIndex: 1,
        explanation: 'cd (Change Directory) はディレクトリを移動するコマンドです。',
      },
      narrative:
        'サーバーの設定ファイルを確認する必要がある。設定ファイルは /etc に保管されている。ディレクトリを移動して、設定内容を確認しよう。',
      initialCwd: '/home/admin',
      newCommands: ['cd', 'cat'],
      initialFS: mission2FS,
      objectives: [
        {
          id: 'obj-01-02-01',
          description: '/etc ディレクトリに移動する',
          checks: [{ type: 'cwd_equals', path: '/etc' }],
          hints: [
            { level: 1, text: 'ディレクトリを移動するコマンドを使いましょう。' },
            { level: 2, text: '"Change Directory" の略のコマンドに、移動先のパスを指定します。' },
            { level: 3, text: '「cd /etc」と入力してEnterを押してください。' },
          ],
          feedbacks: [
            { pattern: 'pwd', message: 'pwd は現在の場所を表示するコマンドです。ディレクトリを移動するには、別のコマンドを使います。' },
            { pattern: 'ls', message: 'ls はファイル一覧を表示するコマンドです。ディレクトリを移動するには、別のコマンドを使います。' },
            { pattern: 'cat', message: 'cat はファイルの内容を表示するコマンドです。ディレクトリを移動するには、別のコマンドを使います。' },
          ],
        },
        {
          id: 'obj-01-02-02',
          description: 'ファイルの一覧を確認する',
          checks: [{ type: 'command_executed', command: 'ls' }],
          hints: [
            { level: 1, text: '前のミッションで使った一覧表示コマンドを思い出しましょう。' },
            { level: 2, text: '2文字のコマンドで、ディレクトリの中身を表示できます。' },
            { level: 3, text: '「ls」と入力してEnterを押してください。' },
          ],
          feedbacks: [
            { pattern: 'pwd', message: 'pwd は現在の場所を表示するコマンドです。ファイル一覧を確認するには、別のコマンドを使います。' },
            { pattern: 'cd', message: 'cd はディレクトリ移動のコマンドです。今いる場所の中身を見るには、別のコマンドを使います。' },
            { pattern: 'cat', message: 'cat はファイルの内容を表示するコマンドです。ディレクトリの中身一覧を見るには、別のコマンドを使います。' },
          ],
        },
        {
          id: 'obj-01-02-03',
          description: '/etc/app/config.json の内容を表示する',
          checks: [
            { type: 'command_executed', command: 'cat' },
            { type: 'output_contains', pattern: 'port' },
          ],
          hints: [
            { level: 1, text: 'ファイルの内容を表示するコマンドがあります。' },
            { level: 2, text: '猫の鳴き声に似た3文字のコマンドです。パスを指定しましょう。' },
            { level: 3, text: '「cat app/config.json」と入力してください。' },
          ],
          feedbacks: [
            { pattern: 'cat.*nginx', message: 'nginx.conf はWebサーバーの設定ファイルです。今回確認したいのはアプリの設定ファイル config.json です。app/ ディレクトリの中にあります。' },
            { pattern: 'pwd', message: 'pwd は現在の場所を表示するコマンドです。ファイルの内容を読むには、別のコマンドを使います。' },
            { pattern: 'ls', message: 'ls はファイル一覧を表示するコマンドです。ファイルの中身を読むには、別のコマンドを使います。' },
            { pattern: 'cd', message: 'cd はディレクトリ移動のコマンドです。ファイルの内容を読むには、別のコマンドを使います。' },
          ],
        },
      ],
    },
    {
      id: 'mission-01-03',
      title: 'ログからエラーを探せ',
      description: 'ログファイルからエラーメッセージを見つけ出そう。',
      goal: 'grep を使ってログから特定のパターンを抽出できるようになる',
      review: {
        question: 'ファイルの内容を表示するコマンドはどれですか？',
        choices: ['ls', 'pwd', 'cat', 'cd'],
        correctIndex: 2,
        explanation: 'cat はファイルの内容を表示するコマンドです。concatenate（連結）が語源です。',
      },
      narrative:
        'ユーザーから「エラーが出てる」と報告が。ログファイルを調べて、何が起きているか確認しよう。',
      initialCwd: '/home/admin',
      newCommands: ['grep'],
      initialFS: mission3FS,
      objectives: [
        {
          id: 'obj-01-03-01',
          description: 'ログファイルの内容を表示する',
          checks: [
            { type: 'command_executed', command: 'cat' },
            { type: 'output_contains', pattern: 'ERROR' },
          ],
          hints: [
            { level: 1, text: 'ファイルの内容を表示するコマンドでログファイルを見ましょう。' },
            { level: 2, text: 'ログファイルは /var/log/app.log にあります。' },
            { level: 3, text: '「cat /var/log/app.log」と入力してください。' },
          ],
          feedbacks: [
            { pattern: 'grep', message: 'grep は検索コマンドです。まずは cat でログ全体を確認しましょう。' },
            { pattern: 'ls', message: 'ls はファイル一覧を表示するコマンドです。ファイルの内容を読むには、別のコマンドを使います。' },
          ],
        },
        {
          id: 'obj-01-03-02',
          description: 'ERROR を含む行だけを抽出する',
          checks: [
            { type: 'command_executed', command: 'grep' },
            { type: 'output_contains', pattern: 'ERROR' },
          ],
          hints: [
            { level: 1, text: '特定の文字列を含む行だけを抽出するコマンドがあります。' },
            { level: 2, text: 'grep コマンドに検索パターンとファイル名を指定します。' },
            { level: 3, text: '「grep ERROR /var/log/app.log」と入力してください。' },
          ],
          feedbacks: [
            { pattern: 'cat', message: 'cat はファイル全体を表示します。特定の文字列を含む行だけを抽出するには、検索コマンドを使いましょう。' },
            { pattern: 'find', message: 'find はファイル名を検索するコマンドです。ファイルの中身を検索するには、別のコマンドを使います。' },
          ],
        },
      ],
    },
    {
      id: 'mission-01-04',
      title: '設定ファイルのバックアップ',
      description: '設定を変更する前に、安全のためバックアップを取ろう。',
      goal: 'cp でファイルのバックアップを作成する習慣を身につける',
      review: {
        question: '特定の文字列を含む行を検索するコマンドはどれですか？',
        choices: ['cat', 'find', 'grep', 'ls'],
        correctIndex: 2,
        explanation: 'grep はファイル内のテキストをパターンで検索するコマンドです。',
      },
      narrative:
        '設定を変更する前に、バックアップを取る習慣をつけよう。何かあったときに元に戻せるように、コピーを作成する。',
      initialCwd: '/etc/app',
      newCommands: ['cp'],
      initialFS: mission4FS,
      objectives: [
        {
          id: 'obj-01-04-01',
          description: 'config.json のバックアップを作成する（.bak 拡張子をつける）',
          checks: [
            {
              type: 'file_exists',
              path: '/etc/app/config.json.bak',
            },
          ],
          hints: [
            { level: 1, text: 'ファイルをコピーするコマンドを使いましょう。' },
            { level: 2, text: 'cp コマンドで「元ファイル」「コピー先」を指定します。.bak 拡張子をつけるのが慣例です。' },
            { level: 3, text: '「cp config.json config.json.bak」と入力してください。' },
          ],
          feedbacks: [
            { pattern: 'mv', message: 'mv はファイルを移動するコマンドです。バックアップを作るには、元のファイルを残したままコピーするコマンドを使いましょう。' },
            { pattern: 'cat', message: 'cat はファイルの内容を表示するコマンドです。ファイルをコピーするには、別のコマンドを使います。' },
            { pattern: 'echo', message: 'echo はテキストを出力するコマンドです。ファイルをそのままコピーするには、別のコマンドを使います。' },
          ],
        },
      ],
    },
    {
      id: 'mission-01-05',
      title: '設定を修正せよ',
      description: 'デバッグモードを有効にして、問題を調査しやすくしよう。',
      goal: 'echo とリダイレクト（>）を使ってファイルを書き換えられるようになる',
      review: {
        question: 'ファイルをコピーするコマンドはどれですか？',
        choices: ['mv', 'cp', 'rm', 'cat'],
        correctIndex: 1,
        explanation: 'cp (copy) はファイルやディレクトリをコピーするコマンドです。',
      },
      narrative:
        'デバッグモードが無効になっている。config.json の debug を true に変更しよう。echo とリダイレクトを使ってファイルを書き換える。',
      initialCwd: '/etc/app',
      newCommands: ['echo'],
      initialFS: mission5FS,
      objectives: [
        {
          id: 'obj-01-05-01',
          description: 'config.json の debug を true に変更する',
          checks: [
            {
              type: 'file_contains',
              path: '/etc/app/config.json',
              pattern: 'true',
            },
          ],
          hints: [
            { level: 1, text: 'echo コマンドとリダイレクト（>）を使うと、ファイルの内容を丸ごと上書きできます。JSON形式で全体を書き直す必要があります。' },
            { level: 2, text: 'echo "内容" > ファイル名 の形式で、ファイルの内容を上書きできます。' },
            {
              level: 3,
              text: '「echo \'{"port": 3000, "debug": true}\' > config.json」と入力してください。',
            },
          ],
          feedbacks: [
            { pattern: 'debug.*=.*true', message: 'JSON形式で書き込む必要があります。{"port": 3000, "debug": true} のような形式にしましょう。' },
            { pattern: '>>', message: '>>（追記）ではなく >（上書き）を使いましょう。ファイルの内容を新しい内容に置き換えます。' },
            { pattern: 'cat', message: 'cat はファイルの内容を表示するコマンドです。ファイルに書き込むには、echo コマンドとリダイレクト（>）を使います。' },
            { pattern: 'cp', message: 'cp はファイルをコピーするコマンドです。ファイルの内容を書き換えるには、echo とリダイレクト（>）を使いましょう。' },
          ],
        },
      ],
    },
  ],
  unlockRequires: [],
  course: 'engineer',
};
