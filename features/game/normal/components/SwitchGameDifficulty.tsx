"use client"

import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import EasyGame from './EasyGame';
import MediumGame from './MediumGame';
import HardGame from './HardGame';
import { GameUser } from '@/types/interface';

interface SwitchGameDifficultyProps {
  userInfo: GameUser;
}

const SwitchGameDifficulty: React.FC<SwitchGameDifficultyProps> = ({ userInfo }) => {
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
      </div>
    </div>
  )
}

export default SwitchGameDifficulty