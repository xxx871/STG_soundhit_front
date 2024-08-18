"use client"

import React from 'react'
import { useModalTutorial } from '@/features/tutorial//hooks/useModalTutorial';
import Modal from '@/features/tutorial/components/Modal';
import HomeContent from '@/features/tutorial/components/HomeContent';
import { ModeContent } from '@/features/tutorial/components/ModeContent';
import { Mode } from '@/types/interface';

interface ModalTutorialProps {
  modes: Mode[];
}

const ModalTutorial: React.FC<ModalTutorialProps> = ({ modes }) => {
  const { isModalOpen, currentPage, openModal, closeModal, setPage } = useModalTutorial();

  return (
    <>
      <button
        className="transition-colors hover:text-gray-300"
        onClick={openModal}
      >
        遊び方
      </button>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          {currentPage === 'home' ? (
            <HomeContent modes={modes} onModeSelect={setPage} />
          ) : (
            <ModeContent mode={currentPage} modes={modes} onBack={() => setPage('home')} />
          )}
        </Modal>
      )}
    </>
  );
};

export default ModalTutorial;