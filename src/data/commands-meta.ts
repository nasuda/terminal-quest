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
    description: 'パソコンの中で「今どこにいるか」を教えてくれます。迷ったらまずこれ！',
    usage: 'pwd',
    examples: [
      { cmd: 'pwd', desc: 'これだけでOK。今いる場所のパス（住所）が表示される' },
    ],
  },
  {
    name: 'ls',
    description: '今いるフォルダの中に何があるか一覧で見ます。引き出しを開けて中身を見るイメージです。',
    usage: 'ls [フォルダ名]',
    examples: [
      { cmd: 'ls', desc: 'これだけでOK。今いるフォルダの中身が表示される' },
      { cmd: 'ls src', desc: 'ls のあとにフォルダ名を書くと、そのフォルダの中身が見える' },
      { cmd: 'ls ..', desc: '1つ上のフォルダの中身を見る。.. は「上のフォルダ」の意味' },
      { cmd: 'ls -la', desc: '-la をつけると隠しファイルも含めて詳しく見える' },
    ],
    options: [
      { flag: '-a', description: '普段見えない隠しファイルも表示する' },
      { flag: '-l', description: 'サイズや日付など詳しい情報も表示する' },
    ],
  },
  {
    name: 'cd',
    description: '別のフォルダに移動します。パソコンの中を歩き回るイメージです。',
    usage: 'cd <フォルダ名>',
    examples: [
      { cmd: 'cd src', desc: '今いるフォルダの中にある src に入る。名前だけ書けばOK' },
      { cmd: 'cd ..', desc: '.. は「1つ上のフォルダ」の意味。/home/src にいたら /home に戻る' },
      { cmd: 'cd ../docs', desc: '1つ上に戻ってから docs に入る。../ は「上のフォルダの」の意味' },
      { cmd: 'cd /home', desc: '/ から始めるとフォルダの住所を直接指定できる（絶対パス）' },
    ],
  },
  {
    name: 'cat',
    description: 'ファイルを開いて中身を読みます。メモ帳で開くようなイメージです。',
    usage: 'cat <ファイル名>',
    examples: [
      { cmd: 'cat file.txt', desc: 'cat のあとにファイル名を書く。今いるフォルダの中のファイルが読める' },
      { cmd: 'cat src/config.json', desc: 'src フォルダの中の config.json を読む。/ でフォルダを区切る' },
      { cmd: 'cat ../memo.txt', desc: '1つ上のフォルダの memo.txt を読む。../ は「上のフォルダの」' },
    ],
  },
  {
    name: 'grep',
    description: 'ファイルの中から特定の言葉を検索します。ブラウザの Ctrl+F（文字検索）のようなものです。',
    usage: 'grep <探す言葉> <ファイル名>',
    examples: [
      { cmd: 'grep ERROR app.log', desc: '実行すると app.log から ERROR を含む行だけが表示される' },
      { cmd: 'grep -n "port" config.json', desc: '-n をつけると何行目に見つかったかもわかる' },
      { cmd: 'grep -i hello file.txt', desc: '-i をつけると大文字・小文字を区別せずに探す' },
    ],
    options: [
      { flag: '-i', description: '大文字と小文字を同じものとして扱う' },
      { flag: '-n', description: '見つかった行の行番号も表示する' },
      { flag: '-r', description: 'フォルダの中のファイルも全部まとめて探す' },
      { flag: '-c', description: '見つかった行の件数だけ表示する' },
    ],
  },
  {
    name: 'cp',
    description: 'ファイルのコピーを作ります。右クリックの「コピー＆ペースト」と同じです。',
    usage: 'cp <コピー元> <コピー先>',
    examples: [
      { cmd: 'cp file.txt file.bak', desc: '同じフォルダ内でコピー。file.bak という名前の控えができる' },
      { cmd: 'cp file.txt src/', desc: 'file.txt を src フォルダの中にコピー。末尾の / は「中へ」の意味' },
      { cmd: 'cp src/data.txt .', desc: 'src の中の data.txt を今いるフォルダにコピー。. は「ここ」の意味' },
      { cmd: 'cp -r src/ backup/', desc: '-r をつけるとフォルダの中身ごとまるっとコピーできる' },
    ],
    options: [
      { flag: '-r', description: 'フォルダの中身もまるごとコピーする' },
    ],
  },
  {
    name: 'echo',
    description: '文字を画面に表示したり、ファイルに書き込みます。「おうむ返し」するコマンドです。',
    usage: 'echo <文字>',
    examples: [
      { cmd: 'echo "Hello"', desc: '実行すると Hello と画面に表示される。echo が文字をおうむ返しする' },
      { cmd: 'echo "data" > out.txt', desc: '> をつけると画面ではなくファイルに書き込める。out.txt に data と保存される' },
      { cmd: 'echo "追記" >> out.txt', desc: '>> にすると上書きせず末尾に書き足す。> だと中身が入れ替わるので注意' },
    ],
  },
  {
    name: 'mkdir',
    description: '新しいフォルダを作ります。「Make Directory（フォルダを作れ）」の略です。',
    usage: 'mkdir <フォルダ名>',
    examples: [
      { cmd: 'mkdir src', desc: 'mkdir のあとに作りたいフォルダ名を書く。src フォルダができる' },
      { cmd: 'mkdir -p src/components/ui', desc: '-p をつけると途中のフォルダもまとめて一気に作れる' },
    ],
    options: [
      { flag: '-p', description: '間のフォルダがなくても一気にまとめて作る' },
    ],
  },
  {
    name: 'mv',
    description: 'ファイルを別の場所に移動したり、名前を変えたりします。ドラッグ＆ドロップのイメージです。',
    usage: 'mv <今の名前> <新しい名前 or 移動先>',
    examples: [
      { cmd: 'mv old.txt new.txt', desc: '同じフォルダ内で名前を変更する。old → new になる' },
      { cmd: 'mv file.txt src/', desc: 'file.txt を src フォルダの中に移動。末尾の / は「中へ」の意味' },
      { cmd: 'mv src/data.txt .', desc: 'src の中の data.txt を今いるフォルダに移動。. は「ここ」の意味' },
      { cmd: 'mv ../memo.txt .', desc: '1つ上のフォルダの memo.txt をここに持ってくる' },
    ],
  },
  {
    name: 'rm',
    description: 'ファイルやフォルダを削除します。ゴミ箱を通さず直接消えるので注意！',
    usage: 'rm <ファイル名>',
    examples: [
      { cmd: 'rm file.txt', desc: 'rm のあとに消したいファイル名を書く' },
      { cmd: 'rm -r old_dir', desc: '-r をつけるとフォルダの中身ごとまるっと削除できる' },
      { cmd: 'rm -rf temp/', desc: '-rf で確認なし強制削除。取り消せないので注意！' },
    ],
    options: [
      { flag: '-r', description: 'フォルダの中身もまとめて削除する' },
      { flag: '-f', description: '確認メッセージなしで強制的に削除する' },
    ],
  },
  {
    name: 'find',
    description: 'ファイルやフォルダを名前で探します。パソコンの中の「検索」機能です。',
    usage: 'find <探す場所> -name <名前>',
    examples: [
      { cmd: 'find .', desc: '実行すると今いるフォルダ以下のすべてのファイルが一覧表示される' },
      { cmd: 'find . -name "*.txt"', desc: '実行すると .txt で終わるファイルだけが表示される。* は「何でもOK」の意味' },
      { cmd: 'find . -name "*.tmp"', desc: '実行すると .tmp で終わるファイルが表示される。削除対象を探すのに便利' },
      { cmd: 'find /var -type f', desc: '実行すると /var の中のファイルだけが表示される。-type f はファイル限定の意味' },
    ],
    options: [
      { flag: '-name "パターン"', description: '名前で探す（* を使うと「何でもOK」の意味になる）' },
      { flag: '-type f', description: 'ファイルだけに絞り込む' },
      { flag: '-type d', description: 'フォルダだけに絞り込む' },
    ],
  },
  {
    name: 'touch',
    description: '空っぽの新しいファイルを作ります。白紙のノートを用意するイメージです。',
    usage: 'touch <ファイル名>',
    examples: [
      { cmd: 'touch new_file.txt', desc: 'touch のあとに作りたいファイル名を書く。空ファイルができる' },
      { cmd: 'touch README.md', desc: '同じように README.md という空ファイルを作る例' },
    ],
  },
  {
    name: 'head',
    description: 'ファイルの最初のほうだけ読みます。長いファイルをちょっと覗きたいときに便利です。',
    usage: 'head <ファイル名>',
    examples: [
      { cmd: 'head file.txt', desc: 'head のあとにファイル名を書く。最初の10行が表示される' },
      { cmd: 'head -n 5 log.txt', desc: '-n のあとに数字を書いて行数を指定。ここでは5行' },
    ],
    options: [
      { flag: '-n 数字', description: '何行表示するか指定する' },
    ],
  },
  {
    name: 'tail',
    description: 'ファイルの最後のほうだけ読みます。最新のログを確認したいときに便利です。',
    usage: 'tail <ファイル名>',
    examples: [
      { cmd: 'tail file.txt', desc: 'tail のあとにファイル名を書く。最後の10行が表示される' },
      { cmd: 'tail -n 20 log.txt', desc: '-n のあとに数字を書いて行数を指定。ここでは20行' },
    ],
    options: [
      { flag: '-n 数字', description: '何行表示するか指定する' },
    ],
  },
  {
    name: 'wc',
    description: 'ファイルの行数や文字数を数えます。「Word Count（文字数カウント）」の略です。',
    usage: 'wc <ファイル名>',
    examples: [
      { cmd: 'wc file.txt', desc: '実行すると file.txt の行数・単語数・バイト数がまとめて表示される' },
      { cmd: 'wc -l log.txt', desc: '実行すると log.txt の行数だけが表示される。-l は行数の意味' },
      { cmd: 'cat file.txt | wc -w', desc: '実行すると file.txt の単語数が表示される。| で結果を次のコマンドに渡す' },
    ],
    options: [
      { flag: '-l', description: '行数だけ数える' },
      { flag: '-w', description: '単語数だけ数える' },
      { flag: '-c', description: 'バイト数だけ数える' },
    ],
  },
  {
    name: 'sort',
    description: 'ファイルの中身を順番に並び替えます。あいうえお順や数字順にできます。',
    usage: 'sort <ファイル名>',
    examples: [
      { cmd: 'sort names.txt', desc: '実行すると names.txt の中身がアルファベット順に並んで表示される' },
      { cmd: 'sort -n numbers.txt', desc: '-n をつけると数字の小さい順に並ぶ' },
      { cmd: 'sort -r data.txt', desc: '-r をつけると逆順に並ぶ' },
    ],
    options: [
      { flag: '-r', description: '逆順にする' },
      { flag: '-n', description: '数字として比べて並べる（1, 2, 10 の順になる）' },
      { flag: '-t 文字', description: 'データの区切り文字を指定する（, や : など）' },
      { flag: '-k 番号', description: '何番目の項目を基準に並べるか指定する' },
    ],
  },
  {
    name: 'uniq',
    description: '同じ内容が続いている行を1つにまとめます。sort と組み合わせて使うのが定番です。',
    usage: 'uniq <ファイル名>',
    examples: [
      { cmd: 'sort data.txt | uniq', desc: '実行すると重複を消した一覧が表示される。| は左の結果を右に渡す記号' },
      { cmd: 'sort data.txt | uniq -c', desc: '実行すると各行が何回出てきたか回数つきで表示される' },
    ],
    options: [
      { flag: '-c', description: '同じ行が何回あったか回数も表示する' },
    ],
  },
  {
    name: 'cut',
    description: '表のようなデータから欲しい列だけを取り出します。Excelの列選択のイメージです。',
    usage: 'cut -d <区切り文字> -f <列番号> <ファイル>',
    examples: [
      { cmd: 'cut -d, -f1 data.csv', desc: '実行すると data.csv の1列目だけが表示される。-d, は区切り文字がコンマの意味' },
      { cmd: 'cut -d: -f1,3 /etc/passwd', desc: '-f1,3 で1列目と3列目を一度に取り出せる' },
    ],
    options: [
      { flag: '-d 文字', description: 'データの区切り文字を指定する（, や : など）' },
      { flag: '-f 番号', description: '取り出したい列の番号を指定する' },
    ],
  },
  {
    name: 'chmod',
    description: 'ファイルの「実行してもいいよ」という許可を設定します。スクリプトを動かすときに必要です。',
    usage: 'chmod <モード> <ファイル>',
    examples: [
      { cmd: 'chmod 755 script.sh', desc: '実行すると script.sh に読み書き実行の権限がつく。755 は権限を表す数字' },
      { cmd: 'chmod +x start.sh', desc: '+x は「実行を許可する」という意味' },
    ],
  },
  {
    name: 'git',
    description: 'ファイルの変更履歴を記録・管理するツールです。「いつ・何を変えたか」がわかります。',
    usage: 'git <サブコマンド>',
    examples: [
      { cmd: 'git status', desc: '実行すると変更されたファイルの一覧が表示される' },
      { cmd: 'git log', desc: '実行するとこれまでの変更履歴が時系列で表示される' },
      { cmd: 'git branch', desc: '実行するとブランチ（作業の分岐）の一覧が表示される' },
      { cmd: 'git checkout -b feature', desc: '実行すると feature という名前の新しいブランチが作られ、そこに移動する' },
    ],
  },
  {
    name: 'man',
    description: 'コマンドの説明書を表示します。使い方がわからないときはこれで調べよう！',
    usage: 'man <コマンド名>',
    examples: [
      { cmd: 'man', desc: '実行すると使えるコマンドの一覧が表示される' },
      { cmd: 'man ls', desc: '実行すると ls の使い方・オプション・具体例が表示される' },
      { cmd: 'man grep', desc: '実行すると grep の使い方・オプション・具体例が表示される' },
    ],
  },
];

export function getCommandMeta(name: string): CommandMeta | undefined {
  return commandsMeta.find((cmd) => cmd.name === name);
}
