import { GraphBlock, MapBlock } from '../redux/story/types';

export const TEXT_BLOCK_DB_TYPE = 'TextDB'; // Database version of TextBlock

export interface StoryMetaInformation {
  id: string;
  userID: string;
  title: string;
  description: string;
}

export interface DatabaseStory extends StoryMetaInformation {
  storyBlocks: Array<DatabaseStoryBlock>;
}

export interface TextBlockDB {
  type: typeof TEXT_BLOCK_DB_TYPE;
  id: string;
  editorState: string;
}

export type DatabaseStoryBlock = TextBlockDB | GraphBlock | MapBlock;