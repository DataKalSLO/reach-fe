import { Grid, styled } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addGraphsForInitiativeAction } from '../../redux/graphs/actions';
import { HEALTH } from '../../redux/graphs/constants';
import { getGraphs } from '../../redux/graphs/selector';
import GraphPrebuilt from '../components/GraphPrebuilt';
<<<<<<< HEAD
import { StyledGraphComponent, StyledGraphContainer } from './styles';
import FormCreate from '../components/FormCreate';
=======
>>>>>>> afb3a9d109ba550b9e88ac1081fd1763dff0d955

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
    dispatch(addGraphsForInitiativeAction(HEALTH));
  }, [dispatch]);

  /*
   * Creates a component for each graph. A graph component contains
   * the graph itself, and the toolbar.
   */
  const getGraphComponents = () => {
    if (graphState.graphs.length === 0) {
      return <FormCreate />;
    }
    return graphState.graphs.map((graph, index) => (
      <GridItem item key={index}>
        <GraphPrebuilt graph={graph} />
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
