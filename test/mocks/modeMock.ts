import { http, HttpResponse } from "msw";

const modes = [
  { id: 1, name: '通常' },
  { id: 2, name: 'ハモり' },
  { id: 3, name: '練習' },
];

export const modeHandlers = [
  http.get("/modes", () => {
    return HttpResponse.json(modes, { status: 200 })
  })
];

export const errorModeHandler = http.get("/modes", () => {
  return HttpResponse.json([...modes, { id: 999, name: '無効なモード' }], { status: 200 })
});