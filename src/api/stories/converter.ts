import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { TEXT_BLOCK_DB_TYPE, DatabaseStory, DatabaseStoryBlock } from './types';
import {
  Story,
  StoryBlockType,
  TextBlockType,
  TEXT_BLOCK_TYPE
} from '../../redux/story/types';

export function transformStoryToDatabaseStory(story: Story): DatabaseStory {
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
        editorState: JSON.stringify(
          convertToRaw(storyBlock.editorState.getCurrentContent())
        )
      };
    default:
      return storyBlock;
  }
}

//Parses any types in each story block
export function transformAPIResponseToStory(apiResponse: object): Story {
  if (apiResponse as DatabaseStory) {
    const databaseStory: DatabaseStory = apiResponse as DatabaseStory;
    return {
      ...databaseStory,
      dateCreated: new Date(databaseStory.dateCreated),
      dateLastEdited: new Date(databaseStory.dateLastEdited),
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
