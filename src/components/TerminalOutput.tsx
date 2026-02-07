import React from 'react';
import { Box, Text } from 'ink';
import { colors } from '../utils/colors.js';

export interface OutputLine {
  text: string;
  type: 'output' | 'error' | 'system' | 'success';
}

interface TerminalOutputProps {
  lines: OutputLine[];
  maxLines?: number;
}

export function TerminalOutput({ lines, maxLines = 20 }: TerminalOutputProps) {
  const visibleLines = maxLines > 0 ? lines.slice(-maxLines) : lines;

  return (
    <Box flexDirection="column">
      {visibleLines.map((line, i) => {
        let color: string;
        switch (line.type) {
          case 'error':
            color = colors.error;
            break;
          case 'system':
            color = colors.info;
            break;
          case 'success':
            color = colors.success;
            break;
          default:
            color = colors.file;
        }
        return (
          <Text key={i} color={color}>
            {line.text}
          </Text>
        );
      })}
    </Box>
  );
}
