import {
  GraphMetaData,
  GraphMetaDataApiPayload
} from '../../redux/graphs/types';
import {
  authenticatedDel,
  authenticatedGet,
  authenticatedPost,
  authenticatedPut
} from '../authenticatedApi/operations';
import { get } from '../base';
import {
  transformApiGraphMetaDataToGraphMetaData,
  transformGraphMetaDataToDatabaseGraphMetaData
} from './converter';
import {
  ApiGraphConfirmationResponse,
  ApiGraphMetaData,
  GraphActions,
  GraphApiPayload,
  GraphApiResponse
} from './types';

export async function saveGraph(
  graphMetaData: GraphMetaDataApiPayload
): Promise<GraphMetaData> {
  const databaseGraphMetaData = transformGraphMetaDataToDatabaseGraphMetaData(
    graphMetaData
  );
  return httpRequestWithGraphMetaDataResponse(
    GraphActions.CREATE,
    databaseGraphMetaData
  );
}

export async function updateExistingGraph(
  graphMetaData: GraphMetaDataApiPayload
): Promise<GraphMetaData> {
  const databaseGraphMetaData = transformGraphMetaDataToDatabaseGraphMetaData(
    graphMetaData
  );
  return httpRequestWithGraphMetaDataResponse(
    GraphActions.UPDATE,
    databaseGraphMetaData
  );
}

export async function getGraphById(graphId: string): Promise<GraphMetaData> {
  return httpRequestWithGraphMetaDataResponse(GraphActions.GET_BY_ID, graphId);
}

export async function deleteGraphById(
  graphId: string
): Promise<ApiGraphConfirmationResponse> {
  return httpRequestWithConfirmationResponse(
    GraphActions.DELETE_BY_ID,
    graphId
  );
}

export async function getAllGraphsByUser(): Promise<GraphMetaData[]> {
  return httpRequestWithGraphMetaDataArrayResponse(
    GraphActions.GET_ALL_GRAPHS_BY_ID,
    undefined
  );
}

export async function getDefaultGraphsByCategory(
  category: string
): Promise<GraphMetaData[]> {
  return httpRequestWithGraphMetaDataArrayResponse(
    GraphActions.GET_DEFAULT_GRAPHS_BY_CATEGORY,
    category
  );
}

export async function httpRequestWithGraphMetaDataResponse(
  actionType: GraphActions,
  payload: GraphApiPayload
): Promise<GraphMetaData> {
  const response: GraphApiResponse = await graphHttp(actionType, payload);
  if (response as ApiGraphMetaData) {
    return transformApiGraphMetaDataToGraphMetaData(
      response as ApiGraphMetaData
    );
  } else {
    throw new Error(
      'Expected a Graph Metadata object to be returned by call graph action: ' +
        actionType
    );
  }
}

export async function httpRequestWithGraphMetaDataArrayResponse(
  actionType: GraphActions,
  payload: GraphApiPayload
): Promise<GraphMetaData[]> {
  const response: GraphApiResponse = await graphHttp(actionType, payload);
  if (response as ApiGraphMetaData[]) {
    return (response as ApiGraphMetaData[]).map(graphMetaData =>
      transformApiGraphMetaDataToGraphMetaData(graphMetaData)
    );
  } else {
    throw new Error(
      'Expected an array of Graph Metadata object to be returned by call graph action: ' +
        actionType
    );
  }
}

export async function httpRequestWithConfirmationResponse(
  actionType: GraphActions,
  payload: GraphApiPayload
): Promise<ApiGraphConfirmationResponse> {
  const response: GraphApiResponse = await graphHttp(actionType, payload);
  if (response as ApiGraphConfirmationResponse) {
    return response as ApiGraphConfirmationResponse;
  } else {
    throw new Error(
      'Expected a string to be returned by call graph action: ' + actionType
    );
  }
}

async function graphHttp(
  actionType: GraphActions,
  payload: GraphApiPayload
): Promise<GraphApiResponse> {
  let response: unknown;
  switch (actionType) {
    case GraphActions.CREATE:
      response = authenticatedPost('graph/', payload as object);
      break;
    case GraphActions.UPDATE:
      response = authenticatedPut('graph/', payload as object);
      break;
    case GraphActions.GET_BY_ID:
      response = get('graph/' + payload);
      break;
    case GraphActions.DELETE_BY_ID:
      response = authenticatedDel('graph/' + payload);
      break;
    case GraphActions.GET_ALL_GRAPHS_BY_ID:
      response = authenticatedGet('graph/UserGraphs/');
      break;
    case GraphActions.GET_DEFAULT_GRAPHS_BY_CATEGORY:
      response = get('graph/DefaultGraphs/' + payload);
      break;
    default:
      throw new Error('Unimplemented mutation action on Graph: ' + actionType);
  }
  return response as GraphApiResponse;
}
