import {
  authenticatedGet,
  authenticatedDel,
  authenticatedPost,
  authenticatedPut
} from '../authenticatedApi/operations';
import { get } from '../base';
import { Story } from '../../redux/story/types';
import { StoryDb } from './types';
import { transformToStoryDb, transformAPIResponseToStory } from './converter';

enum StoryActions {
  CREATE,
  UPDATE,
  DELETE_WITH_ID,
  GET_STORIES_PUBLISHED,
  GET_STORIES_REVIEW,
  GET_STORIES_DRAFT
}

type StoryApiResponse = void | Story | Array<StoryDb>;
type StoryApiPayload = string | StoryDb | undefined;

export async function saveOrUpdateExistingStory(story: Story): Promise<void> {
  const databaseStory = transformToStoryDb(story);
  return storyHttp(StoryActions.CREATE, databaseStory) as Promise<void>;
}

export function deleteStoryById(storyId: string): Promise<void> {
  return storyHttp(StoryActions.DELETE_WITH_ID, storyId) as Promise<void>;
}

export async function getStoryWithStoryID(storyID: string): Promise<Story> {
  // draft stories require token, published don't. Sending token harmless in latter.
  return transformAPIResponseToStory(
    await authenticatedGet(['story', storyID].join('/'))
  );
}

export async function getPublishedStories(): Promise<Story[]> {
  return httpRequestWithStoryArrayResponse(
    StoryActions.GET_STORIES_PUBLISHED,
    undefined
  );
}

export async function getStoriesInReview(): Promise<Story[]> {
  return httpRequestWithStoryArrayResponse(
    StoryActions.GET_STORIES_REVIEW,
    undefined
  );
}

export async function getStoriesInDraft(): Promise<Story[]> {
  return httpRequestWithStoryArrayResponse(
    StoryActions.GET_STORIES_DRAFT,
    undefined
  );
}

async function httpRequestWithStoryArrayResponse(
  actionType: StoryActions,
  payload: StoryApiPayload
): Promise<Array<Story>> {
  const response: StoryApiResponse = (await storyHttp(
    actionType,
    payload
  )) as Array<StoryDb>;
  return response.map(transformAPIResponseToStory);
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
    case StoryActions.GET_STORIES_PUBLISHED:
      response = get('story'); // no token required so don't prompt for login
      break;
    case StoryActions.GET_STORIES_REVIEW:
      response = authenticatedGet('story/review');
      break;
    case StoryActions.GET_STORIES_DRAFT:
      response = authenticatedGet('story/draft');
      break;
    case StoryActions.DELETE_WITH_ID:
      response = authenticatedDel('story/' + payload);
      break;
    default:
      throw new Error('Unimplemented mutation action on Story: ' + actionType);
  }
  return response as Promise<StoryApiResponse>;
}
