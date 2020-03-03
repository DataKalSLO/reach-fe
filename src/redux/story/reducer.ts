import { EditorState } from 'draft-js';
import { arrayMove } from 'react-sortable-hoc';
import uuidv4 from 'uuid/v4';
import { StoryBlock } from '../../stories/StoryTypes';
import {
  CREATE_EMPTY_TEXT_BLOCK,
  StoryActionType,
  SWAP_BLOCKS,
  UpdateBlockType,
  UPDATE_TEXT_BLOCK
} from './types';

const initialTextBlock = {
  id: uuidv4(),
  editorState: EditorState.createEmpty(),
  type: 'Text' // TODO: loosly typed attribute, planned fix rolling out soon
};

const initialState = {
  id: uuidv4(),
  userID: 'USER-ID', // TODO: replace placeholder value
  title: '',
  description: '',
  storyBlocks: [initialTextBlock] as Array<StoryBlock>
};

// follows immutability update patterns
// (https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns/)
function updateObjectInArray(
  storyBlocks: Array<StoryBlock>,
  action: UpdateBlockType
) {
  return storyBlocks.map((item, i) => {
    // updates desired storyblock
    if (action.payload.index === i) {
      return {
        ...item,
        ...action.payload
      };
    }
    // ignores rest of storyblocks
    return item;
  });
}

export function storyReducer(state = initialState, action: StoryActionType) {
  switch (action.type) {
    case UPDATE_TEXT_BLOCK:
      return {
        ...state,
        storyBlocks: updateObjectInArray(state.storyBlocks, action)
      };
    case CREATE_EMPTY_TEXT_BLOCK:
      return {
        ...state,
        storyBlocks: state.storyBlocks.concat(action.payload.block)
      };
    case SWAP_BLOCKS:
      return {
        ...state,
        storyBlocks: arrayMove(
          state.storyBlocks,
          action.payload.oldIndex,
          action.payload.newIndex
        )
      };
    default:
      return state;
  }
}
