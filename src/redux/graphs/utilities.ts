import { uuid } from 'uuidv4';
import * as cnst from './constants';
import * as typs from './types';

export function getGraphsForInitiative(
  initiative: string,
  graphStateInitiatives: typs.InitiativeGraphs
): Highcharts.Options[] {
  switch (initiative) {
    case cnst.INDUSTRY:
      return JSON.parse(JSON.stringify(graphStateInitiatives[cnst.INDUSTRY]));
    case cnst.DEMOGRAPHICS:
      return JSON.parse(
        JSON.stringify(graphStateInitiatives[cnst.DEMOGRAPHICS])
      );
    case cnst.ASSETS:
      return JSON.parse(JSON.stringify(graphStateInitiatives[cnst.ASSETS]));
    case cnst.EDUCATION:
      return JSON.parse(JSON.stringify(graphStateInitiatives[cnst.EDUCATION]));
    case cnst.HOUSING:
      return JSON.parse(JSON.stringify(graphStateInitiatives[cnst.HOUSING]));
  }
  return [];
}

export function getGraphWithTitle(
  graphTitle: string,
  graphStateInitiatives: typs.InitiativeGraphs
): [string, Highcharts.Options][] {
  const allInitiativeData: [string, Highcharts.Options][] = Object.values(
    graphStateInitiatives
  );
  for (let idx = 0; idx < allInitiativeData.length; ++idx) {
    const dataForOneInitiatiave = allInitiativeData[idx][1];
    if (dataForOneInitiatiave.title === graphTitle) {
      return [allInitiativeData[idx]];
    }
  }
  return [];
}

export function graphWithIds(
  graphs: Highcharts.Options[]
): [string, Highcharts.Options][] {
  return graphs.map((graphData: Highcharts.Options) => {
    return [uuid(), { ...graphData, ...graphData.series }];
  });
}

export function getDuplicateGraph(
  id: string,
  graphs: [string, Highcharts.Options][]
): [string, Highcharts.Options][] {
  for (let idx = 0; idx < graphs.length; ++idx) {
    if (graphs[idx][0] === id) {
      return [[uuid(), JSON.parse(JSON.stringify(graphs[idx][1]))]];
    }
  }
  return [];
}

export function getGraphsWithout(
  id: string,
  graphs: [string, Highcharts.Options][]
): [string, Highcharts.Options][] {
  return JSON.parse(
    JSON.stringify(
      graphs.filter((graph: [string, Highcharts.Options]) => graph[0] !== id)
    )
  );
}
