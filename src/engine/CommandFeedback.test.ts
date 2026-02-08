import { describe, it, expect } from 'vitest';
import { suggestCommand, checkMissionFeedback } from './CommandFeedback.js';

describe('suggestCommand', () => {
  it('suggests "pwd" for "pwdd"', () => {
    expect(suggestCommand('pwdd')).toBe('pwd');
  });

  it('suggests "ls" for "lss"', () => {
    expect(suggestCommand('lss')).toBe('ls');
  });

  it('suggests "cat" for "catt"', () => {
    expect(suggestCommand('catt')).toBe('cat');
  });

  it('suggests "grep" for "grpe"', () => {
    expect(suggestCommand('grpe')).toBe('grep');
  });

  it('returns null for "xyzabc" (too far from any command)', () => {
    expect(suggestCommand('xyzabc')).toBeNull();
  });

  it('returns null for "pwd" (exact match, not a typo)', () => {
    expect(suggestCommand('pwd')).toBeNull();
  });
});

describe('checkMissionFeedback', () => {
  it('returns message when command matches pattern exactly', () => {
    const feedbacks = [{ pattern: 'ls', message: 'ls はファイル一覧です。' }];
    expect(checkMissionFeedback('ls', feedbacks)).toBe('ls はファイル一覧です。');
  });

  it('returns null when command does not match any pattern', () => {
    const feedbacks = [{ pattern: 'ls', message: 'test' }];
    expect(checkMissionFeedback('pwd', feedbacks)).toBeNull();
  });

  it('returns message when input starts with pattern', () => {
    const feedbacks = [{ pattern: 'cat', message: 'cat でファイルを読みます' }];
    expect(checkMissionFeedback('cat foo', feedbacks)).toBe('cat でファイルを読みます');
  });
});
