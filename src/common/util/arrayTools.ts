//eslint-disable-next-line @typescript-eslint/no-explicit-any
function removeObjectAtIndex(items: Array<any>, index: number) {
  items.splice(index, 1);
  return items;
}

export { removeObjectAtIndex };
