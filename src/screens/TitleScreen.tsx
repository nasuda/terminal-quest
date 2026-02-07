import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import { colors } from '../utils/colors.js';
import { titleArt } from '../utils/ascii-art.js';
import { MenuItem } from '../components/MenuItem.js';
import type { Screen } from '../data/types.js';

interface TitleScreenProps {
  onNavigate: (screen: Screen) => void;
}

const menuItems = [
  { label: 'ゲームスタート', screen: { type: 'storySelect' } as Screen },
  { label: '進捗を見る', screen: { type: 'progress' } as Screen },
  { label: '設定', screen: { type: 'settings' } as Screen },
];

export function TitleScreen({ onNavigate }: TitleScreenProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useInput((_input, key) => {
    if (key.upArrow) {
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : menuItems.length - 1));
    }
    if (key.downArrow) {
      setSelectedIndex(prev => (prev < menuItems.length - 1 ? prev + 1 : 0));
    }
    if (key.return) {
      onNavigate(menuItems[selectedIndex].screen);
    }
  });

  return (
    <Box flexDirection="column" alignItems="center">
      <Text color={colors.primary}>{titleArt}</Text>
      <Box flexDirection="column" marginTop={1}>
        {menuItems.map((item, i) => (
          <MenuItem key={item.label} label={item.label} isSelected={i === selectedIndex} />
        ))}
      </Box>
      <Box marginTop={1}>
        <Text color={colors.muted}>↑↓で選択、Enterで決定、Ctrl+Cで終了</Text>
      </Box>
    </Box>
  );
}
