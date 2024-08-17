import Login from "@/app/login/page";
import { APIserver, mockRouter } from "@/vitest-setup";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { errorLoginHandlers, loginHandlers } from "@/test/app/login/loginMock";

describe('ログインページ', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    APIserver.resetHandlers(...loginHandlers);
  });

  test("ログインフォームが表示されている", async () => {
    render(<Login />);
    expect(screen.getByRole('heading', { name: 'ログイン' })).toBeInTheDocument();
    expect(screen.getByLabelText("メールアドレス")).toBeInTheDocument();
    expect(screen.getByLabelText("パスワード")).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'ログイン' })).toBeInTheDocument();
  });

  test("外部認証ボタンが表示されている", async () => {
    render(<Login />);
    expect(screen.getByRole('button', { name: 'Github' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Google' })).toBeInTheDocument();
  });

  test("サインアップとパスワードリセットのリンクが表示されている", async () => {
    render(<Login />);
    expect(screen.getByText('初めてご利用の方はこちら')).toHaveAttribute('href', '/signup');
    expect(screen.getByText('パスワードをお忘れの方はこちら')).toHaveAttribute('href', '/password');
  });

  test("ログインフォームが正しく送信される", async () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('メールアドレス');
    const passwordInput = screen.getByLabelText('パスワード');
    const submitButton = screen.getByRole('button', { name: 'ログイン' });

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "password123");
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith("/");
    });
  });

  test("無効な認証情報でログインするとエラーメッセージが表示される", async () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('メールアドレス');
    const passwordInput = screen.getByLabelText('パスワード');
    const submitButton = screen.getByRole('button', { name: 'ログイン' });
  
    await userEvent.type(emailInput, "wrong@example.com");
    await userEvent.type(passwordInput, "wrongPassword");
    await userEvent.click(submitButton);
  
    await waitFor(() => {
      expect(screen.getByText('ログインに失敗しました。')).toBeInTheDocument();
    });
  });

  test("APIエラー時にエラーメッセージが表示される", async () => {
    APIserver.use(errorLoginHandlers);

    render(<Login />);
    const emailInput = screen.getByLabelText('メールアドレス');
    const passwordInput = screen.getByLabelText('パスワード');
    const submitButton = screen.getByRole('button', { name: 'ログイン' });

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "password123");
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('ログインに失敗しました。')).toBeInTheDocument();
    });
  });
});