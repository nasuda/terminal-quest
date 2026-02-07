import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import { colors } from '../utils/colors.js';
import { MenuItem } from '../components/MenuItem.js';
import type { Screen } from '../data/types.js';

interface SettingsScreenProps {
  onNavigate: (screen: Screen) => void;
  onReset: () => void;
}

export function SettingsScreen({ onNavigate, onReset }: SettingsScreenProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [confirmReset, setConfirmReset] = useState(false);

  const menuItems = [
    { label: '進捗をリセット', action: 'reset' },
    { label: '← タイトルに戻る', action: 'back' },
  ];

  useInput((_input, key) => {
    if (confirmReset) {
      if (_input === 'y' || _input === 'Y') {
        onReset();
        setConfirmReset(false);
      } else {
        setConfirmReset(false);
      }
      return;
    }

    if (key.upArrow) {
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : menuItems.length - 1));
    }
    if (key.downArrow) {
      setSelectedIndex(prev => (prev < menuItems.length - 1 ? prev + 1 : 0));
    }
    if (key.return) {
      const item = menuItems[selectedIndex];
      if (item.action === 'reset') {
        setConfirmReset(true);
      } else if (item.action === 'back') {
        onNavigate({ type: 'title' });
      }
    }
    if (key.escape) {
      onNavigate({ type: 'title' });
    }
  });

  return (
    <Box flexDirection="column" paddingX={2}>
      <Text bold color={colors.secondary}>
        ◆ 設定 ◆
      </Text>

      {confirmReset ? (
        <Box marginTop={1} flexDirection="column">
          <Text color={colors.warning} bold>
            本当に全ての進捗をリセットしますか？
          </Text>
          <Text color={colors.muted}>y: はい / その他のキー: いいえ</Text>
        </Box>
      ) : (
        <Box flexDirection="column" marginTop={1}>
          {menuItems.map((item, i) => (
            <MenuItem key={item.label} label={item.label} isSelected={i === selectedIndex} />
          ))}
        </Box>
      )}

      <Box marginTop={2}>
        <Text color={colors.muted}>Escで戻る</Text>
      </Box>
    </Box>
  );
}
