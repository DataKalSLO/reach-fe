import {
  UPDATE_SAMPLE,
  CLEAR_SAMPLE,
  SampleActionTypes,
  Sample
} from './types';

const initialState: Sample = {
  text: ''
};
export function sampleReducer(
  state = initialState,
  action: SampleActionTypes
): Sample {
  switch (action.type) {
    case UPDATE_SAMPLE:
      return action.payload;
    case CLEAR_SAMPLE:
      return { text: '' };
    default:
      return state;
  }
}
