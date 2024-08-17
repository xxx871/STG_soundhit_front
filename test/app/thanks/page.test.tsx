import Thanks from "@/app/thanks/page";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

describe('メール送信後ページ', () => {
  test("メール送信後ページが正しくレンダリングされる", () => {
    render(<Thanks />);
    expect(screen.getByText("正常にメールは送信されました。")).toBeInTheDocument();
  });
});