import React, { useState, useMemo } from 'react';
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

const courseConfig = [
  { key: 'kids' as const, label: '✨ 小学生向けコース', emoji: '✨' },
  { key: 'beginner' as const, label: '💻 はじめてコース', emoji: '💻' },
  { key: 'engineer' as const, label: '🖥️ エンジニアコース', emoji: '🖥️' },
];

export function StorySelectScreen({ progress, onNavigate }: StorySelectScreenProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const groupedStories = useMemo(() => {
    const groups: Array<{ type: 'header'; label: string } | { type: 'story'; story: typeof stories[number]; flatIndex: number }> = [];
    let flatIndex = 0;

    for (const course of courseConfig) {
      const courseStories = stories.filter(s => s.course === course.key);
      if (courseStories.length === 0) continue;

      groups.push({ type: 'header', label: course.label });
      for (const story of courseStories) {
        groups.push({ type: 'story', story, flatIndex });
        flatIndex++;
      }
    }

    // courseが未設定のストーリーがあれば最後に追加
    const uncategorized = stories.filter(s => !s.course);
    if (uncategorized.length > 0) {
      groups.push({ type: 'header', label: '📚 その他' });
      for (const story of uncategorized) {
        groups.push({ type: 'story', story, flatIndex });
        flatIndex++;
      }
    }

    return { groups, totalStories: flatIndex };
  }, []);

  const { groups, totalStories } = groupedStories;

  useInput((_input, key) => {
    if (key.upArrow) {
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : totalStories));
    }
    if (key.downArrow) {
      setSelectedIndex(prev => (prev < totalStories ? prev + 1 : 0));
    }
    if (key.return) {
      if (selectedIndex === totalStories) {
        onNavigate({ type: 'title' });
        return;
      }
      const storyItem = groups.find(g => g.type === 'story' && g.flatIndex === selectedIndex);
      if (!storyItem || storyItem.type !== 'story') return;

      const story = storyItem.story;
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
          ◆ コースを選択 ◆
        </Text>
      </Box>

      {groups.map((item, i) => {
        if (item.type === 'header') {
          return (
            <Box key={`header-${i}`} marginTop={i > 0 ? 1 : 0} marginBottom={0}>
              <Text bold color={colors.muted}>
                ── {item.label} ──
              </Text>
            </Box>
          );
        }

        const { story, flatIndex } = item;
        const unlocked = isStoryUnlocked(progress, story.id, stories);
        const storyProg = progress.storyProgress[story.id];
        const completed = storyProg?.completedMissions.length ?? 0;
        const total = story.missions.length;

        return (
          <Box key={story.id} flexDirection="column" marginBottom={0}>
            <MenuItem
              label={`${story.emoji} ${story.title}`}
              isSelected={flatIndex === selectedIndex}
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
        <MenuItem label="← タイトルに戻る" isSelected={selectedIndex === totalStories} />
      </Box>

      <Box marginTop={1}>
        <Text color={colors.muted}>↑↓で選択、Enterで決定、Escで戻る</Text>
      </Box>
    </Box>
  );
}
