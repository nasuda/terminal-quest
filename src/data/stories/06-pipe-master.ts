import type { Story, FSNode } from '../types.js';

const fileNames = Array.from({ length: 20 }, (_, i) => {
  const num = String(i + 1).padStart(2, '0');
  return `file${num}.txt`;
});

const fileChildren: Record<string, { type: 'file'; content: string }> = {};
for (const name of fileNames) {
  fileChildren[name] = {
    type: 'file',
    content: `Data content of ${name}\n`,
  };
}

const accessLogForPipe = [
  '2024-01-15 08:00:01 [INFO] User login: admin',
  '2024-01-15 08:05:10 [INFO] Request: GET /api/users',
  '2024-01-15 08:10:22 [ERROR] Database connection timeout',
  '2024-01-15 08:15:33 [INFO] Request: POST /api/data',
  '2024-01-15 08:20:45 [ERROR] Failed to write to disk: permission denied',
  '2024-01-15 08:25:00 [INFO] Cache cleared',
  '2024-01-15 08:30:12 [INFO] Request: GET /api/status',
  '2024-01-15 08:35:25 [ERROR] Memory allocation failed',
  '2024-01-15 08:40:30 [INFO] Backup completed',
  '2024-01-15 08:45:00 [INFO] Request: GET /api/health',
].join('\n');

const mission1FS: FSNode = {
  type: 'directory',
  children: {
    home: {
      type: 'directory',
      children: {
        data: {
          type: 'directory',
          children: {
            ...fileChildren,
            logs: {
              type: 'directory',
              children: {
                'access.log': {
                  type: 'file',
                  content: accessLogForPipe,
                },
              },
            },
          },
        },
      },
    },
  },
};

const salesCsvLines = [
  '部門,金額',
  '営業,150000',
  '開発,200000',
  '営業,180000',
  '人事,120000',
  '開発,250000',
  '営業,160000',
  '人事,130000',
  '開発,220000',
  '総務,100000',
  '営業,170000',
  '開発,210000',
  '総務,110000',
  '人事,125000',
  '営業,190000',
  '開発,230000',
  '総務,105000',
  '営業,175000',
  '人事,135000',
  '開発,240000',
].join('\n');

const mission2FS: FSNode = {
  type: 'directory',
  children: {
    home: {
      type: 'directory',
      children: {
        data: {
          type: 'directory',
          children: {
            'sales.csv': {
              type: 'file',
              content: salesCsvLines,
            },
          },
        },
      },
    },
  },
};

const employeesCsvLines = [
  '名前,部門,年齢',
  '田中太郎,営業,28',
  '鈴木花子,開発,32',
  '佐藤一郎,人事,45',
  '山田美咲,開発,26',
  '伊藤健太,営業,38',
  '渡辺由美,総務,29',
  '中村大輔,開発,35',
  '小林真理,人事,42',
  '加藤翔太,営業,31',
  '吉田恵子,総務,27',
].join('\n');

const mission3FS: FSNode = {
  type: 'directory',
  children: {
    home: {
      type: 'directory',
      children: {
        data: {
          type: 'directory',
          children: {
            'employees.csv': {
              type: 'file',
              content: employeesCsvLines,
            },
          },
        },
      },
    },
  },
};

