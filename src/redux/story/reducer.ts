import { StoryBlock } from '../../stories/StoryTypes';
import {
  StoryActionTypes,
  UPDATE_TITLE,
  UPDATE_TEXT_BLOCK,
  CREATE_TEXT_BLOCK,
  SWAP_BLOCKS
} from './types';
import uuidv4 from 'uuid/v4';
import { arrayMove } from 'react-sortable-hoc';

const initialState = {
  id: uuidv4(),
  userID: 'USER-ID', //FIXME: placeholder value
  title: 'Title2',
  description: 'description2',
  storyBlocks: [] as Array<StoryBlock>
};

// follows immutability update patterns
// (https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns/
function updateObjectInArray(
  storyBlocks: Array<StoryBlock>,
  action: StoryActionTypes
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

export function storyReducer(state = initialState, action: StoryActionTypes) {
  switch (action.type) {
    case UPDATE_TITLE:
      return { ...state, title: 'New Title' };
    case UPDATE_TEXT_BLOCK:
      return {
        ...state,
        storyBlocks: updateObjectInArray(state.storyBlocks, action)
      };
    case CREATE_TEXT_BLOCK:
      return {
        ...state,
        storyBlocks: state.storyBlocks.concat(action.payload)
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
