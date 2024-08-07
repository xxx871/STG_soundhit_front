"use client"

import { LoadingButton } from '@/app/components/elements/LoadingButton';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue, SelectGroup } from '@/components/ui/select';
import { Mode } from '@/types/interface';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { combineModeWithDescription, ModeWithDescription } from '../utils/combineWithDescription';

export interface ModeSelectProps {
  modes: Mode[];
}

export const ModeSelect = ({ modes }: ModeSelectProps) => {
  const modesWithDescriptions = modes.map(combineModeWithDescription);
  const [selectedMode, setSelectedMode] = useState<ModeWithDescription | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleModeSelect = (modeId: string) => {
    const mode = modesWithDescriptions.find(mode => mode.id.toString() === modeId);
    setSelectedMode(mode || null);
  };

  const handleStartClick = async () => {
    if (selectedMode) {
      setIsLoading(true);
      let path = '';
      switch (selectedMode.id) {
        case 1:
          path = '/default';
          break;
        case 2:
          path = '/harmony';
          break;
        case 3:
          path = '/practice';
          break;
        default:
          alert('無効なモードです');
          setIsLoading(false);
          return;
      }
      await router.push(`${path}?modeId=${selectedMode.id}`);
    } else {
      alert('モードを選択してください');
    }
  };

  return (
    <div className="flex flex-col items-center text-black w-full">
      <div className="w-60 mx-auto">
        <label className="text-xl text-white">モード</label>
      <Select onValueChange={handleModeSelect}>
        <SelectTrigger className="w-full text-lg text-center justify-center">
          <SelectValue placeholder="モードを選択してください" />
        </SelectTrigger>
        <SelectContent className="w-60">
          <SelectGroup>
            {modes.map((mode) => (
              <SelectItem key={mode.id} value={mode.id.toString()} className="">
                {mode.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      </div>

      {selectedMode && (
        <div className="text-center max-w-md text-white mt-1">
          <p className="text-base whitespace-pre-line">{selectedMode.description}</p>
        </div>
      )}

      <div className="mt-6">
      <LoadingButton
          variant="outline"
          className="w-32 h-12 text-xl rounded-full flex items-center justify-center transition-all hover:scale-105"
          isLoading={isLoading}
          onClick={handleStartClick}
        >
          START
        </LoadingButton>
      </div>
    </div>
  );
};

export default ModeSelect;