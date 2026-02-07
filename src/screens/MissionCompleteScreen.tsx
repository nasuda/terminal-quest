import React from 'react';
import { Box, Text, useInput } from 'ink';
import { colors } from '../utils/colors.js';
import { missionCompleteArt, storyCompleteArt } from '../utils/ascii-art.js';
import { stories } from '../data/stories/index.js';
import type { Screen } from '../data/types.js';

interface MissionCompleteScreenProps {
  storyId: string;
  missionIndex: number;
  onNavigate: (screen: Screen) => void;
}

export function MissionCompleteScreen({ storyId, missionIndex, onNavigate }: MissionCompleteScreenProps) {
  const story = stories.find(s => s.id === storyId);
  const mission = story?.missions[missionIndex];
  const isLastMission = story ? missionIndex >= story.missions.length - 1 : false;

  useInput((_input, key) => {
    if (key.return) {
      if (isLastMission) {
        onNavigate({ type: 'storySelect' });
      } else {
        onNavigate({ type: 'missionBrief', storyId, missionIndex: missionIndex + 1 });
      }
    }
    if (key.escape) {
      onNavigate({ type: 'storySelect' });
    }
  });

  if (!story || !mission) {
    return <Text color={colors.error}>データが見つかりません</Text>;
  }

  return (
    <Box flexDirection="column" alignItems="center" paddingX={2}>
      <Text color={colors.success} bold>
        {isLastMission ? storyCompleteArt : missionCompleteArt}
      </Text>

      <Text bold color={colors.primary}>
        {mission.title}
      </Text>

      {isLastMission && (
        <Box marginTop={1}>
          <Text color={colors.secondary} bold>
            「{story.title}」をクリアしました！
          </Text>
        </Box>
      )}

      <Box marginTop={2}>
        <Text color={colors.muted}>
          {isLastMission
            ? 'Enterでストーリー選択に戻る'
            : 'Enterで次のミッションへ'}
        </Text>
      </Box>
    </Box>
  );
}
