import { isUndefined } from 'util';

export function getEmptyStringIfUndefined(value: string | undefined): string {
  return !isUndefined(value) ? value : '';
}
