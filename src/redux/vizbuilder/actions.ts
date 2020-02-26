import { Dispatch } from 'redux';
import { FETCH_ALL_METADATA, FETCH_ENTIRE_DATASET } from './constants';
import {
  Metadata,
  FetchMetadataAction,
  Dataset,
  FetchDatasetAction
} from './types';
import { fetchAllMetaData, fetchEntireDataset } from '../../api/vizbuilder';

export function MetadataAction(payload: Metadata[]): FetchMetadataAction {
  return {
    type: FETCH_ALL_METADATA,
    payload: payload
  };
}

export function fetchAllMetadataAction() {
  return async (dispatch: Dispatch) => {
    const payload = await fetchAllMetaData();
    console.log(payload);
    dispatch(MetadataAction(payload));
  };
}

export function DatasetAction(payload: Dataset): FetchDatasetAction {
  return {
    type: FETCH_ENTIRE_DATASET,
    payload: payload
  };
}

export function fetchEntireDatasetAction(datasetName: string) {
  return async (dispatch: Dispatch) => {
    const payload = await fetchEntireDataset(datasetName);
    console.log(payload);
    dispatch(DatasetAction(payload));
  };
}
