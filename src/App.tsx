import React from 'react';
import { Box } from 'ink';
import { useGameState } from './state/useGameState.js';
import { TitleScreen } from './screens/TitleScreen.js';
import { StorySelectScreen } from './screens/StorySelectScreen.js';
import { MissionBriefScreen } from './screens/MissionBriefScreen.js';
import { TerminalScreen } from './screens/TerminalScreen.js';
import { MissionCompleteScreen } from './screens/MissionCompleteScreen.js';
import { ProgressScreen } from './screens/ProgressScreen.js';
import { SettingsScreen } from './screens/SettingsScreen.js';

export function App() {
  const {
    screen,
    progress,
    navigateTo,
    completeMission,
    completeStory,
    incrementCommands,
    resetAll,
  } = useGameState();

  const renderScreen = () => {
    switch (screen.type) {
      case 'title':
        return <TitleScreen onNavigate={navigateTo} />;
      case 'storySelect':
        return <StorySelectScreen progress={progress} onNavigate={navigateTo} />;
      case 'missionBrief':
        return (
          <MissionBriefScreen
            storyId={screen.storyId}
            missionIndex={screen.missionIndex}
            onNavigate={navigateTo}
          />
        );
      case 'terminal':
        return (
          <TerminalScreen
            storyId={screen.storyId}
            missionIndex={screen.missionIndex}
            onNavigate={navigateTo}
            onMissionComplete={completeMission}
            onStoryComplete={completeStory}
            onCommandExecuted={incrementCommands}
          />
        );
      case 'missionComplete':
        return (
          <MissionCompleteScreen
            storyId={screen.storyId}
            missionIndex={screen.missionIndex}
            commandCount={screen.commandCount}
            onNavigate={navigateTo}
          />
        );
      case 'progress':
        return <ProgressScreen progress={progress} onNavigate={navigateTo} />;
      case 'settings':
        return <SettingsScreen onNavigate={navigateTo} onReset={resetAll} />;
    }
  };

  return <Box flexDirection="column">{renderScreen()}</Box>;
}
