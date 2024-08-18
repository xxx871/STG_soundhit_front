import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';

export interface NoteInfoProps {
  en_note_name: string;
  ja_note_name: string;
  frequency: number;
}

interface GameBaseProps {
  noteInfo: NoteInfoProps | null;
  playNote: () => void;
  showPlayButton?: boolean;
  children?: React.ReactNode;
}

const GameBase: React.FC<GameBaseProps> = ({ noteInfo, playNote, showPlayButton = true, children }) => {
  return (
    <main className="flex flex-col items-center justify-center w-full">
      <div className="w-full max-w-3xl flex flex-col items-center">
        {noteInfo && (
          <div className="flex justify-around items-center w-full mb-4">
            <div className="text-white">
              <p className="text-xl font-semibold">現在の音</p>
              <p className="text-6xl font-bold">{noteInfo.ja_note_name}({noteInfo.en_note_name})</p>
              <p className="text-xl ml-3">周波数 {noteInfo.frequency} Hz</p>
            </div>
            {showPlayButton && (
              <div className="flex flex-col items-center">
                <Button
                  variant="outline"
                  onClick={playNote}
                  className="w-20 h-20 border-2 border-black rounded-full flex items-center justify-center transition-all hover:scale-105 mt-4"
                >
                  <Image
                    src="/speaker.png"
                    alt="音を再生"
                    width={40}
                    height={40}
                  />
                </Button>
                <p className="text-white text-center">クリックして音を確認！</p>
              </div>
            )}
          </div>
        )}
        <div className="w-full flex justify-center">
          {children}
        </div>
      </div>
    </main>
  )
};

export default GameBase;