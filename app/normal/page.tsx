import SwitchGameDifficulty from '@/features/game/normal/components/SwitchGameDifficulty'
import { getProfile } from '@/lib/api/getProfile'
import React from 'react'

const Normal = async () => {
  const userInfo = await getProfile();

  return (
    <div>
      <SwitchGameDifficulty userInfo={userInfo} />
      <h2 className="text-white text-center">音が流れた後、ボタンを押して音声を入力</h2>
    </div>
  )
}

export default Normal