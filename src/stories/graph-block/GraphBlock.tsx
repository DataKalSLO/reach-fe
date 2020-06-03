import { Box, styled, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { isUndefined } from 'util';
import {
  getAllGraphsAndHandleResponse,
  getGraphAndHandleResponse
} from '../../api/graphs/operationHandlers';
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
  const { graphID, setGraphId: setGraphID } = props;

  useEffect(() => {
    if (graphID === GRAPH_NOT_SELECTED) {
      // show user's graph as static images
      getAllGraphsAndHandleResponse().then(response => {
        if (!isUndefined(response)) {
          setGraphs(response);
        }
      });
    } else {
      // show selected graph as interactive
      getGraphAndHandleResponse(graphID).then(graphMetaData => {
        createGraphWithData(graphMetaData).then(graph => {
          setInteractiveGraph(graph);
        });
      });
    }
  }, [graphID]);

  function handleSelection(graph: GraphMetaData) {
    setGraphID(graph.graphId);
  }

  const GraphExplorer = () => {
    // when the user hasn't saved any graphs
    if (graphs.length === 0) {
      return (
        <div>
          <Typography variant="h4" component="h1">
            {'No graphs found.'}
          </Typography>
          <Typography color="textSecondary" variant="h6" component="h2">
            {'Add your first graph from the VizBuilder tab.'}
          </Typography>
        </div>
      );
    }
    return (
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
  };

  const SelectedGraph = () => {
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
  minHeight: 200,
  border: BORDER,
  borderRadius: '5px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
});
