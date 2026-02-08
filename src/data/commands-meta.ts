export interface CommandExample {
  cmd: string;
  desc: string;
}

export interface CommandMeta {
  name: string;
  description: string;
  usage: string;
  examples: CommandExample[];
  options?: Array<{ flag: string; description: string }>;
}

export const commandsMeta: CommandMeta[] = [
  {
    name: 'pwd',
    description: '現在いる場所（ディレクトリ）を表示します。',
    usage: 'pwd',
    examples: [
      { cmd: 'pwd', desc: '今いるディレクトリのパスを表示' },
    ],
  },
  {
    name: 'ls',
    description: '今いるディレクトリの中身を一覧表示します。',
    usage: 'ls [パス]',
    examples: [
      { cmd: 'ls', desc: '今いるフォルダの中身を表示' },
      { cmd: 'ls /etc', desc: '/etc フォルダの中身を表示' },
      { cmd: 'ls -la', desc: '隠しファイルも含めて詳しく表示' },
    ],
    options: [
      { flag: '-a', description: '隠しファイルも表示' },
      { flag: '-l', description: '詳細表示' },
    ],
  },
  {
    name: 'cd',
    description: '別のディレクトリに移動します。',
    usage: 'cd <パス>',
    examples: [
      { cmd: 'cd /home', desc: '/home に移動' },
      { cmd: 'cd ..', desc: '1つ上のフォルダに戻る' },
      { cmd: 'cd メモ', desc: 'メモ フォルダに入る' },
    ],
  },
  {
    name: 'cat',
    description: 'ファイルの中身を表示します。',
    usage: 'cat <ファイル名>',
    examples: [
      { cmd: 'cat file.txt', desc: 'file.txt の中身を表示' },
      { cmd: 'cat /var/log/app.log', desc: 'パスを指定して表示' },
    ],
  },
  {
    name: 'grep',
    description: 'ファイルの中から指定した文字列を探します。',
    usage: 'grep <探す文字> <ファイル名>',
    examples: [
      { cmd: 'grep ERROR app.log', desc: 'app.log から "ERROR" を含む行を探す' },
      { cmd: 'grep -n "port" config.json', desc: '行番号付きで "port" を探す' },
      { cmd: 'grep -i hello file.txt', desc: '大文字小文字を区別せず探す' },
    ],
    options: [
      { flag: '-i', description: '大文字小文字を区別しない' },
      { flag: '-n', description: '行番号を表示' },
      { flag: '-r', description: 'フォルダの中も全部探す' },
      { flag: '-c', description: '見つかった行の数だけ表示' },
    ],
  },
  {
    name: 'cp',
    description: 'ファイルをコピーします。',
    usage: 'cp <コピー元> <コピー先>',
    examples: [
      { cmd: 'cp file.txt file.bak', desc: 'file.txt のバックアップを作成' },
      { cmd: 'cp memo.txt メモ/', desc: 'memo.txt を メモ/ フォルダにコピー' },
      { cmd: 'cp -r src/ backup/', desc: 'src フォルダを丸ごとコピー' },
    ],
    options: [
      { flag: '-r', description: 'フォルダの中身もまとめてコピー' },
    ],
  },
  {
    name: 'echo',
    description: '文字を表示したり、ファイルに書き込みます。',
    usage: 'echo <文字列>',
    examples: [
      { cmd: 'echo "Hello"', desc: '画面に Hello と表示' },
      { cmd: 'echo "data" > out.txt', desc: 'out.txt に "data" を書き込む（上書き）' },
      { cmd: 'echo "追記" >> out.txt', desc: 'out.txt の末尾に追記' },
    ],
  },
  {
    name: 'mkdir',
    description: '新しいフォルダを作ります。',
    usage: 'mkdir <フォルダ名>',
    examples: [
      { cmd: 'mkdir src', desc: 'src フォルダを作成' },
      { cmd: 'mkdir -p src/components/ui', desc: '途中のフォルダもまとめて作成' },
    ],
    options: [
      { flag: '-p', description: '途中のフォルダも一気に作成' },
    ],
  },
  {
    name: 'mv',
    description: 'ファイルを移動、または名前を変更します。',
    usage: 'mv <移動元> <移動先>',
    examples: [
      { cmd: 'mv old.txt new.txt', desc: 'ファイル名を old.txt → new.txt に変更' },
      { cmd: 'mv file.txt src/', desc: 'file.txt を src/ フォルダに移動' },
    ],
  },
  {
    name: 'rm',
    description: 'ファイルやフォルダを削除します。',
    usage: 'rm <ファイル名>',
    examples: [
      { cmd: 'rm file.txt', desc: 'ファイルを1つ削除' },
      { cmd: 'rm -r old_dir', desc: 'フォルダごとまるっと削除' },
      { cmd: 'rm -rf temp/', desc: '確認なしで強制的に削除' },
    ],
    options: [
      { flag: '-r', description: 'フォルダの中身もまとめて削除' },
      { flag: '-f', description: '確認なしで強制削除' },
    ],
  },
  {
    name: 'find',
    description: 'ファイルやフォルダを名前で探します。',
    usage: 'find <場所> -name <名前>',
    examples: [
      { cmd: 'find .', desc: '今いるフォルダの中身をすべて表示' },
      { cmd: 'find . -name "*.txt"', desc: '.txt で終わるファイルを探す' },
      { cmd: 'find . -name "*.tmp"', desc: '.tmp ファイルを探す' },
      { cmd: 'find /var -type f', desc: '/var の中のファイルだけ表示' },
    ],
    options: [
      { flag: '-name "パターン"', description: '名前のパターンで探す（* はワイルドカード）' },
      { flag: '-type f', description: 'ファイルだけに絞る' },
      { flag: '-type d', description: 'フォルダだけに絞る' },
    ],
  },
  {
    name: 'touch',
    description: '空のファイルを新しく作ります。',
    usage: 'touch <ファイル名>',
    examples: [
      { cmd: 'touch new_file.txt', desc: '空の new_file.txt を作成' },
      { cmd: 'touch README.md', desc: '空の README.md を作成' },
    ],
  },
  {
    name: 'head',
    description: 'ファイルの先頭部分だけ表示します。',
    usage: 'head <ファイル名>',
    examples: [
      { cmd: 'head file.txt', desc: '先頭10行を表示（デフォルト）' },
      { cmd: 'head -n 5 log.txt', desc: '先頭5行だけ表示' },
    ],
    options: [
      { flag: '-n 数字', description: '表示する行数を指定' },
    ],
  },
  {
    name: 'tail',
    description: 'ファイルの末尾部分だけ表示します。',
    usage: 'tail <ファイル名>',
    examples: [
      { cmd: 'tail file.txt', desc: '末尾10行を表示（デフォルト）' },
      { cmd: 'tail -n 20 log.txt', desc: '末尾20行だけ表示' },
    ],
    options: [
      { flag: '-n 数字', description: '表示する行数を指定' },
    ],
  },
  {
    name: 'wc',
    description: 'ファイルの行数・単語数・バイト数を数えます。',
    usage: 'wc <ファイル名>',
    examples: [
      { cmd: 'wc file.txt', desc: '行数・単語数・バイト数をすべて表示' },
      { cmd: 'wc -l log.txt', desc: '行数だけ表示' },
      { cmd: 'cat file.txt | wc -w', desc: 'パイプで受け取って単語数を表示' },
    ],
    options: [
      { flag: '-l', description: '行数だけ表示' },
      { flag: '-w', description: '単語数だけ表示' },
      { flag: '-c', description: 'バイト数だけ表示' },
    ],
  },
  {
    name: 'sort',
    description: 'ファイルの中身を並び替えます。',
    usage: 'sort <ファイル名>',
    examples: [
      { cmd: 'sort names.txt', desc: 'あいうえお順に並び替え' },
      { cmd: 'sort -n numbers.txt', desc: '数字の小さい順に並び替え' },
      { cmd: 'sort -r data.txt', desc: '逆順に並び替え' },
    ],
    options: [
      { flag: '-r', description: '逆順に並べる' },
      { flag: '-n', description: '数字として並べる' },
      { flag: '-t 文字', description: '区切り文字を指定' },
      { flag: '-k 番号', description: '何番目の項目で並べるか指定' },
    ],
  },
  {
    name: 'uniq',
    description: '連続する同じ行をまとめます（重複削除）。',
    usage: 'uniq <ファイル名>',
    examples: [
      { cmd: 'sort data.txt | uniq', desc: 'まずsortしてから重複を削除' },
      { cmd: 'sort data.txt | uniq -c', desc: '重複を削除して出現回数も表示' },
    ],
    options: [
      { flag: '-c', description: '何回出てきたか回数を表示' },
    ],
  },
  {
    name: 'cut',
    description: '各行から特定の列だけ切り出します。',
    usage: 'cut -d <区切り文字> -f <列番号> <ファイル>',
    examples: [
      { cmd: 'cut -d, -f1 data.csv', desc: 'CSVの1列目だけ取り出す' },
      { cmd: 'cut -d: -f1,3 /etc/passwd', desc: ': 区切りの1列目と3列目を取り出す' },
    ],
    options: [
      { flag: '-d 文字', description: '区切り文字を指定（, や : など）' },
      { flag: '-f 番号', description: '取り出す列の番号を指定' },
    ],
  },
  {
    name: 'chmod',
    description: 'ファイルの実行権限などを変更します。',
    usage: 'chmod <モード> <ファイル>',
    examples: [
      { cmd: 'chmod 755 script.sh', desc: '実行可能にする（数字指定）' },
      { cmd: 'chmod +x start.sh', desc: '実行権限を追加' },
    ],
  },
  {
    name: 'git',
    description: 'バージョン管理コマンド（シミュレーション）。',
    usage: 'git <サブコマンド>',
    examples: [
      { cmd: 'git status', desc: '変更状態を確認' },
      { cmd: 'git log', desc: '変更履歴を表示' },
      { cmd: 'git branch', desc: 'ブランチ一覧を表示' },
      { cmd: 'git checkout -b feature', desc: '新しいブランチを作って切り替え' },
    ],
  },
  {
    name: 'man',
    description: 'コマンドの使い方を表示します。',
    usage: 'man <コマンド名>',
    examples: [
      { cmd: 'man', desc: '全コマンドの一覧を表示' },
      { cmd: 'man ls', desc: 'ls の使い方を表示' },
      { cmd: 'man grep', desc: 'grep の使い方を表示' },
    ],
  },
];

export function getCommandMeta(name: string): CommandMeta | undefined {
  return commandsMeta.find((cmd) => cmd.name === name);
}
