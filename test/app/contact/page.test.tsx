import Contact from "@/app/contact/page";
import { APIserver, mockRouter } from "@/vitest-setup";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, test, vi } from "vitest";
import {  contactHandlers, errorContactHandlers,  } from "@/test/app/contact/contactMock";

describe('お問い合わせページ', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    APIserver.resetHandlers();
    APIserver.use(...contactHandlers);
  });

  test('お問い合わせフォームが表示されている', async () => {
    render(<Contact />);
    expect(await screen.findByText("お問い合わせ")).toBeInTheDocument();
    expect(await screen.findByLabelText("メールアドレス")).toBeInTheDocument();
    expect(await screen.findByLabelText("メッセージ")).toBeInTheDocument();
    expect(await screen.findByRole("button", { name: "送信" })).toBeInTheDocument();
  });

  test("空のフォーム送信時に適切なバリデーションエラーが表示される", async () => {
    render(<Contact />);
    const submitButton = await screen.findByRole("button", { name: "送信" });
    await userEvent.click(submitButton);

    expect(await screen.findByText('※適切なメールアドレスを入力してください。')).toBeInTheDocument();
    expect(await screen.findByText('※メッセージを入力してください。')).toBeInTheDocument();
  });

  test("メッセージが1000文字を超える場合にバリデーションエラーが表示される", async () => {
    render(<Contact />);
    const emailInput = await screen.findByLabelText("メールアドレス");
    const messageInput = await screen.findByLabelText("メッセージ");
    const submitButton = await screen.findByRole("button", { name: "送信" });
    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(messageInput, "a".repeat(1001));
    await userEvent.click(submitButton);

    expect(await screen.findByText("※メッセージは1000文字以内で入力してください。")).toBeInTheDocument();
  });

  test("フォームを正しく送信できる", async () => {
    render(<Contact />);
    const emailInput = await screen.findByLabelText("メールアドレス");
    const messageInput = await screen.findByLabelText("メッセージ");
    const submitButton = await screen.findByRole("button", { name: "送信" });
    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(messageInput, "テストメッセージ");
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith("/thanks");
    });
  });

  test("APIエラー時にエラーメッセージが表示される", async () => {
    APIserver.use(errorContactHandlers);

    render(<Contact />);
    const emailInput = await screen.findByLabelText("メールアドレス");
    const messageInput = await screen.findByLabelText("メッセージ");
    const submitButton = await screen.findByRole("button", { name: "送信" });

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(messageInput, "テストメッセージ");
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('正常に送信できませんでした')).toBeInTheDocument();
    });
  });
});