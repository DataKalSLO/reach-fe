import { Dispatch } from 'redux';
import { isUndefined } from 'util';
import { uuid } from 'uuidv4';
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
  CREATE_LOCAL_GRAPH,
  DELETE_GRAPH,
  DELETE_LOCAL_GRAPH,
  DELETE_MESSAGE,
  DUPLICATE_GRAPH,
  FETCH,
  GET_ALL_USER_GRAPHS,
  GET_DEFAULT_GRAPHS_FOR_CATEGORY,
  GET_GRAPH,
  SAVE_GRAPH,
  SAVE_MESSAGE,
  SET_ACTION_STATUS,
  SUCCESS_SEVERITY,
  TOGGLE_CREATE_GRAPH,
  UPDATE_GRAPH,
  UPDATE_LOCAL_GRAPH,
  UPDATE_MESSAGE
} from './constants';
import {
  ActionStatus,
  CreateLocalGraph,
  DeleteGraphAction,
  DeleteLocalGraph,
  DuplicateGraphAction,
  FetchAction,
  GetGraphAction,
  Graph,
  GraphWithIndex,
  SaveGraphAction,
  SetActionStatus,
  StatusSeverity,
  ToggleCreateGraphAction,
  UpdateGraphAction,
  UpdateLocalGraph
} from './types';

export function saveGraph(graphMetaData: GraphMetaDataApiPayload) {
  return async (dispatch: Dispatch) => {
    const metaData = await saveGraphAndHandleResponse(graphMetaData);
    showStatusMessage(metaData, SAVE_MESSAGE, SUCCESS_SEVERITY, dispatch);
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
    showStatusMessage(metaData, UPDATE_MESSAGE, SUCCESS_SEVERITY, dispatch);
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
    showStatusMessage(payload, DELETE_MESSAGE, SUCCESS_SEVERITY, dispatch);
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

export function getGraph(graphId: string, index: number) {
  return async (dispatch: Dispatch) => {
    const metaData = await getGraphAndHandleResponse(graphId);
    const graph = await createGraphWithData(metaData);
    dispatch(getGraphAction({ graph: graph, index: index }));
  };
}

function getGraphAction(payload: GraphWithIndex): GetGraphAction {
  return {
    type: GET_GRAPH,
    payload: payload
  };
}

export function createLocalGraph(
  graphMetaData: GraphMetaData,
  graphCategory?: string
) {
  return async (dispatch: Dispatch) => {
    dispatch(fetchAction());
    const graphWithData = await createGraphWithData(graphMetaData);
    if (!isUndefined(graphWithData)) {
      graphWithData.graphCategory = graphCategory;
    }
    dispatch(createLocalGraphAction(graphWithData));
  };
}

function createLocalGraphAction(payload?: Graph): CreateLocalGraph {
  return {
    type: CREATE_LOCAL_GRAPH,
    payload: payload
  };
}

export function getAllUserGraphs() {
  return async (dispatch: Dispatch) => {
    dispatch(fetchAction());
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
    dispatch(fetchAction());
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

export function fetchAction(): FetchAction {
  return {
    type: FETCH,
    payload: undefined
  };
}

export function setActionStatus(payload: ActionStatus): SetActionStatus {
  return {
    type: SET_ACTION_STATUS,
    payload: payload
  };
}

/*
 * Sets the action status to display a status message.
 * If the payload is defined (i.e. if an action was successful),
 * a success message is displayed.
 */
function showStatusMessage(
  payload: GraphMetaData | ApiGraphConfirmationResponse | undefined,
  message: string,
  severity: StatusSeverity,
  dispatch: Dispatch
): void {
  if (!isUndefined(payload)) {
    dispatch(
      setActionStatus({
        actionId: uuid(),
        severity: severity,
        message: message,
        show: true
      })
    );
  }
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
