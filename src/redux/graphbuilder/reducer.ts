import { isUndefined } from 'util';
import { insertIfDefinedAtIndex, replaceIfDefinedAtIndex } from '../../common/util/arrayTools';
import { DELETE_GRAPH, DUPLICATE_GRAPH } from '../graphs/constants';
import { CREATE_GRAPH, EDIT_GRAPH, GET_ALL_USER_GRAPHS, GET_DEFAULT_GRAPHS_FOR_CATEGORY, GET_GRAPH, HIDE_GRAPH, SAVE_GRAPH, SYNC_GRAPH, UPDATE_GRAPH, UPDATE_LOCAL_GRAPH } from './constants';
import { GraphActionTypes, GraphBuilderState } from './types';
import { duplicateGraph, editGraph, replaceGraph } from './utilities';

const initialState: GraphBuilderState = {
  graphs: [],
  isCreating: false
};

export function graphbuilderReducer(
  state = initialState,
  action: GraphActionTypes
): GraphBuilderState {
  switch (action.type) {
    case SAVE_GRAPH:
      return {
        ...state,
        graphs: replaceIfDefinedAtIndex(state.graphs, 0, action.payload)
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
        graphs: insertIfDefinedAtIndex(state.graphs, 0, action.payload)
      };
    case GET_ALL_USER_GRAPHS:
      return {
        ...state,
        graphs: !isUndefined(action.payload) ? action.payload : state.graphs
      };
    case GET_DEFAULT_GRAPHS_FOR_CATEGORY:
      return {
        ...state,
        graphs: !isUndefined(action.payload) ? action.payload : state.graphs
      };
    case EDIT_GRAPH:
      return {
        ...state,
        graphs: editGraph(state.graphs, action.payload)
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
    case HIDE_GRAPH:
      return {
        ...state,
        graphs: state.graphs.map(graph => {
          if (graph.graphMetaData.graphId === action.payload) {
            return { ...graph, isHidden: !graph.isHidden };
          }
          return graph;
        })
      };
    case CREATE_GRAPH:
      return {
        ...state,
        isCreating: !state.isCreating
      };
    case SYNC_GRAPH:
      return {
        ...state
      };
    default:
      return state;
  }
}
