import { Note } from '@/types/interface'
import React from 'react'
import { useKeyboard } from '../hooks/useKeyboard';
import { Button } from '@/components/ui/button';
import KeyboardModal from './KeyboardModal';

const Keyboard: React.FC<{ notes: Note[] }> = ({ notes }) => {
  const { isModalOpen, openModal, closeModal } = useKeyboard();

  return (
    <div>
      <Button type="button" onClick={openModal}>
        キーボードを表示
      </Button>
      {isModalOpen && (
        <KeyboardModal notes={notes} onClose={closeModal} />
      )}
    </div>
  );
};


export default Keyboard;