import GameContainer from '@/features/game/normal/components/GameContainer'
import { getNotes } from '@/lib/api/getNotes';
import { getProfile } from '@/lib/api/getProfile'
import React from 'react'

const Normal = async () => {
  const userInfo = await getProfile();
  const notes = await getNotes();

  return (
    <div className="flex justify-center items-center mt-4">
      <GameContainer userInfo={userInfo} notes={notes}/>
    </div>
  )
};

export default Normal;