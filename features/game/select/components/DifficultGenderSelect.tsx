"use client"

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import DifficultySelect from '@/features/game/select/components/DifficultySelect';
import GenderSelect from '@/features/game/select/components/GenderSelect';
import { LoadingButton } from '@/app/components/elements/LoadingButton';
import { combineDifficultWithDescription, combineGenderWithDescription, DifficultWithDescription, GenderWithDescription } from '@/features/game/select/utils/combineWithDescription';

interface DifficultGenderSelectProps {
  genders: { id: number; name: string }[];
  difficulties: { id: number; name: string }[];
  userInfo: any;
  modes: { id: number; name: string }[];
}

export const DifficultGenderSelect: React.FC<DifficultGenderSelectProps> = ({
  genders,
  difficulties,
  userInfo,
}) => {
  const difficultiesWithDescriptions = difficulties.map(combineDifficultWithDescription);
  const gendersWithDescriptions = genders.map(combineGenderWithDescription);
  const [selectedDifficult, setSelectedDifficult] = useState<DifficultWithDescription | null>(null);
  const [selectedGender, setSelectedGender] = useState<GenderWithDescription | null>(null);
  const [showGenderSelect, setShowGenderSelect] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const modeId = searchParams.get('modeId');

  const handleDifficultySelect = (difficultyId: string) => {
    const difficulty = difficultiesWithDescriptions.find(d => d.id.toString() === difficultyId);
    setSelectedDifficult(difficulty || null);
  };

  const handleGenderSelect = (genderId: string) => {
    const gender = gendersWithDescriptions.find(g => g.id.toString() === genderId);
    setSelectedGender(gender || null);
  };

  useEffect(() => {
    setShowGenderSelect(!userInfo || !userInfo.user_low_note && !userInfo.user_high_note && !userInfo.gender_id );
  }, [userInfo]);

  const handleStartClick = () => {
    if (!selectedDifficult) {
      alert('難易度を選択してください');
      return;
    }
    if (showGenderSelect && !selectedGender) {
      alert('性別を選択してください');
      return;
    }
    setIsLoading(true);
    const path = `/normal?modeId=${modeId}&difficultyId=${selectedDifficult.id}&genderId=${showGenderSelect ? selectedGender?.id : ''}`;
    router.push(path);
  };

  return (
    <div className="flex flex-col items-center justify-center text-black">
      <div className="w-full max-w-md px-4"></div>
        <h2 className="text-white text-center mt-8 text-3xl font-medium">
          通常モード
        </h2>
        <div className="mt-8 w-60 mx-auto">  
          <label className="text-white text-xl">難易度</label>
          <DifficultySelect difficulties={difficultiesWithDescriptions} onSelect={handleDifficultySelect} />
        </div>

        {selectedDifficult && (
            <div className="text-center max-w-md text-white mt-1">
              <p className="text-base whitespace-pre-line">{selectedDifficult.description}</p>
            </div>
          )}

        {showGenderSelect && (
          <div className="mt-4 w-60 mx-auto">
            <label className="text-white text-xl">性別</label>
            <GenderSelect genders={gendersWithDescriptions} onSelect={handleGenderSelect} />
            {selectedGender && (
              <div className="text-center text-white mt-1 absolute left-0 right-0">
                <p className="text-base whitespace-nowrap overflow-hidden text-ellipsis">
                  {selectedGender.description}
                </p>
              </div>
            )}
          </div>
        )}
          <div className="flex justify-center mt-16">
          <LoadingButton
            variant="outline"
            onClick={handleStartClick}
            className="w-32 h-12 text-xl rounded-full flex items-center justify-center transition-all hover:scale-105"
            isLoading={isLoading}
          >
            START
          </LoadingButton>
        </div>
      </div>
  )
};

export default DifficultGenderSelect;