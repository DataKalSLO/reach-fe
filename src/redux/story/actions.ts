import { EditorState } from 'draft-js';
import { uuid } from 'uuidv4';
import { emptyTextBlock } from './reducer';
import {
  CreateEmptyTextBlockAction,
  CreateGraphBlockAction,
  CREATE_EMPTY_TEXT_BLOCK,
  CREATE_GRAPH_BLOCK,
  DeleteBlockAction,
  DELETE_BLOCK,
  GRAPH_BLOCK_TYPE,
  PublicationStatus,
  SwapBlocksAction,
  SWAP_BLOCKS,
  UpdateDescriptionAction,
  UpdatePublicationStatusAction,
  UpdateTextBlockAction,
  UpdateTitleAction,
  UPDATE_DESCRIPTION,
  UPDATE_PUBLICATION_STATUS,
  UPDATE_TEXT_BLOCK,
  UPDATE_TITLE,
  LoadExistingStoryAction,
  Story,
  LOAD_EXISTING_STORY
} from './types';

export function createEmptyTextBlock(): CreateEmptyTextBlockAction {
  return {
    type: CREATE_EMPTY_TEXT_BLOCK,
    payload: {
      block: emptyTextBlock()
    }
  };
}

export function createGraphBlock(): CreateGraphBlockAction {
  return {
    type: CREATE_GRAPH_BLOCK,
    payload: {
      block: {
        id: uuid(),
        graphID: uuid(),
        type: GRAPH_BLOCK_TYPE
      }
    }
  };
}

export function deleteBlock(index: number): DeleteBlockAction {
  return {
    type: DELETE_BLOCK,
    payload: { index: index }
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

export function updatePublicationStatus(
  newPublicationStatus: PublicationStatus
): UpdatePublicationStatusAction {
  return {
    type: UPDATE_PUBLICATION_STATUS,
    payload: { newPublicationStatus: newPublicationStatus }
  };
}

export function loadExistingStory(storyToLoad: Story): LoadExistingStoryAction {
  return {
    type: LOAD_EXISTING_STORY,
    payload: { storyToLoad: storyToLoad }
  };
}
