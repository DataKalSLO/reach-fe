import { StoryBuilderState } from '../../stories/StoryTypes';
import { StoryActionType, TOGGLE_PREVIEW } from './types';

const initialStoryBuilderState = {
  isPreviewSelected: false
};

export function storyBuilderReducer(
  state = initialStoryBuilderState,
  action: StoryActionType
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
