import ResultContent from '@/features/game/components/ResultContent';
import { getDifficulties } from '@/lib/api/getDifficulties';
import { getModes } from '@/lib/api/getModes';
import { getProfile } from '@/lib/api/getProfile'
import React from 'react'

const Result = async () => {
  const userInfo = await getProfile();
  const modes = await getModes();
  const difficulties = await getDifficulties();

  return (
    <div>
      <ResultContent
        userInfo={userInfo}
        modes={modes}
        difficulties={difficulties}
      />
    </div>
  )
}

export default Result