import { Box } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { uuid } from 'uuidv4';
import { getGraphs } from '../../redux/graphs/selector';
import GraphDefault from '../components/GraphDefault';
import GraphPrebuilt from '../components/GraphPrebuilt';
import { useGraphContainerStyles } from './styles';

/*
 * Renders a list of graphs.
 * Note: Only prebuilt graphs are supported, but this will change
 *       when the backend is connected.
 */
function GraphContainer() {
  const graphState = useSelector(getGraphs);
  const classes = useGraphContainerStyles();

  /*
   * Creates a component for each graph. The default graph is separately
   * appended since the graph is read directly from a JSON file rather
   * than being stored in the store (since it is not currently supported).
   * A graph component contains the chart itself, and the header with a
   * set of options.
   */
  const getGraphComponents = () => {
    const graphs = graphState.graphs.map((graph, index) => (
      <Box key={index} className={classes.item}>
        <GraphPrebuilt graph={graph} />
      </Box>
    ));
    // TODO: change the way default graphs are handled
    return [...graphs, <GraphDefault key={uuid()} />];
  };

  return <Box className={classes.root}>{getGraphComponents()}</Box>;
}

export default GraphContainer;
