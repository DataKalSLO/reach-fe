import { Dispatch } from 'redux';
import { FETCH_ALL_METADATA, FETCH_ENTIRE_DATASET } from './constants';
import {
  Metadata,
  PayloadDataset,
  FetchMetadataAction,
  FetchDatasetAction
} from './types';
import { fetchAllMetaData, fetchEntireDataset } from '../../api/vizbuilder';

/*
 * Every Asynchoronous Action has three parts.
 *   1. A function that encapsulates an entire action. It's
 *      called by a component and it dispatches the response
 *      returned from an API call. (e.g. fetchAllMetadataAction)
 *   2. A function that handles the API call and returns the
 *      response. (e.g. fetchAllMetaData)
 *      - See ../../api/vizbuilder for their implementations.
 *   3. A function that returns the object that is dispatched
 *      to the reducer. The object contains the type and payload.
 *      (e.g. metadataAction)
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
    dispatch(datasetAction(datasetName, payload));
  };
}

export function datasetAction(
  datasetName: string,
  payload: PayloadDataset
): FetchDatasetAction {
  return {
    type: FETCH_ENTIRE_DATASET,
    datasetName: datasetName,
    payload: payload
  };
}
