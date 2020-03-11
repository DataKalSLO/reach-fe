import { HOME } from './nav/constants';

// Jest docs: https://jestjs.io/docs/en/getting-started

describe('Jest testing stub', () => {
  it('Expect landing page to be HOME', () => {
    expect(HOME).toBe('/');
  });
});
