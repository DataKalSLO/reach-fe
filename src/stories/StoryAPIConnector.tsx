import { Story, TextBlock, GraphBlock, StoryBlock } from './StoryTypes';
import { EditorState } from 'draft-js';
import { post, get, put, del } from '../api/base';

export interface TextBlockDB extends StoryBlock {
  editorState: string;
}

/* Makes
enum StoryMutateAction {
  CREATE_STORY,
  UPDATE_STORY
}
 */
export function saveStoryToDatabase(story: Story): Promise<Story> {
  return mutateStoryInDatabase(story, StoryMutateAction.CREATE_STORY);
}

/*
 */
export function updateStoryInDatabase(story: Story): Promise<Story> {
  return mutateStoryInDatabase(story, StoryMutateAction.UPDATE_STORY);
}

/* Returns a Promise that resolves a list of all the Stories
 * in the database.
 */
export function deleteStoryInDatabase(storyID: Story): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    del(['story', storyID].join('/'))
      .then(data => {
        resolve(data);
      })
      .catch(e => reject(e));
  });
}
export function getAllStories(): Promise<Story[]> {
  return new Promise<Story[]>((resolve, reject) => {
    get('story')
      .then(responseObject =>
        resolve(responseObject.map(parseAPIResponseObjectToStory))
      )
      .catch(e => reject(e));
  });
}
export function getStoryWithStoryID(storyID: string): Promise<Story> {
  return new Promise<Story>((resolve, reject) => {
    get(['story', storyID].join('/'))
      .then(responseObject =>
        resolve(parseAPIResponseObjectToStory(responseObject))
      )
      .catch(e => reject(e));
  });
}

/* Groups all actions that require transforming a Story and sending the result to a
 * mutate API post, put, delete
 */
function mutateStoryInDatabase(
  story: Story,
  actionType: StoryMutateAction
): Promise<Story> {
  return new Promise<Story>((resolve, reject) => {
    let promiseResponse;
    const apiObject = transformStoryToAPIObject(story);
    switch (actionType) {
      case StoryMutateAction.CREATE_STORY:
        promiseResponse = post('story', apiObject);
        break;
      case StoryMutateAction.UPDATE_STORY:
        promiseResponse = put('story', apiObject);
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
function transformStoryToAPIObject(story: Story): Story {
  return {
    ...story,
    storyBlocks: story.storyBlocks.map(transformTextBlockToTextBlockDB)
  };
}

/* Converts from StoryDB to Story. This is necessary because some
 * values are represented differently between BEND and FEND.
 * specifically, unstructured JSON like EditorState (from DraftJS)
 * is stored as a string on the backend.
 */
function parseAPIResponseObjectToStory(apiResponseObject: object): Story {
  if (apiResponseObject as Story) {
    const dbStory: Story = apiResponseObject as Story;
    return {
      ...dbStory,
      storyBlocks: dbStory.storyBlocks.map(transformTextBlockDBToTextBlock)
    };
  }
  throw new Error('API response object not in Story format');
}
function transformTextBlockToTextBlockDB(storyBlock: StoryBlock): StoryBlock {
  if (storyBlock as TextBlock) {
    const textBlock = storyBlock as TextBlock;
    return {
      ...textBlock,
      editorState: JSON.stringify(textBlock.editorState)
    } as TextBlockDB;
  }
  return storyBlock;
}
function transformTextBlockDBToTextBlock(storyBlock: StoryBlock): StoryBlock {
  if (storyBlock as TextBlockDB) {
    const textBlockDB = storyBlock as TextBlockDB;
    return {
      ...storyBlock,
      editorState: JSON.parse(textBlockDB.editorState) as EditorState
    } as TextBlock;
  }
  return storyBlock;
}
