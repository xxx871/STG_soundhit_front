import { http, HttpResponse } from "msw";

export const contactHandlers = [
  http.post("/api/contact", async ({ request }) => {
    const { email, message } = await request.json() as { email: string; message: string };
    if (email && message) {
      return HttpResponse.json({status: 200 });
    } else {
      return HttpResponse.json({ status: "error", message: "Invalid input" }, { status: 400 });
    }
  })
];

export const errorContactHandlers = http.post("/api/contact", () => {
  return HttpResponse.json({ status: "error", message: "Invalid input" }, { status: 400 });
});