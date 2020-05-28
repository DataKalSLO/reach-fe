import { isDefinedElse } from '../../graphs/forms/utilities';
import { DELETE_GRAPH, DUPLICATE_GRAPH } from '../graphs/constants';
import {
  TOGGLE_CREATE_GRAPH,
  GET_ALL_USER_GRAPHS,
  GET_DEFAULT_GRAPHS_FOR_CATEGORY,
  GET_GRAPH,
  SAVE_GRAPH,
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
  isCreating: false
};

export function graphBuilderReducer(
  state = initialState,
  action: GraphActionTypes
): GraphBuilderState {
  switch (action.type) {
    case SAVE_GRAPH:
      return {
        ...state,
        graphs: insertAtIndexIfDefined(state.graphs, 0, false, action.payload)
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
        graphs: insertAtIndexIfDefined(state.graphs, 0, false, action.payload)
      };
    case GET_ALL_USER_GRAPHS:
      return {
        ...state,
        graphs: isDefinedElse(action.payload, state.graphs)
      };
    case GET_DEFAULT_GRAPHS_FOR_CATEGORY:
      return {
        ...state,
        graphs: isDefinedElse(action.payload, state.graphs)
      };
    case UPDATE_LOCAL_GRAPH:
      return {
        ...state,
        graphs: replaceGraph(state.graphs, action.payload)
      };
    case DUPLICATE_GRAPH:
      return {
        ...state,
        graphs: duplicateGraph(state.graphs, action.payload)
      };
    case TOGGLE_CREATE_GRAPH:
      return {
        ...state,
        isCreating: !state.isCreating
      };
    default:
      return state;
  }
}
