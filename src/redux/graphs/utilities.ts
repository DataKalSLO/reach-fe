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
  graphs: Highcharts.Options[]
): types.GraphDictionary {
  const graphsRecord: types.GraphDictionary = {};
  graphs.forEach((graphData: Highcharts.Options) => {
    graphsRecord[uuid()] = cloneDeep(graphData);
  });
  return graphsRecord;
}

/*
 * Adds a copy of the graph associated with the given id
 * to the dictionary.
 */
export function getGraphsWithDuplicate(
  id: string,
  graphs: types.GraphDictionary
): types.GraphDictionary {
  if (id in Object.keys(graphs)) {
    const newGraphs = cloneDeep(graphs);
    newGraphs[uuid()] = cloneDeep(graphs[id]);
  }
  return graphs;
}

/*
 * Removes the graph associated with the given id
 * from the dictionary.
 */
export function getGraphsWithout(
  id: string,
  graphs: types.GraphDictionary
): types.GraphDictionary {
  if (id in Object.keys(graphs)) {
    const newGraphs = cloneDeep(graphs);
    const { [id]: graphToDelete, ...others } = newGraphs;
    return others;
  }
  return graphs;
}
