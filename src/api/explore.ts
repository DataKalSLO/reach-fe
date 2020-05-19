import { get } from './base';

export async function fetchAllStories() {
  return await get('story');
}
