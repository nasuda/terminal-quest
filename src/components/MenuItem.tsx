import React from 'react';
import { Text } from 'ink';
import { colors } from '../utils/colors.js';

interface MenuItemProps {
  label: string;
  isSelected: boolean;
  isLocked?: boolean;
  description?: string;
}

export function MenuItem({ label, isSelected, isLocked, description }: MenuItemProps) {
  const prefix = isSelected ? '▸ ' : '  ';
  const color = isLocked ? colors.muted : isSelected ? colors.primary : colors.file;

  return (
    <Text>
      <Text color={color} bold={isSelected}>
        {prefix}{label}
      </Text>
      {isLocked && <Text color={colors.muted}> 🔒</Text>}
      {description && !isLocked && (
        <Text color={colors.muted}> - {description}</Text>
      )}
    </Text>
  );
}
