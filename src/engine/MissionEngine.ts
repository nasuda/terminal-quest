import type { Mission, Objective, ObjectiveCheck } from '../data/types.js';
import { VirtualFS } from './VirtualFS.js';

export class MissionEngine {
  private fs: VirtualFS;
  private mission: Mission;
  private completedObjectives: Set<string>;
  private commandHistory: Array<{ command: string; args: string[]; output: string }>;

  constructor(mission: Mission) {
    this.mission = mission;
    this.fs = new VirtualFS(mission.initialFS, mission.initialCwd);
    this.completedObjectives = new Set();
    this.commandHistory = [];
  }

  getFS(): VirtualFS {
    return this.fs;
  }

  getMission(): Mission {
    return this.mission;
  }

  getCompletedObjectives(): string[] {
    return [...this.completedObjectives];
  }

  getCurrentObjectiveIndex(): number {
    for (let i = 0; i < this.mission.objectives.length; i++) {
      if (!this.completedObjectives.has(this.mission.objectives[i].id)) {
        return i;
      }
    }
    return this.mission.objectives.length;
  }

  isAllComplete(): boolean {
    return this.mission.objectives.every((obj) => this.completedObjectives.has(obj.id));
  }

  checkObjectives(command: string, args: string[], output: string): string[] {
    this.commandHistory.push({ command, args, output });

    const newlyCompleted: string[] = [];

    for (const objective of this.mission.objectives) {
      if (this.completedObjectives.has(objective.id)) {
        continue;
      }

      const allChecksPassed = objective.checks.every((check) =>
        this.evaluateCheck(check, command, args, output),
      );

      if (allChecksPassed) {
        this.completedObjectives.add(objective.id);
        newlyCompleted.push(objective.id);
      }
    }

    return newlyCompleted;
  }

  private evaluateCheck(
    check: ObjectiveCheck,
    command: string,
    args: string[],
    output: string,
  ): boolean {
    switch (check.type) {
      case 'command_executed': {
        if (check.command !== command) return false;
        if (check.args) {
          return check.args.every((expected, i) => args[i] === expected);
        }
        return true;
      }

      case 'output_contains': {
        return output.includes(check.pattern);
      }

      case 'file_exists': {
        return this.fs.exists(check.path);
      }

      case 'file_contains': {
        try {
          const content = this.fs.readFile(check.path);
          return content.includes(check.pattern);
        } catch {
          return false;
        }
      }

      case 'file_not_exists': {
        return !this.fs.exists(check.path);
      }

      case 'cwd_equals': {
        return this.fs.getCwd() === check.path;
      }

      default:
        return false;
    }
  }
}
