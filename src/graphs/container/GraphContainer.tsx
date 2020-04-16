<<<<<<< HEAD
import { Box } from '@material-ui/core';
=======
>>>>>>> 7353dcf729116cde9b30e71ac7d2a08e16579842
import React from 'react';
import { useSelector } from 'react-redux';
import { uuid } from 'uuidv4';
import { getGraphs } from '../../redux/graphs/selector';
import GraphDefault from '../components/GraphDefault';
import GraphPrebuilt from '../components/GraphPrebuilt';
<<<<<<< HEAD
import { useGraphContainerStyles } from './styles';
=======
import { StyledGraphComponent, StyledGraphContainer } from './styles';
>>>>>>> 7353dcf729116cde9b30e71ac7d2a08e16579842

/*
 * Renders a list of graphs.
 * Note: Only prebuilt graphs are supported, but this will change
 *       when the backend is connected.
 */
function GraphContainer() {
  const graphState = useSelector(getGraphs);
<<<<<<< HEAD
  const classes = useGraphContainerStyles();
=======
>>>>>>> 7353dcf729116cde9b30e71ac7d2a08e16579842

  /*
   * Creates a component for each graph. The default graph is separately
   * appended since the graph is read directly from a JSON file rather
   * than being stored in the store (since it is not currently supported).
   * A graph component contains the chart itself, and the header with a
   * set of options.
   */
  const getGraphComponents = () => {
    const graphs = graphState.graphs.map((graph, index) => (
<<<<<<< HEAD
      <Box key={index} className={classes.item}>
        <GraphPrebuilt graph={graph} />
      </Box>
=======
      <StyledGraphComponent key={index}>
        <GraphPrebuilt graph={graph} />
      </StyledGraphComponent>
>>>>>>> 7353dcf729116cde9b30e71ac7d2a08e16579842
    ));
    // TODO: change the way default graphs are handled
    return [...graphs, <GraphDefault key={uuid()} />];
  };

<<<<<<< HEAD
  return <Box className={classes.root}>{getGraphComponents()}</Box>;
=======
  return <StyledGraphContainer>{getGraphComponents()}</StyledGraphContainer>;
>>>>>>> 7353dcf729116cde9b30e71ac7d2a08e16579842
}

export default GraphContainer;
