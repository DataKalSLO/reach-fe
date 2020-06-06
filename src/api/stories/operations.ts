import { Story } from '../../redux/story/types';
import {
  authenticatedDel,
  authenticatedGet,
  authenticatedPost,
  authenticatedPut,
  optionalAuthenticatedGet
} from '../authenticatedApi/operations';
import { get } from '../base';
import { transformToStory, transformToStoryDB } from './converter';
import { StoryDB } from './types';

enum StoryActions {
  CREATE,
  UPDATE,
  DELETE_WITH_ID,
  GET_STORIES_WITH_USER_ID,
  GET_STORIES_PUBLISHED,
  GET_STORIES_REVIEW,
  GET_STORIES_DRAFT
}

type StoryApiResponse = void | StoryDB | Array<StoryDB>;
type StoryApiPayload = string | StoryDB | undefined;

const STORY_BASE_ENDPOINT = 'story';

export async function saveOrUpdateExistingStory(story: Story): Promise<void> {
  const databaseStory = transformToStoryDB(story);
  return storyHttp(StoryActions.CREATE, databaseStory) as Promise<void>;
}

export function deleteStoryById(storyId: string): Promise<void> {
  return storyHttp(StoryActions.DELETE_WITH_ID, storyId) as Promise<void>;
}

export async function getStoryWithStoryID(storyID: string): Promise<Story> {
  // draft stories require token, published don't. Sending token harmless in latter.
  return transformToStory(await get(['story', storyID].join('/')));
}

export async function getStoriesWithUserId(): Promise<Story[]> {
  return httpRequestWithStoryArrayResponse(
    StoryActions.GET_STORIES_WITH_USER_ID,
    undefined
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
  const rawStories: Array<object> = (await storyHttp(
    actionType,
    payload
  )) as Array<object>;
  return rawStories.map(transformToStory) as Array<Story>;
}

//TODO: Extract endpoints into constants.ts
async function storyHttp(
  actionType: StoryActions,
  payload: StoryApiPayload
): Promise<StoryApiResponse> {
  let response: unknown;
  switch (actionType) {
    case StoryActions.CREATE:
      response = authenticatedPost(STORY_BASE_ENDPOINT, payload as object);
      break;
    case StoryActions.UPDATE:
      response = authenticatedPut(STORY_BASE_ENDPOINT, payload as object);
      break;
    case StoryActions.GET_STORIES_WITH_USER_ID:
      response = authenticatedGet([STORY_BASE_ENDPOINT, 'user'].join('/')); //user id gathered from token
      break;
    case StoryActions.GET_STORIES_PUBLISHED:
      response = get(STORY_BASE_ENDPOINT); // no token required so don't prompt for login
      break;
    case StoryActions.GET_STORIES_REVIEW:
      response = authenticatedGet([STORY_BASE_ENDPOINT, 'review'].join('/'));
      break;
    case StoryActions.GET_STORIES_DRAFT:
      response = authenticatedGet([STORY_BASE_ENDPOINT, 'draft'].join('/'));
      break;
    case StoryActions.DELETE_WITH_ID:
      response = authenticatedDel([STORY_BASE_ENDPOINT, payload].join('/'));
      break;
    default:
      throw new Error('Unimplemented mutation action on Story: ' + actionType);
  }
  return response as Promise<StoryApiResponse>;
}
