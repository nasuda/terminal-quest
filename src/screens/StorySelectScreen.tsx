import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import { colors } from '../utils/colors.js';
import { MenuItem } from '../components/MenuItem.js';
import { ProgressBar } from '../components/ProgressBar.js';
import { stories } from '../data/stories/index.js';
import { isStoryUnlocked } from '../state/ProgressStore.js';
import type { GameProgress, Screen } from '../data/types.js';

interface StorySelectScreenProps {
  progress: GameProgress;
  onNavigate: (screen: Screen) => void;
}

export function StorySelectScreen({ progress, onNavigate }: StorySelectScreenProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useInput((_input, key) => {
    if (key.upArrow) {
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : stories.length));
    }
    if (key.downArrow) {
      setSelectedIndex(prev => (prev < stories.length ? prev + 1 : 0));
    }
    if (key.return) {
      if (selectedIndex === stories.length) {
        onNavigate({ type: 'title' });
        return;
      }
      const story = stories[selectedIndex];
      const unlocked = isStoryUnlocked(progress, story.id, stories);
      if (!unlocked) return;

      const storyProg = progress.storyProgress[story.id];
      const missionIndex = storyProg ? storyProg.currentMissionIndex : 0;
      const clampedIndex = Math.min(missionIndex, story.missions.length - 1);
      onNavigate({ type: 'missionBrief', storyId: story.id, missionIndex: clampedIndex });
    }
    if (key.escape) {
      onNavigate({ type: 'title' });
    }
  });

  return (
    <Box flexDirection="column" paddingX={2}>
      <Box marginBottom={1}>
        <Text bold color={colors.secondary}>
          ◆ ストーリーを選択 ◆
        </Text>
      </Box>

      {stories.map((story, i) => {
        const unlocked = isStoryUnlocked(progress, story.id, stories);
        const storyProg = progress.storyProgress[story.id];
        const completed = storyProg?.completedMissions.length ?? 0;
        const total = story.missions.length;

        return (
          <Box key={story.id} flexDirection="column" marginBottom={1}>
            <MenuItem
              label={`${story.emoji} ${story.title}`}
              isSelected={i === selectedIndex}
              isLocked={!unlocked}
              description={unlocked ? story.description : undefined}
            />
            {unlocked && (
              <Box marginLeft={4}>
                <ProgressBar current={completed} total={total} width={15} />
              </Box>
            )}
          </Box>
        );
      })}

      <Box marginTop={1}>
        <MenuItem label="← タイトルに戻る" isSelected={selectedIndex === stories.length} />
      </Box>

      <Box marginTop={1}>
        <Text color={colors.muted}>↑↓で選択、Enterで決定、Escで戻る</Text>
      </Box>
    </Box>
  );
}
