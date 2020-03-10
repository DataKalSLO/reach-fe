import { EditorState } from 'draft-js';
import { arrayMove } from 'react-sortable-hoc';
import { uuid } from 'uuidv4';
import {
  StoryBlock,
  StoryState,
  TEXT_BLOCK_TYPE
} from '../../stories/StoryTypes';
import {
  CREATE_EMPTY_TEXT_BLOCK,
  StoryActionType,
  SWAP_BLOCKS,
  TOGGLE_PREVIEW,
  UpdateBlockType,
  UPDATE_DESCRIPTION,
  UPDATE_TEXT_BLOCK,
  UPDATE_TITLE
} from './types';

const initialTextBlock = {
  id: uuid(),
  editorState: EditorState.createEmpty(),
  type: TEXT_BLOCK_TYPE
};

const initialStoryState = {
  story: {
    id: uuid(),
    userID: 'USER-ID', // TODO: replace placeholder value
    title: '',
    description: '',
    storyBlocks: [initialTextBlock] as Array<StoryBlock>
  },
  isPreviewSelected: false
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

export function storyReducer(
  state = initialStoryState,
  action: StoryActionType
): StoryState {
  switch (action.type) {
    case UPDATE_TEXT_BLOCK:
      return {
        story: {
          ...state.story,
          storyBlocks: updateObjectInArray(state.story.storyBlocks, action)
        },
        isPreviewSelected: state.isPreviewSelected
      };
    case CREATE_EMPTY_TEXT_BLOCK:
      return {
        story: {
          ...state.story,
          storyBlocks: state.story.storyBlocks.concat(action.payload.block)
        },
        isPreviewSelected: state.isPreviewSelected
      };
    case SWAP_BLOCKS:
      return {
        story: {
          ...state.story,
          storyBlocks: arrayMove(
            state.story.storyBlocks,
            action.payload.oldIndex,
            action.payload.newIndex
          )
        },
        isPreviewSelected: state.isPreviewSelected
      };
    case UPDATE_TITLE:
      return {
        story: {
          ...state.story,
          title: action.payload.newTitle
        },
        isPreviewSelected: state.isPreviewSelected
      };
    case UPDATE_DESCRIPTION:
      return {
        story: {
          ...state.story,
          description: action.payload.newDescription
        },
        isPreviewSelected: state.isPreviewSelected
      };
    case TOGGLE_PREVIEW:
      return {
        story: state.story,
        isPreviewSelected: !state.isPreviewSelected
      };
    default:
      return state;
  }
}
