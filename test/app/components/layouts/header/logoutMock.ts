import { http, HttpResponse } from "msw";

export const logoutHandlers = [
  http.delete("/auth/sign_out", ({ request }) => {
    const headers = request.headers;
    const uid = headers.get('uid');
    const client = headers.get('client');
    const accessToken = headers.get('access-token');

    if (uid && client && accessToken) {
      return HttpResponse.json({}, { status: 200 });
    } else {
      return HttpResponse.json({ errors: ["User was not found or was not logged in."] }, { status: 404 });
    }
  })
];

export const errorLogoutHandlers = http.delete("/auth/sign_out", () => {
  return HttpResponse.json({ errors: ["Internal server error"] }, { status: 500 });
});