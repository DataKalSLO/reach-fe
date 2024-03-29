import { Dispatch } from 'redux';
import { getDatasetMetaDataAndHandleResponse } from '../../api/vizbuilder/operationHandlers';
import { GET_ALL_METADATA } from './constants';
import { GetAllMetadataAction, Metadata } from './types';

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

export function getAllMetadataAction(
  payload: Metadata[] | undefined
): GetAllMetadataAction {
  return {
    type: GET_ALL_METADATA,
    payload: payload
  };
}
