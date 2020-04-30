import { cloneDeep } from 'lodash';
import { uuid } from 'uuidv4';
import * as types from './types';
import { isUndefined } from 'util';

/*
 * Gets the set of graphs associated with a given industry.
 */
export function getGraphsForInitiative(
  initiative: string,
  graphStateInitiatives: types.InitiativeGraphs
): Highcharts.Options[] {
  if (types.initiativeNames.some(val => val === initiative)) {
    const initiativeLiteral = initiative as types.InitiativeLiteral;
    return cloneDeep(graphStateInitiatives[initiativeLiteral]);
  }
  return [];
}

/*
 * Creates an array of graphs where each graph is represented as an
 * object with an id and a set of Highcharts chart options.
 */
export function getGraphWithIds(
  graphOptions: Highcharts.Options[]
): types.GraphRecord[] {
  const graphs: types.GraphRecord[] = [];
  graphOptions.forEach((options: Highcharts.Options) => {
    const graphRecord = { id: uuid(), options: options, isEditing: false };
    graphs.push(graphRecord);
  });
  return graphs;
}

/*
 * Adds a copy of the given graph options to the array of graphs.
 */
export function addDuplicateToGraphs(
  graphOptions: Highcharts.Options,
  graphs: types.GraphRecord[]
): types.GraphRecord[] {
  graphs.push({
    id: uuid(),
    options: cloneDeep(graphOptions),
    isEditing: false
  });
  return graphs;
}

/*
 * Removes the graph associated with the given id
 * from the array of graphs.
 */
export function getGraphsWithout(
  id: string,
  graphs: types.GraphRecord[]
): types.GraphRecord[] {
  return graphs.filter(graphRecord => graphRecord.id !== id);
}

export function editGraph(
  id: string,
  graphs: types.GraphRecord[]
): types.GraphRecord[] {
  return graphs.map(graphRecord => {
    if (id === graphRecord.id) {
//      const newRecord = cloneDeep(graphRecord)
//      newRecord.options.title = { text: 'Hello World' };
      return { ...graphRecord, isEditing: !graphRecord.isEditing };
    }
    return graphRecord;
  });
}
