import { isDefinedElse } from '../../graphs/forms/utilities';
import {
  CREATE_LOCAL_GRAPH,
  DELETE_GRAPH,
  DELETE_LOCAL_GRAPH,
  DUPLICATE_GRAPH,
  FETCH,
  GET_ALL_USER_GRAPHS,
  GET_DEFAULT_GRAPHS_FOR_CATEGORY,
  GET_GRAPH,
  SAVE_GRAPH,
  TOGGLE_CREATE_GRAPH,
  UPDATE_GRAPH,
  UPDATE_LOCAL_GRAPH
} from './constants';
import { GraphActionTypes, GraphBuilderState } from './types';
import {
  duplicateGraph,
  insertAtIndexIfDefined,
  replaceGraph
} from './utilities';

const initialState: GraphBuilderState = {
  graphs: [],
  isCreating: false,
  isFetching: false
};

export function graphBuilderReducer(
  state = initialState,
  action: GraphActionTypes
): GraphBuilderState {
  switch (action.type) {
    case SAVE_GRAPH:
      return {
        ...state,
        graphs: insertAtIndexIfDefined(state.graphs, 0, true, action.payload)
      };
    case UPDATE_GRAPH:
      return {
        ...state,
        graphs: replaceGraph(state.graphs, action.payload)
      };
    case DELETE_GRAPH:
      return {
        ...state,
        graphs: state.graphs.filter(
          graph => graph.graphMetaData.graphId !== action.payload?.graphId
        )
      };
    case GET_GRAPH:
      return {
        ...state,
        graphs: insertAtIndexIfDefined(
          state.graphs,
          action.payload.index,
          true,
          action.payload.graph
        )
      };
    case GET_ALL_USER_GRAPHS:
      return {
        ...state,
        graphs: isDefinedElse(action.payload, state.graphs),
        isCreating: false,
        isFetching: false
      };
    case GET_DEFAULT_GRAPHS_FOR_CATEGORY:
      return {
        ...state,
        graphs: isDefinedElse(action.payload, state.graphs),
        isCreating: false,
        isFetching: false
      };
    case UPDATE_LOCAL_GRAPH:
      return {
        ...state,
        graphs: replaceGraph(state.graphs, action.payload)
      };
    case CREATE_LOCAL_GRAPH:
      return {
        ...state,
        graphs: insertAtIndexIfDefined(state.graphs, 0, false, action.payload),
        isCreating: false,
        isFetching: false
      };
    case DUPLICATE_GRAPH:
      return {
        ...state,
        graphs: duplicateGraph(state.graphs, action.payload)
      };
    case DELETE_LOCAL_GRAPH:
      return {
        ...state,
        graphs: state.graphs.filter((graph, index) => index !== action.payload)
      };
    case TOGGLE_CREATE_GRAPH:
      return {
        ...state,
        isCreating: !state.isCreating
      };
    case FETCH:
      return {
        ...state,
        isCreating: false,
        isFetching: !state.isFetching
      };
    default:
      return state;
  }
}
