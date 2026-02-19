import type { Story, FSNode } from '../types.js';

const accessLogLines = [
  '2024-01-15 08:00:01 192.168.1.1 GET /index.html 200',
  '2024-01-15 08:00:15 192.168.1.2 POST /api/login 200',
  '2024-01-15 08:01:30 192.168.1.3 GET /api/users 200',
  '2024-01-15 08:02:45 192.168.1.1 GET /api/status 200',
  '2024-01-15 08:03:10 10.0.0.5 GET /dashboard 200',
  '2024-01-15 08:05:22 192.168.1.4 POST /api/data 200',
  '2024-01-15 08:06:00 192.168.1.1 GET /api/users 200',
  '2024-01-15 08:07:15 10.0.0.5 GET /api/config 200',
  '2024-01-15 08:08:30 192.168.1.2 GET /index.html 200',
  '2024-01-15 08:10:00 192.168.1.3 POST /api/upload 200',
  '2024-01-15 08:12:45 192.168.1.1 GET /api/health 200',
  '2024-01-15 08:15:00 10.0.0.5 POST /api/deploy 200',
  '2024-01-15 08:18:30 192.168.1.5 GET /index.html 200',
  '2024-01-15 08:20:10 192.168.1.2 GET /api/status 200',
  '2024-01-15 08:22:00 192.168.1.4 GET /dashboard 200',
  '2024-01-15 08:25:15 192.168.1.1 POST /api/data 200',
  '2024-01-15 08:28:00 10.0.0.5 GET /api/users 200',
  '2024-01-15 08:30:30 192.168.1.3 GET /api/health 200',
  '2024-01-15 08:32:45 192.168.1.2 POST /api/login 200',
  '2024-01-15 08:35:00 192.168.1.5 GET /api/status 200',
  '2024-01-15 08:37:15 192.168.1.1 GET /dashboard 200',
  '2024-01-15 08:40:00 10.0.0.5 POST /api/data 200',
  '2024-01-15 08:42:30 192.168.1.4 GET /api/users 200',
  '2024-01-15 08:45:00 192.168.1.3 GET /index.html 200',
  '2024-01-15 08:47:15 192.168.1.2 GET /api/health 200',
  '2024-01-15 08:50:00 192.168.1.1 POST /api/upload 200',
  '2024-01-15 08:52:30 10.0.0.5 GET /api/config 200',
  '2024-01-15 08:55:00 192.168.1.5 GET /dashboard 200',
  '2024-01-15 08:57:15 192.168.1.4 POST /api/login 200',
  '2024-01-15 09:00:00 192.168.1.3 GET /api/status 200',
  '2024-01-15 09:02:30 192.168.1.2 GET /api/users 200',
  '2024-01-15 09:05:00 192.168.1.1 GET /api/health 200',
  '2024-01-15 09:07:15 10.0.0.5 POST /api/deploy 200',
  '2024-01-15 09:10:00 192.168.1.5 GET /index.html 200',
  '2024-01-15 09:12:30 192.168.1.4 GET /api/config 200',
  '2024-01-15 09:15:00 192.168.1.3 POST /api/data 200',
  '2024-01-15 09:17:15 192.168.1.2 GET /dashboard 200',
  '2024-01-15 09:20:00 192.168.1.1 GET /api/users 200',
  '2024-01-15 09:22:30 10.0.0.5 GET /api/status 200',
  '2024-01-15 09:25:00 192.168.1.5 POST /api/login 200',
  '2024-01-15 09:27:15 192.168.1.4 GET /api/health 200',
  '2024-01-15 09:30:00 192.168.1.3 GET /index.html 200',
  '2024-01-15 09:32:30 192.168.1.2 POST /api/upload 200',
  '2024-01-15 09:35:00 192.168.1.1 GET /api/config 200',
  '2024-01-15 09:37:15 10.0.0.5 GET /dashboard 200',
  '2024-01-15 09:40:00 192.168.1.5 POST /api/data 500',
  '2024-01-15 09:42:30 192.168.1.4 GET /api/users 500',
  '2024-01-15 09:45:00 192.168.1.3 POST /api/deploy 500',
  '2024-01-15 09:47:15 192.168.1.2 GET /api/status 500',
  '2024-01-15 09:50:00 192.168.1.1 POST /api/data 500',
].join('\n');

