import Normal from "@/app/normal/page";
import { noteHandlers } from "@/test/mocks/noteMock";
import { APIserver } from "@/vitest-setup";
import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { setupProfileMock } from "./normalMock";

describe('通常モードゲーム画面', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    APIserver.resetHandlers();
    APIserver.use(...noteHandlers);
  });

  test("ノーマルページが正しく表示される", async ()=> {
    APIserver.use(setupProfileMock('withNotes'));
    render(await Normal());
    await waitFor(() => {
      expect(screen.queryByText("Invalid difficulty level")).not.toBeInTheDocument();
      expect(screen.getByText(/現在の音/)).toBeInTheDocument();
    });
  });
});