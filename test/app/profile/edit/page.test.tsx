import Edit from "@/app/profile/edit/page";
import { genderHandlers } from "@/test/mocks/genderMock";
import { setupMockDom } from "@/test/mocks/mockPointerEvent";
import { noteHandlers } from "@/test/mocks/noteMock";
import { ProfileHandlers, setupProfileMock } from "@/test/mocks/profileMock";
import { APIserver, mockRedirect } from "@/vitest-setup";
import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";

setupMockDom();

vi.mock("@/features/keyboard/components/Keyboard", () => ({
  default: vi.fn(() => <div data-testid="keyboard">Keyboard</div>),
}));

describe('プロフィール編集ページ', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    APIserver.resetHandlers();
    APIserver.use(...genderHandlers, ...noteHandlers)
  });

  test("ログインしていない場合、ログインページにリダイレクトされる", async () => {
    APIserver.use(setupProfileMock('notLoggedIn'));
    render(await Edit());
    expect(mockRedirect).toHaveBeenCalledWith("/login");
  });

  test("ユーザー名が正しく表示されている", async () => {
    APIserver.use(ProfileHandlers);
    render(await Edit());

    await waitFor(() => {
      expect(screen.getByText("ユーザー名")).toBeInTheDocument();
    })
  })
})