const serverLogLines = [
  '{"timestamp":"2024-01-15T08:00:01","level":"INFO","service":"web","message":"Server started"}',
  '{"timestamp":"2024-01-15T08:00:05","level":"INFO","service":"api","message":"API ready"}',
  '{"timestamp":"2024-01-15T08:01:10","level":"INFO","service":"db","message":"Connection pool initialized"}',
  '{"timestamp":"2024-01-15T08:02:15","level":"ERROR","service":"web","message":"Template rendering failed"}',
  '{"timestamp":"2024-01-15T08:03:20","level":"INFO","service":"api","message":"Request processed"}',
  '{"timestamp":"2024-01-15T08:04:25","level":"INFO","service":"web","message":"Static files served"}',
  '{"timestamp":"2024-01-15T08:05:30","level":"ERROR","service":"db","message":"Query timeout exceeded"}',
  '{"timestamp":"2024-01-15T08:06:35","level":"INFO","service":"api","message":"Cache hit"}',
  '{"timestamp":"2024-01-15T08:07:40","level":"INFO","service":"web","message":"Session created"}',
  '{"timestamp":"2024-01-15T08:08:45","level":"ERROR","service":"api","message":"Rate limit exceeded"}',
  '{"timestamp":"2024-01-15T08:09:50","level":"INFO","service":"db","message":"Backup started"}',
  '{"timestamp":"2024-01-15T08:10:55","level":"INFO","service":"web","message":"Request processed"}',
  '{"timestamp":"2024-01-15T08:12:00","level":"INFO","service":"api","message":"Health check OK"}',
  '{"timestamp":"2024-01-15T08:13:05","level":"ERROR","service":"web","message":"CSS compilation error"}',
  '{"timestamp":"2024-01-15T08:14:10","level":"INFO","service":"db","message":"Index rebuilt"}',
  '{"timestamp":"2024-01-15T08:15:15","level":"INFO","service":"api","message":"Token refreshed"}',
  '{"timestamp":"2024-01-15T08:16:20","level":"ERROR","service":"db","message":"Deadlock detected"}',
  '{"timestamp":"2024-01-15T08:17:25","level":"INFO","service":"web","message":"Request processed"}',
  '{"timestamp":"2024-01-15T08:18:30","level":"INFO","service":"api","message":"WebSocket connected"}',
  '{"timestamp":"2024-01-15T08:19:35","level":"INFO","service":"db","message":"Replication sync"}',
  '{"timestamp":"2024-01-15T08:20:40","level":"ERROR","service":"api","message":"Invalid JSON payload"}',
  '{"timestamp":"2024-01-15T08:21:45","level":"INFO","service":"web","message":"Middleware loaded"}',
  '{"timestamp":"2024-01-15T08:22:50","level":"INFO","service":"db","message":"Query optimized"}',
  '{"timestamp":"2024-01-15T08:23:55","level":"ERROR","service":"web","message":"404 Not Found: /missing"}',
  '{"timestamp":"2024-01-15T08:25:00","level":"INFO","service":"api","message":"Batch job started"}',
  '{"timestamp":"2024-01-15T08:26:05","level":"INFO","service":"db","message":"Connection released"}',
  '{"timestamp":"2024-01-15T08:27:10","level":"INFO","service":"web","message":"Gzip compression applied"}',
  '{"timestamp":"2024-01-15T08:28:15","level":"ERROR","service":"db","message":"Foreign key constraint violation"}',
  '{"timestamp":"2024-01-15T08:29:20","level":"INFO","service":"api","message":"Response cached"}',
  '{"timestamp":"2024-01-15T08:30:25","level":"INFO","service":"web","message":"CORS headers set"}',
  '{"timestamp":"2024-01-15T08:31:30","level":"ERROR","service":"api","message":"Service unavailable: upstream timeout"}',
  '{"timestamp":"2024-01-15T08:32:35","level":"INFO","service":"db","message":"Vacuum completed"}',
  '{"timestamp":"2024-01-15T08:33:40","level":"INFO","service":"web","message":"Request logged"}',
  '{"timestamp":"2024-01-15T08:34:45","level":"INFO","service":"api","message":"Authentication passed"}',
  '{"timestamp":"2024-01-15T08:35:50","level":"ERROR","service":"web","message":"Memory limit warning"}',
  '{"timestamp":"2024-01-15T08:36:55","level":"INFO","service":"db","message":"Slow query logged"}',
  '{"timestamp":"2024-01-15T08:38:00","level":"INFO","service":"api","message":"File uploaded"}',
  '{"timestamp":"2024-01-15T08:39:05","level":"INFO","service":"web","message":"Template cached"}',
  '{"timestamp":"2024-01-15T08:40:10","level":"ERROR","service":"db","message":"Connection pool exhausted"}',
  '{"timestamp":"2024-01-15T08:41:15","level":"INFO","service":"api","message":"Email sent"}',
  '{"timestamp":"2024-01-15T08:42:20","level":"INFO","service":"web","message":"Static cache cleared"}',
  '{"timestamp":"2024-01-15T08:43:25","level":"ERROR","service":"api","message":"Validation error: missing field"}',
  '{"timestamp":"2024-01-15T08:44:30","level":"INFO","service":"db","message":"Migration applied"}',
  '{"timestamp":"2024-01-15T08:45:35","level":"INFO","service":"web","message":"Heartbeat OK"}',
  '{"timestamp":"2024-01-15T08:46:40","level":"INFO","service":"api","message":"Rate limit reset"}',
  '{"timestamp":"2024-01-15T08:47:45","level":"ERROR","service":"web","message":"SSL certificate expiring soon"}',
  '{"timestamp":"2024-01-15T08:48:50","level":"INFO","service":"db","message":"Statistics updated"}',
  '{"timestamp":"2024-01-15T08:49:55","level":"INFO","service":"api","message":"Graceful shutdown initiated"}',
  '{"timestamp":"2024-01-15T08:51:00","level":"ERROR","service":"db","message":"Replication lag detected"}',
  '{"timestamp":"2024-01-15T08:52:05","level":"INFO","service":"web","message":"Server stopped"}',
].join('\n');

