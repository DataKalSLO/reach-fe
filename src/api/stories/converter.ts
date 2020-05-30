import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { TEXT_BLOCK_DB_TYPE, StoryDb, StoryBlockDb } from './types';
import {
  Story,
  StoryBlockType,
  TextBlockType,
  TEXT_BLOCK_TYPE
} from '../../redux/story/types';
export function transformStoryToDatabaseStory(story: Story): StoryDb {
  return {
    ...story,
    storyBlocks: story.storyBlocks.map(transformToStoryBlockDb)
  };
}

//If given a TextBlock, Serializes the EditorState as a string
//Otherwise, storyBlock is returned.
function transformToStoryBlockDb(storyBlock: StoryBlockType): StoryBlockDb {
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
export function transformApiResponseToStory(databaseStory: StoryDb): Story {
  return {
    ...databaseStory,
    storyBlocks: databaseStory.storyBlocks.map(transformToStoryBlock)
  };
}

//Parses a TextBlockDB's the stringified EditorState's into a DraftJS's EditorState.
function transformToStoryBlock(storyBlock: StoryBlockDb): StoryBlockType {
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
