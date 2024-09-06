import { http, HttpResponse } from "msw";


// 難易度選択画面ページテスト用
export const mockBaseProfile = {
  id: 1,
  name: 'TestUser',
  email: 'test@example.com',
  gender_id: null,
  user_high_note: null,
  user_low_note: null
};

export const mockProfileWithGender = {
  ...mockBaseProfile,
  gender_id: 1
};

export const mockProfileWithNotes = {
  ...mockBaseProfile,
  user_high_note: { id: 40, frequency: 932, ja_note_name: 'ラ#5', en_note_name: 'A#5' },
  user_low_note: { id: 7, frequency: 138, ja_note_name: 'ド#3', en_note_name: 'C#3' }
};

export const setupProfileMock = (profileType: 'base' | 'withGender' | 'withNotes' | 'notLoggedIn' | null = 'base') => {
  let profile;
  switch (profileType) {
    case 'base':
      profile = mockBaseProfile;
      break;
    case 'withGender':
      profile = mockProfileWithGender;
      break;
    case 'withNotes':
      profile = mockProfileWithNotes;
      break;
    case 'notLoggedIn':
    case null:
      profile = null;
      break;
    default:
      profile = mockBaseProfile;
  }

  return http.get("/user", () => {
    if (profile === null) {
      return HttpResponse.json(null, { status: 200 });
    }
    return HttpResponse.json(profile, { status: 200 });
  });
};

//プロフィールページテスト用
export const userData = {
  id: 1,
  name: 'test',
  email: 'test@example.com',
  gender_id: 1,
  gender: '男性',
  user_high_note: { id: 40, frequency: 932, ja_note_name: 'ラ#5', en_note_name: 'A#5' },
  user_low_note: { id: 7, frequency: 138, ja_note_name: 'ド#3', en_note_name: 'C#3' },
  scores: [ { mode: '通常', difficulty: '簡単', score: 4 } ]
};

export const ProfileHandlers = http.get("/user", () => {
  return HttpResponse.json(userData, { status: 200 })
});