import Home from "@/app/page";
import { APIserver, mockRouter } from "@/vitest-setup";
import { render, screen, waitFor, within } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { errorModeHandler, modeHandlers } from "@/test/mocks/modeMock";
import userEvent from "@testing-library/user-event";
import { setupMockDom } from "@/test/mocks/mockPointerEvent";

setupMockDom();

describe('トップページ', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    APIserver.resetHandlers();
    APIserver.use(...modeHandlers);
  });

  test("タイトルとサブタイトルが表示されている", async () => {
    render(await Home());
    expect(await screen.findByText("おんぴしゃ")).toBeInTheDocument();
    expect(await screen.findByText('～発声直後の声の高さをドンピシャで当てる音声測定サービス～')).toBeInTheDocument();
  });

  test("モード選択が表示されている", async () => {
    render(await Home());
    const selectTrigger = screen.getByRole('combobox');
    expect(selectTrigger).toBeInTheDocument();
    expect(within(selectTrigger).getByText('モードを選択してください')).toBeInTheDocument();
  });

  test.each([
    ['通常', 1, '/default'],
    ['ハモり', 2, '/harmony'],
    ['練習', 3, '/practice'],
  ])("%sモード選択後にSTARTボタンをクリックすると正しいページに遷移する", async (modeName, modeId, expectedPath) => {
    render(await Home());
    const selectTrigger = screen.getByRole('combobox');
    await userEvent.click(selectTrigger);
    await waitFor(() => {
      expect(selectTrigger).toHaveAttribute('aria-expanded', 'true');
    });
    const modeOption = screen.getByRole('option', { name: modeName });
    expect(modeOption).toBeInTheDocument();
    await userEvent.click(modeOption);

    await waitFor(() => {
      expect(selectTrigger).toHaveAttribute('aria-expanded', 'false');
      expect(within(selectTrigger).getByText(modeName)).toBeInTheDocument();
    });

    const startButton = screen.getByText('START');
    await userEvent.click(startButton);

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith(`${expectedPath}?modeId=${modeId}`);
    });
  });

  test("モード未選択でSTARTボタンをクリックするとアラートが表示される", async () => {
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
    render(await Home());
    const startButton = screen.getByText('START');
    await userEvent.click(startButton);

    expect(alertMock).toHaveBeenCalledWith('モードを選択してください');
    alertMock.mockRestore();
  });

  test("無効なモードが選択された場合、アラートが表示される", async () => {
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});

    APIserver.use(errorModeHandler);

    render(await Home());
    const selectTrigger = screen.getByRole('combobox');
    await userEvent.click(selectTrigger);

    const errorModeOption = await screen.findByRole('option', { name: '無効なモード' });
    await userEvent.click(errorModeOption);
  
    const startButton = screen.getByText('START');
    await userEvent.click(startButton);
  
    expect(alertMock).toHaveBeenCalledWith('無効なモードです');
    alertMock.mockRestore();
  });
});