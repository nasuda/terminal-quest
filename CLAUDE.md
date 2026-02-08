# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Terminal Quest - ストーリー駆動型ターミナルコマンド学習CLI。Ink (React for CLI) を使ったインタラクティブなターミナルアプリ。3つのコース（小学生向け・はじめて・エンジニア）のストーリーでターミナルコマンドを学ぶ。

## Getting Started

```bash
git clone https://github.com/nasuda/terminal-quest.git
cd terminal-quest
npm install
npm run dev
```

## Build, Test, Run Commands

```bash
npm run dev          # 開発実行 (tsx src/index.tsx)
npm run build        # TypeScriptコンパイル
npm test             # テスト (vitest run)
npm run test:watch   # テスト watch mode
npm start            # ビルド済みを実行
```

## npm公開

```bash
npm login            # npmアカウントでログイン
npm publish          # 公開（prepublishOnlyでテスト自動実行）
```

ユーザーの利用方法:
```bash
npx terminal-quest              # インストール不要で即実行
npm install -g terminal-quest   # グローバルインストール
```

### 公開設定
- `files`: bin/, src/（テスト除外）, tsconfig.json のみ配布（約58KB）
- `engines`: Node.js >= 18
- `license`: MIT
- `prepublishOnly`: テスト自動実行

## Architecture

- **TypeScript ESM** + **Ink 5** (React for CLI) + **ink-text-input**
- `src/engine/` - コアエンジン（UI非依存）: VirtualFS, CommandHandler, MissionEngine, HintEngine, TabCompletion, Achievements
- `src/engine/commands/` - 23コマンド実装（pwd, ls, cd, cat, grep, cp, echo, mkdir, mv, rm, find, touch, head, tail, wc, sort, uniq, cut, chmod, git, help, hint, clear, man）
- `src/data/` - 型定義、ストーリーデータ（コース別）、コマンドメタデータ（CommandExample: { cmd, desc } 形式で説明付き例文）
- `src/data/stories/` - 各ストーリーファイル（コースプレフィックス: k=kids, 00=beginner, 番号=engineer）
- `bin/` - ランチャースクリプト（tsxでTypeScript直接実行）
- `src/screens/` - 7画面コンポーネント
- `src/components/` - 6再利用UIコンポーネント
- `src/state/` - ゲーム状態管理（ProgressStore: ~/.terminal-quest/progress.json）

## Key Design Decisions

- 全コマンドは仮想FS上で動作（実コマンド不使用、安全）
- 結果ベースの目標判定（ObjectiveCheck）で創造的な解法を許容
- 段階的ヒント（3レベル）で学習を支援
- ストーリー間の依存関係によるアンロックシステム
- パイプ（|）とリダイレクト（>, >>）対応。stdinは __stdin__: プレフィックスで渡す
- gitコマンドは .git/ ディレクトリ内のファイルで状態シミュレーション
- Tabオートコンプリートでコマンド名・パス補完（Ctrl+Hでヒント）
- 達成バッジシステムで学習モチベーション向上
- MissionBrief画面で新コマンドを具体例付きで紹介（各例に日本語の説明）
- ターミナル画面は通常のターミナル風レイアウト（上からコマンドと結果が流れる）
- コース制: stories にcourseフィールド（'kids' | 'beginner' | 'engineer'）でコース分類
- StorySelectScreenはコース別グループ表示（courseConfigで定義）
- bin/terminal-quest.js: tsxランチャーで、ビルド不要でTypeScriptを直接実行可能

## Courses & Stories

### ✨ 小学生向けコース (kids)
- k1: "宝探し冒険" - 冒険の世界でコマンドを学ぶ（pwd, ls, cd, cat）

### 💻 はじめてコース (beginner)
- 00: "はじめてのパソコン冒険" - 自分のパソコンを探検（pwd, ls, cd, cat）

### 🖥️ エンジニアコース (engineer)
1. "初めてのサーバー管理" (5M) - pwd, ls, cd, cat, grep, cp, echo ★常にアンロック
2. "散らかったプロジェクト" (4M) - mkdir, mv, rm, find, touch, wc ★Story 1完了で解放
3. "ログ探偵" (4M) - head, tail, wc, sort, uniq, grep応用 ★Story 1完了で解放
4. "デプロイの日" (4M) - chmod, cp -r, rm -rf, mkdir -p ★Story 2&3完了で解放
5. "Git大事件" (5M) - git status/log/diff/stash/branch/checkout/merge ★Story 2完了で解放
6. "パイプの達人" (4M) - パイプ(|), cut, 複合コマンド、6段パイプ演習 ★Story 3完了で解放
7. "危険なコマンド" (4M) - rm安全運用、バックアップ、rm -rf、find→削除ワークフロー ★Story 2&4完了で解放

## Status

全Phase完了（Phase 1-6 + 改善Phase） + コース制導入
- 23コマンド実装済み（パイプ・リダイレクト対応、sort -t/-k、man）
- 3コース（kids/beginner/engineer）、ストーリーデータ拡張中
- エンジニアコース: 7ストーリー（30ミッション）実装済み
- 小学生向け・はじめてコース: 各1ストーリー追加済み
- UI全画面実装済み（Title, StorySelect, MissionBrief, Terminal, MissionComplete, Progress, Settings）
- StorySelectScreenはコース別グループ表示に対応
- Tabオートコンプリート（コマンド名・ファイルパス補完）
- コマンド履歴（↑↓キー）、help、clear、objectives、man 対応
- 達成バッジシステム（7種類のバッジ）
- bin/terminal-quest.jsでビルド不要実行（tsx直接実行）
- npm公開準備完了（v1.0.0、MIT License、files制限済み）
- テスト 147件パス、TypeScriptエラー0
