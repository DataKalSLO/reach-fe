import { constructGetParameters } from './base';

describe('constructGetParameters util function', () => {
  it('one value', () => {
    expect(constructGetParameters([{ test1: 'value1' }]) === '?test=value1');
  });

  it('multiple values', () => {
    expect(
      constructGetParameters([{ test1: 'value1' }, { test2: 'value2' }]) ===
        '?test=value1&test2=value2'
    );
  });

  it('empty values', () => {
    expect(constructGetParameters([]) === '');
  });
});
