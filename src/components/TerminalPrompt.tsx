import React, { useState, useCallback } from 'react';
import { Box, Text, useInput } from 'ink';
import TextInput from 'ink-text-input';
import { colors } from '../utils/colors.js';

interface TerminalPromptProps {
  cwd: string;
  onSubmit: (input: string) => void;
  history: string[];
}

export function TerminalPrompt({ cwd, onSubmit, history }: TerminalPromptProps) {
  const [value, setValue] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);

  useInput((_input, key) => {
    if (key.upArrow && history.length > 0) {
      const newIndex = Math.min(historyIndex + 1, history.length - 1);
      setHistoryIndex(newIndex);
      setValue(history[history.length - 1 - newIndex]);
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
    }
  });

  const handleSubmit = useCallback(
    (input: string) => {
      onSubmit(input);
      setValue('');
      setHistoryIndex(-1);
    },
    [onSubmit]
  );

  return (
    <Box>
      <Text color={colors.prompt} bold>
        {cwd}
      </Text>
      <Text color={colors.secondary}> $ </Text>
      <TextInput value={value} onChange={setValue} onSubmit={handleSubmit} />
    </Box>
  );
}
