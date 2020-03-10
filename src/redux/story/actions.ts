import { EditorState } from 'draft-js';
import { uuid } from 'uuidv4';
import { TEXT_BLOCK_TYPE } from '../../stories/StoryTypes';
import {
  CreateEmptyTextBlockAction,
  CREATE_EMPTY_TEXT_BLOCK,
  SwapBlocksAction,
  SWAP_BLOCKS,
  TogglePreviewAction,
  TOGGLE_PREVIEW,
  UpdateDescriptionAction,
  UpdateTextBlockAction,
  UpdateTitleAction,
  UPDATE_DESCRIPTION,
  UPDATE_TEXT_BLOCK,
  UPDATE_TITLE
} from './types';

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

export function updateTitle(newTitle: string): UpdateTitleAction {
  return {
    type: UPDATE_TITLE,
    payload: { newTitle: newTitle }
  };
}

export function updateDescription(
  newDescription: string
): UpdateDescriptionAction {
  return {
    type: UPDATE_DESCRIPTION,
    payload: { newDescription: newDescription }
  };
}

export function togglePreview(): TogglePreviewAction {
  return {
    type: TOGGLE_PREVIEW,
    payload: null
  };
}
