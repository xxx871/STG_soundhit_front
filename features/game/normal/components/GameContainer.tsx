"use client"

import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import EasyGame from './EasyGame';
import MediumGame from './MediumGame';
import HardGame from './HardGame';
import { GameUser, Note } from '@/types/interface';
import VoiceAnalysis from '../../components/VoiceAnalysis';

interface GameContainerProps {
  userInfo: GameUser;
  notes: Note[];
}

const GameContainer: React.FC<GameContainerProps> = ({ userInfo, notes }) => {
  const searchParams = useSearchParams();
  const difficulty = searchParams.get('difficultyId');
  const [targetNote, setTargetNote] = useState<string | null>(null)

  const handlePlayNote = (note: string) => {
    setTargetNote(note);
  };

  const renderGameComponent = () => {
    const difficultyNumber = difficulty ? parseInt(difficulty, 10) : 0;
    switch (difficultyNumber) {
      case 1:
        return <EasyGame userInfo={userInfo} onPlayNote={handlePlayNote}/>
      case 2:
        return <MediumGame />
      case 3:
        return <HardGame />
      default:
        return <p>Invalid difficulty level</p>
    }
  };

  return (
    <div className="text-white">
      <div>
        {renderGameComponent()}
        <h2 className="text-white text-center mt-16">音が流れた後、ボタンを押して音声を入力</h2>
        {targetNote && (
          <VoiceAnalysis
            targetNote={targetNote}
            notes={notes}
          />
        )}
      </div>
    </div>
  )
}

export default GameContainer