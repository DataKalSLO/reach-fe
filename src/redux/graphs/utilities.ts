import { GraphData } from '../../graphs/components/types';
import { uuid } from 'uuidv4';
import * as cnst from './constants';
import * as typs from './types';

export function getGraphsForInitiative(
  initiative: string,
  graphStateInitiatives: typs.InitiativeGraphs
): GraphData[] {
  switch (initiative) {
    case cnst.INDUSTRY:
      return graphStateInitiatives[cnst.INDUSTRY];
    case cnst.DEMOGRAPHICS:
      return graphStateInitiatives[cnst.DEMOGRAPHICS];
    case cnst.ASSETS:
      return graphStateInitiatives[cnst.ASSETS];
    case cnst.EDUCATION:
      return graphStateInitiatives[cnst.EDUCATION];
    case cnst.HOUSING:
      return graphStateInitiatives[cnst.HOUSING];
  }
  return [];
}

export function getGraphWithTitle(
  graphTitle: string,
  graphStateInitiatives: typs.InitiativeGraphs
): [string, GraphData][] {
  const allInitiativeData: [string, GraphData][] = Object.values(
    graphStateInitiatives
  );
  for (let idx = 0; idx < allInitiativeData.length; ++idx) {
    const dataForOneInitiatiave = allInitiativeData[idx][1];
    if (dataForOneInitiatiave.graphTitle === graphTitle) {
      return [allInitiativeData[idx]];
    }
  }
  return [];
}

export function graphWithIds(graphs: GraphData[]): [string, GraphData][] {
  return graphs.map(graphData => {
    return [uuid(), graphData];
  });
}

export function getDuplicateGraph(
  id: string,
  graphs: [string, GraphData][]
): [string, GraphData][] {
  for (let idx = 0; idx < graphs.length; ++idx) {
    if (graphs[idx][0] === id) {
      return [[uuid(), graphs[idx][1]]];
    }
  }
  return [];
}

export function getGraphsWithout(
  id: string,
  graphs: [string, GraphData][]
): [string, GraphData][] {
  return graphs.filter((graph: [string, GraphData]) => graph[0] !== id);
}
