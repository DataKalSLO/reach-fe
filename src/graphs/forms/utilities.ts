import { isUndefined } from 'util';

export function isDefinedElse<T>(value: T | undefined, elseValue: T): T {
  return !isUndefined(value) ? value : elseValue;
}
