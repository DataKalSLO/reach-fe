import { del, get, post, put } from '../api/base';
import {
  DatabaseStory,
  DatabaseStoryBlock,
  Story,
  StoryBlock,
  TEXT_BLOCK_DB_TYPE,
  TEXT_BLOCK_TYPE
} from './StoryTypes';

/* The types of actions that mutate a story and
 * expect a Story to be returned from BEND.
 */
enum StoryMutateAction {
  CREATE_STORY,
  UPDATE_STORY
}

/* Transforms Story to CreateStory API call specifications,
 * makes call, then returns created Story.
 */
export function saveStory(story: Story): Promise<Story> {
  return mutateStory(story, StoryMutateAction.CREATE_STORY);
}

/* Transforms Story to UpdateStory API call specifications,
 * makes call, then returns created Story.
 */
export function updateStory(story: Story): Promise<Story> {
  return mutateStory(story, StoryMutateAction.UPDATE_STORY);
}

/* Deletes the Story and StoryBlocks associated with given StoryID from the database.
 * Returns the id of the StoryDeleted.
 */
export function deleteStory(storyID: Story): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    del(['story', storyID].join('/'))
      .then(data => {
        resolve(data);
      })
      .catch(e => reject(e));
  });
}

/* Returns a list of all the stories in the database.
 */
export function getAllStories(): Promise<Story[]> {
  return new Promise<Story[]>((resolve, reject) => {
    get('story')
      .then(responseObject =>
        resolve(responseObject.map(transformAPIResponseToStory))
      )
      .catch(e => reject(e));
  });
}

/* Returns a Story having the given StoryID.
 */
export function getStoryWithStoryID(
  storyID: string
): Promise<Story> {
  return new Promise<Story>((resolve, reject) => {
    get(['story', storyID].join('/'))
      .then(responseObject =>
        resolve(transformAPIResponseToStory(responseObject))
      )
      .catch(e => reject(e));
  });
}

/* Groups all actions that require transforming a Story and sending the result to a
 * mutate API post, put, delete
 * TODO: Merge Update and Create functionality into the PUT request
 */
function mutateStory(
  story: Story,
  actionType: StoryMutateAction
): Promise<Story> {
  return new Promise<Story>((resolve, reject) => {
    let promiseResponse;
    const databaseStory = transformStoryToDatabaseStory(story);
    switch (actionType) {
      case StoryMutateAction.CREATE_STORY:
        promiseResponse = post('story', databaseStory);
        break;
      case StoryMutateAction.UPDATE_STORY:
        promiseResponse = put('story', databaseStory);
        break;
      default:
        throw new Error(
          'Unimplemented mutation action on Story: ' + actionType
        );
    }
    promiseResponse.then(data => resolve(data)).catch(e => reject(e));
  });
}

/* Performs the necessary operations to convert a Story to the
 * expected object format on the backend.
 */
function transformStoryToDatabaseStory(story: Story): DatabaseStory {
  return {
    ...story,
    storyBlocks: story.storyBlocks.map(transformStoryBlockToDatabaseStoryBlock)
  };
}

/* Serialies the EditorState of a given TextBlock to a string.
 * StoryBlock is returned if not a TextBlock;
 */
function transformStoryBlockToDatabaseStoryBlock(
  storyBlock: StoryBlock
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

/* Converts from StoryDB to Story. This is necessary because some
 * values are represented differently between BEND and FEND.
 * specifically, unstructured JSON like EditorState (from DraftJS)
 * is stored as a string on the backend.
 */
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

/* Parses a TextBlockDB's the stringified EditorState's into a DraftJS's EditorState.
 * StoryBlock is returned if not a TextBlock;
 */
function transformDatabaseStoryBlockToStoryBlock(
  storyBlock: DatabaseStoryBlock
): StoryBlock {
  switch (storyBlock.type) {
    case TEXT_BLOCK_DB_TYPE:
      return {
        ...storyBlock,
        type: TEXT_BLOCK_TYPE,
        editorState: EditorState.createWithContent(
          convertFromRaw(SON.parse(storyBlock.editorState))
      )
      };
    default:
      return storyBlock;
  }
}
