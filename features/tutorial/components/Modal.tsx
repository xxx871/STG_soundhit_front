import React from 'react'

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div
      className="fixed inset-0 bg-gray-800/50 flex items-center justify-center text-black z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white p-4 rounded shadow-lg w-[600px] h-[500px] relative overflow-auto">
        <button
          className="absolute top-3 right-3 bg-red-500 px-2 py-1 rounded text-white"
          onClick={onClose}
        >
          ✖
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;