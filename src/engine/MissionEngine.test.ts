import { describe, it, expect, beforeEach } from 'vitest';
import { MissionEngine } from './MissionEngine.js';
import { HintEngine } from './HintEngine.js';
import type { Mission, FSNode } from '../data/types.js';

const testFS: FSNode = {
  type: 'directory',
  children: {
    home: {
      type: 'directory',
      children: {
        user: {
          type: 'directory',
          children: {
            'hello.txt': {
              type: 'file',
              content: 'Hello, World!',
            },
          },
        },
      },
    },
    etc: {
      type: 'directory',
      children: {
        'config.json': {
          type: 'file',
          content: '{"debug": false}',
        },
      },
    },
    tmp: {
      type: 'directory',
      children: {},
    },
  },
};

function createTestMission(overrides: Partial<Mission> = {}): Mission {
  return {
    id: 'test-mission',
    title: 'Test Mission',
    description: 'A test mission',
    narrative: 'Testing narrative',
    initialCwd: '/home/user',
    initialFS: testFS,
    objectives: [
      {
        id: 'obj-1',
        description: 'Run pwd',
        checks: [{ type: 'command_executed', command: 'pwd' }],
        hints: [
          { level: 1, text: 'Hint level 1' },
          { level: 2, text: 'Hint level 2' },
          { level: 3, text: 'Hint level 3' },
        ],
      },
      {
        id: 'obj-2',
        description: 'List files',
        checks: [{ type: 'command_executed', command: 'ls' }],
        hints: [
          { level: 1, text: 'ls hint 1' },
          { level: 2, text: 'ls hint 2' },
          { level: 3, text: 'ls hint 3' },
        ],
      },
    ],
    ...overrides,
  };
}

