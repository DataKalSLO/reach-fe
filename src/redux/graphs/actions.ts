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

export function duplicateGraphAction(graphOptions: Highcharts.Options) {
  return graphDuplicationAction(graphOptions);
}

export function graphDuplicationAction(
  payload: Highcharts.Options
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

export function createGraphAction(id: string): types.CreatingGraphAction {
  return {
    type: consts.CREATING_GRAPH,
    payload: id
  };
}

export function syncGraphAction(id: string) {
  return graphDeletionAction(id);
}

export function graphSyncAction(payload: string): types.SyncGraphAction{
  return {
    type: consts.SYNC_GRAPH,
    payload: payload
  };
}

