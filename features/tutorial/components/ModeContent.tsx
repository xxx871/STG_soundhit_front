import React from 'react'
import { Page } from '../utils/types'
import NormalModeContent from './NormalModeContent';
import PracticeModeContent from './PracticeModeContent';
import HarmonyModeContent from './HarmonyModeContent';

interface ModeContentProps {
  mode: Page;
  onBack: () => void;
}

export const ModeContent: React.FC<ModeContentProps> = ({ mode, onBack }) => {
  switch (mode) {
    case 'mode1':
      return <NormalModeContent onBack={onBack} />;
    case 'mode2':
      return <HarmonyModeContent onBack={onBack} />;
    case 'mode3':
      return <PracticeModeContent onBack={onBack} />;
    default:
      return null;
  }
};