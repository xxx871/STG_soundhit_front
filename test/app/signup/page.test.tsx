import { APIserver, mockRouter } from "@/vitest-setup";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { errorSignupHandlers, signupHandlers } from "./signupMock";
import { render, screen, waitFor } from "@testing-library/react";
import SignUp from "@/app/signup/page";
import userEvent from "@testing-library/user-event";

describe('サインアップページ', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    APIserver.resetHandlers(...signupHandlers);
  });

  test("サインアップフォームが表示されている", async () => {
    render(<SignUp />);
    expect(screen.getByRole('heading', { name: '新規登録' })).toBeInTheDocument();
    expect(screen.getByLabelText("ユーザー名")).toBeInTheDocument();
    expect(screen.getByLabelText("メールアドレス")).toBeInTheDocument();
    expect(screen.getByLabelText("パスワード")).toBeInTheDocument();
    expect(screen.getByLabelText("パスワード確認")).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '新規登録' })).toBeInTheDocument();
  });

  test("ログインページへのリンクが表示されている", async () => {
    render(<SignUp />);
    expect(screen.getByText('すでに登録済みの方はこちら')).toHaveAttribute('href', '/login');
  });

  test("サインアップフォームが正しく送信される", async () => {
    render(<SignUp />);
    const nameInput = screen.getByLabelText('ユーザー名');
    const emailInput = screen.getByLabelText('メールアドレス');
    const passwordInput = screen.getByLabelText('パスワード');
    const passwordConfirmationInput = screen.getByLabelText('パスワード確認');
    const submitButton = screen.getByRole('button', { name: '新規登録' });

    await userEvent.type(nameInput, "Test User");
    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "password123");
    await userEvent.type(passwordConfirmationInput, "password123");
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith("/");
    });
  });

  test("無効な情報を入力するとエラーメッセージが表示される", async () => {
    render(<SignUp />);
    const nameInput = screen.getByLabelText('ユーザー名');
    const emailInput = screen.getByLabelText('メールアドレス');
    const passwordInput = screen.getByLabelText('パスワード');
    const passwordConfirmationInput = screen.getByLabelText('パスワード確認');

    await userEvent.type(nameInput, "a");
    await userEvent.type(emailInput, "invalid-email");
    await userEvent.type(passwordInput, "short");
    await userEvent.type(passwordConfirmationInput, "different");

    await waitFor(() => {
      expect(screen.getByText('※ユーザー名は2文字以上で入力してください。')).toBeInTheDocument();
      expect(screen.getByText('※適切なメールアドレスを入力してください。')).toBeInTheDocument();
      expect(screen.getByText('※パスワードは6文字以上で入力してください。')).toBeInTheDocument();
      expect(screen.getByText('※パスワードが一致しません。')).toBeInTheDocument();
    });
  });

  test("APIエラー時にエラーメッセージが表示される", async () => {
    APIserver.use(errorSignupHandlers);

    render(<SignUp />);
    const nameInput = screen.getByLabelText('ユーザー名');
    const emailInput = screen.getByLabelText('メールアドレス');
    const passwordInput = screen.getByLabelText('パスワード');
    const passwordConfirmationInput = screen.getByLabelText('パスワード確認');
    const submitButton = screen.getByRole('button', { name: '新規登録' });

    await userEvent.type(nameInput, "Test User");
    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "password123");
    await userEvent.type(passwordConfirmationInput, "password123");
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('※登録中にエラーが発生しました。')).toBeInTheDocument();
    });
  });
});