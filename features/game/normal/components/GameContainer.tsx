"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import EasyGame from '@/features/game/normal/components/EasyGame';
import MediumGame from '@/features/game/normal/components/MediumGame';
import HardGame from '@/features/game/normal/components/HardGame';
import { GameUser, Note } from '@/types/interface';
import VoiceAnalysis from '@/features/game/components/VoiceAnalysis';
import useMatchCount from '@/features/game/hooks/useMatchCount';
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
    <div className="flex flex-col items-center w-full"  >
      <div className="w-full max-w-md">
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
          <div className="w-72 mx-auto text-2xl text-center mt-2">
            <div className="text-white font-extrabold mb-1">{isMatch ? '一致' : '不一致'}</div>
            <LoadingButton
              variant="outline"
              onClick={handleResultClick}
              className="w-72 h-12 border-2 border-black text-xl font-bold rounded-ld items-center justify-center transition-all hover:scale-105"
              isLoading={isLoading}
            >
              結果画面へ
            </LoadingButton>
          </div>
        )}
      </div>
    </div>
  )
};

export default GameContainer;