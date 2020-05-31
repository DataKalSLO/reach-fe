import { isUndefined } from 'util';
import { Graph, GraphWithIndex } from './types';

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

/*
 * Remove the graphId when duplicating a graph to
 * prevent overriding the existing graph.
 */
export function duplicateGraph(
  graphs: Graph[],
  newGraph: GraphWithIndex
): Graph[] {
  if (!isUndefined(newGraph.graph)) {
    const newGraphWithoutId: Graph = {
      ...newGraph.graph,
      graphMetaData: { ...newGraph.graph.graphMetaData, graphId: '' }
    };
    return insertAtIndexIfDefined(
      graphs,
      newGraph.index,
      false,
      newGraphWithoutId
    );
  }
  return graphs;
}

/*
 * Add an element at the index position of an array if
 * its defined. If withReplacement is true, the existing
 * element at the given index is replaced. A copy of the
 * original array is made to prevent mutations.
 */
export function insertAtIndexIfDefined<T>(
  items: Array<T>,
  index: number,
  withReplacement: boolean,
  element?: T
): Array<T> {
  const newItems = items.slice();
  const replace = withReplacement ? 1 : 0;
  if (!isUndefined(element)) {
    newItems.splice(index, replace, element);
  }
  return newItems;
}
