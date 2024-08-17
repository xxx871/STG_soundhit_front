import Footer from "@/app/components/layouts/Footer/Footer";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";


describe('フッター', () => {
  test("フッターが正しくレンダリングされる", () => {
    render(<Footer />);
    expect(screen.getByText("copyright ©2024. 音ぴしゃ")).toBeInTheDocument();
  });

  test("利用規約リンクが正しいhref属性を持つ", () => {
    render(<Footer />);
    const link = screen.getByRole("link", { name: "利用規約" });
    expect(link).toHaveAttribute('href', '/terms');
  });

  test("プライバシーポリシーリンクが正しいhref属性を持つ", () => {
    render(<Footer />);
    const link = screen.getByRole("link", { name: "プライバシーポリシー" });
    expect(link).toHaveAttribute('href', '/privacy');
  });

  test("お問い合わせリンクが正しいhref属性を持つ", () => {
    render(<Footer />);
    const link = screen.getByRole("link", { name: "お問い合わせ" });
    expect(link).toHaveAttribute('href', '/contact');
  });
});