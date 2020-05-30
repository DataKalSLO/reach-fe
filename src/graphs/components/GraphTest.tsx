import { Box, Grid, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { isUndefined } from 'util';
import { getAllGraphsAndHandleResponse } from '../../api/graphs/operationHandlers';
import Button from '../../common/components/Button';
import {
  createGraphsWithData,
  createGraphWithData
} from '../../redux/graphbuilder/actions';
import { Graph } from '../../redux/graphbuilder/types';
import { GraphMetaData } from '../../redux/graphs/types';
import { CoreGraph } from './CoreGraph';

/*
 *  The CoreGraph component takes in an optional width and height, and
 *  containerProps which allow you to style the highcharts container.
 *    - For more information see https://github.com/highcharts/highcharts-react
 */

interface State {
  interactiveGraphs: Graph[];
  graphsMetaData: GraphMetaData[];
  interactiveGraph: Graph | undefined;
}

export function GraphTest() {
  const [state, setState] = useState<State>({
    interactiveGraphs: [],
    graphsMetaData: [],
    interactiveGraph: undefined
  });

  // show user's graphs as interactive
  const getGraphsWithData = async () => {
    const graphsMetaData = await getAllGraphsAndHandleResponse();
    // createGraphsWithData is not exported in master
    // export it here src/redux/graphbuilder/actions/createGraphsWithData
    const graphs = await createGraphsWithData(graphsMetaData);
    if (!isUndefined(graphs)) {
      setState({
        interactiveGraphs: graphs,
        graphsMetaData: [],
        interactiveGraph: undefined
      });
    }
  };

  // show user's graph as static images
  const getGraphsMetaData = async () => {
    const response = await getAllGraphsAndHandleResponse();
    if (!isUndefined(response)) {
      setState({
        interactiveGraphs: [],
        graphsMetaData: response,
        interactiveGraph: undefined
      });
    }
  };

  // show an interactive graph given graphMetaData
  const getInteractiveGraph = async (graphIndex: number) => {
    if (state.graphsMetaData.length > graphIndex) {
      // createGraphWithData is not exported in master
      // export it here src/redux/graphbuilder/actions/createGraphWithData
      const response = await createGraphWithData(
        state.graphsMetaData[graphIndex]
      );
      if (!isUndefined(response)) {
        setState({
          interactiveGraphs: [],
          graphsMetaData: [],
          interactiveGraph: response
        });
      }
    }
  };

  return (
    <Box style={{ overflow: 'scroll' }}>
      <Button
        label="Get all user graphs and show interactive graphs"
        onClick={getGraphsWithData}
      />
      <Button
        label="Get all user graphs and show static images"
        onClick={getGraphsMetaData}
      />
      <Button
        label="Show an interactive graph (show static images first, then click here)"
        onClick={() => getInteractiveGraph(0)}
      />
      <Box>
        {state.interactiveGraphs.map((graph, index) => {
          return (
            <Grid key={index}>
              <Typography>{`Title: ${graph.graphMetaData.graphTitle}`}</Typography>
              <Typography>{`Subtitle: ${graph.graphMetaData.graphOptions.subtitle}`}</Typography>
              <CoreGraph graph={graph} />;
            </Grid>
          );
        })}
        {state.graphsMetaData.map((graph, index) => {
          return (
            <Grid key={index}>
              <Typography>{`Title: ${graph.graphTitle}`}</Typography>
              <Typography>{`Subtitle: ${graph.graphOptions.subtitle}`}</Typography>
              <img src={graph.snapshotUrl} alt={graph.graphTitle} />
            </Grid>
          );
        })}
        {isUndefined(state.interactiveGraph) ? null : (
          <Grid>
            <Typography>{`Title: ${state.interactiveGraph.graphMetaData.graphTitle}`}</Typography>
            <Typography>{`Subtitle: ${state.interactiveGraph.graphMetaData.graphOptions.subtitle}`}</Typography>
            <CoreGraph graph={state.interactiveGraph} />
          </Grid>
        )}
      </Box>
    </Box>
  );
}
