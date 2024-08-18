import { Note } from '@/types/interface';
import React from 'react';
import { useKeyboard } from '@/features/keyboard/hooks/useKeyboard';
import { Button } from '@/components/ui/button';
import KeyboardModal from '@/features/keyboard/components/KeyboardModal';

const Keyboard: React.FC<{ notes: Note[] }> = ({ notes }) => {
  const { isModalOpen, openModal, closeModal } = useKeyboard();

  return (
    <div>
      <Button
        type="button"
        className="w-30 h-10 text-lg rounded-full flex items-center justify-center transition-all hover:scale-105"
        onClick={openModal}
      >
        キーボードを表示
      </Button>
      {isModalOpen && (
        <KeyboardModal notes={notes} onClose={closeModal} />
      )}
    </div>
  );
};


export default Keyboard;
