import * as consts from './constants';
import * as types from './types';

export function addGraphsForInitiativeAction(initiative: string) {
  return graphForInitiativeAction(initiative);
}

export function graphForInitiativeAction(
  payload: string
): types.AddGraphsForInitiativeAction {
  return {
    type: consts.ADD_GRAPH_FOR_INITIATIVE,
    payload: payload
  };
}

export function duplicateGraphAction(id: string) {
  return graphDuplicationAction(id);
}

export function graphDuplicationAction(
  payload: string
): types.DuplicateGraphAction {
  return {
    type: consts.DUPLICATE_GRAPH,
    payload: payload
  };
}

export function deleteGraphAction(id: string) {
  return graphDeletionAction(id);
}

export function graphDeletionAction(payload: string): types.DeleteGraphAction {
  return {
    type: consts.DELETE_GRAPH,
    payload: payload
  };
}
