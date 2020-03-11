import { HOME } from './nav/constants';

// Jest docs: https://jestjs.io/docs/en/getting-started

describe('Jest testing stub', () => {
  it('Super simple test', () => {
    expect(HOME).toBe('/');
  });
});
