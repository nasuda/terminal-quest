import { commandRegistry } from './commands/index.js';

/**
 * Levenshtein distance-based command suggestion.
 * Returns a suggestion string if a close match is found, otherwise null.
 */
export function suggestCommand(input: string): string | null {
  const cmd = input.split(/\s+/)[0];
  if (!cmd || commandRegistry[cmd]) return null;

  const commands = Object.keys(commandRegistry);
  let bestMatch = '';
  let bestDistance = Infinity;

  for (const known of commands) {
    const dist = levenshtein(cmd, known);
    if (dist < bestDistance) {
      bestDistance = dist;
      bestMatch = known;
    }
  }

  // Only suggest if distance is 2 or less (reasonable typo range)
  if (bestDistance <= 2 && bestMatch) {
    return bestMatch;
  }
  return null;
}

/**
 * Check mission-specific feedback patterns.
 * Returns a feedback message if the input matches a pattern, otherwise null.
 */
export function checkMissionFeedback(
  input: string,
  feedbacks: Array<{ pattern: string; message: string }>
): string | null {
  for (const fb of feedbacks) {
    try {
      if (new RegExp(fb.pattern).test(input)) {
        return fb.message;
      }
    } catch {
      // Fallback to simple matching if invalid regex
      if (input === fb.pattern || input.startsWith(fb.pattern)) {
        return fb.message;
      }
    }
  }
  return null;
}

function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}
