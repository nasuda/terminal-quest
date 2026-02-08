import type { Achievement, GameProgress } from '../data/types.js';

export const achievements: Achievement[] = [
  {
    id: 'first-command',
    title: '第一歩',
    description: '最初のコマンドを実行した',
    emoji: '👣',
  },
  {
    id: 'no-hint-clear',
    title: 'ヒントなしクリア',
    description: 'ヒントを使わずにミッションをクリアした',
    emoji: '🧠',
  },
  {
    id: 'story-complete',
    title: 'ストーリーマスター',
    description: 'ストーリーを1つクリアした',
    emoji: '📖',
  },
  {
    id: 'all-engineer',
    title: 'エンジニアコース制覇',
    description: 'エンジニアコースの全ストーリーをクリアした',
    emoji: '🎓',
  },
  {
    id: 'commands-100',
    title: 'コマンド100回',
    description: 'コマンドを100回実行した',
    emoji: '💯',
  },
  {
    id: 'commands-500',
    title: 'ベテラン',
    description: 'コマンドを500回実行した',
    emoji: '⭐',
  },
  {
    id: 'pipe-master',
    title: 'パイプの達人',
    description: 'Story 6「パイプの達人」をクリアした',
    emoji: '🔗',
  },
];

export function checkAchievements(
  progress: GameProgress,
  engineerStoryIds: string[]
): string[] {
  const newAchievements: string[] = [];
  const existing = progress.achievements ?? [];

  // first-command: executed at least 1 command
  if (!existing.includes('first-command') && progress.totalCommandsExecuted >= 1) {
    newAchievements.push('first-command');
  }

  // no-hint-clear: any mission completed with 0 hints
  if (!existing.includes('no-hint-clear')) {
    for (const sp of Object.values(progress.storyProgress)) {
      for (const missionId of sp.completedMissions) {
        if ((sp.hintsUsed[missionId] ?? 0) === 0) {
          newAchievements.push('no-hint-clear');
          break;
        }
      }
      if (newAchievements.includes('no-hint-clear')) break;
    }
  }

  // story-complete: at least 1 story completed
  if (!existing.includes('story-complete') && progress.completedStories.length >= 1) {
    newAchievements.push('story-complete');
  }

  // all-engineer: all engineer course stories completed
  if (!existing.includes('all-engineer') && engineerStoryIds.length > 0) {
    const allDone = engineerStoryIds.every(id => progress.completedStories.includes(id));
    if (allDone) {
      newAchievements.push('all-engineer');
    }
  }

  // commands-100
  if (!existing.includes('commands-100') && progress.totalCommandsExecuted >= 100) {
    newAchievements.push('commands-100');
  }

  // commands-500
  if (!existing.includes('commands-500') && progress.totalCommandsExecuted >= 500) {
    newAchievements.push('commands-500');
  }

  // pipe-master: story-06 completed
  if (!existing.includes('pipe-master') && progress.completedStories.includes('story-06')) {
    newAchievements.push('pipe-master');
  }

  return newAchievements;
}

export function getAchievement(id: string): Achievement | undefined {
  return achievements.find(a => a.id === id);
}
