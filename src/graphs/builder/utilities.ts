import { isDate, isNull, isNumber, isUndefined } from 'util';
import {
  GRAPH_UNDEFINED_CATEGORY_VALUE,
  X_AXIS_CATEGORY_TYPE,
  X_AXIS_DATETIME_TYPE,
  X_AXIS_LINEAR_TYPE
} from './constants';
import {
  DataValue,
  GraphData,
  GraphDataStackValue,
  GraphDataXValue,
  GraphDataYValue,
  PrimarySeriesTypes,
  primarySeriesTypesEnum,
  SecondarySeriesTypes,
  secondarySeriesTypesEnum,
  XAxisDataConfig
} from './types';

/*
 * Linear X-Axis Type Guard
 * Null values are not accepted since they cannot be assigned
 * a concrete value
 * */
export function isXAxisLinear(data: DataValue[]): data is number[] {
  return data.every(value => isNumber(value));
}

/*
 * Datetime X-Axis Type Guard
 * Null values are not accepted since they cannot be assigned
 * a concrete value
 */
export function isXAxisDatetime(data: DataValue[]): data is Date[] {
  return data.every(value => isDate(value));
}

/*
 * Gets the x-axis data type and convert to the appropriate type.
 * Mixed value types and nulls will all be converted to strings
 * and used as categorical types.
 * The x-axis data type is extracted for 2 reasons
 *  1. Know which chart constructor to use (highchart or highstock)
 *  2. The highcharts categories property needs to be used for categorical values
 *  - for more information about the categories property
 *    see https://api.highcharts.com/highcharts/xAxis.categories
 */
export function getXAxisTypeAndConvertedData(
  data: DataValue[]
): XAxisDataConfig {
  if (isXAxisLinear(data)) {
    return { xAxisType: X_AXIS_LINEAR_TYPE, xAxisData: data };
  } else if (isXAxisDatetime(data)) {
    return {
      xAxisType: X_AXIS_DATETIME_TYPE,
      xAxisData: data.map(value => value.valueOf())
    };
  }
  return {
    xAxisType: X_AXIS_CATEGORY_TYPE,
    xAxisData: data.map(value => {
      if (isNull(value)) return GRAPH_UNDEFINED_CATEGORY_VALUE;
      if (isDate(value)) return value.toDateString();
      return value.toString();
    })
  };
}

/*
 * Convert the y-axis data to numbers
 */
export function convertYData(data: DataValue[][]): GraphDataYValue[][] {
  return data.map(series =>
    series.map(value => {
      if (isNull(value)) return null; // keep null values
      if (!isNumber(value)) return 0;
      return value;
    })
  );
}

/*
 * Convert the stack data to either strings, numbers or undefined.
 * Series with the same stack value will be stacked.
 */
export function convertStackData(
  seriesCount: number,
  data?: DataValue[]
): GraphDataStackValue[] {
  if (!isUndefined(data)) {
    return data.map(value => {
      if (isNull(value)) return undefined; // convert nulls to undefined
      return isDate(value) ? value.toDateString() : value;
    });
  }
  // if no stack is given, use undefined values
  return Array(seriesCount).fill(undefined);
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