const mission1FS: FSNode = {
  type: 'directory',
  children: {
    var: {
      type: 'directory',
      children: {
        log: {
          type: 'directory',
          children: {
            'access.log': {
              type: 'file',
              content: accessLogLines,
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
    var: {
      type: 'directory',
      children: {
        log: {
          type: 'directory',
          children: {
            'access.log': {
              type: 'file',
              content: accessLogLines,
            },
          },
        },
      },
    },
  },
};

const ipListLines = [
  '192.168.1.1',
  '10.0.0.5',
  '192.168.1.2',
  '192.168.1.1',
  '192.168.1.3',
  '10.0.0.5',
  '192.168.1.1',
  '192.168.1.4',
  '192.168.1.2',
  '192.168.1.1',
  '10.0.0.5',
  '192.168.1.5',
  '192.168.1.1',
  '192.168.1.3',
  '192.168.1.2',
  '192.168.1.1',
  '10.0.0.5',
  '192.168.1.4',
  '192.168.1.1',
  '192.168.1.5',
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
            'ip-list.txt': {
              type: 'file',
              content: ipListLines,
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
        log: {
          type: 'directory',
          children: {
            'access.log': {
              type: 'file',
              content: accessLogLines,
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

export const story03: Story = {
  id: 'story-03',
  title: 'ログ探偵',
  description:
    'サーバーで障害が発生。大量のログファイルから手がかりを見つけ、原因を特定しよう。',
  emoji: '\u{1F50D}',
  missions: [
    {
      id: 'mission-03-01',
      title: 'ログファイルの調査',
      description: 'head と tail コマンドでログファイルの最初と最後を確認しよう。',
      goal: 'head と tail で大きなログファイルの概要を素早く把握できるようになる',
      narrative:
        '大量のログがある。まずはファイルの最初と最後を確認しよう。',
      initialCwd: '/var/log',
      newCommands: ['head', 'tail'],
      initialFS: mission1FS,
      objectives: [
        {
          id: 'obj-03-01-01',
          description: 'ログファイルの最初の数行を確認する',
          checks: [{ type: 'command_executed', command: 'head' }],
          hints: [
            { level: 1, text: 'ファイルの先頭部分を表示するコマンドがあります。' },
            { level: 2, text: 'head コマンドでファイルの最初の数行を表示できます。' },
            { level: 3, text: '「head access.log」と入力してEnterを押してください。' },
          ],
        },
        {
          id: 'obj-03-01-02',
          description: 'ログファイルの最後の数行を確認して 500 エラーを発見する',
          checks: [
            { type: 'command_executed', command: 'tail' },
            { type: 'output_contains', pattern: '500' },
          ],
          hints: [
            { level: 1, text: 'ファイルの末尾を表示するコマンドがあります。' },
            { level: 2, text: 'tail コマンドでファイルの最後の数行を表示できます。' },
            { level: 3, text: '「tail access.log」と入力してEnterを押してください。' },
          ],
        },
      ],
    },
    {
      id: 'mission-03-02',
      title: 'エラーの分析',
      description: 'grep と wc コマンドで 500 エラーの件数を数えよう。',
      goal: 'grep でエラーを抽出し、パイプで wc -l に渡して件数を数えられるようになる',
      narrative:
        '500エラーが出ている。何件あるか数えよう。',
      initialCwd: '/var/log',
      initialFS: mission2FS,
      objectives: [
        {
          id: 'obj-03-02-01',
          description: '500 エラーを含む行を抽出する',
          checks: [
            { type: 'command_executed', command: 'grep' },
            { type: 'output_contains', pattern: '500' },
          ],
          hints: [
            { level: 1, text: '特定の文字列を含む行だけを抽出するコマンドがあります。' },
            { level: 2, text: 'grep コマンドに検索パターンとファイル名を指定します。' },
            { level: 3, text: '「grep 500 access.log」と入力してEnterを押してください。' },
          ],
          feedbacks: [
            { pattern: 'cat', message: 'cat はファイル全体を表示します。特定の文字列を含む行だけを抽出するには grep を使いましょう。' },
            { pattern: 'grep.*error', message: 'ログ内のステータスコードは数字（500）で記録されています。「error」ではなく「500」で検索してみましょう。' },
          ],
        },
        {
          id: 'obj-03-02-02',
          description: '500 エラーが何件あるか数えて表示する',
          checks: [{ type: 'output_contains', pattern: '5' }],
          hints: [
            { level: 1, text: 'grep の結果をさらに別のコマンドに渡して行数を数えられます。| （パイプ）という記号でコマンドをつなぎます。' },
            { level: 2, text: 'grep の結果を wc -l にパイプで渡すと行数を数えられます。' },
            { level: 3, text: '「grep 500 access.log | wc -l」と入力してEnterを押してください。' },
          ],
          feedbacks: [
            { pattern: 'wc.*access', message: 'wc -l をファイルに直接使うと全行数が出ます。500 エラーの行だけを数えるには、まず grep で抽出してからパイプ（|）で wc -l に渡しましょう。' },
          ],
        },
      ],
    },
    {
      id: 'mission-03-03',
      title: 'アクセスパターンの分析',
      description: 'sort と uniq コマンドでIPアドレスのアクセス頻度を調べよう。',
      goal: 'sort | uniq -c でデータの出現頻度を集計できるようになる',
      narrative:
        'どのIPアドレスからアクセスが多いか調べよう。',
      initialCwd: '/var/log',
      newCommands: ['sort', 'uniq'],
      initialFS: mission3FS,
      objectives: [
        {
          id: 'obj-03-03-01',
          description: 'IPアドレスをソートする',
          checks: [{ type: 'command_executed', command: 'sort' }],
          hints: [
            { level: 1, text: 'データを並び替えるコマンドがあります。' },
            { level: 2, text: 'sort コマンドで行をアルファベット順に並び替えることができます。' },
            { level: 3, text: '「sort ip-list.txt」と入力してEnterを押してください。' },
          ],
          feedbacks: [
            { pattern: 'uniq', message: 'uniq の前に、まず sort でデータを並べ替えましょう。sort → uniq の順番が大切です。' },
          ],
        },
        {
          id: 'obj-03-03-02',
          description: 'IPアドレスの出現回数つき一覧を表示する（sort | uniq -c）',
          checks: [{ type: 'command_executed', command: 'uniq' }],
          hints: [
            { level: 1, text: '重複する行を1つにまとめるコマンドがあります。ただし、隣り合った行しか比較しないため、先にデータを並べ替えておく必要があります。' },
            { level: 2, text: 'sort の結果をパイプで uniq に渡します。uniq -c で件数も表示できます。' },
            { level: 3, text: '「sort ip-list.txt | uniq -c」と入力してEnterを押してください。' },
          ],
          feedbacks: [
            { pattern: 'uniq.*ip-list', message: 'uniq は隣り合った重複行しか除去しません。先に sort でデータを並べ替えてからパイプで uniq に渡しましょう。' },
          ],
        },
      ],
    },
    {
      id: 'mission-03-04',
      title: 'レポート作成',
      description: 'grep とリダイレクトを使って、調査結果をファイルに保存しよう。',
      goal: 'コマンドの出力をリダイレクト（>）でファイルに保存できるようになる',
      narrative:
        '調査結果をレポートファイルにまとめよう。',
      initialCwd: '/var/log',
      initialFS: mission4FS,
      objectives: [
        {
          id: 'obj-03-04-01',
          description: '500 エラー行をレポートファイルに出力する',
          checks: [
            { type: 'file_exists', path: '/var/log/error-report.txt' },
            { type: 'file_contains', path: '/var/log/error-report.txt', pattern: '500' },
          ],
          hints: [
            { level: 1, text: 'コマンドの出力をファイルに書き込む方法があります。' },
            { level: 2, text: 'リダイレクト（>）を使うと、コマンドの出力をファイルに保存できます。' },
            { level: 3, text: '「grep 500 access.log > error-report.txt」と入力してEnterを押してください。' },
          ],
        },
      ],
    },
  ],
  unlockRequires: ['story-01'],
  course: 'engineer',
};
