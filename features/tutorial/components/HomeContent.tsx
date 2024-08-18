import React from 'react'
import { Page } from '@/features/tutorial/utils/types';
import Image from 'next/image';
import { Mode } from '@/types/interface';

interface HomeContentProps {
  modes: Mode[];
  onModeSelect: (mode: Page) => void;
}

export const HomeContent: React.FC<HomeContentProps> = ({ modes, onModeSelect }) => {
  const getButtonColor = (index: number) => {
    const colors = ['bg-green-500', 'bg-blue-500', 'bg-yellow-500'];
    return colors [index % colors.length];
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl mb-4 text-center">遊び方</h2>
      <div className="flex justify-between w-full mb-4">
        {modes.map((mode, index) => (
          <button
            key={mode.id}
            className={`${getButtonColor(index)} px-4 py-2 rounded text-xl text-white w-[30%]`}
            onClick={() => onModeSelect(mode.id.toString() as Page)}
          >
            {mode.name}
          </button>
        ))}
      </div>
      <div className="text-base font-normal">
        <p>おんぴしゃは想定した音をぶれることなく出せるか練習・競うアプリです。</p>
        <p>主に音をランダムに出す機能と、一定の音量を超えた音の高さを測定する機能があります。</p>
        <div className="mt-6 flex items-center flex-col">
          <Image
            src="/tutorial_top.png"
            alt="Tutorial Top"
            width={300}
            height={300}
          />
          <p>トップページのドロップダウンから遊びたいモードを選択してください。</p>
          <p>各モードに関する詳しい説明は上部のボタンから選択してご覧できます。</p>
        </div>
      </div>
    </div>
  )
};

export default HomeContent;