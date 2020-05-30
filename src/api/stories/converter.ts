import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { TEXT_BLOCK_DB_TYPE, StoryDB, StoryBlockDB } from './types';
import {
  Story,
  StoryBlockType,
  TextBlockType,
  TEXT_BLOCK_TYPE
} from '../../redux/story/types';

const STORY_TRANSFORMATION_ERROR = 'Could not transform object to story.';

export function transformStoryToDatabaseStory(story: Story): StoryDB {
  return {
    ...story,
    storyBlocks: story.storyBlocks.map(transformToStoryBlockDB)
  };
}

//If given a TextBlock, Serializes the EditorState as a string
//Otherwise, storyBlock is returned.
function transformToStoryBlockDB(storyBlock: StoryBlockType): StoryBlockDB {
  switch (storyBlock.type) {
    case TEXT_BLOCK_TYPE:
      return {
        ...storyBlock,
        type: TEXT_BLOCK_DB_TYPE,
        editorState: JSON.stringify(
          convertToRaw(storyBlock.editorState.getCurrentContent())
        )
      };
    default:
      return storyBlock;
  }
}

//Parses any types in each story block
export function transformToStory(object: object): Story {
  if (object as StoryDB) {
    const databaseStory: StoryDB = object as StoryDB;
    return {
      ...databaseStory,
      dateCreated: new Date(databaseStory.dateCreated),
      dateLastEdited: new Date(databaseStory.dateLastEdited),
      storyBlocks: databaseStory.storyBlocks.map(transformToStoryBlock)
    } as Story;
  } else {
    throw STORY_TRANSFORMATION_ERROR;
  }
}

//Parses a TextBlockDB's the stringified EditorState's into a DraftJS's EditorState.
function transformToStoryBlock(storyBlock: StoryBlockDB): StoryBlockType {
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
