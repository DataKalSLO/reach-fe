import { isUndefined } from 'util';

//eslint-disable-next-line @typescript-eslint/no-explicit-any
function removeObjectAtIndex(items: Array<any>, index: number) {
  items.splice(index, 1);
  return items;
}

function insertIfDefinedAtIndex<T>(
  items: Array<T>,
  index: number,
  element?: T
): Array<T> {
  const newItems = items.slice();
  if (!isUndefined(element)) {
    newItems.splice(index, 0, element);
  }
  return newItems;
}

function replaceIfDefinedAtIndex<T>(
  items: Array<T>,
  index: number,
  element?: T
): Array<T> {
  const newItems = items.slice();
  if (!isUndefined(element)) {
    newItems.splice(index, 1, element);
  }
  return newItems;
}

//function replaceIfDefinedAtIndex<T>(
//  items: Array<T>,
//  predicate: (value: T, index: number, obj: T[]) => unknown, thisArg ?: any,
//  element?: T
//): Array<T> {
//  const newItems = items.slice();
//  newItems.findIndex(item => item == 2);
//  if (!isUndefined(element)) {
//    const index = items.findIndex(predicate(element));
//    newItems.splice(index, 1, element);
//  }
//  return newItems;
//}
//
//function removeIfDefinedAtIndex<T>(
//  items: Array<T>,
//  index: number,
//): Array<T> {
//  const newItems = items.slice();
//  if (!isUndefined(element)) {
//    newItems.splice(index, 1, element);
//  }
//  return newItems;
//}

export { removeObjectAtIndex, insertIfDefinedAtIndex, replaceIfDefinedAtIndex };
