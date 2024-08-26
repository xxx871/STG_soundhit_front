import { http, HttpResponse } from "msw";

const difficulties = [
  { id: 1, name: '簡単' },
  { id: 2, name: '普通' },
  { id: 3, name: '難しい' },
];

export const difficultyHandlers = [
  http.get("/difficulties", () => {
    return HttpResponse.json(difficulties, { status: 200 })
  })
];

export const errorDifficultyHandler = http.get("/difficulties", () => {
  return HttpResponse.json([...difficulties, { id: 999, name: '無効な難易度' }], { status: 200 })
});