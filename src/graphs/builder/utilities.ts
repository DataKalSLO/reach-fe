import { isUndefined } from 'util';
import {
  GraphData,
  GraphDataXValue,
  GraphDataYValue,
  PrimarySeriesTypes,
  primarySeriesTypesEnum,
  SecondarySeriesTypes,
  secondarySeriesTypesEnum,
  DataValue,
  XAxisDataType
} from './types';
import {
  X_AXIS_DATETIME_TYPE,
  X_AXIS_LINEAR_TYPE,
  X_AXIS_CATEGORY_TYPE
} from './constants';

/*
 * Gets the x-axis data type
 * This is extracted for 2 reasons
 *  1. Know which chart constructor to use (highchart or highstock)
 *  2. The highcharts categories property needs to be used for categorial values
 *  - for more information about the categories property
 *    see https://api.highcharts.com/highcharts/xAxis.categories
 */
export function getXAxisDataType(data: DataValue[]): XAxisDataType {
  if (data.every(value => value instanceof Date)) {
    return X_AXIS_DATETIME_TYPE;
  } else if (data.every(value => typeof value === 'number')) {
    return X_AXIS_LINEAR_TYPE;
  }
  // data with mixed types or strings will default to the categorical type
  return X_AXIS_CATEGORY_TYPE;
}

/*
 * Convert the x-axis data to the appropriate type depending on the
 * x-axis data type.
 *  - datetime: convert dates to timestamps
 *  - linear: leave as numbers
 *  - categorical: convert all to strings
 */
export function convertXData(
  type: XAxisDataType,
  data: DataValue[]
): GraphDataXValue[] {
  switch (type) {
    case X_AXIS_DATETIME_TYPE:
      return data.map(value => value.valueOf());
    case X_AXIS_LINEAR_TYPE:
      return data as number[];
    default:
      return data.map(value =>
        value instanceof Date ? value.toDateString() : value.toString()
      );
  }
}

/*
 * Convert the y-axis data to numbers
 */
export function convertYData(data: DataValue[][]): GraphDataYValue[][] {
  return data.map(series =>
    series.map(value => {
      // Convert non-numeric values to 0
      if (typeof value !== 'number') {
        return 0;
      }
      return value;
    })
  );
}

/*
 * Convert the stack data to either strings or numbers
 * Series with the same stack value will be stacked.
 * Therefore, if the given stack data is null, then
 * simply add unique values to ensure that the data
 * is not stacked.
 */
export function convertStackData(
  seriesCount: number,
  data?: DataValue[]
): GraphDataXValue[] {
  if (!isUndefined(data)) {
    return data.map(value =>
      // convert dates to strings
      value instanceof Date ? value.toDateString() : value
    );
  }
  // if no stack is given, use the index as the series key
  return Array(seriesCount)
    .fill(0)
    .map((_, index) => index + 1);
}

/*
 * Pairs the values in one data array with another to create
 * an array of tuples.
 */
export function zipData(
  data1: GraphDataXValue[],
  data2: GraphDataYValue[]
): GraphData {
  return data1.map((value, index) => [value, data2[index]]);
}

/*
 * PrimarySeriesType Type Guard
 */
export function isPrimarySeriesType(
  seriesType: string
): seriesType is PrimarySeriesTypes {
  return seriesType in primarySeriesTypesEnum;
}

/*
 * SecondarySeriesType Type Guard
 */
export function isSecondarySeriesType(
  seriesType: string
): seriesType is SecondarySeriesTypes {
  return seriesType in secondarySeriesTypesEnum;
}

export function getEmptyStringIfUndefined(value: string | undefined): string {
  return !isUndefined(value) ? value : '';
}
