import { describe, it, expect } from 'vitest';
import { stories } from './index.js';
import { commandRegistry } from '../../engine/commands/index.js';
import type { FSNode } from '../types.js';

/**
 * Check if a path exists in the FSNode tree.
 * The root FSNode represents '/', and its children are top-level entries.
 * e.g. '/home/admin' traverses root -> children.home -> children.admin
 */
function pathExistsInFS(root: FSNode, path: string): boolean {
  if (path === '/') return root.type === 'directory';

  const parts = path.split('/').filter((p) => p !== '');
  let current = root;

  for (const part of parts) {
    if (current.type !== 'directory' || !current.children || !(part in current.children)) {
      return false;
    }
    current = current.children[part];
  }

  return true;
}

describe('Story Data Integrity', () => {
  describe('Unique IDs', () => {
    it('all story IDs are unique', () => {
      const ids = stories.map((s) => s.id);
      const duplicates = ids.filter((id, i) => ids.indexOf(id) !== i);
      expect(duplicates, `Duplicate story IDs found: ${duplicates.join(', ')}`).toHaveLength(0);
    });

    it('all mission IDs are unique across all stories', () => {
      const ids: string[] = [];
      for (const story of stories) {
        for (const mission of story.missions) {
          ids.push(mission.id);
        }
      }
      const duplicates = ids.filter((id, i) => ids.indexOf(id) !== i);
      expect(duplicates, `Duplicate mission IDs found: ${duplicates.join(', ')}`).toHaveLength(0);
    });

    it('all objective IDs are unique across all stories', () => {
      const ids: string[] = [];
      for (const story of stories) {
        for (const mission of story.missions) {
          for (const objective of mission.objectives) {
            ids.push(objective.id);
          }
        }
      }
      const duplicates = ids.filter((id, i) => ids.indexOf(id) !== i);
      expect(duplicates, `Duplicate objective IDs found: ${duplicates.join(', ')}`).toHaveLength(0);
    });
  });

  describe('newCommands validation', () => {
    it('every command in newCommands exists in commandRegistry', () => {
      const registeredCommands = Object.keys(commandRegistry);
      const invalid: string[] = [];

      for (const story of stories) {
        for (const mission of story.missions) {
          if (mission.newCommands) {
            for (const cmd of mission.newCommands) {
              if (!registeredCommands.includes(cmd)) {
                invalid.push(`${story.id}/${mission.id}: "${cmd}"`);
              }
            }
          }
        }
      }

      expect(invalid, `Unknown commands in newCommands: ${invalid.join(', ')}`).toHaveLength(0);
    });
  });

  describe('unlockRequires validation', () => {
    it('every story ID in unlockRequires references an existing story', () => {
      const allStoryIds = stories.map((s) => s.id);
      const invalid: string[] = [];

      for (const story of stories) {
        for (const requiredId of story.unlockRequires) {
          if (!allStoryIds.includes(requiredId)) {
            invalid.push(`${story.id} requires unknown story "${requiredId}"`);
          }
        }
      }

      expect(invalid, `Invalid unlockRequires references: ${invalid.join(', ')}`).toHaveLength(0);
    });
  });

  describe('initialCwd validation', () => {
    it('every mission initialCwd path exists in its initialFS', () => {
      const invalid: string[] = [];

      for (const story of stories) {
        for (const mission of story.missions) {
          if (!pathExistsInFS(mission.initialFS, mission.initialCwd)) {
            invalid.push(`${story.id}/${mission.id}: initialCwd "${mission.initialCwd}" not found in initialFS`);
          }
        }
      }

      expect(invalid, `Invalid initialCwd paths: ${invalid.join('; ')}`).toHaveLength(0);
    });
  });

  describe('Objectives have checks', () => {
    it('every objective has at least 1 check', () => {
      const invalid: string[] = [];

      for (const story of stories) {
        for (const mission of story.missions) {
          for (const objective of mission.objectives) {
            if (!objective.checks || objective.checks.length === 0) {
              invalid.push(`${story.id}/${mission.id}/${objective.id}: no checks`);
            }
          }
        }
      }

      expect(invalid, `Objectives with no checks: ${invalid.join(', ')}`).toHaveLength(0);
    });
  });

  describe('Hints completeness', () => {
    it('every objective has hints at level 1, 2, and 3', () => {
      const invalid: string[] = [];

      for (const story of stories) {
        for (const mission of story.missions) {
          for (const objective of mission.objectives) {
            const hintLevels = new Set(objective.hints.map((h) => h.level));
            const missing: number[] = [];
            for (const level of [1, 2, 3] as const) {
              if (!hintLevels.has(level)) {
                missing.push(level);
              }
            }
            if (missing.length > 0) {
              invalid.push(`${story.id}/${mission.id}/${objective.id}: missing hint levels ${missing.join(', ')}`);
            }
          }
        }
      }

      expect(invalid, `Objectives with incomplete hints: ${invalid.join('; ')}`).toHaveLength(0);
    });
  });

  describe('Review question validation', () => {
    it('every review correctIndex is within choices bounds', () => {
      const invalid: string[] = [];

      for (const story of stories) {
        for (const mission of story.missions) {
          if (mission.review) {
            if (mission.review.correctIndex < 0 || mission.review.correctIndex >= mission.review.choices.length) {
              invalid.push(`${story.id}/${mission.id}: correctIndex ${mission.review.correctIndex} out of bounds (choices: ${mission.review.choices.length})`);
            }
          }
        }
      }

      expect(invalid, `Invalid review correctIndex: ${invalid.join(', ')}`).toHaveLength(0);
    });
  });

  describe('Course field validation', () => {
    it('every story has a valid course field', () => {
      const validCourses = ['kids', 'beginner', 'engineer'];
      const invalid: string[] = [];

      for (const story of stories) {
        if (!story.course || !validCourses.includes(story.course)) {
          invalid.push(`${story.id}: course is "${story.course ?? 'undefined'}"`);
        }
      }

      expect(invalid, `Stories with invalid course: ${invalid.join(', ')}`).toHaveLength(0);
    });
  });
});
