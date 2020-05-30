import {
  GraphMetaData,
  GraphMetaDataApiPayload
} from '../../redux/graphs/types';
import { callActionAndAlertOnError } from '../operations';
import {
  DEFAULT_GRAPHS_RETRIEVAL_FAILURE_MESSAGE,
  DEFAULT_GRAPHS_RETRIEVAL_SUCCESS_MESSAGE,
  GRAPHS_RETRIEVAL_FAILURE_MESSAGE,
  GRAPHS_RETRIEVAL_SUCCESS_MESSAGE,
  GRAPH_CREATION_FAILURE_MESSAGE,
  GRAPH_CREATION_SUCCESS_MESSAGE,
  GRAPH_DELETION_FAILURE_MESSAGE,
  GRAPH_DELETION_SUCCESS_MESSAGE,
  GRAPH_RETRIEVAL_FAILURE_MESSAGE,
  GRAPH_RETRIEVAL_SUCCESS_MESSAGE,
  GRAPH_UPDATE_FAILURE_MESSAGE,
  GRAPH_UPDATE_SUCCESS_MESSAGE
} from './constants';
import {
  deleteGraphById,
  getAllGraphsByUser,
  getDefaultGraphsByCategory,
  getGraphById,
  saveGraph,
  updateExistingGraph
} from './operations';
import { ApiGraphConfirmationResponse } from './types';

export async function saveGraphAndHandleResponse(
  graphMetaData: GraphMetaDataApiPayload
): Promise<GraphMetaData | undefined> {
  return await callActionAndAlertOnError<GraphMetaData>(
    () => saveGraph(graphMetaData),
    GRAPH_CREATION_SUCCESS_MESSAGE,
    GRAPH_CREATION_FAILURE_MESSAGE
  ).catch(e => undefined);
}

export async function updateGraphAndHandleResponse(
  graphMetaData: GraphMetaDataApiPayload
): Promise<GraphMetaData | undefined> {
  return await callActionAndAlertOnError<GraphMetaData>(
    () => updateExistingGraph(graphMetaData),
    GRAPH_UPDATE_SUCCESS_MESSAGE,
    GRAPH_UPDATE_FAILURE_MESSAGE
  ).catch(e => undefined);
}

export async function getGraphAndHandleResponse(
  graphId: string
): Promise<GraphMetaData | undefined> {
  return await callActionAndAlertOnError<GraphMetaData>(
    () => getGraphById(graphId),
    GRAPH_RETRIEVAL_SUCCESS_MESSAGE,
    GRAPH_RETRIEVAL_FAILURE_MESSAGE
  ).catch(e => undefined);
}

export async function deleteGraphAndHandleResponse(
  graphId: string
): Promise<ApiGraphConfirmationResponse | undefined> {
  return await callActionAndAlertOnError<ApiGraphConfirmationResponse>(
    () => deleteGraphById(graphId),
    GRAPH_DELETION_SUCCESS_MESSAGE,
    GRAPH_DELETION_FAILURE_MESSAGE
  ).catch(e => undefined);
}

export async function getAllGraphsAndHandleResponse(): Promise<
  GraphMetaData[] | undefined
> {
  return await callActionAndAlertOnError<GraphMetaData[]>(
    () => getAllGraphsByUser(),
    GRAPHS_RETRIEVAL_SUCCESS_MESSAGE,
    GRAPHS_RETRIEVAL_FAILURE_MESSAGE
  ).catch(e => undefined);
}

export async function getDefaultGraphForCategoryAndHandleResponse(
  category: string
): Promise<GraphMetaData[] | undefined> {
  return await callActionAndAlertOnError<GraphMetaData[]>(
    () => getDefaultGraphsByCategory(category),
    DEFAULT_GRAPHS_RETRIEVAL_SUCCESS_MESSAGE,
    DEFAULT_GRAPHS_RETRIEVAL_FAILURE_MESSAGE
  ).catch(e => undefined);
}
