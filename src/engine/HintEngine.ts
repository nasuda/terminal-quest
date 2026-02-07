import type { Hint } from '../data/types.js';

export class HintEngine {
  private currentHintLevel: Record<string, number>;
  private totalHintsUsed: number;

  constructor() {
    this.currentHintLevel = {};
    this.totalHintsUsed = 0;
  }

  getNextHint(objectiveId: string, hints: Hint[]): Hint | null {
    const currentLevel = this.currentHintLevel[objectiveId] ?? 0;
    const nextLevel = currentLevel + 1;

    const hint = hints.find((h) => h.level === nextLevel);
    if (!hint) {
      return null;
    }

    this.currentHintLevel[objectiveId] = nextLevel;
    this.totalHintsUsed++;
    return hint;
  }

  getCurrentLevel(objectiveId: string): number {
    return this.currentHintLevel[objectiveId] ?? 0;
  }

  getTotalHintsUsed(): number {
    return this.totalHintsUsed;
  }
}
