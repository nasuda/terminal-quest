export type ObjectiveCheck =
  | { type: 'command_executed'; command: string; args?: string[] }
  | { type: 'output_contains'; pattern: string }
  | { type: 'file_exists'; path: string }
  | { type: 'file_contains'; path: string; pattern: string }
  | { type: 'file_not_exists'; path: string }
  | { type: 'cwd_equals'; path: string };

export interface Hint {
  level: 1 | 2 | 3;
  text: string;
}

export interface Objective {
  id: string;
  description: string;
  checks: ObjectiveCheck[];
  hints: Hint[];
}

export interface FSNode {
  type: 'file' | 'directory';
  content?: string;
  children?: Record<string, FSNode>;
  permissions?: string;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  narrative: string;
  objectives: Objective[];
  initialFS: FSNode;
  initialCwd: string;
}

export interface Story {
  id: string;
  title: string;
  description: string;
  emoji: string;
  missions: Mission[];
  unlockRequires: string[];
}

export interface StoryProgress {
  storyId: string;
  completedMissions: string[];
  currentMissionIndex: number;
  hintsUsed: Record<string, number>;
}

export interface GameProgress {
  completedStories: string[];
  storyProgress: Record<string, StoryProgress>;
  totalCommandsExecuted: number;
  totalHintsUsed: number;
}

export type Screen =
  | { type: 'title' }
  | { type: 'storySelect' }
  | { type: 'missionBrief'; storyId: string; missionIndex: number }
  | { type: 'terminal'; storyId: string; missionIndex: number }
  | { type: 'missionComplete'; storyId: string; missionIndex: number }
  | { type: 'progress' }
  | { type: 'settings' };
