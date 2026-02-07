import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';
import type { GameProgress } from '../data/types.js';
import { initialProgress } from './GameState.js';

const SAVE_DIR = join(homedir(), '.terminal-quest');
const SAVE_FILE = join(SAVE_DIR, 'progress.json');

export function loadProgress(): GameProgress {
  try {
    if (!existsSync(SAVE_FILE)) return { ...initialProgress };
    const data = readFileSync(SAVE_FILE, 'utf-8');
    return JSON.parse(data) as GameProgress;
  } catch {
    return { ...initialProgress };
  }
}

export function saveProgress(progress: GameProgress): void {
  try {
    if (!existsSync(SAVE_DIR)) {
      mkdirSync(SAVE_DIR, { recursive: true });
    }
    writeFileSync(SAVE_FILE, JSON.stringify(progress, null, 2), 'utf-8');
  } catch {
    // 保存失敗は無視（ゲーム継続可能）
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
