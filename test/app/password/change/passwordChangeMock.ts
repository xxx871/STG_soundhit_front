import { http, HttpResponse } from "msw";

export const passwordChangeHandlers = [
  http.put("/auth/password", async ({ request }) => {
    const { password, password_confirmation } = await request.json() as { password: string, password_confirmation: string };
    if (password === password_confirmation) {
      return HttpResponse.json({ status: 200, message: "パスワードが正常に変更されました。" });
    } else {
      return HttpResponse.json({ status: "error", message: "パスワードが一致しません。" }, { status: 400 });
    }
  })
];

export const errorPasswordChangeHandlers = http.put("/auth/password", () => {
  return HttpResponse.json({ status: "error", message: "サーバーエラーが発生しました。" }, { status: 500 });
});