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

export function createTextBlock(): CreateEmptyTextBlockAction {
  return {
    type: CREATE_EMPTY_TEXT_BLOCK,
    payload: {
      block: {
        id: uuid(),
        editorState: EditorState.createEmpty(),
        type: 'Text' // TODO: loosly typed attribute, planned fix rolling out soon
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
