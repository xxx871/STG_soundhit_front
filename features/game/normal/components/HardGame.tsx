import { GameUser, Note } from '@/types/interface'
import React from 'react'
import { useGameLogic } from '../../hooks/useGameLogic';
import GameBase from './GameBase';
import VoiceAnalysis from '../../components/VoiceAnalysis';

interface HardGameProps {
  userInfo: GameUser;
  notes: Note[];
  onResult: (isMatch: boolean) => void;
  onPitchDetected: (pitch: number, note: string) => void;
}

const HardGame: React.FC<HardGameProps> = ({ userInfo, notes, onResult, onPitchDetected }) => {
  const { noteInfo } = useGameLogic(userInfo);

  return (
    <div>
      <GameBase noteInfo={noteInfo} playNote={() => {}} showPlayButton={false}>
        {noteInfo && (
          <VoiceAnalysis
            targetNote={noteInfo.en_note_name}
            notes={notes}
            onResult={onResult}
            onPitchDetected={onPitchDetected}
            difficulty="3"
          />
        )}
      </GameBase>
    </div>
  );
};

export default HardGame;