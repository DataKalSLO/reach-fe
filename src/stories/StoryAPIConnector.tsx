import { del, get, post, put } from '../api/base';
import {
  Story,
  StoryBlockType,
  TextBlockType,
  TEXT_BLOCK_TYPE
} from '../redux/story/types';
import {
  DatabaseStory,
  DatabaseStoryBlock,
  TEXT_BLOCK_DB_TYPE
} from './StoryDBTypes';
import { EditorState, convertFromRaw } from 'draft-js';

enum StoryActions {
  CREATE,
  UPDATE,
  DELETE_WITH_ID,
  GET_ALL_STORIES
}

type StoryApiResponse = string | Story | Array<Story>;
type StoryApiPayload = string | DatabaseStory;

export function saveStory(story: Story): Promise<string> {
  const databaseStory = transformStoryToDatabaseStory(story);
  return httpRequestWithStringResponse(StoryActions.CREATE, databaseStory);
}

export function updateStory(story: Story): Promise<string> {
  const databaseStory = transformStoryToDatabaseStory(story);
  return httpRequestWithStringResponse(StoryActions.UPDATE, databaseStory);
}

export function deleteStory(story: Story): Promise<string> {
  return httpRequestWithStringResponse(StoryActions.DELETE_WITH_ID, story.id);
}

export async function getStoryWithStoryID(storyID: string): Promise<Story> {
  return transformAPIResponseToStory(get(['story', storyID].join('/')));
}

export async function getAllStories(): Promise<Story[]> {
  return httpRequestWithStoryArrayResponse(StoryActions.GET_ALL_STORIES);
}

async function httpRequestWithStoryArrayResponse(
  actionType: StoryActions,
  payload: StoryApiPayload | void
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

async function httpRequestWithStringResponse(
  actionType: StoryActions,
  payload: StoryApiPayload
): Promise<string> {
  const response: StoryApiResponse = await storyHttp(actionType, payload);
  if (response as string) {
    return response as string;
  } else {
    throw new Error(
      'Expected a string to be returned by call story action: ' + actionType
    );
  }
}

async function storyHttp(
  actionType: StoryActions,
  payload: StoryApiPayload | void
): Promise<StoryApiResponse> {
  let response: unknown;
  switch (actionType) {
    case StoryActions.CREATE:
      response = post('story', payload as object);
      break;
    case StoryActions.UPDATE:
      response = put('story', payload as object);
      break;
    case StoryActions.GET_ALL_STORIES:
      response = get('story');
      break;
    case StoryActions.DELETE_WITH_ID:
      response = del('story/' + payload);
      break;
    default:
      throw new Error('Unimplemented mutation action on Story: ' + actionType);
  }
  return response as StoryApiResponse;
}

function transformStoryToDatabaseStory(story: Story): DatabaseStory {
  return {
    ...story,
    storyBlocks: story.storyBlocks.map(transformStoryBlockToDatabaseStoryBlock)
  };
}

//If given a TextBlock, Serializes the EditorState as a string
//Otherwise, storyBlock is returned.
function transformStoryBlockToDatabaseStoryBlock(
  storyBlock: StoryBlockType
): DatabaseStoryBlock {
  switch (storyBlock.type) {
    case TEXT_BLOCK_TYPE:
      return {
        ...storyBlock,
        type: TEXT_BLOCK_DB_TYPE,
        editorState: JSON.stringify(storyBlock.editorState)
      };
    default:
      return storyBlock;
  }
}

//Parses any types in each story block
function transformAPIResponseToStory(apiResponse: object): Story {
  if (apiResponse as DatabaseStory) {
    const databaseStory: DatabaseStory = apiResponse as DatabaseStory;
    return {
      ...databaseStory,
      storyBlocks: databaseStory.storyBlocks.map(
        transformDatabaseStoryBlockToStoryBlock
      )
    };
  }
  throw new Error('API response object not in Story format');
}

//Parses a TextBlockDB's the stringified EditorState's into a DraftJS's EditorState.
function transformDatabaseStoryBlockToStoryBlock(
  storyBlock: DatabaseStoryBlock
): StoryBlockType {
  switch (storyBlock.type) {
    case TEXT_BLOCK_DB_TYPE:
      return {
        ...storyBlock,
        type: TEXT_BLOCK_TYPE,
        editorState: EditorState.createWithContent(
          convertFromRaw(JSON.parse(storyBlock.editorState))
        )
      } as TextBlockType;
    default:
      return storyBlock;
  }
}
