import { arrayMove } from 'react-sortable-hoc';
import { uuid } from 'uuidv4';
import { emptyEditorState } from '../../stories/RichTextEditor';
import {
  CREATE_EMPTY_TEXT_BLOCK,
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
  UPDATE_TITLE
} from './types';
import { removeObjectAtIndex } from '../../common/util/arrayTools';

export const emptyTextBlock = (): TextBlockType => ({
  id: uuid(),
  editorState: emptyEditorState,
  type: TEXT_BLOCK_TYPE
});

const initialStory: Story = {
  id: uuid(),
  userID: 'USER-ID', // TODO: replace placeholder value
  title: '',
  description: '',
  storyBlocks: [emptyTextBlock()] as Array<StoryBlockType>
};

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
    default:
      return state;
  }
}
