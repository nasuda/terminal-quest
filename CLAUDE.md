# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Terminal Quest - ストーリー駆動型ターミナルコマンド学習CLI。Ink (React for CLI) を使ったインタラクティブなターミナルアプリ。9つのストーリー（計50ミッション）でターミナルコマンドを学ぶ。

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

## Architecture

- **TypeScript ESM** + **Ink 5** (React for CLI) + **ink-text-input**
- `src/engine/` - コアエンジン（UI非依存）: VirtualFS, CommandHandler, MissionEngine, HintEngine, TabCompletion, Achievements
- `src/engine/commands/` - 23コマンド実装（pwd, ls, cd, cat, grep, cp, echo, mkdir, mv, rm, find, touch, head, tail, wc, sort, uniq, cut, chmod, git, help, hint, clear, man）
- `src/data/` - 型定義、9ストーリーデータ、コマンドメタデータ（CommandExample: { cmd, desc } 形式で説明付き例文）
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

## Stories

1. "初めてのサーバー管理" (5M) - pwd, ls, cd, cat, grep, cp, echo ★常にアンロック
2. "散らかったプロジェクト" (4M) - mkdir, mv, rm, find, touch, wc ★Story 1完了で解放
3. "ログ探偵" (4M) - head, tail, wc, sort, uniq, grep応用 ★Story 1完了で解放
4. "デプロイの日" (4M) - chmod, cp -r, rm -rf, mkdir -p ★Story 2&3完了で解放
5. "Git大事件" (5M) - git status/log/diff/stash/branch/checkout/merge ★Story 2完了で解放
6. "パイプの達人" (4M) - パイプ(|), cut, 複合コマンド、6段パイプ演習 ★Story 3完了で解放
7. "危険なコマンド" (4M) - rm安全運用、バックアップ、rm -rf、find→削除ワークフロー ★Story 2&4完了で解放

## Status

全Phase完了（Phase 1-6 + 改善Phase）
- 23コマンド実装済み（パイプ・リダイレクト対応、sort -t/-k、man）
- 9ストーリー（50ミッション）実装済み
- UI全画面実装済み（Title, StorySelect, MissionBrief, Terminal, MissionComplete, Progress, Settings）
- Tabオートコンプリート（コマンド名・ファイルパス補完）
- コマンド履歴（↑↓キー）、help、clear、objectives、man 対応
- 達成バッジシステム（7種類のバッジ）
- テスト 147件パス、TypeScriptエラー0
