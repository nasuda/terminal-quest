import type { GameProgress, Screen } from '../data/types.js';

export interface GameState {
  screen: Screen;
  progress: GameProgress;
}

export const initialProgress: GameProgress = {
  completedStories: [],
  storyProgress: {},
  totalCommandsExecuted: 0,
  totalHintsUsed: 0,
};

export const initialGameState: GameState = {
  screen: { type: 'title' },
  progress: initialProgress,
};
