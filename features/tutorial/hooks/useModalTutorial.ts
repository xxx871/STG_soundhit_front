import { useState } from "react";
import { Page } from "../utils/types";

export const useModalTutorial = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentPage('home');
  };

  return {
    isModalOpen,
    currentPage,
    openModal,
    closeModal,
    setPage: setCurrentPage,
  };
};
