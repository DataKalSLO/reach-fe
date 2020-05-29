import {
  GraphBlockType,
  MapBlockType,
  StoryMetaInformation
} from '../../redux/story/types';

export const TEXT_BLOCK_DB_TYPE = 'TextDB'; // Database version of TextBlock

export interface StoryDb extends StoryMetaInformation {
  storyBlocks: Array<StoryBlockDb>;
}

export interface TextBlockDb {
  type: typeof TEXT_BLOCK_DB_TYPE;
  id: string;
  editorState: string;
}

export type StoryBlockDb = TextBlockDb | GraphBlockType | MapBlockType;
