import type { Story, FSNode } from '../types.js';

const mission1FS: FSNode = {
  type: 'directory',
  children: {
    home: {
      type: 'directory',
      children: {
        project: {
          type: 'directory',
          children: {
            'app.js': {
              type: 'file',
              content: [
                'const express = require("express");',
                'const app = express();',
                'app.get("/", (req, res) => res.send("Hello"));',
                'app.listen(3000);',
              ].join('\n'),
            },
            'config.json': {
              type: 'file',
              content: '{"port": 3000, "env": "production", "secret": "abc123"}\n',
            },
            'README.md': {
              type: 'file',
              content: '# My Project\n\nA sample web application.\n',
            },
            data: {
              type: 'directory',
              children: {
                'important.csv': {
                  type: 'file',
                  content: [
                    'id,name,email',
                    '1,Tanaka,tanaka@example.com',
                    '2,Suzuki,suzuki@example.com',
                    '3,Sato,sato@example.com',
                  ].join('\n'),
                },
                'backup.csv': {
                  type: 'file',
                  content: [
                    'id,name,email',
                    '1,Old Data,old@example.com',
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

const mission2FS: FSNode = {
  type: 'directory',
  children: {
    home: {
      type: 'directory',
      children: {
        project: {
          type: 'directory',
          children: {
            'server.conf': {
              type: 'file',
              content: [
                'server {',
                '  listen 80;',
                '  server_name example.com;',
                '  root /var/www/html;',
                '}',
              ].join('\n'),
            },
            'database.conf': {
              type: 'file',
              content: [
                '[database]',
                'host = localhost',
                'port = 5432',
                'name = mydb',
                'user = admin',
              ].join('\n'),
            },
            'app.log': {
              type: 'file',
              content: [
                '[2024-01-15 10:00:01] INFO: Server started',
                '[2024-01-15 10:05:23] INFO: Request received',
                '[2024-01-15 10:12:45] WARN: Slow query detected',
                '[2024-01-15 11:00:00] INFO: Scheduled task completed',
              ].join('\n'),
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
        project: {
          type: 'directory',
          children: {
            'old-build': {
              type: 'directory',
              children: {
                'bundle.js': {
                  type: 'file',
                  content: '// old build output - v0.1.0\nconsole.log("old");\n',
                },
                'bundle.css': {
                  type: 'file',
                  content: '/* old styles */\nbody { color: red; }\n',
                },
                'manifest.json': {
                  type: 'file',
                  content: '{"version": "0.1.0"}\n',
                },
              },
            },
            src: {
              type: 'directory',
              children: {
                'main.ts': {
                  type: 'file',
                  content: [
                    'import { createApp } from "./utils";',
                    '',
                    'const app = createApp();',
                    'app.run();',
                  ].join('\n'),
                },
                'utils.ts': {
                  type: 'file',
                  content: [
                    'export function createApp() {',
                    '  return {',
                    '    run() { console.log("Running..."); }',
                    '  };',
                    '}',
                  ].join('\n'),
                },
              },
            },
            dist: {
              type: 'directory',
              children: {
                'output.js': {
                  type: 'file',
                  content: '// current build output - v1.0.0\nconsole.log("current");\n',
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
        project: {
          type: 'directory',
          children: {
            logs: {
              type: 'directory',
              children: {
                'app-2024-01.log': {
                  type: 'file',
                  content: [
                    '[2024-01-01] INFO: Server started',
                    '[2024-01-15] ERROR: Connection timeout',
                    '[2024-01-31] INFO: Monthly cleanup',
                  ].join('\n'),
                },
                'app-2024-02.log': {
                  type: 'file',
                  content: [
                    '[2024-02-01] INFO: Server started',
                    '[2024-02-14] WARN: High memory usage',
                    '[2024-02-28] INFO: Monthly cleanup',
                  ].join('\n'),
                },
                'app-2024-03.log': {
                  type: 'file',
                  content: [
                    '[2024-03-01] INFO: Server started',
                    '[2024-03-10] ERROR: Disk full',
                    '[2024-03-31] INFO: Monthly cleanup',
                  ].join('\n'),
                },
                'error.log': {
                  type: 'file',
                  content: [
                    '[2024-01-15] ERROR: Connection timeout',
                    '[2024-02-20] ERROR: Out of memory',
                    '[2024-03-10] ERROR: Disk full',
                  ].join('\n'),
                },
                'access.log': {
                  type: 'file',
                  content: [
                    '192.168.1.1 - GET /index.html 200',
                    '192.168.1.2 - POST /api/data 201',
                    '192.168.1.3 - GET /style.css 200',
                  ].join('\n'),
                },
                keep: {
                  type: 'directory',
                  children: {
                    '.gitkeep': {
                      type: 'file',
                      content: '',
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

export const story07: Story = {
  id: 'story-07',
  title: '\u5371\u967A\u306A\u30B3\u30DE\u30F3\u30C9',
  description:
    '\u524A\u9664\u30B3\u30DE\u30F3\u30C9\u306E\u5371\u967A\u6027\u3092\u5B66\u3073\u3001\u5B89\u5168\u306A\u7FD2\u6163\u3092\u8EAB\u306B\u3064\u3051\u3088\u3046\u3002',
  emoji: '\u26A0\uFE0F',
  unlockRequires: ['story-02', 'story-04'],
  course: 'engineer',
  missions: [
    {
      id: 'mission-07-01',
      goal: '削除前に ls と cat で中身を確認する習慣を身につける',
      title: '\u3046\u3063\u304B\u308A\u524A\u9664',
      description:
        '\u30D5\u30A1\u30A4\u30EB\u3092\u524A\u9664\u3059\u308B\u524D\u306B\u3001\u307E\u305A\u4E2D\u8EAB\u3092\u78BA\u8A8D\u3059\u308B\u7FD2\u6163\u3092\u3064\u3051\u3088\u3046\u3002',
      narrative:
        '\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8\u306E\u30C7\u30A3\u30EC\u30AF\u30C8\u30EA\u306B\u4E0D\u8981\u306A\u30D0\u30C3\u30AF\u30A2\u30C3\u30D7\u30D5\u30A1\u30A4\u30EB\u304C\u6B8B\u3063\u3066\u3044\u308B\u3089\u3057\u3044\u3002\u3067\u3082\u524A\u9664\u3059\u308B\u524D\u306B\u3001\u307E\u305A\u4F55\u304C\u3042\u308B\u304B\u78BA\u8A8D\u3057\u3088\u3046\u3002\u91CD\u8981\u306A\u30D5\u30A1\u30A4\u30EB\u3092\u9593\u9055\u3048\u3066\u524A\u9664\u3057\u305F\u3089\u5927\u5909\u3060\uFF01',
      initialCwd: '/home/project',
      initialFS: mission1FS,
      objectives: [
        {
          id: 'obj-07-01-01',
          description: 'ls \u3067\u30D5\u30A1\u30A4\u30EB\u4E00\u89A7\u3092\u78BA\u8A8D\u3059\u308B',
          checks: [{ type: 'command_executed', command: 'ls' }],
          hints: [
            { level: 1, text: '\u30C7\u30A3\u30EC\u30AF\u30C8\u30EA\u306E\u4E2D\u8EAB\u3092\u8868\u793A\u3059\u308B\u30B3\u30DE\u30F3\u30C9\u3092\u4F7F\u3044\u307E\u3057\u3087\u3046\u3002' },
            { level: 2, text: 'ls \u30B3\u30DE\u30F3\u30C9\u3067\u30D5\u30A1\u30A4\u30EB\u3084\u30C7\u30A3\u30EC\u30AF\u30C8\u30EA\u306E\u4E00\u89A7\u3092\u8868\u793A\u3067\u304D\u307E\u3059\u3002' },
            { level: 3, text: '\u300Cls\u300D\u3068\u5165\u529B\u3057\u3066Enter\u3092\u62BC\u3057\u3066\u304F\u3060\u3055\u3044\u3002' },
          ],
        },
        {
          id: 'obj-07-01-02',
          description: 'cat data/important.csv で重要データの内容を確認する',
          checks: [
            { type: 'command_executed', command: 'cat' },
            { type: 'output_contains', pattern: 'Tanaka' },
          ],
          hints: [
            { level: 1, text: '\u30D5\u30A1\u30A4\u30EB\u306E\u4E2D\u8EAB\u3092\u8868\u793A\u3059\u308B\u30B3\u30DE\u30F3\u30C9\u3067\u3001\u91CD\u8981\u306A\u30C7\u30FC\u30BF\u3092\u78BA\u8A8D\u3057\u307E\u3057\u3087\u3046\u3002' },
            { level: 2, text: 'cat コマンドで data/important.csv を見てみましょう。重要なデータが含まれています。' },
            { level: 3, text: '\u300Ccat data/important.csv\u300D\u3068\u5165\u529B\u3057\u3066Enter\u3092\u62BC\u3057\u3066\u304F\u3060\u3055\u3044\u3002' },
          ],
        },
        {
          id: 'obj-07-01-03',
          description: 'rm \u3067\u4E0D\u8981\u30D5\u30A1\u30A4\u30EB\uFF08backup.csv\uFF09\u3092\u524A\u9664\u3059\u308B',
          checks: [{ type: 'file_not_exists', path: '/home/project/data/backup.csv' }],
          hints: [
            { level: 1, text: '\u4E0D\u8981\u306A\u30D5\u30A1\u30A4\u30EB\u3092\u524A\u9664\u3059\u308B\u30B3\u30DE\u30F3\u30C9\u3092\u4F7F\u3044\u307E\u3057\u3087\u3046\u3002' },
            { level: 2, text: 'rm \u30B3\u30DE\u30F3\u30C9\u3067\u30D5\u30A1\u30A4\u30EB\u3092\u524A\u9664\u3067\u304D\u307E\u3059\u3002\u524A\u9664\u5BFE\u8C61\u3092\u9593\u9055\u3048\u306A\u3044\u3088\u3046\u306B\uFF01' },
            { level: 3, text: '\u300Crm data/backup.csv\u300D\u3068\u5165\u529B\u3057\u3066Enter\u3092\u62BC\u3057\u3066\u304F\u3060\u3055\u3044\u3002' },
          ],
          feedbacks: [
            { pattern: 'rm data/important', message: 'important.csv は重要なデータです！削除するのは backup.csv の方です。' },
            { pattern: '^rm backup', message: 'backup.csv は data/ フォルダの中にあります。パスを指定して rm data/backup.csv としましょう。' },
          ],
        },
      ],
      review: {
        question: 'ファイルを削除する前にまずやるべきことは何ですか？',
        choices: [
          'すぐに rm で削除する',
          'ls と cat で中身を確認して、削除対象を間違えないようにする',
          'ディレクトリごと rm -rf で削除する',
          '別のサーバーにコピーする',
        ],
        correctIndex: 1,
        explanation: '削除する前に ls でファイル一覧を確認し、cat で中身を見て「本当に消して大丈夫か」を確認する習慣が大切です。一度削除したファイルは元に戻せません。',
      },
    },
    {
      id: 'mission-07-02',
      goal: '削除する前にバックアップを取る安全な運用手順を身につける',
      title: '\u30D0\u30C3\u30AF\u30A2\u30C3\u30D7\u306E\u6975\u610F',
      description:
        '\u524A\u9664\u3059\u308B\u524D\u306B\u30D0\u30C3\u30AF\u30A2\u30C3\u30D7\u3092\u53D6\u308B\u7FD2\u6163\u3092\u8EAB\u306B\u3064\u3051\u3088\u3046\u3002',
      narrative:
        '\u30B5\u30FC\u30D0\u30FC\u306E\u8A2D\u5B9A\u30D5\u30A1\u30A4\u30EB\u3092\u6574\u7406\u3059\u308B\u3053\u3068\u306B\u306A\u3063\u305F\u3002\u3067\u3082\u3044\u304D\u306A\u308A\u524A\u9664\u3059\u308B\u306E\u306F\u5371\u967A\u3060\u3002\u307E\u305A\u30D0\u30C3\u30AF\u30A2\u30C3\u30D7\u3092\u53D6\u3063\u3066\u304B\u3089\u3001\u4E0D\u8981\u306A\u30D5\u30A1\u30A4\u30EB\u3092\u524A\u9664\u3057\u3088\u3046\u3002',
      initialCwd: '/home/project',
      initialFS: mission2FS,
      objectives: [
        {
          id: 'obj-07-02-01',
          description: 'backups \u30C7\u30A3\u30EC\u30AF\u30C8\u30EA\u3092\u4F5C\u6210\u3059\u308B',
          checks: [
            { type: 'command_executed', command: 'mkdir' },
            { type: 'file_exists', path: '/home/project/backups' },
          ],
          hints: [
            { level: 1, text: '\u65B0\u3057\u3044\u30C7\u30A3\u30EC\u30AF\u30C8\u30EA\u3092\u4F5C\u6210\u3059\u308B\u30B3\u30DE\u30F3\u30C9\u3092\u4F7F\u3044\u307E\u3057\u3087\u3046\u3002' },
            { level: 2, text: 'mkdir \u30B3\u30DE\u30F3\u30C9\u3067\u30C7\u30A3\u30EC\u30AF\u30C8\u30EA\u3092\u4F5C\u6210\u3067\u304D\u307E\u3059\u3002' },
            { level: 3, text: '\u300Cmkdir backups\u300D\u3068\u5165\u529B\u3057\u3066Enter\u3092\u62BC\u3057\u3066\u304F\u3060\u3055\u3044\u3002' },
          ],
        },
        {
          id: 'obj-07-02-02',
          description: 'cp で server.conf を backups/ にバックアップする',
          checks: [{ type: 'file_exists', path: '/home/project/backups/server.conf' }],
          hints: [
            { level: 1, text: '\u30D5\u30A1\u30A4\u30EB\u3092\u30B3\u30D4\u30FC\u3059\u308B\u30B3\u30DE\u30F3\u30C9\u3092\u4F7F\u3044\u307E\u3057\u3087\u3046\u3002' },
            { level: 2, text: 'cp \u30B3\u30DE\u30F3\u30C9\u3067\u30D5\u30A1\u30A4\u30EB\u3092\u30B3\u30D4\u30FC\u3067\u304D\u307E\u3059\u3002' },
            { level: 3, text: '\u300Ccp server.conf backups/\u300D\u3068\u5165\u529B\u3057\u3066Enter\u3092\u62BC\u3057\u3066\u304F\u3060\u3055\u3044\u3002' },
          ],
        },
        {
          id: 'obj-07-02-03',
          description: '不要な app.log を rm で安全に削除する',
          checks: [{ type: 'file_not_exists', path: '/home/project/app.log' }],
          hints: [
            { level: 1, text: 'バックアップが取れたので、不要なログファイルを安全に削除しましょう。' },
            { level: 2, text: 'rm \u30B3\u30DE\u30F3\u30C9\u3067\u30D5\u30A1\u30A4\u30EB\u3092\u524A\u9664\u3067\u304D\u307E\u3059\u3002\u30ED\u30B0\u30D5\u30A1\u30A4\u30EB\u306F\u4E0D\u8981\u3067\u3059\u306D\u3002' },
            { level: 3, text: '\u300Crm app.log\u300D\u3068\u5165\u529B\u3057\u3066Enter\u3092\u62BC\u3057\u3066\u304F\u3060\u3055\u3044\u3002' },
          ],
        },
      ],
      review: {
        question: 'ファイル削除の安全な手順として正しいのはどれ？',
        choices: [
          'rm で削除 → 必要だったら復元する',
          'ls で確認 → バックアップを作成（cp） → 不要ファイルを削除（rm）',
          'バックアップなしで即削除する',
          'ファイル名を変更してから削除する',
        ],
        correctIndex: 1,
        explanation: '安全な手順は「確認 → バックアップ → 削除」です。ls で内容を確認し、cp で重要なファイルをバックアップしてから、不要なファイルだけを rm で削除しましょう。',
      },
    },
    {
      id: 'mission-07-03',
      goal: 'rm -rf の威力を理解し、正しい対象だけを削除できるようになる',
      title: 'rm -rf \u306E\u6B63\u4F53',
      description:
        'rm -rf \u306E\u5A01\u529B\u3092\u7406\u89E3\u3057\u3001\u6B63\u3057\u3044\u30C7\u30A3\u30EC\u30AF\u30C8\u30EA\u3060\u3051\u3092\u524A\u9664\u3057\u3088\u3046\u3002',
      narrative:
        '\u30D3\u30EB\u30C9\u30C7\u30A3\u30EC\u30AF\u30C8\u30EA\u304C\u6563\u3089\u304B\u3063\u3066\u3044\u308B\u3002\u53E4\u3044\u30D3\u30EB\u30C9\u7D50\u679C\u3092 rm -rf \u3067\u524A\u9664\u3057\u305F\u3044\u304C\u3001\u9593\u9055\u3048\u3066\u30BD\u30FC\u30B9\u30B3\u30FC\u30C9\u3092\u524A\u9664\u3057\u305F\u3089\u53D6\u308A\u8FD4\u3057\u304C\u3064\u304B\u306A\u3044\u3002\u307E\u305A\u4E2D\u8EAB\u3092\u78BA\u8A8D\u3057\u3066\u304B\u3089\u524A\u9664\u3057\u3088\u3046\u3002',
      initialCwd: '/home/project',
      initialFS: mission3FS,
      objectives: [
        {
          id: 'obj-07-03-01',
          description: 'ls \u3067\u5168\u30C7\u30A3\u30EC\u30AF\u30C8\u30EA\u306E\u4E2D\u8EAB\u3092\u78BA\u8A8D\u3059\u308B',
          checks: [{ type: 'command_executed', command: 'ls' }],
          hints: [
            { level: 1, text: '\u307E\u305A\u30C7\u30A3\u30EC\u30AF\u30C8\u30EA\u306E\u4E2D\u8EAB\u3092\u78BA\u8A8D\u3057\u307E\u3057\u3087\u3046\u3002' },
            { level: 2, text: 'ls \u30B3\u30DE\u30F3\u30C9\u3067\u30C7\u30A3\u30EC\u30AF\u30C8\u30EA\u306E\u4E2D\u8EAB\u3092\u8868\u793A\u3067\u304D\u307E\u3059\u3002\u5404\u30C7\u30A3\u30EC\u30AF\u30C8\u30EA\u306E\u4E2D\u8EAB\u3082\u78BA\u8A8D\u3057\u307E\u3057\u3087\u3046\u3002' },
            { level: 3, text: '\u300Cls\u300D\u3084\u300Cls old-build\u300D\u300Cls src\u300D\u3067\u305D\u308C\u305E\u308C\u306E\u4E2D\u8EAB\u3092\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\u3002' },
          ],
        },
        {
          id: 'obj-07-03-02',
          description: 'rm -rf で old-build だけを削除する（src と dist は残す）',
          checks: [{ type: 'file_not_exists', path: '/home/project/old-build' }],
          hints: [
            { level: 1, text: '\u53E4\u3044\u30D3\u30EB\u30C9\u7D50\u679C\u3060\u3051\u3092\u524A\u9664\u3057\u307E\u3057\u3087\u3046\u3002\u30BD\u30FC\u30B9\u30B3\u30FC\u30C9\u3092\u524A\u9664\u3057\u306A\u3044\u3088\u3046\u6CE8\u610F\uFF01' },
            { level: 2, text: 'rm -rf \u3067\u30C7\u30A3\u30EC\u30AF\u30C8\u30EA\u3054\u3068\u524A\u9664\u3067\u304D\u307E\u3059\u3002old-build \u3092\u524A\u9664\u3057\u307E\u3057\u3087\u3046\u3002' },
            { level: 3, text: '\u300Crm -rf old-build\u300D\u3068\u5165\u529B\u3057\u3066Enter\u3092\u62BC\u3057\u3066\u304F\u3060\u3055\u3044\u3002' },
          ],
          feedbacks: [
            { pattern: 'rm -rf src', message: 'src はソースコードが入った大切なディレクトリです！削除するのは old-build の方です。' },
            { pattern: 'rm -rf dist', message: 'dist は現在のビルド結果です。削除するのは old-build の方です。' },
            { pattern: '^rm old-build$', message: 'ディレクトリを中身ごと削除するには -rf オプションが必要です。rm -rf old-build としましょう。' },
          ],
        },
        {
          id: 'obj-07-03-03',
          description: 'src \u304C\u6B8B\u3063\u3066\u3044\u308B\u3053\u3068\u3092\u78BA\u8A8D\u3059\u308B',
          checks: [
            { type: 'command_executed', command: 'ls' },
            { type: 'output_contains', pattern: 'main.ts' },
          ],
          hints: [
            { level: 1, text: '\u30BD\u30FC\u30B9\u30B3\u30FC\u30C9\u304C\u7121\u4E8B\u306B\u6B8B\u3063\u3066\u3044\u308B\u304B\u78BA\u8A8D\u3057\u307E\u3057\u3087\u3046\u3002' },
            { level: 2, text: 'ls \u30B3\u30DE\u30F3\u30C9\u3067 src \u30C7\u30A3\u30EC\u30AF\u30C8\u30EA\u306E\u4E2D\u8EAB\u3092\u78BA\u8A8D\u3057\u307E\u3057\u3087\u3046\u3002' },
            { level: 3, text: '\u300Cls src\u300D\u3068\u5165\u529B\u3057\u3066Enter\u3092\u62BC\u3057\u3066\u304F\u3060\u3055\u3044\u3002' },
          ],
        },
      ],
      review: {
        question: 'rm -rf を実行する前に最も重要なことは何ですか？',
        choices: [
          '何も考えずに即実行する',
          'ls で削除対象の中身を確認し、正しいディレクトリだけを指定する',
          '-rf ではなく -r だけを使う',
          'ファイルを先に全部移動する',
        ],
        correctIndex: 1,
        explanation: 'rm -rf は確認なしでディレクトリを丸ごと削除する強力なコマンドです。必ず ls で中身を確認し、ソースコードなど重要なファイルを間違えて消さないよう、削除対象を正確に指定しましょう。',
      },
    },
    {
      id: 'mission-07-04',
      goal: 'find で削除対象を事前確認してから安全に削除するワークフローを習得する',
      title: '\u5B89\u5168\u306A\u7FD2\u6163',
      description:
        'find \u3067\u524A\u9664\u5BFE\u8C61\u3092\u78BA\u8A8D\u3057\u3066\u304B\u3089\u3001\u5B89\u5168\u306B\u524A\u9664\u3057\u3088\u3046\u3002',
      narrative:
        '\u30ED\u30B0\u30C7\u30A3\u30EC\u30AF\u30C8\u30EA\u306B\u53E4\u3044\u30ED\u30B0\u30D5\u30A1\u30A4\u30EB\u304C\u6EA2\u308C\u3066\u3044\u308B\u3002\u53E4\u3044\u6708\u6B21\u30ED\u30B0\u3092\u524A\u9664\u3057\u3066\u6574\u7406\u3057\u305F\u3044\u304C\u3001error.log \u3084 access.log \u306F\u6D88\u3057\u3066\u306F\u3044\u3051\u306A\u3044\u3002\u307E\u305A find \u3067\u524A\u9664\u5BFE\u8C61\u3092\u7D5E\u308A\u8FBC\u3082\u3046\u3002',
      initialCwd: '/home/project/logs',
      initialFS: mission4FS,
      objectives: [
        {
          id: 'obj-07-04-01',
          description: 'find \u3067\u524A\u9664\u5BFE\u8C61\u3092\u30EA\u30B9\u30C8\u30A2\u30C3\u30D7\u3059\u308B',
          checks: [
            { type: 'command_executed', command: 'find' },
            { type: 'output_contains', pattern: 'app-2024' },
          ],
          hints: [
            { level: 1, text: '\u30D5\u30A1\u30A4\u30EB\u3092\u691C\u7D22\u3059\u308B\u30B3\u30DE\u30F3\u30C9\u3067\u3001\u524A\u9664\u5BFE\u8C61\u3092\u5148\u306B\u78BA\u8A8D\u3057\u307E\u3057\u3087\u3046\u3002' },
            { level: 2, text: 'find \u30B3\u30DE\u30F3\u30C9\u306E -name \u30AA\u30D7\u30B7\u30E7\u30F3\u3067\u30D5\u30A1\u30A4\u30EB\u540D\u30D1\u30BF\u30FC\u30F3\u3092\u6307\u5B9A\u3067\u304D\u307E\u3059\u3002' },
            { level: 3, text: '\u300Cfind . -name "app-2024*"\u300D\u3068\u5165\u529B\u3057\u3066Enter\u3092\u62BC\u3057\u3066\u304F\u3060\u3055\u3044\u3002' },
          ],
        },
        {
          id: 'obj-07-04-02',
          description: 'find で見つけた app-2024-*.log を rm で削除する',
          checks: [
            { type: 'file_not_exists', path: '/home/project/logs/app-2024-01.log' },
            { type: 'file_not_exists', path: '/home/project/logs/app-2024-02.log' },
            { type: 'file_not_exists', path: '/home/project/logs/app-2024-03.log' },
          ],
          hints: [
            { level: 1, text: 'find \u3067\u898B\u3064\u3051\u305F\u30D5\u30A1\u30A4\u30EB\u3092\u524A\u9664\u3057\u307E\u3057\u3087\u3046\u3002' },
            { level: 2, text: '前の find で表示されたファイル名を rm コマンドに指定して削除しましょう。' },
            { level: 3, text: '\u300Crm app-2024-01.log app-2024-02.log app-2024-03.log\u300D\u3068\u5165\u529B\u3057\u3066Enter\u3092\u62BC\u3057\u3066\u304F\u3060\u3055\u3044\u3002' },
          ],
          feedbacks: [
            { pattern: 'rm error.log', message: 'error.log は残すべきファイルです！削除するのは app-2024-*.log だけです。' },
            { pattern: 'rm access.log', message: 'access.log は残すべきファイルです！削除するのは app-2024-*.log だけです。' },
          ],
        },
        {
          id: 'obj-07-04-03',
          description: 'error.log \u3092\u6B8B\u3057\u3066\u3044\u308B\u3053\u3068\u3092\u78BA\u8A8D\u3059\u308B',
          checks: [
            { type: 'command_executed', command: 'ls' },
            { type: 'output_contains', pattern: 'error.log' },
          ],
          hints: [
            { level: 1, text: '\u6B8B\u3059\u3079\u304D\u30D5\u30A1\u30A4\u30EB\u304C\u7121\u4E8B\u306B\u6B8B\u3063\u3066\u3044\u308B\u304B\u78BA\u8A8D\u3057\u307E\u3057\u3087\u3046\u3002' },
            { level: 2, text: 'ls \u30B3\u30DE\u30F3\u30C9\u3067\u73FE\u5728\u306E\u30D5\u30A1\u30A4\u30EB\u4E00\u89A7\u3092\u8868\u793A\u3057\u307E\u3057\u3087\u3046\u3002' },
            { level: 3, text: '\u300Cls\u300D\u3068\u5165\u529B\u3057\u3066Enter\u3092\u62BC\u3057\u3066\u304F\u3060\u3055\u3044\u3002' },
          ],
        },
      ],
      review: {
        question: '大量のファイルを安全に削除するワークフローとして正しいのは？',
        choices: [
          'rm * で全部削除してから必要なものを復元する',
          'find で削除対象を一覧表示して確認 → rm で対象だけを削除',
          '手当たり次第に削除する',
          'ディレクトリごと rm -rf で削除する',
        ],
        correctIndex: 1,
        explanation: 'まず find で削除対象を検索・確認してから、rm で対象ファイルだけを削除するのが安全なワークフローです。「確認してから実行」が鉄則です。',
      },
    },
  ],
};
