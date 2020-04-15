export const TOGGLE_PREVIEW = 'TOGGLE_PREVIEW';

export interface TogglePreviewAction {
  type: typeof TOGGLE_PREVIEW;
  payload: null;
}

// used by reducer function (reducer.ts)
export type StoryActionType = TogglePreviewAction;
