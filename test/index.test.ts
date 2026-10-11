import { describe, expect, it } from 'vitest';

import { RAINBOW_UI_VERSION } from '../src/index.js';

describe('library foundation', () => {
  it('exposes the package version', () => {
    expect(RAINBOW_UI_VERSION).toBe('0.1.0');
  });
});
