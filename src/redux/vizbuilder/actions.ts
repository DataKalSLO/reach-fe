import { Dispatch } from 'redux';
import { getDatasetMetaDataAndHandleResponse } from '../../api/vizbuilder/operationHandlers';
import { FETCH_ALL_METADATA } from './constants';
import { GetAllMetadataAction, Metadata } from './types';

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

export function getAllMetadata() {
  return async (dispatch: Dispatch) => {
    const payload = await getDatasetMetaDataAndHandleResponse();
    dispatch(getAllMetadataAction(payload));
  };
}

export function getAllMetadataAction(
  payload: Metadata[] | undefined
): GetAllMetadataAction {
  return {
    type: FETCH_ALL_METADATA,
    payload: payload
  };
}
