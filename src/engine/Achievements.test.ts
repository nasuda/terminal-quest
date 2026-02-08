import { describe, it, expect } from 'vitest';
import { checkAchievements, getAchievement, achievements } from './Achievements.js';
import type { GameProgress } from '../data/types.js';

function makeProgress(overrides: Partial<GameProgress> = {}): GameProgress {
  return {
    completedStories: [],
    storyProgress: {},
    totalCommandsExecuted: 0,
    totalHintsUsed: 0,
    achievements: [],
    ...overrides,
  };
}

const engineerStoryIds = ['story-01', 'story-02', 'story-03', 'story-04', 'story-05', 'story-06'];

describe('checkAchievements', () => {
  it('returns empty for fresh progress', () => {
    const progress = makeProgress();
    expect(checkAchievements(progress, engineerStoryIds)).toEqual([]);
  });

  it('grants first-command after 1 command executed', () => {
    const progress = makeProgress({ totalCommandsExecuted: 1 });
    const result = checkAchievements(progress, engineerStoryIds);
    expect(result).toContain('first-command');
  });

  it('does not grant first-command if already earned', () => {
    const progress = makeProgress({
      totalCommandsExecuted: 5,
      achievements: ['first-command'],
    });
    const result = checkAchievements(progress, engineerStoryIds);
    expect(result).not.toContain('first-command');
  });

  it('grants no-hint-clear when a mission is completed with 0 hints', () => {
    const progress = makeProgress({
      storyProgress: {
        'story-01': {
          storyId: 'story-01',
          completedMissions: ['mission-01'],
          currentMissionIndex: 1,
          hintsUsed: { 'mission-01': 0 },
        },
      },
    });
    const result = checkAchievements(progress, engineerStoryIds);
    expect(result).toContain('no-hint-clear');
  });

  it('does not grant no-hint-clear when all missions used hints', () => {
    const progress = makeProgress({
      storyProgress: {
        'story-01': {
          storyId: 'story-01',
          completedMissions: ['mission-01'],
          currentMissionIndex: 1,
          hintsUsed: { 'mission-01': 2 },
        },
      },
    });
    const result = checkAchievements(progress, engineerStoryIds);
    expect(result).not.toContain('no-hint-clear');
  });

  it('grants story-complete when 1 story is completed', () => {
    const progress = makeProgress({ completedStories: ['story-01'] });
    const result = checkAchievements(progress, engineerStoryIds);
    expect(result).toContain('story-complete');
  });

  it('grants all-engineer when all engineer stories are completed', () => {
    const progress = makeProgress({ completedStories: [...engineerStoryIds] });
    const result = checkAchievements(progress, engineerStoryIds);
    expect(result).toContain('all-engineer');
  });

  it('does not grant all-engineer when only some stories are completed', () => {
    const progress = makeProgress({ completedStories: ['story-01', 'story-02'] });
    const result = checkAchievements(progress, engineerStoryIds);
    expect(result).not.toContain('all-engineer');
  });

  it('grants commands-100 at 100 commands', () => {
    const progress = makeProgress({ totalCommandsExecuted: 100 });
    const result = checkAchievements(progress, engineerStoryIds);
    expect(result).toContain('commands-100');
  });

  it('grants commands-500 at 500 commands', () => {
    const progress = makeProgress({ totalCommandsExecuted: 500 });
    const result = checkAchievements(progress, engineerStoryIds);
    expect(result).toContain('commands-500');
  });

  it('grants both commands-100 and commands-500 at 500 commands', () => {
    const progress = makeProgress({ totalCommandsExecuted: 500 });
    const result = checkAchievements(progress, engineerStoryIds);
    expect(result).toContain('commands-100');
    expect(result).toContain('commands-500');
  });

  it('grants pipe-master when story-06 is completed', () => {
    const progress = makeProgress({ completedStories: ['story-06'] });
    const result = checkAchievements(progress, engineerStoryIds);
    expect(result).toContain('pipe-master');
  });

  it('does not grant pipe-master when story-06 is not completed', () => {
    const progress = makeProgress({ completedStories: ['story-01'] });
    const result = checkAchievements(progress, engineerStoryIds);
    expect(result).not.toContain('pipe-master');
  });

  it('grants multiple achievements at once', () => {
    const progress = makeProgress({
      totalCommandsExecuted: 150,
      completedStories: ['story-01'],
      storyProgress: {
        'story-01': {
          storyId: 'story-01',
          completedMissions: ['m1'],
          currentMissionIndex: 1,
          hintsUsed: { m1: 0 },
        },
      },
    });
    const result = checkAchievements(progress, engineerStoryIds);
    expect(result).toContain('first-command');
    expect(result).toContain('no-hint-clear');
    expect(result).toContain('story-complete');
    expect(result).toContain('commands-100');
  });

  it('skips already earned achievements', () => {
    const progress = makeProgress({
      totalCommandsExecuted: 150,
      completedStories: ['story-01'],
      achievements: ['first-command', 'story-complete', 'commands-100'],
      storyProgress: {
        'story-01': {
          storyId: 'story-01',
          completedMissions: ['m1'],
          currentMissionIndex: 1,
          hintsUsed: { m1: 0 },
        },
      },
    });
    const result = checkAchievements(progress, engineerStoryIds);
    expect(result).not.toContain('first-command');
    expect(result).not.toContain('story-complete');
    expect(result).not.toContain('commands-100');
    expect(result).toContain('no-hint-clear');
  });
});

describe('getAchievement', () => {
  it('returns achievement by id', () => {
    const a = getAchievement('first-command');
    expect(a).toBeDefined();
    expect(a!.title).toBe('第一歩');
  });

  it('returns undefined for unknown id', () => {
    expect(getAchievement('nonexistent')).toBeUndefined();
  });
});

describe('achievements list', () => {
  it('has 7 achievements defined', () => {
    expect(achievements).toHaveLength(7);
  });

  it('all achievements have unique ids', () => {
    const ids = achievements.map(a => a.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
