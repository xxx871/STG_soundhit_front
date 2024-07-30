"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import EasyGame from './EasyGame';
import MediumGame from './MediumGame';
import HardGame from './HardGame';
import { GameUser, Note } from '@/types/interface';
import VoiceAnalysis from '../../components/VoiceAnalysis';
import useMatchCount from '../../hooks/useMatchCount';
import { LoadingButton } from '@/app/components/elements/LoadingButton';

interface GameContainerProps {
  userInfo: GameUser;
  notes: Note[];
}

const GameContainer: React.FC<GameContainerProps> = ({ userInfo, notes }) => {
  const searchParams = useSearchParams();
  const difficulty = searchParams.get('difficultyId');
  const mode = searchParams.get('modeId');
  const genderId = searchParams.get('genderId');
  const router = useRouter();
  const [targetNote, setTargetNote] = useState<string | null>(null);
  const [isMatch, setIsMatch] = useState<boolean | null>(null);
  const [detectedPitches, setDetectedPitches] = useState<number[]>([]);
  const { matchCount, incrementMatchCount, resetMatchCount } = useMatchCount();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handlePlayNote = (note: string) => {
    setTargetNote(note);
  };

  const handleAnalysisResult = (result: boolean) => {
    setIsMatch(result);
    if (result) {
      incrementMatchCount();
    } else {
      resetMatchCount();
    }
  };

  const handlePitchDetected = (pitch: number) => {
    setDetectedPitches(prevPitches => [...prevPitches, pitch]);
  };

  const handleResultClick = () => {
    setIsLoading(true);
    const queryParams = new URLSearchParams({
      difficultyId: difficulty || '',
      modeId: mode || '',
      genderId: genderId || '',
    }).toString();
    router.push(`/result?${queryParams}`);
  };

  const renderGameComponent = () => {
    const difficultyNumber = difficulty ? parseInt(difficulty, 10) : 0;
    switch (difficultyNumber) {
      case 1:
        return <EasyGame userInfo={userInfo} onPlayNote={handlePlayNote}/>
      case 2:
        return <MediumGame userInfo={userInfo} onPlayNote={handlePlayNote}/>
      case 3:
        return <HardGame userInfo={userInfo} notes={notes} onResult={handleAnalysisResult} onPitchDetected={handlePitchDetected}/>
      default:
        return <p>Invalid difficulty level</p>
    }
  };

  return (
    <div className="text-white">
      <div>
        {renderGameComponent()}
        {targetNote && (
          <VoiceAnalysis
            targetNote={targetNote}
            notes={notes}
            onResult={handleAnalysisResult}
            onPitchDetected={handlePitchDetected}
            difficulty={difficulty}
          />
        )}
        {isMatch !== null && (
          <div className="w-72 mx-auto text-2xl text-slate-300 text-center">
            <div>{isMatch ? '一致' : '不一致'}</div>
            <LoadingButton
              onClick={handleResultClick}
              className="w-72 text-2xl text-center"
              isLoading={isLoading}
            >
              結果へ進む
            </LoadingButton>
          </div>
        )}
      </div>
    </div>
  )
}

export default GameContainer