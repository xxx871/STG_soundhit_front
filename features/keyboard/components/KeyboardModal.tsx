import React, { useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Note } from "@/types/interface";
import KeyboardKey from '@/features/keyboard/components/KeyboardKey';
import { useKeyboard } from '@/features/keyboard/hooks/useKeyboard';

interface KeyboardModalProps {
  notes: Note[];
  onClose: () => void;
}

const KeyboardModal: React.FC<KeyboardModalProps> = ({ notes, onClose }) => {
  const keyboardRef = useRef<HTMLDivElement>(null);
  const { handleKeyPress, handleKeyRelease } = useKeyboard();

  useEffect(() => {
    if (keyboardRef.current) {
      keyboardRef.current.scrollLeft = 0;
    }
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={onClose}>
      <div className="bg-white w-full max-w-7xl h-80 relative flex flex-col rounded-lg" onClick={e => e.stopPropagation()}>
        <Button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 bg-gray-300 rounded-full p-1 text-xl h-10 w-10"
        >
          ✖
        </Button>
        <h2 className="m-4 text-center mb-12 text-2xl">音階を選択してください</h2>
        <div ref={keyboardRef} className="flex-1 overflow-x-auto overflow-y-hidden flex justify-center">
          <div className="flex relative h-full">
            {notes.map((note) => (
              <KeyboardKey 
                key={note.id} 
                note={note} 
                onKeyPress={handleKeyPress} 
                onKeyRelease={handleKeyRelease} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyboardModal;
