import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import { colors } from '../utils/colors.js';
import { missionCompleteArt, storyCompleteArt } from '../utils/ascii-art.js';
import { stories } from '../data/stories/index.js';
import type { Screen } from '../data/types.js';

interface MissionCompleteScreenProps {
  storyId: string;
  missionIndex: number;
  commandCount?: number;
  onNavigate: (screen: Screen) => void;
}

type ReviewState = 'answering' | 'showResult' | 'done';

export function MissionCompleteScreen({ storyId, missionIndex, commandCount, onNavigate }: MissionCompleteScreenProps) {
  const story = stories.find(s => s.id === storyId);
  const mission = story?.missions[missionIndex];
  const isLastMission = story ? missionIndex >= story.missions.length - 1 : false;
  const review = mission?.review;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [reviewState, setReviewState] = useState<ReviewState>(review ? 'answering' : 'done');
  const [wasCorrect, setWasCorrect] = useState(false);

  useInput((_input, key) => {
    if (key.escape) {
      onNavigate({ type: 'storySelect' });
      return;
    }

    if (reviewState === 'answering' && review) {
      if (key.upArrow) {
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : review.choices.length - 1));
      }
      if (key.downArrow) {
        setSelectedIndex(prev => (prev < review.choices.length - 1 ? prev + 1 : 0));
      }
      if (key.return) {
        setWasCorrect(selectedIndex === review.correctIndex);
        setReviewState('showResult');
      }
    } else if (reviewState === 'showResult') {
      if (key.return) {
        setReviewState('done');
      }
    } else if (reviewState === 'done') {
      if (key.return) {
        if (isLastMission) {
          onNavigate({ type: 'storySelect' });
        } else {
          onNavigate({ type: 'missionBrief', storyId, missionIndex: missionIndex + 1 });
        }
      }
    }
  });

  if (!story || !mission) {
    return <Text color={colors.error}>データが見つかりません (story={storyId}, mission={missionIndex})</Text>;
  }

  return (
    <Box flexDirection="column" alignItems="center" paddingX={2}>
      <Text color={colors.success} bold>
        {isLastMission ? storyCompleteArt : missionCompleteArt}
      </Text>

      <Text bold color={colors.primary}>
        {mission.title}
      </Text>

      {commandCount != null && (
        <Box marginTop={1}>
          <Text color={colors.muted}>コマンド実行回数: {commandCount}回</Text>
        </Box>
      )}

      {isLastMission && (
        <Box marginTop={1}>
          <Text color={colors.secondary} bold>
            「{story.title}」をクリアしました！
          </Text>
        </Box>
      )}

      {reviewState === 'answering' && review && (
        <Box flexDirection="column" marginTop={1}>
          <Text color={colors.secondary} bold>📝 ふりかえり問題</Text>
          <Box marginTop={1}>
            <Text>{review.question}</Text>
          </Box>
          <Box flexDirection="column" marginTop={1}>
            {review.choices.map((choice, i) => (
              <Text key={i} color={i === selectedIndex ? colors.primary : colors.muted}>
                {i === selectedIndex ? '▸ ' : '  '}{choice}
              </Text>
            ))}
          </Box>
          <Box marginTop={1}>
            <Text color={colors.muted}>↑↓で選択、Enterで回答</Text>
          </Box>
        </Box>
      )}

      {reviewState === 'showResult' && review && (
        <Box flexDirection="column" marginTop={1}>
          <Text color={wasCorrect ? colors.success : colors.error} bold>
            {wasCorrect ? '⭕ 正解！' : '❌ 不正解'}
          </Text>
          {!wasCorrect && (
            <Box marginTop={1}>
              <Text color={colors.primary}>正解: {review.choices[review.correctIndex]}</Text>
            </Box>
          )}
          <Box marginTop={1}>
            <Text color={colors.muted}>💡 {review.explanation}</Text>
          </Box>
          <Box marginTop={1}>
            <Text color={colors.muted}>Enterで続ける</Text>
          </Box>
        </Box>
      )}

      {reviewState === 'done' && (
        <Box marginTop={2}>
          <Text color={colors.muted}>
            {isLastMission
              ? 'Enterでストーリー選択に戻る'
              : 'Enterで次のミッションへ'}
          </Text>
        </Box>
      )}
    </Box>
  );
}
