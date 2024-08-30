import { APIserver, mockRouter } from "@/vitest-setup";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { errorPasswordChangeHandlers, passwordChangeHandlers } from "./passwordChangeMock";
import { render, screen, waitFor } from "@testing-library/react";
import PasswordChange from "@/app/password/change/page";
import userEvent from "@testing-library/user-event";

describe('パスワード変更ページ', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    APIserver.resetHandlers(...passwordChangeHandlers);
  });

  test("パスワード変更フォームが表示されている", () => {
    render(<PasswordChange />);
    expect(screen.getByRole('heading', { name: 'パスワード新規登録' })).toBeInTheDocument();
    expect(screen.getByLabelText("パスワード")).toBeInTheDocument();
    expect(screen.getByLabelText("パスワード確認")).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '送信' })).toBeInTheDocument();
  });

  test("パスワード変更フォームが正しく送信される", async () => {
    render(<PasswordChange />);
    const passwordInput = screen.getByLabelText('パスワード');
    const passwordConfirmationInput = screen.getByLabelText('パスワード確認');
    const submitButton = screen.getByRole('button', { name: '送信' });

    await userEvent.type(passwordInput, "newPassword");
    await userEvent.type(passwordConfirmationInput, "newPassword");
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith("/");
    });
  });

  test("パスワードが一致しない場合にエラーメッセージが表示される", async () => {
    render(<PasswordChange />);
    const passwordInput = screen.getByLabelText('パスワード');
    const passwordConfirmationInput = screen.getByLabelText('パスワード確認');
    const submitButton = screen.getByRole('button', { name: '送信' });

    await userEvent.type(passwordInput, "newPassword");
    await userEvent.type(passwordConfirmationInput, "Password");
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('※パスワードが一致しません。')).toBeInTheDocument();
    });
  });

  test("APIエラー時にエラーメッセージが表示される", async () => {
    APIserver.use(errorPasswordChangeHandlers);

    render(<PasswordChange />);
    const passwordInput = screen.getByLabelText('パスワード');
    const passwordConfirmationInput = screen.getByLabelText('パスワード確認');
    const submitButton = screen.getByRole('button', { name: '送信' });

    await userEvent.type(passwordInput, "newPassword");
    await userEvent.type(passwordConfirmationInput, "newPassword");
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('登録中にエラーが発生しました。')).toBeInTheDocument();
    });
  });
});