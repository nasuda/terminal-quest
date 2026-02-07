import { VirtualFS } from '../VirtualFS.js';
import type { CommandResult } from './index.js';

const HELP_TEXT = `使用可能なコマンド:
  pwd                          現在のディレクトリを表示
  ls [path]                    ファイル一覧 (-l 詳細, -a 全表示)
  cd [path]                    ディレクトリ移動
  cat file...                  ファイル内容を表示
  grep [opts] pattern file     パターン検索 (-i, -n, -r)
  cp [-r] src dest             コピー
  mv src dest                  移動・名前変更
  mkdir [-p] path              ディレクトリ作成
  rm [-r] [-f] path            削除
  touch file                   空ファイル作成
  find [path] [-name p] [-type t]  ファイル検索
  head [-n N] file             先頭N行を表示
  tail [-n N] file             末尾N行を表示
  wc [-l] [-w] [-c] file       行数/単語数/バイト数
  sort [-r] [-n] file          ソート
  uniq [-c] file               重複除去
  cut -d delim -f N file       フィールド切り出し
  chmod mode file              権限変更
  echo text [> file]           テキスト出力/ファイル書き込み
  git <subcmd>                 Gitコマンド (status/log/diff/branch/checkout/merge/stash)
  clear                        画面クリア
  help                         このヘルプを表示
  hint                         ヒントを表示
  objectives / obj             現在の目標を表示

  ヒント: コマンドは | (パイプ) で繋げられます
  例: cat file.txt | grep ERROR | wc -l`;

export function help(_fs: VirtualFS, _args: string[]): CommandResult {
  return { output: HELP_TEXT };
}
