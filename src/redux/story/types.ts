import { EditorState } from 'draft-js';
import { StoryBlock } from '../../stories/StoryTypes';

export const UPDATE_TITLE = 'UPDATE_TITLE';
export const UPDATE_TEXT_BLOCK = 'UPDATE_TEXT_BLOCK';
export const CREATE_TEXT_BLOCK = 'CHANGE_BLOCKS';
export const SWAP_BLOCKS = 'SWAP_BLOCKS';

interface UpdateTitleAction {
  type: typeof UPDATE_TITLE;
  payload: { text: string };
}

export interface UpdateTextBlockAction {
  type: typeof UPDATE_TEXT_BLOCK;
  payload: { index: number; editorState: EditorState };
}

interface CreateTextBlockAction {
  type: typeof CREATE_TEXT_BLOCK;
  payload: StoryBlock;
}

export interface SwapBlocksAction {
  type: typeof SWAP_BLOCKS;
  payload: { oldIndex: number; newIndex: number };
}

export type StoryActionTypes =
  | UpdateTitleAction
  | UpdateTextBlockAction
  | CreateTextBlockAction
  | SwapBlocksAction;
