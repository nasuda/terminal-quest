import { useState, useCallback, useEffect } from 'react';
import type { GameProgress, Screen, StoryProgress } from '../data/types.js';
import { initialGameState } from './GameState.js';
import { loadProgress, saveProgress } from './ProgressStore.js';
import { checkAchievements } from '../engine/Achievements.js';
import { stories } from '../data/stories/index.js';

export function useGameState() {
  const [screen, setScreen] = useState<Screen>(initialGameState.screen);
  const [progress, setProgress] = useState<GameProgress>(() => loadProgress());

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const navigateTo = useCallback((newScreen: Screen) => {
    setScreen(newScreen);
  }, []);

  const completeMission = useCallback((storyId: string, missionId: string, hintsUsed: number, commandCount?: number) => {
    setProgress(prev => {
      const storyProg: StoryProgress = prev.storyProgress[storyId] ?? {
        storyId,
        completedMissions: [],
        currentMissionIndex: 0,
        hintsUsed: {},
      };

      if (storyProg.completedMissions.includes(missionId)) return prev;

      const newCompletedMissions = [...storyProg.completedMissions, missionId];
      const newStoryProg: StoryProgress = {
        ...storyProg,
        completedMissions: newCompletedMissions,
        currentMissionIndex: storyProg.currentMissionIndex + 1,
        hintsUsed: {
          ...storyProg.hintsUsed,
          [missionId]: hintsUsed,
        },
        commandsPerMission: {
          ...storyProg.commandsPerMission,
          ...(commandCount != null ? { [missionId]: commandCount } : {}),
        },
      };

      return {
        ...prev,
        storyProgress: {
          ...prev.storyProgress,
          [storyId]: newStoryProg,
        },
        totalHintsUsed: prev.totalHintsUsed + hintsUsed,
      };
    });
  }, []);

  const completeStory = useCallback((storyId: string) => {
    setProgress(prev => {
      if (prev.completedStories.includes(storyId)) return prev;
      return {
        ...prev,
        completedStories: [...prev.completedStories, storyId],
      };
    });
  }, []);

  const incrementCommands = useCallback(() => {
    setProgress(prev => ({
      ...prev,
      totalCommandsExecuted: prev.totalCommandsExecuted + 1,
    }));
  }, []);

  useEffect(() => {
    const engineerStoryIds = stories
      .filter(s => s.course === 'engineer')
      .map(s => s.id);
    const newAchievements = checkAchievements(progress, engineerStoryIds);
    if (newAchievements.length > 0) {
      setProgress(prev => {
        const currentAchievements = prev.achievements ?? [];
        const toAdd = newAchievements.filter(a => !currentAchievements.includes(a));
        if (toAdd.length === 0) return prev;
        return {
          ...prev,
          achievements: [...currentAchievements, ...toAdd],
        };
      });
    }
  }, [progress]);

  const resetAll = useCallback(() => {
    setProgress(initialGameState.progress);
  }, []);

  return {
    screen,
    progress,
    navigateTo,
    completeMission,
    completeStory,
    incrementCommands,
    resetAll,
  };
}
