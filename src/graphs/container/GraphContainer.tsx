import { Box } from '@material-ui/core';
import React, { Fragment } from 'react';
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
   * Creates a component for each graph and appends the
   * default component. The default graph is not stored
   * in the store since it is read directly from the JSON file.
   * This will change when the backend is connected.
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

  return (
    <Fragment>
      <Box className={classes.root}>{getGraphComponents()}</Box>
    </Fragment>
  );
}

export default GraphContainer;
