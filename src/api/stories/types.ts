import {
  GraphBlockType,
  MapBlockType,
  StoryMetaInformation
} from '../../redux/story/types';

export const TEXT_BLOCK_DB_TYPE = 'TEXTDB'; // Must match naming in BEND

export interface StoryDb extends StoryMetaInformation {
  storyBlocks: Array<StoryBlockDb>;
}

export interface TextBlockDB {
  type: typeof TEXT_BLOCK_DB_TYPE;
  id: string;
  editorState: string;
}

export type StoryBlockDb = TextBlockDB | GraphBlockType | MapBlockType;
