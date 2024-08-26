import Default from "@/app/default/page";
import { difficultyHandlers } from "@/test/mocks/difficultyMock";
import { genderHandlers } from "@/test/mocks/genderMock";
import { setupMockDom } from "@/test/mocks/mockPointerEvent";
import { modeHandlers } from "@/test/mocks/modeMock";
import { setupProfileMock } from "@/test/mocks/profileMock";
import { APIserver } from "@/vitest-setup";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, test, vi } from "vitest";

setupMockDom();

describe('難易度・性別選択ページ', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    APIserver.resetHandlers();
    APIserver.use(...difficultyHandlers, ...genderHandlers, ...modeHandlers);
  });

  test("未ログインユーザーの場合、性別のドロップダウンが表示される", async () => {
    APIserver.use(setupProfileMock('notLoggedIn'));

    render(await Default());

    await waitFor(() => {
      expect(screen.getByText("通常モード")).toBeInTheDocument();
      expect(screen.getByText("難易度")).toBeInTheDocument();
      expect(screen.getByText("性別")).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'START' })).toBeInTheDocument();
    });

    expect(screen.getByText("性別を選択してください")).toBeInTheDocument();
  });

  test("ログイン済みで性別情報がない場合、性別のドロップダウンが表示される", async () => {
    APIserver.use(setupProfileMock('base'));

    render(await Default());

    await waitFor(() => {
      expect(screen.getByText("通常モード")).toBeInTheDocument();
      expect(screen.getByText("難易度")).toBeInTheDocument();
      expect(screen.getByText("性別")).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'START' })).toBeInTheDocument();
    });

    expect(screen.getByText("性別を選択してください")).toBeInTheDocument();
  });

  test("ログイン済みで性別情報がある場合、性別のドロップダウンが表示されない", async () => {
    APIserver.use(setupProfileMock('withGender'));

    render(await Default());

    await waitFor(() => {
      expect(screen.getByText("通常モード")).toBeInTheDocument();
      expect(screen.getByText("難易度")).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'START' })).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.queryByAltText("性別")).not.toBeInTheDocument();
      expect(screen.queryByAltText("性別を選択してください")).not.toBeInTheDocument();
    });
  });


  test("ユーザーの音域情報がある場合、適切に表示される", async () => {
    APIserver.use(setupProfileMock('withNotes'));

    render(await Default());

    await waitFor(() => {
      expect(screen.getByText("通常モード")).toBeInTheDocument();
      expect(screen.getByText("難易度")).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'START' })).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.queryByAltText("性別")).not.toBeInTheDocument();
      expect(screen.queryByAltText("性別を選択してください")).not.toBeInTheDocument();
    });
  });

  test("難易度を選択せずにスタートするとアラートが表示される", async () => {
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
    APIserver.use(setupProfileMock('base'));

    render(await Default());
    const startButton = screen.getByText('START');
    await userEvent.click(startButton);

    expect(alertMock).toHaveBeenCalledWith('難易度を選択してください');
    alertMock.mockRestore();
  });

  test("難易度を選択後、性別を選択せずにスタートするとアラートが表示される", async () => {
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
    APIserver.use(setupProfileMock('notLoggedIn'));
  
    render(await Default());
  
    const difficultySelect = screen.getByTestId('difficulty-select');
    await userEvent.click(difficultySelect);

    await waitFor(() => {
      expect(difficultySelect).toHaveAttribute('aria-expanded', 'true');
    });
    
    const difficultyOption = screen.getByRole('option', { name: '簡単' });
    expect(difficultyOption).toBeInTheDocument();
    await userEvent.click(difficultyOption);

    await waitFor(() => {
      expect(difficultySelect).toHaveAttribute('aria-expanded', 'false');
      expect(within(difficultySelect).getByText("簡単")).toBeInTheDocument();
    });

    const startButton = screen.getByText('START');
    await userEvent.click(startButton);

    expect(alertMock).toHaveBeenCalledWith('性別を選択してください');
    alertMock.mockRestore();
  });
});