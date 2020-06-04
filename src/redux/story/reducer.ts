import { arrayMove } from 'react-sortable-hoc';
import { uuid } from 'uuidv4';
import { removeObjectAtIndex } from '../../common/util/arrayTools';
import { getEmptyTextBlock } from './initializers';
import {
  CREATE_EMPTY_TEXT_BLOCK,
  CREATE_GRAPH_BLOCK,
  DELETE_BLOCK,
  LOAD_EXISTING_STORY,
  PublicationStatus,
  Story,
  StoryActionType,
  StoryBlockType,
  SWAP_BLOCKS,
  UpdateBlockType,
  UPDATE_DESCRIPTION,
  UPDATE_GRAPH_BLOCK,
  UPDATE_PUBLICATION_STATUS,
  UPDATE_TEXT_BLOCK,
  UPDATE_TITLE
} from './types';

// follows immutability update patterns
// (https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns/)
function updateObjectInArray(
  storyBlocks: Array<StoryBlockType>,
  action: UpdateBlockType
) {
  console.log(action);
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

const initialStory = (): Story => ({
  id: uuid(),
  userID: '',
  title: '',
  description: '',
  publicationStatus: PublicationStatus.DRAFT,
  storyBlocks: [getEmptyTextBlock()] as Array<StoryBlockType>,
  dateCreated: new Date(),
  dateLastEdited: new Date()
});

export function storyReducer(state = initialStory(), action: StoryActionType) {
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
    case UPDATE_TEXT_BLOCK: // using the fall through features of switch statements
    case UPDATE_GRAPH_BLOCK:
      return {
        ...state,
        storyBlocks: updateObjectInArray(state.storyBlocks, action)
      };
    case LOAD_EXISTING_STORY:
      return action.payload.storyToLoad;
    default:
      return state;
  }
}
