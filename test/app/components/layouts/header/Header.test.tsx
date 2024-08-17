import Header from "@/app/components/layouts/Header/Header";
import { getUserSession } from "@/lib/session";
import { modeHandlers } from "@/test/mocks/modeMock";
import { APIserver } from "@/vitest-setup";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, test, vi } from "vitest";

vi.mock("@/lib/session", () => ({
  getUserSession: vi.fn()
}));
vi.mock('@/features/auth/api/logout', () => ({
  logout: vi.fn(),
}));

describe('ヘッダー', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    APIserver.resetHandlers();
    APIserver.use(...modeHandlers);
  });

  test("ログインしていない場合、正しいリンクとボタンが表示される", async () => {
    vi.mocked(getUserSession).mockResolvedValue({ is_login: false });
    render(await Header());

    expect(await screen.findByText("おんぴしゃ")).toBeInTheDocument();
    expect(screen.getByText("遊び方")).toBeInTheDocument();
    expect(screen.getByText("ランキング")).toBeInTheDocument();
    expect(screen.getByText("ログイン")).toBeInTheDocument();
    expect(screen.queryByText("プロフィール")).not.toBeInTheDocument();
    expect(screen.queryByText("ログアウト")).not.toBeInTheDocument();
  });

  test("ログインしている場合、正しいリンクとボタンが表示される", async () => {
    vi.mocked(getUserSession).mockResolvedValue({ is_login: true });
    render(await Header());

    expect(screen.getByText("おんぴしゃ")).toBeInTheDocument();
    expect(screen.getByText("遊び方")).toBeInTheDocument();
    expect(screen.getByText("ランキング")).toBeInTheDocument();
    expect(screen.getByText("プロフィール")).toBeInTheDocument();
    expect(screen.getByText("ログアウト")).toBeInTheDocument();
    expect(screen.queryByText("ログイン")).not.toBeInTheDocument();
  });

  test("'遊び方'ボタンをクリックするとモーダルが開く", async () => {
    render(await Header());

    await userEvent.click(screen.getByText("遊び方"));

    expect(screen.getByText("通常")).toBeInTheDocument();
    expect(screen.getByText("ハモり")).toBeInTheDocument();
    expect(screen.getByText("練習")).toBeInTheDocument();
  });

  test("ログアウトボタンをクリックするとログアウト処理が実行される", async () => {
    vi.mocked(getUserSession).mockResolvedValue({ is_login: true });
    const { logout } = await import('@/features/auth/api/logout');

    render(await Header());

    await userEvent.click(screen.getByText("ログアウト"));
    expect(logout).toHaveBeenCalled();
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
    vi.mocked(getUserSession).mockResolvedValue({ is_login: true });
    render(await Header());
    const profile = screen.getByText("プロフィール");
    expect(profile).toHaveAttribute('href', "/profile");
  });

    test("ログインボタンをクリックするとログインページに遷移する", async () => {
    vi.mocked(getUserSession).mockResolvedValue({ is_login: false });
    render(await Header());

    const loginButton = screen.getByText("ログイン");
    expect(loginButton).toHaveAttribute('href', "/login");
  });
});