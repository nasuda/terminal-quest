import React, { useState, useCallback, useMemo } from 'react';
import { Box, Text, useInput } from 'ink';
import { colors } from '../utils/colors.js';
import { stories } from '../data/stories/index.js';
import { CommandHandler } from '../engine/CommandHandler.js';
import { MissionEngine } from '../engine/MissionEngine.js';
import { HintEngine } from '../engine/HintEngine.js';
import { TerminalPrompt } from '../components/TerminalPrompt.js';
import { TerminalOutput, type OutputLine } from '../components/TerminalOutput.js';
import { ObjectivePanel } from '../components/ObjectivePanel.js';
import { HintBar } from '../components/HintBar.js';
import type { Hint, Screen } from '../data/types.js';

interface TerminalScreenProps {
  storyId: string;
  missionIndex: number;
  onNavigate: (screen: Screen) => void;
  onMissionComplete: (storyId: string, missionId: string, hintsUsed: number) => void;
  onStoryComplete: (storyId: string) => void;
  onCommandExecuted: () => void;
}

export function TerminalScreen({
  storyId,
  missionIndex,
  onNavigate,
  onMissionComplete,
  onStoryComplete,
  onCommandExecuted,
}: TerminalScreenProps) {
  const story = stories.find(s => s.id === storyId);
  const mission = story?.missions[missionIndex];

  const [missionEngine] = useState(() => {
    if (!mission) return null;
    return new MissionEngine(mission);
  });

  const [commandHandler] = useState(() => {
    if (!missionEngine) return null;
    return new CommandHandler(missionEngine.getFS());
  });

  const [hintEngine] = useState(() => new HintEngine());
  const [outputLines, setOutputLines] = useState<OutputLine[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [completedObjectives, setCompletedObjectives] = useState<string[]>([]);
  const [currentHint, setCurrentHint] = useState<Hint | null>(null);
  const [hintLevel, setHintLevel] = useState(0);

  useInput((_input, key) => {
    if (key.escape) {
      onNavigate({ type: 'storySelect' });
    }
    if (key.tab && mission && missionEngine) {
      handleHintRequest();
    }
  });

  const handleHintRequest = useCallback(() => {
    if (!mission || !missionEngine) return;
    const currentObjIndex = missionEngine.getCurrentObjectiveIndex();
    if (currentObjIndex >= mission.objectives.length) return;

    const obj = mission.objectives[currentObjIndex];
    const hint = hintEngine.getNextHint(obj.id, obj.hints);
    if (hint) {
      setCurrentHint(hint);
      setHintLevel(hintEngine.getCurrentLevel(obj.id));
    }
  }, [mission, missionEngine, hintEngine]);

  const handleCommand = useCallback(
    (input: string) => {
      const trimmed = input.trim();
      if (!trimmed || !commandHandler || !missionEngine || !mission) return;

      setCommandHistory(prev => [...prev, trimmed]);
      onCommandExecuted();

      const cwd = missionEngine.getFS().getCwd();
      setOutputLines(prev => [
        ...prev,
        { text: `${cwd} $ ${trimmed}`, type: 'system' as const },
      ]);

      if (trimmed === 'hint') {
        handleHintRequest();
        return;
      }

      if (trimmed === 'objectives' || trimmed === 'obj') {
        mission.objectives.forEach((obj, i) => {
          const done = completedObjectives.includes(obj.id);
          setOutputLines(prev => [
            ...prev,
            {
              text: `${done ? '✓' : '○'} ${i + 1}. ${obj.description}`,
              type: done ? ('success' as const) : ('output' as const),
            },
          ]);
        });
        return;
      }

      const result = commandHandler.execute(trimmed);

      if (result.output === 'CLEAR_SCREEN') {
        setOutputLines([]);
        return;
      }

      if (result.error) {
        setOutputLines(prev => [...prev, { text: result.error!, type: 'error' as const }]);
      } else if (result.output) {
        const lines = result.output.split('\n');
        setOutputLines(prev => [
          ...prev,
          ...lines.map(line => ({ text: line, type: 'output' as const })),
        ]);
      }

      const parts = trimmed.split(/\s+/);
      const cmd = parts[0];
      const args = parts.slice(1);

      const newlyCompleted = missionEngine.checkObjectives(cmd, args, result.output);
      if (newlyCompleted.length > 0) {
        setCompletedObjectives(prev => [...prev, ...newlyCompleted]);

        for (const objId of newlyCompleted) {
          const obj = mission.objectives.find(o => o.id === objId);
          if (obj) {
            setOutputLines(prev => [
              ...prev,
              { text: `✓ 目標達成: ${obj.description}`, type: 'success' as const },
            ]);
          }
        }

        setCurrentHint(null);

        if (missionEngine.isAllComplete()) {
          setTimeout(() => {
            onMissionComplete(storyId, mission.id, hintEngine.getTotalHintsUsed());
            const isLast = story ? missionIndex >= story.missions.length - 1 : false;
            if (isLast) {
              onStoryComplete(storyId);
            }
            onNavigate({ type: 'missionComplete', storyId, missionIndex });
          }, 500);
        }
      }
    },
    [
      commandHandler,
      missionEngine,
      mission,
      storyId,
      missionIndex,
      story,
      completedObjectives,
      hintEngine,
      onCommandExecuted,
      onMissionComplete,
      onStoryComplete,
      onNavigate,
      handleHintRequest,
    ]
  );

  if (!story || !mission || !missionEngine) {
    return <Text color={colors.error}>ミッションデータが見つかりません</Text>;
  }

  const currentObj = mission.objectives[missionEngine.getCurrentObjectiveIndex()];

  return (
    <Box flexDirection="column" paddingX={1}>
      <Box justifyContent="space-between" marginBottom={1}>
        <Text bold color={colors.secondary}>
          {story.emoji} {mission.title}
        </Text>
        <Text color={colors.muted}>
          Esc: 戻る | Tab/hint: ヒント | obj: 目標
        </Text>
      </Box>

      <ObjectivePanel objectives={mission.objectives} completedIds={completedObjectives} />

      {currentHint && currentObj && (
        <HintBar
          hint={currentHint}
          currentLevel={hintLevel}
          maxLevel={currentObj.hints.length}
        />
      )}

      <Box flexDirection="column" marginTop={1} minHeight={10}>
        <TerminalOutput lines={outputLines} maxLines={15} />
      </Box>

      <TerminalPrompt
        cwd={missionEngine.getFS().getCwd()}
        onSubmit={handleCommand}
        history={commandHistory}
      />
    </Box>
  );
}
