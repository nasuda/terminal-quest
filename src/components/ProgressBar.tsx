import React from 'react';
import { Text } from 'ink';
import { colors } from '../utils/colors.js';

interface ProgressBarProps {
  current: number;
  total: number;
  width?: number;
}

export function ProgressBar({ current, total, width = 20 }: ProgressBarProps) {
  const filled = total > 0 ? Math.round((current / total) * width) : 0;
  const empty = width - filled;
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <Text>
      <Text color={colors.primary}>{'█'.repeat(filled)}</Text>
      <Text color={colors.muted}>{'░'.repeat(empty)}</Text>
      <Text color={colors.muted}> {current}/{total} ({percentage}%)</Text>
    </Text>
  );
}
