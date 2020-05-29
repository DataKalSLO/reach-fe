import moment from 'moment';
import { isString } from 'util';
import { DataValue } from './types';

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
 * Number Type Validator
 * Checks if the metadata "dataType" value is a number
 */
export function dataTypeIsNumber(valueType: string): boolean {
  return ['int', 'decimal', 'double', 'float'].includes(valueType);
}
