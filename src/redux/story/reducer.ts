import { StoryBlock } from '../../stories/StoryTypes';
import {
  StoryActionType,
  UPDATE_TEXT_BLOCK,
  CREATE_TEXT_BLOCK,
  SWAP_BLOCKS
} from './types';
import uuidv4 from 'uuid/v4';
import { arrayMove } from 'react-sortable-hoc';
import { EditorState } from 'draft-js';

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
// (https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns/
function updateObjectInArray(
  storyBlocks: Array<StoryBlock>,
  action: StoryActionType
) {
  if (action.type === UPDATE_TEXT_BLOCK) {
    return storyBlocks.map((item, i) => {
      if (action.payload.index !== i) {
        return item;
      }
      return {
        ...item,
        ...action.payload
      };
    });
  }
  throw new Error('Action type is incompatible with updateObjectInArray');
}

export function storyReducer(state = initialState, action: StoryActionType) {
  switch (action.type) {
    case UPDATE_TEXT_BLOCK:
      return {
        ...state,
        storyBlocks: updateObjectInArray(state.storyBlocks, action)
      };
    case CREATE_TEXT_BLOCK:
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
