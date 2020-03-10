import { EditorState } from 'draft-js';
import { uuid } from 'uuidv4';
import {
  CREATE_EMPTY_TEXT_BLOCK,
  SWAP_BLOCKS,
  UPDATE_TEXT_BLOCK,
  CreateEmptyTextBlockAction,
  UpdateTextBlockAction,
  SwapBlocksAction
} from './types';
import { TEXT_BLOCK_TYPE } from '../../stories/StoryTypes';

export function createEmptyTextBlock(): CreateEmptyTextBlockAction {
  return {
    type: CREATE_EMPTY_TEXT_BLOCK,
    payload: {
      block: {
        id: uuid(),
        editorState: EditorState.createEmpty(),
        type: TEXT_BLOCK_TYPE
      }
    }
  };
}

export function updateTextBlock(
  index: number,
  editorState: EditorState
): UpdateTextBlockAction {
  return {
    type: UPDATE_TEXT_BLOCK,
    payload: { index: index, editorState: editorState }
  };
}

export function swapBlocks(
  oldIndex: number,
  newIndex: number
): SwapBlocksAction {
  return {
    type: SWAP_BLOCKS,
    payload: { oldIndex: oldIndex, newIndex: newIndex }
  };
}
