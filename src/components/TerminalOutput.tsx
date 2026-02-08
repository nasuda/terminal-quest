import React from 'react';
import { Box, Text } from 'ink';
import { colors } from '../utils/colors.js';

export interface OutputLine {
  text: string;
  type: 'output' | 'error' | 'system' | 'success' | 'separator';
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
        if (line.type === 'separator') {
          return (
            <Text key={i} color={colors.muted}>
              {line.text}
            </Text>
          );
        }

        const isNewGroup = line.type === 'system' && i > 0
          && visibleLines[i - 1]?.type !== 'separator';

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

        const indent = (line.type === 'output' || line.type === 'error') ? '  ' : '';

        return (
          <React.Fragment key={i}>
            {isNewGroup && <Text> </Text>}
            <Text color={color}>
              {indent}{line.text}
            </Text>
          </React.Fragment>
        );
      })}
    </Box>
  );
}
