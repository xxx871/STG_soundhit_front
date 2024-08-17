import Practice from "@/app/practice/page";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

describe("練習モード", () => {
  test("連取モードページが正しくレンダリングされる", () => {
    render(<Practice />);
    expect(screen.getByText("練習モード")).toBeInTheDocument();
  });
});