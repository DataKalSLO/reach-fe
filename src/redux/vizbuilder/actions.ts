import { Dispatch } from 'redux';
import { FETCH_ALL_METADATA, FETCH_ENTIRE_DATASET } from './constants';
import {
  Metadata,
  FetchMetadataAction,
  Dataset,
  FetchDatasetAction
} from './types';
import { fetchAllMetaData, fetchEntireDataset } from '../../api/vizbuilder';

/*
 * Every Asynchoronous Action has a three parts.
 *   1. A function that encapsulates an entire action. Its
 *      called by a component and it dispatches the response
 *      from an API call. (e.g. fetchAllMetadataAction)
 *   2. A function that handles the API call and returns the
 *      response. See the ../../api/vizbuilder for their
 *      implementations. (e.g. fetchAllMetaData)
 *   3. A function that returns the object that is dispatched
 *      to the reducer. The object contains the type and payload.
 *      (e.g. MetaDataAction)
 */

export function fetchAllMetadataAction() {
  return async (dispatch: Dispatch) => {
    const payload = await fetchAllMetaData();
    dispatch(metadataAction(payload));
  };
}

export function metadataAction(payload: Metadata[]): FetchMetadataAction {
  return {
    type: FETCH_ALL_METADATA,
    payload: payload
  };
}

export function fetchEntireDatasetAction(datasetName: string) {
  return async (dispatch: Dispatch) => {
    const payload = await fetchEntireDataset(datasetName);
    dispatch(datasetAction(payload));
  };
}

export function datasetAction(payload: Dataset): FetchDatasetAction {
  return {
    type: FETCH_ENTIRE_DATASET,
    payload: payload
  };
}
