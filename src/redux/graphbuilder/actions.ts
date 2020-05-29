import { Dispatch } from 'redux';
import { isUndefined } from 'util';
import {
  deleteGraphAndHandleResponse,
  getAllGraphsAndHandleResponse,
  getDefaultGraphForCategoryAndHandleResponse,
  getGraphAndHandleResponse,
  saveGraphAndHandleResponse,
  updateGraphAndHandleResponse
} from '../../api/graphs/operationHandlers';
import { ApiGraphConfirmationResponse } from '../../api/graphs/types';
import { getDataColumnsForDataSourcesAndHandleResponse } from '../../api/vizbuilder/operationHandlers';
import { GraphMetaData, GraphMetaDataApiPayload } from '../graphs/types';
import {
  DELETE_GRAPH,
  DELETE_LOCAL_GRAPH,
  DUPLICATE_GRAPH,
  GET_ALL_USER_GRAPHS,
  GET_DEFAULT_GRAPHS_FOR_CATEGORY,
  GET_GRAPH,
  SAVE_GRAPH,
  TOGGLE_CREATE_GRAPH,
  UPDATE_GRAPH,
  UPDATE_LOCAL_GRAPH
} from './constants';
import {
  DeleteGraphAction,
  DeleteLocalGraph,
  DuplicateGraphAction,
  GetGraphAction,
  Graph,
  SaveGraphAction,
  ToggleCreateGraphAction,
  UpdateGraphAction,
  UpdateLocalGraph
} from './types';

export function saveGraph(graphMetaData: GraphMetaDataApiPayload) {
  return async (dispatch: Dispatch) => {
    const metaData = await saveGraphAndHandleResponse(graphMetaData);
    const graph = await createGraphWithData(metaData);
    dispatch(saveGraphAction(graph));
  };
}

function saveGraphAction(payload?: Graph): SaveGraphAction {
  return {
    type: SAVE_GRAPH,
    payload: payload
  };
}

export function updateGraph(graphMetaData: GraphMetaDataApiPayload) {
  return async (dispatch: Dispatch) => {
    const metaData = await updateGraphAndHandleResponse(graphMetaData);
    const graph = await createGraphWithData(metaData);
    dispatch(updateGraphAction(graph));
  };
}

function updateGraphAction(payload?: Graph): UpdateGraphAction {
  return {
    type: UPDATE_GRAPH,
    payload: payload
  };
}

export function updateLocalGraph(graph: Graph) {
  return async (dispatch: Dispatch) => {
    const graphWithData = await createGraphWithData(graph.graphMetaData);
    dispatch(updateLocalGraphAction(graphWithData));
  };
}

function updateLocalGraphAction(payload?: Graph): UpdateLocalGraph {
  return {
    type: UPDATE_LOCAL_GRAPH,
    payload: payload
  };
}

export function deleteGraph(graphId: string) {
  return async (dispatch: Dispatch) => {
    const payload = await deleteGraphAndHandleResponse(graphId);
    dispatch(deleteGraphAction(payload));
  };
}

function deleteGraphAction(
  payload?: ApiGraphConfirmationResponse
): DeleteGraphAction {
  return {
    type: DELETE_GRAPH,
    payload: payload
  };
}

export function deleteLocalGraph(index: number): DeleteLocalGraph {
  return {
    type: DELETE_LOCAL_GRAPH,
    payload: index
  };
}

export function getGraph(graphId: string) {
  return async (dispatch: Dispatch) => {
    const metaData = await getGraphAndHandleResponse(graphId);
    const graph = await createGraphWithData(metaData);
    dispatch(getGraphAction(graph));
  };
}

function getGraphAction(payload?: Graph): GetGraphAction {
  return {
    type: GET_GRAPH,
    payload: payload
  };
}

export function getAllUserGraphs() {
  return async (dispatch: Dispatch) => {
    const graphsMetaData = await getAllGraphsAndHandleResponse();
    const graphs = await createGraphsWithData(graphsMetaData);
    dispatch(getAllUserGraphsAction(graphs));
  };
}

function getAllUserGraphsAction(payload?: Graph[]) {
  return {
    type: GET_ALL_USER_GRAPHS,
    payload: payload
  };
}

export function getDefaultGraphs(initiative: string) {
  return async (dispatch: Dispatch) => {
    const graphsMetaData = await getDefaultGraphForCategoryAndHandleResponse(
      initiative
    );
    const graphs = await createGraphsWithData(graphsMetaData);
    dispatch(getDefaultGraphsAction(graphs));
  };
}

function getDefaultGraphsAction(payload?: Graph[]) {
  return {
    type: GET_DEFAULT_GRAPHS_FOR_CATEGORY,
    payload: payload
  };
}

export function duplicateGraph(
  graph: Graph,
  index: number
): DuplicateGraphAction {
  return {
    type: DUPLICATE_GRAPH,
    payload: { graph: graph, index: index }
  };
}

export function toggleCreateGraph(): ToggleCreateGraphAction {
  return {
    type: TOGGLE_CREATE_GRAPH,
    payload: undefined
  };
}

/*
 * Given the graph metadata for a collection of graphs,
 * get the data values for each graph.
 */
async function createGraphsWithData(
  graphsMetaData: GraphMetaData[] | undefined
): Promise<Graph[]> {
  let graphs: (Graph | undefined)[] = [];
  if (!isUndefined(graphsMetaData)) {
    graphs = await Promise.all(
      graphsMetaData?.map(graphMetaData => createGraphWithData(graphMetaData))
    );
  }
  // Only keep successful requests
  return graphs.filter(graph => !isUndefined(graph)) as Graph[];
}

/*
 * Given the graph metadata, get the data values for
 * that graph.
 */
async function createGraphWithData(
  graphMetaData?: GraphMetaData
): Promise<Graph | undefined> {
  if (!isUndefined(graphMetaData)) {
    const graphData = await getDataColumnsForDataSourcesAndHandleResponse(
      graphMetaData.dataSources
    );
    if (!isUndefined(graphData)) {
      return {
        graphMetaData: graphMetaData,
        graphData: graphData
      };
    }
  }
  return undefined;
}
