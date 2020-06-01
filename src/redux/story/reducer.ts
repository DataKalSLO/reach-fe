import { arrayMove } from 'react-sortable-hoc';
import { removeObjectAtIndex } from '../../common/util/arrayTools';
import { initialStory } from './initializers';
import {
  CREATE_EMPTY_TEXT_BLOCK,
  CREATE_GRAPH_BLOCK,
  DELETE_BLOCK,
  Story,
  StoryActionType,
  StoryBlockType,
  SWAP_BLOCKS,
  TextBlockType,
  TEXT_BLOCK_TYPE,
  UpdateBlockType,
  UPDATE_DESCRIPTION,
  UPDATE_TEXT_BLOCK,
  UPDATE_TITLE,
  PublicationStatus,
  UPDATE_PUBLICATION_STATUS
} from './types';

// follows immutability update patterns
// (https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns/)
function updateObjectInArray(
  storyBlocks: Array<StoryBlockType>,
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

export function storyReducer(state = initialStory, action: StoryActionType) {
  switch (action.type) {
    case CREATE_EMPTY_TEXT_BLOCK: // using the fall through features of switch statements
    case CREATE_GRAPH_BLOCK:
      return {
        ...state,
        storyBlocks: state.storyBlocks.concat(action.payload.block)
      };
    case DELETE_BLOCK:
      return {
        ...state,
        storyBlocks: removeObjectAtIndex(
          state.storyBlocks,
          action.payload.index
        )
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
    case UPDATE_TITLE:
      return {
        ...state,
        title: action.payload.newTitle
      };
    case UPDATE_DESCRIPTION:
      return {
        ...state,
        description: action.payload.newDescription
      };
    case UPDATE_PUBLICATION_STATUS:
      return {
        ...state,
        publicationStatus: action.payload.newPublicationStatus
      };
    case UPDATE_TEXT_BLOCK:
      return {
        ...state,
        storyBlocks: updateObjectInArray(state.storyBlocks, action)
      };
    default:
      return state;
  }
}
