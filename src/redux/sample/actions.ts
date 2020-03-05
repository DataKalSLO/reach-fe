import {
  UPDATE_SAMPLE,
  CLEAR_SAMPLE,
  SampleActionTypes,
  Sample
} from './types';
import { Dispatch } from 'redux';

export function updateSampleAction(sample: Sample): SampleActionTypes {
  return {
    type: UPDATE_SAMPLE,
    payload: sample
  };
}

export function clearSampleAction(): SampleActionTypes {
  return { type: CLEAR_SAMPLE };
}

export function updateWithThunk(text: string) {
  return async (dispatch: Dispatch) => {
    return updateSampleAction({ text });
  };
}
