import { http, HttpResponse } from "msw";

export const signupHandlers = [
  http.post("/auth", async ({ request }) => {
    const { name, email, password, password_confirmation } = await request.json() as {
      name: string;
      email: string;
      password: string;
      password_confirmation: string;
    };
    if (email === "test@example.com" && password === password_confirmation) {
      return HttpResponse.json({ status: 200, message: "登録に成功しました。" });
    } else {
      return HttpResponse.json({ status: "error", message: "登録に失敗しました。"}, { status: 400 });
    }
  })
];

export const errorSignupHandlers = http.post("/auth", () => {
  return HttpResponse.json({ status: "error", message: "サーバーエラー" }, { status: 500 });
});