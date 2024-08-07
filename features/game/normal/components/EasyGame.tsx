import { GameUser } from '@/types/interface';
import React from 'react'
import { useGameLogic } from '../../hooks/useGameLogic';
import GameBase from './GameBase';

interface EasyGameProps {
  onPlayNote: (note: string) => void;
  userInfo: GameUser;
}

const EasyGame: React.FC<EasyGameProps> = ({ userInfo, onPlayNote}) => {
  const { noteInfo, playNote } = useGameLogic(userInfo, true);
  return (
    <div className="w-full">
      <GameBase noteInfo={noteInfo} playNote={() => playNote(onPlayNote)} />
    </div>
  )
};

export default EasyGame;