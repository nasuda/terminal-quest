import React from 'react';
import { Box, Text, useInput } from 'ink';
import { colors } from '../utils/colors.js';
import { ProgressBar } from '../components/ProgressBar.js';
import { stories } from '../data/stories/index.js';
import { achievements } from '../engine/Achievements.js';
import type { GameProgress, Screen } from '../data/types.js';

interface ProgressScreenProps {
  progress: GameProgress;
  onNavigate: (screen: Screen) => void;
}

export function ProgressScreen({ progress, onNavigate }: ProgressScreenProps) {
  useInput((_input, key) => {
    if (key.escape || key.return) {
      onNavigate({ type: 'title' });
    }
  });

  const totalMissions = stories.reduce((sum, s) => sum + s.missions.length, 0);
  const completedMissions = Object.values(progress.storyProgress).reduce(
    (sum, sp) => sum + sp.completedMissions.length,
    0
  );

  return (
    <Box flexDirection="column" paddingX={2}>
      <Text bold color={colors.secondary}>
        ◆ 進捗状況 ◆
      </Text>

      <Box marginTop={1} flexDirection="column">
        <Text color={colors.file}>
          総合進捗:
        </Text>
        <ProgressBar current={completedMissions} total={totalMissions} width={30} />
      </Box>

      <Box marginTop={1} flexDirection="column">
        <Text color={colors.file}>
          実行コマンド数: <Text color={colors.primary}>{progress.totalCommandsExecuted}</Text>
        </Text>
        <Text color={colors.file}>
          使用ヒント数: <Text color={colors.primary}>{progress.totalHintsUsed}</Text>
        </Text>
        <Text color={colors.file}>
          クリアストーリー: <Text color={colors.primary}>{progress.completedStories.length}/{stories.length}</Text>
        </Text>
      </Box>

      <Box marginTop={1} flexDirection="column">
        <Text bold color={colors.secondary}>ストーリー別:</Text>
        {stories.map(story => {
          const sp = progress.storyProgress[story.id];
          const completed = sp?.completedMissions.length ?? 0;
          return (
            <Box key={story.id} flexDirection="column" marginTop={1}>
              <Text color={colors.file}>
                {story.emoji} {story.title}
              </Text>
              <Box marginLeft={2}>
                <ProgressBar current={completed} total={story.missions.length} width={15} />
              </Box>
            </Box>
          );
        })}
      </Box>

      <Box marginTop={1} flexDirection="column">
        <Text bold color={colors.secondary}>バッジ:</Text>
        {achievements.map(badge => {
          const earned = (progress.achievements ?? []).includes(badge.id);
          return (
            <Text key={badge.id} color={earned ? colors.success : colors.muted}>
              {earned ? badge.emoji : '🔒'} {badge.title} - {badge.description}
            </Text>
          );
        })}
      </Box>

      <Box marginTop={2}>
        <Text color={colors.muted}>Enter/Escで戻る</Text>
      </Box>
    </Box>
  );
}
