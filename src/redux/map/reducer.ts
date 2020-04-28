import { UPDATE_MAP, CLEAR_MAP, MapActionTypes, Map } from './types';

const initialState: Map = {
  text: ''
};
export function mapReducer(state = initialState, action: MapActionTypes): Map {
  switch (action.type) {
    case UPDATE_MAP:
      return action.payload;
    case CLEAR_MAP:
      return { text: '' };
    default:
      return state;
  }
}
