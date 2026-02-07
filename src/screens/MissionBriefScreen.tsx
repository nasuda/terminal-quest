import React from 'react';
import { Box, Text, useInput } from 'ink';
import { colors } from '../utils/colors.js';
import { stories } from '../data/stories/index.js';
import type { Screen } from '../data/types.js';

interface MissionBriefScreenProps {
  storyId: string;
  missionIndex: number;
  onNavigate: (screen: Screen) => void;
}

export function MissionBriefScreen({ storyId, missionIndex, onNavigate }: MissionBriefScreenProps) {
  const story = stories.find(s => s.id === storyId);
  const mission = story?.missions[missionIndex];

  useInput((_input, key) => {
    if (key.return) {
      onNavigate({ type: 'terminal', storyId, missionIndex });
    }
    if (key.escape) {
      onNavigate({ type: 'storySelect' });
    }
  });

  if (!story || !mission) {
    return <Text color={colors.error}>ミッションが見つかりません</Text>;
  }

  return (
    <Box flexDirection="column" paddingX={2}>
      <Box marginBottom={1}>
        <Text bold color={colors.secondary}>
          {story.emoji} {story.title} - ミッション {missionIndex + 1}/{story.missions.length}
        </Text>
      </Box>

      <Box borderStyle="double" borderColor={colors.primary} paddingX={2} paddingY={1} flexDirection="column">
        <Text bold color={colors.primary}>
          {mission.title}
        </Text>
        <Box marginTop={1}>
          <Text color={colors.narrative}>{mission.narrative}</Text>
        </Box>
      </Box>

      <Box marginTop={1} flexDirection="column">
        <Text bold color={colors.secondary}>目標:</Text>
        {mission.objectives.map((obj, i) => (
          <Text key={obj.id} color={colors.file}>
            {`  ${i + 1}. ${obj.description}`}
          </Text>
        ))}
      </Box>

      <Box marginTop={2}>
        <Text color={colors.muted}>Enterでスタート、Escで戻る</Text>
      </Box>
    </Box>
  );
}
