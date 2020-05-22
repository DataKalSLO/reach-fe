import {
  GraphMetaData,
  GraphMetaDataApiPayload
} from '../../redux/graphs/types';
import { handleApiOperation } from '../stories/operationHandlers';
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
  return await handleApiOperation<GraphMetaDataApiPayload, GraphMetaData>(
    graphMetaData,
    saveGraph,
    GRAPH_CREATION_SUCCESS_MESSAGE,
    GRAPH_CREATION_FAILURE_MESSAGE
  ).catch(e => undefined);
}

export async function updateGraphAndHandleResponse(
  graphMetaData: GraphMetaDataApiPayload
): Promise<GraphMetaData | undefined> {
  return await handleApiOperation<GraphMetaDataApiPayload, GraphMetaData>(
    graphMetaData,
    updateExistingGraph,
    GRAPH_UPDATE_SUCCESS_MESSAGE,
    GRAPH_UPDATE_FAILURE_MESSAGE
  ).catch(e => undefined);
}

export async function getGraphAndHandleResponse(
  graphId: string
): Promise<GraphMetaData | undefined> {
  return await handleApiOperation<string, GraphMetaData>(
    graphId,
    getGraphById,
    GRAPH_RETRIEVAL_SUCCESS_MESSAGE,
    GRAPH_RETRIEVAL_FAILURE_MESSAGE
  ).catch(e => undefined);
}

export async function deleteGraphAndHandleResponse(
  graphId: string
): Promise<ApiGraphConfirmationResponse | undefined> {
  return await handleApiOperation<string, ApiGraphConfirmationResponse>(
    graphId,
    deleteGraphById,
    GRAPH_DELETION_SUCCESS_MESSAGE,
    GRAPH_DELETION_FAILURE_MESSAGE
  ).catch(e => undefined);
}

export async function getAllGraphsAndHandleResponse(): Promise<
  GraphMetaData[] | undefined
> {
  return await handleApiOperation<void, GraphMetaData[]>(
    undefined,
    getAllGraphsByUser,
    GRAPHS_RETRIEVAL_SUCCESS_MESSAGE,
    GRAPHS_RETRIEVAL_FAILURE_MESSAGE
  ).catch(e => undefined);
}

export async function getDefaultGraphForCategoryAndHandleResponse(
  category: string
): Promise<GraphMetaData[] | undefined> {
  return await handleApiOperation<string, GraphMetaData[]>(
    category,
    getDefaultGraphsByCategory,
    DEFAULT_GRAPHS_RETRIEVAL_SUCCESS_MESSAGE,
    DEFAULT_GRAPHS_RETRIEVAL_FAILURE_MESSAGE
  ).catch(e => undefined);
}
