import React, { useState, useCallback, useMemo, useRef } from 'react';
import { Box, Text, useInput } from 'ink';
import { colors } from '../utils/colors.js';
import { stories } from '../data/stories/index.js';
import { CommandHandler } from '../engine/CommandHandler.js';
import { MissionEngine } from '../engine/MissionEngine.js';
import { HintEngine } from '../engine/HintEngine.js';
import { TabCompletion } from '../engine/TabCompletion.js';
import { TerminalPrompt } from '../components/TerminalPrompt.js';
import { TerminalOutput, type OutputLine } from '../components/TerminalOutput.js';
import { ObjectivePanel } from '../components/ObjectivePanel.js';
import { HintBar } from '../components/HintBar.js';
import { suggestCommand, checkMissionFeedback } from '../engine/CommandFeedback.js';
import { getCommandMeta } from '../data/commands-meta.js';
import type { Hint, Screen } from '../data/types.js';

interface TerminalScreenProps {
  storyId: string;
  missionIndex: number;
  onNavigate: (screen: Screen) => void;
  onMissionComplete: (storyId: string, missionId: string, hintsUsed: number, commandCount: number) => void;
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
  const course = story?.course;

  const [missionEngine] = useState(() => {
    if (!mission) return null;
    return new MissionEngine(mission);
  });

  const [commandHandler] = useState(() => {
    if (!missionEngine) return null;
    return new CommandHandler(missionEngine.getFS());
  });

  const [hintEngine] = useState(() => new HintEngine());
  const [tabCompletion] = useState(() => {
    if (!missionEngine) return null;
    return new TabCompletion(missionEngine.getFS());
  });
  const [outputLines, setOutputLines] = useState<OutputLine[]>(() => {
    if (course === 'kids') {
      return [{ text: '💡 コマンドをにゅうりょくして Enter キーをおしてね。Tab キーでじどうほかんできるよ。', type: 'system' as const }];
    }
    if (course === 'beginner') {
      return [{ text: '💡 コマンドを入力して Enter を押してください。Tab キーで補完、↑↓キーで履歴を呼び出せます。', type: 'system' as const }];
    }
    return [];
  });
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [completedObjectives, setCompletedObjectives] = useState<string[]>([]);
  const [currentHint, setCurrentHint] = useState<Hint | null>(null);
  const [hintLevel, setHintLevel] = useState(0);
  const commandCountRef = useRef(0);
  const [cmdsHintShown, setCmdsHintShown] = useState<Set<string>>(new Set());

  useInput((input, key) => {
    if (key.escape) {
      onNavigate({ type: 'storySelect' });
    }
    if (input === 'h' && key.ctrl && mission && missionEngine) {
      handleHintRequest();
    }
  });

  const handleHintRequest = useCallback(() => {
    if (!mission || !missionEngine) return;
    const currentObjIndex = missionEngine.getCurrentObjectiveIndex();
    if (currentObjIndex >= mission.objectives.length) return;

    const obj = mission.objectives[currentObjIndex];

    // newCommandsがあり、まだこの目標でcmdsプレヒントを出していない場合
    if (mission.newCommands && mission.newCommands.length > 0 && !cmdsHintShown.has(obj.id)) {
      setCmdsHintShown(prev => new Set(prev).add(obj.id));
      const cmdsMsg = course === 'kids'
        ? 'まずは cmds とにゅうりょくして、つかえるコマンドをかくにんしてみよう！'
        : 'まず cmds と入力して、このミッションのコマンドを確認してみましょう。';
      setCurrentHint({ level: 0, text: cmdsMsg });
      setHintLevel(0);
      return;
    }

    const hint = hintEngine.getNextHint(obj.id, obj.hints);
    if (hint) {
      setCurrentHint(hint);
      setHintLevel(hintEngine.getCurrentLevel(obj.id));
    }
  }, [mission, missionEngine, hintEngine, cmdsHintShown, course]);

