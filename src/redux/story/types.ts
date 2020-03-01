import { EditorState } from 'draft-js';
import { TextBlock } from '../../stories/StoryTypes';

export const CREATE_TEXT_BLOCK = 'CREATE_TEXT_BLOCK';
export const UPDATE_TEXT_BLOCK = 'UPDATE_TEXT_BLOCK';
export const SWAP_BLOCKS = 'SWAP_BLOCKS';

interface CreateTextBlockAction {
  type: typeof CREATE_TEXT_BLOCK;
  payload: { block: TextBlock };
}

interface UpdateTextBlockAction {
  type: typeof UPDATE_TEXT_BLOCK;
  payload: { index: number; editorState: EditorState };
}

interface SwapBlocksAction {
  type: typeof SWAP_BLOCKS;
  payload: { oldIndex: number; newIndex: number };
}

export type StoryActionType =
  | CreateTextBlockAction
  | UpdateTextBlockAction
  | SwapBlocksAction;
