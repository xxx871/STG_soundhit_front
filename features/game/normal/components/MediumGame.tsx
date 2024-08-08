import { GameUser } from '@/types/interface';
import React from 'react'
import { useGameLogic } from '../../hooks/useGameLogic';
import GameBase from './GameBase';

interface MediumGameProps {
  onPlayNote: (note: string) => void;
  userInfo: GameUser;
}

const MediumGame: React.FC<MediumGameProps> = ({ userInfo, onPlayNote }) => {
  const { noteInfo, playNote } = useGameLogic(userInfo);

  return (
    <div>
      <GameBase noteInfo={noteInfo} playNote={() => playNote(onPlayNote)} />
    </div>
  )
}

export default MediumGame;