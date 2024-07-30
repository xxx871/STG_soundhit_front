import { Button } from '@/components/ui/button';
import React from 'react';

export interface NoteInfoProps {
  en_note_name: string;
  ja_note_name: string;
  frequency: number;
}

interface GameBaseProps {
  noteInfo: NoteInfoProps | null;
  playNote: () => void;
  children?: React.ReactNode;
}

const GameBase: React.FC<GameBaseProps> = ({ noteInfo, playNote, children }) => {
  return (
    <main className="text-white">
      <div className="mt-16 w-72 mx-auto text-2xl text-slate-300 text-center">
        <Button variant="outline" onClick={playNote}>音を再生</Button>
        {noteInfo && (
        <div className="mt-4 text-center">
          <p>現在の音: {noteInfo.en_note_name}</p>
          <p>周波数: {noteInfo.frequency}</p>
          <p>日本語の音名: {noteInfo.ja_note_name}</p>
        </div>
      )}
      <h2 className="text-white text-center mt-10">音が流れた後、ボタンを押して音声を入力</h2>
      {children}
      </div>
    </main>
  )
}

export default GameBase