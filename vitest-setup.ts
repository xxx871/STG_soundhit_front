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

const createMockSearchParams = () => ({
  get: vi.fn((param) => {
    if (param === 'modeId') return '1';
    if (param === 'difficultyId') return '2';
    return null;
  }),
});

export const mockSearchParams = createMockSearchParams();

export const mockRedirect = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
  useSearchParams: () => mockSearchParams,
  redirect: (url: string) => mockRedirect(url),
}));

vi.mock('next/headers', () => ({
  cookies: vi.fn(() => ({
    get: vi.fn((name) => {
      if (name === 'access-token') return { value: 'mock-access-token' };
      if (name === 'client') return { value: 'mock-client' };
      if (name === 'uid') return { value: 'mock-uid' };
      return null;
    }),
  })),
}));

vi.mock('tone', () => {
  return {
    PolySynth: vi.fn(),
    Synth: vi.fn().mockImplementation(() => {
      return { toDestination: vi.fn() }
    })
  }
})