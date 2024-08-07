export const modeDescriptions: { [key: number]: string } = {
  1: "標準的なゲームプレイを楽しめるモードです。\n出題される音と同じ高さの声を出しましょう。",
  2: "ハモりの練習をするモードです。\n出題される音の3音高い声を出しましょう。\n現在開発中！！",
  3: "スキルアップに最適な練習用モードです。\n鍵盤をクリックすると音が出て、\nマイクボタンを押すと声の高さを確認できます。\n現在開発中！！"
};

export const difficultyDescriptions: { [key: number]: string } = {
  1: "設定した音域の中から半音を除いた音が出題されます。",
  2: "設定した音域の中からランダムに出題されます。",
  3: "出題される音を聞くことができません。\n音感に自信のある方推奨。"
};

export const genderDescriptions: { [key: number]: string } = {
  1: "男性の平均的な声域（ソ2～ソ4）から出題されます。",
  2: "女性の平均的な声域（ソ3～ド5）から出題されます。"
};
