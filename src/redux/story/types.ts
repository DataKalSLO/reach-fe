import { EditorState } from 'draft-js';
import { TextBlock } from '../../stories/StoryTypes';

export const CREATE_EMPTY_TEXT_BLOCK = 'CREATE_EMPTY_TEXT_BLOCK';
export const UPDATE_TEXT_BLOCK = 'UPDATE_TEXT_BLOCK';
export const SWAP_BLOCKS = 'SWAP_BLOCKS';

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

export type StoryActionType =
  | CreateEmptyTextBlockAction
  | UpdateTextBlockAction
  | SwapBlocksAction;
