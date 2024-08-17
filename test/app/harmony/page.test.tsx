import Harmony from "@/app/harmony/page";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

describe('ハモりモード', () => {
  test("ハモりモードページが正しくレンダリングされる", () => {
    render(<Harmony />);
    expect(screen.getByText("ハモりモード")).toBeInTheDocument();
  });
});