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

/* Database version of TextBlock */
export const TEXT_BLOCK_DB_TYPE = 'TextDB';

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
  graphID: string;
}
export interface MapBlock {
  type: typeof MAP_BLOCK_TYPE;
  id: string;
  mapID: string;
}

/* The version of TextBlock that the API backend expects */
export interface TextBlockDB {
  type: typeof TEXT_BLOCK_DB_TYPE;
  id: string;
  editorState: string; //API will not receive JSON object (reasoning in StoryAPIConnector)
}

export type StoryBlock = TextBlock | GraphBlock | MapBlock | TextBlockDB;
