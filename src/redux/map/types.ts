export interface Map {
  text: string;
}

export const UPDATE_MAP = 'UPDATE_MAP';
export const CLEAR_MAP = 'CLEAR_MAP';

interface UpdateMapAction {
  type: typeof UPDATE_MAP;
  payload: Map;
}

interface ClearMapAction {
  type: typeof CLEAR_MAP;
}

export type MapActionTypes = UpdateMapAction | ClearMapAction;

export const UPDATE_SELECTIONS = 'UPDATE_SELECTIONS';

export const UPDATE_SELECTED_MARKER = 'UPDATE_SELECTED_MARKER';

export const UPDATE_COLOR_ASSOCIATION = 'UPDATE_COLOR_ASSOCIATION';
