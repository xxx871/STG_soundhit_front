import Privacy from "@/app/privacy/page";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

describe('プライバシーポリシーページ', () => {
  test("プライバシーポリシーページが正しくレンダリングされる", () => {
    render(<Privacy />);
    expect(screen.getByText("プライバシーポリシー")).toBeInTheDocument();
  });
});