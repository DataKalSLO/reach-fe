import { getEmptyStringIfUndefined } from '../utilities';

describe('getEmptyStringIfUndefined(): converts an undefined value to an empty string', () => {
  it('should return an empty string if given an undefined', () => {
    expect(getEmptyStringIfUndefined('test')).toEqual('test');
    expect(getEmptyStringIfUndefined(undefined)).toEqual('');
  });
});
