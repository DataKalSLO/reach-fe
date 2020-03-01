import { Story, TextBlock, GraphBlock, StoryBlock } from './StoryTypes';
import { EditorState } from 'draft-js';
import { post, get, put } from '../api/base';

export interface TextBlockDB extends StoryBlock {
  editorState: string;
}

/* Makes
 */
export function saveStoryToDatabase(story: Story): Promise<Story[]> {
  return new Promise<Story[]>((resolve, reject) => {
    post('story', transformStoryToAPIObject(story))
      .then(data => resolve(data))
      .catch(e => reject(e));
  });
}

/*
 */
export function updateStoryInDatabase(story: Story): Story {
  return parseAPIObjectToStory(
    put('story', transformStoryToAPIObject(story))
  ) as Story;
}

/* Returns a Promise that resolves a list of all the Stories
 * in the database.
 */
export function loadStories(): Promise<Story[]> {
  return new Promise<Story[]>((resolve, reject) => {
    get('story')
      .then(data => resolve(data.map(parseAPIObjectToStory)))
      .catch(e => reject(e));
  });
}

/* Performs the necessary operations to convert a Story to the
 * expected object format on the backend.
 */
function transformStoryToAPIObject(story: Story): Story {
  return {
    ...story,
    storyBlocks: story.storyBlocks.map(storyBlock => {
      if (storyBlock as TextBlock) {
        const textBlock: TextBlock = storyBlock as TextBlock;
        return {
          ...textBlock,
          editorState: JSON.stringify(textBlock.editorState)
        };
      }
      return storyBlock;
    })
  };
}

/* Converts from StoryDB to Story. This is necessary because some
 * values are represented differently between BEND and FEND.
 * specifically, unstructured JSON like EditorState (from DraftJS)
 * is stored as a string on the backend.
 */
function parseAPIObjectToStory(apiObject: object): Story {
  if (apiObject as Story) {
    const dbStory: Story = apiObject as Story;
    return {
      ...dbStory,
      storyBlocks: dbStory.storyBlocks.map((storyBlock: StoryBlock) => {
        if (storyBlock as TextBlockDB) {
          const textBlockDB: TextBlockDB = storyBlock as TextBlockDB;
          return {
            ...textBlockDB,
            editorState: JSON.parse(textBlockDB.editorState) as EditorState //Parse from string to Object
          };
        } else return storyBlock;
      })
    };
  }
  throw new Error('API response object not in Story format');
}
