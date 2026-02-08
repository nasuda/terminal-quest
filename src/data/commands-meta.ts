export interface CommandMeta {
  name: string;
  description: string;
  usage: string;
  examples: string[];
  options?: Array<{ flag: string; description: string }>;
}

export const commandsMeta: CommandMeta[] = [
  {
    name: 'pwd',
    description: '現在の作業ディレクトリのパスを表示します。',
    usage: 'pwd',
    examples: ['pwd'],
  },
  {
    name: 'ls',
    description: 'ディレクトリの中身を一覧表示します。',
    usage: 'ls [パス]',
    examples: ['ls', 'ls /etc', 'ls -la'],
    options: [
      { flag: '-a', description: '隠しファイルも表示' },
      { flag: '-l', description: '詳細表示' },
    ],
  },
  {
    name: 'cd',
    description: '作業ディレクトリを変更します。',
    usage: 'cd <パス>',
    examples: ['cd /home', 'cd ..', 'cd /etc/app'],
  },
  {
    name: 'cat',
    description: 'ファイルの内容を表示します。',
    usage: 'cat <ファイルパス>',
    examples: ['cat file.txt', 'cat /var/log/app.log'],
  },
  {
    name: 'grep',
    description: 'ファイル内から指定したパターンに一致する行を検索して表示します。',
    usage: 'grep <パターン> <ファイルパス>',
    examples: ['grep ERROR /var/log/app.log', 'grep "port" config.json'],
    options: [
      { flag: '-i', description: '大文字小文字を区別しない' },
      { flag: '-n', description: '行番号を表示' },
      { flag: '-r', description: '再帰的に検索' },
      { flag: '-c', description: 'マッチ行数を表示' },
    ],
  },
  {
    name: 'cp',
    description: 'ファイルやディレクトリをコピーします。',
    usage: 'cp <コピー元> <コピー先>',
    examples: ['cp file.txt file.bak', 'cp config.json /home/admin/backups/'],
    options: [
      { flag: '-r', description: 'ディレクトリを再帰的にコピー' },
    ],
  },
  {
    name: 'echo',
    description: '文字列を表示します。リダイレクト（>）と組み合わせてファイルに書き込めます。',
    usage: 'echo <文字列> [> ファイルパス]',
    examples: ['echo "Hello"', 'echo "data" > output.txt', 'echo "追記" >> output.txt'],
  },
  {
    name: 'mkdir',
    description: 'ディレクトリを作成します。',
    usage: 'mkdir [-p] <ディレクトリパス>',
    examples: ['mkdir src', 'mkdir -p src/components/ui'],
    options: [
      { flag: '-p', description: '親ディレクトリも作成' },
    ],
  },
  {
    name: 'mv',
    description: 'ファイルやディレクトリを移動・名前変更します。',
    usage: 'mv <移動元> <移動先>',
    examples: ['mv old.txt new.txt', 'mv file.txt src/'],
  },
  {
    name: 'rm',
    description: 'ファイルやディレクトリを削除します。',
    usage: 'rm [-r] [-f] <パス>',
    examples: ['rm file.txt', 'rm -r old_dir', 'rm -rf temp/'],
    options: [
      { flag: '-r', description: '再帰的に削除' },
      { flag: '-f', description: '強制削除' },
    ],
  },
  {
    name: 'find',
    description: 'ファイルやディレクトリを検索します。',
    usage: 'find [パス] [-name パターン] [-type f|d]',
    examples: ['find .', 'find . -name "*.txt"', 'find /var -type f'],
    options: [
      { flag: '-name', description: 'ファイル名パターンで検索' },
      { flag: '-type f|d', description: 'ファイルタイプで絞り込み' },
    ],
  },
  {
    name: 'touch',
    description: '空のファイルを作成します（既存の場合は何もしません）。',
    usage: 'touch <ファイル名>',
    examples: ['touch new_file.txt', 'touch README.md'],
  },
  {
    name: 'head',
    description: 'ファイルの先頭部分を表示します。',
    usage: 'head [-n 行数] <ファイル>',
    examples: ['head file.txt', 'head -n 5 log.txt'],
    options: [
      { flag: '-n N', description: '先頭N行を表示' },
    ],
  },
  {
    name: 'tail',
    description: 'ファイルの末尾部分を表示します。',
    usage: 'tail [-n 行数] <ファイル>',
    examples: ['tail file.txt', 'tail -n 20 log.txt'],
    options: [
      { flag: '-n N', description: '末尾N行を表示' },
    ],
  },
  {
    name: 'wc',
    description: '行数、単語数、バイト数を数えます。',
    usage: 'wc [-l] [-w] [-c] <ファイル>',
    examples: ['wc file.txt', 'wc -l log.txt', 'cat file.txt | wc -w'],
    options: [
      { flag: '-l', description: '行数のみ' },
      { flag: '-w', description: '単語数のみ' },
      { flag: '-c', description: 'バイト数のみ' },
    ],
  },
  {
    name: 'sort',
    description: '行をソートして表示します。',
    usage: 'sort [-r] [-n] [-t CHAR] [-k N] <ファイル>',
    examples: ['sort names.txt', 'sort -n numbers.txt', 'sort -r data.txt', 'sort -t, -k3 -n data.csv'],
    options: [
      { flag: '-r', description: '逆順' },
      { flag: '-n', description: '数値ソート' },
      { flag: '-t CHAR', description: '区切り文字指定' },
      { flag: '-k N', description: 'フィールドN番目でソート' },
    ],
  },
  {
    name: 'uniq',
    description: '連続する重複行を除去します。',
    usage: 'uniq [-c] <ファイル>',
    examples: ['sort data.txt | uniq', 'sort data.txt | uniq -c'],
    options: [
      { flag: '-c', description: '出現回数を表示' },
    ],
  },
  {
    name: 'cut',
    description: '各行から特定のフィールドを切り出します。',
    usage: 'cut -d <区切り文字> -f <フィールド番号> <ファイル>',
    examples: ['cut -d, -f1 data.csv', 'cut -d: -f1,3 /etc/passwd'],
    options: [
      { flag: '-d CHAR', description: '区切り文字指定' },
      { flag: '-f N', description: 'フィールド番号指定' },
    ],
  },
  {
    name: 'chmod',
    description: 'ファイルの権限を変更します。',
    usage: 'chmod <モード> <ファイル>',
    examples: ['chmod 755 script.sh', 'chmod +x start.sh'],
  },
  {
    name: 'git',
    description: 'バージョン管理コマンド（シミュレーション）。',
    usage: 'git <サブコマンド> [引数...]',
    examples: ['git status', 'git log', 'git branch', 'git checkout -b feature'],
  },
  {
    name: 'man',
    description: 'コマンドのマニュアルを表示します。',
    usage: 'man [コマンド名]',
    examples: ['man', 'man ls', 'man grep'],
  },
];

export function getCommandMeta(name: string): CommandMeta | undefined {
  return commandsMeta.find((cmd) => cmd.name === name);
}
