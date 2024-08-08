"use client"

import React from 'react'
import { useModalTutorial } from '../hooks/useModalTutorial';
import Modal from './Modal';
import HomeContent from './HomeContent';
import { ModeContent } from './ModeContent';

const ModalTutorial = () => {
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
            <HomeContent onModeSelect={setPage} />
          ) : (
            <ModeContent mode={currentPage} onBack={() => setPage('home')} />
          )}
        </Modal>
      )}
    </>
  );
};

export default ModalTutorial;