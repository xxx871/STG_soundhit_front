import { http, HttpResponse } from "msw";

export const loginHandlers = [
  http.post("/auth/sign_in", async ({ request }) => {
    const { email, password } = await request.json() as { email: string; password: string };
    if (email === "test@example.com" && password === "password123") {
      return HttpResponse.json({ status: 200, message: "Login successful" });
    } else {
      return HttpResponse.json({ status: "error", message: "ログインに失敗しました。" }, { status: 400 });
    }
  })
];

export const errorLoginHandlers = http.post("/auth/sign_in", () => {
  return HttpResponse.json({ status: "error", message: "Server error" }, { status: 500 });
});