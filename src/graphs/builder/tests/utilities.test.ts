import {
  PrimarySeriesTypes,
  SecondarySeriesTypes,
  SeriesTypes
} from '../types';
import {
  getEmptyStringIfUndefined,
  isPrimarySeriesType,
  isSecondarySeriesType,
  zipData,
  getXAxisDataType,
  convertXData,
  convertYData,
  convertStackData
} from '../utilities';
import {
  X_AXIS_LINEAR_TYPE,
  X_AXIS_CATEGORY_TYPE,
  X_AXIS_DATETIME_TYPE
} from '../constants';

const mockDataStr = ['1', '2', '3'];
const mockDataNum = [1, 2, 3];
const mockDataDate = [new Date('2000'), new Date('2001'), new Date('2002')];
const mockDataSeries = [
  [1, 1, 1],
  [2, 2, 2],
  [3, 3, 3]
];
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

describe('getXAxisDataType(): get the graph data type for the x-axis', () => {
  it('should return either "category", "datetime", or "linear"', () => {
    expect(getXAxisDataType([1, 2, 3])).toEqual(X_AXIS_LINEAR_TYPE);
    expect(getXAxisDataType([1, 2, 'a'])).toEqual(X_AXIS_CATEGORY_TYPE);
    expect(getXAxisDataType(['1', '2', '3'])).toEqual(X_AXIS_CATEGORY_TYPE);
    expect(getXAxisDataType([new Date('2012'), new Date('2013')])).toEqual(
      X_AXIS_DATETIME_TYPE
    );
    expect(getXAxisDataType([1, 2, new Date('2012')])).toEqual(
      X_AXIS_CATEGORY_TYPE
    );
  });
});

describe('convertXData(): converts graph x-axis data value types', () => {
  it('should only convert x-axis date values to unix timestamps', () => {
    expect(convertXData(X_AXIS_LINEAR_TYPE, mockDataNum)).toEqual(mockDataNum);
    expect(convertXData(X_AXIS_CATEGORY_TYPE, mockDataStr)).toEqual(
      mockDataStr
    );
    expect(convertXData(X_AXIS_DATETIME_TYPE, mockDataDate)).toEqual([
      946684800000,
      978307200000,
      1009843200000
    ]);
  });
  it('should convert mixed value types to strings', () => {
    expect(
      convertXData(X_AXIS_CATEGORY_TYPE, [1, 2, 'a', new Date('2002')])
    ).toEqual(['1', '2', 'a', 'Mon Dec 31 2001']);
  });
});

describe('convertYData(): converts graph y-axis data value types', () => {
  it('should convert non-numeric values to 0', () => {
    expect(convertYData([mockDataDate])).toEqual([[0, 0, 0]]);
    expect(convertYData([mockDataStr])).toEqual([[0, 0, 0]]);
    expect(convertYData(mockDataSeries)).toEqual(mockDataSeries);
  });
});

describe('convertStackData(): converts graph stack data value types', () => {
  it('should only convert stack date values to strings', () => {
    expect(convertStackData(mockDataSeries.length, mockDataNum)).toEqual(
      mockDataNum
    );
    expect(convertStackData(mockDataSeries.length, mockDataStr)).toEqual(
      mockDataStr
    );
    expect(convertStackData(mockDataSeries.length, mockDataDate)).toEqual([
      'Fri Dec 31 1999',
      'Sun Dec 31 2000',
      'Mon Dec 31 2001'
    ]);
  });

  it('should fill stack array with incrementing values if none are given', () => {
    expect(convertStackData(mockDataSeries.length)).toEqual([1, 2, 3]);
  });
});

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
