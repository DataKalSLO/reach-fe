import { MapActions, MapApiPayload, MapApiResponse } from './types';
import { get } from '../base';

export async function getFeatureCollection(tableName: any): Promise<any> {
  return httpRequestWithTableName(MapActions.GET_FEATURE_COLLECTION, tableName);
}

export async function httpRequestWithTableName(
  actionType: MapActions,
  payload: MapApiPayload
): Promise<any[]> {
  const response: MapApiResponse = await mapHttp(actionType, payload);
  if (response as any) {
    return response as any;
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
    case MapActions.GET_FEATURE_COLLECTION:
      response = get(`map/${payload}/`);
      break;
    default:
      throw new Error('Unimplemented mutation action on Map: ' + actionType);
  }
  return response as MapApiResponse;
}
