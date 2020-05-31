import { Dispatch } from 'redux';
import {
  getDatasetMetaDataAndHandleResponse,
  getTableNamesAndHandleResponse
} from '../../api/vizbuilder/operationHandlers';
import { GET_ALL_METADATA, GET_ALL_TABLE_NAMES } from './constants';
import {
  GetAllMetadataAction,
  Metadata,
  GetAllTableNamesAction
} from './types';
import { Selection } from '../../api/vizbuilder/types';
/*
 * Every Asynchronous Action has three parts.
 *   1. A function that encapsulates an entire action. It's
 *      called by a component and it dispatches the response
 *      returned from an API call. (e.g. getAllMetadata)
 *   2. A function that handles the API call and returns the
 *      response. (e.g. getDatasetMetaDataAndHandleResponse)
 *      - See ../../api/vizbuilder/ for their implementations.
 *   3. A function that returns the object that is dispatched
 *      to the reducer. The object contains the type and payload.
 *      (e.g. getAllMetadataAction)
 */

export function getAllMetadata() {
  return async (dispatch: Dispatch) => {
    const payload = await getDatasetMetaDataAndHandleResponse();
    dispatch(getAllMetadataAction(payload));
  };
}

export function getAllTableNames() {
  return async (dispatch: Dispatch) => {
    const payload = await getTableNamesAndHandleResponse();
    dispatch(getAllTableNamesAction(payload));
  };
}

export function getAllMetadataAction(
  payload: Metadata[] | undefined
): GetAllMetadataAction {
  return {
    type: GET_ALL_METADATA,
    payload: payload
  };
}

export function getAllTableNamesAction(
  payload: Selection[] | undefined
): GetAllTableNamesAction {
  return {
    type: GET_ALL_TABLE_NAMES,
    payload: payload
  };
}
