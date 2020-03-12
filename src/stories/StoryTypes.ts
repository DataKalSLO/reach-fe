import { EditorState } from 'draft-js';

export interface Story {
  id: string;
  userID: string;
  title: string;
  description: string;
  storyBlocks: Array<StoryBlock>;
}

export const TEXT_BLOCK_TYPE = 'Text';
export const GRAPH_BLOCK_TYPE = 'Graph';
export const MAP_BLOCK_TYPE = 'Map';

/*
 * Story Blocks define the properties needed to generate the associated react components
 * Story Blocks also have 1-1 mapping with database objects
 */
export interface TextBlock {
  type: typeof TEXT_BLOCK_TYPE;
  id: string;
  editorState: EditorState;
}

export interface GraphBlock {
  type: typeof GRAPH_BLOCK_TYPE;
  id: string;
  graphID: number; //FIXME: revert to string (used for demo)
}
export interface MapBlock {
  type: typeof MAP_BLOCK_TYPE;
  id: string;
  mapID: string;
}

export type StoryBlock = TextBlock | GraphBlock | MapBlock;
