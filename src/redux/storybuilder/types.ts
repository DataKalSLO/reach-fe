export const TOGGLE_PREVIEW = 'TOGGLE_PREVIEW';

export interface StoryBuilderState {
  isPreviewSelected: boolean;
}

export interface TogglePreviewAction {
  type: typeof TOGGLE_PREVIEW;
  payload: null;
}

// used by reducer function (reducer.ts)
export type StoryBuilderActionType = TogglePreviewAction;
