import Terms from "@/app/terms/page";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

describe('利用規約ページ', () => {
  test("利用規約ページが正しくレンダリングされる", () => {
    render(<Terms />);
    expect(screen.getByText("利用規約")).toBeInTheDocument();
  });
});