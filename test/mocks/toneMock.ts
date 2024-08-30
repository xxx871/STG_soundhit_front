import { vi } from 'vitest';

vi.mock('tone', () => ({
  Synth: vi.fn(() => ({
    toDestination: vi.fn().mockReturnThis(),
    triggerAttackRelease: vi.fn(),
  })),
}));
