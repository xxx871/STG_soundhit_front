"use client"

import React from 'react'
import { useModalTutorial } from '../hooks/useModalTutorial';
import Modal from './Modal';
import HomeContent from './HomeContent';
import { ModeContent } from './ModeContent';
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