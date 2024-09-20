import { difficultyHandlers } from "@/test/mocks/difficultyMock";
import { modeHandlers } from "@/test/mocks/modeMock";
import { APIserver } from "@/vitest-setup";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { errorRankingHandlers, RankingHandlers, setupRanking } from "./rankingMock";
import { render, screen, waitFor } from "@testing-library/react";
import Ranking from "@/app/ranking/page";
import userEvent from "@testing-library/user-event";
import { setupMockDom } from "@/test/mocks/mockPointerEvent";

setupMockDom();

describe('ランキングページ', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    APIserver.resetHandlers();
    APIserver.use(...modeHandlers, ...difficultyHandlers);
  });

  test("ランキングページが正しく表示される", async () => {
    APIserver.use(RankingHandlers);
    render(await Ranking());

    await waitFor(() => {
      expect(screen.getByText("ランキング")).toBeInTheDocument();
      expect(screen.getByText("モード")).toBeInTheDocument();
      expect(screen.getByText("難易度")).toBeInTheDocument();
    });
  });

  test("モードと難易度が選択でき、ランキングが表示される", async () => {
    APIserver.use(RankingHandlers);
    render(await Ranking());

    await waitFor(() => {
      expect(screen.getByText("モード選択")).toBeInTheDocument();
      expect(screen.getByText("難易度選択")).toBeInTheDocument();
    });

    const modeSelect = screen.getByTestId("mode-select");
    await userEvent.click(modeSelect);
    await waitFor(() => {
      expect(modeSelect).toHaveAttribute('aria-expanded', 'true');
    });
    const modeOption = screen.getByRole('option', { name: '通常'});
    expect(modeOption).toBeInTheDocument();
    await userEvent.click(modeOption);
    expect(screen.getByText("通常")).toBeInTheDocument();

    const difficultySelect = screen.getByTestId("difficulty-select");
    await userEvent.click(difficultySelect);
    await waitFor(() => {
      expect(difficultySelect).toHaveAttribute('aria-expanded', 'true');
    });
    const difficultyOption = screen.getByRole('option', { name: '簡単'});
    expect(difficultyOption).toBeInTheDocument();
    await userEvent.click(difficultyOption);
    expect(screen.getByText("簡単")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("No.1 test 4回")).toBeInTheDocument();
    });
  });

  test("ランキングデータが空の場合、メッセージが表示される", async () => {
    APIserver.use(setupRanking("empty"));
    render(await Ranking());

    await waitFor(() => {
      expect(screen.getByText("モード選択")).toBeInTheDocument();
      expect(screen.getByText("難易度選択")).toBeInTheDocument();
    });

    const modeSelect = screen.getByTestId("mode-select");
    await userEvent.click(modeSelect);
    await waitFor(() => {
      expect(modeSelect).toHaveAttribute('aria-expanded', 'true');
    });
    const modeOption = screen.getByRole('option', { name: '通常'});
    expect(modeOption).toBeInTheDocument();
    await userEvent.click(modeOption);
    expect(screen.getByText("通常")).toBeInTheDocument();

    const difficultySelect = screen.getByTestId("difficulty-select");
    await userEvent.click(difficultySelect);
    await waitFor(() => {
      expect(difficultySelect).toHaveAttribute('aria-expanded', 'true');
    });
    const difficultyOption = screen.getByRole('option', { name: '簡単'});
    expect(difficultyOption).toBeInTheDocument();
    await userEvent.click(difficultyOption);
    expect(screen.getByText("簡単")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("ランキングデータがありません。")).toBeInTheDocument();
    });
  });

  test("APIエラー時にエラーメッセージが表示される", async () => {
    APIserver.use(errorRankingHandlers);
    render(await Ranking());

    await waitFor(() => {
      expect(screen.getByText("モード選択")).toBeInTheDocument();
      expect(screen.getByText("難易度選択")).toBeInTheDocument();
    });

    const modeSelect = screen.getByTestId("mode-select");
    await userEvent.click(modeSelect);
    await waitFor(() => {
      expect(modeSelect).toHaveAttribute('aria-expanded', 'true');
    });
    const modeOption = screen.getByRole('option', { name: '通常'});
    expect(modeOption).toBeInTheDocument();
    await userEvent.click(modeOption);
    expect(screen.getByText("通常")).toBeInTheDocument();

    const difficultySelect = screen.getByTestId("difficulty-select");
    await userEvent.click(difficultySelect);
    await waitFor(() => {
      expect(difficultySelect).toHaveAttribute('aria-expanded', 'true');
    });
    const difficultyOption = screen.getByRole('option', { name: '簡単'});
    expect(difficultyOption).toBeInTheDocument();
    await userEvent.click(difficultyOption);
    expect(screen.getByText("簡単")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("ランキングデータの取得に失敗しました。")).toBeInTheDocument();
    });
  });
});