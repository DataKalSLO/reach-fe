import {
  zipData,
  isPrimarySeriesType,
  isSecondarySeriesType,
  getEmptyStringIfUndefined
} from '../utilities';
import {
  PrimarySeriesTypes,
  SeriesTypes,
  SecondarySeriesTypes
} from '../types';

const mockDataStr = ['1', '2', '3'];
const mockDataNum = [1, 2, 3];
const mockSeriesTypeChecker = (series: SeriesTypes) => {
  const mockPrimarySeriesMethod = (series: PrimarySeriesTypes) => 'primary';
  const mockSecondarySeriesMethod = (series: SecondarySeriesTypes) =>
    'secondary';

  // type guard needs to cast series in order to pass it as an argument
  if (isPrimarySeriesType(series)) {
    return mockPrimarySeriesMethod(series);
  }

  // type guard needs to cast series in order to pass it as an argument
  if (isSecondarySeriesType(series)) {
    return mockSecondarySeriesMethod(series);
  }
};

describe('zipData(): zips two arrays', () => {
  it('should zip two arrays into one', () => {
    expect(zipData(mockDataStr, mockDataNum)).toEqual([
      ['1', 1],
      ['2', 2],
      ['3', 3]
    ]);
  });
});

describe('isPrimarySeriesType(): Primary Series Type Guard', () => {
  it('should return false if given a secondary series type', () => {
    expect(isPrimarySeriesType('pie')).toBeFalsy();
  });
  it('should return true if given a primary series type', () => {
    expect(isPrimarySeriesType('line')).toBeTruthy();
    expect(isPrimarySeriesType('spline')).toBeTruthy();
    expect(isPrimarySeriesType('area')).toBeTruthy();
    expect(isPrimarySeriesType('areaspline')).toBeTruthy();
    expect(isPrimarySeriesType('bar')).toBeTruthy();
    expect(isPrimarySeriesType('column')).toBeTruthy();
  });
  it('should type cast if given a primary series type', () => {
    expect(mockSeriesTypeChecker('line')).toEqual('primary');
    expect(mockSeriesTypeChecker('spline')).toEqual('primary');
    expect(mockSeriesTypeChecker('area')).toEqual('primary');
    expect(mockSeriesTypeChecker('areaspline')).toEqual('primary');
    expect(mockSeriesTypeChecker('bar')).toEqual('primary');
    expect(mockSeriesTypeChecker('column')).toEqual('primary');
  });
});

describe('isSecondarySeriesType(): Secondary Series Type Guard', () => {
  it('should return false if given a secondary series type', () => {
    expect(isSecondarySeriesType('line')).toBeFalsy();
    expect(isSecondarySeriesType('spline')).toBeFalsy();
    expect(isSecondarySeriesType('area')).toBeFalsy();
    expect(isSecondarySeriesType('areaspline')).toBeFalsy();
    expect(isSecondarySeriesType('bar')).toBeFalsy();
    expect(isSecondarySeriesType('column')).toBeFalsy();
  });
  it('should return true if given a secondary series type', () => {
    expect(isSecondarySeriesType('pie')).toBeTruthy();
  });
  it('should type cast if given a secondary series type', () => {
    expect(mockSeriesTypeChecker('pie')).toEqual('secondary');
  });
});

describe('getEmptyStringIfUndefined(): converts an undefined value to an empty string', () => {
  it('should return an empty string if given an undefined', () => {
    expect(getEmptyStringIfUndefined('test')).toEqual('test');
    expect(getEmptyStringIfUndefined(undefined)).toEqual('');
  });
});
