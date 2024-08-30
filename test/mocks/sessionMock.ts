import { http, HttpResponse } from "msw";

export const sessionHandlers = [
  http.get("/auth/sessions", ({ request }) => {
    const headers = request.headers;
    const uid = headers.get('uid');
    const client = headers.get('client');
    const accessToken = headers.get('access-token');

    if (uid && client && accessToken) {
      return HttpResponse.json({ 
        status: 200, 
        is_login: true, 
        data: { 
          id: 1, 
          email: "test@example.com", 
          name: "Test User" 
        } 
      });
    } else {
      return HttpResponse.json({ status: 401, is_login: false }, { status: 401 });
    }
  })
];

export const errorSessionHandlers = http.get("/auth/sessions", () => {
  return HttpResponse.json({ status: "error", message: "Server error" }, { status: 500 });
});