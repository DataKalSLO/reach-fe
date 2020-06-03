import moment from 'moment';
import { isString } from 'util';
import { DataValue, Metadata } from './types';

/*
 * Date Type Column Validator
 * Verifies whether a column contains datetime values.
 */
export function isDateTypeColumn(
  datasetName: string,
  columnName: string,
  datasetsMetaData: Metadata[]
): boolean {
  for (const dataset of datasetsMetaData) {
    if (dataset.tableName === datasetName) {
      for (let index = 0; index < datasetsMetaData.length; index++) {
        if (dataset.columnNames[index] === columnName) {
          if (dataTypeIsDate(dataset.dataTypes[index])) {
            return true;
          }
          return false;
        }
      }
    }
  }
  return false;
}

/*
 * Date Type Validator
 * Date values are expected to be in ISO_8601 format
 * - For more information on moment and ISO_8601
 *   see https://momentjs.com/guides/#/parsing/known-formats/
 */
export function isDateType(value: DataValue): boolean {
  return (
    isString(value) &&
    moment(value, moment.ISO_8601, true).format() !== 'Invalid date'
  );
}

/*
 * Date Type Validator
 * Checks if the metadata "dataType" value is a date
 */
export function dataTypeIsDate(valueType: string): boolean {
  return ['date', 'datetime'].includes(valueType);
}

/*
 * Number Type Validator
 * Checks if the metadata "dataType" value is a number
 */
export function dataTypeIsNumber(valueType: string): boolean {
  return ['int', 'decimal', 'double', 'float'].includes(valueType);
}
