import {
  GraphBlockType,
  ImageBlockType,
  MapBlockType,
  StoryMetaInformation
} from '../../redux/story/types';

export const TEXT_BLOCK_DB_TYPE = 'TEXTDB'; // Must match naming in BEND

export interface StoryDB extends StoryMetaInformation {
  storyBlocks: Array<StoryBlockDB>;
}

export interface TextBlockDB {
  type: typeof TEXT_BLOCK_DB_TYPE;
  id: string;
  editorState: string;
}

export type StoryBlockDB =
  | TextBlockDB
  | GraphBlockType
  | ImageBlockType
  | MapBlockType;
