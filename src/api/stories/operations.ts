import {
  authenticatedGet,
  authenticatedDel,
  authenticatedPost,
  authenticatedPut
} from '../authenticatedApi/operations';
import { get } from '../base';
import { Story } from '../../redux/story/types';
import { DatabaseStory } from './types';
import {
  transformStoryToDatabaseStory,
  transformAPIResponseToStory
} from './converter';

enum StoryActions {
  CREATE,
  UPDATE,
  DELETE_WITH_ID,
  GET_ALL_STORIES
}

type StoryApiResponse = Story | Array<Story>;
type StoryApiPayload = string | DatabaseStory | undefined;

export async function saveOrUpdateExistingStory(
  story: Story
): Promise<boolean> {
  const databaseStory = transformStoryToDatabaseStory(story);
  return httpRequestWithEmptyResponse(StoryActions.CREATE, databaseStory);
}

export function deleteStoryById(storyId: string): Promise<boolean> {
  return httpRequestWithEmptyResponse(StoryActions.DELETE_WITH_ID, storyId);
}

export async function getStoryWithStoryID(storyID: string): Promise<Story> {
  // draft stories require token, published don't. Sending token harmless in latter.
  return transformAPIResponseToStory(
    await authenticatedGet(['story', storyID].join('/'))
  );
}

export async function getAllStories(): Promise<Story[]> {
  return httpRequestWithStoryArrayResponse(
    StoryActions.GET_ALL_STORIES,
    undefined
  );
}

async function httpRequestWithStoryArrayResponse(
  actionType: StoryActions,
  payload: StoryApiPayload
): Promise<Array<Story>> {
  const response: StoryApiResponse = await storyHttp(actionType, payload);
  if (response as Array<Story>) {
    return response as Array<Story>;
  } else {
    throw new Error(
      'Expected a string to be returned by call story action: ' + actionType
    );
  }
}

async function httpRequestWithEmptyResponse(
  actionType: StoryActions,
  payload: StoryApiPayload
): Promise<boolean> {
  return storyHttp(actionType, payload)
    .then(res => true)
    .catch(e => {
      console.error(e);
      return false;
    });
}

async function storyHttp(
  actionType: StoryActions,
  payload: StoryApiPayload
): Promise<StoryApiResponse> {
  let response: unknown;
  switch (actionType) {
    case StoryActions.CREATE:
      response = authenticatedPost('story', payload as object);
      break;
    case StoryActions.UPDATE:
      response = authenticatedPut('story', payload as object);
      break;
    case StoryActions.GET_ALL_STORIES:
      response = get('story'); // no token required so don't prompt for login
      break;
    case StoryActions.DELETE_WITH_ID:
      response = authenticatedDel('story/' + payload);
      break;
    default:
      throw new Error('Unimplemented mutation action on Story: ' + actionType);
  }
  return response as StoryApiResponse;
}
