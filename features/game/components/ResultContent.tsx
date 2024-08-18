"use client"

import { Difficult, Mode, User } from '@/types/interface'
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { updateScore } from '@/features/game/api/updateScore';
import { Button } from '@/components/ui/button';
import { XIcon, TwitterShareButton, LineShareButton, LineIcon } from 'react-share';
import { LoadingButton } from '@/app/components/elements/LoadingButton';

interface resultContentProps {
  userInfo: User;
  modes: Mode[];
  difficulties: Difficult[];
}

const ResultContent: React.FC<resultContentProps> = ({ userInfo, modes, difficulties }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const modeId = parseInt(searchParams.get('modeId') || '0', 10);
  const difficultyId = parseInt(searchParams.get('difficultyId') || '0', 10);
  const genderId = parseInt(searchParams.get('genderId') || '', 10);
  const matchCount = parseInt(sessionStorage.getItem('matchCount') || '0', 10);

  useEffect(() => {
    if (userInfo && modeId > 0 && difficultyId > 0 && matchCount > 0) {
      updateScore(modeId, difficultyId, matchCount)
        .catch(error => console.error("Failed to update score", error));
    }
  }, [userInfo, modeId, difficultyId, matchCount]);

  const handleBackToHome = () => {
    sessionStorage.removeItem('matchCount');
    router.push('/');
  };

  const handlePlayAgain= () => {
    setIsLoading(true);
    router.push(`/normal?modeId=${modeId}&difficultyId=${difficultyId}&genderId=${genderId}`);
  }

  const modeName = modes.find(mode => mode.id === modeId)?.name;
  const difficultyName = difficulties.find(difficulty => difficulty.id === difficultyId)?.name;

  const tweetText = `私は「音ピシャ」の「${modeName}」モード・「${difficultyName}」難易度で連続${matchCount}回一致しました！あなたも挑戦してみてください！`;
  const shareUrl = `${window.location.protocol}//${window.location.host}`;

  return (
    <main>
      <h1 className="text-white text-center mt-16 text-4xl font-medium">結果画面</h1>
      <div>
        <div className="text-white text-3xl mt-8 text-center">
          <p className="mb-2">モード: {modeName}</p>
          <p className="mb-2">難易度: {difficultyName}</p>
          <p>連続で一致した回数: {matchCount}</p>
        </div>

        <div className="text-white flex items-center justify-center mt-6 font-bold">
        <TwitterShareButton
            url={shareUrl}
            title={tweetText}
            className="flex items-center"
          >
            <XIcon size={32} round={true} />
            <span className="ml-2">で共有</span>
          </TwitterShareButton>
          <LineShareButton
            url={shareUrl}
            title={tweetText}
            className="flex items-center ml-4"
          >
            <LineIcon size={32} round={true} />
            <span className="ml-2">で共有</span>
          </LineShareButton>
        </div>

        <div className="flex items-center justify-center mt-10 gap-4">
          <Button
            variant="outline"
            onClick={handleBackToHome}
            className="w-40 h-12 bg-blue-500 text-white text-lg hover:bg-blue-600 transition-colors duration-200"
          >
            トップページへ戻る
          </Button>
          <LoadingButton
            variant="outline"
            onClick={handlePlayAgain}
            className="w-40 h-12 bg-green-400 text-white text-lg hover:bg-green-600 transition-colors duration-200"
            isLoading={isLoading}
          >
            もう一度遊ぶ
          </LoadingButton>
        </div>

      </div>
    </main>
  )
};

export default ResultContent;