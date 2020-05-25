import {
  DELETE_GRAPH,
  ADD_GRAPH_FOR_INITIATIVE,
  DUPLICATE_GRAPH
} from './constants';
import {
  AddGraphsForInitiativeAction,
  DuplicateGraphAction,
  DeleteGraphAction
} from './types';

export function addGraphsForInitiativeAction(initiative: string) {
  return graphForInitiativeAction(initiative);
}

export function graphForInitiativeAction(
  payload: string
): AddGraphsForInitiativeAction {
  return {
    type: ADD_GRAPH_FOR_INITIATIVE,
    payload: payload
  };
}

export function deleteGraphAction(id: string) {
  return graphDeletionAction(id);
}

export function graphDeletionAction(payload: string): DeleteGraphAction {
  return {
    type: DELETE_GRAPH,
    payload: payload
  };
}

export function duplicateGraphAction(
  payload: Highcharts.Options
): DuplicateGraphAction {
  return {
    type: DUPLICATE_GRAPH,
    payload: payload
  };
}
