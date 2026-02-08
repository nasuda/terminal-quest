# Terminal Quest

ストーリー駆動型ターミナルコマンド学習CLI - Learn terminal commands through interactive stories

Terminal Questは、冒険のストーリーを進めながらLinux/Unixコマンドを楽しく学べる学習ツールです。Ink (React for CLI) を使用したインタラクティブなUIで、実際のコマンド入力を行いながらクエストをクリアしていきます。

## 特徴 (Features)

- 🎮 **ストーリー駆動型学習**: 3つのコース（小学生向け、はじめて、エンジニア）でレベルに合わせて学習できます。
- 🛡️ **安全な環境**: 仮想ファイルシステム上で動作するため、実際のファイルシステムに影響を与えません（`rm -rf /` も安全に実行可能！）。
- ⌨️ **リアルな操作感**: パイプ（`|`）やリダイレクト（`>`）、タブ補完、履歴機能など、実際のターミナルに近い操作感を実現しています。
- 🏆 **実績システム**: コマンド習得や特定の条件達成でバッジを獲得できます。

## インストール (Installation)

Node.js (v18以上) が必要です。

```bash
# グローバルにインストール
npm install -g terminal-quest

# または npx で一時的に実行
npx terminal-quest
```

## 使い方 (Usage)

インストール後、以下のコマンドで起動します：

```bash
terminal-quest
```

起動後は画面の指示に従い、コースを選択してストーリーを開始してください。
ミッションごとに課題が出され、指定されたコマンドを使ってクリアしていきます。

### 基本操作
- **コマンド入力**: `ls`, `cd`, `cat` などのコマンドを入力して実行
- **タブ補完**: パスやコマンドの入力を補完
- **ヒント**: `hint` コマンドでヒントを表示（困ったときは使いましょう）
- **ヘルプ**: `help` で使用可能なコマンド一覧を表示
- **終了**: `Ctrl+C` で終了

## コース紹介 (Courses)

### ✨ 小学生向けコース (Kids)
冒険の世界で基本的なコマンド（`pwd`, `ls`, `cd`, `cat`）を楽しく学びます。

### 💻 はじめてコース (Beginner)
「はじめてのパソコン冒険」を通じて、ファイル操作の基礎を学びます。

### 🖥️ エンジニアコース (Engineer)
実践的なサーバー管理や開発シナリオを通じて、高度なコマンド操作を学びます。
- **ファイル操作**: `mkdir`, `mv`, `rm`, `find`, `touch`, `cp`
- **ログ解析**: `grep`, `head`, `tail`, `sort`, `uniq`, `wc`
- **権限管理**: `chmod`
- **Git操作**: `git status`, `git log`, `git diff` など
- **パイプ活用**: コマンドを組み合わせて複雑な処理を実行

## 開発 (Development)

```bash
# リポジトリのクローン
git clone https://github.com/nasuda/terminal-quest.git
cd terminal-quest

# 依存関係のインストール
npm install

# 開発モードで実行
npm run dev

# ビルド
npm run build

# テスト実行
npm test
```

## ライセンス (License)

MIT License
