import { EditorState } from 'draft-js';

//Text block types
export const TEXT_BLOCK_TYPE = 'Text';
export const GRAPH_BLOCK_TYPE = 'Graph';
export const MAP_BLOCK_TYPE = 'Map';

//Action names
export const CREATE_EMPTY_TEXT_BLOCK = 'CREATE_EMPTY_TEXT_BLOCK';
export const UPDATE_TEXT_BLOCK = 'UPDATE_TEXT_BLOCK';
export const SWAP_BLOCKS = 'SWAP_BLOCKS';
export const UPDATE_TITLE = 'UPDATE_TITLE';
export const UPDATE_DESCRIPTION = 'UPDATE_DESCRIPTION';

//Story-related types

export interface Story {
  id: string;
  userID: string;
  title: string;
  description: string;
  storyBlocks: Array<StoryBlock>;
}

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

export type StoryBlock = TextBlock | GraphBlock | MapBlock;

//Actions

export interface CreateEmptyTextBlockAction {
  type: typeof CREATE_EMPTY_TEXT_BLOCK;
  payload: { block: TextBlock };
}

export interface UpdateTextBlockAction {
  type: typeof UPDATE_TEXT_BLOCK;
  payload: { index: number; editorState: EditorState };
}

export interface SwapBlocksAction {
  type: typeof SWAP_BLOCKS;
  payload: { oldIndex: number; newIndex: number };
}

export interface UpdateTitleAction {
  type: typeof UPDATE_TITLE;
  payload: { newTitle: string };
}

export interface UpdateDescriptionAction {
  type: typeof UPDATE_DESCRIPTION;
  payload: { newDescription: string };
}

// use in updateObjectInArray function (reducer.ts) when updating a single object.
// interfaces of this type must include:
//  - index
//  - <data-to-change>
export type UpdateBlockType = UpdateTextBlockAction;

// used by reducer function (reducer.ts)
export type StoryActionType =
  | CreateEmptyTextBlockAction
  | UpdateTextBlockAction
  | SwapBlocksAction
  | UpdateTitleAction
  | UpdateDescriptionAction;
