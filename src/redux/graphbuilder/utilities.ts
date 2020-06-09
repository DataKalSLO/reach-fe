import { isUndefined } from 'util';
import { User } from '../login/types';
import { Graph, GraphWithIndex } from './types';

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
 * Locally created graphs do not have an Id as it
 * is generated in the backend when its saved
 */
export function isLocalGraph(graph: Graph): boolean {
  return graph.graphMetaData.graphId === '';
}

/*
 * If a user owns a graph, the userId from the graph
 * should equal the user's email.
 */
export function userOwnsGraph(graph: Graph, user: User): boolean {
  return graph.graphMetaData.userId === user.email;
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
