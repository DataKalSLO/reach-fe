import { cloneDeep } from 'lodash';
import { uuid } from 'uuidv4';
import * as consts from './constants';
import * as types from './types';

/*
 * Gets the set of graphs associated with a given industry.
 */
export function getGraphsForInitiative(
  initiative: string,
  graphStateInitiatives: types.InitiativeGraphs
): Highcharts.Options[] {
  switch (initiative) {
    case consts.INDUSTRY:
      return graphStateInitiatives[consts.INDUSTRY];
    case consts.DEMOGRAPHICS:
      return graphStateInitiatives[consts.DEMOGRAPHICS];
    case consts.ASSETS:
      return graphStateInitiatives[consts.ASSETS];
    case consts.EDUCATION:
      return graphStateInitiatives[consts.EDUCATION];
    case consts.HOUSING:
      return graphStateInitiatives[consts.HOUSING];
    default:
      return [];
  }
}

/*
 * Creates a dictionary by giving every graph a key.
 */
export function getGraphWithIds(
  graphOptions: Highcharts.Options[]
): types.GraphRecord[] {
  const graphs: types.GraphRecord[] = [];
  graphOptions.forEach((options: Highcharts.Options) => {
    const graphRecord = { id: uuid(), options: cloneDeep(options) };
    graphs.push(graphRecord);
  });
  return graphs;
}

/*
 * Adds a copy of the graph associated with the given id
 * to the dictionary.
 */
export function getGraphsWithDuplicate(
  id: string,
  graphs: types.GraphRecord[]
): types.GraphRecord[] {
  const newGraphs = cloneDeep(graphs);
  graphs.forEach(graphRecord => {
    if (id === graphRecord.id) {
      newGraphs.push(cloneDeep(graphRecord));
    }
  });
  return newGraphs;
}

/*
 * Removes the graph associated with the given id
 * from the dictionary.
 */
export function getGraphsWithout(
  id: string,
  graphs: types.GraphRecord[]
): types.GraphRecord[] {
  const newGraphs = cloneDeep(graphs);
  return newGraphs.filter(graphRecord => graphRecord.id === id);
}
