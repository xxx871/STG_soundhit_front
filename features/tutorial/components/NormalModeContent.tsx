import Image from 'next/image';
import React, { useState } from 'react'

const NormalModeContent: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [page, setPage] = useState(1);

  const renderContent = () => {
    switch (page) {
      case 1:
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl mb-2 text-center">通常モード(選択画面)</h2>
            <div className="text-base font-normal mb-6 text-center">
              <p>選択した難易度・性別に応じて出題される音が変わります。</p>
              <div className="mt-1">
                <h3 className="font-semibold">難易度</h3>
                <p>簡単：設定した音域の中から半音を除いた音が出題されます。</p>
                <p>普通：設定した音域の中からランダムに出題されます。</p>
                <p>難しい：出題される音が聞けないためお手本がありません。</p>
              </div>
              <div className="mt-1">
                <h3 className="font-semibold">性別</h3>
                <p>男性：男性の平均的な声域（ソ2～ソ4）から出題されます。</p>
                <p>女性：女性の平均的な声域（ソ3～ド5）から出題されます。</p>
              </div>
              <div className="mt-2 flex items-center flex-col">
                <Image
                  src="/tutorial_select.png"
                  alt="Tutorial Select"
                  width={350}
                  height={190}
                />
                
                <p className="text-red-500 font-bold">※音域はプロフィール画面でユーザーごとに設定することもできます。</p>
              </div>
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
                onClick={() => setPage(2)}
              >
                進む
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl mb-6 text-center">通常モード(ゲーム画面)</h2>
            <div className="text-base font-normal mb-2">
              <p>① 出題されている音階</p>
              <p>② クリックすると①の音を聞けます。</p>
              <p>③ ②の後、クリックすると録音が始まります。同じ高さの声を出しましょう。</p>
              <p>④ 判定の結果が出ます。</p>
              <p>⑤ 結果画面へ移動します。</p>
            </div>
            <div className="mt-2 flex items-center flex-col mb-8">
                <Image
                  src="/tutorial_game.png"
                  alt="Tutorial Game"
                  width={400}
                  height={400}
                />
              </div>
            <div className="flex justify-between w-full">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded text-xl w-[30%]"
                onClick={() => setPage(1)}
              >
                戻る
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded text-xl w-[30%]"
                onClick={() => setPage(3)}
              >
                進む
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl mb-6 text-center">通常モード(結果画面)</h2>
            <div className="text-base font-normal mb-2">
              <p>現在のモード・難易度・連続で一致した回数を確認することができます。</p>
              <p>過去の結果はプロフィールページやランキングページで見れて、またXや</p>
              <p>LINEでも共有できます。最高記録を達成したときはぜひ共有しましょう。</p>
              <p>「もう一度遊ぶ」ボタンを押すことでゲーム画面に戻れます。</p>
            </div>
            <div className="mt-2 flex items-center flex-col">
                <Image
                  src="/tutorial_result.png"
                  alt="Tutorial Result"
                  width={400}
                  height={400}
                />
              </div>
              <div className="text-base text-red-600 font-bold mb-6">
                <p >※注意！トップページに戻るやゲーム画面以外に移動すると連続記録が途切れます！</p>
              </div>
            <div className="flex justify-between w-full">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded text-xl w-[30%]"
                onClick={() => setPage(2)}
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

export default NormalModeContent;