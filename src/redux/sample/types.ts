export interface Sample {
  text: string;
}

export const UPDATE_SAMPLE = 'UPDATE_SAMPLE';
export const CLEAR_SAMPLE = 'CLEAR_SAMPLE';

interface UpdateSampleAction {
  type: typeof UPDATE_SAMPLE;
  payload: Sample;
}

interface ClearSampleAction {
  type: typeof CLEAR_SAMPLE;
}

export type SampleActionTypes = UpdateSampleAction | ClearSampleAction;
