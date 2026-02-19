import React from 'react';
import { Box, Text } from 'ink';
import { colors } from '../utils/colors.js';
import type { Hint } from '../data/types.js';

interface HintBarProps {
  hint: Hint | null;
  currentLevel: number;
  maxLevel: number;
}

export function HintBar({ hint, currentLevel, maxLevel }: HintBarProps) {
  if (!hint) return null;

  const isPreHint = hint.level === 0;
  const levelColor = isPreHint ? colors.primary : hint.level === 1 ? colors.hint1 : hint.level === 2 ? colors.hint2 : colors.hint3;
  const levelLabel = isPreHint ? 'ヒント' : `ヒント ${hint.level}/${maxLevel}`;

  return (
    <Box borderStyle="round" borderColor={levelColor} paddingX={1} marginTop={1}>
      <Text>
        <Text color={levelColor} bold>
          💡 {levelLabel}:
        </Text>
        <Text color={colors.file}> {hint.text}</Text>
      </Text>
    </Box>
  );
}
