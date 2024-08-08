import React, { useState } from 'react';

const PracticeModeContent: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [page, setPage] = useState(1);

  const renderContent = () => {
    switch (page) {
      case 1:
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl mb-6 text-center">練習モード</h2>
            <div className="text-lg font-normal text-center mb-6">
              <p>練習モードは現在開発中です。</p>
            </div>
            <div className="flex justify-between w-full">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded text-xl w-[30%]"
                onClick={onBack}
              >
                戻る
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded text-xl w-[30%]"
                onClick={onBack}
              >
                ホームに戻る
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return <>{renderContent()}</>;
};

export default PracticeModeContent;