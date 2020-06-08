import { EditorState } from 'draft-js';
import {
  getEmptyGraphBlock,
  getEmptyImageBlock,
  getEmptyTextBlock
} from './initializers';
import {
  CreateEmptyImageBlockAction,
  CreateEmptyTextBlockAction,
  CreateGraphBlockAction,
  CREATE_EMPTY_IMAGE_BLOCK,
  CREATE_EMPTY_TEXT_BLOCK,
  CREATE_GRAPH_BLOCK,
  DeleteBlockAction,
  DELETE_BLOCK,
  LoadExistingStoryAction,
  LOAD_EXISTING_STORY,
  PublicationStatus,
  Story,
  SwapBlocksAction,
  SWAP_BLOCKS,
  UpdateDescriptionAction,
  UpdateGraphBlockAction,
  UpdateImageBlockAction,
  UpdatePublicationStatusAction,
  UpdateTextBlockAction,
  UpdateTitleAction,
  UPDATE_DESCRIPTION,
  UPDATE_GRAPH_BLOCK,
  UPDATE_IMAGE_BLOCK,
  UPDATE_PUBLICATION_STATUS,
  UPDATE_TEXT_BLOCK,
  UPDATE_TITLE
} from './types';

export function createEmptyTextBlock(): CreateEmptyTextBlockAction {
  return {
    type: CREATE_EMPTY_TEXT_BLOCK,
    payload: {
      block: getEmptyTextBlock()
    }
  };
}

export function createGraphBlock(): CreateGraphBlockAction {
  return {
    type: CREATE_GRAPH_BLOCK,
    payload: {
      block: getEmptyGraphBlock()
    }
  };
}

export function createEmptyImageBlock(): CreateEmptyImageBlockAction {
  return {
    type: CREATE_EMPTY_IMAGE_BLOCK,
    payload: {
      block: getEmptyImageBlock()
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

export function updateGraphBlock(
  index: number,
  graphID: string
): UpdateGraphBlockAction {
  return {
    type: UPDATE_GRAPH_BLOCK,
    payload: { index: index, graphID: graphID }
  };
}
export function updateImageBlock(
  index: number,
  imageUrl: string
): UpdateImageBlockAction {
  return {
    type: UPDATE_IMAGE_BLOCK,
    payload: { index: index, imageUrl: imageUrl }
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
