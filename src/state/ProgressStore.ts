import { readFileSync, writeFileSync, mkdirSync, existsSync, copyFileSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';
import type { GameProgress } from '../data/types.js';
import { initialProgress } from './GameState.js';

const SAVE_DIR = join(homedir(), '.terminal-quest');
const SAVE_FILE = join(SAVE_DIR, 'progress.json');

let saveWarningShown = false;

function migrateProgress(parsed: Record<string, unknown>): GameProgress {
  return {
    completedStories: Array.isArray(parsed.completedStories) ? parsed.completedStories as string[] : [],
    storyProgress: (parsed.storyProgress && typeof parsed.storyProgress === 'object') ? parsed.storyProgress as GameProgress['storyProgress'] : {},
    totalCommandsExecuted: typeof parsed.totalCommandsExecuted === 'number' ? parsed.totalCommandsExecuted : 0,
    totalHintsUsed: typeof parsed.totalHintsUsed === 'number' ? parsed.totalHintsUsed : 0,
    achievements: Array.isArray(parsed.achievements) ? parsed.achievements as string[] : [],
  };
}

export function loadProgress(): GameProgress {
  try {
    if (!existsSync(SAVE_FILE)) return { ...initialProgress };
    const data = readFileSync(SAVE_FILE, 'utf-8');
    const parsed = JSON.parse(data);
    if (!parsed || typeof parsed !== 'object') {
      throw new Error('Invalid progress file format');
    }
    return migrateProgress(parsed as Record<string, unknown>);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    process.stderr.write(
      `[terminal-quest] 進捗ファイルの読み込みに失敗しました: ${msg}\n` +
      `新しい進捗データで開始します。\n`
    );
    try {
      if (existsSync(SAVE_FILE)) {
        const backupPath = SAVE_FILE + '.backup.' + Date.now();
        copyFileSync(SAVE_FILE, backupPath);
        process.stderr.write(`[terminal-quest] バックアップを保存しました: ${backupPath}\n`);
      }
    } catch { /* backup is best-effort */ }
    return { ...initialProgress };
  }
}

export function saveProgress(progress: GameProgress): void {
  try {
    if (!existsSync(SAVE_DIR)) {
      mkdirSync(SAVE_DIR, { recursive: true });
    }
    writeFileSync(SAVE_FILE, JSON.stringify(progress, null, 2), 'utf-8');
    saveWarningShown = false;
  } catch (e) {
    if (!saveWarningShown) {
      const msg = e instanceof Error ? e.message : String(e);
      process.stderr.write(
        `[terminal-quest] 進捗の保存に失敗しました: ${msg}\n` +
        `進捗データが保持されない可能性があります。\n`
      );
      saveWarningShown = true;
    }
  }
}

export function resetProgress(): void {
  saveProgress(initialProgress);
}

export function isStoryUnlocked(progress: GameProgress, storyId: string, allStories: Array<{ id: string; unlockRequires: string[] }>): boolean {
  const story = allStories.find(s => s.id === storyId);
  if (!story) return false;
  if (story.unlockRequires.length === 0) return true;
  return story.unlockRequires.every(reqId => progress.completedStories.includes(reqId));
}
