import {
  StoryBuilderActionType,
  StoryBuilderState,
  TOGGLE_PREVIEW
} from './types';

const initialStoryBuilderState = {
  isPreviewSelected: false
};

export function storyBuilderReducer(
  state = initialStoryBuilderState,
  action: StoryBuilderActionType
): StoryBuilderState {
  switch (action.type) {
    case TOGGLE_PREVIEW:
      return {
        isPreviewSelected: !state.isPreviewSelected
      };
    default:
      return state;
  }
}
