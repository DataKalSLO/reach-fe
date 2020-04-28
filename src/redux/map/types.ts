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
