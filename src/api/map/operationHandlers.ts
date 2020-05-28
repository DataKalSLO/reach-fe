import { handleApiOperation } from '../operations';
import {
  FEATURE_COLLECTION_RETRIEVAL_SUCCESS_MESSAGE,
  FEATURE_COLLECTION_RETRIEVAL_FAILURE_MESSAGE
} from './constants';
import { getFeatureCollection } from './operations';

export async function getFeatureCollectionAndHandleResponse(
  tableName: string
): Promise<any> {
  return await handleApiOperation<string, any>(
    tableName,
    getFeatureCollection,
    FEATURE_COLLECTION_RETRIEVAL_SUCCESS_MESSAGE,
    FEATURE_COLLECTION_RETRIEVAL_FAILURE_MESSAGE
  ).catch(e => undefined);
}
