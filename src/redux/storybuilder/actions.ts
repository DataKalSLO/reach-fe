import { TogglePreviewAction, TOGGLE_PREVIEW } from './types';

export function togglePreview(): TogglePreviewAction {
  return {
    type: TOGGLE_PREVIEW,
    payload: null
  };
}
