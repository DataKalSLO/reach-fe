import * as typs from './types';
import * as cnst from './constants';

export function addGraphAction(graph: Highcharts.Options) {
  return graphAction(graph);
}

export function graphAction(payload: Highcharts.Options): typs.AddGraphAction {
  return {
    type: cnst.ADD_GRAPH,
    payload: payload
  };
}

export function addListOfGraphsAction(graphs: Highcharts.Options[]) {
  return listOfGraphsAction(graphs);
}

export function listOfGraphsAction(
  payload: Highcharts.Options[]
): typs.AddListOfGraphsAction {
  return {
    type: cnst.ADD_LIST_OF_GRAPHS,
    payload: payload
  };
}

export function addGraphsForInitiativeAction(initiative: string) {
  return graphForInitiativeAction(initiative);
}

export function graphForInitiativeAction(
  payload: string
): typs.AddGraphsForInitiativeAction {
  return {
    type: cnst.ADD_GRAPH_FOR_INITIATIVE,
    payload: payload
  };
}

export function addGraphWithTitleAction(title: string) {
  return graphWithTitleAction(title);
}

export function graphWithTitleAction(
  payload: string
): typs.AddGraphWithTitleAction {
  return {
    type: cnst.ADD_GRAPH_WITH_TITLE,
    payload: payload
  };
}

export function duplicateGraphAction(id: string) {
  return graphDuplicationAction(id);
}

export function graphDuplicationAction(
  payload: string
): typs.DuplicateGraphAction {
  return {
    type: cnst.DUPLICATE_GRAPH,
    payload: payload
  };
}

export function deleteGraphAction(id: string) {
  return graphDeletionAction(id);
}

export function graphDeletionAction(payload: string): typs.DeleteGraphAction {
  return {
    type: cnst.DELETE_GRAPH,
    payload: payload
  };
}

export function editGraphAction(editting: boolean) {
  return graphEditAction(editting);
}

export function graphEditAction(payload: boolean) {
  return {
    type: cnst.EDITTING,
    payload: payload
  };
}
