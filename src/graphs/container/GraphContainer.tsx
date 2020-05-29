import { Grid, styled } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HEALTH } from '../../redux/graphs/constants';
import { getGraphs } from '../../redux/graphbuilder/selector';
import { getDefaultGraphs } from '../../redux/graphbuilder/actions';
import { GraphCard } from '../components/GraphCard';

/*
 * Renders a list of graphs.
 * Note: Only prebuilt graphs are supported, but this will change
 *       when the backend is connected.
 */
function GraphContainer() {
  const graphState = useSelector(getGraphs);
  const dispatch = useDispatch();

  // Use the prebuilt health graphs as the default graphs
  useEffect(() => {
    dispatch(getDefaultGraphs(HEALTH));
  }, [dispatch]);

  /*
   * Creates a component for each graph. A graph component contains
   * the graph itself, and the toolbar.
   */
  const getGraphComponents = () => {
    return graphState.graphs.map((graph, index) => (
      <GridItem item key={index}>
        <GraphCard graph={graph} index={index} />
      </GridItem>
    ));
  };

  return <GridContainer container>{getGraphComponents()}</GridContainer>;
}

export default GraphContainer;

/*
 * Styles
 */
const GridContainer = styled(Grid)({
  justifyContent: 'center',
  overflow: 'scroll',
  padding: '10px 0px 10px 0px'
});

const GridItem = styled(Grid)({
  width: '95%',
  maxWidth: 'calc(100vw/2.2)',
  padding: '10px 10px 10px 20px'
});
