import { UPDATE_TEXT_BLOCK, CREATE_TEXT_BLOCK, SWAP_BLOCKS } from './types';
import { EditorState } from 'draft-js';
import uuidv4 from 'uuid/v4';

export function createTextBlock() {
  return {
    type: CREATE_TEXT_BLOCK,
    payload: {
      id: uuidv4(),
      editorState: EditorState.createEmpty(),
      type: 'Text' // TODO: loosly typed attribute, planned fix rolling out soon
    }
  };
}

export function updateTextBlock(index: number, editorState: EditorState) {
  return {
    type: UPDATE_TEXT_BLOCK,
    payload: { index: index, editorState: editorState }
  };
}

export function swapBlocks(oldIndex: number, newIndex: number) {
  return {
    type: SWAP_BLOCKS,
    payload: { oldIndex: oldIndex, newIndex: newIndex }
  };
}
