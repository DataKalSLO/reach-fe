import { EditorState } from 'draft-js';
import { GRAPH_BLOCK_TYPE } from '../../stories/StoryTypes';
import { emptyTextBlock } from './reducer';
import {
  CreateEmptyTextBlockAction,
  CreateGraphBlockAction,
  CREATE_EMPTY_TEXT_BLOCK,
  CREATE_GRAPH_BLOCK,
  SwapBlocksAction,
  SWAP_BLOCKS,
  UpdateDescriptionAction,
  UpdateTextBlockAction,
  UpdateTitleAction,
  UPDATE_DESCRIPTION,
  UPDATE_TEXT_BLOCK,
  UPDATE_TITLE,
  UPDATE_GRAPH_BLOCK,
  UpdateGraphBlockAction
} from './types';
import { uuid } from 'uuidv4';

export function createEmptyTextBlock(): CreateEmptyTextBlockAction {
  return {
    type: CREATE_EMPTY_TEXT_BLOCK,
    payload: {
      block: emptyTextBlock
    }
  };
}

export function createGraphBlock(): CreateGraphBlockAction {
  return {
    type: CREATE_GRAPH_BLOCK,
    payload: {
      block: {
        id: uuid(),
        graphID: 0,
        type: GRAPH_BLOCK_TYPE
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

export function updateGraphBlock(
  index: number,
  graphID: number
): UpdateGraphBlockAction {
  return {
    type: UPDATE_GRAPH_BLOCK,
    payload: { index: index, graphID: graphID }
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
