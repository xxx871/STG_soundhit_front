import '@testing-library/jest-dom/vitest';
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, vi } from 'vitest';

export const APIserver = setupServer();

beforeAll(() => APIserver.listen());
afterEach(() => {
  APIserver.resetHandlers();
  vi.clearAllMocks();
});
afterAll(() => APIserver.close());

const createMockRouter = () => ({
  push: vi.fn(),
  replace: vi.fn(),
  back: vi.fn(),
  forward: vi.fn(),
  refresh: vi.fn(),
  prefetch: vi.fn(),
});

export const mockRouter = createMockRouter();

vi.mock('next/navigation', () => ({
  useRouter: () => mockRouter
}));
