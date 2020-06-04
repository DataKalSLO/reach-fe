import { handleApiOperation } from '../operations';
import {
  HEATMAP_RETRIEVAL_FAILURE_MESSAGE,
  HEATMAP_RETRIEVAL_SUCCESS_MESSAGE,
  MARKER_RETRIEVAL_FAILURE_MESSAGE,
  MARKER_RETRIEVAL_SUCCESS_MESSAGE
} from './constants';
import { getHeatmap, getMarkers } from './operations';
import { MapApiResponse } from './types';

export async function getFeatureCollectionAndHandleResponse(
  tableName: string
): Promise<MapApiResponse> {
  return await handleApiOperation<string, any>(
    tableName,
    getHeatmap,
    HEATMAP_RETRIEVAL_SUCCESS_MESSAGE,
    HEATMAP_RETRIEVAL_FAILURE_MESSAGE
  ).catch(e => undefined);
}

export async function getMarkersAndHandleResponse(
  tableName: string
): Promise<MapApiResponse> {
  return await handleApiOperation<string, MapApiResponse>(
    tableName,
    getMarkers,
    MARKER_RETRIEVAL_SUCCESS_MESSAGE,
    MARKER_RETRIEVAL_FAILURE_MESSAGE
  ).catch(e => undefined);
}
