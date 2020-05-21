import { isNumber, isString } from 'util';
import {
  PrimarySeriesTypes,
  SecondarySeriesTypes,
  SeriesTypes
} from '../types';
import {
  convertStackData,
  convertYData,
  getEmptyStringIfUndefined,
  getXAxisTypeAndConvertedData,
  isPrimarySeriesType,
  isSecondarySeriesType,
  isXAxisDatetime,
  isXAxisLinear,
  zipData
} from '../utilities';

const mockDataStr = ['1', '2', '3'];
const mockDataNum = [1, 2, 3];
const mockDataDate = [
  new Date('2019-01-01T00:00:00'),
  new Date('2019-02-01T00:00:00'),
  new Date('2019-03-01T00:00:00')
];
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

describe('isXAxisLinear(): X-Axis Linear Typ Guard', () => {
  it('should return true if given only numeric values', () => {
    expect(isXAxisLinear(mockDataNum)).toBeTruthy();
    expect(isXAxisLinear(mockDataStr)).toBeFalsy();
    expect(isXAxisLinear(mockDataDate)).toBeFalsy();
  });
  it('should return false if there are any null values', () => {
    expect(isXAxisLinear([...mockDataNum, null])).toBeFalsy();
  });
});

describe('isXAxisDatetime(): X-Axis Datetime Typ Guard', () => {
  it('should return true if given only Date values', () => {
    expect(isXAxisDatetime(mockDataDate)).toBeTruthy();
    expect(isXAxisDatetime(mockDataStr)).toBeFalsy();
    expect(isXAxisDatetime(mockDataNum)).toBeFalsy();
  });
  it('should return false if there are any null values', () => {
    expect(isXAxisDatetime([...mockDataDate, null])).toBeFalsy();
  });
});

describe('getXAxisTypeAndConvertedData(): get the x-axis data type and the converted data values', () => {
  it('should return the "linear" type and the data values should be all numbers', () => {
    expect(getXAxisTypeAndConvertedData(mockDataNum)).toEqual({
      xAxisType: 'linear',
      xAxisData: mockDataNum
    });
  });
  it('should return the "datetime" type and the data values should be all numbers', () => {
    const returnValue = getXAxisTypeAndConvertedData(mockDataDate);
    expect(returnValue.xAxisType).toEqual('datetime');
    /*
     * Only check that the returned values are strings, actual values may var
     * due to different date conversions (e.g. 2012 -> Dec 31, 2011 or Jan 1, 2012)
     */
    expect(returnValue.xAxisData.every(value => isNumber(value))).toBeTruthy();
  });
  it('should return the "category" type and the data values should be all numbers', () => {
    expect(getXAxisTypeAndConvertedData(mockDataStr)).toEqual({
      xAxisType: 'category',
      xAxisData: mockDataStr
    });
  });
  it('should convert mixed value types to strings and return the "category" type', () => {
    // check null values
    const returnValue1 = getXAxisTypeAndConvertedData([1, 2, 3, null]);
    expect(returnValue1.xAxisType).toEqual('category');
    // The actual values may vary, just make sure they are strings
    expect(returnValue1.xAxisData.every(value => isString(value))).toBeTruthy();

    // check mixed values
    const returnValue2 = getXAxisTypeAndConvertedData([
      new Date('2012'),
      2,
      '1',
      null
    ]);
    expect(returnValue2.xAxisType).toEqual('category');
    // The actual values may vary, just make sure they are strings
    expect(returnValue2.xAxisData.every(value => isString(value))).toBeTruthy();
  });
});

describe('convertYData(): converts graph y-axis data value types', () => {
  it('should convert non-numeric values to 0', () => {
    expect(convertYData([mockDataDate])).toEqual([[0, 0, 0]]);
    expect(convertYData([mockDataStr])).toEqual([[0, 0, 0]]);
    expect(convertYData(mockDataSeries)).toEqual(mockDataSeries);
  });
  it('should leave null values as null', () => {
    expect(convertYData([['1', 2, null, '3']])).toEqual([[0, 2, null, 0]]);
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
    /*
     * Only check that the returned values are strings, actual values may var
     * due to different date conversions (e.g. 2012 -> Dec 31, 2011 or Jan 1, 2012)
     */
    expect(
      convertStackData(mockDataSeries.length, mockDataDate).every(
        timeString => typeof timeString === 'string'
      )
    ).toBeTruthy();
  });
  it('should leave null values as null', () => {
    expect(
      convertStackData(mockDataSeries.length, [...mockDataNum, null])
    ).toEqual([...mockDataNum, undefined]);
    expect(
      convertStackData(mockDataSeries.length, [...mockDataStr, null])
    ).toEqual([...mockDataStr, undefined]);
  });

  it('should fill stack array with undefined values if none are given', () => {
    expect(convertStackData(mockDataSeries.length)).toEqual([
      undefined,
      undefined,
      undefined
    ]);
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
