import { Box, styled } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { isUndefined } from 'util';
import { getAllGraphsAndHandleResponse } from '../../api/graphs/operationHandlers';
import { CoreGraph } from '../../graphs/components/CoreGraph';
import GraphCard from '../../preview-cards/graph-card/GraphCard';
import { Gallery } from '../../reach-ui/core';
import { createGraphWithData } from '../../redux/graphbuilder/actions';
import { Graph } from '../../redux/graphbuilder/types';
import { GraphMetaData } from '../../redux/graphs/types';
import { BORDER } from '../../theme/theme';

export const GRAPH_NOT_SELECTED = '';

interface Props {
  graphID: string;
  setGraphId: (graphID: string) => void;
}

export default function GraphBlock(props: Props) {
  const [graphs, setGraphs] = useState([] as GraphMetaData[]);
  const [interactiveGraph, setInteractiveGraph] = useState<Graph | undefined>(
    undefined
  );
  const { graphID, setGraphId } = props; // redux

  // show user's graph as static images
  useEffect(() => {
    getAllGraphsAndHandleResponse().then(response => {
      if (!isUndefined(response)) {
        setGraphs(response);
      }
    });
  }, [graphID]);

  const handleSelection = (graph: GraphMetaData) => {
    setGraphId(graph.graphId);
    // shows an interactive graph
    createGraphWithData(graph).then(response => {
      if (!isUndefined(response)) {
        setInteractiveGraph(response);
        console.log(response);
      }
    });
  };

  const GraphExplorer = () => (
    <Gallery justify="center">
      {graphs.map(graph => (
        <GraphCard
          key={graph.graphId}
          graphMetaData={graph}
          onClick={() => handleSelection(graph)}
        />
      ))}
    </Gallery>
  );

  const SelectedGraph = () => {
    // FIXME: interactive graph not showing up
    return isUndefined(interactiveGraph) ? null : (
      <CoreGraph graph={interactiveGraph} />
    );
  };

  return (
    <StoryBlockContainer>
      {graphID === GRAPH_NOT_SELECTED ? <GraphExplorer /> : <SelectedGraph />}
    </StoryBlockContainer>
  );
}

const StoryBlockContainer = styled(Box)({
  flexGrow: 1,
  minHeight: 600,
  border: BORDER,
  borderRadius: '5px'
});