  const handleCommand = useCallback(
    (input: string) => {
      const trimmed = input.trim();
      if (!trimmed || !commandHandler || !missionEngine || !mission) return;

      setCommandHistory(prev => [...prev, trimmed]);
      commandCountRef.current += 1;
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

      if (trimmed === 'cmds') {
        if (mission.newCommands && mission.newCommands.length > 0) {
          setOutputLines(prev => [
            ...prev,
            { text: '📖 このミッションの新しいコマンド:', type: 'system' as const },
          ]);
          for (const cmdName of mission.newCommands) {
            const meta = getCommandMeta(cmdName);
            if (!meta) continue;
            setOutputLines(prev => [
              ...prev,
              { text: `  ${meta.name} - ${meta.description}`, type: 'output' as const },
              ...meta.examples.map(ex => ({
                text: `    $ ${ex.cmd.padEnd(28)} ${ex.desc}`,
                type: 'output' as const,
              })),
            ]);
          }
        } else {
          setOutputLines(prev => [
            ...prev,
            { text: 'このミッションに新しいコマンドはありません。', type: 'system' as const },
          ]);
        }
        setOutputLines(prev => [
          ...prev,
          { text: '💡 全コマンド一覧は man、詳細は man <コマンド名> で確認できます。', type: 'system' as const },
        ]);
        return;
      }

      const result = commandHandler.execute(trimmed);

      if (result.output === 'CLEAR_SCREEN') {
        setOutputLines([]);
        return;
      }

      if (result.error) {
        let errorText = result.error!;
        if (course === 'kids' && errorText.endsWith(': command not found')) {
          const cmdName = errorText.replace(': command not found', '');
          errorText = `「${cmdName}」というコマンドはないよ。もういちどたしかめてみてね。`;
        }
        setOutputLines(prev => [...prev, { text: errorText, type: 'error' as const }]);

        // Command suggestion for typos
        if (result.error!.endsWith(': command not found')) {
          const suggestion = suggestCommand(trimmed);
          if (suggestion) {
            setOutputLines(prev => [...prev, { text: `💡 もしかして: ${suggestion}`, type: 'system' as const }]);
          }
        }
      } else if (result.output) {
        const lines = result.output.split('\n');
        setOutputLines(prev => [
          ...prev,
          ...lines.map(line => ({ text: line, type: 'output' as const })),
        ]);
      }

      // Mission-specific feedback (check for all commands, not just errors)
      const currentObjIndex = missionEngine.getCurrentObjectiveIndex();
      if (currentObjIndex < mission.objectives.length) {
        const obj = mission.objectives[currentObjIndex];
        if (obj.feedbacks) {
          const feedback = checkMissionFeedback(trimmed, obj.feedbacks);
          if (feedback) {
            setOutputLines(prev => [...prev, { text: `💡 ${feedback}`, type: 'system' as const }]);
          }
        }
      }

      // Parse all commands in pipe chain for objective checking
      const pipeSegments = trimmed.split('|').map(s => s.trim()).filter(s => s);
      let allNewlyCompleted: string[] = [];
      for (const segment of pipeSegments) {
        const parts = segment.split(/\s+/);
        const cmd = parts[0];
        const args = parts.slice(1);
        const newlyCompleted = missionEngine.checkObjectives(cmd, args, result.output);
        allNewlyCompleted.push(...newlyCompleted);
      }

      if (allNewlyCompleted.length > 0) {
        setCompletedObjectives(prev => [...prev, ...allNewlyCompleted]);

        for (const objId of allNewlyCompleted) {
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
          const finalCount = commandCountRef.current;
          setTimeout(() => {
            onMissionComplete(storyId, mission.id, hintEngine.getTotalHintsUsed(), finalCount);
            const isLast = story ? missionIndex >= story.missions.length - 1 : false;
            if (isLast) {
              onStoryComplete(storyId);
            }
            onNavigate({ type: 'missionComplete', storyId, missionIndex, commandCount: finalCount });
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
    return <Text color={colors.error}>ミッションデータが見つかりません (story={storyId}, mission={missionIndex})</Text>;
  }

  const currentObj = mission.objectives[missionEngine.getCurrentObjectiveIndex()];

  return (
    <Box flexDirection="column" paddingX={1}>
      <Box justifyContent="space-between" marginBottom={1}>
        <Text bold color={colors.secondary}>
          {story.emoji} {mission.title}
        </Text>
        <Text color={colors.muted}>
          {course === 'kids'
            ? 'Esc: もどる | Tab: ほかん | hint: ヒント | obj: もくひょう | cmds: コマンド'
            : course === 'beginner'
              ? 'Esc: 戻る | Tab: 補完 | Ctrl+H: ヒント | hint: ヒント | obj: 目標 | cmds: コマンド'
              : 'Esc: 戻る | Tab: 補完 | Ctrl+H: ヒント | hint: ヒント | obj: 目標 | cmds: コマンド'}
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

      <Box flexDirection="column" marginTop={1}>
        <TerminalOutput lines={outputLines} maxLines={30} />
        <TerminalPrompt
          cwd={missionEngine.getFS().getCwd()}
          onSubmit={handleCommand}
          history={commandHistory}
          tabCompletion={tabCompletion ?? undefined}
        />
      </Box>
    </Box>
  );
}
