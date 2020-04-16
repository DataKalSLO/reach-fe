import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useGraphContainerStyles } from './styles';
import { getGraphs } from '../../redux/graphs/selector';
import { Box } from '@material-ui/core';
import { uuid } from 'uuidv4';
import GraphDefault from '../components/GraphDefault';
import GraphPrebuilt from '../components/GraphPrebuilt';

/*
 * Renders a list of graphs.
 * Note: Only prebuilt graphs are supported, but this will change
 *       when the backend is connected.
 */
function GraphContainer() {
  const graphState = useSelector(getGraphs);
  const classes = useGraphContainerStyles();

  const getGraphComponents = () => {
    const graphs = graphState.graphs.map((graph, index) => (
      <Box key={index} className={classes.item}>
        <GraphPrebuilt graph={graph} />
      </Box>
    ));
    return [...graphs, <GraphDefault key={uuid()} />];
  };

  return (
    <Fragment>
      <Box className={classes.root}>{getGraphComponents()}</Box>
    </Fragment>
  );
}

export default GraphContainer;
