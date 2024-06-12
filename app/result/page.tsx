import ResultContent from '@/features/game/components/ResultContent';
import { getNotes } from '@/lib/api/getNotes';
import { getProfile } from '@/lib/api/getProfile'
import React from 'react'

const Result = async () => {
  const userInfo = await getProfile();
  const notes = await getNotes();

  return (
    <div>
      <ResultContent
        userInfo={userInfo}
        notes={notes}
      />
    </div>
  )
}

export default Result