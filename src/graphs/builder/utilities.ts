import { isUndefined } from 'util';
import {
  GraphDataXValue,
  GraphDataYValue,
  GraphData,
  PrimarySeriesTypes,
  primarySeriesTypesEnum,
  SecondarySeriesTypes,
  secondarySeriesTypesEnum
} from './types';

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
