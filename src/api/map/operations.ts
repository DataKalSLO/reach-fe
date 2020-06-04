import { MapActions, MapApiPayload, MapApiResponse } from './types';
import { get } from '../base';

// eslint-disable-next-line
export async function getHeatmap(tableName: string): Promise<MapApiResponse> {
  return httpRequestWithTableName(MapActions.GET_HEATMAP, tableName);
}

// eslint-disable-next-line
export async function getMarkers(tableName: string): Promise<MapApiResponse> {
  return httpRequestWithTableName(MapActions.GET_MARKERS, tableName);
}

export async function httpRequestWithTableName(
  actionType: MapActions,
  payload: MapApiPayload
): Promise<MapApiResponse[]> {
  const response: MapApiResponse = await mapHttp(actionType, payload);
  if (response as MapApiResponse) {
    return response as MapApiResponse;
  } else {
    throw new Error('No data for table: ' + payload);
  }
}

async function mapHttp(
  actionType: MapActions,
  payload: MapApiPayload
): Promise<MapApiResponse> {
  let response: unknown;
  switch (actionType) {
    case MapActions.GET_HEATMAP:
      response = get(`map/heatmap/${payload}/`);
      break;
    case MapActions.GET_MARKERS:
      response = get(`map/markers/${payload}/`);
      break;
    default:
      throw new Error('Unimplemented mutation action on Map: ' + actionType);
  }
  return response as MapApiResponse;
}
