import React from 'react';
import { Box, Text } from 'ink';
import { colors } from '../utils/colors.js';
import type { Objective } from '../data/types.js';

interface ObjectivePanelProps {
  objectives: Objective[];
  completedIds: string[];
}

export function ObjectivePanel({ objectives, completedIds }: ObjectivePanelProps) {
  return (
    <Box flexDirection="column" borderStyle="single" borderColor={colors.secondary} paddingX={1}>
      <Text bold color={colors.secondary}>
        目標:
      </Text>
      {objectives.map((obj) => {
        const isComplete = completedIds.includes(obj.id);
        return (
          <Text key={obj.id}>
            <Text color={isComplete ? colors.success : colors.muted}>
              {isComplete ? ' ✓ ' : ' ○ '}
            </Text>
            <Text color={isComplete ? colors.success : colors.file}>
              {obj.description}
            </Text>
          </Text>
        );
      })}
    </Box>
  );
}
