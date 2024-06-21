"use client"

import { Difficult, Mode, User } from '@/types/interface'
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { updateScore } from '../api/updateScore';
import { Button } from '@/components/ui/button';
import { XIcon, TwitterShareButton, LineShareButton, LineIcon } from 'react-share';

interface resultContentProps {
  userInfo: User;
  modes: Mode[];
  difficulties: Difficult[];
}

const ResultContent: React.FC<resultContentProps> = ({ userInfo, modes, difficulties }) => {
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
    router.push(`/normal?modeId=${modeId}&difficultyId=${difficultyId}&genderId=${genderId}`);
  }

  const modeName = modes.find(mode => mode.id === modeId)?.name;
  const difficultyName = difficulties.find(difficulty => difficulty.id === difficultyId)?.name;

  const tweetText = `私は「音ピシャ」の「${modeName}」モード・「${difficultyName}」難易度で連続${matchCount}回一致しました！あなたも挑戦してみてください！`;
  const shareUrl = `${window.location.protocol}//${window.location.host}`;

  return (
    <main className="text-white">
      <h1 className="text-center mb-5 text-3xl font-medium mt-4">結果画面</h1>
      <div className="w-72 mx-auto text-2xl text-slate-300 text-center mt-16">
        <div>
          <p>モード: {modeName}</p>
          <p>難易度: {difficultyName}</p>
          <p>連続で一致した回数: {matchCount}</p>
        </div>
        <div className="mt-16">
          <Button onClick={handleBackToHome} className="mt-4 p-2 bg-blue-500 text-white">
            トップページへ戻る
          </Button>
          <Button onClick={handlePlayAgain}>
            もう一度遊ぶ
          </Button>
        </div>
        <div className="flex items-center justify-center mt-4">
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
      </div>
    </main>
  )
}

export default ResultContent