import { http, HttpResponse } from "msw";

const userRankings = [
  {
    difficulty_id: 1,
    id: 1,
    mode_id: 1,
    score: 4,
    user: { name: 'test' },
    user_id: 1
  },
];

export const setupRanking = (rankingType: "normal" | "empty" = "normal" ) => {
  return (
    http.get("/scores/ranking", () => {
      if (rankingType === "empty") {
        return HttpResponse.json([], { status: 200 });
      }
      return HttpResponse.json(userRankings, { status: 200 });
    })
  );
};

export const RankingHandlers = http.get("/scores/ranking", () => {
  return HttpResponse.json(userRankings, { status: 200 });
});

export const errorRankingHandlers = http.get("/scores/ranking", () => {
  return HttpResponse.json({ status: "error", message: "ランキングデータの取得に失敗しました。" }, { status: 500 });
});