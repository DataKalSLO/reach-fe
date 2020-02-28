import { Story, TextBlock } from '../../stories/StoryTypes';
import {
  StoryActionTypes,
  UPDATE_TITLE,
  UPDATE_TEXT_BLOCK,
  CREATE_TEXT_BLOCK,
  SWAP_BLOCKS,
  UpdateTextBlockAction,
  SwapBlocksAction
} from './types';
import { EditorState } from 'draft-js';
import uuidv4 from 'uuid/v4';

export function createTextBlock() {
  return {
    type: CREATE_TEXT_BLOCK,
    payload: {
      id: uuidv4(),
      editorState: EditorState.createEmpty(),
      type: 'Text' // FIXME: @tan, potentially hard to find bug from loosly typed attribute
    }
  };
}

export function updateTextBlock(payload: UpdateTextBlockAction['payload']) {
  return {
    type: UPDATE_TEXT_BLOCK,
    payload: payload
  };
}

export function swapBlocks(payload: SwapBlocksAction['payload']) {
  return {
    type: SWAP_BLOCKS,
    payload: payload
  };
}
