"use client"

import React, { useEffect, useState } from 'react'
import { useModalTutorial } from '@/features/tutorial//hooks/useModalTutorial';
import Modal from '@/features/tutorial/components/Modal';
import HomeContent from '@/features/tutorial/components/HomeContent';
import { ModeContent } from '@/features/tutorial/components/ModeContent';
import { Mode } from '@/types/interface';
import { getModes } from '@/lib/api/getModes';

const ModalTutorial: React.FC = () => {
  const { isModalOpen, currentPage, openModal, closeModal, setPage } = useModalTutorial();
  const [modes, setModes] = useState<Mode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    async function fetchModes() {
      try {
        const fetchedModes = await getModes();
        setModes(fetchedModes);
      } catch (error) {
        console.error('Failed to fetch modes:', error);
        setError('モードの取得に失敗しました');
      } finally {
        setIsLoading(false);
      }
    }

    fetchModes();
  }, []);

  const handleOpenModal = () => {
    if (isLoading) {
      return; // ローディング中はモーダルを開かない
    }
    if (error) {
      alert(error); // エラーがある場合はアラートを表示
      return;
    }
    openModal();
  };

  return (
    <>
      <button
        className="transition-colors hover:text-gray-300"
        onClick={handleOpenModal}
      >
        {isLoading ? (
          <span className="loading loading-spinner loading-xs"></span>
        ) : (
          '遊び方'
        )}
      </button>
      {isModalOpen && !isLoading && !error && (
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