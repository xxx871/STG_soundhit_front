import { APIserver } from "@/vitest-setup";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { passwordResetHandlers } from "./passwordResetMock";

import { render, screen, waitFor } from "@testing-library/react";
import PasswordReset from "@/app/password/page";
import userEvent from "@testing-library/user-event";

describe('パスワードリセットページ', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    APIserver.resetHandlers(...passwordResetHandlers);
  });

  test("パスワードリセットフォームが表示されている", async () => {
    render(<PasswordReset />);
    expect(screen.getByRole('heading', { name: 'パスワードリセット申請' })).toBeInTheDocument();
    expect(screen.getByLabelText("メールアドレス")).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'フォーム送信' })).toBeInTheDocument();
  });

  // test("パスワードリセットフォームが正しく送信される", async () => {
  //   render(<PasswordReset />);
  //   const emailInput = screen.getByLabelText('メールアドレス');
  //   const submitButton = screen.getByRole('button', { name: 'フォーム送信' });

  //   await userEvent.type(emailInput, "test@example.com");
  //   await userEvent.click(submitButton);

  //   await waitFor(() => {
  //     expect(screen.getByText('パスワードリセット申請が完了しました。')).toBeInTheDocument();
  //   });
  // });
});