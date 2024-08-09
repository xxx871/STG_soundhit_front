import React from 'react'
import { Page } from '../utils/types'
import NormalModeContent from './NormalModeContent';
import PracticeModeContent from './PracticeModeContent';
import HarmonyModeContent from './HarmonyModeContent';
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