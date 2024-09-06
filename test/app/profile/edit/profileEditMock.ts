import { userData } from "@/test/mocks/profileMock";
import { http, HttpResponse } from "msw"

export const setupEditProfileMock = (profileType: 'loggedIn' | 'notLoggedIn' = 'loggedIn') => {
  return http.get("/user", () => {
    if (profileType === 'notLoggedIn') {
      return HttpResponse.json(null, { status: 200 });
    }
    return HttpResponse.json(userData, { status: 200 });
  });
};

export const EditProfileHandlers = [
  http.get("/user", () => {
    return HttpResponse.json(userData, { status: 200 });
  }),
  http.put("/user", async ({ request }) => {
    const data = await request.json();
    return HttpResponse.json({ ...userData, data }, { status: 200});
  }),
];

export const errorEditProfileHandlers = [
  http.get("/user", () => {
    return HttpResponse.json(userData, { status: 200 });
  }),
  http.put("/user", () => {
    return HttpResponse.json({ error: "エラーが発生しました。もう一度お試しください。" }, { status: 500 });
  }),
];