describe('MissionEngine', () => {
  let engine: MissionEngine;

  beforeEach(() => {
    engine = new MissionEngine(createTestMission());
  });

  describe('initialization', () => {
    it('should initialize with the mission data', () => {
      expect(engine.getMission().id).toBe('test-mission');
    });

    it('should set initial cwd from mission', () => {
      expect(engine.getFS().getCwd()).toBe('/home/user');
    });

    it('should start with no completed objectives', () => {
      expect(engine.getCompletedObjectives()).toEqual([]);
    });

    it('should report current objective index as 0', () => {
      expect(engine.getCurrentObjectiveIndex()).toBe(0);
    });

    it('should not be complete initially', () => {
      expect(engine.isAllComplete()).toBe(false);
    });
  });

  describe('checkObjectives - command_executed', () => {
    it('should complete objective when correct command is executed', () => {
      const completed = engine.checkObjectives('pwd', [], '/home/user');
      expect(completed).toEqual(['obj-1']);
    });

    it('should not complete objective with wrong command', () => {
      const completed = engine.checkObjectives('ls', [], 'hello.txt');
      // obj-1 requires pwd, obj-2 requires ls
      expect(completed).toEqual(['obj-2']);
    });

    it('should check args when specified', () => {
      const mission = createTestMission({
        objectives: [
          {
            id: 'obj-args',
            description: 'Run cat with args',
            checks: [{ type: 'command_executed', command: 'cat', args: ['hello.txt'] }],
            hints: [],
          },
        ],
      });
      const eng = new MissionEngine(mission);

      const noArgs = eng.checkObjectives('cat', [], '');
      expect(noArgs).toEqual([]);

      const wrongArgs = eng.checkObjectives('cat', ['other.txt'], '');
      expect(wrongArgs).toEqual([]);

      const correctArgs = eng.checkObjectives('cat', ['hello.txt'], 'Hello, World!');
      expect(correctArgs).toEqual(['obj-args']);
    });
  });

  describe('checkObjectives - output_contains', () => {
    it('should match when output contains pattern', () => {
      const mission = createTestMission({
        objectives: [
          {
            id: 'obj-output',
            description: 'See ERROR in output',
            checks: [{ type: 'output_contains', pattern: 'ERROR' }],
            hints: [],
          },
        ],
      });
      const eng = new MissionEngine(mission);

      const noMatch = eng.checkObjectives('cat', [], 'All is fine');
      expect(noMatch).toEqual([]);

      const matched = eng.checkObjectives('cat', [], '[ERROR] Something failed');
      expect(matched).toEqual(['obj-output']);
    });
  });

  describe('checkObjectives - file_exists', () => {
    it('should check if file exists in VirtualFS', () => {
      const mission = createTestMission({
        objectives: [
          {
            id: 'obj-file',
            description: 'Create backup file',
            checks: [{ type: 'file_exists', path: '/home/user/backup.txt' }],
            hints: [],
          },
        ],
      });
      const eng = new MissionEngine(mission);

      // File does not exist yet
      const before = eng.checkObjectives('echo', [], '');
      expect(before).toEqual([]);

      // Create the file
      eng.getFS().writeFile('/home/user/backup.txt', 'backup content');

      // Now it should pass
      const after = eng.checkObjectives('cp', [], '');
      expect(after).toEqual(['obj-file']);
    });
  });

  describe('checkObjectives - file_contains', () => {
    it('should check file content for pattern', () => {
      const mission = createTestMission({
        objectives: [
          {
            id: 'obj-content',
            description: 'File contains true',
            checks: [{ type: 'file_contains', path: '/etc/config.json', pattern: 'true' }],
            hints: [],
          },
        ],
      });
      const eng = new MissionEngine(mission);

      // Initially file contains "false"
      const before = eng.checkObjectives('echo', [], '');
      expect(before).toEqual([]);

      // Modify the file
      eng.getFS().writeFile('/etc/config.json', '{"debug": true}');

      const after = eng.checkObjectives('echo', [], '');
      expect(after).toEqual(['obj-content']);
    });

    it('should return false for non-existent file', () => {
      const mission = createTestMission({
        objectives: [
          {
            id: 'obj-nofile',
            description: 'File check on missing file',
            checks: [{ type: 'file_contains', path: '/nonexistent', pattern: 'data' }],
            hints: [],
          },
        ],
      });
      const eng = new MissionEngine(mission);
      const result = eng.checkObjectives('echo', [], '');
      expect(result).toEqual([]);
    });
  });

  describe('checkObjectives - file_not_exists', () => {
    it('should pass when file does not exist', () => {
      const mission = createTestMission({
        objectives: [
          {
            id: 'obj-notexist',
            description: 'File removed',
            checks: [{ type: 'file_not_exists', path: '/tmp/deleted.txt' }],
            hints: [],
          },
        ],
      });
      const eng = new MissionEngine(mission);
      const result = eng.checkObjectives('rm', [], '');
      expect(result).toEqual(['obj-notexist']);
    });

    it('should fail when file still exists', () => {
      const mission = createTestMission({
        objectives: [
          {
            id: 'obj-stillexists',
            description: 'File should not exist',
            checks: [{ type: 'file_not_exists', path: '/home/user/hello.txt' }],
            hints: [],
          },
        ],
      });
      const eng = new MissionEngine(mission);
      const result = eng.checkObjectives('ls', [], '');
      expect(result).toEqual([]);
    });
  });

  describe('checkObjectives - cwd_equals', () => {
    it('should check current working directory', () => {
      const mission = createTestMission({
        objectives: [
          {
            id: 'obj-cwd',
            description: 'Navigate to /etc',
            checks: [{ type: 'cwd_equals', path: '/etc' }],
            hints: [],
          },
        ],
      });
      const eng = new MissionEngine(mission);

      // cwd is /home/user
      const before = eng.checkObjectives('cd', ['/etc'], '');
      expect(before).toEqual([]);

      // Actually change cwd
      eng.getFS().changeCwd('/etc');
      const after = eng.checkObjectives('cd', [], '');
      expect(after).toEqual(['obj-cwd']);
    });
  });

  describe('multiple checks per objective', () => {
    it('should require all checks to pass', () => {
      const mission = createTestMission({
        objectives: [
          {
            id: 'obj-multi',
            description: 'Cat the log and see ERROR',
            checks: [
              { type: 'command_executed', command: 'cat' },
              { type: 'output_contains', pattern: 'ERROR' },
            ],
            hints: [],
          },
        ],
      });
      const eng = new MissionEngine(mission);

      // Only command matches, output does not
      const partialCmd = eng.checkObjectives('cat', ['file.txt'], 'all ok');
      expect(partialCmd).toEqual([]);

      // Only output matches, command does not
      const partialOutput = eng.checkObjectives('grep', ['ERROR'], 'ERROR found');
      expect(partialOutput).toEqual([]);

      // Both match
      const both = eng.checkObjectives('cat', ['file.txt'], 'ERROR occurred');
      expect(both).toEqual(['obj-multi']);
    });
  });

  describe('mission completion', () => {
    it('should track completed objectives', () => {
      engine.checkObjectives('pwd', [], '/home/user');
      expect(engine.getCompletedObjectives()).toEqual(['obj-1']);
      expect(engine.getCurrentObjectiveIndex()).toBe(1);
      expect(engine.isAllComplete()).toBe(false);
    });

    it('should detect full completion', () => {
      engine.checkObjectives('pwd', [], '/home/user');
      engine.checkObjectives('ls', [], 'hello.txt');
      expect(engine.getCompletedObjectives()).toEqual(['obj-1', 'obj-2']);
      expect(engine.getCurrentObjectiveIndex()).toBe(2);
      expect(engine.isAllComplete()).toBe(true);
    });

    it('should not re-complete already completed objectives', () => {
      const first = engine.checkObjectives('pwd', [], '/home/user');
      expect(first).toEqual(['obj-1']);

      const second = engine.checkObjectives('pwd', [], '/home/user');
      expect(second).toEqual([]);
    });
  });
});