const reportLogLines = [
  'ERROR web Template rendering failed',
  'ERROR db Query timeout exceeded',
  'ERROR api Rate limit exceeded',
  'INFO web Request processed',
  'INFO api Health check OK',
  'ERROR web CSS compilation error',
  'ERROR db Deadlock detected',
  'INFO db Backup started',
  'ERROR api Invalid JSON payload',
  'INFO web Static files served',
  'ERROR web Memory limit warning',
  'ERROR db Connection pool exhausted',
  'INFO api Token refreshed',
  'ERROR api Service unavailable',
  'ERROR web SSL certificate expiring',
  'INFO db Replication sync',
  'ERROR db Foreign key violation',
  'INFO web Heartbeat OK',
].join('\n');

const mission4FS: FSNode = {
  type: 'directory',
  children: {
    home: {
      type: 'directory',
      children: {
        data: {
          type: 'directory',
          children: {
            'server-log.txt': {
              type: 'file',
              content: serverLogLines,
            },
            'report.log': {
              type: 'file',
              content: reportLogLines,
            },
          },
        },
      },
    },
  },
};

export const story06: Story = {
  id: 'story-06',
  title: 'パイプの達人',
  description:
    'パイプ（|）を使ってコマンドを連携させ、複雑なデータ処理をこなそう。',
  emoji: '\u{1F517}',
  missions: [
    {
      id: 'mission-06-01',
      title: 'パイプ入門',
      description: 'パイプ（|）を使ってコマンドの出力を次のコマンドに渡そう。',
      goal: 'パイプ（|）でコマンドの出力を別のコマンドに渡せるようになる',
      narrative:
        'パイプ(|)を使うと、コマンドの出力を次のコマンドの入力にできる。',
      initialCwd: '/home/data',
      initialFS: mission1FS,
      objectives: [
        {
          id: 'obj-06-01-01',
          description: 'ファイル一覧の先頭5件を表示する',
          checks: [{ type: 'output_contains', pattern: 'file05' }],
          hints: [
            { level: 1, text: 'コマンドの出力を別のコマンドに渡す記号があります。' },
            { level: 2, text: 'ls の出力をパイプ（|）で head に渡します。head -n 5 で先頭5行を取得できます。' },
            { level: 3, text: '「ls | head -n 5」と入力してEnterを押してください。' },
          ],
        },
        {
          id: 'obj-06-01-02',
          description: 'ログから ERROR を含む行を抽出する',
          checks: [
            { type: 'command_executed', command: 'grep' },
            { type: 'output_contains', pattern: 'ERROR' },
          ],
          hints: [
            { level: 1, text: 'cat でファイルを表示し、パイプで grep に渡しましょう。' },
            { level: 2, text: 'cat と grep をパイプで繋ぎます。直接 grep にファイルを指定してもOKです。' },
            { level: 3, text: '「cat logs/access.log | grep ERROR」と入力してEnterを押してください。' },
          ],
        },
      ],
    },
    {
      id: 'mission-06-02',
      title: 'データ加工',
      description: 'sort と uniq、grep と wc をパイプで組み合わせてデータを分析しよう。',
      goal: 'パイプで複数コマンドを連携させてデータ集計・分析ができるようになる',
      narrative:
        'データの集計と分析にパイプを活用しよう。',
      initialCwd: '/home/data',
      initialFS: mission2FS,
      objectives: [
        {
          id: 'obj-06-02-01',
          description: '部門の種類を確認する',
          checks: [
            { type: 'command_executed', command: 'sort' },
            { type: 'output_contains', pattern: '\u55B6\u696D' },
          ],
          hints: [
            { level: 1, text: 'CSVの特定の列を抽出して、重複を除去しましょう。' },
            { level: 2, text: 'cut -d, -f1 で部門列を抽出し、sort | uniq でユニークな値を取得できます。' },
            { level: 3, text: '「cut -d, -f1 sales.csv | sort | uniq」と入力してEnterを押してください。' },
          ],
        },
        {
          id: 'obj-06-02-02',
          description: 'データの件数を数える（20件）',
          checks: [{ type: 'output_contains', pattern: '20' }],
          hints: [
            { level: 1, text: '行数を数えるコマンドを使いましょう。' },
            { level: 2, text: 'wc -l コマンドでファイルの行数を数えられます。' },
            { level: 3, text: '「wc -l sales.csv」と入力してEnterを押してください。' },
          ],
        },
      ],
    },
    {
      id: 'mission-06-03',
      title: 'フィールド抽出',
      description: 'cut コマンドでCSVから特定のフィールドを抽出しよう。',
      goal: 'cut でCSVの特定列を抽出し、sort でフィールド指定ソートができるようになる',
      narrative:
        'CSVデータから特定のフィールドを抽出して分析しよう。',
      initialCwd: '/home/data',
      newCommands: ['cut'],
      initialFS: mission3FS,
      objectives: [
        {
          id: 'obj-06-03-01',
          description: '部門のフィールドだけを抽出する',
          checks: [
            { type: 'command_executed', command: 'cut' },
            { type: 'output_contains', pattern: '\u90E8\u9580' },
          ],
          hints: [
            { level: 1, text: 'CSVの特定の列を抽出するコマンドがあります。' },
            { level: 2, text: 'cut コマンドに -d（区切り文字）と -f（フィールド番号）を指定します。' },
            { level: 3, text: '「cut -d, -f2 employees.csv」と入力してEnterを押してください。' },
          ],
        },
        {
          id: 'obj-06-03-02',
          description: 'データを年齢でソートする',
          checks: [{ type: 'command_executed', command: 'sort' }],
          hints: [
            { level: 1, text: '数値でソートするオプションがあります。' },
            { level: 2, text: 'sort に -t（区切り文字）-k（フィールド）-n（数値ソート）を指定します。' },
            { level: 3, text: '「sort -t, -k3 -n employees.csv」と入力してEnterを押してください。' },
          ],
        },
      ],
    },
    {
      id: 'mission-06-04',
      title: '総合演習',
      description: '複数のコマンドをパイプで繋いで、データを抽出してファイルに保存しよう。',
      goal: '6段パイプで抽出・加工・集計・ソートを一括実行できるようになる',
      narrative:
        '最終課題。複数のコマンドをパイプで繋いで、データから必要な情報を抽出し、ファイルに保存しよう。',
      initialCwd: '/home/data',
      initialFS: mission4FS,
      objectives: [
        {
          id: 'obj-06-04-01',
          description: 'ERROR ログだけ抽出してファイルに保存する',
          checks: [
            { type: 'file_exists', path: '/home/data/errors.txt' },
            { type: 'file_contains', path: '/home/data/errors.txt', pattern: 'ERROR' },
          ],
          hints: [
            { level: 1, text: 'grep で抽出した結果をリダイレクトでファイルに保存しましょう。' },
            { level: 2, text: 'grep コマンドの出力を > でファイルに書き込めます。' },
            { level: 3, text: '「grep ERROR server-log.txt > errors.txt」と入力してEnterを押してください。' },
          ],
        },
        {
          id: 'obj-06-04-02',
          description: 'report.log からサービス別ERROR件数を集計する（4段パイプ）',
          checks: [
            { type: 'command_executed', command: 'uniq' },
            { type: 'output_contains', pattern: 'web' },
            { type: 'output_contains', pattern: 'db' },
          ],
          hints: [
            { level: 1, text: 'ERROR行を抽出し、サービス名だけ取り出して集計しましょう。' },
            { level: 2, text: 'grep ERROR で抽出 → cut -d" " -f2 でサービス名 → sort → uniq -c で集計できます。' },
            { level: 3, text: '「grep ERROR report.log | cut -d" " -f2 | sort | uniq -c」と入力してEnterを押してください。' },
          ],
        },
        {
          id: 'obj-06-04-03',
          description: 'ERROR件数の多い順にTOP3を表示する（6段パイプ）',
          checks: [
            { type: 'command_executed', command: 'head' },
            { type: 'output_contains', pattern: 'web' },
          ],
          hints: [
            { level: 1, text: '前の集計結果をさらにソートして上位だけ取り出しましょう。' },
            { level: 2, text: '前の4段パイプの結果に | sort -rn | head -n 3 を追加すると上位3件が取れます。' },
            { level: 3, text: '「grep ERROR report.log | cut -d" " -f2 | sort | uniq -c | sort -rn | head -n 3」と入力してEnterを押してください。' },
          ],
        },
      ],
    },
  ],
  unlockRequires: ['story-03'],
  course: 'engineer',
};
