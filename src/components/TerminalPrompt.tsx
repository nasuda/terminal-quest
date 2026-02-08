import React, { useState, useCallback } from 'react';
import { Box, Text, useInput } from 'ink';
import TextInput from 'ink-text-input';
import { colors } from '../utils/colors.js';
import type { TabCompletion } from '../engine/TabCompletion.js';

interface TerminalPromptProps {
  cwd: string;
  onSubmit: (input: string) => void;
  history: string[];
  tabCompletion?: TabCompletion;
}

export function TerminalPrompt({ cwd, onSubmit, history, tabCompletion }: TerminalPromptProps) {
  const [value, setValue] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [completionCandidates, setCompletionCandidates] = useState<string[]>([]);

  useInput((_input, key) => {
    if (key.upArrow && history.length > 0) {
      const newIndex = Math.min(historyIndex + 1, history.length - 1);
      setHistoryIndex(newIndex);
      setValue(history[history.length - 1 - newIndex]);
      setCompletionCandidates([]);
    }
    if (key.downArrow) {
      if (historyIndex <= 0) {
        setHistoryIndex(-1);
        setValue('');
      } else {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setValue(history[history.length - 1 - newIndex]);
      }
      setCompletionCandidates([]);
    }
    if (key.tab && tabCompletion) {
      const result = tabCompletion.complete(value);
      setValue(result.completed);
      setCompletionCandidates(result.candidates.length > 1 ? result.candidates : []);
    }
    if (!key.tab) {
      setCompletionCandidates([]);
    }
  });

  const handleSubmit = useCallback(
    (input: string) => {
      onSubmit(input);
      setValue('');
      setHistoryIndex(-1);
      setCompletionCandidates([]);
    },
    [onSubmit]
  );

  return (
    <Box flexDirection="column">
      {completionCandidates.length > 0 && (
        <Text color={colors.muted}>
          {completionCandidates.join('  ')}
        </Text>
      )}
      <Box>
        <Text color={colors.prompt} bold>
          {cwd}
        </Text>
        <Text color={colors.secondary}> $ </Text>
        <TextInput value={value} onChange={setValue} onSubmit={handleSubmit} />
      </Box>
    </Box>
  );
}
