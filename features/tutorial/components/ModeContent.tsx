import React from 'react'
import { Page } from '@/features/tutorial/utils/types'
import NormalModeContent from '@/features/tutorial/components/NormalModeContent';
import PracticeModeContent from '@/features/tutorial/components/PracticeModeContent';
import HarmonyModeContent from '@/features/tutorial/components/HarmonyModeContent';
import { Mode } from '@/types/interface';

interface ModeContentProps {
  mode: Page;
  modes: Mode[];
  onBack: () => void;
}

export const ModeContent: React.FC<ModeContentProps> = ({ mode, modes, onBack }) => {
  const currentMode = modes.find(m => m.id.toString() === mode);

  if (!currentMode) {
    return <div>モードが見つかりません: {mode}</div>;
  }

  switch (mode) {
    case '1':
      return <NormalModeContent mode={currentMode} onBack={onBack} />;
    case '2':
      return <HarmonyModeContent mode={currentMode} onBack={onBack} />;
    case '3':
      return <PracticeModeContent mode={currentMode} onBack={onBack} />;
    default:
      return <div>不明なモード: {mode}</div>;
  }
};