describe('HintEngine', () => {
  let hintEngine: HintEngine;

  const testHints = [
    { level: 1 as const, text: 'First hint' },
    { level: 2 as const, text: 'Second hint' },
    { level: 3 as const, text: 'Third hint - the answer' },
  ];

  beforeEach(() => {
    hintEngine = new HintEngine();
  });

  describe('getNextHint', () => {
    it('should return level 1 hint first', () => {
      const hint = hintEngine.getNextHint('obj-1', testHints);
      expect(hint).toEqual({ level: 1, text: 'First hint' });
    });

    it('should return level 2 hint second', () => {
      hintEngine.getNextHint('obj-1', testHints);
      const hint = hintEngine.getNextHint('obj-1', testHints);
      expect(hint).toEqual({ level: 2, text: 'Second hint' });
    });

    it('should return level 3 hint third', () => {
      hintEngine.getNextHint('obj-1', testHints);
      hintEngine.getNextHint('obj-1', testHints);
      const hint = hintEngine.getNextHint('obj-1', testHints);
      expect(hint).toEqual({ level: 3, text: 'Third hint - the answer' });
    });

    it('should return null when all hints exhausted', () => {
      hintEngine.getNextHint('obj-1', testHints);
      hintEngine.getNextHint('obj-1', testHints);
      hintEngine.getNextHint('obj-1', testHints);
      const hint = hintEngine.getNextHint('obj-1', testHints);
      expect(hint).toBeNull();
    });

    it('should track hints per objective independently', () => {
      const hint1 = hintEngine.getNextHint('obj-1', testHints);
      const hint2 = hintEngine.getNextHint('obj-2', testHints);
      expect(hint1?.level).toBe(1);
      expect(hint2?.level).toBe(1);
    });
  });

  describe('getCurrentLevel', () => {
    it('should return 0 for unused objective', () => {
      expect(hintEngine.getCurrentLevel('obj-1')).toBe(0);
    });

    it('should return current level after hints used', () => {
      hintEngine.getNextHint('obj-1', testHints);
      expect(hintEngine.getCurrentLevel('obj-1')).toBe(1);

      hintEngine.getNextHint('obj-1', testHints);
      expect(hintEngine.getCurrentLevel('obj-1')).toBe(2);
    });
  });

  describe('getTotalHintsUsed', () => {
    it('should start at 0', () => {
      expect(hintEngine.getTotalHintsUsed()).toBe(0);
    });

    it('should increment for each hint used', () => {
      hintEngine.getNextHint('obj-1', testHints);
      expect(hintEngine.getTotalHintsUsed()).toBe(1);

      hintEngine.getNextHint('obj-1', testHints);
      expect(hintEngine.getTotalHintsUsed()).toBe(2);

      hintEngine.getNextHint('obj-2', testHints);
      expect(hintEngine.getTotalHintsUsed()).toBe(3);
    });

    it('should not increment when hints are exhausted', () => {
      hintEngine.getNextHint('obj-1', testHints);
      hintEngine.getNextHint('obj-1', testHints);
      hintEngine.getNextHint('obj-1', testHints);
      hintEngine.getNextHint('obj-1', testHints); // exhausted, returns null
      expect(hintEngine.getTotalHintsUsed()).toBe(3);
    });
  });
});
