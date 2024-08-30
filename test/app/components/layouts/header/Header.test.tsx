import Header from "@/app/components/layouts/Header/Header";
import { modeHandlers } from "@/test/mocks/modeMock";
import { errorSessionHandlers, sessionHandlers } from "@/test/mocks/sessionMock";
import { APIserver } from "@/vitest-setup";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { logoutHandlers } from "./logoutMock";

describe('ヘッダー', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    APIserver.resetHandlers();
    APIserver.use(...modeHandlers, ...sessionHandlers, ...logoutHandlers);
  });

  test("ログインしていない場合、正しいリンクとボタンが表示される", async () => {
    APIserver.use(errorSessionHandlers);
    render(await Header());

    expect(await screen.findByText("おんぴしゃ")).toBeInTheDocument();
    expect(screen.getByText("遊び方")).toBeInTheDocument();
    expect(screen.getByText("ランキング")).toBeInTheDocument();
    expect(screen.getByText("ログイン")).toBeInTheDocument();
    expect(screen.queryByText("プロフィール")).not.toBeInTheDocument();
    expect(screen.queryByText("ログアウト")).not.toBeInTheDocument();
  });

  test("ログインしている場合、正しいリンクとボタンが表示される", async () => {
    render(await Header());

    await waitFor(() => {
      expect(screen.getByText("おんぴしゃ")).toBeInTheDocument();
    });

    expect(screen.getByText("遊び方")).toBeInTheDocument();
    expect(screen.getByText("ランキング")).toBeInTheDocument();
    expect(screen.getByText("プロフィール")).toBeInTheDocument();
    expect(screen.getByText("ログアウト")).toBeInTheDocument();
    expect(screen.queryByText("ログイン")).not.toBeInTheDocument();
  });

  test("'遊び方'ボタンをクリックするとモーダルが開く", async () => {
    render(await Header());

    await waitFor(() => {
      expect(screen.getByText("おんぴしゃ")).toBeInTheDocument();
    });

    await userEvent.click(screen.getByText("遊び方"));

    expect(screen.getByText("通常")).toBeInTheDocument();
    expect(screen.getByText("ハモり")).toBeInTheDocument();
    expect(screen.getByText("練習")).toBeInTheDocument();
  });

  test("ログアウトボタンをクリックするとログアウト処理が実行され、ログインボタンが表示される", async () => {
    render(await Header());
    const logoutButton = screen.getByRole('button', { name: 'ログアウト' });
    expect(logoutButton).toBeInTheDocument();

    await userEvent.click(logoutButton);

    await waitFor(() => {
      expect(screen.getByText("ログアウト")).toBeInTheDocument();
    });

    APIserver.use(errorSessionHandlers);
    render(await Header());
    await waitFor(() => {
      expect(screen.getByText("ログイン")).toBeInTheDocument();
    });
  });

  test("ヘッダーロゴをクリックするとホームページに遷移する", async () => {
    const { findByText } = render(await Header());
    const logo = await findByText("おんぴしゃ");
    expect(logo).toHaveAttribute('href', '/');
  });

  test("ランキングリンクをクリックするとランキングページに遷移する", async () => {
    render(await Header());
    const ranking = screen.getByText("ランキング");
    expect(ranking).toHaveAttribute('href', "/ranking");
  });

  test("プロフィールリンクをクリックするとプロフィールページに遷移する", async () => {
    render(await Header());
    await waitFor(() => {
      expect(screen.getByText("おんぴしゃ")).toBeInTheDocument();
    });
    const profile = screen.getByText("プロフィール");
    expect(profile).toHaveAttribute('href', "/profile");
  });

  test("ログインボタンをクリックするとログインページに遷移する", async () => {
    APIserver.use(errorSessionHandlers);
    render(await Header());
    await waitFor(() => {
      expect(screen.getByText("おんぴしゃ")).toBeInTheDocument();
    });

    const loginButton = screen.getByText("ログイン");
    expect(loginButton).toHaveAttribute('href', "/login");
  });
});