import { isUndefined } from 'util';
import { insertIfDefinedAtIndex } from '../../common/util/arrayTools';
import { Graph, GraphWithIndex } from './types';

export function editGraph(graphs: Graph[], graphIndex: number): Graph[] {
  return graphs.map((graph, index) => {
    if (index === graphIndex) {
      return { ...graph, isEditing: !graph.isEditing };
    }
    return graph;
  });
}

export function replaceGraph(graphs: Graph[], newGraph?: Graph): Graph[] {
  return graphs.map(graph => {
    if (
      !isUndefined(newGraph) &&
      graph.graphMetaData.graphId === newGraph.graphMetaData.graphId
    ) {
      return newGraph;
    }
    return graph;
  });
}

export function duplicateGraph(
  graphs: Graph[],
  newGraph: GraphWithIndex
): Graph[] {
  const newGraphWithoutId: Graph = {
    ...newGraph.graph,
    graphMetaData: { ...newGraph.graph.graphMetaData, graphId: '' },
    isEditing: false
  };
  return insertIfDefinedAtIndex(graphs, newGraph.index, newGraphWithoutId);
}
