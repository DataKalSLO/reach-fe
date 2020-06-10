import { GraphMetaData } from '../redux/graphs/types';
import { Story } from '../redux/story/types';
import { Content } from './types';

/* interface type checks with typescript
 * https://stackoverflow.com/questions/14425568/interface-type-check-with-typescript
 */
export function instanceOfGraphMetaData(object: any): object is GraphMetaData {
  return 'timeStamp' in object;
}
export function instanceOfStory(object: any): object is Story {
  return 'dateLastEdited' in object;
}

function getDate(item: Content): number {
  if (instanceOfGraphMetaData(item)) {
    return new Date(item.timeStamp * 1000).getTime();
  } else if (instanceOfStory(item)) {
    return new Date(item.dateLastEdited).getTime();
  } else {
    throw Error('tried retrieving date for invalid type');
  }
}

export const byLastUpdated = (a: Content, b: Content) =>
  getDate(b) - getDate(a);
