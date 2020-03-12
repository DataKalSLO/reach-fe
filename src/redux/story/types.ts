import { EditorState } from 'draft-js';
import { TextBlock, GraphBlock } from '../../stories/StoryTypes';

export const CREATE_EMPTY_TEXT_BLOCK = 'CREATE_EMPTY_TEXT_BLOCK';
export const CREATE_GRAPH_BLOCK = 'CREATE_GRAPH_BLOCK';
export const UPDATE_GRAPH_BLOCK = 'UPDATE_GRAPH_BLOCK';
export const UPDATE_TEXT_BLOCK = 'UPDATE_TEXT_BLOCK';
export const SWAP_BLOCKS = 'SWAP_BLOCKS';
export const UPDATE_TITLE = 'UPDATE_TITLE';
export const UPDATE_DESCRIPTION = 'UPDATE_DESCRIPTION';

export interface CreateEmptyTextBlockAction {
  type: typeof CREATE_EMPTY_TEXT_BLOCK;
  payload: { block: TextBlock };
}

export interface CreateGraphBlockAction {
  type: typeof CREATE_GRAPH_BLOCK;
  payload: { block: GraphBlock };
}

export interface UpdateGraphBlockAction {
  type: typeof UPDATE_GRAPH_BLOCK;
  payload: { index: number; graphID: number };
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
export type UpdateBlockType = UpdateTextBlockAction | UpdateGraphBlockAction;

// used by reducer function (reducer.ts)
export type StoryActionType =
  | CreateEmptyTextBlockAction
  | CreateGraphBlockAction
  | UpdateGraphBlockAction
  | UpdateTextBlockAction
  | SwapBlocksAction
  | UpdateTitleAction
  | UpdateDescriptionAction;
